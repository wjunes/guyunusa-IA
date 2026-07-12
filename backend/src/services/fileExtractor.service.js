/**
 * fileExtractor.service.js
 * Extrae texto de archivos subidos por el usuario para pasarlo a la IA.
 *
 * Sin dependencias extra: texto, código, JSON, CSV, YAML, XML, HTML, CSS, SQL...
 * Con dependencias opcionales (instalar en /backend):
 *   PDF  →  npm install pdf-parse@1.1.1
 *   DOCX →  npm install mammoth
 */
import { readFile }      from 'fs/promises';
import path              from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const MAX_CHARS = 30_000;

const TEXT_EXTENSIONS = new Set([
  '.txt', '.md', '.markdown', '.rst', '.log',
  '.html', '.htm', '.css', '.scss', '.sass', '.less',
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx',
  '.py', '.rb', '.php', '.java', '.c', '.cpp', '.cc', '.h', '.hpp',
  '.cs', '.go', '.rs', '.swift', '.kt', '.scala', '.dart', '.lua',
  '.r', '.m', '.ex', '.exs', '.clj',
  '.json', '.jsonc', '.yaml', '.yml', '.toml', '.xml', '.csv', '.tsv',
  '.sql', '.graphql', '.gql',
  '.sh', '.bash', '.zsh', '.fish', '.ps1', '.bat', '.cmd',
  '.env', '.gitignore', '.dockerignore', '.editorconfig', '.htaccess',
  '.vue', '.svelte', '.astro', '.njk', '.liquid', '.pug', '.hbs',
]);

export async function extractText(file) {
  const ext  = path.extname(file.originalname || '').toLowerCase();
  const mime = (file.mimetype || '').toLowerCase();
  let content, method = 'text';

  if (mime === 'application/pdf' || ext === '.pdf') {
    content = await extractPDF(file.path);
    method = 'pdf';
  } else if (
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    ext === '.docx'
  ) {
    content = await extractDOCX(file.path);
    method = 'docx';
  } else if (
    TEXT_EXTENSIONS.has(ext) ||
    mime.startsWith('text/') ||
    ['application/json', 'application/javascript', 'application/typescript',
     'application/xml', 'application/x-sh'].includes(mime)
  ) {
    content = await readFile(file.path, 'utf-8');
  } else {
    throw new Error(
      `Tipo de archivo no soportado: "${file.originalname}". ` +
      `Podés subir código fuente, texto, JSON, CSV, YAML, XML, SQL, HTML, CSS, ` +
      `PDF (requiere: npm install pdf-parse@1.1.1) o DOCX (requiere: npm install mammoth).`
    );
  }

  const truncated    = content.length > MAX_CHARS;
  const finalContent = truncated ? content.slice(0, MAX_CHARS) : content;
  return {
    filename:  file.originalname,
    content:   finalContent,
    size:      file.size,
    lines:     finalContent.split('\n').length,
    truncated,
    method,
  };
}

/* ══════════════════════════════════════════════════════════════
   PDF
   Requiere: npm install pdf-parse@1.1.1

   La versión 1.1.1 exporta la función directamente via module.exports.
   Versiones más nuevas tienen un campo "exports" en package.json que
   bloquea el acceso a sub-rutas (/lib/pdf-parse.js) y puede devolver
   un objeto en lugar de una función al hacer require().
   ══════════════════════════════════════════════════════════════ */
async function extractPDF(filePath) {
  let raw;
  try {
    raw = require('pdf-parse');
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error(
        'Para procesar PDFs instalá la dependencia en /backend: npm install pdf-parse@1.1.1'
      );
    }
    throw new Error(`Error al cargar pdf-parse: ${err.message}`);
  }

  // pdf-parse@1.1.1 exporta la función directamente.
  // Intentar desempaquetar .default por si la versión lo envuelve.
  const pdfParse = typeof raw === 'function' ? raw : raw?.default;

  if (typeof pdfParse !== 'function') {
    throw new Error(
      'pdf-parse no devolvió una función. ' +
      'Asegurate de usar la versión correcta: npm install pdf-parse@1.1.1'
    );
  }

  try {
    const buffer = await readFile(filePath);
    const data   = await pdfParse(buffer);
    if (!data.text?.trim()) {
      throw new Error('El PDF no contiene texto extraíble (puede ser un PDF escaneado/imagen).');
    }
    return data.text;
  } catch (err) {
    throw new Error(`No se pudo leer el PDF: ${err.message}`);
  }
}

/* ══════════════════════════════════════════════════════════════
   DOCX — Requiere: npm install mammoth
   ══════════════════════════════════════════════════════════════ */
async function extractDOCX(filePath) {
  let mammoth;
  try {
    mammoth = require('mammoth');
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error(
        'Para procesar archivos Word instalá la dependencia en /backend: npm install mammoth'
      );
    }
    throw new Error(`Error al cargar mammoth: ${err.message}`);
  }

  try {
    const result = await mammoth.extractRawText({ path: filePath });
    if (!result.value?.trim()) throw new Error('El documento Word no contiene texto.');
    return result.value;
  } catch (err) {
    throw new Error(`No se pudo leer el archivo Word: ${err.message}`);
  }
}
