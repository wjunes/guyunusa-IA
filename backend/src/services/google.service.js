/**
 * google.service.js — Verificación de tokens de Google Identity Services
 *
 * Verifica el id_token que Google envía al frontend tras el login.
 * Sin SDK externo — usa el endpoint de Google directamente.
 *
 * Docs: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
 */
import { logger } from '../utils/logger.js';

const CLIENT_ID = () => process.env.GOOGLE_CLIENT_ID || '';

/**
 * Verifica un Google id_token y retorna el payload con los datos del usuario.
 * Lanza error si el token es inválido o expirado.
 *
 * @param {string} idToken — token recibido del frontend (credential del callback de GSI)
 * @returns {{ sub, email, name, picture, email_verified }}
 */
export async function verifyGoogleToken(idToken) {
  if (!CLIENT_ID()) {
    throw new Error('GOOGLE_CLIENT_ID no configurado en .env');
  }
  if (!idToken) {
    throw new Error('Token de Google no proporcionado');
  }

  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
    { signal: AbortSignal.timeout(8000) }
  );

  const payload = await res.json();

  if (!res.ok || payload.error) {
    logger.warn('Google token inválido:', payload.error || res.status);
    throw new Error('Token de Google inválido o expirado');
  }

  // Verificar que el token fue emitido para nuestra app
  if (payload.aud !== CLIENT_ID()) {
    throw new Error('Token de Google no corresponde a esta aplicación');
  }

  if (!payload.email_verified || payload.email_verified === 'false') {
    throw new Error('El email de Google no está verificado');
  }

  return {
    sub:            payload.sub,           // Google user ID único
    email:          payload.email,
    name:           payload.name || '',
    picture:        payload.picture || '',
    email_verified: true,
  };
}
