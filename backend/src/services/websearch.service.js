/**
 * websearch.service.js — Búsqueda web: DeepSeek Search (primario) + Brave (fallback)
 *
 * v2.0 — Migración a DeepSeek Search/Fetch API como proveedor primario.
 *
 * ════════════════════════════════════════════════════════════════════
 * ARQUITECTURA DE BÚSQUEDA:
 *
 *   1. DeepSeek Search  (primario)  — mejor cobertura, summaries ricos
 *   2. Brave Search     (fallback)  — si DeepSeek falla o no devuelve nada
 *   3. Google Grounding (último recurso) — solo para person queries sin resultados
 *
 * DEEP FETCH (opcional):
 *   Para intents que necesitan profundidad (legal, academic, deep),
 *   se usa DeepSeek Fetch para descargar los mejores 1-2 resultados
 *   como Markdown y enriquecer el contexto.
 *
 * API KEY:
 *   DeepSeek Search/Fetch usa la misma DEEPSEEK_API_KEY del modelo de chat.
 *   Brave usa BRAVE_SEARCH_API_KEY (fallback).
 *   Gemini usa GEMINI_API_KEY (Google Grounding, último recurso).
 *
 * COSTO:
 *   DeepSeek Search: USD 0.75 / 1000 búsquedas exitosas
 *   DeepSeek Fetch:  USD 0.75 / 1000 fetches exitosos
 *   (fallidas/vacías no se cobran)
 * ════════════════════════════════════════════════════════════════════
 *
 * Mejoras v2.0:
 *   - DeepSeek Search como proveedor primario con summaries de 600-800 chars
 *   - DeepSeek Fetch para profundizar en resultados (legal, academic, etc.)
 *   - Operadores nativos: site:, after:, lang:, "frase exacta"
 *   - Scoring combinado: rerank_score + authority + source tiers
 *   - Brave Search como fallback robusto
 *   - Google Search Grounding como último recurso para personas
 *   - Detección de organismos uruguayos → site: automático
 *   - Cache, métricas, dedup y todo lo anterior se mantiene
 */
import { logger } from '../utils/logger.js';

/* ══════════════════════════════════════════════════════════════
   CONFIGURACIÓN DE PROVEEDORES
   ══════════════════════════════════════════════════════════════ */

// DeepSeek Search/Fetch (primario) — misma API key que el modelo
const DEEPSEEK_API_KEY   = () => process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_SEARCH_URL = 'https://api.deepseek.com/v1/tools/search';
const DEEPSEEK_FETCH_URL  = 'https://api.deepseek.com/v1/tools/fetch';

// Brave Search (fallback)
const BRAVE_API_KEY = () => process.env.BRAVE_SEARCH_API_KEY || '';
const BRAVE_URL     = 'https://api.search.brave.com/res/v1/web/search';

// Google Search Grounding via Gemini API (último recurso para personas)
const GEMINI_API_KEY = () => process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL   = 'gemini-2.5-flash';
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/* ══════════════════════════════════════════════════════════════
   CACHE EN MEMORIA
   ══════════════════════════════════════════════════════════════ */
const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;   // 5 minutos
const CACHE_MAX = 50;

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

/* ══════════════════════════════════════════════════════════════
   MÉTRICAS
   ══════════════════════════════════════════════════════════════ */
const _metrics = {
  totalSearches: 0,
  deepseekSearches: 0,
  braveSearches: 0,
  googleSearches: 0,
  deepseekFetches: 0,
  cacheHits: 0,
  cacheMisses: 0,
  errors: 0,
  avgResponseMs: 0,
  _responseTimes: [],
};

export function getSearchMetrics() {
  return { ..._metrics, cacheSize: _cache.size, _responseTimes: undefined };
}

function _recordTime(ms) {
  _metrics._responseTimes.push(ms);
  if (_metrics._responseTimes.length > 100) _metrics._responseTimes.shift();
  _metrics.avgResponseMs = Math.round(
    _metrics._responseTimes.reduce((a, b) => a + b, 0) / _metrics._responseTimes.length
  );
}

/* ══════════════════════════════════════════════════════════════
   SEARCH INTENT — Clasificación de consulta
   ══════════════════════════════════════════════════════════════ */
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
  person:     { freshness: null, count: 5, depth: 'standard' },
};

