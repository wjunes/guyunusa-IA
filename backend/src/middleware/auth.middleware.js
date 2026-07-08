import jwt from 'jsonwebtoken';
import { getDB } from '../db/database.js';
import { logger } from '../utils/logger.js';
import { HTTP_STATUS, ERRORS } from '../../../shared/constants.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ ok: false, message: ERRORS.TOKEN_EXPIRED });
  }
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ── Verificación cruzada anti-colisión de ID (se mantiene igual) ──
    const db = getDB();
    const user = await db.prepare(
      'SELECT id, email, username, plan, avatar_url FROM users WHERE id = ? AND is_active = 1'
    ).get(payload.id);

    if (!user || user.email !== payload.email) {
      logger.warn(
        `[SECURITY] Token/DB mismatch — token.id=${payload.id} token.email=${payload.email} ` +
        `→ DB devolvió email=${user?.email ?? 'ninguno'}. Rechazando request.`
      );
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ ok: false, message: ERRORS.TOKEN_EXPIRED });
    }

    req.user = user;
    next();
  } catch {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ ok: false, message: ERRORS.TOKEN_EXPIRED });
  }
}
