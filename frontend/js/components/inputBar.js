import { $ }        from '../utils/dom.js';
import { EventBus } from '../modules/eventBus.js';
import { t }        from '../modules/i18n.js';

export function renderInputBar(store) {
  const el = $('.o-inputbar');
  if (!el) return;
  const tr = t();

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
  const sendBtn  = $('#btn-send');
  const micBtn   = $('#btn-mic');

  // Auto-resize
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    sendBtn.disabled = !textarea.value.trim();
  });

  // Enter para enviar
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) doSend();
    }
  });

  sendBtn.addEventListener('click', doSend);

  // ── STT ── retorna una función para limpiar el buffer interno del micrófono
  const resetSTTBuffer = initSTT(textarea, sendBtn, micBtn);

  function doSend() {
    const text = textarea.value.trim();
    if (!text || store.get('loading')) return;
    textarea.value = '';
    textarea.style.height = 'auto';
    sendBtn.disabled = true;
    resetSTTBuffer(); // limpiar savedText/finalText para que el mic no lo reinyecte
    EventBus.emit('message:send', text);
  }
}

/* ══════════════════════════════════════════════
   STT — Speech To Text
   Usa la Web Speech API (nativa del navegador)
   Chrome/Edge: funciona offline
   Firefox: no soportado → muestra aviso
   ══════════════════════════════════════════════ */
function initSTT(textarea, sendBtn, micBtn) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    // Browser no soporta STT — ocultar el botón
    micBtn.style.display = 'none';
    return () => {}; // no-op para que doSend() pueda llamarla igual
  }

  const recognition = new SpeechRecognition();
  recognition.lang            = getLang();
  recognition.continuous      = true;   // no cortar por pausas cortas
  recognition.interimResults  = true;   // texto provisional mientras habla
  recognition.maxAlternatives = 1;

  let isListening = false;
  let userStopped = false; // true solo si el usuario hizo clic para detener
  let savedText   = '';    // texto que había ANTES de empezar a grabar
  let finalText   = '';    // resultados ya confirmados (acumulado de la sesión)

  /** Limpia el buffer interno — se llama al enviar el mensaje.
   *  No alcanza con limpiar las variables JS: el objeto recognition
   *  del navegador mantiene su propio buffer de resultados mientras
   *  la sesión sigue activa. Hay que abortarlo para descartarlo de raíz.
   *  El listener de 'end' ve userStopped=false y reinicia solo,
   *  así el usuario no nota que el micrófono se "cerró". */
  function resetBuffer() {
    savedText = '';
    finalText = '';
    if (isListening) {
      try { recognition.abort(); } catch { /* noop */ }
    }
  }

  micBtn.addEventListener('click', () => {
    if (isListening) {
      userStopped = true;
      recognition.stop();
    } else {
      savedText        = textarea.value;
      finalText        = '';
      userStopped      = false;
      recognition.lang = getLang();
      try { recognition.start(); } catch { /* ya estaba iniciado */ }
    }
  });

  // Mientras habla — combina lo ya confirmado + lo provisional de esta toma
  recognition.addEventListener('result', (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += transcript + ' ';
      else                       interim   += transcript;
    }
    const base = savedText + (savedText ? ' ' : '');
    textarea.value = base + finalText + interim;
    textarea.dispatchEvent(new Event('input')); // recalcular altura y botón enviar
  });

  recognition.addEventListener('start', () => {
    isListening = true;
    micBtn.classList.add('c-input-bar__mic--active');
    micBtn.setAttribute('aria-label', 'Grabando... (clic para detener)');
    micBtn.innerHTML = iconMicActive();
    micBtn.title = 'Grabando... — clic para detener';
  });

  // El navegador puede cortar el reconocimiento por inactividad interna
  // aunque continuous esté en true. Si el usuario NO pidió detener,
  // reiniciamos automáticamente para simular escucha continua real.
  recognition.addEventListener('end', () => {
    if (!userStopped) {
      try { recognition.start(); return; } catch { /* sigue abajo como fallback */ }
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
  });

  recognition.addEventListener('error', (e) => {
    // 'no-speech' y 'aborted' no son errores reales en modo continuo —
    // el listener de 'end' decide si reiniciar o no.
    if (e.error === 'not-allowed') {
      userStopped = true;
      isListening = false;
      micBtn.classList.remove('c-input-bar__mic--active');
      micBtn.innerHTML = iconMic();
      showMicToast('Permiso de micrófono denegado. Habilitalo en la configuración del navegador.');
    } else if (e.error !== 'no-speech' && e.error !== 'aborted') {
      userStopped = true;
    }
  });

  return resetBuffer; // expuesta para que doSend() la invoque al enviar
}

function getLang() {
  const lang = localStorage.getItem('guyunusa_lang') || 'es';
  const map  = { es: 'es-UY', en: 'en-US', pt: 'pt-BR' };
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

export function setInputLoading(loading) {
  const textarea = $('#chat-input');
  const sendBtn  = $('#btn-send');
  const micBtn   = $('#btn-mic');
  if (!textarea) return;
  const tr = t();
  textarea.disabled    = loading;
  sendBtn.disabled     = loading;
  if (micBtn) micBtn.disabled = loading;
  textarea.placeholder = loading
    ? (tr?.chat?.placeholderLoad || 'Guyunusa está escribiendo...')
    : (tr?.chat?.placeholder     || 'Escribí tu mensaje...');
}

/* ── Íconos ── */
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