function classifyIntent(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (/\b(noticia|noticias|novedad|hoy|ayer|anoche|esta semana|esta noche|paso|sucedio|ocurrio|ultimo momento|urgente|breaking)\b/.test(q))
    return 'news';

  if (/\b(actualmente|ahora|en este momento|actual|vigente|como esta|como van|en que punto|que pasa con|semana pasada|este mes|este ano|luego de|despues de|tras el)\b/.test(q))
    return 'current';

  if (/\b(quien|quienes)\s+(es|fue|son|fueron|era|eran)\b/.test(q))
    return 'person';
  if (/\b(biografia|perfil|trayectoria|carrera|curriculum|cv)\s+(de|del|sobre)\b/.test(q))
    return 'person';

  if (/\b(ley|decreto|norma|regulacion|legislacion|codigo|constitucion|juridic|legal|tribunal|sentencia|jurisprudencia)\b/.test(q))
    return 'legal';

  if (/\b(estudio|investigacion|paper|articulo cientifico|universidad|tesis|academico|cientific|pubmed|peer.?review)\b/.test(q))
    return 'academic';

  if (/\b(como (funciona|instalar|configurar|implementar|programar)|tutorial|documentacion|api|framework|libreria|version|error|bug|debug|codigo|code)\b/.test(q))
    return 'technical';

  if (/\b(precio|cuesta|vale|comprar|tienda|oferta|descuento|mercadolibre|amazon|aliexpress|donde consigo)\b/.test(q))
    return 'commercial';

  if (/\b(vs|versus|comparar|comparacion|comparativa|diferencia entre|mejor entre|cual es mejor|ventajas|desventajas)\b/.test(q))
    return 'comparative';

  if (/\b(uruguay|montevideo|departamento|intendencia|imm|ute|antel|ose|bps|brou|mgap)\b/.test(q))
    return 'local';

  if (/\b(historia|historico|siglo|antigua|antiguo|origen|fundacion|ano \d{4}|decada|epoca)\b/.test(q))
    return 'historical';

  if (/\b(video|imagen|foto|pelicula|serie|musica|cancion|trailer|clip)\b/.test(q))
    return 'multimedia';

  // Person: detectar nombres propios por heurística
  // Solo matchear si queda DESPUÉS de quitar prefijos conversacionales (evita "Banco Central" etc.)
  const originalTrimmed = query.trim()
    .replace(/^(quien es|quién es|conoces a|sabes de|hablame de|contame de|decime sobre|que sabes de|qué sabés de|sobre)\s+/i, '');
  const properNameMatch = originalTrimmed.match(
    /\b([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+(?:\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+){1,4})\b/
  );
  if (properNameMatch) {
    const name = properNameMatch[1];
    // Excluir frases comunes, topónimos, instituciones, conceptos
    const notAName = /^(Buenos Aires|Muchas Gracias|Por Favor|Buen Día|Buenas Tardes|Buenas Noches|Punta del Este|Ciudad de|Estado de|Río de|Santa Fe|San José|Los Angeles|Las Vegas|Nueva York|El Pais|La Nacion|Monte Carlo|Banco Central|Banco República|Banco Mundial|Seguro Social|Sistema Solar|Nueva Zelanda|Costa Rica|Puerto Rico|El Salvador|Sierra Leona|Medio Oriente|América Latina|Copa América|Copa Libertadores|Corte Suprema|Poder Ejecutivo|Poder Judicial|Poder Legislativo|Naciones Unidas|Cruz Roja|Casa Blanca|Palacio Legislativo|Torre Ejecutiva|Plaza Independencia|Mercado Libre|Fondo Monetario|Asamblea General|Cambio Climático|Inteligencia Artificial|Machine Learning|Deep Learning|Open Source|Real Madrid|Manchester United|Manchester City|Atlético Madrid|Inter Miami|Boca Juniors|River Plate|Club Nacional|Peñarol)$/i;
    if (!notAName.test(name)) {
      // Heurística extra: si la query original (sin limpiar) es SOLO el nombre, más probable que sea persona
      // Si hay mucho más texto alrededor, es menos probable
      const ratio = name.length / originalTrimmed.length;
      if (ratio > 0.5) {
        return 'person';
      }
    }
  }

  return 'factual';
}

/* ══════════════════════════════════════════════════════════════
   ORGANISMOS URUGUAYOS → operador site: automático
   ══════════════════════════════════════════════════════════════ */
const UY_ORG_SITES = {
  bps:        'bps.gub.uy',
  brou:       'brou.com.uy',
  ute:        'ute.com.uy',
  antel:      'antel.com.uy',
  ose:        'ose.com.uy',
  imm:        'montevideo.gub.uy',
  intendencia:'montevideo.gub.uy',
  mgap:       'mgap.gub.uy',
  mec:        'mec.gub.uy',
  msp:        'msp.gub.uy',
  mtss:       'mtss.gub.uy',
  mef:        'mef.gub.uy',
  mdn:        'mdn.gub.uy',
  mrree:      'mrree.gub.uy',
  miem:       'miem.gub.uy',
  mvotma:     'mvotma.gub.uy',
  presidencia:'presidencia.gub.uy',
  parlamento: 'parlamento.gub.uy',
  agesic:     'agesic.gub.uy',
  asse:       'asse.com.uy',
  ancap:      'ancap.com.uy',
  inia:       'inia.uy',
  udelar:     'udelar.edu.uy',
  utu:        'utu.edu.uy',
  anep:       'anep.edu.uy',
  inau:       'inau.gub.uy',
  dgi:        'dgi.gub.uy',
  bcu:        'bcu.gub.uy',
  ine:        'ine.gub.uy',
  correo:     'correo.com.uy',
  ade:        'ade.com.uy',
};

/**
 * _detectUySiteOperator — Detecta si la consulta menciona un organismo
 * uruguayo y devuelve el operador site: correspondiente.
 * Retorna null si no detecta ninguno.
 */
function _detectUySiteOperator(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const [org, domain] of Object.entries(UY_ORG_SITES)) {
    // Buscar la sigla como palabra completa
    if (new RegExp(`\\b${org}\\b`).test(q)) {
      return domain;
    }
  }
  return null;
}

/* ══════════════════════════════════════════════════════════════
   MARCADOR TEMPORAL — Extrae ventana de frescura de la consulta
   ══════════════════════════════════════════════════════════════ */

/**
 * _extractTemporalMarker — Detecta marcas temporales en la consulta
 * y devuelve la fecha "after" y freshness correspondiente.
 *
 * Usa America/Montevideo (UTC-3) para calcular "hoy" y "ayer".
 *
 * @param {string} query
 * @returns {{ after: string, freshness: string, label: string } | null}
 */
