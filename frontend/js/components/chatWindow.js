import { $ } from '../utils/dom.js';
import { scrollToBottom } from '../utils/helpers.js';
import { initial, formatTime } from '../utils/helpers.js';
import { t, getLang } from '../modules/i18n.js';
import {
  createMessageItem,
  createTypingIndicator
} from './messageItem.js';
import { createStoryCard } from './storyCard.js';
import { parseMarkdown } from '../utils/markdown.js';
import { highlightCodeBlocks } from '../utils/messageFormat.js';

export function renderChatWindow(store) {
  const el = $('.o-chat');
  if (!el) return;

  const messages = store.get('messages') || [];
  const tr = t();

  el.innerHTML = `
    <div class="c-chat">
      <div class="c-chat__messages" id="messages-list">
        ${messages.length === 0 ? renderEmpty(tr) : ''}
      </div>
    </div>
  `;

  const list = $('#messages-list');

  if (messages.length > 0) {
    const userInit = initial((store.get('user') || {}).username);
    messages.forEach(msg => list.appendChild(createMessageItem(msg, userInit)));
    scrollToBottom(list);
  } else {
    list.insertBefore(createStoryCard(getLang()), list.firstChild);
  }

}

export function appendMessage(msg, store) {
  const list = $('#messages-list');
  if (!list) return;
  list.querySelector('.c-chat__empty')?.remove();
  const card = list.querySelector('.c-story-card');
  if (card) { card.style.opacity = '0'; setTimeout(() => card.remove(), 200); }
  const userInit = initial((store.get('user') || {}).username);
  list.appendChild(createMessageItem(msg, userInit));
  scrollToBottom(list);
}

/* ══════════════════════════════════════════════════════════
   STREAMING — estado LOCAL, retorna ref al elemento
   El llamador (chatPage) guarda la referencia y la pasa
   a appendStreamChunk / finalizeStream / cancelStream.
   Sin variables globales → sin conflicto entre mensajes.
   ══════════════════════════════════════════════════════════ */

/**
 * Crea la burbuja de streaming.
 * Retorna { bubbleEl } — la ref que chatPage necesita pasar a las otras funciones.
 */
export function createStreamBubble() {
  const list = $('#messages-list');
  if (!list) return null;

  list.querySelector('.c-chat__empty')?.remove();
  list.querySelector('.c-story-card')?.remove();

  // Wrapper del mensaje
  const wrap = document.createElement('div');
  wrap.className = 'c-message c-message--assistant';

  // Avatar
  const avatar = document.createElement('div');
  avatar.className = 'c-message__avatar';
  avatar.innerHTML = `<img src="assets/icons/guyunusa.ico" alt="Guyunusa"
    style="width:22px;height:22px;border-radius:50%;object-fit:contain;"/>`;

  // Body
  const body = document.createElement('div');
  body.className = 'c-message__body';

  // Burbuja con cursor
  const bubble = document.createElement('div');
  bubble.className = 'c-message__bubble';
  bubble.innerHTML = '<span class="c-stream-cursor"></span>';

  body.appendChild(bubble);
  wrap.appendChild(avatar);
  wrap.appendChild(body);
  list.appendChild(wrap);
  scrollToBottom(list);

  return { bubbleEl: bubble, bodyEl: body };
}

/** Agrega texto al stream. buffer debe guardarse en chatPage. */
export function appendStreamChunk(ref, text, buffer) {
  if (!ref?.bubbleEl) return buffer + text;
  const newBuf = buffer + text;
  ref.bubbleEl.innerHTML = parseMarkdown(newBuf) + '<span class="c-stream-cursor"></span>';
  scrollToBottom($('#messages-list'));
  return newBuf;
}

/** Finaliza el stream — quita cursor, agrega meta (hora + copiar). */
export function finalizeStream(ref, buffer) {
  if (!ref?.bubbleEl) return;
  ref.bubbleEl.innerHTML = parseMarkdown(buffer);
  highlightCodeBlocks(ref.bubbleEl);

  if (ref.bodyEl) {
    const meta = document.createElement('div');
    meta.className = 'c-message__meta';

    const timeEl = document.createElement('span');
    timeEl.className = 'c-message__time';
    timeEl.textContent = formatTime(new Date().toISOString());

    const copyBtn = document.createElement('button');
    copyBtn.className = 'c-message__copy';
    copyBtn.title = 'Copiar respuesta';
    copyBtn.setAttribute('aria-label', 'Copiar');
    copyBtn.innerHTML = iconCopy();

    const captured = buffer; // captura local del closure
    copyBtn.addEventListener('click', () => doCopy(copyBtn, captured));

    meta.appendChild(timeEl);
    meta.appendChild(copyBtn);
    ref.bodyEl.appendChild(meta);
  }
}

/** Cancela el stream mostrando el error en la burbuja. */
export function cancelStream(ref, errorMsg) {
  if (!ref?.bubbleEl) return;
  ref.bubbleEl.innerHTML = `<span style="color:var(--color-error,#c0392b)">⚠ ${escHTML(errorMsg || 'Error al recibir la respuesta')}</span>`;
}

/* ── Typing indicator ── */
export function showTyping() {
  const list = $('#messages-list');
  if (!list || document.getElementById('typing-indicator')) return;
  list.appendChild(createTypingIndicator());
  scrollToBottom(list);
}
export function hideTyping() { document.getElementById('typing-indicator')?.remove(); }

/* ── helpers internos ── */
async function doCopy(btn, text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }
  btn.innerHTML = iconCopied();
  btn.style.color = 'var(--color-mate)';
  setTimeout(() => { btn.innerHTML = iconCopy(); btn.style.color = ''; }, 2000);
}

function iconCopy() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
  </svg>`;
}
function iconCopied() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
  </svg>`;
}
function renderEmpty(tr) {
  return `<div class="c-chat__empty">
    <div class="c-chat__empty-icon">
      <img src="assets/images/guyunusa.png" alt="Guyunusa"
           style="width:80px;height:80px;border-radius:50%;object-fit:cover;opacity:.75;"/>
    </div>
    <div class="c-chat__empty-title">${tr?.chat?.emptyTitle || '¡Hola! Soy Guyunusa'}</div>
    <p class="c-chat__empty-sub">${tr?.chat?.emptySub || ''}</p>
  </div>`;
}
function escHTML(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
