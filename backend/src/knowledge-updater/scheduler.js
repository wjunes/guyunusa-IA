/**
 * scheduler.js — Orquestador del pipeline de actualización de conocimiento
 *
 * Coordina el pipeline completo:
 *   Explorer → ChangeDetector → Evaluator → CandidateManager
 *
 * El Updater (escritura de .md) se invoca SOLO desde scripts/review-candidates.js
 * tras aprobación humana. El scheduler NO escribe conocimiento definitivo.
 *
 * Modos de ejecución:
 *   runDomain(domain)   — un dominio
 *   runAll()            — todos los dominios habilitados
 *   runSource(domain, source) — una fuente específica
 */
import { logger }                  from '../utils/logger.js';
import { IS_DRY_RUN, LIMITS, envSummary } from './env-guard.js';
import { getEnabledDomains, getDomainConfig, getThresholds } from './config.js';
import { exploreDomain, exploreSource_public, getSearchCount } from './explorer.js';
import { detectChange, CHANGE_STATUS }              from './change-detector.js';
import { evaluate }                                 from './evaluator.js';
import { addCandidate, getStats }                   from './candidate-manager.js';
import { buildRunReport }                           from './reporter.js';

/* ─── Ejecutar todos los dominios habilitados ────────────────── */
export async function runAll() {
  const startedAt = new Date().toISOString();
  const domains   = getEnabledDomains();

  if (domains.length === 0) {
    logger.warn('[scheduler] No hay dominios habilitados — revisar knowledge/config/domains/');
    return;
  }

  logger.info(`[scheduler] Iniciando — ${domains.length} dominios, DRY_RUN=${IS_DRY_RUN}`);
  printEnvSummary();

  const domainResults = [];
  for (const conf of domains) {
    const dr = await runDomainInternal(conf);
    domainResults.push(dr);
  }

  const report = buildRunReport({
    domains:      domains.map(d => d.domain),
    dryRun:       IS_DRY_RUN,
    startedAt,
    finishedAt:   new Date().toISOString(),
    domainResults,
  });
  logger.info(`[scheduler] Búsquedas Brave usadas en este run: ${getSearchCount()}/${LIMITS.maxSearchesPerRun}`);
  return report;
}

/* ─── Ejecutar un dominio específico ─────────────────────────── */
export async function runDomain(domainName) {
  const conf = getDomainConfig(domainName);
  if (!conf) throw new Error(`Dominio "${domainName}" no encontrado en knowledge/config/domains/`);
  if (conf.enabled === false) {
    logger.warn(`[scheduler] Dominio "${domainName}" está deshabilitado. Omitiendo.`);
    return;
  }

  const startedAt = new Date().toISOString();
  printEnvSummary();

  const dr = await runDomainInternal(conf);

  return buildRunReport({
    domains:      [domainName],
    dryRun:       IS_DRY_RUN,
    startedAt,
    finishedAt:   new Date().toISOString(),
    domainResults:[dr],
  });
}

/* ─── Ejecutar una fuente específica de un dominio ───────────── */
export async function runSource(domainName, sourceName) {
  const conf = getDomainConfig(domainName);
  if (!conf) throw new Error(`Dominio "${domainName}" no encontrado`);

  const startedAt = new Date().toISOString();
  printEnvSummary();

  logger.info(`[scheduler] Fuente única: ${domainName}/${sourceName}`);
  const rawResults = await exploreSource_public(conf, sourceName, { dryRun: IS_DRY_RUN });
  const dr = await processResults(conf, rawResults, []);

  return buildRunReport({
    domains:      [`${domainName}/${sourceName}`],
    dryRun:       IS_DRY_RUN,
    startedAt,
    finishedAt:   new Date().toISOString(),
    domainResults:[dr],
  });
}

