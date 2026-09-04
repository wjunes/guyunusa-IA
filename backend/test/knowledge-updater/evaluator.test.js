/**
 * evaluator.test.js
 * Ejecutar: node test/knowledge-updater/evaluator.test.js
 */
import 'dotenv/config';
import { evaluate, scoreToRecommendation, SCORE_BANDS } from '../../src/knowledge-updater/evaluator.js';

// Forzar DRY_RUN para no consumir API
process.env.KNOWLEDGE_DRY_RUN = 'true';

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) { console.log(`  ✓ ${label}`); passed++; }
  else           { console.error(`  ✗ ${label}`); failed++; }
}

console.log('\n── evaluator.test.js ────────────────────────────────');

const resultOfficial = {
  domain: 'agro-uy', source: 'MGAP', source_type: 'official',
  url: 'https://www.mgap.gub.uy/test', title: 'Decreto de prueba', description: 'Contenido oficial',
};
const resultGeneric = {
  domain: 'agro-uy', source: 'BlogRandom', source_type: 'generic',
  url: 'https://blog.com/test', title: 'Post random', description: 'Opinión',
};

// DRY_RUN — evaluación simulada
const eval1 = await evaluate(resultOfficial, { dryRun: true });
assert(eval1.dry_run === true, 'DRY_RUN produce evaluación simulada');
assert(typeof eval1.overall_score === 'number', 'overall_score es número');
assert(eval1.overall_score >= 0 && eval1.overall_score <= 100, 'overall_score en rango [0,100]');
assert(typeof eval1.recommendation === 'string', 'recommendation es string');
assert(['auto_approve','review','review_secondary','discard'].includes(eval1.recommendation), 'recommendation válida');
assert(eval1.model === 'dry-run', 'modelo es "dry-run" en modo simulado');

// Fuente oficial debe tener score más alto que genérica
const eval2 = await evaluate(resultGeneric, { dryRun: true });
assert(eval1.overall_score >= eval2.overall_score, 'Fuente oficial tiene score >= fuente genérica');

// scoreToRecommendation
assert(scoreToRecommendation(95) === 'auto_approve', 'score 95 → auto_approve');
assert(scoreToRecommendation(80) === 'review', 'score 80 → review');
assert(scoreToRecommendation(60) === 'review_secondary', 'score 60 → review_secondary');
assert(scoreToRecommendation(30) === 'discard', 'score 30 → discard');

// Thresholds personalizados
assert(scoreToRecommendation(85, { auto_approve: 90, review: 70, discard: 50 }) === 'review', 'threshold personalizado funciona');

// Sin ninguna API key → no rompe, devuelve simulado
const origDeepseek  = process.env.DEEPSEEK_API_KEY;
const origOpenrouter = process.env.OPENROUTER_API_KEY;
delete process.env.DEEPSEEK_API_KEY;
delete process.env.OPENROUTER_API_KEY;
const eval3 = await evaluate(resultOfficial, { dryRun: false });
assert(eval3.dry_run === true, 'Sin API keys → cae a simulado sin romper');
if (origDeepseek)   process.env.DEEPSEEK_API_KEY   = origDeepseek;
if (origOpenrouter) process.env.OPENROUTER_API_KEY  = origOpenrouter;

console.log(`\nResultado: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
