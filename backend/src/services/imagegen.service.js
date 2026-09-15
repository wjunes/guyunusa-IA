/**
 * imagegen.service.js — Generación de imágenes
 *
 * Motor principal: SiliconFlow (FLUX.1-dev) — $0.014/imagen, API OpenAI-compatible
 * Fallback: Pollinations.ai — gratis, sin API key
 *
 * .env: SF_API_KEY=tu_key_de_siliconflow
 */
import { logger } from '../utils/logger.js';

const SF_KEY   = () => process.env.SF_API_KEY || '';
const SF_URL   = 'https://api.siliconflow.com/v1/images/generations';
const SF_MODEL = 'black-forest-labs/FLUX.1-dev';

/**
 * isImageGenQuery — Detecta si el usuario pide GENERAR una imagen.
 */
export function isImageGenQuery(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return /\b(genera|generar|genere|generame|crea|crear|creame|dibuja|dibujar|dibujame|disena|disenar|disename|ilustra|ilustrar|ilustrame|haceme una imagen|haceme un dibujo|haceme una ilustracion|crea una imagen|genera una imagen|quiero una imagen generada|imagen generada de)\b/.test(q);
}

/**
 * optimizePrompt — Mejora el prompt para el modelo de imagen.
 */
function optimizePrompt(userPrompt) {
  let prompt = userPrompt
    .replace(/^(genera|generar|crea|crear|dibuja|dibujar|disena|ilustra|haceme)\s+(una\s+)?(imagen|foto|ilustracion|dibujo)\s+(de|del|sobre|con)\s+/i, '')
    .replace(/^(generame|creame|dibujame|diseñame|ilustrame)\s+(una\s+)?(imagen|foto|ilustracion|dibujo)\s+(de|del|sobre|con)\s+/i, '')
    .trim();

  if (prompt.length < 5) prompt = userPrompt;

  if (!/\b(4k|8k|hd|high quality|detailed|realistic|professional)\b/i.test(prompt)) {
    prompt += ', high quality, detailed, professional';
  }

  return prompt;
}

/**
 * generateImage — Genera imagen. SiliconFlow primero, Pollinations como fallback.
 */
export async function generateImage(prompt) {
  const optimized = optimizePrompt(prompt);

  // Intento 1: SiliconFlow (FLUX.1-dev)
  const sfResult = await trySiliconFlow(optimized);
  if (sfResult) return sfResult;

  // Intento 2: Pollinations (gratis)
  logger.info('[imagegen] SiliconFlow falló, intentando Pollinations...');
  return await tryPollinations(optimized);
}

/**
 * SiliconFlow — FLUX.1-dev via API OpenAI-compatible
 */
async function trySiliconFlow(prompt) {
  const key = SF_KEY();
  if (!key) {
    logger.warn('[imagegen] SF_API_KEY no configurado, saltando SiliconFlow');
    return null;
  }

  logger.info(`[imagegen] SiliconFlow: "${prompt.slice(0, 60)}..."`);
  const t0 = Date.now();

  try {
    const response = await fetch(SF_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: SF_MODEL,
        prompt,
        image_size: '1024x1024',
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`[imagegen] SiliconFlow ${response.status}: ${errText.slice(0, 200)}`);
      return null;
    }

    const data = await response.json();
    const imageUrl = data.images?.[0]?.url;

    if (!imageUrl) {
      logger.warn('[imagegen] SiliconFlow: sin URL de imagen en la respuesta');
      return null;
    }

    const elapsed = Date.now() - t0;
    logger.info(`[imagegen] SiliconFlow OK en ${elapsed}ms`);

    return {
      imageUrl,
      prompt,
      elapsed,
      provider: 'SiliconFlow FLUX.1-dev',
    };
  } catch (err) {
    logger.error(`[imagegen] SiliconFlow error: ${err.message}`);
    return null;
  }
}

/**
 * Pollinations.ai — Fallback gratis
 */
async function tryPollinations(prompt) {
  logger.info(`[imagegen] Pollinations: "${prompt.slice(0, 60)}..."`);
  const t0 = Date.now();
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(45_000),
    });

    if (!response.ok) {
      logger.error(`[imagegen] Pollinations ${response.status}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const dataUrl = `data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`;

    const elapsed = Date.now() - t0;
    logger.info(`[imagegen] Pollinations OK en ${elapsed}ms (${(buffer.byteLength / 1024).toFixed(0)}KB)`);

    return {
      dataUrl,
      prompt,
      elapsed,
      provider: 'Pollinations',
    };
  } catch (err) {
    logger.error(`[imagegen] Pollinations error: ${err.message}`);
    return null;
  }
}
