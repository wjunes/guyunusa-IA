/**
 * sidebarResize.js — Sidebar resize (desktop) + drawer (mobile/Android)
 *
 * Desktop (>768px):
 *   - Sidebar fijo a la izquierda, ancho draggable 160–420px
 *   - Estado (visible/oculto) persiste en localStorage
 *   - Toggle flotante reposiciona según el ancho
 *
 * Mobile/Android (≤768px):
 *   - Sidebar siempre OCULTO al iniciar (drawer)
 *   - Al tocar el toggle aparece sobre el contenido con overlay
 *   - Al tocar fuera o en el toggle de nuevo, se cierra
 *   - El estado NO persiste — siempre arranca cerrado
 */

const KEY_WIDTH  = 'guyunusa_sidebar_w';
const KEY_HIDDEN = 'guyunusa_sidebar_hidden';
const MIN_W      = 160;
const MAX_W      = 420;
const DEFAULT_W  = 260;
const MOBILE_BP  = 768; // px

let _sidebar  = null;
let _handle   = null;
let _toggle   = null;
let _overlay  = null;
let _isMobile = false;

/* ── Detección de modo ── */
function checkMobile() {
  _isMobile = window.innerWidth <= MOBILE_BP;
}

/* ── localStorage ── */
function getSavedWidth() {
  const v = parseInt(localStorage.getItem(KEY_WIDTH));
  return (!isNaN(v) && v >= MIN_W && v <= MAX_W) ? v : DEFAULT_W;
}
function saveWidth(w)    { localStorage.setItem(KEY_WIDTH, w); }
function isHidden()      { return localStorage.getItem(KEY_HIDDEN) === '1'; }
function saveHidden(val) { localStorage.setItem(KEY_HIDDEN, val ? '1' : '0'); }

/* ── Posición del toggle flotante ── */
function updateTogglePosition(w, hidden) {
  if (!_toggle) return;
  if (hidden || _isMobile) {
    _toggle.classList.add('o-sidebar-toggle--collapsed');
    _toggle.style.left = '8px';
    _toggle.title      = 'Mostrar historial';
    _toggle.innerHTML  = iconOpen();
  } else {
    _toggle.classList.remove('o-sidebar-toggle--collapsed');
    _toggle.style.left = (w + 5 + 6) + 'px';
    _toggle.title      = 'Ocultar historial';
    _toggle.innerHTML  = iconClose();
  }
}

/* ── Aplicar ancho (solo desktop) ── */
function applyWidth(w, animate = false) {
  if (!_sidebar || _isMobile) return;
  _sidebar.style.transition = animate ? 'width 200ms ease' : 'none';
  _sidebar.style.width = w + 'px';
  document.documentElement.style.setProperty('--sidebar-w', w + 'px');
  updateTogglePosition(w, _sidebar.classList.contains('o-sidebar--hidden'));
}

/* ── Abrir sidebar (mobile: drawer) ── */
function openSidebarMobile() {
  if (!_sidebar) return;
  _sidebar.classList.remove('o-sidebar--hidden');
  _sidebar.classList.add('o-sidebar--open');
  _sidebar.style.width = '';  // dejar que el CSS controle el ancho en mobile
  if (_overlay) {
    _overlay.classList.add('o-sidebar-overlay--visible');
    _overlay.addEventListener('click', closeSidebarMobile, { once: true });
  }
  updateTogglePosition(0, false);
}

/* ── Cerrar sidebar (mobile: drawer) ── */
function closeSidebarMobile() {
  if (!_sidebar) return;
  _sidebar.classList.add('o-sidebar--hidden');
  _sidebar.classList.remove('o-sidebar--open');
  if (_overlay) _overlay.classList.remove('o-sidebar-overlay--visible');
  updateTogglePosition(0, true);
}

