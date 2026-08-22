/**
 * tts.service.js — Text-to-Speech para Guyunusa
 *
 * Android: usa @capacitor-community/text-to-speech via bridge nativo
 * Web/Electron: usa window.speechSynthesis (gratis, sin API key)
 *
 * Detecta el idioma del usuario (es/en/pt) y selecciona la voz correspondiente.
 */
import { getLang } from '../modules/i18n.js';

let _selectedVoices = {}; // cache por idioma
let _isSpeaking    = false;
let _onEndCallback = null;

// Capacitor plugin via bridge (Modo A)
const CapTTS = typeof window !== 'undefined'
  ? window.Capacitor?.Plugins?.TextToSpeech
  : null;

// Mapeo de idioma app → código TTS
const LANG_MAP = {
  es: { tts: 'es-419', regions: ['es-UY','es-AR','es-419','es-MX','es-US','es-CL','es-CO','es-ES'] },
  en: { tts: 'en-US',  regions: ['en-US','en-GB','en-AU','en-IN'] },
  pt: { tts: 'pt-BR',  regions: ['pt-BR','pt-PT'] },
};

/**
 * Inicializa el TTS — carga voces (solo web).
 */
export function initTTS() {
  if (CapTTS) return;
  if (!window.speechSynthesis) return;

  const loadVoices = () => {
    const voices = speechSynthesis.getVoices();
    if (voices.length === 0) return;
    // Cachear mejor voz femenina para cada idioma
    for (const lang of Object.keys(LANG_MAP)) {
      _selectedVoices[lang] = pickBestFemaleVoice(voices, lang);
    }
  };

  loadVoices();
  speechSynthesis.addEventListener('voiceschanged', loadVoices);
}

/**
 * Selecciona la mejor voz femenina para un idioma.
 */
function pickBestFemaleVoice(voices, lang) {
  const config = LANG_MAP[lang] || LANG_MAP.es;
  const femaleHints = ['female', 'femenin', 'mujer', 'woman', 'elena', 'paulina',
    'monica', 'lucia', 'laura', 'maria', 'carmen', 'isabella', 'sabina', 'conchita',
    'samantha', 'victoria', 'zira', 'hazel', 'susan', 'karen',
    'francisca', 'luciana', 'fernanda', 'vitoria'];

  for (const region of config.regions) {
    const regionVoices = voices.filter(v => v.lang === region);
    const female = regionVoices.find(v =>
      femaleHints.some(h => v.name.toLowerCase().includes(h))
    );
    if (female) return female;
    if (regionVoices.length > 0) return regionVoices[0];
  }

  // Fallback: cualquier voz que empiece con el idioma base
  const base = lang.slice(0, 2);
  const fallback = voices.filter(v => v.lang.startsWith(base));
  if (fallback.length > 0) return fallback[0];

  return null;
}

/**
 * Obtiene el idioma TTS actual basado en la config del usuario.
 */
function getCurrentTTSLang() {
  const lang = getLang?.() || 'es';
  return LANG_MAP[lang]?.tts || 'es-419';
}

/**
 * Lee un texto en voz alta.
 */
export function speak(text, { rate = 1.0, pitch = 1.1, onEnd = null } = {}) {
  console.info('[TTS] speak llamado, texto:', text?.slice(0, 50), '...');
  if (!text?.trim()) {
    console.warn('[TTS] texto vacío, abortando');
    if (onEnd) onEnd();
    return;
  }

  stop();

  const clean = cleanForTTS(text);
  if (!clean.trim()) {
    console.warn('[TTS] texto limpio vacío, abortando');
    if (onEnd) onEnd();
    return;
  }

  _isSpeaking = true;
  _onEndCallback = onEnd;

  console.info('[TTS] Motor:', CapTTS ? 'Capacitor nativo' : (window.speechSynthesis ? 'Web speechSynthesis' : 'NINGUNO'));

  if (CapTTS) {
    // Android nativo via Capacitor bridge
    speakNative(clean, rate).then(() => {
      _isSpeaking = false;
      if (_onEndCallback) _onEndCallback();
      _onEndCallback = null;
    }).catch(() => {
      _isSpeaking = false;
      if (_onEndCallback) _onEndCallback();
      _onEndCallback = null;
    });
  } else if (window.speechSynthesis) {
    // Web / Electron
    const chunks = splitIntoChunks(clean, 180);
    speakChunks(chunks, 0, rate, pitch);
  } else {
    _isSpeaking = false;
    if (onEnd) onEnd();
  }
}

/**
 * Habla usando el plugin nativo de Capacitor.
 */
async function speakNative(text, rate) {
  try {
    await CapTTS.speak({
      text,
      lang: getCurrentTTSLang(),
      rate,
      pitch: 1.1,
      volume: 1.0,
      category: 'ambient',
    });
  } catch (err) {
    console.warn('[TTS] Error nativo:', err);
  }
}

/**
 * Lee fragmentos secuencialmente (web).
 */
function speakChunks(chunks, index, rate, pitch) {
  if (index >= chunks.length || !_isSpeaking) {
    _isSpeaking = false;
    if (_onEndCallback) _onEndCallback();
    _onEndCallback = null;
    return;
  }

  const lang = getLang?.() || 'es';
  const ttsLang = getCurrentTTSLang();
  const voice = _selectedVoices[lang] || null;

  const utter = new SpeechSynthesisUtterance(chunks[index]);
  utter.lang  = ttsLang;
  utter.rate  = rate;
  utter.pitch = pitch;

  if (voice) utter.voice = voice;

  utter.onend = () => speakChunks(chunks, index + 1, rate, pitch);
  utter.onerror = () => speakChunks(chunks, index + 1, rate, pitch);

  speechSynthesis.speak(utter);
}

/**
 * Detiene la lectura en curso.
 */
export function stop() {
  _isSpeaking = false;
  _onEndCallback = null;
  if (CapTTS) {
    try { CapTTS.stop(); } catch { /* silencioso */ }
  }
  if (window.speechSynthesis) {
    speechSynthesis.cancel();
  }
}

/**
 * ¿Está hablando?
 */
export function isSpeaking() {
  return _isSpeaking;
}

/**
 * Devuelve info de la voz seleccionada.
 */
export function getSelectedVoice() {
  if (CapTTS) return { name: 'Nativo Android', lang: getCurrentTTSLang() };
  const lang = getLang?.() || 'es';
  const voice = _selectedVoices[lang];
  return voice
    ? { name: voice.name, lang: voice.lang }
    : null;
}

/**
 * Limpia texto de markdown para TTS.
 */
function cleanForTTS(text) {
  return text
    .replace(/```[\s\S]*?```/g, 'bloque de código omitido')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, 'enlace')
    .replace(/^[\s]*[-*•]\s+/gm, '')
    .replace(/\|/g, ', ')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Parte texto en chunks respetando límites de oración.
 */
function splitIntoChunks(text, maxLen) {
  if (text.length <= maxLen) return [text];

  const chunks = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }

    let cutAt = remaining.lastIndexOf('. ', maxLen);
    if (cutAt < maxLen * 0.3) cutAt = remaining.lastIndexOf(', ', maxLen);
    if (cutAt < maxLen * 0.3) cutAt = remaining.lastIndexOf(' ', maxLen);
    if (cutAt < maxLen * 0.3) cutAt = maxLen;

    chunks.push(remaining.slice(0, cutAt + 1).trim());
    remaining = remaining.slice(cutAt + 1).trim();
  }

  return chunks;
}
