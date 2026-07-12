import { clearApp, $ } from '../utils/dom.js';
import { store, router } from '../app.js';
import { EventBus } from '../modules/eventBus.js';
import { Platform, vibrate } from '../modules/native.js';
import { t } from '../modules/i18n.js';
import { logout } from '../services/auth.js';
import {
  sendMessageStream,
  loadConversations,
  loadMessages
} from '../services/chat.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderHeader } from '../components/header.js';
import {
  renderInputBar,
  setInputLoading,
  getAttachedFile,
  clearAttachedFile,
} from '../components/inputBar.js';
import {
  renderChatWindow,
  appendMessage,
  createStreamBubble,
  appendStreamChunk,
  finalizeStream,
  cancelStream
} from '../components/chatWindow.js';
import { openShareModal } from '../components/shareModal.js';
import { deleteConversation } from '../services/chat.js';
import { maybeShowLangBanner } from '../components/langBanner.js';
import {
  initSidebarResize,
  toggleSidebar
} from '../modules/sidebarResize.js';
import { renderMessageHtml, highlightCodeBlocks } from '../utils/messageFormat.js';

window.__guyunusa__ = { EventBus, store };

export async function mount() {
  if (!store.get('user')) { router.navigate('/login'); return; }

  const isMobile = Platform.isCapacitor || window.innerWidth <= 768;

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

  store.update({ conversations: [], messages: [], activeConvId: null });

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
  ['sidebar:toggle', 'sidebar:close', 'conv:new', 'conv:select', 'conv:deleted',
    'conv:delete-request', 'conv:share', 'message:send', 'user:logout',
  ].forEach(ev => EventBus.off(ev));

  EventBus.on('sidebar:toggle', () => onSidebarToggle(isMobile));
  EventBus.on('sidebar:close', closeSidebar);
  EventBus.on('conv:new', onNewConv);
  EventBus.on('conv:select', id => onConvSelect(id, isMobile));
  EventBus.on('conv:deleted', onConvDeleted);
  EventBus.on('conv:delete-request', id => onDeleteRequest(id));
  EventBus.on('conv:share', id => openShareModal(id));
  EventBus.on('message:send', onMessageSend);
  EventBus.on('user:logout', onLogout);

  $('#sidebar-overlay')?.addEventListener('click', closeSidebar);
  store.subscribe('conversations', () => { renderSidebar(store); renderHeader(store); });
}

function openSidebar() {
  $('#o-sidebar')?.classList.add('o-sidebar--open');
  $('#sidebar-overlay')?.classList.add('o-sidebar-overlay--visible');
  store.set('sidebarOpen', true);
}
function closeSidebar() {
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('o-sidebar');
    if (sidebar?.classList.contains('o-sidebar--open')) toggleSidebar();
  } else {
    $('#o-sidebar')?.classList.remove('o-sidebar--open');
    $('#sidebar-overlay')?.classList.remove('o-sidebar-overlay--visible');
  }
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
  setTimeout(() => document.getElementById('chat-input')?.focus(), 1000);
}

async function onConvSelect(id, isMobile) {
  if (window.innerWidth <= 768 || isMobile) closeSidebar();
  if (store.get('activeConvId') === id) return;
  try {
    await loadMessages(id, store);
    renderSidebar(store); renderHeader(store); renderChatWindow(store); renderInputBar(store);
    setTimeout(() => document.getElementById('chat-input')?.focus(), 1000);
  } catch (err) { showError(err.message); }
}

function onConvDeleted() { renderSidebar(store); renderHeader(store); renderChatWindow(store); }

