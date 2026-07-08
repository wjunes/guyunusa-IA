/**
 * payment.controller.js
 * Controladores para los endpoints de pago (MP y PayPal)
 */
import { getDB, withTransaction } from '../db/database.js';
import { logger } from '../utils/logger.js';
import {
  createPreference,
  getPayment as getMPPayment,
  verifyWebhookSignature
} from '../services/mercadopago.service.js';
import {
  createOrder, captureOrder,
  verifyWebhook as verifyPPWebhook
} from '../services/paypal.service.js';

const NOW = 'NOW()'; // MySQL — la versión SQLite usaba datetime('now')
const FRONT_URL = () => process.env.FRONTEND_URL || 'http://localhost:3000';

/* ── Helper: activar plan Pro ──
   Ambos UPDATEs (plan del usuario + estado del pago) van en una sola
   transacción: si el segundo falla, el primero también se revierte,
   evitando un estado inconsistente (usuario con plan 'pro' pero su
   pago sigue figurando como 'pending'). ── */
async function activatePro(userId, provider, externalId) {
  await withTransaction(async (db) => {
    await db.prepare(`UPDATE users SET plan = 'pro', updated_at = ${NOW} WHERE id = ?`)
      .run(userId);

    await db.prepare(
      `UPDATE payments SET status = 'approved', external_id = ?, updated_at = ${NOW}
       WHERE user_id = ? AND provider = ? AND status != 'approved'
       ORDER BY id DESC LIMIT 1`
    ).run(externalId || '', userId, provider);
  });

  logger.info(`✓ Plan Pro activado: user_id=${userId} via ${provider}`);
}

/* ── Helper: registrar pago pendiente ── */
async function registerPendingPayment(userId, provider, preferenceOrOrderId) {
  const db = getDB();
  const result = await db.prepare(
    `INSERT INTO payments (user_id, provider, preference_id, status, amount, currency)
     VALUES (?, ?, ?, 'pending', ?, 'USD')`
  ).run(userId, provider, preferenceOrOrderId,
    parseFloat(process.env.PRO_PRICE_USD || '6.00'));
  return result.lastInsertRowid;
}

/* ══════════════════════════════════════
   MERCADO PAGO
   ══════════════════════════════════════ */

/** POST /api/v1/payment/mp/create — crea preferencia MP */
export async function mpCreate(req, res) {
  const userId = req.user.id;

  try {
    const db = getDB();
    const user = await db.prepare('SELECT email, plan FROM users WHERE id = ?').get(userId);

    if (!user) return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    if (user.plan === 'pro') {
      return res.status(400).json({ ok: false, message: 'Ya tenés el plan Pro activado' });
    }

    const pref = await createPreference(userId, user.email);
    await registerPendingPayment(userId, 'mercadopago', pref.id);

    const isSandbox = !process.env.MP_ACCESS_TOKEN?.startsWith('APP_USR-');
    return res.json({
      ok: true,
      preference_id: pref.id,
      checkout_url: isSandbox ? pref.sandbox_url : pref.init_point,
      sandbox: isSandbox,
    });
  } catch (err) {
    logger.error('MP create error:', err.message);
    return res.status(502).json({ ok: false, message: err.message });
  }
}

/** POST /api/v1/payment/mp/webhook — notificación de MP
 *  ⚠️ `verifyWebhookSignature` está importado pero nunca invocado acá
 *  (a diferencia del webhook de PayPal, más abajo, que sí valida firma
 *  antes de confiar en el body). Ver nota de seguridad debajo del código. */
export async function mpWebhook(req, res) {
  // Responder rápido a MP (requiere 200 en < 2s)
  res.status(200).json({ ok: true });

  if (!verifyWebhookSignature(req)) {
    logger.warn('MP webhook: firma inválida — ignorando notificación');
    return;
  }

  const { type, data } = req.body;
  if (type !== 'payment') return;

  const paymentId = data?.id;
  if (!paymentId) return;

  try {
    const payment = await getMPPayment(paymentId);
    const userId = Number(payment.external_reference);
    const status = payment.status; // approved | rejected | pending | ...

    logger.info(`MP webhook: payment_id=${paymentId} status=${status} user=${userId}`);

    if (status === 'approved' && userId) {
      await activatePro(userId, 'mercadopago', String(paymentId));
    }
  } catch (err) {
    logger.error('MP webhook error:', err.message);
  }
}

