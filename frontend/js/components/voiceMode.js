/**
 * voiceMode.js — Modo conversación por voz para Guyunusa
 *
 * Estados: IDLE → LISTENING → PROCESSING → SPEAKING → LISTENING (loop)
 */
import {
  speak,
  stop as stopTTS,
  isSpeaking,
  initTTS
} from '../services/tts.service.js';

let _voiceModeActive = false;
let _autoSendTimer   = null;
const AUTO_SEND_DELAY = 1800;

export function isVoiceModeActive() {
  return _voiceModeActive;
}

export function toggleVoiceMode() {
  _voiceModeActive = !_voiceModeActive;

  if (_voiceModeActive) {
    try { initTTS(); } catch (e) { console.warn('[VoiceMode] initTTS:', e); }
  } else {
    stopTTS();
    clearAutoSend();
  }

  return _voiceModeActive;
}

export function deactivateVoiceMode() {
  _voiceModeActive = false;
  stopTTS();
  clearAutoSend();
}

export function scheduleAutoSend(sendFn, textarea) {
  if (!_voiceModeActive) return;
  clearAutoSend();

  _autoSendTimer = setTimeout(() => {
    const text = textarea?.value?.trim();
    if (text) sendFn();
  }, AUTO_SEND_DELAY);
}

export function clearAutoSend() {
  if (_autoSendTimer) {
    clearTimeout(_autoSendTimer);
    _autoSendTimer = null;
  }
}

export function speakResponse(text, onEnd) {
  if (!_voiceModeActive) {
    console.warn('[VoiceMode] speakResponse llamado pero modo voz inactivo');
    return;
  }
  console.info('[VoiceMode] Leyendo respuesta en voz alta...');
  speak(text, {
    rate: 1.0,
    pitch: 1.1,
    onEnd: () => {
      console.info('[VoiceMode] Lectura finalizada');
      if (onEnd) onEnd();
    },
  });
}

export function stopSpeaking() {
  stopTTS();
}
