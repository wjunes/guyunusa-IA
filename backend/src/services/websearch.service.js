/**
 * websearch.service.js — Búsqueda web optimizada via Brave Search API
 *
 * Complementa RAG (BNC-UY) con información global/actual.
 * Brave Search API Free: 2.000 búsquedas/mes, uso comercial permitido.
 *
 * Mejoras v1.3:
 *   - Search Intent: detecta tipo de consulta (factual, news, technical, etc.)
 *   - Query Optimization: genera query optimizada para Brave
 *   - Parámetros dinámicos (freshness, country, count según intención)
 *   - Source Quality: prioriza fuentes oficiales y confiables
 *   - Deduplicación de resultados
 *   - Cache en memoria para consultas idénticas recientes
 *   - Search Depth: quick / standard / deep
 *   - Métricas de monitoreo
 */
import { logger } from '../utils/logger.js';

const API_KEY  = () => process.env.BRAVE_SEARCH_API_KEY || '';
const BASE_URL = 'https://api.search.brave.com/res/v1/web/search';

// ══════════════════════════════════════════════════════════════
//  CACHE EN MEMORIA
// ══════════════════════════════════════════════════════════════
const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;   // 5 minutos
const CACHE_MAX = 50;               // máximo entradas

function getCached(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { _cache.delete(key); return null; }
  return entry.data;
}

function setCache(key, data) {
  if (_cache.size >= CACHE_MAX) {
    const oldest = _cache.keys().next().value;
    _cache.delete(oldest);
  }
  _cache.set(key, { data, ts: Date.now() });
}

// ══════════════════════════════════════════════════════════════
//  MÉTRICAS
// ══════════════════════════════════════════════════════════════
const _metrics = {
  totalSearches: 0,
  cacheHits: 0,
  cacheMisses: 0,
  errors: 0,
  avgResponseMs: 0,
  _responseTimes: [],
};

export function getSearchMetrics() {
  return { ..._metrics, cacheSize: _cache.size, _responseTimes: undefined };
}

// ══════════════════════════════════════════════════════════════
//  SEARCH INTENT — Clasificación de consulta
// ══════════════════════════════════════════════════════════════
const INTENTS = {
  news:       { freshness: 'pw', count: 5, depth: 'standard' },
  current:    { freshness: 'pm', count: 5, depth: 'standard' },
  factual:    { freshness: null, count: 3, depth: 'quick' },
  technical:  { freshness: null, count: 5, depth: 'standard' },
  legal:      { freshness: null, count: 5, depth: 'deep' },
  academic:   { freshness: null, count: 5, depth: 'deep' },
  historical: { freshness: null, count: 3, depth: 'quick' },
  commercial: { freshness: 'pm', count: 5, depth: 'standard' },
  local:      { freshness: null, count: 5, depth: 'standard' },
  comparative:{ freshness: null, count: 6, depth: 'deep' },
  multimedia: { freshness: null, count: 3, depth: 'quick' },
};

function classifyIntent(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // News: noticias, actualidad inmediata
  if (/\b(noticia|noticias|novedad|hoy|ayer|anoche|esta semana|esta noche|paso|sucedio|ocurrio|ultimo momento|urgente|breaking)\b/.test(q))
    return 'news';

  // Current: estado actual de algo
  if (/\b(actualmente|ahora|en este momento|actual|vigente|como esta|como van|en que punto|que pasa con|semana pasada|este mes|este ano|luego de|despues de|tras el)\b/.test(q))
    return 'current';

  // Legal
  if (/\b(ley|decreto|norma|regulacion|legislacion|codigo|constitucion|juridic|legal|tribunal|sentencia|jurisprudencia)\b/.test(q))
    return 'legal';

  // Academic
  if (/\b(estudio|investigacion|paper|articulo cientifico|universidad|tesis|academico|cientific|pubmed|peer.?review)\b/.test(q))
    return 'academic';

  // Technical
  if (/\b(como (funciona|instalar|configurar|implementar|programar)|tutorial|documentacion|api|framework|libreria|version|error|bug|debug|codigo|code)\b/.test(q))
    return 'technical';

  // Commercial: precios, productos, comparaciones de compra
  if (/\b(precio|cuesta|vale|comprar|tienda|oferta|descuento|mercadolibre|amazon|aliexpress|donde consigo)\b/.test(q))
    return 'commercial';

  // Comparative
  if (/\b(vs|versus|comparar|comparacion|comparativa|diferencia entre|mejor entre|cual es mejor|ventajas|desventajas)\b/.test(q))
    return 'comparative';

  // Local: específico de Uruguay
  if (/\b(uruguay|montevideo|departamento|intendencia|imm|ute|antel|ose|bps|brou|mgap)\b/.test(q))
    return 'local';

  // Historical
  if (/\b(historia|historico|siglo|antigua|antiguo|origen|fundacion|ano \d{4}|decada|epoca)\b/.test(q))
    return 'historical';

  // Multimedia
  if (/\b(video|imagen|foto|pelicula|serie|musica|cancion|trailer|clip)\b/.test(q))
    return 'multimedia';

  // Factual: lo demás
  return 'factual';
}

