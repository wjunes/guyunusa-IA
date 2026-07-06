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

  // El navegador puede cortar el reconocimiento por inactividad interna.
  // FIX Android Chrome: antes de reiniciar, comprometer finalText a savedText
  // para que la nueva sesión no repita los resultados de la anterior.
  recognition.addEventListener('end', () => {
    if (!userStopped) {
      // Comprometer texto confirmado antes de reiniciar
      if (finalText.trim()) {
        savedText = (savedText + ' ' + finalText).trim();
        finalText = '';
        // Actualizar el textarea con el texto comprometido
        textarea.value = savedText;
        textarea.dispatchEvent(new Event('input'));
      }
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
  const sendBtn  = $('#btn-send');
  const micBtn   = $('#btn-mic');
  if (!textarea || !sendBtn) return;

  const tr = t();

  if (loading) {
    _savedOriginalText = originalText;

    // Textarea deshabilitado — muestra el mensaje enviado
    textarea.disabled    = true;
    textarea.placeholder = tr?.chat?.placeholderLoad || 'Guyunusa está escribiendo...';

    // Convertir Send → Stop (sin clonar, sobrescribir onclick)
    sendBtn.disabled  = false;
    sendBtn.className = 'c-input-bar__stop';
    sendBtn.title     = 'Detener respuesta';
    sendBtn.setAttribute('aria-label', 'Detener');
    sendBtn.innerHTML = iconStop();
    sendBtn.onclick   = () => { if (onStop) onStop(); };

    if (micBtn) micBtn.disabled = true;

  } else {
    const origText = (originalText !== null && originalText !== undefined)
      ? originalText
      : _savedOriginalText;
    _savedOriginalText = '';

    // Rehabilitar textarea con el texto original
    textarea.disabled    = false;
    textarea.value       = origText;
    textarea.placeholder = tr?.chat?.placeholder || 'Escribí tu mensaje...';
    textarea.style.height = 'auto';
    if (origText) {
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    }
    setTimeout(() => textarea.focus(), 50);

    // Restaurar Send
    sendBtn.className = 'c-input-bar__send';
    sendBtn.title     = tr?.chat?.hint || 'Enter para enviar';
    sendBtn.setAttribute('aria-label', 'Enviar');
    sendBtn.innerHTML = iconSend();
    sendBtn.disabled  = !origText.trim();
    sendBtn.onclick   = null; // quitar el handler de Stop

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
