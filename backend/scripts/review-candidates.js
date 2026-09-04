#!/usr/bin/env node
/**
 * review-candidates.js — CLI de revisión humana de candidatos
 *
 * Uso:
 *   node scripts/review-candidates.js list [dominio] [--status=pending]
 *   node scripts/review-candidates.js show <id>
 *   node scripts/review-candidates.js approve <id> [--notes="..."]
 *   node scripts/review-candidates.js reject <id> [--reason="..."]
 *   node scripts/review-candidates.js requeue <id>
 *   node scripts/review-candidates.js incorporate <id>   ← ESCRIBE en knowledge/
 */
import 'dotenv/config';
import { assertLocalEnv } from '../src/knowledge-updater/env-guard.js';
import {
  getAll, getPending, getApproved, getRejected, getFailed,
  getCandidateById, approveCandidate, rejectCandidate, requeueCandidate, getStats,
} from '../src/knowledge-updater/candidate-manager.js';
import { incorporateCandidate } from '../src/knowledge-updater/updater.js';
import { IS_DRY_RUN }           from '../src/knowledge-updater/env-guard.js';
import { logger }                from '../src/utils/logger.js';

assertLocalEnv();

const args = process.argv.slice(2);
const command = args[0];

// Parsear flags --key=value
function parseFlags(args) {
  const flags = {};
  for (const a of args) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) flags[m[1]] = m[2];
    else if (a.startsWith('--')) flags[a.slice(2)] = true;
  }
  return flags;
}

const flags = parseFlags(args.slice(1));

async function main() {
  switch (command) {

    case 'list': {
      const domain  = args[1] && !args[1].startsWith('--') ? args[1] : undefined;
      const status  = flags.status;
      const limit   = parseInt(flags.limit || '50', 10);
      const items   = getAll({ domain, status, limit });

      if (items.length === 0) {
        console.log('No hay candidatos' + (status ? ` con status="${status}"` : '') + (domain ? ` en dominio "${domain}"` : '') + '.');
        break;
      }

      console.log(`\n${'─'.repeat(80)}`);
      console.log(`Candidatos${status ? ` [${status}]` : ''}${domain ? ` — ${domain}` : ''} (${items.length})`);
      console.log('─'.repeat(80));
      for (const c of items) {
        const score = c.evaluation?.overall_score ?? '?';
        const rec   = c.evaluation?.recommendation ?? '?';
        console.log(`  [${c.id}] ${c.status.padEnd(11)} score=${String(score).padStart(3)} ${rec.padEnd(16)} ${c.domain.padEnd(35)} ${c.title.slice(0, 45)}`);
      }
      console.log('─'.repeat(80));
      break;
    }

    case 'show': {
      const id = args[1];
      if (!id) { console.error('Uso: show <id>'); process.exit(1); }
      const c = getCandidateById(id);
      if (!c) { console.error(`Candidato "${id}" no encontrado`); process.exit(1); }
      printCandidateDetail(c);
      break;
    }

    case 'approve': {
      const id    = args[1];
      const notes = flags.notes || '';
      if (!id) { console.error('Uso: approve <id> [--notes="..."]'); process.exit(1); }
      const c = approveCandidate(id, notes);
      console.log(`\n✓ Aprobado: [${c.id}] "${c.title}"\n  Para incorporar a BNC-UY: node scripts/review-candidates.js incorporate ${c.id}`);
      break;
    }

    case 'reject': {
      const id     = args[1];
      const reason = flags.reason || '';
      if (!id) { console.error('Uso: reject <id> [--reason="..."]'); process.exit(1); }
      const c = rejectCandidate(id, reason);
      console.log(`\n✗ Rechazado: [${c.id}] "${c.title}"`);
      break;
    }

    case 'requeue': {
      const id = args[1];
      if (!id) { console.error('Uso: requeue <id>'); process.exit(1); }
      const c = requeueCandidate(id);
      console.log(`\n↺ Re-encolado: [${c.id}]`);
      break;
    }

    case 'incorporate': {
      const id = args[1];
      if (!id) { console.error('Uso: incorporate <id>'); process.exit(1); }
      const c = getCandidateById(id);
      if (!c) { console.error(`Candidato "${id}" no encontrado`); process.exit(1); }
      if (c.status !== 'approved') {
        console.error(`El candidato ${id} tiene status="${c.status}". Solo se pueden incorporar candidatos aprobados.`);
        process.exit(1);
      }

      if (IS_DRY_RUN) {
        console.log(`\n[DRY_RUN] Simulando incorporación de [${id}]:`);
        const result = await incorporateCandidate(c, { dryRun: true });
        console.log(`  Simulado: ${JSON.stringify(result, null, 2)}`);
      } else {
        console.log(`\nIncorporando [${id}] "${c.title}" a knowledge/standalone/${c.domain}/`);
        const result = await incorporateCandidate(c, { dryRun: false });
        console.log(`\n✓ Incorporado: ${result.filename}`);
        console.log(`  Ruta: ${result.filePath}`);
      }
      break;
    }

    case 'stats': {
      const domain = args[1];
      if (domain) {
        const stats = getStats(domain);
        console.log(`\nEstadísticas — ${domain}:`);
        console.table(stats);
      } else {
        const all = getAll({ limit: 5000 });
        const byDomain = {};
        for (const c of all) {
          if (!byDomain[c.domain]) byDomain[c.domain] = { pending: 0, approved: 0, rejected: 0, processed: 0, failed: 0 };
          byDomain[c.domain][c.status] = (byDomain[c.domain][c.status] || 0) + 1;
        }
        console.log('\nEstadísticas globales:');
        console.table(byDomain);
        console.log(`Total: ${all.length} candidatos`);
      }
      break;
    }

    default:
      console.log(`
BNC-UY — Revisión de Candidatos
================================

Comandos:
  list [dominio] [--status=pending|approved|rejected|failed] [--limit=50]
                        Listar candidatos
  show <id>             Ver detalle de un candidato
  approve <id> [--notes="..."]   Aprobar candidato
  reject <id> [--reason="..."]   Rechazar candidato
  requeue <id>          Re-encolar candidato rechazado/fallido
  incorporate <id>      Incorporar candidato aprobado a BNC-UY
                        (requiere KNOWLEDGE_DRY_RUN=false para escribir)
  stats [dominio]       Estadísticas de candidatos

Ejemplos:
  node scripts/review-candidates.js list agro-uy --status=pending
  node scripts/review-candidates.js show <id>
  node scripts/review-candidates.js approve <id> --notes="Fuente oficial verificada"
  node scripts/review-candidates.js incorporate <id>
`);
  }
}

