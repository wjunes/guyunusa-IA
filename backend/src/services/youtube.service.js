/**
 * youtube.service.js — Búsqueda de videos via YouTube Data API v3
 *
 * Requiere: YOUTUBE_API_KEY en .env
 * Cuota: 10.000 unidades/día (~100 búsquedas)
 */
import { logger } from '../utils/logger.js';

const API_KEY  = () => process.env.YOUTUBE_API_KEY || '';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * searchVideos — Busca videos en YouTube.
 * @param {string} query — términos de búsqueda
 * @param {number} maxResults — cantidad de resultados (default 3)
 * @returns {Array<{videoId, title, channel, thumbnail}>}
 */
export async function searchVideos(query, maxResults = 3) {
  const key = API_KEY();
  if (!key) {
    logger.warn('[youtube] YOUTUBE_API_KEY no configurada');
    return [];
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: String(maxResults),
    order: 'relevance',
    safeSearch: 'moderate',
    relevanceLanguage: 'es',
    key,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`, {
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`[youtube] API ${response.status}: ${errText.slice(0, 200)}`);
      return [];
    }

    const data = await response.json();
    const results = (data.items || []).map(item => ({
      videoId:   item.id?.videoId || '',
      title:     item.snippet?.title || '',
      channel:   item.snippet?.channelTitle || '',
      thumbnail: item.snippet?.thumbnails?.high?.url ||
                 item.snippet?.thumbnails?.default?.url || '',
    })).filter(r => r.videoId);

    logger.info(`[youtube] "${query}" → ${results.length} videos`);
    return results;
  } catch (err) {
    logger.error(`[youtube] Error: ${err.message}`);
    return [];
  }
}

/**
 * isVideoQuery — Detecta si la consulta pide un video.
 * @param {string} query
 * @returns {boolean}
 */
export function isVideoQuery(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return /\b(video|videos|mostra.*video|pasa.*video|quiero ver|dejame ver|haceme ver|mira este|pon.*video|youtube|tutorial en video|clip)\b/.test(q);
}