function _extractTemporalMarker(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Obtener fecha actual en Uruguay \u2014 usar en-CA para formato YYYY-MM-DD nativo
  const _uyFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Montevideo', year: 'numeric', month: '2-digit', day: '2-digit' });
  const todayUY = _uyFmt.format(new Date());  // "2026-10-21"
  // Para c\u00e1lculos de d\u00edas, parsear la fecha uruguaya (no UTC)
  const [y, m, d] = todayUY.split('-').map(Number);
  const nowUY = new Date(y, m - 1, d);  // Date local sin desfase UTC
  const fmt = (date) => {
    const yy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yy}-${mm}-${dd}`;
  };

  // "hoy", "del día", "día de hoy"
  if (/\b(hoy|del dia|dia de hoy|de hoy)\b/.test(q)) {
    return { after: fmt(nowUY), freshness: 'pd', label: 'hoy' };
  }

  // "ayer", "anoche"
  if (/\b(ayer|anoche)\b/.test(q)) {
    const ayer = new Date(nowUY);
    ayer.setDate(ayer.getDate() - 1);
    return { after: fmt(ayer), freshness: 'pd', label: 'ayer' };
  }

  // "esta semana", "estos días", "últimos días", "esta noche", "fin de semana"
  if (/\b(esta semana|estos dias|estos ultimos dias|ultimos dias|esta noche|fin de semana|este finde|semana pasada)\b/.test(q)) {
    const hace7 = new Date(nowUY);
    hace7.setDate(hace7.getDate() - 7);
    return { after: fmt(hace7), freshness: 'pw', label: 'esta semana' };
  }

  // "este mes", "último mes", "mes pasado"
  if (/\b(este mes|ultimo mes|mes pasado)\b/.test(q)) {
    const hace30 = new Date(nowUY);
    hace30.setDate(hace30.getDate() - 30);
    return { after: fmt(hace30), freshness: 'pm', label: 'este mes' };
  }

  // "este año"
  if (/\b(este ano|ano actual|ano en curso)\b/.test(q)) {
    return { after: `${nowUY.getFullYear()}-01-01`, freshness: null, label: 'este año' };
  }

  return null;
}

/* ══════════════════════════════════════════════════════════════
   QUERY OPTIMIZATION
   ══════════════════════════════════════════════════════════════ */
function optimizeQuery(query, intent) {
  let q = query.trim();

  if (intent === 'person') {
    return optimizePersonQuery(q);
  }

  // Eliminar prefijos conversacionales
  q = q.replace(/^(che|bo|dale|bueno|mira|decime|contame|explicame|hablame|mostrame|muestrame|enseñame)\s+/i, '');
  q = q.replace(/^(quiero saber|me gustaria saber|podrias decirme|sabes|necesito saber)\s+(sobre|de|si|que|donde|como|cuando)\s+/i, '');

  // Eliminar stopwords
  const stopwords = /\b(es|la|el|de|en|un|una|los|las|del|al|por|para|con|que|se|su|este|esta|son|muy)\b/gi;
  const cleaned = q.replace(stopwords, ' ').replace(/\s{2,}/g, ' ').trim();

  if (cleaned.split(/\s+/).length >= 3) {
    q = cleaned;
  }

  // Contexto temporal para news/current — año dinámico
  const currentYear = new Date().getFullYear();
  const yearRegex = new RegExp(`\\b(hoy|ayer|${currentYear}|${currentYear - 1}|esta semana|este mes|este ano)\\b`, 'i');
  if (intent === 'news' && !yearRegex.test(q)) {
    q += ` ${currentYear}`;
  }
  const currentYearRegex = new RegExp(`\\b(${currentYear}|${currentYear - 1}|actual)\\b`, 'i');
  if (intent === 'current' && !currentYearRegex.test(q)) {
    q += ` ${currentYear}`;
  }

  // Contexto uruguayo para local
  if (intent === 'local' && !/\b(uruguay|uruguayo|uruguaya|montevideo)\b/i.test(q)) {
    q += ' Uruguay';
  }

  // Limitar longitud ANTES de agregar operadores (site:, after:)
  // para que los operadores no se corten por el truncado
  const words = q.split(/\s+/);
  if (words.length > 15) {
    q = words.slice(0, 15).join(' ');
  }

  // Operador site: para organismos uruguayos (DeepSeek lo soporta nativamente)
  const uySite = _detectUySiteOperator(query);
  if (uySite && !q.includes('site:')) {
    q += ` site:${uySite}`;
  }

  return q;
}

function optimizePersonQuery(query) {
  let q = query.trim();

  q = q.replace(/^(che|bo|dale|bueno|mira|decime|contame|explicame|hablame|mostrame|muestrame|enseñame)\s+/i, '');
  q = q.replace(/^(quiero saber|me gustaria saber|podrias decirme|sabes|necesito saber)\s+(sobre|de|si|que|donde|como|cuando)\s+/i, '');
  q = q.replace(/^(quien\s+es|quién\s+es|quienes\s+son|conoces\s+a|sabes\s+(de|sobre))\s+/i, '');

  const nameMatch = q.match(
    /([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+(?:\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+){1,4})/
  );

  if (nameMatch) {
    const fullName = nameMatch[1].trim();
    const rest = q.replace(fullName, '').trim()
      .replace(/^[,.\-–—:;]+\s*/, '')
      .replace(/\s*[,.\-–—:;]+$/, '')
      .replace(/^(el|la|los|las|de|del|un|una)\s+/i, '')
      .trim();

    let optimized = `"${fullName}"`;
    if (rest.length > 2) {
      optimized += ` ${rest}`;
    }

    logger.info(`[websearch] Person query optimizado: "${query}" → ${optimized}`);
    return optimized;
  }

  logger.info(`[websearch] Person query sin nombre detectado, usando limpia: "${q}"`);
  return q;
}

/* ══════════════════════════════════════════════════════════════
   SOURCE QUALITY — Priorización de fuentes
   ══════════════════════════════════════════════════════════════ */
const SOURCE_TIERS = [
  { score: 10, patterns: [/\.gub\.uy$/, /\.gov\./, /\.go\./, /\.int$/] },
  { score: 8, patterns: [/\.edu\./, /\.ac\./, /scholar\.google/, /pubmed/] },
  { score: 7, patterns: [/elpais\.com\.uy/, /elobservador\.com\.uy/, /montevideo\.com\.uy/,
    /reuters\.com/, /bbc\.com/, /apnews\.com/, /france24/, /dw\.com/, /cnn\.com/,
    /nytimes\.com/, /theguardian\.com/, /efe\.com/,
    /linkedin\.com/, /researchgate\.net/, /orcid\.org/] },
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
  return 1;
}

/* ══════════════════════════════════════════════════════════════
   DEDUPLICACIÓN Y RANKING
   ══════════════════════════════════════════════════════════════ */
function deduplicateAndRank(results) {
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

  return Array.from(byDomain.values())
    .sort((a, b) => (b._score || 0) - (a._score || 0));
}

/* ══════════════════════════════════════════════════════════════
   FILTRO POST-BÚSQUEDA POR FRESCURA
   ══════════════════════════════════════════════════════════════ */

/**
 * _filterByFreshness — Filtra resultados por ventana temporal.
 *
 * - Resultados con fecha dentro de la ventana → _freshness: 'fresh'
 * - Resultados sin fecha → _freshness: 'unknown' (se conservan)
 * - Resultados con fecha fuera de la ventana → _freshness: 'stale' (se descartan)
 *
 * Si después de filtrar no quedan resultados fresh, devuelve los unknown
 * para no dejar la respuesta vacía.
 */
function _filterByFreshness(results, temporal) {
  if (!temporal?.after || results.length === 0) return results;

  // Parsear con offset Uruguay (UTC-3) para evitar desfase de medianoche
  const afterDate = new Date(temporal.after + 'T00:00:00-03:00');
  if (isNaN(afterDate.getTime())) return results;

  const tagged = results.map(r => {
    if (!r.date) {
      return { ...r, _freshness: 'unknown' };
    }

    // Intentar parsear la fecha (ISO, o formatos comunes)
    let resultDate = new Date(r.date);

    // Brave puede devolver "2 hours ago", "3 days ago" — parsear heurísticamente
    if (isNaN(resultDate.getTime()) && typeof r.date === 'string') {
      const agoMatch = r.date.match(/(\d+)\s+(hour|day|week|month|minute)/i);
      if (agoMatch) {
        const amount = parseInt(agoMatch[1], 10);
        const unit = agoMatch[2].toLowerCase();
        const now = new Date();
        if (unit.startsWith('minute')) now.setMinutes(now.getMinutes() - amount);
        else if (unit.startsWith('hour')) now.setHours(now.getHours() - amount);
        else if (unit.startsWith('day')) now.setDate(now.getDate() - amount);
        else if (unit.startsWith('week')) now.setDate(now.getDate() - amount * 7);
        else if (unit.startsWith('month')) now.setMonth(now.getMonth() - amount);
        resultDate = now;
      }
    }

    if (isNaN(resultDate.getTime())) {
      return { ...r, _freshness: 'unknown' };
    }

    return resultDate >= afterDate
      ? { ...r, _freshness: 'fresh' }
      : { ...r, _freshness: 'stale' };
  });

  const fresh   = tagged.filter(r => r._freshness === 'fresh');
  const unknown = tagged.filter(r => r._freshness === 'unknown');
  const stale   = tagged.filter(r => r._freshness === 'stale');

  if (stale.length > 0) {
    logger.info(`[websearch] Freshness filter (${temporal.label}): ${fresh.length} fresh, ${unknown.length} sin fecha, ${stale.length} stale descartados`);
  }

  // Si hay resultados fresh, devolverlos + unknown; si no, solo unknown
  // Ordenar por _score para que unknown no quede pegado con mismo peso que fresh
  const filtered = fresh.length > 0 ? [...fresh, ...unknown] : unknown;
  filtered.sort((a, b) => (b._score || 0) - (a._score || 0));
  return filtered.length > 0 ? filtered : results;  // fallback: devolver todo si quedó vacío
}

/* ══════════════════════════════════════════════════════════════
   DEEPSEEK SEARCH — Proveedor primario
   ══════════════════════════════════════════════════════════════ */

/**
 * _deepseekSearch — Ejecuta una búsqueda contra DeepSeek Search API.
 *
 * Ventajas sobre Brave:
 *   - summary de 600-800 chars (vs ~150 de Brave snippets)
 *   - rerank_score para relevancia real
 *   - authority tier para fuentes oficiales
 *   - Operadores nativos: site:, after:, lang:, "frase exacta"
 *   - Mejor cobertura de sitios .gub.uy
 *
 * @param {string} optimizedQuery — query ya optimizada
 * @param {object} opts — { count, freshness }
 * @param {string} originalQuery — query original del usuario (para ori_question)
 * @returns {Array} resultados rankeados
 */
async function _deepseekSearch(optimizedQuery, { count = 5, temporal = null } = {}, originalQuery = '') {
  const key = DEEPSEEK_API_KEY();
  if (!key) {
    logger.warn('[websearch] DEEPSEEK_API_KEY no configurada');
    return [];
  }

  const t0 = Date.now();
  _metrics.totalSearches++;
  _metrics.deepseekSearches++;

  try {
    // Inyectar operador after: para frescura temporal (DeepSeek lo soporta nativamente)
    let finalQuery = optimizedQuery;
    if (temporal?.after && !finalQuery.includes('after:')) {
      finalQuery += ` after:${temporal.after}`;
      logger.info(`[websearch] DeepSeek: inyectando after:${temporal.after} (${temporal.label})`);
    }

    const body = {
      query: finalQuery,
      count: Math.min(count, 50),
      need_content: false,   // solo summaries por defecto (fetch aparte si necesario)
    };

    // ori_question mejora la relevancia cuando la query fue optimizada
    if (originalQuery && originalQuery !== optimizedQuery) {
      body.ori_question = originalQuery.slice(0, 128);
    }

    const response = await fetch(DEEPSEEK_SEARCH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`[websearch] DeepSeek Search HTTP ${response.status}: ${errText.slice(0, 300)}`);
      _metrics.errors++;
      return [];
    }

    const data = await response.json();
    const elapsed = Date.now() - t0;
    _recordTime(elapsed);

    if (!data.results?.length) {
      logger.warn(`[websearch] DeepSeek Search: 0 resultados para "${optimizedQuery}" ${elapsed}ms`);
      return [];
    }

    // Mapear resultados con scoring combinado
    const results = data.results.map(r => {
      const sourceScore = getSourceScore(r.url);
      // rerank_score: 0-3 (≥1.5 = bueno) → mapeado a 0-10
      const rerankBonus = (r.rerank_score || 0) * 3.33;
      // authority: 0-4 (≥3 = alto) → bonus directo
      const authorityBonus = (r.authority >= 0 ? r.authority : 0) * 1.5;

      return {
        title:       r.title || '',
        url:         r.url || '',
        // summary es mucho más rico que snippet (600-800 chars vs 100-200)
        description: r.summary || r.snippet || '',
        snippet:     r.snippet || '',
        date:        r.date || null,
        _score:      sourceScore + rerankBonus + authorityBonus,
        _provider:   'deepseek',
      };
    });

    const ranked = deduplicateAndRank(results);
    logger.info(`[websearch] DeepSeek Search: "${optimizedQuery}" → ${ranked.length} resultados, ${elapsed}ms`);
    return ranked;

  } catch (err) {
    _metrics.errors++;
    logger.error(`[websearch] DeepSeek Search error: ${err.message}`);
    return [];
  }
}

/**
 * _deepseekSearchWithContent — Búsqueda con contenido completo de páginas.
 * Usa need_content=true. Más lento pero incluye el texto de las páginas.
 * Se usa para intents que necesitan profundidad (legal, academic).
 */
async function _deepseekSearchWithContent(optimizedQuery, { count = 3, temporal = null } = {}, originalQuery = '') {
  const key = DEEPSEEK_API_KEY();
  if (!key) return [];

  const t0 = Date.now();
  _metrics.totalSearches++;
  _metrics.deepseekSearches++;

  try {
    // Inyectar operador after: para frescura temporal
    let finalQuery = optimizedQuery;
    if (temporal?.after && !finalQuery.includes('after:')) {
      finalQuery += ` after:${temporal.after}`;
    }

    const body = {
      query: finalQuery,
      count: Math.min(count, 10),
      need_content: true,
    };

    if (originalQuery && originalQuery !== optimizedQuery) {
      body.ori_question = originalQuery.slice(0, 128);
    }

    const response = await fetch(DEEPSEEK_SEARCH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),  // más tiempo porque descarga contenido
    });

    if (!response.ok) {
      logger.error(`[websearch] DeepSeek Search+Content HTTP ${response.status}`);
      _metrics.errors++;
      return [];
    }

    const data = await response.json();
    const elapsed = Date.now() - t0;
    _recordTime(elapsed);

    if (!data.results?.length) return [];

    const results = data.results.map(r => {
      const sourceScore = getSourceScore(r.url);
      const rerankBonus = (r.rerank_score || 0) * 3.33;
      const authorityBonus = (r.authority >= 0 ? r.authority : 0) * 1.5;

      return {
        title:       r.title || '',
        url:         r.url || '',
        description: r.summary || r.snippet || '',
        snippet:     r.snippet || '',
        content:     r.content || '',   // contenido completo de la página
        date:        r.date || null,
        _score:      sourceScore + rerankBonus + authorityBonus,
        _provider:   'deepseek',
      };
    });

    const ranked = deduplicateAndRank(results);
    logger.info(`[websearch] DeepSeek Search+Content: "${optimizedQuery}" → ${ranked.length} resultados, ${elapsed}ms`);
    return ranked;

  } catch (err) {
    _metrics.errors++;
    logger.error(`[websearch] DeepSeek Search+Content error: ${err.message}`);
    return [];
  }
}

/* ══════════════════════════════════════════════════════════════
   DEEPSEEK FETCH — Descarga una página como Markdown
   ══════════════════════════════════════════════════════════════ */

/**
 * _deepseekFetch — Descarga el contenido de una URL como Markdown.
 *
 * Se usa selectivamente para enriquecer los mejores resultados de búsqueda
 * cuando el summary no alcanza (consultas legales, normativas, datos precisos).
 *
 * @param {string} url — URL a descargar
 * @returns {{ title, content }} o null si falla
 */
async function _deepseekFetch(url) {
  const key = DEEPSEEK_API_KEY();
  if (!key) return null;

  _metrics.deepseekFetches++;
  const t0 = Date.now();

  try {
    const response = await fetch(DEEPSEEK_FETCH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      // 404 = contenido no disponible; 403 = bloqueado → no reintentar
      const status = response.status;
      if (status === 404 || status === 403) {
        logger.info(`[websearch] DeepSeek Fetch ${status} para ${url} — omitiendo`);
      } else {
        logger.warn(`[websearch] DeepSeek Fetch HTTP ${status} para ${url}`);
      }
      return null;
    }

    const data = await response.json();
    const elapsed = Date.now() - t0;

    if (!data.content) {
      logger.info(`[websearch] DeepSeek Fetch: contenido vacío para ${url}, ${elapsed}ms`);
      return null;
    }

    logger.info(`[websearch] DeepSeek Fetch OK: ${url} → ${data.content.length} chars, ${elapsed}ms`);
    return {
      title:   data.title || '',
      content: data.content,
    };

  } catch (err) {
    logger.warn(`[websearch] DeepSeek Fetch error (${url}): ${err.message}`);
    return null;
  }
}

/* ══════════════════════════════════════════════════════════════
   BRAVE SEARCH — Fallback
   ══════════════════════════════════════════════════════════════ */
async function _braveSearch(optimizedQuery, { count, freshness, country } = {}) {
  const key = BRAVE_API_KEY();
  if (!key) return [];

  const params = new URLSearchParams({
    q: optimizedQuery,
    count: String(count || 5),
    text_decorations: 'false',
    safesearch: 'moderate',
  });

  if (freshness) params.set('freshness', freshness);
  if (country) params.set('country', country);

  const t0 = Date.now();
  _metrics.totalSearches++;
  _metrics.braveSearches++;

  try {
    const response = await fetch(`${BRAVE_URL}?${params}`, {
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
    _recordTime(elapsed);

    if (!data.web?.results?.length) {
      logger.warn(`[websearch] Brave: 0 resultados para "${optimizedQuery}" ${elapsed}ms`);
      return [];
    }

    const results = data.web.results.map(r => ({
      title:       r.title || '',
      url:         r.url || '',
      description: r.description || '',
      date:        r.page_age || r.age || null,   // Brave devuelve page_age (ISO) y age (human)
      _score:      getSourceScore(r.url),
      _provider:   'brave',
    }));

    const ranked = deduplicateAndRank(results);
    logger.info(`[websearch] Brave: "${optimizedQuery}" → ${ranked.length} resultados, ${elapsed}ms`);
    return ranked;

  } catch (err) {
    _metrics.errors++;
    logger.error(`[websearch] Brave error: ${err.message}`);
    return [];
  }
}

/* ══════════════════════════════════════════════════════════════
   GOOGLE SEARCH GROUNDING — Último recurso (personas)
   ══════════════════════════════════════════════════════════════ */
async function _googleSearchGrounding(query) {
  const geminiKey = GEMINI_API_KEY();
  if (!geminiKey) {
    logger.warn('[websearch] GEMINI_API_KEY no configurada — fallback Google deshabilitado');
    return { results: [], groundedText: '' };
  }

  logger.info(`[websearch] Google Search Grounding: "${query}"`);
  const t0 = Date.now();
  _metrics.googleSearches++;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Buscá información sobre: ${query}. Respondé en español con datos verificados.` }]
        }],
        tools: [{ google_search: {} }],
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`[websearch] Gemini HTTP ${response.status}: ${errText.slice(0, 300)}`);
      return { results: [], groundedText: '' };
    }

    const data = await response.json();
    const elapsed = Date.now() - t0;

    const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const grounding = data.candidates?.[0]?.groundingMetadata;
    const chunks = grounding?.groundingChunks || [];
    const supports = grounding?.groundingSupports || [];

    const results = chunks
      .filter(c => c.web?.uri && c.web?.title)
      .map(c => ({
        title:       c.web.title,
        url:         c.web.uri,
        description: '',
        _score:      getSourceScore(c.web.uri),
        _provider:   'google',
      }));

    if (supports.length > 0 && results.length > 0) {
      for (const support of supports) {
        const text = support.segment?.text || '';
        const indices = support.groundingChunkIndices || [];
        for (const idx of indices) {
          if (results[idx] && text.length > results[idx].description.length) {
            results[idx].description = text;
          }
        }
      }
    }

    const seen = new Set();
    const unique = results.filter(r => {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
      return true;
    });

    logger.info(`[websearch] Google Grounding: ${unique.length} fuentes, ${elapsed}ms, texto: ${textPart.length} chars`);

    return { results: unique, groundedText: textPart };

  } catch (err) {
    logger.error(`[websearch] Google Grounding error: ${err.message}`);
    return { results: [], groundedText: '' };
  }
}