/* ─── Pipeline interno por dominio ───────────────────────────── */
async function runDomainInternal(conf) {
  const { domain } = conf;
  logger.info(`[scheduler] ── Dominio: ${domain}`);

  const dr = {
    domain,
    sourcesQueried:  0,
    resultsFound:    0,
    newResults:      0,
    modifiedResults: 0,
    duplicates:      0,
    discarded:       0,
    candidates:      0,
    autoApproved:    0,
    pendingReview:   0,
    errors:          [],
  };

  try {
    const { results, errors } = await exploreDomain(conf, { dryRun: IS_DRY_RUN });
    dr.sourcesQueried = (conf.sources || []).filter(s => s.enabled !== false).length;
    dr.resultsFound   = results.length;
    dr.errors         = errors;

    const processed = await processResults(conf, results, errors);
    Object.assign(dr, processed);
  } catch (err) {
    logger.error(`[scheduler] Error en dominio ${domain}: ${err.message}`);
    dr.errors.push({ domain, error: err.message });
  }

  const stats = getStats(domain);
  logger.info(
    `[scheduler] ${domain}: +${dr.candidates} candidatos ` +
    `(pending=${stats.pending}, total_aprobados=${stats.approved})`
  );

  return dr;
}

/* ─── Procesar lista de resultados ───────────────────────────── */
async function processResults(conf, results, errors) {
  const { domain } = conf;
  const thresholds = getThresholds(domain);

  const dr = {
    domain,
    resultsFound:    results.length,
    newResults:      0,
    modifiedResults: 0,
    duplicates:      0,
    discarded:       0,
    candidates:      0,
    autoApproved:    0,
    pendingReview:   0,
    errors,
  };

  let evaluationsThisRun = 0;

  for (const result of results) {
    // 1. Detectar cambio
    const { status: changeStatus, hash } = detectChange(domain, result);
    result._changeHash = hash;

    if (changeStatus === CHANGE_STATUS.UNCHANGED) continue;
    if (changeStatus === CHANGE_STATUS.DUPLICATE) { dr.duplicates++; continue; }
    if (changeStatus === CHANGE_STATUS.NEW)        dr.newResults++;
    if (changeStatus === CHANGE_STATUS.MODIFIED)   dr.modifiedResults++;

    // 2. Límite de evaluaciones por ejecución (control de costos)
    if (evaluationsThisRun >= LIMITS.maxEvaluationsPerRun) {
      logger.warn(`[scheduler] Límite de evaluaciones alcanzado (${LIMITS.maxEvaluationsPerRun})`);
      break;
    }

    // 3. Evaluar con IA
    let evaluation;
    try {
      evaluation = await evaluate(result, { dryRun: IS_DRY_RUN, thresholds });
      evaluationsThisRun++;
    } catch (err) {
      logger.error(`[scheduler] Error evaluando "${result.url}": ${err.message}`);
      dr.errors.push({ url: result.url, error: err.message });
      continue;
    }

    // 4. Decidir según score
    if (evaluation.recommendation === 'discard') {
      dr.discarded++;
      logger.debug(`[scheduler] Descartado: "${result.title?.slice(0, 50)}" (score=${evaluation.overall_score})`);
      continue;
    }

    // 5. Crear candidato
    const candidate = addCandidate(result, evaluation, changeStatus);
    dr.candidates++;

    if (evaluation.recommendation === 'auto_approve' && thresholds.auto_approve !== null) {
      dr.autoApproved++;
    } else {
      dr.pendingReview++;
    }
  }

  return dr;
}

/* ─── Helpers ────────────────────────────────────────────────── */
function printEnvSummary() {
  const env = envSummary();
  logger.info(
    `[env] KNOWLEDGE_ENV=${env.KNOWLEDGE_ENV} | ` +
    `DRY_RUN=${env.IS_DRY_RUN} | ` +
    `maxEvals=${env.LIMITS.maxEvaluationsPerRun} | ` +
    `maxResults/src=${env.LIMITS.maxResultsPerSource}`
  );
}