// ══════════════════════════════════════════════════════════════
//  QUERY OPTIMIZATION — Mejora la query para Brave
// ══════════════════════════════════════════════════════════════
function optimizeQuery(query, intent) {
  let q = query.trim();

  // Eliminar prefijos conversacionales
  q = q.replace(/^(che|bo|dale|bueno|mira|decime|contame|explicame|hablame|mostrame|muestrame|enseñame)\s+/i, '');
  q = q.replace(/^(quiero saber|me gustaria saber|podrias decirme|sabes|necesito saber)\s+(sobre|de|si|que|donde|como|cuando)\s+/i, '');

  // Eliminar stopwords que no aportan a la búsqueda
  const stopwords = /\b(es|la|el|de|en|un|una|los|las|del|al|por|para|con|que|se|su|este|esta|son|muy)\b/gi;
  const cleaned = q.replace(stopwords, ' ').replace(/\s{2,}/g, ' ').trim();

  // Usar la versión limpia solo si no queda demasiado corta
  if (cleaned.split(/\s+/).length >= 3) {
    q = cleaned;
  }

  // Para news/current, agregar contexto temporal si no tiene
  if (intent === 'news' && !/\b(hoy|ayer|2026|2025|esta semana|este mes|este ano)\b/i.test(q)) {
    q += ' 2026';
  }
  if (intent === 'current' && !/\b(2026|2025|actual)\b/i.test(q)) {
    q += ' 2026';
  }

  // Para local, asegurar contexto uruguayo
  if (intent === 'local' && !/\b(uruguay|uruguayo|uruguaya|montevideo)\b/i.test(q)) {
    q += ' Uruguay';
  }

  // Limitar longitud (más flexible: 15 palabras)
  const words = q.split(/\s+/);
  if (words.length > 15) {
    q = words.slice(0, 15).join(' ');
  }

  return q;
}

// ══════════════════════════════════════════════════════════════
//  SOURCE QUALITY — Priorización de fuentes
// ══════════════════════════════════════════════════════════════
const SOURCE_TIERS = [
  // Tier 1: Oficiales y gubernamentales
  { score: 10, patterns: [/\.gub\.uy$/, /\.gov\./, /\.go\./, /\.int$/] },
  // Tier 2: Académicas
  { score: 8, patterns: [/\.edu\./, /\.ac\./, /scholar\.google/, /pubmed/] },
  // Tier 3: Medios reconocidos
  { score: 7, patterns: [/elpais\.com\.uy/, /elobservador\.com\.uy/, /montevideo\.com\.uy/,
    /reuters\.com/, /bbc\.com/, /apnews\.com/, /france24/, /dw\.com/, /cnn\.com/,
    /nytimes\.com/, /theguardian\.com/, /efe\.com/] },
  // Tier 4: Especializadas
  { score: 5, patterns: [/wikipedia\.org/, /britannica/, /stackoverflow/, /github\.com/,
    /docs\./, /developer\./, /medium\.com/] },
];

function getSourceScore(url) {
  try {
    const hostname = new URL(url).hostname;
    for (const tier of SOURCE_TIERS) {
      if (tier.patterns.some(p => p.test(hostname))) return tier.score;
    }
  } catch { /* URL inválida */ }
  return 1; // Tier genérico
}

// ══════════════════════════════════════════════════════════════
//  DEDUPLICACIÓN Y RANKING
// ══════════════════════════════════════════════════════════════
function deduplicateAndRank(results) {
  // Deduplicar por dominio (mantener el mejor de cada dominio)
  const byDomain = new Map();
  for (const r of results) {
    try {
      const domain = new URL(r.url).hostname.replace('www.', '');
      const existing = byDomain.get(domain);
      if (!existing || r._score > existing._score) {
        byDomain.set(domain, r);
      }
    } catch {
      byDomain.set(r.url, r);
    }
  }

  // Ordenar por score (mayor primero)
  return Array.from(byDomain.values())
    .sort((a, b) => (b._score || 0) - (a._score || 0));
}

// ══════════════════════════════════════════════════════════════
//  BÚSQUEDA PRINCIPAL
// ══════════════════════════════════════════════════════════════
/**
 * webSearch — Busca en la web via Brave Search con optimizaciones.
 */
