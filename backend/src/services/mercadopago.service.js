/**
 * mercadopago.service.js
 * Integración con Mercado Pago — Checkout Pro
 *
 * Credenciales: MP_ACCESS_TOKEN en .env
 * Docs: https://www.mercadopago.com.uy/developers/es/docs/checkout-pro
 */
import crypto from 'crypto';
import { logger } from '../utils/logger.js';

const BASE_URL = 'https://api.mercadopago.com';
const TOKEN = () => process.env.MP_ACCESS_TOKEN || '';
const PRICE = () => parseFloat(process.env.PRO_PRICE_USD || '6.00');
const LABEL = () => process.env.PRO_PLAN_LABEL || 'Guyunusa Pro';
const PUBLIC_URL = () => process.env.APP_PUBLIC_URL || 'http://localhost:3000';
const FRONT_URL = () => process.env.FRONTEND_URL || 'http://localhost:3000';

/**
 * Crea una preferencia de pago en MP.
 * Retorna { id, init_point } — init_point es la URL al checkout de MP.
 */
export async function createPreference(userId, userEmail) {
  if (!TOKEN()) throw new Error('MP_ACCESS_TOKEN no configurado en .env');

  const body = {
    items: [{
      id: 'guyunusa_pro',
      title: LABEL(),
      description: 'Acceso ilimitado a Guyunusa — IA con identidad uruguaya',
      quantity: 1,
      unit_price: PRICE(),
      currency_id: 'USD',
    }],
    payer: {
      email: userEmail,
    },
    external_reference: String(userId),
    back_urls: {
      success: `${FRONT_URL()}/#/payment/success`,
      failure: `${FRONT_URL()}/#/payment/failure`,
      pending: `${FRONT_URL()}/#/payment/pending`,
    },
    auto_return: 'approved',
    notification_url: `${PUBLIC_URL()}/api/v1/payment/mp/webhook`,
    statement_descriptor: 'GUYUNUSA',
    expires: false,
  };

  const res = await fetch(`${BASE_URL}/checkout/preferences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN()}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });

  const data = await res.json();
  if (!res.ok) {
    logger.error('MP createPreference error:', JSON.stringify(data));
    throw new Error(data.message || `MP error ${res.status}`);
  }

  logger.info(`MP preferencia creada: ${data.id} para user ${userId}`);
  return {
    id: data.id,
    init_point: data.init_point,
    sandbox_url: data.sandbox_init_point,
  };
}

/**
 * Obtiene el detalle de un pago por su ID.
 * Útil para verificar en el webhook.
 */
export async function getPayment(paymentId) {
  const res = await fetch(`${BASE_URL}/v1/payments/${paymentId}`, {
    headers: { 'Authorization': `Bearer ${TOKEN()}` },
    signal: AbortSignal.timeout(10_000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `MP error ${res.status}`);
  return data;
}

/**
 * Verifica la firma del webhook de MP.
 * Spec oficial: x-signature trae "ts=<timestamp>,v1=<hash>".
 * El hash es HMAC-SHA256, sobre un manifest con formato exacto:
 *   id:<data.id>;request-id:<x-request-id>;ts:<ts>;
 * data.id viaja en el query string de la notification_url
 * (?data.id=123456&type=payment), no en headers ni en el body.
 * Docs: https://www.mercadopago.com.uy/developers/es/docs/checkout-pro/additional-content/your-integrations/notifications/webhooks
 */
export function verifyWebhookSignature(req) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    logger.warn('MP_WEBHOOK_SECRET no configurado — aceptando webhook sin verificar firma (solo aceptable en dev)');
    return true;
  }

  const signatureHeader = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  if (!signatureHeader) return false;

  // "ts=1704908010,v1=618c853..." → { ts, v1 }
  const parts = {};
  for (const chunk of signatureHeader.split(',')) {
    const [key, value] = chunk.split('=');
    if (key && value) parts[key.trim()] = value.trim();
  }
  const { ts, v1 } = parts;
  if (!ts || !v1) return false;

  // Soporta 'data.id' plano (default de Express con qs) o anidado
  // si en algún momento se activara `allowDots` en el query parser.
  const dataId = req.query?.['data.id'] ?? req.query?.data?.id ?? req.query?.id;

  let manifest = '';
  if (dataId) manifest += `id:${dataId};`;
  if (requestId) manifest += `request-id:${requestId};`;
  manifest += `ts:${ts};`;

  const expectedHash = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

  const a = Buffer.from(expectedHash, 'utf-8');
  const b = Buffer.from(v1, 'utf-8');
  if (a.length !== b.length) return false; // timingSafeEqual exige mismo largo

  return crypto.timingSafeEqual(a, b);
}
