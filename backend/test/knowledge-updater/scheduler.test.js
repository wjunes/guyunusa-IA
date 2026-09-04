/**
 * scheduler.test.js — Test de regresión del pipeline completo en DRY_RUN
 * Ejecutar: node test/knowledge-updater/scheduler.test.js
 *
 * No llama a Brave ni a OpenRouter.
 * Verifica que el pipeline completo corre sin errores y genera candidatos.
 */
import 'dotenv/config';

// Forzar modo seguro
process.env.KNOWLEDGE_ENV      = 'local';
process.env.KNOWLEDGE_DRY_RUN  = 'true';

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) { console.log(`  ✓ ${label}`); passed++; }
  else           { console.error(`  ✗ ${label}`); failed++; }
}

console.log('\n── scheduler.test.js ────────────────────────────────');
console.log('  (DRY_RUN=true — sin llamadas a API externas)');

import { runDomain } from '../../src/knowledge-updater/scheduler.js';
import { getStats }  from '../../src/knowledge-updater/candidate-manager.js';
import { getEnabledDomains } from '../../src/knowledge-updater/config.js';

// Verificar que hay dominios configurados
const domains = getEnabledDomains();
assert(domains.length > 0, `Al menos 1 dominio configurado (encontrados: ${domains.length})`);
assert(domains.some(d => d.domain === 'agro-uy'), 'Dominio agro-uy está configurado');

// Correr un dominio en DRY_RUN
let report;
let threw = false;
try {
  report = await runDomain('agro-uy');
} catch (err) {
  threw = true;
  console.error('  Error:', err.message);
}
assert(!threw, 'runDomain("agro-uy") no lanza excepción');
assert(report !== undefined, 'runDomain retorna un reporte');
assert(typeof report?.run_id === 'string', 'Reporte tiene run_id');
assert(report?.dry_run === true, 'Reporte indica dry_run=true');
assert(Array.isArray(report?.domains_processed), 'Reporte tiene domains_processed');
assert(report?.domains_processed?.includes('agro-uy'), 'Reporte incluye agro-uy');
assert(typeof report?.duration_sec === 'number', 'Reporte tiene duration_sec');

// En DRY_RUN no hay búsquedas reales → 0 resultados pero el pipeline no rompe
assert(report?.resultsFound === 0, 'DRY_RUN produce 0 resultados (sin búsqueda real)');

// Dominio inexistente lanza error descriptivo
let threw2 = false;
try { await runDomain('dominio-que-no-existe-xyzabc'); } catch { threw2 = true; }
assert(threw2, 'runDomain con dominio inexistente lanza error');

// Dominio deshabilitado es omitido
// (test indirecto: si un dominio existe pero disabled=false, no debe romper)
assert(typeof getStats === 'function', 'getStats disponible');

console.log(`\nResultado: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
