import { $ } from '../utils/dom.js';
import { EventBus } from '../modules/eventBus.js';
import { t } from '../modules/i18n.js';

// Evita instancias STT huérfanas cuando renderInputBar se llama varias veces
let _sttReset = () => { };
let _sttDestroy = () => { };

export function renderInputBar(store) {
  const el = $('.o-inputbar');
  if (!el) return;
  const tr = t();

  // cleanup del STT anterior (si existía)
  _sttDestroy();

  el.innerHTML = `
    <div class="c-input-bar">
      <div class="c-input-bar__wrap">
        <textarea
          class="c-input-bar__textarea"
          id="chat-input"
          placeholder="${tr?.chat?.placeholder || 'Escribí tu mensaje...'}"
          rows="1"
          autocomplete="off"
        ></textarea>

        <!-- Botón micrófono STT -->
        <button class="c-input-bar__mic" id="btn-mic"
                title="Dictar mensaje (voz)" aria-label="Micrófono">
          ${iconMic()}
        </button>

        <!-- Botón enviar -->
        <button class="c-input-bar__send" id="btn-send"
                title="${tr?.chat?.hint || 'Enter para enviar'}" disabled>
          ${iconSend()}
        </button>
      </div>
    </div>
    <div class="c-input-bar__hint">${tr?.chat?.hint || 'Enter para enviar · Shift+Enter para nueva línea'}</div>
  `;

  const textarea = $('#chat-input');
  const sendBtn = $('#btn-send');
  const micBtn = $('#btn-mic');

  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    sendBtn.disabled = !textarea.value.trim();
  });

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) doSend();
    }
  });

  sendBtn.addEventListener('click', doSend);

  const stt = initSTT(textarea, sendBtn, micBtn);
  _sttReset = stt.resetBuffer;
  _sttDestroy = stt.destroy;

  function doSend() {
    const text = textarea.value.trim();
    if (!text || store.get('loading')) return;
    textarea.value = '';
    textarea.style.height = 'auto';
    sendBtn.disabled = true;

    // al enviar, cortar mic de verdad para evitar reinicio automático
    _sttReset({ hardStop: true });

    EventBus.emit('message:send', text);
  }
}

function initSTT(textarea, sendBtn, micBtn) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn.style.display = 'none';
    return {
      resetBuffer: () => { },
      destroy: () => { },
    };
  }

  const recognition = new SpeechRecognition();
  recognition.lang = getLang();

  const ua = navigator.userAgent || '';
  const isAndroidChrome = /Android/i.test(ua) && /Chrome/i.test(ua);

  // En Android Chrome continuous suele duplicar segmentos
  recognition.continuous = !isAndroidChrome;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let isListening = false;
  let userStopped = false;
  let savedText = '';
  let finalText = '';

  let lastFinalNorm = '';
  let lastFinalAt = 0;

  const normalize = (s) =>
    (s || '').toLowerCase().replace(/\s+/g, ' ').trim();

  function resetBuffer({ hardStop = false } = {}) {
    savedText = '';
    finalText = '';
    lastFinalNorm = '';
    lastFinalAt = 0;

    if (isListening) {
      userStopped = !!hardStop;
      try {
        if (hardStop) recognition.stop();
        else recognition.abort();
      } catch { /* noop */ }
    }
  }

  micBtn.addEventListener('click', onMicClick);
  recognition.addEventListener('result', onResult);
  recognition.addEventListener('start', onStart);
  recognition.addEventListener('end', onEnd);
  recognition.addEventListener('error', onError);

  function onMicClick() {
    if (isListening) {
      userStopped = true;
      recognition.stop();
    } else {
      savedText = textarea.value.trim();
      finalText = '';
      lastFinalNorm = '';
      lastFinalAt = 0;
      userStopped = false;
      recognition.lang = getLang();
      try { recognition.start(); } catch { /* ya iniciado */ }
    }
  }

  function onResult(e) {
    let interim = '';

    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = (e.results[i][0]?.transcript || '').trim();
      if (!transcript) continue;

      if (e.results[i].isFinal) {
        const norm = normalize(transcript);
        const now = Date.now();

        const isConsecutiveDuplicate =
          norm &&
          norm === lastFinalNorm &&
          (now - lastFinalAt) < 4000;

        if (!isConsecutiveDuplicate) {
          finalText += transcript + ' ';
          lastFinalNorm = norm;
          lastFinalAt = now;
        }
      } else {
        interim += transcript + ' ';
      }
    }

    const base = savedText ? (savedText + ' ') : '';
    textarea.value = (base + finalText + interim).trim();
    textarea.dispatchEvent(new Event('input'));
  }

  function onStart() {
    isListening = true;
    micBtn.classList.add('c-input-bar__mic--active');
    micBtn.setAttribute('aria-label', 'Grabando... (clic para detener)');
    micBtn.innerHTML = iconMicActive();
    micBtn.title = 'Grabando... — clic para detener';
  }

  function onEnd() {
    if (!userStopped) {
      if (finalText.trim()) {
        savedText = (savedText + ' ' + finalText).trim();
        finalText = '';
        textarea.value = savedText;
        textarea.dispatchEvent(new Event('input'));
      }
      try { recognition.start(); return; } catch { /* fallback abajo */ }
    }

    isListening = false;
    micBtn.classList.remove('c-input-bar__mic--active');
    micBtn.setAttribute('aria-label', 'Micrófono');
    micBtn.innerHTML = iconMic();
    micBtn.title = 'Dictar mensaje (voz)';

    if (textarea.value.trim()) {
      sendBtn.disabled = false;
      textarea.focus();
    }
  }

  function onError(e) {
    if (e.error === 'not-allowed') {
      userStopped = true;
      isListening = false;
      micBtn.classList.remove('c-input-bar__mic--active');
      micBtn.innerHTML = iconMic();
      showMicToast('Permiso de micrófono denegado. Habilitalo en la configuración del navegador.');
    } else if (e.error !== 'no-speech' && e.error !== 'aborted') {
      userStopped = true;
    }
  }

  function destroy() {
    userStopped = true;
    try { recognition.stop(); } catch { /* noop */ }

    micBtn.removeEventListener('click', onMicClick);
    recognition.removeEventListener('result', onResult);
    recognition.removeEventListener('start', onStart);
    recognition.removeEventListener('end', onEnd);
    recognition.removeEventListener('error', onError);
  }

  return { resetBuffer, destroy };
}

