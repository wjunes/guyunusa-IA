/**
 * avatar.service.js — Guardado de avatar
 *
 * El recorte circular ya lo hace el browser con Canvas API
 * antes de subir. El backend solo mueve el archivo a su lugar
 * definitivo y elimina el temporal de multer.
 * Sin dependencias nativas — funciona en cualquier hosting.
 */
import { existsSync, mkdirSync, renameSync,
         copyFileSync, unlinkSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dir      = dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = join(__dir, '../../uploads/avatars');

if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });

/**
 * Mueve el archivo temporal de multer a uploads/avatars/
 * y retorna la URL pública relativa.
 */
export function processAvatar(tempPath, userId) {
  const ext      = extname(tempPath) || '.png'; // multer usa nombre sin ext en /tmp
  const filename = `${userId}_${randomUUID().slice(0, 8)}${ext}`;
  const destPath = join(UPLOAD_DIR, filename);

  try {
    renameSync(tempPath, destPath);
  } catch {
    // Si renameSync falla entre distintos dispositivos/particiones
    try { copyFileSync(tempPath, destPath); } catch { /* noop */ }
    try { unlinkSync(tempPath); } catch { /* noop */ }
  }

  return `/uploads/avatars/${filename}`;
}

/**
 * Elimina el avatar anterior del disco si existe.
 */
export function deleteOldAvatar(avatarUrl) {
  if (!avatarUrl) return;
  try {
    const filename = avatarUrl.split('/').pop();
    const filePath = join(UPLOAD_DIR, filename);
    if (existsSync(filePath)) unlinkSync(filePath);
  } catch { /* noop */ }
}
