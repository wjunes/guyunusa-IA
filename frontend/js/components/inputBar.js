import { $ }               from '../utils/dom.js';
import { EventBus }         from '../modules/eventBus.js';
import { t }                from '../modules/i18n.js';
import { uploadChatFile }   from '../services/api.js';

// Evita instancias STT huérfanas cuando renderInputBar se llama varias veces
let _sttReset   = () => {};
let _sttDestroy = () => {};

/** Archivo adjunto actual: null o { filename, content, size, lines, truncated } */
let _attachedFile   = null;
let _uploadAbort    = null; // AbortController para cancelar upload si se quita el archivo

/** Devuelve el archivo actualmente adjunto, o null */
export function getAttachedFile() { return _attachedFile; }

/** Limpia el archivo adjunto y oculta el chip */
export function clearAttachedFile() {
  _attachedFile = null;
  _uploadAbort?.abort();
  _uploadAbort = null;
  const row     = document.getElementById('file-row');
  const input   = document.getElementById('file-input');
  if (row)   row.hidden = true;
  if (input) input.value = '';
}

/* ══════════════════════════════════════════════════════════ */

export function renderInputBar(store) {
  const el = $('.o-inputbar');
  if (!el) return;
  const tr = t();

  _sttDestroy();
  clearAttachedFile(); // reset estado al re-renderizar

  el.innerHTML = `
    <div class="c-input-bar">

      <!-- Fila del chip de archivo (oculta hasta que se adjunte algo) -->
      <div class="c-input-bar__file-row" id="file-row" hidden>
        <div class="c-input-bar__file-chip" id="file-chip">
          <span class="c-input-bar__file-icon" id="file-icon">${iconFile()}</span>
          <span class="c-input-bar__file-name" id="file-name-label">…</span>
          <span class="c-input-bar__file-meta" id="file-meta"></span>
          <button class="c-input-bar__file-remove" id="btn-remove-file"
                  type="button" aria-label="Quitar archivo" title="Quitar archivo">
            ${iconClose()}
          </button>
        </div>
      </div>

      <!-- Input invisible para selección de archivos -->
      <input type="file" id="file-input" hidden
        accept=".txt,.md,.markdown,.rst,.log,
                .js,.mjs,.cjs,.ts,.tsx,.jsx,
                .py,.rb,.php,.java,.c,.cpp,.cc,.h,.hpp,.cs,.go,.rs,.swift,.kt,.scala,.dart,.lua,.r,
                .html,.htm,.css,.scss,.sass,.less,
                .json,.jsonc,.yaml,.yml,.toml,.xml,.csv,.tsv,.sql,.graphql,.gql,
                .sh,.bash,.zsh,.fish,.ps1,.bat,.cmd,.env,.gitignore,.dockerignore,
                .vue,.svelte,.astro,.njk,.pug,.hbs,
                .pdf,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>

      <div class="c-input-bar__wrap">
        <textarea
          class="c-input-bar__textarea"
          id="chat-input"
          placeholder="${tr?.chat?.placeholder || 'Escribí tu mensaje...'}"
          rows="1"
          autocomplete="off"
        ></textarea>

        <!-- Botón adjuntar archivo -->
        <button class="c-input-bar__attach" id="btn-attach"
                type="button" title="Adjuntar archivo" aria-label="Adjuntar archivo">
          ${iconAttach()}
        </button>

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

  const textarea   = $('#chat-input');
  const sendBtn    = $('#btn-send');
  const micBtn     = $('#btn-mic');
  const attachBtn  = $('#btn-attach');
  const fileInput  = $('#file-input');

  // ── Textarea autosize + enable/disable send ──
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    updateSendBtn();
  });

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) doSend();
    }
  });

  sendBtn.addEventListener('click', doSend);

  // ── Adjuntar archivo ──
  attachBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    handleFileSelected(file);
  });

  document.getElementById('btn-remove-file')?.addEventListener('click', () => {
    clearAttachedFile();
    updateSendBtn();
  });

  // ── STT ──
  const stt = initSTT(textarea, sendBtn, micBtn);
  _sttReset   = stt.resetBuffer;
  _sttDestroy = stt.destroy;

  function doSend() {
    const text = textarea.value.trim();
    // Permitir enviar si hay texto O si hay archivo adjunto listo
    if ((!text && !_attachedFile) || store.get('loading')) return;
    textarea.value = '';
    textarea.style.height = 'auto';
    sendBtn.disabled = true;

    _sttReset({ hardStop: true });
    EventBus.emit('message:send', text);
  }

  function updateSendBtn() {
    const hasText = textarea.value.trim().length > 0;
    const hasFile = !!_attachedFile;
    sendBtn.disabled = !hasText && !hasFile;
  }

  /* ── Manejo de archivo seleccionado ── */
  async function handleFileSelected(file) {
    const row       = document.getElementById('file-row');
    const chip      = document.getElementById('file-chip');
    const nameLabel = document.getElementById('file-name-label');
    const metaEl    = document.getElementById('file-meta');
    const iconEl    = document.getElementById('file-icon');

    // Mostrar chip en estado cargando
    _attachedFile = null;
    row.hidden    = false;
    chip.className = 'c-input-bar__file-chip c-input-bar__file-chip--loading';
    iconEl.innerHTML  = iconSpinner();
    nameLabel.textContent = file.name;
    metaEl.textContent    = 'procesando…';
    updateSendBtn();

    _uploadAbort = new AbortController();

    try {
      const result = await uploadChatFile(file, _uploadAbort.signal);
      _attachedFile = result;

      chip.className    = 'c-input-bar__file-chip c-input-bar__file-chip--ready';
      iconEl.innerHTML  = iconFile();
      nameLabel.textContent = result.filename;
      metaEl.textContent    = formatFileInfo(result);
    } catch (err) {
      if (err.name === 'AbortError') return; // usuario quitó el archivo

      _attachedFile = null;
      chip.className    = 'c-input-bar__file-chip c-input-bar__file-chip--error';
      iconEl.innerHTML  = iconFileError();
      nameLabel.textContent = file.name;
      metaEl.textContent    = 'Error al procesar';
      showFileError(err.message || 'No se pudo procesar el archivo');
    } finally {
      _uploadAbort = null;
      updateSendBtn();
    }
  }
}

function formatFileInfo(result) {
  const kb = Math.round(result.size / 1024);
  const sizeStr = kb > 1024 ? `${(kb/1024).toFixed(1)} MB` : `${kb} KB`;
  const lineStr = result.lines > 1 ? ` · ${result.lines} líneas` : '';
  const truncStr = result.truncated ? ' · truncado' : '';
  return `${sizeStr}${lineStr}${truncStr}`;
}

function showFileError(msg) {
  const el = document.createElement('div');
  el.textContent = `⚠ ${msg}`;
  el.style.cssText = `
    position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:#c0392b;color:white;padding:10px 18px;
    border-radius:8px;font-size:13px;z-index:300;
    box-shadow:0 4px 16px rgba(0,0,0,.25);max-width:320px;text-align:center;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

/* ══════════════════════════════════════════════════════════
   STT — Speech-to-Text (sin cambios respecto al original)
   ══════════════════════════════════════════════════════════ */
function initSTT(textarea, sendBtn, micBtn) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn.style.display = 'none';
    return { resetBuffer: () => {}, destroy: () => {} };
  }

  const recognition = new SpeechRecognition();
  recognition.lang = getLang();

  const ua = navigator.userAgent || '';
  const isAndroidChrome = /Android/i.test(ua) && /Chrome/i.test(ua);
  recognition.continuous    = !isAndroidChrome;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let isListening = false;
  let userStopped = false;
  let savedText   = '';
  let finalText   = '';
  let lastFinalNorm = '';
  let lastFinalAt   = 0;

  const normalize = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();

  function resetBuffer({ hardStop = false } = {}) {
    savedText = ''; finalText = '';
    lastFinalNorm = ''; lastFinalAt = 0;
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
      finalText = ''; lastFinalNorm = ''; lastFinalAt = 0;
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
        const now  = Date.now();
        const isDup = norm && norm === lastFinalNorm && (now - lastFinalAt) < 4000;
        if (!isDup) { finalText += transcript + ' '; lastFinalNorm = norm; lastFinalAt = now; }
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
    micBtn.setAttribute('aria-label', 'Grabando… (clic para detener)');
    micBtn.innerHTML = iconMicActive();
    micBtn.title = 'Grabando… — clic para detener';
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
    if (textarea.value.trim()) { sendBtn.disabled = false; textarea.focus(); }
  }

  function onError(e) {
    if (e.error === 'not-allowed') {
      userStopped = true; isListening = false;
      micBtn.classList.remove('c-input-bar__mic--active');
      micBtn.innerHTML = iconMic();
      showFileError('Permiso de micrófono denegado. Habilitalo en la configuración del navegador.');
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

/* ══════════════════════════════════════════════════════════
   setInputLoading — estado del input durante streaming
   ══════════════════════════════════════════════════════════ */
let _savedOriginalText = '';

export function setInputLoading(loading, onStop = null, originalText = '') {
  const textarea = $('#chat-input');
  const sendBtn  = $('#btn-send');
  const micBtn   = $('#btn-mic');
  const attachBtn = $('#btn-attach');
  if (!textarea || !sendBtn) return;

  const tr = t();

  if (loading) {
    _savedOriginalText = originalText;

    textarea.disabled = true;
    textarea.placeholder = tr?.chat?.placeholderLoad || 'Guyunusa está escribiendo...';

    sendBtn.disabled  = false;
    sendBtn.className = 'c-input-bar__stop';
    sendBtn.title = 'Detener respuesta';
    sendBtn.setAttribute('aria-label', 'Detener');
    sendBtn.innerHTML = iconStop();
    sendBtn.onclick = () => { if (onStop) onStop(); };

    if (micBtn)    micBtn.disabled    = true;
    if (attachBtn) attachBtn.disabled = true;

  } else {
    const origText = (originalText !== null && originalText !== undefined)
      ? originalText : _savedOriginalText;
    _savedOriginalText = '';

    textarea.disabled = false;
    textarea.value    = origText;
    textarea.placeholder = tr?.chat?.placeholder || 'Escribí tu mensaje...';
    textarea.style.height = 'auto';
    if (origText) textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    setTimeout(() => textarea.focus(), 50);

    sendBtn.className = 'c-input-bar__send';
    sendBtn.title     = tr?.chat?.hint || 'Enter para enviar';
    sendBtn.setAttribute('aria-label', 'Enviar');
    sendBtn.innerHTML = iconSend();
    sendBtn.disabled  = !origText.trim() && !_attachedFile;
    sendBtn.onclick   = null;

    if (micBtn)    micBtn.disabled    = false;
    if (attachBtn) attachBtn.disabled = false;
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
function iconAttach() {
  return `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
  </svg>`;
}
function iconFile() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z"/>
  </svg>`;
}
function iconFileError() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM8 6.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V7a.5.5 0 0 0-.5-.5m0 5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
  </svg>`;
}
function iconClose() {
  return `<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
  </svg>`;
}
function iconSpinner() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" class="file-chip-spinner">
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
  </svg>`;
}
