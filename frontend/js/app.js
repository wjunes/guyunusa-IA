/**
 * app.js — Punto de entrada de Guyunusa
 */
import { Router }        from './modules/router.js';
import { Store }         from './modules/store.js';
import { initTheme }     from './modules/theme.js';
import { initI18n }      from './modules/i18n.js';
import { initAuth }      from './services/auth.js';
import { EventBus }      from './modules/eventBus.js';
import { Platform,
         initKeyboard,
         initAppLifecycle,
         onNetworkChange } from './modules/native.js';

export const store = new Store({
  user:          null,
  token:         null,
  conversations: [],
  activeConvId:  null,
  messages:      [],
  loading:       false,
  sidebarOpen:   true,
  isOnline:      true,
  platform:      Platform.name,
});

export const router = new Router();

async function init() {
  // 1. Tema — primero para evitar flash
  try { await initTheme(); } catch(e) { console.warn('[app] initTheme:', e.message); }

  // 2. i18n — con fallback a español si falla
  try {
    await initI18n();
  } catch(e) {
    console.warn('[app] initI18n falló, usando español por defecto:', e.message);
    // Importar español directamente como fallback
    try {
      const { default: es } = await import('./i18n/es.js');
      // Exponer globalmente para que t() funcione aunque i18n no inicializó
      window.__i18n_fallback__ = es;
    } catch { /* silencioso */ }
  }

  // 3. Funciones nativas
  if (Platform.isCapacitor) {
    try { await initKeyboard(); }     catch(e) { console.warn('[app] initKeyboard:', e.message); }
    try { await initAppLifecycle({}); } catch(e) { console.warn('[app] initAppLifecycle:', e.message); }
  }

  // 4. Monitor de red
  try {
    onNetworkChange((connected) => {
      store.set('isOnline', connected);
      showNetworkBanner(connected);
    });
  } catch(e) { console.warn('[app] onNetworkChange:', e.message); }

  // 5. Restaurar sesión — con timeout propio para no bloquear
  try {
    await Promise.race([
      initAuth(store),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('initAuth timeout')), 8000)
      ),
    ]);
  } catch(e) {
    console.warn('[app] initAuth:', e.message);
    // Limpiar token roto si lo hubiera
    localStorage.removeItem('guyunusa_token');
    store.update({ user: null, token: null });
  }

  // 6. Rutas
  router.register('/login',    () => import('./pages/loginPage.js').then(m => m.mount()));
  router.register('/register', () => import('./pages/registerPage.js').then(m => m.mount()));
  router.register('/',         () => import('./pages/chatPage.js').then(m => m.mount()));
  router.register('/settings', () => import('./pages/settingsPage.js').then(m => m.mount()));

  router.setGuard((path) => {
    const pub = ['/login', '/register'];
    if (!pub.includes(path) && !store.get('user')) return '/login';
    return null;
  });

  // 7. Re-montar cuando cambia el idioma
  EventBus.on('lang:changed', () => router._resolve());

  // 8. Arrancar — siempre llega acá
  router.start();
}

function showNetworkBanner(connected) {
  const existing = document.getElementById('network-banner');
  if (existing) existing.remove();
  if (connected) return;
  const banner = document.createElement('div');
  banner.id = 'network-banner';
  banner.textContent = '⚠ Sin conexión a internet';
  banner.style.cssText = `
    position:fixed;top:0;left:0;right:0;
    background:#c0392b;color:white;
    text-align:center;font-size:13px;
    padding:8px;z-index:9999;
    font-family:system-ui,sans-serif;
  `;
  document.body.prepend(banner);
}

init().catch(err => {
  // Último recurso — si init() explota de todas formas
  console.error('[app] Error fatal en init():', err);
  router.start(); // intentar arrancar el router igual
});
