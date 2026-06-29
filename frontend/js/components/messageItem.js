import { parseMarkdown } from '../utils/markdown.js';
import { formatTime }    from '../utils/helpers.js';

export function createMessageItem(msg, userInitial = '?') {
  const isUser = msg.role === 'user';
  const wrap   = document.createElement('div');
  wrap.className = `c-message c-message--${msg.role}`;

  const avatarHTML = isUser
    ? `<div class="c-message__avatar">${userInitial}</div>`
    : `<div class="c-message__avatar">
         <img src="assets/icons/guyunusa.ico" alt="Guyunusa"
              style="width:22px;height:22px;border-radius:50%;object-fit:contain;"/>
       </div>`;

  const bubbleContent = isUser
    ? escapeHTML(msg.content).replace(/\n/g, '<br>')
    : parseMarkdown(msg.content);

  // Botón copiar solo en mensajes de Guyunusa
  const copyBtn = !isUser ? `
    <button class="c-message__copy" title="Copiar respuesta" aria-label="Copiar">
      ${iconCopy()}
    </button>` : '';

  wrap.innerHTML = `
    ${avatarHTML}
    <div class="c-message__body">
      <div class="c-message__bubble">${bubbleContent}</div>
      <div class="c-message__meta">
        <span class="c-message__time">${formatTime(msg.created_at)}</span>
        ${copyBtn}
      </div>
    </div>
  `;

  // Evento del botón copiar
  if (!isUser) {
    wrap.querySelector('.c-message__copy')?.addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      try {
        await navigator.clipboard.writeText(msg.content);
        btn.innerHTML = iconCopied();
        btn.classList.add('c-message__copy--done');
        setTimeout(() => {
          btn.innerHTML = iconCopy();
          btn.classList.remove('c-message__copy--done');
        }, 2000);
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = msg.content;
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
        btn.innerHTML = iconCopied();
        setTimeout(() => { btn.innerHTML = iconCopy(); }, 2000);
      }
    });
  }

  return wrap;
}

export function createTypingIndicator() {
  const wrap = document.createElement('div');
  wrap.className = 'c-message c-message--assistant c-message--typing';
  wrap.id = 'typing-indicator';
  wrap.innerHTML = `
    <div class="c-message__avatar">
      <img src="assets/icons/guyunusa.ico" alt="Guyunusa"
           style="width:22px;height:22px;border-radius:50%;object-fit:contain;"/>
    </div>
    <div class="c-message__body">
      <div class="c-message__bubble">
        <div class="c-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  `;
  return wrap;
}

function escapeHTML(str) {
  return str
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
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