function printCandidateDetail(c) {
  const eval_ = c.evaluation || {};
  console.log(`
${'═'.repeat(80)}
CANDIDATO: ${c.id}
${'═'.repeat(80)}
Estado:    ${c.status}
Dominio:   ${c.domain}
Fuente:    ${c.source}
URL:       ${c.url}
Título:    ${c.title}
Detectado: ${c.detected_at}
Publicado: ${c.published_at || 'desconocido'}

EVALUACIÓN IA:
  Score global:    ${eval_.overall_score ?? '?'}/100
  Relevancia:      ${eval_.relevance     ?? '?'}/100
  Confiabilidad:   ${eval_.confidence    ?? '?'}/100
  Novedad:         ${eval_.novelty       ?? '?'}/100
  Vigencia:        ${eval_.validity      ?? '?'}/100
  Impacto:         ${eval_.impact        ?? '?'}/100
  Recomendación:   ${eval_.recommendation ?? '?'}
  Motivo:          ${eval_.reason || '-'}
  Modelo:          ${eval_.model || '-'}
  DRY_RUN:         ${eval_.dry_run ? 'sí' : 'no'}

CONTENIDO:
${(c.content || '').slice(0, 800)}${c.content?.length > 800 ? '\n[...truncado]' : ''}

HISTORIAL:
  Procesado:       ${c.processed_at || 'pendiente'}
  Notas:           ${c.processing_notes || '-'}
  Error:           ${c.error || 'ninguno'}
${'═'.repeat(80)}`);
}

main().catch(err => {
  logger.error(`Error: ${err.message}`);
  process.exit(1);
});
