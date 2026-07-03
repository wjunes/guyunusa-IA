import { clearApp, $ }            from '../utils/dom.js';
import { store, router }          from '../app.js';
import { EventBus }               from '../modules/eventBus.js';
import { Platform, vibrate }      from '../modules/native.js';
import { t }                      from '../modules/i18n.js';
import { logout }                 from '../services/auth.js';
import { sendMessageStream,
         loadConversations,
         loadMessages }           from '../services/chat.js';
import { renderSidebar }          from '../components/sidebar.js';
import { renderHeader }           from '../components/header.js';
import { renderInputBar,
         setInputLoading }        from '../components/inputBar.js';
import { renderChatWindow,
         appendMessage,
         createStreamBubble,
         appendStreamChunk,
         finalizeStream,
         cancelStream }           from '../components/chatWindow.js';
import { openShareModal }         from '../components/shareModal.js';
import { deleteConversation }     from '../services/chat.js';
import { maybeShowLangBanner }    from '../components/langBanner.js';
import { initSidebarResize }      from '../modules/sidebarResize.js';

window.__guyunusa__ = { EventBus, store };

export async function mount() {
  if (!store.get('user')) { router.navigate('/login'); return; }

  const isMobile = Platform.isCapacitor || window.innerWidth <= 720;

  const app = clearApp();
  app.innerHTML = `
    <div class="o-app" id="o-app">
      <div class="o-sidebar-overlay" id="sidebar-overlay"></div>
      <aside class="o-sidebar" id="o-sidebar"></aside>
      <div class="o-resize-handle" id="o-resize-handle"></div>
      <button class="o-sidebar-toggle" id="o-sidebar-toggle"
              aria-label="Mostrar/ocultar historial"></button>
      <div class="o-main">
        <div class="o-header"></div>
        <div class="o-chat"></div>
        <div class="o-inputbar"></div>
        <div class="o-footer"></div>
      </div>
    </div>
  `;

  try { await loadConversations(store); } catch { /* sin red */ }

  renderAll();
  initSidebarResize();
  mountFooter();
  registerEvents(isMobile);
  setTimeout(() => maybeShowLangBanner(), 1200);
}

function renderAll() {
  renderSidebar(store);
  renderHeader(store);
  renderChatWindow(store);
  renderInputBar(store);
}

function mountFooter() {
  const el = document.querySelector('.o-footer');
  if (!el) return;
  el.innerHTML = `
    <footer class="c-footer">
      <img class="c-footer__icon" src="assets/icons/guyunusa.ico" alt="Guyunusa"/>
      <span class="c-footer__brand">guyunusa.uy — IA Uruguaya</span>
      <span class="c-footer__sep">·</span><span>© 2026</span>
      <span class="c-footer__sep">·</span>
      <span>Desarrollado por: Willans Junes —
        <a class="c-footer__link" href="https://www.algoritmos.uy"
           target="_blank" rel="noopener noreferrer">www.algoritmos.uy</a>
      </span>
    </footer>`;
}

function registerEvents(isMobile) {
  ['sidebar:toggle','sidebar:close','conv:new','conv:select','conv:deleted',
   'conv:delete-request','conv:share','message:send','user:logout',
  ].forEach(ev => EventBus.off(ev));

  EventBus.on('sidebar:toggle',      () => onSidebarToggle(isMobile));
  EventBus.on('sidebar:close',       closeSidebar);
  EventBus.on('conv:new',            onNewConv);
  EventBus.on('conv:select',         id => onConvSelect(id, isMobile));
  EventBus.on('conv:deleted',        onConvDeleted);
  EventBus.on('conv:delete-request', id => onDeleteRequest(id));
  EventBus.on('conv:share',          id => openShareModal(id));
  EventBus.on('message:send',        onMessageSend);
  EventBus.on('user:logout',         onLogout);

  $('#sidebar-overlay')?.addEventListener('click', closeSidebar);
  store.subscribe('conversations', () => { renderSidebar(store); renderHeader(store); });
}

function openSidebar() {
  $('#o-sidebar')?.classList.add('o-sidebar--open');
  $('#sidebar-overlay')?.classList.add('o-sidebar-overlay--visible');
  store.set('sidebarOpen', true);
}
function closeSidebar() {
  $('#o-sidebar')?.classList.remove('o-sidebar--open');
  $('#sidebar-overlay')?.classList.remove('o-sidebar-overlay--visible');
  store.set('sidebarOpen', false);
}
function onSidebarToggle(isMobile) {
  if (isMobile) store.get('sidebarOpen') ? closeSidebar() : openSidebar();
  else document.getElementById('o-sidebar-toggle')?.click();
}

