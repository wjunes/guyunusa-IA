/**
 * websearch.service.js — Búsqueda web en tiempo real via Brave Search API
 *
 * Se usa como complemento del RAG (BNC-UY):
 *   - Si la consulta es sobre Uruguay → BNC-UY responde (knowledge.service)
 *   - Si la consulta es sobre temas globales/actuales → búsqueda web
 *   - Ambos pueden combinarse cuando tiene sentido
 *
 * Brave Search API Free: 2.000 búsquedas/mes, uso comercial permitido.
 * Docs: https://api.search.brave.com/app/documentation/web-search
 */
import { logger } from '../utils/logger.js';

const API_KEY  = () => process.env.BRAVE_SEARCH_API_KEY || '';
const BASE_URL = 'https://api.search.brave.com/res/v1/web/search';

/**
 * webSearch — Busca en la web via Brave Search.
 * @param {string} query — consulta del usuario
 * @param {object} opts
 * @param {number} opts.count — cantidad de resultados (default 5, max 20)
 * @param {string} opts.lang — idioma preferido (default 'es')
 * @param {boolean} opts.freshness — priorizar resultados recientes
 * @returns {Array<{title, url, description}>} resultados
 */
export async function webSearch(query, { count = 5, lang = 'es' } = {}) {
  const key = API_KEY();
  if (!key) {
    logger.warn('[websearch] BRAVE_SEARCH_API_KEY no configurada');
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    count: String(Math.min(count, 20)),
    text_decorations: 'false',
    safesearch: 'moderate',
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': key,
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`[websearch] Brave HTTP ${response.status}: ${errText.slice(0, 200)}`);
      return [];
    }

    const data = await response.json();

    // Log de diagnóstico
    if (!data.web?.results?.length) {
      logger.warn(`[websearch] Brave OK pero sin resultados para: "${query}" | keys: ${Object.keys(data).join(',')}`);
    }

    const results = (data.web?.results || []).slice(0, count).map(r => ({
      title:       r.title || '',
      url:         r.url || '',
      description: r.description || '',
    }));

    logger.info(`[websearch] "${query}" → ${results.length} resultados`);
    return results;
  } catch (err) {
    logger.error(`[websearch] Error: ${err.message}`);
    return [];
  }
}

/**
 * buildWebContext — Construye el bloque de contexto para inyectar en el prompt.
 * @param {string} query — consulta del usuario
 * @param {object} opts — opciones de búsqueda
 * @returns {object|null} { context, sources } o null si no hay resultados
 */
export async function buildWebContext(query, opts = {}) {
  const results = await webSearch(query, opts);
  if (results.length === 0) return null;

  let context = '';
  const sources = [];

  for (const r of results) {
    const snippet = r.description.length > 300
      ? r.description.slice(0, 300) + '…'
      : r.description;
    context += `\n\n### ${r.title}\n${snippet}\nFuente: ${r.url}`;
    sources.push({ title: r.title, url: r.url });
  }

  return {
    context: context.trim(),
    sources,
  };
}

/**
 * isWebSearchQuery — Detecta si la consulta se beneficiaría de búsqueda web.
 * Retorna true para temas globales/actuales que el RAG no cubre.
 * @param {string} query
 * @returns {boolean}
 */
export function isWebSearchQuery(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const webPatterns = [
    // Cine y series
    /\b(pelicula|peliculas|serie|series|estreno|estrenos|estrenaron|trailer|temporada)\b/,
    /\b(netflix|hbo|disney|amazon prime|apple tv|paramount|streaming|plataforma)\b/,
    /\b(actor|actriz|actores|director|directora|oscar|emmy|golden globe)\b/,
    /\b(cartelera|cine|cinema|taquilla|box office)\b/,
    // Deportes internacionales
    /\b(champions league|premier league|la liga|serie a|bundesliga|ligue 1)\b/,
    /\b(nba|nfl|mlb|formula 1|f1|mundial|eurocopa|copa america)\b/,
    /\b(futbol europeo|futbol internacional|liga europea|ligas europeas)\b/,
    /\b(resultado|resultados|gano|ganar|perdio|empato|empate|goles|marcador)\b/,
    /\b(clasificacion|posiciones|tabla|fixture|jornada|partido|partidos)\b/,
    /\b(transferencia|fichaje|fichajes|traspaso|mercado de pases)\b/,
    /\b(messi|ronaldo|mbappe|haaland|vinicius|bellingham)\b/,
    /\b(real madrid|barcelona|manchester|liverpool|psg|bayern|juventus|inter)\b/,
    // Actualidad y noticias
    /\b(hoy|ayer|esta semana|este mes|este ano|actual|actualmente|ahora)\b/,
    /\b(ultimo|ultima|ultimos|ultimas|reciente|recientes|nuevo|nueva|nuevos)\b/,
    /\b(noticia|noticias|novedad|novedades|paso|sucedio|ocurrio)\b/,
    /\b(fin de semana|este finde|esta noche|anoche)\b/,
    // Tecnología actual
    /\b(iphone|android|windows|samsung|tesla|spacex|openai|chatgpt|gemini)\b/,
    /\b(lanzamiento|lanzaron|lanzo|version|actualizacion)\b/,
    // Precios, disponibilidad
    /\b(precio|cuesta|vale|donde (ver|comprar|conseguir))\b/,
    /\b(disponible en|plataforma|donde puedo ver)\b/,
    // Clima y eventos
    /\b(clima|pronostico|temperatura|lluvia|tormenta)\b/,
    // Explícitamente pide buscar
    /\b(busca|buscar|googlea|search|investiga)\b/,
  ];

  return webPatterns.some(re => re.test(q));
}
