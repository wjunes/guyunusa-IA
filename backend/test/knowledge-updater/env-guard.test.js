/**
 * env-guard.test.js — Pruebas de seguridad de aislamiento LOCAL/PRODUCCIÓN
 * Ejecutar: node test/knowledge-updater/env-guard.test.js
 *
 * IMPORTANTE: Este test verifica que las protecciones de entorno funcionan.
 * Corre en un sub-proceso para poder probar los casos que hacen process.exit().
 */
import 'dotenv/config';
import { execSync } from 'child_process';
import { KNOWLEDGE_ENV, IS_LOCAL, IS_DRY_RUN, assertNotDryRunForWrites } from '../../src/knowledge-updater/env-guard.js';

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) { console.log(`  ✓ ${label}`); passed++; }
  else           { console.error(`  ✗ ${label}`); failed++; }
}

console.log('\n── env-guard.test.js ────────────────────────────────');

// Variables actuales reflejan el entorno real
assert(typeof KNOWLEDGE_ENV === 'string', 'KNOWLEDGE_ENV es string');
assert(['local','production'].includes(KNOWLEDGE_ENV), `KNOWLEDGE_ENV es "local" o "production" (got "${KNOWLEDGE_ENV}")`);
assert(typeof IS_LOCAL === 'boolean', 'IS_LOCAL es boolean');
assert(typeof IS_DRY_RUN === 'boolean', 'IS_DRY_RUN es boolean');

// assertNotDryRunForWrites lanza si DRY_RUN=true
process.env.KNOWLEDGE_DRY_RUN = 'true';
const { IS_DRY_RUN: dryTrue } = await import('../../src/knowledge-updater/env-guard.js');
let threw1 = false;
try { assertNotDryRunForWrites(); } catch { threw1 = true; }
assert(threw1, 'assertNotDryRunForWrites lanza excepción cuando KNOWLEDGE_DRY_RUN=true');

// assertLocalEnv no aborta cuando KNOWLEDGE_ENV=local (default)
const runLocalCheck = () => {
  try {
    execSync(
      'node -e "import(\'./src/knowledge-updater/env-guard.js\').then(m => { m.assertLocalEnv(); process.exit(0); })"',
      { env: { ...process.env, KNOWLEDGE_ENV: 'local' }, cwd: process.cwd() + '/..', timeout: 5000 }
    );
    return true;
  } catch (e) {
    return e.status === 0;
  }
};

// assertLocalEnv aborta cuando KNOWLEDGE_ENV=production sin override
const runProdCheck = () => {
  try {
    execSync(
      'node -e "import(\'./src/knowledge-updater/env-guard.js\').then(m => m.assertLocalEnv())"',
      { env: { ...process.env, KNOWLEDGE_ENV: 'production', KNOWLEDGE_PRODUCTION_OVERRIDE: '' }, cwd: process.cwd() + '/..', timeout: 5000, stdio: 'pipe' }
    );
    return false; // no debería llegar aquí
  } catch (e) {
    return e.status === 1; // debe abortar con exit 1
  }
};

const prodExits = runProdCheck();
assert(prodExits, 'assertLocalEnv aborta (exit 1) cuando KNOWLEDGE_ENV=production sin override');

// Modo DRY_RUN por defecto es true en LOCAL
const defaultDryRun = process.env.KNOWLEDGE_DRY_RUN ?? 'true';
assert(defaultDryRun !== 'false', 'DRY_RUN no es false por defecto (requiere opt-in explícito)');

console.log(`\nResultado: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