/* ══════════════════════════════════════════════════════════════
   PERSON SEARCH — Retry con variantes + relevancia
   ══════════════════════════════════════════════════════════════ */
function _buildPersonRetryQueries(originalQuery) {
  const q = originalQuery.trim()
    .replace(/^(che|bo|dale|bueno|mira|decime|contame|explicame|hablame|mostrame|muestrame|enseñame)\s+/i, '')
    .replace(/^(quiero saber|me gustaria saber|podrias decirme|sabes|necesito saber)\s+(sobre|de|si|que|donde|como|cuando)\s+/i, '')
    .replace(/^(quien\s+es|quién\s+es|quienes\s+son|conoces\s+a|sabes\s+(de|sobre))\s+/i, '')
    .replace(/^(sobre|de|del|acerca de|a)\s+/i, '');

  const nameMatch = q.match(
    /([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+(?:\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+){1,4})/
  );

  if (!nameMatch) return [q];

  const fullName = nameMatch[1].trim();
  const rest = q.replace(fullName, '').trim()
    .replace(/^[,.\-–—:;]+\s*/, '')
    .replace(/\s*[,.\-–—:;]+$/, '')
    .replace(/^(el|la|los|las|de|del|un|una)\s+/i, '')
    .trim();

  const variants = [];
  variants.push(rest.length > 2 ? `"${fullName}" ${rest}` : `"${fullName}"`);
  variants.push(rest.length > 2 ? `${fullName} ${rest}` : fullName);
  if (!/\buruguay\b/i.test(q)) {
    variants.push(rest.length > 2 ? `${fullName} ${rest} Uruguay` : `${fullName} Uruguay`);
  }
  if (rest.length > 2) {
    variants.push(`"${fullName}"`);
  }

  return [...new Set(variants)];
}

function _personResultsAreRelevant(results, originalQuery) {
  const cleaned = originalQuery.trim()
    .replace(/^(che|bo|dale|bueno|mira|decime|contame|explicame|hablame|mostrame)\s+/i, '')
    .replace(/^(quiero saber|me gustaria saber|podrias decirme|sabes|necesito saber)\s+(sobre|de|si|que|donde|como|cuando)\s+/i, '')
    .replace(/^(quien\s+es|quién\s+es|quienes\s+son|conoces\s+a|sabes\s+(de|sobre))\s+/i, '')
    .replace(/^(sobre|de|del|acerca de|a)\s+/i, '');

  const nameMatch = cleaned.match(
    /([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+(?:\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+){1,4})/
  );

  if (!nameMatch) return results;

  const nameParts = nameMatch[1].split(/\s+/);

  const relevant = results.filter(r => {
    const text = `${r.title} ${r.description}`.toLowerCase();
    const matchCount = nameParts.filter(part =>
      text.includes(part.toLowerCase())
    ).length;
    const threshold = 2;
    return matchCount >= threshold;
  });

  if (relevant.length > 0) {
    logger.info(`[websearch] Relevancia: ${relevant.length}/${results.length} resultados contienen "${nameMatch[1]}"`);
  } else {
    logger.info(`[websearch] Relevancia: 0/${results.length} resultados contienen "${nameMatch[1]}" → descartando`);
  }

  return relevant;
}

/* ══════════════════════════════════════════════════════════════
   BÚSQUEDA PRINCIPAL — webSearch()
   ══════════════════════════════════════════════════════════════ */

/**
 * webSearch — Busca en la web: DeepSeek (primario) → Brave (fallback).
 *
 * Para person intent: retry con variantes en ambos proveedores,
 * filtrado de relevancia, y Google Grounding como último recurso.
 */
export async function webSearch(query, { count = 5 } = {}) {
  const dsKey = DEEPSEEK_API_KEY();
  const braveKey = BRAVE_API_KEY();

  if (!dsKey && !braveKey) {
    logger.warn('[websearch] Sin API keys configuradas (DEEPSEEK ni BRAVE)');
    return [];
  }

  const intent = classifyIntent(query);
  const config = INTENTS[intent] || INTENTS.factual;
  const optimizedQuery = optimizeQuery(query, intent);
  const finalCount = Math.min(count || config.count, 20);

  // Extraer marcador temporal de la consulta
  const temporal = _extractTemporalMarker(query);
  if (temporal) {
    logger.info(`[websearch] Temporal: "${temporal.label}" → after:${temporal.after}`);
  }

  // Cache check — incluir bucket diario cuando hay frescura temporal
  const dateBucket = temporal ? temporal.after : '';
  const cacheKey = `${optimizedQuery}:${intent}:${finalCount}:${dateBucket}`;
  const cached = getCached(cacheKey);
  if (cached) {
    _metrics.cacheHits++;
    logger.info(`[websearch] Cache hit: "${optimizedQuery}" (${intent})`);
    return cached;
  }
  _metrics.cacheMisses++;

  // Usar freshness del temporal si existe, sino la del intent
  const searchOpts = {
    count: finalCount,
    freshness: temporal?.freshness || config.freshness || undefined,
    temporal,   // pasar al proveedor para inyectar after:
    country: (intent === 'local') ? 'UY' : undefined,
  };

  // ══════════════════════════════════════════════════
  //  PERSON INTENT — Flujo especial con retries
  // ══════════════════════════════════════════════════
  if (intent === 'person') {
    const variants = _buildPersonRetryQueries(query);
    logger.info(`[websearch] Person search — ${variants.length} variantes`);

    // ── Intentar con DeepSeek primero ──
    if (dsKey) {
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        const dateBucket = temporal?.after || '';
        const varCacheKey = `ds:${variant}:person:${finalCount}:${dateBucket}`;
        const varCached = getCached(varCacheKey);
        if (varCached) { _metrics.cacheHits++; return varCached; }

        const results = await _deepseekSearch(variant, searchOpts, query);
        if (results.length > 0) {
          const filtered = temporal ? _filterByFreshness(results, temporal) : results;
          const relevant = _personResultsAreRelevant(filtered, query);
          if (relevant.length > 0) {
            const sliced = relevant.slice(0, finalCount);
            setCache(varCacheKey, sliced);
            logger.info(`[websearch] Person DeepSeek OK variante ${i+1}: "${variant}" → ${sliced.length} relevantes`);
            return sliced;
          }
          logger.info(`[websearch] Person DeepSeek variante ${i+1} irrelevante: "${variant}"`);
        }
      }
      logger.info('[websearch] Person: DeepSeek agotó variantes sin resultados relevantes');
    }

    // ── Fallback: Brave con variantes ──
    if (braveKey) {
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        const dateBucket = temporal?.after || '';
        const varCacheKey = `brave:${variant}:person:${finalCount}:${dateBucket}`;
        const varCached = getCached(varCacheKey);
        if (varCached) { _metrics.cacheHits++; return varCached; }

        const results = await _braveSearch(variant, searchOpts);
        if (results.length > 0) {
          const filtered = temporal ? _filterByFreshness(results, temporal) : results;
          const relevant = _personResultsAreRelevant(filtered, query);
          if (relevant.length > 0) {
            const sliced = relevant.slice(0, finalCount);
            setCache(varCacheKey, sliced);
            logger.info(`[websearch] Person Brave OK variante ${i+1}: "${variant}" → ${sliced.length} relevantes`);
            return sliced;
          }
        }
      }
      logger.info('[websearch] Person: Brave agotó variantes sin resultados relevantes');
    }

    // ── Último recurso: Google Search Grounding ──
    logger.info('[websearch] Person: intentando Google Search Grounding');
    const googleResult = await _googleSearchGrounding(query);

    if (googleResult.results.length > 0) {
      const googleRelevant = _personResultsAreRelevant(googleResult.results, query);
      if (googleRelevant.length > 0) {
        const sliced = googleRelevant.slice(0, finalCount);
        setCache(`google:${query}:person:${finalCount}`, sliced);
        logger.info(`[websearch] Google Grounding OK: ${sliced.length} relevantes`);
        return sliced;
      }
    }

    if (googleResult.groundedText.length > 50) {
      logger.info(`[websearch] Google Grounding: texto grounded (${googleResult.groundedText.length} chars)`);
      return [{
        title: `Información encontrada via Google sobre: ${query}`,
        url: '',
        description: googleResult.groundedText,
        _score: 5,
        _fromGoogle: true,
        _provider: 'google',
      }];
    }

    logger.warn(`[websearch] Person: ningún proveedor encontró resultados para "${query}"`);
    return [];
  }

  // ══════════════════════════════════════════════════
  //  INTENT NORMAL — DeepSeek → Brave fallback
  // ══════════════════════════════════════════════════

  // ── DeepSeek Search (primario) ──
  if (dsKey) {
    // Para intents "deep", usar búsqueda con contenido
    const useContent = config.depth === 'deep';
    const results = useContent
      ? await _deepseekSearchWithContent(optimizedQuery, searchOpts, query)
      : await _deepseekSearch(optimizedQuery, searchOpts, query);

    if (results.length > 0) {
      // Post-filtrar por frescura si hay marcador temporal
      const filtered = temporal ? _filterByFreshness(results, temporal) : results;
      const sliced = filtered.slice(0, finalCount);
      if (intent !== 'news') setCache(cacheKey, sliced);
      return sliced;
    }
    logger.info(`[websearch] DeepSeek sin resultados → fallback a Brave`);
  }

  // ── Brave (fallback) ──
  if (braveKey) {
    // Para Brave, no pasar site: operator (no lo soporta igual)
    const braveQuery = optimizedQuery.replace(/\s*site:\S+/g, '').trim() || optimizedQuery;
    const results = await _braveSearch(braveQuery, searchOpts);

    if (results.length > 0) {
      // Post-filtrar por frescura si hay marcador temporal
      const filtered = temporal ? _filterByFreshness(results, temporal) : results;
      const sliced = filtered.slice(0, finalCount);
      if (intent !== 'news') setCache(cacheKey, sliced);
      return sliced;
    }
  }

  logger.warn(`[websearch] Sin resultados en ningún proveedor para "${query}"`);
  return [];
}