function onNewConv() {
  store.update({ activeConvId: null, messages: [] });
  renderHeader(store); renderChatWindow(store); renderInputBar(store);
  closeSidebar();
  setTimeout(() => document.getElementById('chat-input')?.focus(), 80);
}

async function onConvSelect(id, isMobile) {
  if (store.get('activeConvId') === id) { closeSidebar(); return; }
  try {
    await loadMessages(id, store);
    renderSidebar(store); renderHeader(store); renderChatWindow(store); renderInputBar(store);
    if (isMobile) closeSidebar();
    setTimeout(() => document.getElementById('chat-input')?.focus(), 80);
  } catch (err) { showError(err.message); }
}

function onConvDeleted() { renderSidebar(store); renderHeader(store); renderChatWindow(store); }

async function onDeleteRequest(id) {
  const tr = t();
  const ok = await showConfirm(
    tr?.chat?.deleteConvTitle || 'Eliminar conversación',
    tr?.chat?.deleteConvBody  || '¿Eliminás esta conversación?',
    tr?.chat?.delete || 'Eliminar',
    tr?.chat?.cancel || 'Cancelar',
  );
  if (!ok) return;
  try {
    await deleteConversation(id, store);
    renderSidebar(store); renderHeader(store);
    if (store.get('activeConvId') === id) {
      store.update({ activeConvId: null, messages: [] });
      renderChatWindow(store); renderInputBar(store);
    }
  } catch (err) { showError(err.message); }
}

/* ══════════════════════════════════════════════════════════
   MENSAJE CON STREAMING — estado LOCAL, no global
   ══════════════════════════════════════════════════════════ */
async function onMessageSend(text) {
  if (store.get('loading')) return;
  await vibrate('light');

  // Mostrar mensaje del usuario
  appendMessage({ role: 'user', content: text, created_at: new Date().toISOString() }, store);

  // Crear burbuja de stream y guardar la REF LOCAL aquí
  const streamRef = createStreamBubble();
  let   streamBuf = '';

  setInputLoading(true);

  await sendMessageStream(text, store.get('activeConvId'), store, {

    onStart: (_convId) => { /* se usa en onDone */ },

    onChunk: (chunk) => {
      // appendStreamChunk retorna el buffer acumulado
      streamBuf = appendStreamChunk(streamRef, chunk, streamBuf);
    },

    onDone: async (convId) => {
      finalizeStream(streamRef, streamBuf);
      await vibrate('light');

      if (convId && !store.get('activeConvId')) {
        store.set('activeConvId', convId);
        await loadConversations(store).catch(() => {});
        renderSidebar(store);
        renderHeader(store);
      }
    },

    onError: (msg) => {
      cancelStream(streamRef, msg || t()?.chat?.errorConn || 'Error de conexión');
    },
  });

  setInputLoading(false);
  setTimeout(() => document.getElementById('chat-input')?.focus(), 80);
}

function onLogout() { logout(store); router.navigate('/login'); }

function showConfirm(title, body, confirmLabel, cancelLabel) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'c-modal-overlay';
    overlay.innerHTML = `
      <div class="c-modal" role="dialog" aria-modal="true">
        <div class="c-modal__title">${title}</div>
        <div class="c-modal__body">${body}</div>
        <div class="c-modal__actions">
          <button class="btn btn--ghost" id="mc">${cancelLabel}</button>
          <button class="btn btn--primary" id="mk"
                  style="width:auto;background:#c0392b;">${confirmLabel}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = val => { overlay.remove(); resolve(val); };
    overlay.querySelector('#mc').addEventListener('click',  () => close(false));
    overlay.querySelector('#mk').addEventListener('click',  () => close(true));
    overlay.addEventListener('click', e => { if (e.target === overlay) close(false); });
  });
}

function showError(msg) {
  const existing = document.getElementById('chat-error');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'chat-error'; el.textContent = msg;
  el.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
    background:#c0392b;color:white;padding:10px 20px;border-radius:8px;
    font-size:14px;z-index:300;box-shadow:0 4px 16px rgba(0,0,0,.2);white-space:nowrap;`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}
