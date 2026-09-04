/**
 * store.js — Almacenamiento local basado en archivos JSON
 *
 * Gestiona candidatos, runs y hashes en backend/data/knowledge-updater/
 * Sin dependencias externas. Completamente aislado de MySQL.
 *
 * Estructura:
 *   data/knowledge-updater/
 *   ├── candidates/<id>.json
 *   ├── runs/<timestamp>.json
 *   └── hashes/<domain>.json    ← { url: { contentHash, detectedAt } }
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.KNOWLEDGE_DATA_DIR
  || join(__dir, '../../data/knowledge-updater');

const DIRS = {
  candidates: join(DATA_DIR, 'candidates'),
  runs:       join(DATA_DIR, 'runs'),
  hashes:     join(DATA_DIR, 'hashes'),
};

// Crea los directorios si no existen
export function ensureStoreDirs() {
  for (const dir of Object.values(DIRS)) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }
}
ensureStoreDirs();

/* ─── Utilidades ─────────────────────────────────────────────── */

function readJSON(path) {
  if (!existsSync(path)) return null;
  try { return JSON.parse(readFileSync(path, 'utf-8')); }
  catch { return null; }
}

function writeJSON(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

function generateId() {
  const ts   = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${ts}-${rand}`;
}

/* ─── CANDIDATOS ──────────────────────────────────────────────── */

export const CANDIDATE_STATUS = {
  PENDING:    'pending',
  APPROVED:   'approved',
  REJECTED:   'rejected',
  PROCESSING: 'processing',
  PROCESSED:  'processed',
  FAILED:     'failed',
};

export function createCandidate(data) {
  const id = generateId();
  const candidate = {
    id,
    domain:         data.domain,
    source:         data.source,
    url:            data.url,
    title:          data.title || '',
    content:        data.content || '',
    summary:        data.summary || '',
    published_at:   data.published_at || null,
    detected_at:    new Date().toISOString(),
    content_hash:   data.content_hash || null,
    evaluation:     data.evaluation || null,
    status:         CANDIDATE_STATUS.PENDING,
    processed_at:   null,
    processing_notes: null,
    error:          null,
    version:        1,
  };
  writeJSON(join(DIRS.candidates, `${id}.json`), candidate);
  return candidate;
}

export function getCandidate(id) {
  return readJSON(join(DIRS.candidates, `${id}.json`));
}

export function updateCandidate(id, patch) {
  const path = join(DIRS.candidates, `${id}.json`);
  const current = readJSON(path);
  if (!current) throw new Error(`Candidato no encontrado: ${id}`);
  const updated = { ...current, ...patch };
  writeJSON(path, updated);
  return updated;
}

export function deleteCandidate(id) {
  const path = join(DIRS.candidates, `${id}.json`);
  if (existsSync(path)) unlinkSync(path);
}

export function listCandidates({ status, domain, limit = 100 } = {}) {
  let files;
  try { files = readdirSync(DIRS.candidates).filter(f => f.endsWith('.json')); }
  catch { return []; }

  const results = [];
  for (const file of files) {
    if (results.length >= limit) break;
    const c = readJSON(join(DIRS.candidates, file));
    if (!c) continue;
    if (status && c.status !== status) continue;
    if (domain && c.domain !== domain) continue;
    results.push(c);
  }
  return results.sort((a, b) => b.detected_at.localeCompare(a.detected_at));
}

export function countCandidates({ status, domain } = {}) {
  return listCandidates({ status, domain, limit: 10000 }).length;
}

/* ─── HASHES (deduplicación) ─────────────────────────────────── */

function hashesPath(domain) {
  return join(DIRS.hashes, `${domain}.json`);
}

export function loadHashes(domain) {
  return readJSON(hashesPath(domain)) || {};
}

export function saveHashes(domain, hashes) {
  writeJSON(hashesPath(domain), hashes);
}

export function contentHash(text) {
  return createHash('sha256').update(text || '').digest('hex').slice(0, 16);
}

/* ─── RUNS ────────────────────────────────────────────────────── */

export function saveRun(report) {
  const ts   = new Date().toISOString().replace(/[:.]/g, '-');
  const path = join(DIRS.runs, `run-${ts}.json`);
  writeJSON(path, report);
  return path;
}

export function listRuns({ limit = 20 } = {}) {
  let files;
  try { files = readdirSync(DIRS.runs).filter(f => f.endsWith('.json')); }
  catch { return []; }

  return files
    .sort((a, b) => b.localeCompare(a))
    .slice(0, limit)
    .map(f => readJSON(join(DIRS.runs, f)))
    .filter(Boolean);
}

export function getDataDir() { return DATA_DIR; }