/* ══════════════════════════════════════════════════════════════
   BUILD CONTEXT — Construye contexto para el LLM
   ══════════════════════════════════════════════════════════════ */

/**
 * buildWebContext — Construye el bloque de contexto para inyectar en el prompt.
 *
 * v2.0: Usa summaries ricos de DeepSeek (600-800 chars).
 * Para intents deep, puede incluir contenido completo de páginas.
 *
 * @param {string} query
 * @param {object} opts — { count, fetchTop }
 *   fetchTop: número de resultados top a profundizar con Fetch (0 = no fetch)
 */
export async function buildWebContext(query, opts = {}) {
  const results = await webSearch(query, opts);

  if (results.length === 0) {
    // Verificar si tenemos al menos una API key configurada
    const hasKey = DEEPSEEK_API_KEY() || BRAVE_API_KEY();
    if (hasKey) {
      logger.info(`[websearch] buildWebContext: búsqueda ejecutada, 0 resultados para "${query}"`);
      return {
        context: '',
        sources: [],
        searched: true,
        empty: true,
        query: query,
      };
    }
    return null;
  }

  // ── Fetch opcional: profundizar en top resultados ──
  const fetchTop = opts.fetchTop || 0;
  if (fetchTop > 0 && DEEPSEEK_API_KEY()) {
    const toFetch = results.slice(0, fetchTop).filter(r => r.url && !r._fromGoogle);

    const fetched = await Promise.allSettled(
      toFetch.map(r => _deepseekFetch(r.url))
    );

    for (let i = 0; i < fetched.length; i++) {
      if (fetched[i].status === 'fulfilled' && fetched[i].value?.content) {
        const fetchContent = fetched[i].value.content;
        // Clonar el objeto para no envenenar la cache (toFetch referencia los mismos objetos)
        const idx = results.indexOf(toFetch[i]);
        const enriched = { ...toFetch[i] };
        const truncated = fetchContent.length > 2000
          ? fetchContent.slice(0, 2000) + '…'
          : fetchContent;
        enriched.description = truncated;
        enriched._fetched = true;
        if (idx >= 0) results[idx] = enriched;
        logger.info(`[websearch] Fetch enriqueció resultado: ${enriched.url} → ${truncated.length} chars`);
      }
    }
  }

  // ── Construir contexto ──
  let context = '';
  const sources = [];

  for (const r of results) {
    // Usar description que ya es el summary rico de DeepSeek (o el contenido fetched)
    const desc = r.description || '';
    const snippet = desc.length > 1500
      ? desc.slice(0, 1500) + '…'
      : desc;

    // Emitir fecha de publicación cuando existe (para que el LLM la use)
    const dateLine = r.date ? `\nPublicado: ${r.date}` : '';

    if (r._fromGoogle && !r.url) {
      context += `\n\n### ${r.title}${dateLine}\n${snippet}`;
      sources.push({ title: r.title, url: 'Google Search' });
    } else {
      context += `\n\n### ${r.title}${dateLine}\n${snippet}\nFuente: ${r.url}`;
      sources.push({ title: r.title, url: r.url });
    }
  }

  return {
    context: context.trim(),
    sources,
    searched: true,
    empty: false,
  };
}

