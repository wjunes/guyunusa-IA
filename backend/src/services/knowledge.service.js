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

      _index.push({
        titulo:       meta.titulo || '',
        categoria:    meta.categoria || '',
        keywords:     meta.keywords || [],
        tags:         meta.tags || [],
        path,
        body,
        // Texto en minúsculas para matching rápido — incluye nombres, keywords y tags
        searchText: (
          nombres + ' ' +
          (meta.keywords || []).join(' ') + ' ' +
          (meta.tags || []).join(' ')
        ).toLowerCase(),
        // Cuerpo normalizado — se usa como red de seguridad cuando una
        // palabra de la consulta no está en las keywords pero sí en el texto
        // (ej: "pintores" no es keyword de artes_plasticas.md pero sí aparece
        // en el cuerpo). Se pre-calcula acá porque el índice se arma una sola vez.
        bodyNorm: ' ' + normalize(body) + ' ',
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
  // Verbos de consulta frecuentes
  'conoces','conocés','explicame','explicáme','decirme','contarme','saber','hablar',
  'existe','existen','cuales','cuáles','cuanto','cuánto','cuantos','cuántos',
  'mejores','mejor','principales','importantes','famosos','famosas','conocidos',

  // ── Stopwords de DOMINIO ──
  // Toda la BNC-UY habla de Uruguay: estas palabras aparecen en casi todos los
  // documentos y por lo tanto no discriminan. Si se dejan, una consulta como
  // "¿qué pintores uruguayos conocés?" puntúa alto cualquier doc que diga
  // "uruguayo" (lácteos, vinos…) y entierra al documento realmente relevante.
  // OJO: no incluir "montevideo", "nacional" ni "oriental" — esas SÍ discriminan
  // (Museo Nacional, Partido Nacional, Banda Oriental, turismo en Montevideo).
  'uruguay','uruguayo','uruguaya','uruguayos','uruguayas',
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
    let score    = 0;
    let bodyHits = 0;

    for (const word of qWords) {
      // Coincidencia de palabra COMPLETA (con espacios alrededor)
      // Evita que "mate" matchee "materno" o "sur" matchee "suramérica"
      if (docText.includes(' ' + word + ' ')) {
        score += 3;
        if (tituloText.includes(' ' + word + ' ')) score += 2;
      } else if (doc.bodyNorm && doc.bodyNorm.includes(' ' + word + ' ')) {
        // La palabra no está en keywords/tags/título pero sí en el cuerpo.
        // Cuenta como señal débil — red de seguridad para consultas que usan
        // variantes morfológicas ("pintores" vs keyword "pintura").
        bodyHits++;
      }
    }

    // El cuerpo aporta como máximo 3 puntos (equivalente a UNA keyword).
    // Así nunca gana un documento largo solo por mencionar palabras sueltas.
    score += Math.min(bodyHits, 3);

    // Bonus por frase completa de keyword que aparece en la query
    for (const kw of doc.keywords) {
      const kwNorm = normalize(kw);
      if (kwNorm.length > 5 && qNorm.includes(kwNorm)) {
        score += 5;
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

/* ─── Preguntas sobre la identidad de la propia Guyunusa ─────────────
   Cuando el usuario pregunta por su origen, su creador o su historia,
   la respuesta correcta YA está en el system prompt. Inyectar documentos
   de la BNC-UY en ese caso solo agrega ruido (Carnaval, Candombe, pueblos
   originarios…) y diluye el dato identitario, favoreciendo confabulaciones.
   ────────────────────────────────────────────────────────────────────── */
const PATRONES_IDENTIDAD = [
  /\bqui[eé]n\s+(te|la|lo)\s+(cre[oó]|hizo|program[oó]|desarroll[oó]|dise[nñ][oó]|constru[yi])/i,
  /\bqui[eé]n\s+es\s+(tu|su)\s+(creador|creadora|autor|autora|desarrollador|desarrolladora)/i,
  /\b(tu|su)\s+(creador|creadora|origen|autor|autora|desarrollador)/i,
  /\bc[oó]mo\s+(fuiste|fue|te)\s+(cre|desarroll|hic|hech|nac)/i,
  /\bhistoria\s+de\s+(c[oó]mo\s+)?(fue\s+)?(creada\s+)?guyunusa/i,
  /\bguyunusa\s+fue\s+creada/i,
  /\bqui[eé]n\s+(sos|eres|te\s+program)/i,
  /\bde\s+d[oó]nde\s+(ven[ií]s|vienes|sal[ií]s)/i,
  /\bqu[eé]\s+(empresa|agencia|estudio|compa[nñ][ií]a)\s+te\s+(cre|hizo|desarroll)/i,
  /\bqui[eé]n\s+est[aá]\s+(detr[aá]s|atr[aá]s)\s+(tuyo|de\s+(vos|ti|guyunusa))/i,
];

function esPreguntaDeIdentidad(query) {
  return PATRONES_IDENTIDAD.some(re => re.test(query));
}

/* ─── Construir el bloque de contexto para inyectar en el prompt ─────
   Toma los documentos relevantes y arma un texto formateado,
   respetando un límite de caracteres para no inflar el prompt.
   ────────────────────────────────────────────────────────────────── */
export function buildKnowledgeContext(query, { maxDocs = 3, maxChars = 6000 } = {}) {
  // Identidad propia: sin RAG. El system prompt ya tiene la respuesta correcta
  // y cualquier documento extra solo la contamina.
  if (esPreguntaDeIdentidad(query)) return null;

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
