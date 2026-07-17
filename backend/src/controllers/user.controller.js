import bcrypt from 'bcryptjs';
import { getDB } from '../db/database.js';
import { logger } from '../utils/logger.js';
import * as constants from '../../../shared/constants.js';
const { HTTP_STATUS } = constants;
import { processAvatar, deleteOldAvatar } from '../services/avatar.service.js';

const NOW = 'NOW()'; // MySQL — la versión SQLite usaba datetime('now')

export async function getProfile(req, res) {
  try {
    const db = getDB();
    const user = await db.prepare(
      'SELECT id, email, username, plan, avatar_url, created_at FROM users WHERE id = ?'
    ).get(req.user.id);
    if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ ok: false, message: 'Usuario no encontrado' });
    return res.json({ ok: true, user });
  } catch (err) {
    logger.error('Error en getProfile:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}

export async function updateProfile(req, res) {
  const { username, currentPassword, newPassword } = req.body;
  try {
    const db = getDB();
    const user = await db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ ok: false, message: 'Usuario no encontrado' });

    if (username && username.trim().length >= 3) {
      try {
        await db.prepare(`UPDATE users SET username = ?, updated_at = ${NOW} WHERE id = ?`)
          .run(username.trim(), req.user.id);
      } catch (err) {
        // MySQL reporta duplicados con err.code, no con texto libre como SQLite
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            ok: false, message: 'Ese nombre de usuario ya está en uso'
          });
        }
        throw err;
      }
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          ok: false, message: 'Ingresá tu contraseña actual'
        });
      }
      if (!bcrypt.compareSync(currentPassword, user.password)) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          ok: false, message: 'La contraseña actual es incorrecta'
        });
      }
      if (newPassword.length < 6) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          ok: false, message: 'La nueva contraseña debe tener al menos 6 caracteres'
        });
      }
      const hash = bcrypt.hashSync(newPassword, 10);
      await db.prepare(`UPDATE users SET password = ?, updated_at = ${NOW} WHERE id = ?`)
        .run(hash, req.user.id);
    }

    const updated = await db.prepare(
      'SELECT id, email, username, plan, avatar_url, created_at FROM users WHERE id = ?'
    ).get(req.user.id);
    return res.json({ ok: true, message: 'Perfil actualizado', user: updated });
  } catch (err) {
    logger.error('Error en updateProfile:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}

export async function deleteAccount(req, res) {
  const { password } = req.body;
  try {
    const db = getDB();
    const user = await db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ ok: false, message: 'Usuario no encontrado' });
    if (!password || !bcrypt.compareSync(password, user.password)) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ ok: false, message: 'Contraseña incorrecta' });
    }
    // ON DELETE CASCADE en schema.sql se encarga de conversations/messages/payments/sessions
    await db.prepare('DELETE FROM users WHERE id = ?').run(req.user.id);
    return res.json({ ok: true, message: 'Cuenta eliminada' });
  } catch (err) {
    logger.error('Error en deleteAccount:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}

/* ── Subir / actualizar avatar ── */
export async function uploadAvatar(req, res) {
  if (!req.file) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      ok: false, message: 'No se recibió ninguna imagen'
    });
  }

  try {
    const db = getDB();
    const user = await db.prepare('SELECT avatar_url FROM users WHERE id = ?').get(req.user.id);

    // Promise.resolve(...) tolera que processAvatar/deleteOldAvatar sean
    // síncronas o asíncronas sin depender de conocer su implementación exacta
    // (no vi avatar.service.js todavía — ver nota al final).
    if (user?.avatar_url) {
      await Promise.resolve(deleteOldAvatar(user.avatar_url)).catch(e =>
        logger.warn('No se pudo eliminar avatar anterior:', e.message)
      );
    }

    const avatarUrl = await Promise.resolve(processAvatar(req.file.path, req.user.id));

    await db.prepare(`UPDATE users SET avatar_url = ?, updated_at = ${NOW} WHERE id = ?`)
      .run(avatarUrl, req.user.id);

    logger.info(`Avatar actualizado: user_id=${req.user.id}`);
    return res.json({ ok: true, avatar_url: avatarUrl });
  } catch (err) {
    logger.error('Error procesando avatar:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({
      ok: false, message: 'Error al procesar la imagen: ' + err.message
    });
  }
}

/* ── Eliminar avatar ── */
export async function deleteAvatar(req, res) {
  try {
    const db = getDB();
    const user = await db.prepare('SELECT avatar_url FROM users WHERE id = ?').get(req.user.id);

    if (user?.avatar_url) {
      await Promise.resolve(deleteOldAvatar(user.avatar_url)).catch(e =>
        logger.warn('No se pudo eliminar avatar anterior:', e.message)
      );
    }

    await db.prepare(`UPDATE users SET avatar_url = NULL, updated_at = ${NOW} WHERE id = ?`)
      .run(req.user.id);

    return res.json({ ok: true, avatar_url: null });
  } catch (err) {
    logger.error('Error en deleteAvatar:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}
