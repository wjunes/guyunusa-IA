/**
 * explorer.js — Domain Explorer
 *
 * Construye queries dinámicas para cada dominio/fuente/tema
 * y las ejecuta usando el websearch.service.js existente.
 * Nunca duplica el sistema de búsqueda — lo reutiliza.
 */
import { webSearch } from '../services/websearch.service.js';
import { logger }    from '../utils/logger.js';
import { LIMITS }    from './env-guard.js';

// Contador de presupuesto Brave Search — acumula en todo el proceso
let _searchCount = 0;
export function getSearchCount() { return _searchCount; }

/**
 * Explora todas las fuentes habilitadas de un dominio.
 *
 * @param {object} domainConf — config del dominio
 * @param {{ dryRun: boolean }} opts
 * @returns {Promise<Array>} resultados crudos con metadatos
 */
export async function exploreDomain(domainConf, { dryRun = true } = {}) {
  const { domain, topics = [], sources = [] } = domainConf;
  const enabledSources = sources.filter(s => s.enabled !== false);

  logger.info(`[explorer] ${domain} — ${enabledSources.length} fuentes, ${topics.length} temas`);

  const allResults = [];
  const errors     = [];

  for (const source of enabledSources) {
    try {
      const results = await exploreSource(domain, source, topics, { dryRun });
      allResults.push(...results);
    } catch (err) {
      const msg = `[explorer] Fuente "${source.name}" falló: ${err.message}`;
      logger.error(msg);
      errors.push({ source: source.name, error: err.message });
    }
  }

  logger.info(`[explorer] ${domain} — total: ${allResults.length} resultados, ${errors.length} errores`);
  return { results: allResults, errors };
}

/**
 * Explora una única fuente con sus temas.
 */
async function exploreSource(domain, source, topics, { dryRun }) {
  const queries = buildQueries(source, topics);
  const seen    = new Set();
  const results = [];

  for (const query of queries) {
    if (results.length >= LIMITS.maxResultsPerSource) break;

    logger.debug(`[explorer] Query: "${query}"`);

    if (dryRun) {
      logger.debug(`[explorer] DRY_RUN — omitiendo búsqueda real para "${query}"`);
      continue;
    }

    if (_searchCount >= LIMITS.maxSearchesPerRun) {
      logger.warn(`[explorer] Presupuesto Brave agotado (${_searchCount}/${LIMITS.maxSearchesPerRun}). Deteniendo búsquedas.`);
      break;
    }
    _searchCount++;
    logger.debug(`[explorer] Búsqueda #${_searchCount}/${LIMITS.maxSearchesPerRun}: "${query}"`);

    const raw = await webSearch(query, { count: 5 });

    for (const r of raw) {
      if (seen.has(r.url)) continue;
      seen.add(r.url);
      results.push({
        domain,
        source:      source.name,
        source_type: source.type,
        priority:    source.priority,
        url:         r.url,
        title:       r.title,
        description: r.description || '',
        query_used:  query,
        fetched_at:  new Date().toISOString(),
      });
      if (results.length >= LIMITS.maxResultsPerSource) break;
    }
  }

  return results;
}

/**
 * Construye las queries combinando site: operator con cada tema.
 * Prioriza el operador site: para garantizar fuentes oficiales.
 */
function buildQueries(source, topics) {
  const queries = [];
  const siteOp  = source.site_operator || '';
  // Limitar topics por source para controlar consumo de Brave Search
  const limitedTopics = topics.slice(0, LIMITS.maxTopicsPerSource);

  for (const topic of limitedTopics) {
    if (siteOp) {
      queries.push(`${siteOp} ${topic}`);
    } else {
      queries.push(topic);
    }
  }

  // Query genérica sin tema — captura noticias recientes de la fuente
  if (siteOp) {
    queries.push(`${siteOp} 2026`);
  }

  return queries;
}

/**
 * Explora solo una fuente de un dominio (para ejecuciones parciales).
 */
export async function exploreSource_public(domainConf, sourceName, opts = {}) {
  const source = (domainConf.sources || []).find(s => s.name === sourceName);
  if (!source) throw new Error(`Fuente "${sourceName}" no encontrada en dominio "${domainConf.domain}"`);
  return exploreSource(domainConf.domain, source, domainConf.topics || [], opts);
}