/* ══════════════════════════════════════════════════════════════
   DETECCIÓN DE INTENCIÓN WEB — isWebSearchQuery
   ══════════════════════════════════════════════════════════════ */
export function isWebSearchQuery(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const webPatterns = [
    // ── Personas ──
    /\b(quien|quienes)\s+(es|fue|son|fueron|era|eran)\b/,
    /\bconoces\s+(a|al|la)\b/,
    /\bsabes\s+(de|sobre|quien|quienes)\b/,
    /\b(informacion|info|datos|biografia|perfil|trayectoria|carrera|curriculum)\s+(de|del|sobre)\b/,
    /\b(donde\s+(trabaja|trabajo|vive|nacio|estudio|estudia))\b/,
    /\b(ingenier[oa]|arquitect[oa]|doctor[a]?|abogad[oa]|contador[a]?|licenciad[oa]|profesor[a]?|maestr[oa]?|diputad[oa]|senador[a]?|ministro[a]?|intendente[a]?|escritor[a]?|periodista|investigador[a]?|cientifico[a]?|economista|psicologo[a]?|sociologo[a]?|antropologo[a]?|geologo[a]?|biologo[a]?|quimico[a]?|fisico[a]?|medico[a]?|enfermero[a]?|veterinari[oa]|farmaceutico[a]?|odontologo[a]?|nutricionista|kinesiologo[a]?|fonoaudiologo[a]?|disenador[a]?|programador[a]?|desarrollador[a]?)\b/,
    // ── Empresas/organizaciones ──
    /\b(empresa|compania|fundacion|asociacion|ong|startup|consultora|estudio)\s+(de|del|llamad[oa])\b/,
    // Cine y series
    /\b(pelicula|peliculas|serie|series|estreno|estrenos|estrenaron|trailer|temporada)\b/,
    /\b(netflix|hbo|disney|amazon prime|apple tv|paramount|streaming|plataforma)\b/,
    /\b(actor|actriz|actores|director|directora|oscar|emmy|golden globe)\b/,
    /\b(cartelera|cine|cinema|taquilla|box office)\b/,
    // Deportes
    /\b(champions league|premier league|la liga|serie a|bundesliga|ligue 1)\b/,
    /\b(nba|nfl|mlb|formula 1|f1|mundial|eurocopa|copa america)\b/,
    /\b(futbol europeo|futbol internacional|liga europea|ligas europeas)\b/,
    /\b(resultado|resultados|gano|ganar|perdio|empato|empate|goles|marcador)\b/,
    /\b(clasificacion|posiciones|tabla|fixture|jornada|partido|partidos)\b/,
    /\b(transferencia|fichaje|fichajes|traspaso|mercado de pases)\b/,
    /\b(messi|ronaldo|mbappe|haaland|vinicius|bellingham)\b/,
    /\b(real madrid|barcelona|manchester|liverpool|psg|bayern|juventus|inter)\b/,
    // Política
    /\b(milei|lula|trump|biden|macron|putin|zelensky|modi|maduro|boric)\b/,
    /\b(diplomatica|diplomaticas|diplomatico|diplomacia|embajada|canciller)\b/,
    /\b(relaciones.*entre|conflicto.*entre|tension.*entre|guerra.*entre)\b/,
    /\b(sancion|sanciones|bloqueo|embargo|tratado|acuerdo|cumbre|g20|g7)\b/,
    /\b(eleccion|elecciones|votacion|referendum|plebiscito|balotaje)\b/,
    /\b(congreso|senado|parlamento|asamblea|decreto|ley.*aprob)\b/,
    /\b(crisis|conflicto|guerra|invasion|ataque|atentado|terremoto|huracan)\b/,
    /\b(onu|otan|union europea|mercosur|oea|fmi|banco mundial)\b/,
    // Actualidad
    /\b(hoy|ayer|esta semana|este mes|este ano|actual|actualmente|ahora)\b/,
    /\b(ultimo|ultima|ultimos|ultimas|reciente|recientes|nuevo|nueva|nuevos)\b/,
    /\b(noticia|noticias|novedad|novedades|paso|sucedio|ocurrio)\b/,
    /\b(fin de semana|este finde|esta noche|anoche|semana pasada)\b/,
    /\b(en que punto|como esta|que pasa con|que paso con|que sucede)\b/,
    /\b(luego de|despues de|tras el|tras la|a raiz de)\b/,
    // Tecnología
    /\b(iphone|android|windows|samsung|tesla|spacex|openai|chatgpt|gemini)\b/,
    /\b(lanzamiento|lanzaron|lanzo|version|actualizacion)\b/,
    // Economía
    /\b(dolar|bitcoin|crypto|bolsa|wall street|inflacion|recesion)\b/,
    /\b(petrol|precio.*barril|tasa.*interes|fed.*reserva)\b/,
    // Precios
    /\b(precio|cuesta|vale|donde (ver|comprar|conseguir))\b/,
    /\b(disponible en|plataforma|donde puedo ver)\b/,
    // Clima
    /\b(clima|pronostico|temperatura|lluvia|tormenta)\b/,
    // Legal
    /\b(ley.*nueva|decreto.*nuevo|regulacion|normativa.*vigente)\b/,
    // Comparativas
    /\b(vs|versus|comparar|comparacion|cual es mejor|diferencia entre)\b/,
    // Explícitamente pide buscar
    /\b(busca|buscar|googlea|search|investiga)\b/,
  ];

  if (webPatterns.some(re => re.test(q))) return true;

  // ── Detección de nombres propios ──
  const originalTrimmed = query.trim()
    .replace(/^(quien es|quién es|conoces a|sabes de|hablame de|contame de|decime sobre|que sabes de|qué sabés de|sobre)\s+/i, '');
  const properNameMatch = originalTrimmed.match(
    /\b([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+(?:\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+){1,4})\b/
  );
  if (properNameMatch) {
    const name = properNameMatch[1];
    const notAName = /^(Buenos Aires|Muchas Gracias|Por Favor|Buen D[ií]a|Buenas Tardes|Buenas Noches|Punta del Este|Ciudad de|Estado de|R[ií]o de|Santa Fe|San Jos[eé]|Los Angeles|Las Vegas|Nueva York|El Pais|La Nacion|Monte Carlo|Banco Central|Banco Rep[uú]blica|Banco Mundial|Seguro Social|Sistema Solar|Nueva Zelanda|Costa Rica|Puerto Rico|El Salvador|Sierra Leona|Medio Oriente|Am[eé]rica Latina|Copa Am[eé]rica|Copa Libertadores|Corte Suprema|Poder Ejecutivo|Poder Judicial|Poder Legislativo|Naciones Unidas|Cruz Roja|Casa Blanca|Palacio Legislativo|Torre Ejecutiva|Plaza Independencia|Mercado Libre|Fondo Monetario|Asamblea General|Cambio Clim[aá]tico|Inteligencia Artificial|Machine Learning|Deep Learning|Open Source|Real Madrid|Manchester United|Manchester City|Atl[eé]tico Madrid|Inter Miami|Boca Juniors|River Plate|Club Nacional|Pe[ñn]arol)$/i;
    if (!notAName.test(name)) {
      // Heurística: el nombre debe ocupar más de la mitad de la query limpia
      const ratio = name.length / originalTrimmed.length;
      if (ratio > 0.5) {
        logger.info(`[websearch] Nombre propio detectado: "${name}" → activando web search`);
        return true;
      }
    }
  }

  return false;
}
