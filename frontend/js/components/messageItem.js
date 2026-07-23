import { getAssetURL }         from '../services/api.js';
import { parseMarkdown }        from '../utils/markdown.js';
import { formatTime }           from '../utils/helpers.js';
import { highlightCodeBlocks }  from '../utils/messageFormat.js';

export function createMessageItem(msg, userInitial = '?') {
  const isUser = msg.role === 'user';
  const wrap   = document.createElement('div');
  wrap.className = `c-message c-message--${msg.role}`;

  // Avatar
  const avatar = document.createElement('div');
  avatar.className = 'c-message__avatar';
  if (isUser) {
    // Si el store tiene avatar_url del usuario, mostrarlo; sino inicial
    const store = window.__guyunusa__?.store;
    const avatarUrl = store?.get?.('user')?.avatar_url;
    if (avatarUrl) {
      avatar.innerHTML = `<img src="${getAssetURL(avatarUrl)}" alt="${userInitial}"
        style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>`;
    } else {
      avatar.textContent = userInitial;
    }
  } else {
    avatar.innerHTML = `<img src="assets/icons/guyunusa.ico" alt="Guyunusa"
      style="width:22px;height:22px;border-radius:50%;object-fit:contain;"/>`;
  }

  // Body
  const body = document.createElement('div');
  body.className = 'c-message__body';

  const bubble = document.createElement('div');
  bubble.className = 'c-message__bubble';
  bubble.innerHTML = isUser
    ? escHTML(msg.content).replace(/\n/g, '<br>')
    : parseMarkdown(msg.content);
  if (!isUser) highlightCodeBlocks(bubble);

  // Meta
  const meta = document.createElement('div');
  meta.className = 'c-message__meta';

  const time = document.createElement('span');
  time.className   = 'c-message__time';
  time.textContent = formatTime(msg.created_at);
  meta.appendChild(time);

  if (!isUser) {
    const btnCopy = document.createElement('button');
    btnCopy.className = 'c-message__copy';
    btnCopy.title     = 'Copiar respuesta';
    btnCopy.setAttribute('aria-label', 'Copiar');
    btnCopy.innerHTML = iconCopy();
    btnCopy.addEventListener('click', () => doCopy(btnCopy, msg.content));
    meta.appendChild(btnCopy);

    const btnShare = document.createElement('button');
    btnShare.className = 'c-message__share';
    btnShare.title     = 'Compartir respuesta';
    btnShare.setAttribute('aria-label', 'Compartir');
    btnShare.innerHTML = iconShare();
    btnShare.addEventListener('click', () => doShare(btnShare, msg.content));
    meta.appendChild(btnShare);
  }

  body.appendChild(bubble);
  body.appendChild(meta);
  wrap.appendChild(avatar);
  wrap.appendChild(body);
  return wrap;
}

export function createTypingIndicator() {
  const wrap = document.createElement('div');
  wrap.className = 'c-message c-message--assistant';
  wrap.id = 'typing-indicator';
  wrap.innerHTML = `
    <div class="c-message__avatar">
      <img src="assets/icons/guyunusa.ico" alt="Guyunusa"
           style="width:22px;height:22px;border-radius:50%;object-fit:contain;"/>
    </div>
    <div class="c-message__body">
      <div class="c-message__bubble">
        <div class="c-typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>`;
  return wrap;
}

async function doCopy(btn, text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }
  btn.innerHTML  = iconCopied();
  btn.style.color = 'var(--color-mate)';
  setTimeout(() => { btn.innerHTML = iconCopy(); btn.style.color = ''; }, 2000);
}

async function doShare(btn, text) {
  const shareText = `Guyunusa:\n\n${text}\n\n— guyunusa.uy`;

  // 1. Intentar share nativo (mobile)
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Guyunusa', text: shareText });
      return;
    } catch { /* usuario canceló o no soportado, caer al clipboard */ }
  }

  // 2. Fallback: copiar al portapapeles
  try { await navigator.clipboard.writeText(shareText); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = shareText; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }

  btn.innerHTML  = iconShareDone();
  btn.style.color = 'var(--color-mate)';
  setTimeout(() => { btn.innerHTML = iconShare(); btn.style.color = ''; }, 2000);
}

function escHTML(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
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
function iconShare() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
  </svg>`;
}
function iconShareDone() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
  </svg>`;
}
