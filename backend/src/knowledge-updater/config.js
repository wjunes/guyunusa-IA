/**
 * config.js — Cargador de configuración de dominios BNC-UY
 *
 * Lee knowledge/config/dominios/<domain>.json y expone funciones
 * para consultar qué dominios están activos, sus fuentes y parámetros.
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir     = dirname(fileURLToPath(import.meta.url));
const CONF_DIR  = join(__dir, '../../../knowledge/config/dominios');

let _configs = null;

function loadAll() {
  if (_configs) return _configs;
  if (!existsSync(CONF_DIR)) return (_configs = {});

  _configs = {};
  for (const file of readdirSync(CONF_DIR).filter(f => f.endsWith('.json'))) {
    try {
      const raw  = readFileSync(join(CONF_DIR, file), 'utf-8');
      const conf = JSON.parse(raw);
      if (conf.domain) _configs[conf.domain] = conf;
    } catch (err) {
      console.warn(`[config] No se pudo leer ${file}: ${err.message}`);
    }
  }
  return _configs;
}

/** Fuerza recarga (útil en tests). */
export function reloadConfigs() { _configs = null; }

/** Lista todos los dominios configurados. */
export function getAllDomains() {
  return Object.values(loadAll());
}

/** Lista dominios habilitados. */
export function getEnabledDomains() {
  return getAllDomains().filter(d => d.enabled !== false);
}

/** Obtiene config de un dominio por nombre. */
export function getDomainConfig(domain) {
  return loadAll()[domain] || null;
}

/** Retorna las fuentes habilitadas de un dominio. */
export function getEnabledSources(domain) {
  const conf = getDomainConfig(domain);
  if (!conf) return [];
  return (conf.sources || []).filter(s => s.enabled !== false);
}

/** Thresholds de decisión del dominio (con defaults globales). */
export function getThresholds(domain) {
  const conf = getDomainConfig(domain) || {};
  return {
    auto_approve: conf.auto_approve_threshold ?? null,
    review:       conf.review_threshold ?? 75,
    discard:      conf.discard_threshold ?? 50,
  };
}