/** GET /api/v1/payment/mp/success — redirect de vuelta desde MP (back_url) */
export async function mpSuccess(req, res) {
  const { payment_id, status, external_reference } = req.query;

  // Verificación adicional por query param (el webhook es el canal principal)
  if (status === 'approved' && payment_id && external_reference) {
    try {
      const payment = await getMPPayment(payment_id);
      if (payment.status === 'approved') {
        await activatePro(Number(external_reference), 'mercadopago', payment_id);
      }
    } catch (err) {
      logger.warn('MP success verify error:', err.message);
    }
  }

  res.redirect(`${FRONT_URL()}/#/payment/success?provider=mp`);
}

/* ══════════════════════════════════════
   PAYPAL
   ══════════════════════════════════════ */

/** POST /api/v1/payment/paypal/create — crea orden PayPal */
export async function paypalCreate(req, res) {
  const userId = req.user.id;

  try {
    const db = getDB();
    const user = await db.prepare('SELECT plan FROM users WHERE id = ?').get(userId);

    if (!user) return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    if (user.plan === 'pro') {
      return res.status(400).json({ ok: false, message: 'Ya tenés el plan Pro activado' });
    }

    const order = await createOrder(userId);
    await registerPendingPayment(userId, 'paypal', order.id);

    return res.json({
      ok: true,
      order_id: order.id,
      approve_url: order.approve_url,
    });
  } catch (err) {
    logger.error('PayPal create error:', err.message);
    return res.status(502).json({ ok: false, message: err.message });
  }
}

/** GET /api/v1/payment/paypal/capture — redirect de vuelta desde PayPal */
export async function paypalCapture(req, res) {
  const { token, user_id } = req.query; // token = orderId en PayPal

  if (!token) {
    return res.redirect(`${FRONT_URL()}/#/payment/failure?provider=paypal`);
  }

  try {
    const result = await captureOrder(token);
    const userId = result.userId || Number(user_id);

    if (result.status === 'COMPLETED' && userId) {
      await activatePro(userId, 'paypal', token);
      return res.redirect(`${FRONT_URL()}/#/payment/success?provider=paypal`);
    }
    return res.redirect(`${FRONT_URL()}/#/payment/failure?provider=paypal&reason=${result.status}`);
  } catch (err) {
    logger.error('PayPal capture error:', err.message);
    return res.redirect(`${FRONT_URL()}/#/payment/failure?provider=paypal`);
  }
}

/** POST /api/v1/payment/paypal/webhook — webhook de PayPal (IPN) */
export async function paypalWebhook(req, res) {
  res.status(200).json({ ok: true });

  try {
    const valid = await verifyPPWebhook(req.headers, req.body);
    if (!valid) { logger.warn('PayPal webhook: firma inválida'); return; }

    const { event_type, resource } = req.body;
    if (event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const userId = Number(resource?.custom_id?.replace('user_', '') || 0);
      if (userId) await activatePro(userId, 'paypal', resource?.id);
    }
  } catch (err) {
    logger.error('PayPal webhook error:', err.message);
  }
}

/** GET /api/v1/payment/status — estado del plan del usuario actual */
export async function paymentStatus(req, res) {
  try {
    const db = getDB();
    const user = await db.prepare('SELECT plan FROM users WHERE id = ?').get(req.user.id);
    const last = await db.prepare(
      `SELECT provider, status, amount, currency, created_at
       FROM payments WHERE user_id = ? ORDER BY id DESC LIMIT 1`
    ).get(req.user.id);

    return res.json({ ok: true, plan: user?.plan || 'free', lastPayment: last || null });
  } catch (err) {
    logger.error('Error en paymentStatus:', err.message);
    return res.status(500).json({ ok: false, message: err.message });
  }
}
