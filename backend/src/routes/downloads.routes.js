import { Router }   from 'express';
import { readdirSync, statSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
// backend/src/routes/ → backend/downloads/  (2 niveles arriba)
const DOWNLOADS_DIR = join(__dir, '../../downloads');

const router = Router();

/**
 * GET /api/v1/downloads
 * Lista los instaladores disponibles detectando por patrón de nombre:
 *  - *Setup*.exe / *installer*.exe → instalable
 *  - *portable*.exe                → portable
 * Devuelve también el tamaño en MB para mostrarlo en el modal.
 */
router.get('/', (_req, res) => {
  try {
    if (!existsSync(DOWNLOADS_DIR)) {
      return res.json({ ok: true, installer: null, portable: null });
    }

    const files = readdirSync(DOWNLOADS_DIR).filter(f => f.toLowerCase().endsWith('.exe'));

    const find = (predicate) => {
      const name = files.find(predicate);
      if (!name) return null;
      const stat = statSync(join(DOWNLOADS_DIR, name));
      return {
        filename: name,
        url:      `/downloads/${encodeURIComponent(name)}`,
        sizeMB:   (stat.size / (1024 * 1024)).toFixed(1),
      };
    };

    const portable  = find(f => /portable/i.test(f));
    const installer = find(f => !/portable/i.test(f)); // el resto se asume instalador

    return res.json({ ok: true, installer, portable });
  } catch {
    return res.json({ ok: true, installer: null, portable: null });
  }
});

export default router;
