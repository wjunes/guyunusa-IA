/**
 * highlighter.js
 *
 * Highlight.js wrapper que tolera carga tardía de la librería.
 *
 * Problema en producción:
 *   El script de CDN se descarga de forma asíncrona. Si el navegador
 *   tarda en obtenerlo (latencia, caché fría, fallback a otro CDN),
 *   window.hljs puede estar undefined cuando el primer mensaje se renderiza.
 *   La solución anterior hacía `if (!window.hljs) return;` → los bloques
 *   quedaban sin colorear y nunca se reintentaba.
 *
 * Solución:
 *   - Si hljs ya está disponible → resaltar de inmediato.
 *   - Si no → encolar los elementos y esperar con un polling rápido.
 *   - El hook `window.__hljsReady()` también puede ser llamado desde el
 *     atributo `onload` del <script> en index.html para flush inmediato.
 *   - Si tras 10 s hljs nunca llegó → limpiar silenciosamente (no crashear).
 */

/** @type {Element[]} */
const _queue = [];

let _polling = false;
let _ready   = false;

/** Flush: resalta todos los elementos en cola y los pendientes. */
function _flush() {
  if (!window.hljs) return;
  _ready = true;
  while (_queue.length > 0) {
    const el = _queue.shift();
    try { window.hljs.highlightElement(el); } catch (_) { /* elemento ya removido del DOM */ }
  }
}

/** Polling de respaldo: verifica cada 100 ms hasta 10 s. */
function _startPolling() {
  if (_polling) return;
  _polling = true;

  const start    = Date.now();
  const MAX_WAIT = 10_000; // 10 segundos

  const tick = () => {
    if (_ready) return;                        // ya resuelto por onload
    if (window.hljs) { _flush(); return; }     // hljs apareció
    if (Date.now() - start > MAX_WAIT) {
      // Tiempo agotado: limpiar cola sin resaltar
      _queue.length = 0;
      return;
    }
    setTimeout(tick, 100);
  };

  setTimeout(tick, 100);
}

/**
 * Hook público que index.html llama desde el `onload` del <script>:
 *   <script ... onload="window.__hljsReady && window.__hljsReady()">
 *
 * Esto dispara el flush de inmediato sin esperar el siguiente tick del polling.
 */
window.__hljsReady = _flush;

/**
 * Recorre todos los `<pre><code>` dentro de `rootEl` y los resalta.
 * Si hljs aún no está disponible los encola para procesarlos cuando cargue.
 *
 * @param {Element} rootEl - Elemento raíz del mensaje (bubble)
 */
export function highlightCodeBlocks(rootEl) {
  if (!rootEl) return;

  const blocks = rootEl.querySelectorAll('pre code');
  if (blocks.length === 0) return;

  if (window.hljs) {
    // Camino rápido: hljs ya cargado
    blocks.forEach(el => {
      try { window.hljs.highlightElement(el); } catch (_) { }
    });
    return;
  }

  // hljs aún no disponible → encolar y asegurarse de que el polling corre
  blocks.forEach(el => _queue.push(el));
  _startPolling();
}
