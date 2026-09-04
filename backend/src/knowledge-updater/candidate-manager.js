/**
 * candidate-manager.js — Gestión de candidatos
 *
 * CRUD de alto nivel sobre store.js.
 * Mantiene trazabilidad completa: fuente → evaluación → estado → procesamiento.
 */
import {
  createCandidate, getCandidate, updateCandidate,
  listCandidates, countCandidates, CANDIDATE_STATUS,
} from './store.js';
import { markProcessed } from './change-detector.js';
import { logger }        from '../utils/logger.js';

/* ─── Crear candidato desde un resultado evaluado ────────────── */
export function addCandidate(result, evaluation, changeStatus) {
  const candidate = createCandidate({
    domain:       result.domain,
    source:       result.source,
    url:          result.url,
    title:        result.title,
    content:      result.description || '',
    summary:      buildSummary(result, evaluation),
    published_at: result.published_at || null,
    content_hash: result._changeHash || null,
    evaluation,
  });

  // Registrar el hash para futura deduplicación
  if (result._changeHash) {
    markProcessed(result.domain, result.url, result._changeHash);
  }

  logger.info(
    `[candidates] Nuevo: [${candidate.id}] "${candidate.title.slice(0, 60)}" ` +
    `(${candidate.domain}) score=${evaluation.overall_score} → ${evaluation.recommendation}`
  );
  return candidate;
}

/* ─── Aprobar candidato ──────────────────────────────────────── */
export function approveCandidate(id, notes = '') {
  const updated = updateCandidate(id, {
    status:       CANDIDATE_STATUS.APPROVED,
    processed_at: new Date().toISOString(),
    processing_notes: notes || 'Aprobado manualmente',
  });
  logger.info(`[candidates] Aprobado: [${id}]`);
  return updated;
}

/* ─── Rechazar candidato ─────────────────────────────────────── */
export function rejectCandidate(id, reason = '') {
  const updated = updateCandidate(id, {
    status:       CANDIDATE_STATUS.REJECTED,
    processed_at: new Date().toISOString(),
    processing_notes: reason || 'Rechazado manualmente',
  });
  logger.info(`[candidates] Rechazado: [${id}]`);
  return updated;
}

/* ─── Marcar como en procesamiento ──────────────────────────── */
export function markProcessing(id) {
  return updateCandidate(id, { status: CANDIDATE_STATUS.PROCESSING });
}

/* ─── Marcar como procesado correctamente ───────────────────── */
export function markDone(id, notes = '') {
  return updateCandidate(id, {
    status:       CANDIDATE_STATUS.PROCESSED,
    processed_at: new Date().toISOString(),
    processing_notes: notes,
  });
}

/* ─── Marcar como fallido ────────────────────────────────────── */
export function markFailed(id, error) {
  return updateCandidate(id, {
    status: CANDIDATE_STATUS.FAILED,
    error:  String(error),
  });
}

/* ─── Requeue candidato rechazado/fallido ────────────────────── */
export function requeueCandidate(id) {
  const c = getCandidate(id);
  if (!c) throw new Error(`Candidato no encontrado: ${id}`);
  const updated = updateCandidate(id, {
    status:       CANDIDATE_STATUS.PENDING,
    error:        null,
    processed_at: null,
    processing_notes: `Re-encolado el ${new Date().toISOString()}`,
  });
  logger.info(`[candidates] Re-encolado: [${id}]`);
  return updated;
}

/* ─── Consultas ──────────────────────────────────────────────── */
export function getPending(domain)  { return listCandidates({ status: CANDIDATE_STATUS.PENDING,  domain }); }
export function getApproved(domain) { return listCandidates({ status: CANDIDATE_STATUS.APPROVED, domain }); }
export function getRejected(domain) { return listCandidates({ status: CANDIDATE_STATUS.REJECTED, domain }); }
export function getFailed(domain)   { return listCandidates({ status: CANDIDATE_STATUS.FAILED,   domain }); }
export function getAll(opts)        { return listCandidates(opts); }
export function getCandidateById(id){ return getCandidate(id); }

export function getStats(domain) {
  return {
    pending:    countCandidates({ status: CANDIDATE_STATUS.PENDING,    domain }),
    approved:   countCandidates({ status: CANDIDATE_STATUS.APPROVED,   domain }),
    rejected:   countCandidates({ status: CANDIDATE_STATUS.REJECTED,   domain }),
    processing: countCandidates({ status: CANDIDATE_STATUS.PROCESSING, domain }),
    processed:  countCandidates({ status: CANDIDATE_STATUS.PROCESSED,  domain }),
    failed:     countCandidates({ status: CANDIDATE_STATUS.FAILED,     domain }),
  };
}

/* ─── Helpers ────────────────────────────────────────────────── */
function buildSummary(result, evaluation) {
  const topics = (evaluation.key_topics || []).join(', ');
  return [
    result.description?.slice(0, 300) || '',
    topics ? `Temas: ${topics}` : '',
  ].filter(Boolean).join(' | ');
}
