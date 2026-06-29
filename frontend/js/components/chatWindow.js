import { $ }                    from '../utils/dom.js';
import { scrollToBottom }       from '../utils/helpers.js';
import { initial }              from '../utils/helpers.js';
import { t, getLang }           from '../modules/i18n.js';
import { createMessageItem,
         createTypingIndicator } from './messageItem.js';
import { EventBus }              from '../modules/eventBus.js';
import { createStoryCard }       from './storyCard.js';
import { parseMarkdown }         from '../utils/markdown.js';

export function renderChatWindow(store) {
  const el = $('.o-chat');
  if (!el) return;

  const messages = store.get('messages') || [];
  const user     = store.get('user') || {};
  const userInit = initial(user.username);
  const tr       = t();

  el.innerHTML = `
    <div class="c-chat">
      <div class="c-chat__messages" id="messages-list">
        ${messages.length === 0 ? renderEmpty(tr) : ''}
      </div>
    </div>
  `;

  const list = $('#messages-list');

  if (messages.length > 0) {
    messages.forEach(msg => list.appendChild(createMessageItem(msg, userInit)));
    scrollToBottom(list);
  } else {
    const card = createStoryCard(getLang());
    list.insertBefore(card, list.firstChild);
  }

  el.querySelectorAll('.c-chat__suggestion').forEach(btn => {
    btn.addEventListener('click', () => {
      EventBus.emit('message:send', btn.dataset.text);
    });
  });
}

export function appendMessage(msg, store) {
  const list = $('#messages-list');
  if (!list) return;

  // Quitar estado vacío y story card
  list.querySelector('.c-chat__empty')?.remove();
  const card = list.querySelector('.c-story-card');
  if (card) {
    card.style.transition = 'opacity 200ms, transform 200ms';
    card.style.opacity = '0';
    setTimeout(() => card.remove(), 200);
  }

  const user     = store.get('user') || {};
  const userInit = initial(user.username);
  list.appendChild(createMessageItem(msg, userInit));
  scrollToBottom(list);
}

/* ═══════════════════════════════════════════════════════
   STREAMING — crea burbuja vacía y la va llenando
   ═══════════════════════════════════════════════════════ */

let _streamBubble = null; // referencia a la burbuja en construcción
let _streamBuffer = '';   // texto acumulado del stream

/** Crea la burbuja de streaming vacía en el DOM */
export function createStreamBubble(store) {
  const list = $('#messages-list');
  if (!list) return;

  // Quitar estado vacío
  list.querySelector('.c-chat__empty')?.remove();
  list.querySelector('.c-story-card')?.remove();

  const wrap = document.createElement('div');
  wrap.className = 'c-message c-message--assistant';
  wrap.id = 'stream-bubble';

  const user     = store.get('user') || {};
  wrap.innerHTML = `
    <div class="c-message__avatar">
      <img src="assets/icons/guyunusa.ico" alt="Guyunusa"
           style="width:22px;height:22px;border-radius:50%;object-fit:contain;"/>
    </div>
    <div>
      <div class="c-message__bubble" id="stream-content">
        <span class="c-stream-cursor"></span>
      </div>
    </div>
  `;

  list.appendChild(wrap);
  scrollToBottom(list);

  _streamBubble = document.getElementById('stream-content');
  _streamBuffer = '';
}

/** Agrega texto al stream en curso */
export function appendStreamChunk(text) {
  if (!_streamBubble) return;
  _streamBuffer += text;
  // Renderizar markdown en tiempo real
  _streamBubble.innerHTML = parseMarkdown(_streamBuffer) +
    '<span class="c-stream-cursor"></span>';
  scrollToBottom($('#messages-list'));
}

/** Finaliza el stream — quita el cursor, deja el mensaje definitivo */
export function finalizeStream() {
  if (!_streamBubble) return;
  _streamBubble.innerHTML = parseMarkdown(_streamBuffer);
  _streamBubble = null;
  _streamBuffer = '';
  // Quitar id para que no interfiera con futuros streams
  document.getElementById('stream-bubble')?.removeAttribute('id');
}

/** Cancela el stream en caso de error */
export function cancelStream(errorMsg) {
  if (_streamBubble) {
    _streamBubble.innerHTML = `⚠ ${errorMsg || 'Error al recibir respuesta'}`;
    _streamBubble = null;
    _streamBuffer = '';
  }
  document.getElementById('stream-bubble')?.removeAttribute('id');
}

/* ── Typing indicator (se mantiene como fallback) ── */
export function showTyping() {
  const list = $('#messages-list');
  if (!list || document.getElementById('typing-indicator')) return;
  list.appendChild(createTypingIndicator());
  scrollToBottom(list);
}

export function hideTyping() {
  document.getElementById('typing-indicator')?.remove();
}

/* ── helpers internos ── */
function renderEmpty(tr) {
  const suggestions = tr?.chat?.suggestions || [];
  return `
    <div class="c-chat__empty">
      <div class="c-chat__empty-icon">
        <img src="assets/images/guyunusa.png" alt="Guyunusa"
             style="width:80px;height:80px;border-radius:50%;object-fit:cover;opacity:.75;"/>
      </div>
      <div class="c-chat__empty-title">${tr?.chat?.emptyTitle || '¡Hola! Soy Guyunusa'}</div>
      <p class="c-chat__empty-sub">${tr?.chat?.emptySub || ''}</p>
      <div class="c-chat__suggestions">
        ${suggestions.map(s =>
          `<button class="c-chat__suggestion" data-text="${escHTML(s)}">${escHTML(s)}</button>`
        ).join('')}
      </div>
    </div>`;
}

function escHTML(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
