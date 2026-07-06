import bcrypt   from 'bcryptjs';
import jwt      from 'jsonwebtoken';
import { getDB } from '../db/database.js';
import { verifyGoogleToken } from '../services/google.service.js';
import { logger } from '../utils/logger.js';
import { HTTP_STATUS, ERRORS } from '../../../shared/constants.js';

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export function register(req, res) {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      ok: false, message: 'Completá todos los campos'
    });
  }
  if (password.length < 6) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      ok: false, message: 'La contraseña debe tener al menos 6 caracteres'
    });
  }

  const db   = getDB();
  const hash = bcrypt.hashSync(password, 10);

  try {
    const result = db.prepare(
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)'
    ).run(email.toLowerCase().trim(), username.trim(), hash);

    const id    = Number(result.lastInsertRowid);
    const token = signToken({ id, username: username.trim(), email: email.toLowerCase().trim() });

    logger.info(`Usuario registrado: ${email}`);
    return res.status(HTTP_STATUS.CREATED).json({
      ok: true, token,
      user: { id, username: username.trim(), email: email.toLowerCase().trim(), plan: 'free' }
    });
  } catch (err) {
    if (err.message?.includes('UNIQUE') || err.message?.includes('unique')) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        ok: false, message: ERRORS.USER_EXISTS
      });
    }
    logger.error('Error en register:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({
      ok: false, message: 'Error al crear la cuenta: ' + err.message
    });
  }
}

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      ok: false, message: 'Completá todos los campos'
    });
  }

  try {
    const db   = getDB();
    const user = db.prepare(
      'SELECT * FROM users WHERE email = ? AND is_active = 1'
    ).get(email.toLowerCase().trim());

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        ok: false, message: ERRORS.INVALID_CREDENTIALS
      });
    }

    const token = signToken({ id: user.id, username: user.username, email: user.email });
    logger.info(`Login: ${email}`);
    return res.json({
      ok: true, token,
      user: { id: user.id, username: user.username, email: user.email, plan: user.plan, avatar_url: user.avatar_url || null }
    });
  } catch (err) {
    logger.error('Error en login:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({
      ok: false, message: 'Error al ingresar: ' + err.message
    });
  }
}

export function logout(_req, res) {
  return res.json({ ok: true, message: 'Sesión cerrada' });
}

/**
 * POST /api/v1/auth/google
 * Recibe el id_token de Google Identity Services,
 * verifica con Google y crea o recupera el usuario.
 */
export async function googleAuth(req, res) {
  const { credential } = req.body; // id_token enviado por GSI
  if (!credential) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      ok: false, message: 'Token de Google requerido'
    });
  }

  try {
    const googleUser = await verifyGoogleToken(credential);
    const db = getDB();

    // 1. Buscar por google_id
    let user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(googleUser.sub);

    // 2. Si no existe por google_id, buscar por email
    if (!user) {
      user = db.prepare('SELECT * FROM users WHERE email = ?').get(googleUser.email);

      if (user) {
        // Usuario existente con email — vincular google_id
        db.prepare(`UPDATE users SET google_id = ?, updated_at = datetime('now') WHERE id = ?`)
          .run(googleUser.sub, user.id);
        user.google_id = googleUser.sub;
        logger.info(`Google vinculado a usuario existente: ${googleUser.email}`);
      }
    }

    // 3. Si no existe de ninguna manera — crear nuevo usuario
    if (!user) {
      // Generar username desde el nombre de Google (sanitizado)
      const baseUsername = (googleUser.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 20) || 'usuario';

      // Garantizar unicidad del username
      let username = baseUsername;
      let suffix   = 1;
      while (db.prepare('SELECT id FROM users WHERE username = ?').get(username)) {
        username = baseUsername + suffix++;
      }

      const result = db.prepare(
        `INSERT INTO users (email, username, password, google_id, is_active, plan)
         VALUES (?, ?, '', ?, 1, 'free')`
      ).run(googleUser.email, username, googleUser.sub);

      // Buscar el usuario recién creado — lastInsertRowid puede ser BigInt en sql.js
      const newId = Number(result.lastInsertRowid);
      user = newId
        ? db.prepare('SELECT * FROM users WHERE id = ?').get(newId)
        : null;

      // Fallback: buscar por email si lastInsertRowid no funcionó
      if (!user) {
        user = db.prepare('SELECT * FROM users WHERE email = ?').get(googleUser.email);
      }

      if (!user) {
        logger.error(`No se pudo recuperar usuario creado via Google: ${googleUser.email}`);
        return res.status(HTTP_STATUS.SERVER_ERROR).json({
          ok: false, message: 'Error al crear la cuenta. Intentá de nuevo.'
        });
      }

      logger.info(`Nuevo usuario creado via Google: ${googleUser.email}`);
    }

    if (!user || !user.is_active) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        ok: false, message: 'Cuenta desactivada'
      });
    }

    const token = signToken({ id: user.id, username: user.username, email: user.email });
    logger.info(`Login Google: ${user.email}`);

    return res.json({
      ok: true, token,
      user: { id: user.id, username: user.username, email: user.email, plan: user.plan, avatar_url: user.avatar_url || null },
    });

  } catch (err) {
    logger.error('Google auth error:', err.message);
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      ok: false, message: err.message
    });
  }
}
