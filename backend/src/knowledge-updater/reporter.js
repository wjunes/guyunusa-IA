/**
 * reporter.js — Generador de reportes
 *
 * Genera reportes por ejecución y resúmenes semanales.
 */
import { saveRun, listRuns } from './store.js';
import { logger }            from '../utils/logger.js';

/* ─── Reporte por ejecución ──────────────────────────────────── */
export function buildRunReport({
  domains,
  dryRun,
  startedAt,
  finishedAt,
  domainResults = [],
}) {
  const duration = Math.round((new Date(finishedAt) - new Date(startedAt)) / 1000);

  const totals = domainResults.reduce((acc, dr) => {
    acc.sourcesQueried += dr.sourcesQueried || 0;
    acc.resultsFound   += dr.resultsFound   || 0;
    acc.newResults     += dr.newResults     || 0;
    acc.modifiedResults+= dr.modifiedResults|| 0;
    acc.duplicates     += dr.duplicates     || 0;
    acc.discarded      += dr.discarded      || 0;
    acc.candidates     += dr.candidates     || 0;
    acc.autoApproved   += dr.autoApproved   || 0;
    acc.pendingReview  += dr.pendingReview  || 0;
    acc.errors         += (dr.errors?.length || 0);
    return acc;
  }, {
    sourcesQueried: 0, resultsFound: 0, newResults: 0, modifiedResults: 0,
    duplicates: 0, discarded: 0, candidates: 0, autoApproved: 0,
    pendingReview: 0, errors: 0,
  });

  const report = {
    run_id:       `run-${Date.now().toString(36)}`,
    started_at:   startedAt,
    finished_at:  finishedAt,
    duration_sec: duration,
    dry_run:      dryRun,
    domains_processed: domains,
    ...totals,
    by_domain: domainResults,
  };

  const path = saveRun(report);
  logger.info(`[reporter] Reporte guardado: ${path}`);
  printRunSummary(report);
  return report;
}

/* ─── Reporte semanal (agrega últimos 7 días) ────────────────── */
export function buildWeeklyReport() {
  const cutoff  = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const runs    = listRuns({ limit: 200 }).filter(r => new Date(r.started_at).getTime() > cutoff);

  if (runs.length === 0) {
    return { message: 'Sin ejecuciones en los últimos 7 días', runs: 0 };
  }

  const totals = runs.reduce((acc, r) => {
    acc.sourcesQueried  += r.sourcesQueried  || 0;
    acc.resultsFound    += r.resultsFound    || 0;
    acc.newResults      += r.newResults      || 0;
    acc.modifiedResults += r.modifiedResults || 0;
    acc.duplicates      += r.duplicates      || 0;
    acc.discarded       += r.discarded       || 0;
    acc.candidates      += r.candidates      || 0;
    acc.autoApproved    += r.autoApproved    || 0;
    acc.pendingReview   += r.pendingReview   || 0;
    acc.errors          += r.errors          || 0;
    return acc;
  }, {
    sourcesQueried: 0, resultsFound: 0, newResults: 0, modifiedResults: 0,
    duplicates: 0, discarded: 0, candidates: 0, autoApproved: 0,
    pendingReview: 0, errors: 0,
  });

  const domains = [...new Set(runs.flatMap(r => r.domains_processed || []))];

  const weekly = {
    period: `${new Date(cutoff).toISOString().slice(0,10)} → ${new Date().toISOString().slice(0,10)}`,
    runs:   runs.length,
    domains: domains.length,
    ...totals,
  };

  printWeeklySummary(weekly);
  return weekly;
}

/* ─── Output legible ─────────────────────────────────────────── */
function printRunSummary(r) {
  const mode = r.dry_run ? ' [DRY-RUN]' : '';
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BNC-UY — Reporte de ejecución${mode}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Inicio:     ${r.started_at}
Duración:   ${r.duration_sec}s
Dominios:   ${(r.domains_processed || []).join(', ')}

Fuentes consultadas: ${r.sourcesQueried}
Resultados:          ${r.resultsFound}
  Nuevos:            ${r.newResults}
  Modificados:       ${r.modifiedResults}
  Duplicados:        ${r.duplicates}
  Descartados:       ${r.discarded}

Candidatos:         ${r.candidates}
  Requieren revisión:${r.pendingReview}
  Auto-aprobados:   ${r.autoApproved}
  Errores:          ${r.errors}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

function printWeeklySummary(w) {
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BNC-UY — Resumen semanal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Período:   ${w.period}
Ejecuciones: ${w.runs}
Dominios:    ${w.domains}

Fuentes consultadas: ${w.sourcesQueried}
Resultados:          ${w.resultsFound}
  Nuevos:            ${w.newResults}
  Modificados:       ${w.modifiedResults}
  Duplicados:        ${w.duplicates}
  Descartados:       ${w.discarded}

Candidatos:          ${w.candidates}
  Requieren revisión:${w.pendingReview}
  Auto-aprobados:    ${w.autoApproved}
  Errores:           ${w.errors}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

export { listRuns };
