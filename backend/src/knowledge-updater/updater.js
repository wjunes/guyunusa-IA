/**
 * updater.js — Knowledge Updater
 *
 * Escribe el archivo .md aprobado en knowledge/standalone/<dominio>/
 * y reconstruye el índice RAG en memoria.
 *
 * NUNCA se ejecuta si DRY_RUN=true.
 * Mantiene trazabilidad completa y no elimina versiones anteriores.
 */
import { writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath }  from 'url';
import { logger }         from '../utils/logger.js';
import { assertNotDryRunForWrites } from './env-guard.js';
import { markDone, markFailed }     from './candidate-manager.js';

const __dir        = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dir, '../../../knowledge/standalone');

/* ─── Punto de entrada ───────────────────────────────────────── */

/**
 * Incorpora un candidato aprobado a la base de conocimiento.
 *
 * @param {object} candidate — del candidate-manager
 * @param {{ dryRun: boolean }} opts
 */
export async function incorporateCandidate(candidate, { dryRun = true } = {}) {
  if (dryRun) {
    logger.info(`[updater] DRY_RUN — incorporación simulada de [${candidate.id}] "${candidate.title}"`);
    return { simulated: true, candidate };
  }

  assertNotDryRunForWrites();

  try {
    markDone(candidate.id, 'Comenzando incorporación');

    // 1. Validar dominio
    const domainDir = join(KNOWLEDGE_DIR, candidate.domain);
    if (!existsSync(domainDir)) {
      mkdirSync(domainDir, { recursive: true });
      logger.info(`[updater] Directorio creado: ${domainDir}`);
    }

    // 2. Determinar nombre de archivo
    const filename  = buildFilename(candidate, domainDir);
    const filePath  = join(domainDir, filename);

    // 3. Normalizar contenido a formato BNC-UY
    const content = buildMarkdownContent(candidate);

    // 4. Escribir archivo
    writeFileSync(filePath, content, 'utf-8');
    logger.info(`[updater] Escrito: ${filePath}`);

    // 5. Reconstruir índice RAG
    await rebuildIndex();

    // 6. Registrar operación
    markDone(candidate.id, `Archivo: ${filename}`);

    logger.info(`[updater] Incorporado [${candidate.id}] → ${filename}`);
    return { filename, filePath, candidate };

  } catch (err) {
    markFailed(candidate.id, err.message);
    logger.error(`[updater] Error incorporando [${candidate.id}]: ${err.message}`);
    throw err;
  }
}

/* ─── Construcción del nombre de archivo ────────────────────── */
function buildFilename(candidate, domainDir) {
  // Determinar siguiente número de archivo en el directorio
  let maxNum = 0;
  try {
    for (const f of readdirSync(domainDir)) {
      const m = f.match(/^(\d+)-/);
      if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
    }
  } catch { /* directorio vacío */ }

  const nextNum = String(maxNum + 1).padStart(2, '0');
  const slug    = slugify(candidate.title || candidate.url);
  return `${nextNum}-${slug}.md`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/^-|-$/g, '');
}

/* ─── Construcción del contenido Markdown ───────────────────── */
function buildMarkdownContent(candidate) {
  const now  = new Date().toISOString();
  const eval_ = candidate.evaluation || {};
  const meta = [
    `# ${candidate.title}`,
    '',
    `> **Fuente:** ${candidate.source}`,
    `> **URL:** ${candidate.url}`,
    `> **Dominio:** ${candidate.domain}`,
    `> **Incorporado:** ${now}`,
    candidate.published_at ? `> **Publicado:** ${candidate.published_at}` : null,
    `> **Confiabilidad:** ${eval_.confidence || '-'}/100`,
    `> **Relevancia:** ${eval_.relevance || '-'}/100`,
    '',
    '---',
    '',
  ].filter(l => l !== null).join('\n');

  const body = candidate.content || candidate.summary || '';

  const footer = [
    '',
    '---',
    '',
    '## Metadatos de origen',
    '',
    `- Candidato ID: \`${candidate.id}\``,
    `- Detectado: ${candidate.detected_at}`,
    `- Aprobado: ${candidate.processed_at || now}`,
    `- Evaluación IA: score ${eval_.overall_score || '-'} — ${eval_.recommendation || '-'}`,
    eval_.reason ? `- Motivo: ${eval_.reason}` : null,
  ].filter(l => l !== null).join('\n');

  return `${meta}${body}${footer}\n`;
}

/* ─── Reconstruir índice RAG ─────────────────────────────────── */
async function rebuildIndex() {
  try {
    const { buildKnowledgeIndex } = await import('../services/knowledge.service.js');
    const count = buildKnowledgeIndex();
    logger.info(`[updater] Índice RAG reconstruido: ${count} documentos`);
  } catch (err) {
    logger.warn(`[updater] No se pudo reconstruir el índice RAG: ${err.message}`);
  }
}

/**
 * Fuerza reconstrucción del índice sin escribir nada.
 * Útil después de operaciones manuales en knowledge/.
 */
export async function forceRebuildIndex() {
  await rebuildIndex();
}
