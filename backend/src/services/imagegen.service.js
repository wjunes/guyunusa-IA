/**
 * imagegen.service.js — Generación de imágenes
 *
 * Motor: Pollinations.ai — nuevo endpoint gen.pollinations.ai
 *
 * v3.1 — Fix de modelos y diagnóstico de API key.
 *   - Endpoint: gen.pollinations.ai/image/{prompt} (reemplaza image.pollinations.ai)
 *   - Soporte de API key vía POLLINATIONS_API_KEY en .env / cPanel Node.js panel
 *   - Modelo primario: flux (alias de flux.1-schnell — rápido, gratuito, 99.8% uptime)
 *   - Fallback: z-image-turbo (alias de tongyi-mai/z-image-turbo — 99.9% uptime)
 *   - Parámetro enhance removido (no soportado en nuevo endpoint)
 *   - Timeout 90s para modelos lentos
 *   - Log de diagnóstico de API key al arrancar
 */
import { logger } from '../utils/logger.js';

/**
 * Lectura LAZY de la API key — NO al cargar el módulo.
 *
 * En ES Modules todos los imports se resuelven ANTES de que corra
 * dotenvConfig() en server.js. Si leemos process.env aquí arriba,
 * dotenv todavía no cargó el .env y la variable llega vacía.
 *
 * Con esta función, la key se lee en el momento del primer request,
 * cuando dotenv ya corrió.
 */
let _cachedKey = null;
let _keyLogged = false;

function getPollinationsKey() {
  if (_cachedKey !== null) return _cachedKey;
  _cachedKey = process.env.POLLINATIONS_API_KEY || '';

  // Log de diagnóstico (solo la primera vez)
  if (!_keyLogged) {
    _keyLogged = true;
    if (_cachedKey) {
      const masked = _cachedKey.slice(0, 4) + '...' + _cachedKey.slice(-4);
      logger.info(`[imagegen] POLLINATIONS_API_KEY cargada: ${masked} (${_cachedKey.length} chars)`);
    } else {
      logger.warn('[imagegen] ⚠ POLLINATIONS_API_KEY no encontrada — las requests irán sin autenticación');
    }
  }
  return _cachedKey;
}

/**
 * isImageGenQuery — Detecta si el usuario pide GENERAR una imagen.
 *
 * Cubre español rioplatense: "haceme", "generame", "dibujame", "creame",
 * "diseñame", "ilustrame", más formas imperativas e infinitivas.
 */
export function isImageGenQuery(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Formas directas: "genera/crea/dibuja/diseña/ilustra una imagen de..."
  if (/\b(genera|generar|genere|generame|crea|crear|creame|dibuja|dibujar|dibujame|disena|disenar|disename|ilustra|ilustrar|ilustrame)\b/.test(q))
    return true;

  // Frases: "haceme una imagen/foto/dibujo de..."
  if (/\b(haceme|hazme|haz|hace)\s+(una?\s+)?(imagen|foto|fotografia|dibujo|ilustracion|pintura|retrato|poster|afiche|logo|icono|avatar)\b/.test(q))
    return true;

  // "quiero/necesito una imagen de..."
  if (/\b(quiero|necesito|podrias|podrias hacerme|me haces)\s+(una?\s+)?(imagen|foto|fotografia|dibujo|ilustracion)\b/.test(q))
    return true;

  // "imagen de..." al inicio (pedido directo)
  if (/^(una?\s+)?(imagen|foto|fotografia|dibujo|ilustracion)\s+(de|del|sobre|con)\s+/i.test(q.trim()))
    return true;

  // "genera imagen", "crear imagen" (sin artículo)
  if (/\b(genera|crea|dibuja|disena|ilustra)\s+(imagen|foto|fotografia|dibujo|ilustracion)\b/.test(q))
    return true;

  return false;
}

/**
 * optimizePrompt — Mejora el prompt para el modelo de imagen.
 *
 * Limpia prefijos conversacionales en español y agrega calidad
 * si el usuario no especificó estilo.
 */
