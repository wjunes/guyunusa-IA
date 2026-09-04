/**
 * candidate-manager.test.js
 * Ejecutar: node test/knowledge-updater/candidate-manager.test.js
 */
import 'dotenv/config';
import {
  addCandidate, approveCandidate, rejectCandidate, requeueCandidate,
  getPending, getApproved, getRejected, getFailed, getCandidateById, getStats,
} from '../../src/knowledge-updater/candidate-manager.js';
import { CANDIDATE_STATUS } from '../../src/knowledge-updater/store.js';

let passed = 0;
let failed = 0;
const createdIds = [];

function assert(condition, label) {
  if (condition) { console.log(`  ✓ ${label}`); passed++; }
  else           { console.error(`  ✗ ${label}`); failed++; }
}

console.log('\n── candidate-manager.test.js ────────────────────────');

const evalMock = {
  relevance: 85, confidence: 90, novelty: 80, validity: 95, impact: 70,
  overall_score: 85, recommendation: 'review',
  reason: 'Test', key_topics: ['prueba'], dry_run: true,
  evaluated_at: new Date().toISOString(), model: 'test',
};
const testResult = {
  domain: '_test-cm', source: 'TestFuente', source_type: 'official',
  url: 'https://example.gub.uy/cm-test-1', title: 'Título de prueba',
  description: 'Descripción de prueba', _changeHash: 'hash-test-001',
};

// Crear candidato
const c1 = addCandidate(testResult, evalMock, 'new');
createdIds.push(c1.id);
assert(c1.id, 'Candidato creado con ID');
assert(c1.status === CANDIDATE_STATUS.PENDING, 'Status inicial = pending');
assert(c1.domain === '_test-cm', 'Dominio correcto');
assert(c1.evaluation?.overall_score === 85, 'Evaluación almacenada');

// Recuperar por ID
const fetched = getCandidateById(c1.id);
assert(fetched?.id === c1.id, 'getCandidateById retorna candidato correcto');

// Aprobar
const approved = approveCandidate(c1.id, 'Test approval');
assert(approved.status === CANDIDATE_STATUS.APPROVED, 'approveCandidate → status=approved');
assert(approved.processing_notes === 'Test approval', 'Notas guardadas');
assert(approved.processed_at !== null, 'processed_at seteado');

// Crear y rechazar
const c2 = addCandidate({ ...testResult, url: 'https://example.gub.uy/cm-test-2', _changeHash: 'hash-002' }, evalMock, 'new');
createdIds.push(c2.id);
const rejected = rejectCandidate(c2.id, 'No es relevante');
assert(rejected.status === CANDIDATE_STATUS.REJECTED, 'rejectCandidate → status=rejected');

// Re-encolar
const requeued = requeueCandidate(c2.id);
assert(requeued.status === CANDIDATE_STATUS.PENDING, 'requeueCandidate → status=pending');
assert(requeued.error === null, 'error limpiado al re-encolar');

// Estadísticas
const stats = getStats('_test-cm');
assert(typeof stats.pending === 'number', 'getStats retorna números');
assert(stats.approved >= 1, 'Al menos 1 aprobado');

// Listados
const pendingList = getPending('_test-cm');
assert(pendingList.some(c => c.id === c2.id), 'Re-encolado aparece en pending');

const approvedList = getApproved('_test-cm');
assert(approvedList.some(c => c.id === c1.id), 'Aprobado aparece en approved');

// ID inexistente no rompe
let threw = false;
try { getCandidateById('id-inexistente-xyz'); } catch { threw = true; }
assert(!threw, 'getCandidateById con ID inexistente no lanza excepción');

console.log(`\nResultado: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