function getLang() {
  const lang = localStorage.getItem('guyunusa_lang') || 'es';
  const map = { es: 'es-UY', en: 'en-US', pt: 'pt-BR' };
  return map[lang] || 'es-UY';
}

function showMicToast(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `
    position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:#2b2620;color:white;padding:10px 18px;
    border-radius:8px;font-size:13px;z-index:300;
    box-shadow:0 4px 16px rgba(0,0,0,.2);max-width:300px;text-align:center;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

/**
 * setInputLoading — Maneja el estado del input durante el streaming
 *
 * loading=true:
 *   - Textarea deshabilitado pero visible con el texto original
 *   - Botón Send se convierte en Stop (rojo)
 *   - Al hacer clic en Stop → llama onStop()
 *
 * loading=false:
 *   - Restaura el textarea con originalText (listo para editar)
 *   - Botón Stop vuelve a ser Send
 */
// Texto original guardado entre llamadas
let _savedOriginalText = '';

export function setInputLoading(loading, onStop = null, originalText = '') {
  const textarea = $('#chat-input');
  const sendBtn = $('#btn-send');
  const micBtn = $('#btn-mic');
  if (!textarea || !sendBtn) return;

  const tr = t();

  if (loading) {
    _savedOriginalText = originalText;

    // Textarea deshabilitado — muestra el mensaje enviado
    textarea.disabled = true;
    textarea.placeholder = tr?.chat?.placeholderLoad || 'Guyunusa está escribiendo...';

    // Convertir Send → Stop (sin clonar, sobrescribir onclick)
    sendBtn.disabled = false;
    sendBtn.className = 'c-input-bar__stop';
    sendBtn.title = 'Detener respuesta';
    sendBtn.setAttribute('aria-label', 'Detener');
    sendBtn.innerHTML = iconStop();
    sendBtn.onclick = () => { if (onStop) onStop(); };

    if (micBtn) micBtn.disabled = true;

  } else {
    const origText = (originalText !== null && originalText !== undefined)
      ? originalText
      : _savedOriginalText;
    _savedOriginalText = '';

    // Rehabilitar textarea con el texto original
    textarea.disabled = false;
    textarea.value = origText;
    textarea.placeholder = tr?.chat?.placeholder || 'Escribí tu mensaje...';
    textarea.style.height = 'auto';
    if (origText) {
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    }
    setTimeout(() => textarea.focus(), 50);

    // Restaurar Send
    sendBtn.className = 'c-input-bar__send';
    sendBtn.title = tr?.chat?.hint || 'Enter para enviar';
    sendBtn.setAttribute('aria-label', 'Enviar');
    sendBtn.innerHTML = iconSend();
    sendBtn.disabled = !origText.trim();
    sendBtn.onclick = null; // quitar el handler de Stop

    if (micBtn) micBtn.disabled = false;
  }
}

/* ── Íconos ── */
function iconStop() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
  </svg>`;
}
function iconSend() {
  return `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11z"/>
  </svg>`;
}

function iconMic() {
  return `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 0 1 4 0z"/>
  </svg>`;
}

function iconMicActive() {
  return `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 0 1 4 0z" class="mic-pulse"/>
  </svg>`;
}
