/**
 * change-detector.js — Detección de cambios por hash
 *
 * Determina si un resultado es nuevo, modificado, duplicado o sin cambios,
 * comparando contra el historial almacenado en hashes/<domain>.json
 *
 * Resultados posibles:
 *   NEW       — URL nunca vista
 *   MODIFIED  — URL conocida con contenido diferente
 *   UNCHANGED — URL conocida con mismo contenido
 *   DUPLICATE — Contenido idéntico a otro URL ya procesado (mismo hash)
 */
import { loadHashes, saveHashes, contentHash } from './store.js';

export const CHANGE_STATUS = {
  NEW:       'new',
  MODIFIED:  'modified',
  UNCHANGED: 'unchanged',
  DUPLICATE: 'duplicate',
};

/**
 * Detecta el estado de un resultado web respecto al historial del dominio.
 *
 * @param {string} domain
 * @param {{ url: string, title: string, description: string }} result
 * @returns {{ status: string, hash: string }}
 */
export function detectChange(domain, result) {
  const hashes  = loadHashes(domain);
  const text    = `${result.title}||${result.description}`;
  const hash    = contentHash(text);
  const normUrl = normalizeUrl(result.url);

  // ¿Mismo contenido visto antes en OTRO url? → duplicado
  const hashValues = Object.values(hashes);
  if (hashValues.some(h => h.contentHash === hash && h.url !== normUrl)) {
    return { status: CHANGE_STATUS.DUPLICATE, hash };
  }

  const existing = hashes[normUrl];
  if (!existing) {
    return { status: CHANGE_STATUS.NEW, hash };
  }
  if (existing.contentHash !== hash) {
    return { status: CHANGE_STATUS.MODIFIED, hash };
  }
  return { status: CHANGE_STATUS.UNCHANGED, hash };
}

/**
 * Registra que un URL fue procesado con un hash determinado.
 * Llamar solo cuando el resultado se incorpora como candidato.
 */
export function markProcessed(domain, url, hash) {
  const hashes = loadHashes(domain);
  hashes[normalizeUrl(url)] = {
    url,
    contentHash: hash,
    processedAt: new Date().toISOString(),
  };
  saveHashes(domain, hashes);
}

/**
 * Borra el historial de un dominio (útil para forzar re-exploración).
 */
export function resetDomainHashes(domain) {
  saveHashes(domain, {});
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    // Ignorar fragment y ciertos query params de tracking
    ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid'].forEach(p => u.searchParams.delete(p));
    return u.origin + u.pathname + (u.search || '');
  } catch {
    return url;
  }
}
