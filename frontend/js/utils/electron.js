/**
 * electron.js — Detección de entorno Electron
 *
 * Electron carga la app con ?electron=1 en la URL.
 * Lo persistimos en sessionStorage para que sobreviva
 * la navegación por hash routes sin perder el parámetro.
 */

const KEY = '_guyunusa_electron';

// Al cargar el módulo por primera vez: si viene el param, lo guardamos
if (new URLSearchParams(window.location.search).get('electron') === '1') {
  sessionStorage.setItem(KEY, '1');
}

export const isElectron = sessionStorage.getItem(KEY) === '1';
