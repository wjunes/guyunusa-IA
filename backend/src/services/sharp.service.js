/**
 * sharp.service.js
 * ──────────────────────────────────────────────────
 * Fase 3: edición programática de imágenes con Sharp.
 * Operaciones deterministas, rápidas, sin IA, sin API externa.
 *
 * Soporta: resize, rotate, crop, grayscale, blur, flip,
 *          brightness, contrast, saturate, sharpen, watermark,
 *          format conversion (jpeg/png/webp).
 * ──────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { logger } from '../utils/logger.js';

/**
 * Parsea una data URI a un Buffer + mime type.
 * @param {string} dataUri  data:image/...;base64,...
 * @returns {{ buffer: Buffer, mime: string }}
 */
function parseDataUri(dataUri) {
  const m = dataUri.match(/^data:(image\/\w+);base64,(.+)$/s);
  if (!m) throw new Error('Formato de imagen inválido (se espera data URI base64)');
  return { buffer: Buffer.from(m[2], 'base64'), mime: m[1] };
}

/**
 * Devuelve la data URI resultante.
 * @param {Buffer} buf
 * @param {string} mime
 * @returns {string}
 */
function toDataUri(buf, mime) {
  return `data:${mime};base64,${buf.toString('base64')}`;
}

// ── Patrones para detectar qué operación pide el usuario ──

const OPS_PATTERNS = {
  grayscale: /\b(grises|gris|grayscale|blanco\s*y\s*negro|b\s*&?\s*w|desatur)/i,
  blur:      /\b(blur|desenfoc|difumin|borre|borroso)/i,
  sharpen:   /\b(nitid|sharpen|enfoc[aá]|más\s*nítid)/i,
  rotate:    /\b(rot[aá]|gir[aá]|rotate|voltear?\s*(?:90|180|270)?)/i,
  flipH:     /\b(espej[ao]|mirror|flip\s*h|voltear?\s*horizontal|reflej)/i,
  flipV:     /\b(flip\s*v|voltear?\s*vertical|invertir?\s*vertical)/i,
  resize:    /\b(redimension|resize|escal[aá]|cambiar?\s*(?:el\s+)?tamaño|resiz|reduc[ií]|achic[aá]|agrand[aá]|ampli[aá]|más\s*(?:chica|grande|pequeñ)|smaller|bigger|larger|\d{1,3}\s*%)/i,
  crop:      /\b(recort[aá]|crop|trim)/i,
  brightness:/\b(brill[oa]|bright|aclar[aá]|oscurec[eé]|darken)/i,
  contrast:  /\b(contrast)/i,
  saturate:  /\b(satur|vibrancy|vivid)/i,
  sepia:     /\b(sepia)/i,
  negate:    /\b(negativ[oa]|negate|invert(?:ir)?(?:\s*colou?res)?)/i,
  watermark: /\b(marca\s*de\s*agua|watermark|stamp)/i,
  toJpeg:    /\b(a\s*jpe?g|convert.*jpe?g|formato\s*jpe?g)/i,
  toPng:     /\b(a\s*png|convert.*png|formato\s*png)/i,
  toWebp:    /\b(a\s*webp|convert.*webp|formato\s*webp)/i,
};

/**
 * Detecta si un prompt describe una operación programática.
 * @param {string} prompt
 * @returns {string[]} lista de operaciones detectadas
 */
export function detectSharpOps(prompt) {
  const ops = [];
  for (const [op, rx] of Object.entries(OPS_PATTERNS)) {
    if (rx.test(prompt)) ops.push(op);
  }
  return ops;
}

/**
 * Extrae un número de grados para rotación.
 */
function extractRotation(prompt) {
  const m = prompt.match(/(\d{1,3})\s*°?\s*(?:grados?|degrees?)?/i);
  if (m) return parseInt(m[1], 10);
  if (/180/i.test(prompt)) return 180;
  if (/270|tres\s*cuartos/i.test(prompt)) return 270;
  return 90; // default
}

/**
 * Extrae dimensiones de resize (ej: "800x600", "ancho 800", "50%").
 */
function extractResizeDims(prompt, origW, origH) {
  // Porcentaje
  const pctMatch = prompt.match(/(\d{1,3})\s*%/);
  if (pctMatch) {
    const pct = parseInt(pctMatch[1], 10) / 100;
    return { width: Math.round(origW * pct), height: Math.round(origH * pct) };
  }
  // WxH
  const dimMatch = prompt.match(/(\d{2,5})\s*[x×]\s*(\d{2,5})/i);
  if (dimMatch) {
    return { width: parseInt(dimMatch[1], 10), height: parseInt(dimMatch[2], 10) };
  }
  // Solo ancho
  const wMatch = prompt.match(/(?:ancho|width)\s*(?:de\s*|=\s*)?(\d{2,5})/i);
  if (wMatch) {
    const w = parseInt(wMatch[1], 10);
    return { width: w, height: Math.round(origH * (w / origW)) };
  }
  // Solo alto
  const hMatch = prompt.match(/(?:alto|height)\s*(?:de\s*|=\s*)?(\d{2,5})/i);
  if (hMatch) {
    const h = parseInt(hMatch[1], 10);
    return { width: Math.round(origW * (h / origH)), height: h };
  }
  // Mitad / doble
  if (/mitad|half/i.test(prompt)) return { width: Math.round(origW / 2), height: Math.round(origH / 2) };
  if (/doble|double/i.test(prompt)) return { width: origW * 2, height: origH * 2 };

  return null; // no se pudo extraer
}

/**
 * Extrae un valor de intensidad para blur (sigma).
 */
