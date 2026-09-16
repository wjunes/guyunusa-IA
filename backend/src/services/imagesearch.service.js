/**
 * imagesearch.service.js — Búsqueda de imágenes via Brave
 *
 * Estrategia dual: Brave Image Search, fallback a Web Search con thumbnails.
 * Usa la misma BRAVE_SEARCH_API_KEY.
 */
import { logger } from '../utils/logger.js';

const API_KEY     = () => process.env.BRAVE_SEARCH_API_KEY || '';
const WEB_URL     = 'https://api.search.brave.com/res/v1/web/search';
const IMAGES_URL  = 'https://api.search.brave.com/res/v1/images/search';

export async function searchImages(query, count = 3) {
  const key = API_KEY();
  if (!key) { logger.warn('[imagesearch] BRAVE_SEARCH_API_KEY no configurada'); return []; }

  let results = await tryImageSearch(key, query, count);
  if (results.length > 0) return results;
  return await tryWebSearchForImages(key, query, count);
}

async function tryImageSearch(key, query, count) {
  try {
    const params = new URLSearchParams({ q: query, count: String(Math.min(count, 10)), safesearch: 'moderate' });
    const response = await fetch(`${IMAGES_URL}?${params}`, {
      headers: { 'Accept': 'application/json', 'X-Subscription-Token': key },
      signal: AbortSignal.timeout(6_000),
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results || []).slice(0, count).map(r => ({
      url: r.properties?.url || r.url || '',
      thumbnail: r.thumbnail?.src || r.properties?.url || '',
      title: r.title || '',
      source: r.source || '',
    })).filter(r => r.thumbnail);
  } catch { return []; }
}

async function tryWebSearchForImages(key, query, count) {
  try {
    const params = new URLSearchParams({ q: `foto ${query}`, count: String(Math.min(count + 2, 10)), safesearch: 'moderate' });
    const response = await fetch(`${WEB_URL}?${params}`, {
      headers: { 'Accept': 'application/json', 'X-Subscription-Token': key },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return [];
    const data = await response.json();
    const results = (data.web?.results || [])
      .filter(r => r.thumbnail?.src)
      .slice(0, count)
      .map(r => ({
        url: r.url || '',
        thumbnail: r.thumbnail?.src || '',
        title: r.title || '',
        source: new URL(r.url).hostname.replace('www.', ''),
      }));
    logger.info(`[imagesearch] Web fallback "foto ${query}" → ${results.length} imágenes`);
    return results;
  } catch (err) {
    logger.error(`[imagesearch] Web fallback error: ${err.message}`);
    return [];
  }
}

/**
 * isImageQuery — Detecta si el usuario pide VER/BUSCAR una imagen.
 *
 * IMPORTANTE: solo matchea cuando hay INTENCIÓN EXPLÍCITA de ver una imagen.
 * NO matchea cuando "imagen" se usa en sentido figurado o contextual:
 *   ✓ "mostrá una imagen del Palacio Salvo"
 *   ✓ "foto de la Rambla"
 *   ✗ "la imagen de Uruguay en el exterior"
 *   ✗ "cómo mejorar mi imagen personal"
 *   ✗ "hablame de la imagen pública del gobierno"
 */
export function isImageQuery(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Si es generación, NO es búsqueda
  if (/\b(genera|generar|genere|generame|crea|crear|creame|dibuja|dibujar|dibujame)\b/.test(q)) return false;

  // Verbo de pedido + imagen/foto
  if (/\b(mostr[ae]|busca|enseña|encontra|quiero)\b.*\b(imagen|imagenes|foto|fotos|fotografia)\b/.test(q)) return true;

  // "foto/imagen de X" al inicio
  if (/^(foto|fotos|imagen|imagenes|fotografia) de[l]?\b/.test(q.trim())) return true;

  // "imagen del X" precedido de inicio o puntuación
  if (/(?:^|[.!?¿,])\s*(imagen|foto|fotos|imagenes) de[l]?\s+\w/i.test(q)) return true;

  // Pedir ver algo visualmente
  if (/\b(como se ve|como luce|quiero ver)\b/.test(q)) return true;

  return false;
}
