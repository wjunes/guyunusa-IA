/**
 * change-detector.test.js
 * Ejecutar: node test/knowledge-updater/change-detector.test.js
 */
import 'dotenv/config';
import { detectChange, markProcessed, resetDomainHashes, CHANGE_STATUS } from '../../src/knowledge-updater/change-detector.js';

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    failed++;
  }
}

const domain = '_test-cd';
const url1   = 'https://example.gub.uy/doc-1';
const url2   = 'https://example.gub.uy/doc-2';
const r1 = { url: url1, title: 'Título del documento', description: 'Contenido original' };
const r1mod = { ...r1, description: 'Contenido MODIFICADO' };
const r2same = { url: url2, title: 'Título del documento', description: 'Contenido original' };
const r3new  = { url: 'https://example.gub.uy/doc-3', title: 'Documento nuevo', description: 'Contenido completamente diferente' };

console.log('\n── change-detector.test.js ──────────────────────────');

resetDomainHashes(domain);

// Nuevo
const res1 = detectChange(domain, r1);
assert(res1.status === CHANGE_STATUS.NEW, `URL nueva → status="new" (got "${res1.status}")`);
assert(typeof res1.hash === 'string' && res1.hash.length === 16, 'Hash tiene 16 caracteres');

// Registrar y volver a detectar → UNCHANGED
markProcessed(domain, url1, res1.hash);
const res2 = detectChange(domain, r1);
assert(res2.status === CHANGE_STATUS.UNCHANGED, `URL conocida, mismo contenido → "unchanged" (got "${res2.status}")`);

// Modificado
const res3 = detectChange(domain, r1mod);
assert(res3.status === CHANGE_STATUS.MODIFIED, `URL conocida, contenido diferente → "modified" (got "${res3.status}")`);
assert(res3.hash !== res1.hash, 'Hash modificado es diferente al original');

// Duplicado (mismo contenido, URL diferente)
const res4 = detectChange(domain, r2same);
assert(res4.status === CHANGE_STATUS.DUPLICATE, `Mismo contenido, URL diferente → "duplicate" (got "${res4.status}")`);

// Nuevo con URL diferente y contenido diferente
const res5 = detectChange(domain, r3new);
assert(res5.status === CHANGE_STATUS.NEW, `URL y contenido distintos → "new" (got "${res5.status}")`);

// Normalización de URL (tracking params)
const r1tracked = { ...r1, url: url1 + '?utm_source=test&utm_medium=email' };
const res6 = detectChange(domain, r1tracked);
assert(res6.status === CHANGE_STATUS.UNCHANGED, 'URL con tracking params normalizada correctamente');

// URL inválida no rompe
let threw = false;
try {
  detectChange(domain, { url: 'not-a-url', title: 'Test', description: 'Test' });
} catch {
  threw = true;
}
assert(!threw, 'URL inválida no lanza excepción');

resetDomainHashes(domain);

console.log(`\nResultado: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
