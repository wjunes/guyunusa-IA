import { $ }                          from '../utils/dom.js';
import { EventBus }                   from '../modules/eventBus.js';
import { toggleTheme, getCurrentTheme,
         onThemeChange }              from '../modules/theme.js';
import { t }                          from '../modules/i18n.js';
import { Platform }                   from '../modules/native.js';
import { isElectron }                 from '../utils/electron.js';

export function renderHeader(store) {
  const el = $('.o-header');
  if (!el) return;

  const convs    = store.get('conversations') || [];
  const activeId = store.get('activeConvId');
  const active   = convs.find(c => c.id === activeId);
  const title    = active ? active.title : 'Guyunusa';
  const isDark   = getCurrentTheme() === 'dark';
  const tr       = t();


  el.innerHTML = `
    <div class="c-header">

      <!-- Título de la conversación activa -->
      <span class="c-header__title">${escHTML(title)}</span>

      <!-- Toggle de tema -->
      <button class="c-header__theme-btn" id="btn-theme"
              title="${isDark ? tr.header.themeLight : tr.header.themeDark}"
              aria-label="Cambiar tema">
        ${isDark ? iconSun() : iconMoon()}
      </button>

      <!-- Configuración — solo visible en mobile (el sidebar está oculto) -->
      ${Platform.isMobileBrowser && !Platform.isCapacitor ? `
        <button class="c-header__settings-btn" id="btn-header-settings"
                title="${tr.sidebar.settings}" aria-label="${tr.sidebar.settings}">
          ${iconSettings()}
        </button>` : ''}

      <!-- Descargar app Windows — solo en navegador web desktop, nunca en Electron -->
      ${Platform.isDesktopBrowser && !isElectron ? `
        <button class="c-header__download-btn" id="btn-download-win"
                title="Descargar app de escritorio para Windows">
          ${iconWindows()}
          <span>Descargar app Windows</span>
        </button>` : ''}

      <!-- Nueva conversación -->
      <button class="c-header__new-btn" id="btn-header-new"
              title="${tr.header.newConvTitle}">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5H1.75a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 8 1z"/>
        </svg>
        ${tr.header.newConv}
      </button>

    </div>
  `;

  $('#btn-header-new')?.addEventListener('click', () => EventBus.emit('conv:new'));

  $('#btn-header-settings')?.addEventListener('click', () => {
    EventBus.emit('sidebar:close');
    import('../modules/router.js').then(m => {
      window.location.hash = '/settings';
    });
  });

  $('#btn-download-win')?.addEventListener('click', async () => {
    try {
      const { openDownloadModal } = await import('./downloadModal.js');
      openDownloadModal();
    } catch { /* módulo no disponible — falla silenciosa */ }
  });

  const themeBtn = $('#btn-theme');
  themeBtn?.addEventListener('click', () => {
    const next = toggleTheme();
    themeBtn.title     = next === 'dark' ? tr.header.themeLight : tr.header.themeDark;
    themeBtn.innerHTML = next === 'dark' ? iconSun() : iconMoon();
  });

  onThemeChange((theme) => {
    const btn = $('#btn-theme');
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? iconSun() : iconMoon();
    btn.title     = theme === 'dark' ? tr.header.themeLight : tr.header.themeDark;
  });
}

/* ── Íconos ── */
function iconSettings() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
  </svg>`;
}
function iconMoon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 .278a.77.77 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"/>
  </svg>`;
}
function iconSun() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
  </svg>`;
}
function iconWindows() {
  return `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.832V8.313H0v5.482zM7.278 8.313v6.4L16 16V8.313H7.278zM16 0 7.278 1.21v7.103H16V0z"/>
  </svg>`;
}
function escHTML(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
