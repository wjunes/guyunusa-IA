/**
 * knowledge.service.js — Sistema RAG ligero de Guyunusa
 *
 * Sin embeddings ni base vectorial (no viables en cPanel compartido).
 * En su lugar:
 *   1. Al iniciar, escanea knowledge/ y construye un índice en memoria
 *      parseando el frontmatter YAML de cada .md (id, titulo, keywords, tags…)
 *   2. En cada consulta, puntúa los documentos por coincidencia de términos
 *      y devuelve los N más relevantes con su contenido.
 *
 * El contenido de los docs seleccionados se inyecta en el system prompt,
 * igual que se hace con archivos adjuntos.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __dir = dirname(fileURLToPath(import.meta.url));
// backend/src/services/ → raíz del proyecto → knowledge/
const KNOWLEDGE_DIR = join(__dir, '../../../knowledge');

// Carpetas de contenido (se excluyen docs, templates, assets, config, etc.)
const EXCLUDED_DIRS = new Set([
  'docs', 'templates', 'assets', 'config', 'indexes', 'sources', 'legislacion',
]);

// Índice en memoria — se llena en buildIndex()
let _index = [];      // [{ id, titulo, categoria, keywords[], tags[], path, contentLower }]
let _ready = false;

/* ─── Parser mínimo de frontmatter YAML ─────────────────────────────
   El frontmatter es consistente y simple, no necesitamos js-yaml.
   Extrae: titulo, categoria, keywords[], tags[].
   ────────────────────────────────────────────────────────────────── */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { meta: {}, body: raw };

  const fmText = match[1];
  const body   = raw.slice(match[0].length).trim();

  const meta = {
    titulo: '', categoria: '', keywords: [], tags: [],
    // Campos alternativos de nombre según el tipo de documento
    nombre_conocido: '', nombre_completo: '', nombre: '', rol: '',
  };
  let currentList = null;

  for (const line of fmText.split('\n')) {
    // Item de lista: "  - valor"
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && currentList) {
      meta[currentList].push(listItem[1].trim().toLowerCase());
      continue;
    }

    // Campo: "clave: valor"
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (field) {
      const key = field[1];
      const val = field[2].trim();

      if (key === 'keywords' || key === 'tags') {
        currentList = key;
        meta[key] = [];
        if (val) meta[key].push(val.toLowerCase());
      } else if (['titulo','categoria','nombre_conocido','nombre_completo','nombre','rol'].includes(key)) {
        currentList = null;
        meta[key] = val;
      } else {
        currentList = null;
      }
    }
  }

  // Resolver el título efectivo: titulo > nombre_conocido > nombre_completo > nombre
  meta.titulo = meta.titulo || meta.nombre_conocido || meta.nombre_completo || meta.nombre || '';

  return { meta, body };
}

/* ─── Escaneo recursivo de la carpeta knowledge ─── */
function scanDir(dir, acc = []) {
  let entries;
  try { entries = readdirSync(dir); }
  catch { return acc; }

  for (const entry of entries) {
    const full = join(dir, entry);
    let stat;
    try { stat = statSync(full); } catch { continue; }

    if (stat.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry)) continue;
      scanDir(full, acc);
    } else if (extname(entry) === '.md') {
      acc.push(full);
    }
  }
  return acc;
}

/* ─── Extraer keywords del cuerpo del documento ─────────────────────
   1. Sección "Palabras clave" al final del documento → se tokeniza
   2. Nombres en negrita **Nombre** → se agregan como keywords
   ────────────────────────────────────────────────────────────────── */
function extractBodyKeywords(body) {
  const extra = [];

  // 1. Extraer sección "Palabras clave" (suele estar al final del doc)
  const kwMatch = body.match(/##?\s*Palabras\s+clave[s]?\s*\n([\s\S]+?)(?:\n##|\n---|$)/i);
  if (kwMatch) {
    // Tokenizar la sección: separar por comas, espacios múltiples, saltos de línea
    const tokens = kwMatch[1]
      .replace(/[,;\n]+/g, ' ')
      .split(/\s{2,}/)
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 2);
    extra.push(...tokens);
  }

  // 2. Extraer nombres en negrita **Nombre Compuesto**
  const boldMatches = body.matchAll(/\*\*([^*]{2,60})\*\*/g);
  for (const m of boldMatches) {
    const val = m[1].trim().toLowerCase();
    if (val.length > 2 && !/^(nota|importante|advertencia|ejemplo|ver|total|tipo)$/i.test(val)) {
      extra.push(val);
    }
  }

  return extra;
}

