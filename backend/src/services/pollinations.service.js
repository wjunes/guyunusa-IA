/**
 * pollinations.service.js
 * ──────────────────────────────────────────────────
 * Servicio de edición/transformación de imágenes
 * usando Pollinations.ai kontext (FLUX.1 Kontext Pro).
 *
 * Fase 2: img2img — el usuario sube una imagen y describe
 * la transformación deseada; el servicio devuelve la imagen
 * modificada como buffer de bytes.
 *
 * Endpoint POST: https://gen.pollinations.ai/v1/images/generations
 * (OpenAI-compatible, acepta base64 como array en "image")
 * ──────────────────────────────────────────────────
 */

import { logger } from '../utils/logger.js';

const POLLINATIONS_URL = 'https://gen.pollinations.ai/v1/images/generations';
// Se lee lazy porque dotenv carga después de los imports en ES modules
function getApiKey() {
  return process.env.POLLINATIONS_API_KEY || '';
}

// Timeout generoso — la generación de imagen puede demorar
const REQUEST_TIMEOUT_MS = 120_000; // 2 minutos

/**
 * Transforma una imagen usando Pollinations kontext.
 *
 * @param {string} imageBase64 — data URI completa (data:image/...;base64,...)
 * @param {string} prompt — instrucción de transformación
 * @param {object} [opts]
 * @param {number} [opts.width=1024]
 * @param {number} [opts.height=1024]
 * @param {number} [opts.seed]   — semilla para reproducibilidad
 * @returns {Promise<{ base64: string, contentType: string }>}
 *          base64 = data URI de la imagen resultante
 */
export async function transformImage(imageBase64, prompt, opts = {}) {
  const { width = 1024, height = 1024, seed } = opts;

  logger.info(`[pollinations] kontext — prompt: "${prompt.slice(0, 80)}…"`);

  const body = {
    model: 'kontext',
    prompt,
    image: [imageBase64],          // array workaround (issue #17456)
    width,
    height,
  };
  if (seed != null) body.seed = seed;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const apiKey = getApiKey();
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    logger.info(`[pollinations] API key: ${apiKey ? `${apiKey.length} chars` : 'NO DEFINIDA'}`);

    const res = await fetch(POLLINATIONS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => `HTTP ${res.status}`);
      throw new Error(`Pollinations respondió ${res.status}: ${errText.slice(0, 200)}`);
    }

    // La respuesta puede ser:
    // A) JSON OpenAI-style con url o b64_json
    // B) Bytes de imagen directamente
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      // Formato OpenAI: { data: [{ url, b64_json }] }
      const json = await res.json();
      if (json.data?.[0]?.b64_json) {
        const mime = 'image/png';
        return {
          base64: `data:${mime};base64,${json.data[0].b64_json}`,
          contentType: mime,
        };
      }
      if (json.data?.[0]?.url) {
        // Descargar la imagen desde la URL
        const imgRes = await fetch(json.data[0].url);
        const buf = Buffer.from(await imgRes.arrayBuffer());
        const imgType = imgRes.headers.get('content-type') || 'image/png';
        return {
          base64: `data:${imgType};base64,${buf.toString('base64')}`,
          contentType: imgType,
        };
      }
      throw new Error('Respuesta JSON inesperada de Pollinations');
    }

    // Respuesta directa como bytes de imagen
    const buf = Buffer.from(await res.arrayBuffer());
    const imgMime = contentType.includes('image/') ? contentType.split(';')[0].trim() : 'image/png';
    return {
      base64: `data:${imgMime};base64,${buf.toString('base64')}`,
      contentType: imgMime,
    };

  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Pollinations: timeout — la generación demoró demasiado');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
