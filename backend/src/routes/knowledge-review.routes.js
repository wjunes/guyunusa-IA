/**
 * knowledge-review.routes.js — API HTTP de revisión de candidatos BNC-UY
 *
 * Autenticación: X-Knowledge-Key header (KNOWLEDGE_ADMIN_KEY).
 * Para uso local/desarrollo — NO exponer en producción sin revisión de seguridad.
 *
 * GET  /api/v1/knowledge/candidates          ?status&domain&limit
 * GET  /api/v1/knowledge/candidates/:id
 * POST /api/v1/knowledge/candidates/:id/approve
 * POST /api/v1/knowledge/candidates/:id/reject
 * POST /api/v1/knowledge/candidates/:id/requeue
 * GET  /api/v1/knowledge/stats              ?domain
 * GET  /api/v1/knowledge/runs               últimos runs
 */
import { Router }            from 'express';
import { KNOWLEDGE_ENV, ADMIN_KEY } from '../knowledge-updater/env-guard.js';
import {
  getAll, getPending, getCandidateById,
  approveCandidate, rejectCandidate, requeueCandidate, getStats,
} from '../knowledge-updater/candidate-manager.js';
import { listRuns } from '../knowledge-updater/reporter.js';
import { logger }   from '../utils/logger.js';

const router = Router();

/* ─── Auth por API Key (local) ────────────────────────────────── */
function requireKnowledgeKey(req, res, next) {
  const key = req.headers['x-knowledge-key'];
  if (!key || key !== ADMIN_KEY) {
    return res.status(401).json({ ok: false, message: 'X-Knowledge-Key inválida o ausente' });
  }
  next();
}

router.use(requireKnowledgeKey);

/* ─── Listar candidatos ───────────────────────────────────────── */
router.get('/candidates', (req, res) => {
  try {
    const { status, domain, limit = '50' } = req.query;
    const items = getAll({ status, domain, limit: parseInt(limit, 10) });
    res.json({ ok: true, count: items.length, items });
  } catch (err) {
    logger.error(`[knowledge-review] GET /candidates: ${err.message}`);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ─── Ver candidato ───────────────────────────────────────────── */
router.get('/candidates/:id', (req, res) => {
  const c = getCandidateById(req.params.id);
  if (!c) return res.status(404).json({ ok: false, message: 'Candidato no encontrado' });
  res.json({ ok: true, candidate: c });
});

/* ─── Aprobar ─────────────────────────────────────────────────── */
router.post('/candidates/:id/approve', (req, res) => {
  try {
    const notes = req.body?.notes || '';
    const c = approveCandidate(req.params.id, notes);
    res.json({ ok: true, candidate: c });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ─── Rechazar ────────────────────────────────────────────────── */
router.post('/candidates/:id/reject', (req, res) => {
  try {
    const reason = req.body?.reason || '';
    const c = rejectCandidate(req.params.id, reason);
    res.json({ ok: true, candidate: c });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ─── Re-encolar ──────────────────────────────────────────────── */
router.post('/candidates/:id/requeue', (req, res) => {
  try {
    const c = requeueCandidate(req.params.id);
    res.json({ ok: true, candidate: c });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ─── Estadísticas ────────────────────────────────────────────── */
router.get('/stats', (req, res) => {
  try {
    const domain = req.query.domain;
    const stats  = getStats(domain);
    res.json({ ok: true, domain: domain || 'global', stats, env: KNOWLEDGE_ENV });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ─── Runs recientes ──────────────────────────────────────────── */
router.get('/runs', (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '10', 10);
    const runs  = listRuns({ limit });
    res.json({ ok: true, count: runs.length, runs });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