/* ── Toggle unificado ── */
export function toggleSidebar() {
  if (!_sidebar) return;

  if (_isMobile) {
    const isOpen = _sidebar.classList.contains('o-sidebar--open');
    isOpen ? closeSidebarMobile() : openSidebarMobile();
    return;
  }

  // Desktop
  const hidden = !_sidebar.classList.contains('o-sidebar--hidden');
  if (hidden) {
    _sidebar.classList.add('o-sidebar--hidden');
    saveHidden(true);
    updateTogglePosition(getSavedWidth(), true);
  } else {
    _sidebar.classList.remove('o-sidebar--hidden');
    saveHidden(false);
    const w = getSavedWidth();
    applyWidth(w, true);
    updateTogglePosition(w, false);
  }
}

/* ── Drag resize (solo desktop) ── */
function initDrag() {
  if (!_handle) return;

  _handle.addEventListener('mousedown', e => { e.preventDefault(); startDrag(e.clientX); });
  _handle.addEventListener('touchstart', e => startDrag(e.touches[0].clientX), { passive: true });

  function startDrag(startX) {
    if (_isMobile) return;
    _handle.classList.add('o-resize-handle--dragging');
    const startW = parseInt(_sidebar.style.width) || getSavedWidth();
    document.body.style.cursor     = 'col-resize';
    document.body.style.userSelect = 'none';

    function onMove(clientX) {
      const newW = Math.min(MAX_W, Math.max(MIN_W, startW + clientX - startX));
      _sidebar.style.transition = 'none';
      _sidebar.style.width = newW + 'px';
      document.documentElement.style.setProperty('--sidebar-w', newW + 'px');
      updateTogglePosition(newW, false);
    }

    function stop() {
      _handle.classList.remove('o-resize-handle--dragging');
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      saveWidth(parseInt(_sidebar.style.width) || DEFAULT_W);
      document.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseup',   stop);
      document.removeEventListener('touchmove', onTouch);
      document.removeEventListener('touchend',  stop);
    }

    const onMouse = e => onMove(e.clientX);
    const onTouch = e => onMove(e.touches[0].clientX);

    document.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseup',   stop);
    document.addEventListener('touchmove', onTouch, { passive: true });
    document.addEventListener('touchend',  stop);
  }
}

/* ── Responder a cambios de viewport (resize de ventana) ── */
function initResizeObserver() {
  window.addEventListener('resize', () => {
    const wasMobile = _isMobile;
    checkMobile();

    if (_isMobile && !wasMobile) {
      // Desktop → Mobile: forzar cerrado
      closeSidebarMobile();
    } else if (!_isMobile && wasMobile) {
      // Mobile → Desktop: restaurar estado guardado
      _sidebar?.classList.remove('o-sidebar--open');
      if (_overlay) _overlay.classList.remove('o-sidebar-overlay--visible');
      const hidden = isHidden();
      if (hidden) {
        _sidebar?.classList.add('o-sidebar--hidden');
      } else {
        _sidebar?.classList.remove('o-sidebar--hidden');
      }
      applyWidth(getSavedWidth(), false);
    }
  });
}

/* ── Inicialización ── */
export function initSidebarResize() {
  _sidebar = document.getElementById('o-sidebar');
  _handle  = document.getElementById('o-resize-handle');
  _toggle  = document.getElementById('o-sidebar-toggle');
  _overlay = document.getElementById('sidebar-overlay');

  if (!_sidebar || !_toggle) return;

  checkMobile();

  if (_isMobile) {
    // Mobile: siempre cerrado al iniciar
    _sidebar.classList.add('o-sidebar--hidden');
    _sidebar.classList.remove('o-sidebar--open');
    updateTogglePosition(0, true);
  } else {
    // Desktop: restaurar estado guardado
    const w      = getSavedWidth();
    const hidden = isHidden();
    if (hidden) _sidebar.classList.add('o-sidebar--hidden');
    applyWidth(w, false);
  }

  _toggle.addEventListener('click', toggleSidebar);

  initDrag();
  initResizeObserver();
}

/* ── Íconos ── */
function iconClose() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path fill-rule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  </svg>`;
}
function iconOpen() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path fill-rule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
  </svg>`;
}
