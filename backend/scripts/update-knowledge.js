#!/usr/bin/env node
/**
 * update-knowledge.js — CLI del motor de actualización de conocimiento BNC-UY
 *
 * Uso:
 *   node scripts/update-knowledge.js domain <nombre>
 *   node scripts/update-knowledge.js all
 *   node scripts/update-knowledge.js source <dominio> <fuente>
 *   node scripts/update-knowledge.js weekly-report
 *   node scripts/update-knowledge.js stats [dominio]
 *   node scripts/update-knowledge.js test
 *
 * Variables de entorno requeridas (ver .env.example):
 *   KNOWLEDGE_ENV=local
 *   KNOWLEDGE_DRY_RUN=true|false
 *   BRAVE_SEARCH_API_KEY=...
 *   OPENROUTER_API_KEY=...
 */
import 'dotenv/config';
import { assertLocalEnv } from '../src/knowledge-updater/env-guard.js';
import { runAll, runDomain, runSource } from '../src/knowledge-updater/scheduler.js';
import { buildWeeklyReport }           from '../src/knowledge-updater/reporter.js';
import { getStats, getAll }            from '../src/knowledge-updater/candidate-manager.js';
import { getEnabledDomains }           from '../src/knowledge-updater/config.js';
import { logger }                      from '../src/utils/logger.js';

assertLocalEnv();

const [,, command, arg1, arg2] = process.argv;

async function main() {
  switch (command) {

    case 'domain': {
      if (!arg1) {
        console.error('Uso: node scripts/update-knowledge.js domain <nombre>');
        process.exit(1);
      }
      logger.info(`Ejecutando dominio: ${arg1}`);
      await runDomain(arg1);
      break;
    }

    case 'all': {
      logger.info('Ejecutando todos los dominios habilitados');
      await runAll();
      break;
    }

    case 'source': {
      if (!arg1 || !arg2) {
        console.error('Uso: node scripts/update-knowledge.js source <dominio> <fuente>');
        process.exit(1);
      }
      logger.info(`Ejecutando fuente: ${arg1}/${arg2}`);
      await runSource(arg1, arg2);
      break;
    }

    case 'weekly-report': {
      buildWeeklyReport();
      break;
    }

    case 'stats': {
      if (arg1) {
        const stats = getStats(arg1);
        console.log(`\nEstadísticas — ${arg1}:`);
        console.table(stats);
      } else {
        const domains = getEnabledDomains();
        console.log('\nEstadísticas por dominio:');
        for (const d of domains) {
          const stats = getStats(d.domain);
          const total = Object.values(stats).reduce((a, b) => a + b, 0);
          if (total > 0) console.log(`  ${d.domain}: pending=${stats.pending} approved=${stats.approved} rejected=${stats.rejected}`);
        }
        const all = getAll({ limit: 1000 });
        console.log(`\nTotal candidatos: ${all.length}`);
      }
      break;
    }

    case 'test': {
      await runTest();
      break;
    }

    case 'list-domains': {
      const domains = getEnabledDomains();
      console.log(`\nDominios configurados (${domains.length}):`);
      for (const d of domains) {
        const srcCount = (d.sources || []).filter(s => s.enabled !== false).length;
        console.log(`  ${d.enabled !== false ? '✓' : '✗'} ${d.domain} — ${srcCount} fuentes — ${d.frequency || 'weekly'}`);
      }
      break;
    }

    default:
      console.log(`
BNC-UY Knowledge Updater
========================

Comandos disponibles:
  domain <nombre>           Explorar un dominio específico
  all                       Explorar todos los dominios habilitados
  source <dominio> <fuente> Explorar una fuente específica
  weekly-report             Generar resumen semanal
  stats [dominio]           Ver estadísticas de candidatos
  list-domains              Listar dominios configurados
  test                      Ejecutar prueba con datos simulados

Variables de entorno:
  KNOWLEDGE_ENV=local
  KNOWLEDGE_DRY_RUN=true     (true=simulación, false=búsqueda real)
  BRAVE_SEARCH_API_KEY=...
  OPENROUTER_API_KEY=...
  KNOWLEDGE_MAX_RESULTS_PER_SOURCE=10
  KNOWLEDGE_MAX_EVALUATIONS_PER_RUN=20

Ejemplo rápido (sin consumo de API):
  KNOWLEDGE_DRY_RUN=true node scripts/update-knowledge.js domain agro-uy
`);
      break;
  }
}

