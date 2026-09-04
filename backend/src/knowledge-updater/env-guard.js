/**
 * env-guard.js — Validación de entorno para el motor de actualización de conocimiento
 *
 * Garantiza aislamiento completo entre LOCAL y PRODUCCIÓN.
 * Cualquier ejecución en entorno no-local requiere flag explícito.
 * Este módulo debe ser el primer import en cualquier script del motor.
 */

export const KNOWLEDGE_ENV = (process.env.KNOWLEDGE_ENV || 'local').toLowerCase();
export const IS_LOCAL       = KNOWLEDGE_ENV === 'local';
export const IS_DRY_RUN     = (process.env.KNOWLEDGE_DRY_RUN ?? 'true') !== 'false';
export const AUTO_APPROVE   = process.env.KNOWLEDGE_AUTO_APPROVE === 'true' && IS_LOCAL === false;
export const ADMIN_KEY      = process.env.KNOWLEDGE_ADMIN_KEY || 'dev-local-key';

export const LIMITS = {
  maxResultsPerSource:   parseInt(process.env.KNOWLEDGE_MAX_RESULTS_PER_SOURCE  || '10', 10),
  maxEvaluationsPerRun:  parseInt(process.env.KNOWLEDGE_MAX_EVALUATIONS_PER_RUN || '20', 10),
  maxCandidatesPerDomain:parseInt(process.env.KNOWLEDGE_MAX_CANDIDATES_PER_DOMAIN || '50', 10),
  requestTimeoutMs:      parseInt(process.env.KNOWLEDGE_REQUEST_TIMEOUT_MS || '15000', 10),
  // Control de presupuesto Brave Search (2.000/mes gratis)
  maxSearchesPerRun:     parseInt(process.env.KNOWLEDGE_MAX_SEARCHES_PER_RUN   || '200', 10),
  maxTopicsPerSource:    parseInt(process.env.KNOWLEDGE_MAX_TOPICS_PER_SOURCE  || '2',   10),
};

/**
 * Aborta si el entorno no es seguro para ejecutar el motor.
 * Llamar al comienzo de cada script CLI y ruta de administración.
 */
export function assertLocalEnv() {
  if (!IS_LOCAL) {
    const override = process.env.KNOWLEDGE_PRODUCTION_OVERRIDE;
    if (override !== 'CONFIRMED') {
      console.error(
        '\n[env-guard] EJECUCIÓN BLOQUEADA\n' +
        `  KNOWLEDGE_ENV=${KNOWLEDGE_ENV} — El motor solo opera en LOCAL durante esta etapa.\n` +
        '  Si querés ejecutar en producción, seteá KNOWLEDGE_PRODUCTION_OVERRIDE=CONFIRMED\n' +
        '  y asegurate de entender completamente las consecuencias.\n'
      );
      process.exit(1);
    }
    if (!IS_DRY_RUN) {
      console.error(
        '\n[env-guard] EJECUCIÓN BLOQUEADA\n' +
        '  No se permite KNOWLEDGE_DRY_RUN=false en producción en esta etapa.\n'
      );
      process.exit(1);
    }
  }
}

/**
 * Aborta si DRY_RUN está desactivado en LOCAL sin confirmación explícita.
 * Llamar en el Updater antes de escribir cualquier archivo.
 */
export function assertNotDryRunForWrites() {
  if (IS_DRY_RUN) {
    throw new Error('[DRY_RUN] Escritura bloqueada — KNOWLEDGE_DRY_RUN=true. Simulación activa.');
  }
}

export function envSummary() {
  return {
    KNOWLEDGE_ENV,
    IS_LOCAL,
    IS_DRY_RUN,
    AUTO_APPROVE,
    LIMITS,
  };
}