async function onDeleteRequest(id) {
  const tr = t();
  const ok = await showConfirm(
    tr?.chat?.deleteConvTitle || 'Eliminar conversación',
    tr?.chat?.deleteConvBody || '¿Eliminás esta conversación?',
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
   MENSAJE CON STREAMING — con soporte de archivo adjunto
   ══════════════════════════════════════════════════════════ */
async function onMessageSend(text) {
  if (store.get('loading')) return;
  await vibrate('light');

  // Leer archivo adjunto ANTES de limpiar el input
  const fileData = getAttachedFile();

  // Mostrar mensaje del usuario (solo el texto, sin el contenido del archivo)
  const userMsgText = text || (fileData ? `[Archivo: ${fileData.filename}]` : '');
  appendMessage({ role: 'user', content: userMsgText, created_at: new Date().toISOString() }, store);

  // Si hay archivo, mostrar chip en el mensaje del usuario
  if (fileData) {
    injectFileChipToLastUserMsg(fileData);
    clearAttachedFile();
  }

  const streamRef = createStreamBubble();
  let streamBuf = '';
  let abortCtrl = new AbortController();
  let streamStopped = false;

  const stopStream = () => {
    if (streamStopped) return;
    streamStopped = true;
    abortCtrl.abort();
    if (streamBuf.trim()) {
      finalizeStream(streamRef, streamBuf + ' ▌');
    } else {
      cancelStream(streamRef, 'Respuesta detenida.');
    }
  };

  setInputLoading(true, stopStream, text);

  await sendMessageStream(text, store.get('activeConvId'), store, {
    signal: abortCtrl.signal,
    fileName: fileData?.filename || null,
    fileContent: fileData?.content || null,

    onStart: (_convId) => { },

    onChunk: (chunk) => {
      if (streamStopped) return;
      streamBuf = appendStreamChunk(streamRef, chunk, streamBuf);
    },

    onDone: async (convId) => {
      if (streamStopped) return;
      finalizeStream(streamRef, streamBuf);
      await vibrate('light');

      // Si había archivo y la respuesta contiene código → botón de descarga
      if (fileData) {
        addDownloadButtonIfCodePresent(streamRef, fileData.filename);
      }

      if (convId && !store.get('activeConvId')) {
        store.set('activeConvId', convId);
        await loadConversations(store).catch(() => { });
        renderSidebar(store);
        renderHeader(store);
      }
    },

    onError: (msg) => {
      if (streamStopped) return;
      cancelStream(streamRef, msg || t()?.chat?.errorConn || 'Error de conexión');
    },
  });

  setInputLoading(false, null, streamStopped ? text : '');
  abortCtrl = null;
  setTimeout(() => document.getElementById('chat-input')?.focus(), 1000);
}

/**
 * Inyecta un chip visual en el último mensaje del usuario para indicar
 * que se adjuntó un archivo. No afecta el texto guardado en BD.
 */
function injectFileChipToLastUserMsg(fileData) {
  const msgs = document.querySelectorAll('.c-message--user .c-message__bubble');
  const bubble = msgs[msgs.length - 1];
  if (!bubble) return;

  const chip = document.createElement('div');
  chip.className = 'c-message__file-chip';
  chip.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z"/>
    </svg>
    <span>${escHTML(fileData.filename)}</span>
  `;
  bubble.appendChild(chip);
}

/**
 * Si la respuesta del asistente contiene bloques de código,
 * agrega un botón de descarga al meta del mensaje.
 */
function addDownloadButtonIfCodePresent(streamRef, originalFilename) {
  if (!streamRef?.bubbleEl) return;
  const codeEl = streamRef.bubbleEl.querySelector('pre code');
  if (!codeEl) return;

  // Intentar preservar la extensión del archivo original
  const downloadName = originalFilename || 'resultado.txt';
  const codeContent = codeEl.textContent || '';

  const meta = streamRef.bodyEl?.querySelector('.c-message__meta');
  if (!meta) return;

  const btn = document.createElement('button');
  btn.className = 'c-message__download';
  btn.title = `Descargar ${downloadName}`;
  btn.setAttribute('aria-label', 'Descargar archivo');
  btn.innerHTML = iconDownload();
  btn.addEventListener('click', () => downloadText(codeContent, downloadName));
  meta.insertBefore(btn, meta.firstChild);
}

function downloadText(content, filename) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function onLogout() { logout(store); router.navigate('/login'); }

/* ── Confirm modal ── */
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
    overlay.querySelector('#mc').addEventListener('click', () => close(false));
    overlay.querySelector('#mk').addEventListener('click', () => close(true));
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

function escHTML(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function iconDownload() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
  </svg>`;
}

/* ── renderMessageBubble / renderMessageContent (helpers internos) ── */
function renderMessageBubble(message) {
  const container = document.createElement('div');
  container.className = 'c-message';

  const avatar = document.createElement('div');
  avatar.className = 'c-message__avatar';
  avatar.style.backgroundImage = `url(${message.role === 'user' ? store.get('user')?.avatar : 'assets/icons/gpt.png'})`;
  container.appendChild(avatar);

  const contentEl = document.createElement('div');
  contentEl.className = 'c-message__content';
  renderMessageContent(contentEl, message);
  container.appendChild(contentEl);

  return container;
}

function renderMessageContent(contentEl, message) {
  const raw = message?.content || '';
  const html = renderMessageHtml(raw);

  contentEl.innerHTML = html;
  highlightCodeBlocks(contentEl);

  requestAnimationFrame(() => {
    if (window.hljs) {
      contentEl.querySelectorAll('pre.c-code-block code, pre code').forEach((el) => {
        window.hljs.highlightElement(el);
      });
    }
  });
}