function extractBlurSigma(prompt) {
  const m = prompt.match(/(?:blur|desenfoc|borroso)\s*(?:de\s*)?(\d{1,2})/i);
  return m ? Math.min(parseInt(m[1], 10), 20) : 5;
}

/**
 * Aplica operaciones programáticas a una imagen.
 *
 * @param {string} imageBase64 — data URI
 * @param {string} prompt — instrucción del usuario
 * @param {string[]} ops — operaciones detectadas por detectSharpOps()
 * @returns {Promise<{ base64: string, contentType: string, opsApplied: string[] }>}
 */
export async function applySharpOps(imageBase64, prompt, ops) {
  const { buffer, mime } = parseDataUri(imageBase64);
  let img = sharp(buffer);
  const meta = await img.metadata();
  const origW = meta.width || 1024;
  const origH = meta.height || 1024;
  const applied = [];

  for (const op of ops) {
    switch (op) {
      case 'grayscale':
        img = img.grayscale();
        applied.push('escala de grises');
        break;

      case 'sepia':
        // Sharp no tiene sepia nativo; se simula con recombine
        img = img.recomb([
          [0.393, 0.769, 0.189],
          [0.349, 0.686, 0.168],
          [0.272, 0.534, 0.131],
        ]);
        applied.push('sepia');
        break;

      case 'blur': {
        const sigma = extractBlurSigma(prompt);
        img = img.blur(sigma);
        applied.push(`blur (σ=${sigma})`);
        break;
      }

      case 'sharpen':
        img = img.sharpen({ sigma: 1.5, m1: 1.5, m2: 0.7 });
        applied.push('nitidez');
        break;

      case 'rotate': {
        const deg = extractRotation(prompt);
        img = img.rotate(deg);
        applied.push(`rotación ${deg}°`);
        break;
      }

      case 'flipH':
        img = img.flop(); // horizontal
        applied.push('espejo horizontal');
        break;

      case 'flipV':
        img = img.flip(); // vertical
        applied.push('volteo vertical');
        break;

      case 'resize': {
        const dims = extractResizeDims(prompt, origW, origH);
        if (dims) {
          img = img.resize(dims.width, dims.height, { fit: 'inside' });
          applied.push(`redimensionado a ${dims.width}×${dims.height}`);
        } else {
          applied.push('redimensionado (sin dimensiones especificadas, se mantuvo original)');
        }
        break;
      }

      case 'crop':
        // Crop inteligente: Sharp tiene trim() para quitar bordes uniformes,
        // o extract() para coordenadas específicas. Sin coords, usamos trim.
        img = img.trim();
        applied.push('recorte automático');
        break;

      case 'brightness': {
        const darker = /oscurec|darken|más\s*oscur/i.test(prompt);
        const factor = darker ? 0.7 : 1.4;
        img = img.modulate({ brightness: factor });
        applied.push(darker ? 'oscurecido' : 'aclarado');
        break;
      }

      case 'contrast': {
        // Sharp: linear(multiplier, offset) para contraste
        const more = !/menos|less|baj/i.test(prompt);
        img = more
          ? img.linear(1.3, -(128 * 0.3))  // más contraste
          : img.linear(0.8, 128 * 0.2);     // menos contraste
        applied.push(more ? 'más contraste' : 'menos contraste');
        break;
      }

      case 'saturate': {
        const desat = /desatur|menos\s*satur/i.test(prompt);
        img = img.modulate({ saturation: desat ? 0.4 : 1.8 });
        applied.push(desat ? 'desaturado' : 'saturado');
        break;
      }

      case 'negate':
        img = img.negate({ alpha: false });
        applied.push('negativo');
        break;

      case 'watermark': {
        // Marca de agua sencilla: texto superpuesto como SVG
        const text = extractWatermarkText(prompt) || 'Guyunusa';
        const svgOverlay = Buffer.from(`
          <svg width="${origW}" height="${origH}">
            <style>
              .wm { fill: rgba(255,255,255,0.35); font-size: ${Math.max(24, Math.round(origW / 16))}px;
                    font-family: Arial, sans-serif; font-weight: bold; }
            </style>
            <text x="50%" y="92%" text-anchor="middle" class="wm">${escapeXml(text)}</text>
          </svg>`);
        img = img.composite([{ input: svgOverlay, gravity: 'south' }]);
        applied.push(`marca de agua: "${text}"`);
        break;
      }

      case 'toJpeg':
        img = img.jpeg({ quality: 90 });
        applied.push('convertido a JPEG');
        break;

      case 'toPng':
        img = img.png();
        applied.push('convertido a PNG');
        break;

      case 'toWebp':
        img = img.webp({ quality: 85 });
        applied.push('convertido a WebP');
        break;

      default:
        break;
    }
  }

  const outBuf = await img.toBuffer();
  // Determinar mime de salida
  let outMime = mime;
  if (ops.includes('toJpeg')) outMime = 'image/jpeg';
  else if (ops.includes('toPng')) outMime = 'image/png';
  else if (ops.includes('toWebp')) outMime = 'image/webp';

  logger.info(`[sharp] Operaciones aplicadas: ${applied.join(', ')} — ${outBuf.length} bytes`);

  return {
    base64: toDataUri(outBuf, outMime),
    contentType: outMime,
    opsApplied: applied,
  };
}

/**
 * Extrae el texto de la marca de agua del prompt.
 */
function extractWatermarkText(prompt) {
  // "marca de agua con 'texto'" o "watermark: texto"
  const m = prompt.match(/(?:marca\s*de\s*agua|watermark)\s*(?:con|:|\s)\s*[""']?([^""'\n]{1,40})/i);
  return m ? m[1].trim() : null;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
