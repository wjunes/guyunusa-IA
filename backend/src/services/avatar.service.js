/**
 * avatar.service.js — Procesamiento de imágenes de avatar
 * Usa sharp para redimensionar y recortar en círculo (máscara PNG)
 */
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dir      = dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = join(__dir, '../../uploads/avatars');
const SIZE       = 200; // px — avatar cuadrado 200x200

if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });

/**
 * Procesa la imagen subida:
 * - Redimensiona a 200x200 con recorte centrado (cover)
 * - Aplica máscara circular (canal alpha)
 * - Guarda como PNG
 * - Elimina el archivo temporal de multer
 * Retorna la URL pública relativa del avatar.
 */
export async function processAvatar(tempPath, userId) {
  // Import dinámico de sharp (ESM + cPanel compatibles)
  const sharp = (await import('sharp')).default;

  const filename  = `${userId}_${randomUUID().slice(0,8)}.png`;
  const outPath   = join(UPLOAD_DIR, filename);

  // Máscara circular: SVG que sharp usa para recortar
  const circle = Buffer.from(
    `<svg><circle cx="${SIZE/2}" cy="${SIZE/2}" r="${SIZE/2}"/></svg>`
  );

  await sharp(tempPath)
    .resize(SIZE, SIZE, { fit: 'cover', position: 'centre' })
    .composite([{ input: circle, blend: 'dest-in' }])
    .png()
    .toFile(outPath);

  // Eliminar archivo temporal de multer
  try { unlinkSync(tempPath); } catch { /* noop */ }

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
