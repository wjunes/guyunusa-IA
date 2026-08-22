/**
 * imagesearch.service.js — Búsqueda de imágenes via Brave
 *
 * Estrategia dual: intenta Brave Image Search, si falla usa Web Search
 * extrayendo thumbnails. Misma BRAVE_SEARCH_API_KEY.
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

export function isImageQuery(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return /\b(imagen|imagenes|foto|fotos|fotografia|mostra.*imagen|mostra.*foto|como se ve|como luce|como es fisicamente|mostrame|enseñame|quiero ver.*foto)\b/.test(q);
}