/* ─── Prueba con datos simulados ──────────────────────────────── */
async function runTest() {
  logger.info('[test] Iniciando prueba con datos simulados');

  const { addCandidate, approveCandidate, rejectCandidate, getPending } = await import('../src/knowledge-updater/candidate-manager.js');
  const { detectChange, markProcessed } = await import('../src/knowledge-updater/change-detector.js');

  const testDomain = '_test-domain';

  // Simular resultado nuevo
  const r1 = { domain: testDomain, source: 'TestFuente', source_type: 'official', url: 'https://example.gub.uy/doc1', title: 'Documento de prueba 1', description: 'Contenido nuevo de prueba para el sistema' };
  const { status: s1, hash: h1 } = detectChange(testDomain, r1);
  console.log(`  [1] Nuevo resultado → cambio: ${s1} (esperado: new) ${s1 === 'new' ? '✓' : '✗'}`);

  // Marcar procesado y volver a detectar (debe ser UNCHANGED)
  markProcessed(testDomain, r1.url, h1);
  const { status: s2 } = detectChange(testDomain, r1);
  console.log(`  [2] Mismo resultado → cambio: ${s2} (esperado: unchanged) ${s2 === 'unchanged' ? '✓' : '✗'}`);

  // Resultado modificado
  const r1mod = { ...r1, description: 'Contenido MODIFICADO de prueba para el sistema' };
  const { status: s3 } = detectChange(testDomain, r1mod);
  console.log(`  [3] Resultado modificado → cambio: ${s3} (esperado: modified) ${s3 === 'modified' ? '✓' : '✗'}`);

  // Resultado duplicado (mismo contenido, URL diferente)
  markProcessed(testDomain, r1.url, h1);
  const r2 = { ...r1, url: 'https://example.gub.uy/doc1-copia' };
  const { status: s4 } = detectChange(testDomain, r2);
  console.log(`  [4] URL distinta, mismo contenido → cambio: ${s4} (esperado: duplicate) ${s4 === 'duplicate' ? '✓' : '✗'}`);

  // Crear candidato
  const evalMock = { relevance: 85, confidence: 90, novelty: 80, validity: 95, impact: 70, overall_score: 85, recommendation: 'review', reason: 'Test', key_topics: ['prueba'], dry_run: true, evaluated_at: new Date().toISOString(), model: 'test' };
  const r1fresh = { ...r1, url: 'https://example.gub.uy/doc-fresh', _changeHash: 'testhash123' };
  const c = addCandidate(r1fresh, evalMock, 'new');
  console.log(`  [5] Candidato creado: id=${c.id} status=${c.status} ${c.status === 'pending' ? '✓' : '✗'}`);

  // Aprobar
  const approved = approveCandidate(c.id, 'Aprobado en test');
  console.log(`  [6] Candidato aprobado: status=${approved.status} ${approved.status === 'approved' ? '✓' : '✗'}`);

  // Rechazar
  const c2 = addCandidate({ ...r1fresh, url: 'https://example.gub.uy/doc-reject', _changeHash: 'hash456' }, evalMock, 'new');
  const rejected = rejectCandidate(c2.id, 'Rechazado en test');
  console.log(`  [7] Candidato rechazado: status=${rejected.status} ${rejected.status === 'rejected' ? '✓' : '✗'}`);

  // Candidatos pendientes
  const pending = getPending(testDomain);
  console.log(`  [8] Candidatos pendientes de _test-domain: ${pending.length} (esperado: 0) ${pending.length === 0 ? '✓' : '✗'}`);

  logger.info('[test] Prueba finalizada');
  console.log('\n  Limpiando datos de prueba...');
  const { resetDomainHashes } = await import('../src/knowledge-updater/change-detector.js');
  resetDomainHashes(testDomain);
}

main().catch(err => {
  logger.error(`Error fatal: ${err.message}`);
  console.error(err);
  process.exit(1);
});