export async function webSearch(query, { count = 5 } = {}) {
  const key = API_KEY();
  if (!key) {
    logger.warn('[websearch] BRAVE_SEARCH_API_KEY no configurada');
    return [];
  }

  const intent = classifyIntent(query);
  const config = INTENTS[intent] || INTENTS.factual;
  const optimizedQuery = optimizeQuery(query, intent);
  const finalCount = Math.min(count || config.count, 20);

  // Cache check
  const cacheKey = `${optimizedQuery}:${intent}:${finalCount}`;
  const cached = getCached(cacheKey);
  if (cached) {
    _metrics.cacheHits++;
    logger.info(`[websearch] Cache hit: "${optimizedQuery}" (${intent})`);
    return cached;
  }
  _metrics.cacheMisses++;

  // Parámetros dinámicos
  const params = new URLSearchParams({
    q: optimizedQuery,
    count: String(finalCount),
    text_decorations: 'false',
    safesearch: 'moderate',
  });

  if (config.freshness) params.set('freshness', config.freshness);
  // country removido — causa errores en plan Free de Brave

  const t0 = Date.now();
  _metrics.totalSearches++;

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
      _metrics.errors++;
      return [];
    }

    const data = await response.json();
    const elapsed = Date.now() - t0;
    _metrics._responseTimes.push(elapsed);
    if (_metrics._responseTimes.length > 100) _metrics._responseTimes.shift();
    _metrics.avgResponseMs = Math.round(
      _metrics._responseTimes.reduce((a, b) => a + b, 0) / _metrics._responseTimes.length
    );

    if (!data.web?.results?.length) {
      logger.warn(`[websearch] Sin resultados: "${optimizedQuery}" (${intent}) ${elapsed}ms`);
      return [];
    }

    // Procesar, puntuar y rankear
    const results = data.web.results.map(r => ({
      title:       r.title || '',
      url:         r.url || '',
      description: r.description || '',
      _score:      getSourceScore(r.url),
    }));

    const ranked = deduplicateAndRank(results).slice(0, finalCount);

    logger.info(`[websearch] "${optimizedQuery}" (${intent}) → ${ranked.length} resultados, ${elapsed}ms`);

    // Cachear si no es news (muy dinámico)
    if (intent !== 'news') {
      setCache(cacheKey, ranked);
    }

    return ranked;
  } catch (err) {
    _metrics.errors++;
    logger.error(`[websearch] Error: ${err.message}`);
    return [];
  }
}

// ══════════════════════════════════════════════════════════════
//  BUILD CONTEXT — Construye contexto para el LLM
// ══════════════════════════════════════════════════════════════
/**
 * buildWebContext — Construye el bloque de contexto para inyectar en el prompt.
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

// ══════════════════════════════════════════════════════════════
//  DETECCIÓN DE INTENCIÓN WEB — isWebSearchQuery
// ══════════════════════════════════════════════════════════════
/**
 * isWebSearchQuery — Detecta si la consulta necesita búsqueda web.
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
    // Política internacional y actualidad
    /\b(milei|lula|trump|biden|macron|putin|zelensky|modi|maduro|boric)\b/,
    /\b(diplomatica|diplomaticas|diplomatico|diplomacia|embajada|canciller)\b/,
    /\b(relaciones.*entre|conflicto.*entre|tension.*entre|guerra.*entre)\b/,
    /\b(sancion|sanciones|bloqueo|embargo|tratado|acuerdo|cumbre|g20|g7)\b/,
    /\b(eleccion|elecciones|votacion|referendum|plebiscito|balotaje)\b/,
    /\b(congreso|senado|parlamento|asamblea|decreto|ley.*aprob)\b/,
    /\b(crisis|conflicto|guerra|invasion|ataque|atentado|terremoto|huracan)\b/,
    /\b(onu|otan|union europea|mercosur|oea|fmi|banco mundial)\b/,
    // Actualidad y noticias
    /\b(hoy|ayer|esta semana|este mes|este ano|actual|actualmente|ahora)\b/,
    /\b(ultimo|ultima|ultimos|ultimas|reciente|recientes|nuevo|nueva|nuevos)\b/,
    /\b(noticia|noticias|novedad|novedades|paso|sucedio|ocurrio)\b/,
    /\b(fin de semana|este finde|esta noche|anoche|semana pasada)\b/,
    /\b(en que punto|como esta|que pasa con|que paso con|que sucede)\b/,
    /\b(luego de|despues de|tras el|tras la|a raiz de)\b/,
    // Tecnología actual
    /\b(iphone|android|windows|samsung|tesla|spacex|openai|chatgpt|gemini)\b/,
    /\b(lanzamiento|lanzaron|lanzo|version|actualizacion)\b/,
    // Economía global
    /\b(dolar|bitcoin|crypto|bolsa|wall street|inflacion|recesion)\b/,
    /\b(petrol|precio.*barril|tasa.*interes|fed.*reserva)\b/,
    // Precios, disponibilidad
    /\b(precio|cuesta|vale|donde (ver|comprar|conseguir))\b/,
    /\b(disponible en|plataforma|donde puedo ver)\b/,
    // Clima
    /\b(clima|pronostico|temperatura|lluvia|tormenta)\b/,
    // Legal/normativo actual
    /\b(ley.*nueva|decreto.*nuevo|regulacion|normativa.*vigente)\b/,
    // Comparativas
    /\b(vs|versus|comparar|comparacion|cual es mejor|diferencia entre)\b/,
    // Explícitamente pide buscar
    /\b(busca|buscar|googlea|search|investiga)\b/,
  ];

  return webPatterns.some(re => re.test(q));
}
