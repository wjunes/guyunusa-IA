/**
 * api.js — Cliente HTTP hacia el backend
 */
import { Platform } from '../modules/native.js';

function getBaseURL() {
  const override = new URLSearchParams(window.location.search).get('api');
  if (override) return override + '/api/v1';

  if (Platform.isCapacitor) return 'https://api.guyunusa.uy/api/v1';
  if (Platform.isElectron)  return 'http://localhost:3000/api/v1';

  // Desarrollo web: cualquier puerto distinto al 3000 apunta al backend
  const port = window.location.port;
  if (port && port !== '3000') {
    const host = window.location.hostname;
    return `http://${host}:3000/api/v1`;
  }

  return '/api/v1';
}

function getToken() {
  return localStorage.getItem('guyunusa_token');
}

async function request(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token   = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${getBaseURL()}${path}`, {
      method,
      headers,
      body:   body ? JSON.stringify(body) : null,
      signal: AbortSignal.timeout(20_000),
    });
  } catch (err) {
    if (err.name === 'TypeError' || err.name === 'AbortError') {
      throw new Error('No se pudo conectar con el servidor. ¿Está corriendo el backend en el puerto 3000?');
    }
    throw err;
  }

  const text = await res.text();
  if (!text?.trim()) {
    throw new Error(`El servidor devolvió una respuesta vacía (HTTP ${res.status})`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Respuesta inválida del servidor (HTTP ${res.status})`);
  }

  if (!data.ok) throw new Error(data.message || 'Error del servidor');
  return data;
}

export const api = {
  get:    (path)       => request('GET',    path),
  post:   (path, body) => request('POST',   path, body),
  put:    (path, body) => request('PUT',    path, body),
  delete: (path, body) => request('DELETE', path, body),
};