/* ─── Construir el índice en memoria ─── */
export function buildKnowledgeIndex() {
  const start = Date.now();
  _index = [];

  const files = scanDir(KNOWLEDGE_DIR);

  for (const path of files) {
    try {
      const raw = readFileSync(path, 'utf-8');
      const { meta, body } = parseFrontmatter(raw);

      // Ignorar archivos sin título ni keywords (docs internos)
      if (!meta.titulo && (!meta.keywords || meta.keywords.length === 0)) continue;

      // Incluir todos los nombres alternativos en el texto de búsqueda
      const nombres = [
        meta.titulo, meta.nombre_conocido, meta.nombre_completo, meta.nombre,
      ].filter(Boolean).join(' ');

      // Extraer keywords adicionales del cuerpo (Palabras clave + **bold**)
      const bodyKeywords = extractBodyKeywords(body);
      const allKeywords = [...(meta.keywords || []), ...bodyKeywords];

      _index.push({
        titulo:       meta.titulo || '',
        categoria:    meta.categoria || '',
        keywords:     allKeywords,
        tags:         meta.tags || [],
        path,
        body,
        // Texto en minúsculas para matching rápido — incluye nombres, keywords, tags Y body
        searchText: (
          nombres + ' ' +
          allKeywords.join(' ') + ' ' +
          (meta.tags || []).join(' ') + ' ' +
          body
        ).toLowerCase(),
      });
    } catch (err) {
      logger.warn(`knowledge: no se pudo leer ${path}: ${err.message}`);
    }
  }

  _ready = true;
  logger.info(`✓ Knowledge index: ${_index.length} documentos en ${Date.now() - start}ms`);
  return _index.length;
}

/* ─── Normalizar texto para matching ─── */
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar acentos
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Palabras muy comunes que no aportan a la búsqueda
const STOPWORDS = new Set([
  'el','la','los','las','un','una','unos','unas','de','del','al','a','en','y','o',
  'que','como','para','por','con','sin','sobre','es','son','fue','ser','este','esta',
  'esto','ese','esa','me','te','se','le','lo','mi','tu','su','qué','cómo','cuál','quién',
  'donde','cuando','porque','pero','más','muy','ya','hay','tiene','decime','contame',
  'sabes','sabés','podés','puedes','quiero','necesito','dame','hablame','háblame',
]);

/* ─── Buscar documentos relevantes para una consulta ─────────────────
   Puntúa cada documento por coincidencias de términos en su searchText.
   @param {string} query — texto del usuario
   @param {number} limit — máximo de documentos a devolver
   @returns {Array} [{ titulo, categoria, body, score }]
   ────────────────────────────────────────────────────────────────── */
export function searchKnowledge(query, limit = 3) {
  if (!_ready || _index.length === 0) return [];

  const qNorm  = normalize(query);
  const qWords = qNorm.split(' ').filter(w => w.length >= 3 && !STOPWORDS.has(w));
  if (qWords.length === 0) return [];

  const scored = [];

  for (const doc of _index) {
    const docText     = ' ' + normalize(doc.searchText) + ' ';
    const tituloText  = ' ' + normalize(doc.titulo) + ' ';
    let score = 0;

    for (const word of qWords) {
      // Coincidencia de palabra COMPLETA (con espacios alrededor)
      // Evita que "mate" matchee "materno" o "sur" matchee "suramérica"
      if (docText.includes(' ' + word + ' ')) {
        score += 5;   // ← subido de 3 a 5 para dar más peso al body
        if (tituloText.includes(' ' + word + ' ')) score += 3;
      }
    }

    // Bonus por frase completa de keyword que aparece en la query
    for (const kw of doc.keywords) {
      const kwNorm = normalize(kw);
      if (kwNorm.length > 2 && qNorm.includes(kwNorm)) {
        score += kwNorm.length > 5 ? 5 : 3;
      }
    }

    // Bonus por frase completa de la query encontrada en el documento
    if (qNorm.length > 5 && docText.includes(' ' + qNorm + ' ')) {
      score += 8;
    }
    // Bonus parcial: query multi-palabra como subcadena en el documento
    if (qWords.length >= 2) {
      const phrase = qWords.join(' ');
      if (phrase.length > 5 && docText.includes(phrase)) {
        score += 6;
      }
    }

    if (score > 0) scored.push({ doc, score });
  }

  // Ordenar por score descendente y tomar los mejores
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ doc, score }) => ({
    titulo:    doc.titulo,
    categoria: doc.categoria,
    body:      doc.body,
    score,
  }));
}

/* ─── Construir el bloque de contexto para inyectar en el prompt ─────
   Toma los documentos relevantes y arma un texto formateado,
   respetando un límite de caracteres para no inflar el prompt.
   ────────────────────────────────────────────────────────────────── */
export function buildKnowledgeContext(query, { maxDocs = 3, maxChars = 6000 } = {}) {
  const docs = searchKnowledge(query, maxDocs);
  if (docs.length === 0) return null;

  let context = '';
  const usados = [];

  for (const doc of docs) {
    // Limitar cada doc para que no domine el contexto
    const docText = doc.body.length > 2500
      ? doc.body.slice(0, 2500) + '…'
      : doc.body;

    const bloque = `\n\n### ${doc.titulo} (${doc.categoria})\n${docText}`;

    if (context.length + bloque.length > maxChars) break;
    context += bloque;
    usados.push(doc.titulo);
  }

  if (!context) return null;

  return {
    context: context.trim(),
    titulos: usados,
  };
}

export function isKnowledgeReady() {
  return _ready;
}

export function getKnowledgeStats() {
  return {
    ready: _ready,
    documents: _index.length,
  };
}