function optimizePrompt(userPrompt) {
  let prompt = userPrompt
    // Limpiar prefijos de pedido
    .replace(/^(genera|generar|crea|crear|dibuja|dibujar|disena|disenar|ilustra|ilustrar|haceme|hazme|haz|hace)\s+(una?\s+)?(imagen|foto|fotografia|ilustracion|dibujo|pintura|retrato|poster|afiche|logo|icono|avatar)\s+(de|del|sobre|con)\s+/i, '')
    .replace(/^(generame|creame|dibujame|diseñame|diseñame|ilustrame)\s+(una?\s+)?(imagen|foto|fotografia|ilustracion|dibujo|pintura|retrato|poster|afiche|logo|icono|avatar)\s+(de|del|sobre|con)\s+/i, '')
    .replace(/^(quiero|necesito|podrias|me haces)\s+(una?\s+)?(imagen|foto|fotografia|dibujo|ilustracion)\s+(de|del|sobre|con)\s+/i, '')
    .trim();

  if (prompt.length < 5) prompt = userPrompt;

  // Agregar calidad si no tiene indicadores de estilo
  if (!/\b(4k|8k|hd|high quality|detailed|realistic|professional|artistic|watercolor|oil painting|digital art|pixel art|anime|cartoon|minimalist|documental|cinematogra)\b/i.test(prompt)) {
    prompt += ', high quality, detailed';
  }

  return prompt;
}

/**
 * generateImage — Genera imagen usando Pollinations.ai.
 *
 * Intenta primero con flux.1-schnell (rápido),
 * si falla reintenta con el modelo default del servidor.
 *
 * @param {string} prompt — Descripción de la imagen a generar
 * @returns {{ imageUrl, dataUrl, prompt, elapsed, provider } | null}
 */
export async function generateImage(prompt) {
  const optimized = optimizePrompt(prompt);

  // Intento 1: flux (alias de black-forest-labs/flux.1-schnell — rápido, 99.8% uptime)
  const result = await tryPollinations(optimized, 'flux');
  if (result) return result;

  // Intento 2: z-image-turbo (alias de tongyi-mai/z-image-turbo — 99.9% uptime)
  logger.info('[imagegen] Reintentando con z-image-turbo...');
  return await tryPollinations(optimized, 'z-image-turbo');
}

/**
 * Pollinations.ai — Nuevo endpoint gen.pollinations.ai
 *
 * Endpoint: GET https://gen.pollinations.ai/image/{prompt}
 * Parámetros: model, width, height, seed, safe, key
 *
 * La respuesta es la imagen directa (binary), que convertimos a data URL
 * para enviar inline al frontend.
 */
async function tryPollinations(prompt, model) {
  const modelLabel = model || 'default';
  logger.info(`[imagegen] Pollinations (${modelLabel}): "${prompt.slice(0, 80)}..."`);
  const t0 = Date.now();

  const encodedPrompt = encodeURIComponent(prompt);

  const params = new URLSearchParams({
    width:  '1024',
    height: '1024',
    safe:   'true',
    seed:   '-1',  // aleatorio
  });

  if (model) {
    params.set('model', model);
  }

  // API key mejora rate limits y remueve watermark
  const apiKey = getPollinationsKey();
  if (apiKey) {
    params.set('key', apiKey);
  }

  const url = `https://gen.pollinations.ai/image/${encodedPrompt}?${params}`;

  // Log de diagnóstico: confirmar que la key va en la URL
  const hasKey = params.has('key');
  logger.info(`[imagegen] Request URL modelo=${modelLabel}, key_presente=${hasKey}, params=${[...params.keys()].join(',')}`);

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(90_000),  // 90s — modelos pueden tardar
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      logger.error(`[imagegen] Pollinations HTTP ${response.status}: ${body.slice(0, 300)}`);
      return null;
    }

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength < 1000) {
      // Respuesta muy pequeña = probable error en texto
      const text = new TextDecoder().decode(buffer);
      logger.error(`[imagegen] Pollinations respuesta sospechosamente pequeña: ${text.slice(0, 200)}`);
      return null;
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const dataUrl = `data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`;

    const elapsed = Date.now() - t0;
    const sizeKB = (buffer.byteLength / 1024).toFixed(0);
    logger.info(`[imagegen] Pollinations OK en ${elapsed}ms (${sizeKB}KB, modelo: ${modelLabel})`);

    return {
      imageUrl: dataUrl,   // ← el controller chequea result?.imageUrl
      dataUrl,             // ← compatibilidad con frontend
      prompt,
      elapsed,
      provider: `Pollinations ${modelLabel}`,
    };
  } catch (err) {
    logger.error(`[imagegen] Pollinations error (${modelLabel}): ${err.message}`);
    return null;
  }
}
