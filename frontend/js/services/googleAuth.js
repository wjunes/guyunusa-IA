/**
 * googleAuth.js — Google Identity Services (GSI)
 *
 * NO importa store ni router para evitar imports circulares.
 * El llamador (loginPage / registerPage) maneja la navegación.
 *
 * Nota sobre Electron:
 *   Google GSI usa ux_mode: 'popup', que depende de window.opener.postMessage()
 *   entre ventanas. El modelo de seguridad de Electron (contextIsolation + sandbox)
 *   bloquea esa comunicación cross-window. Por eso, en Electron se informa al usuario
 *   que use email y contraseña en lugar de Google Sign-In.
 */
import { api } from './api.js';

const CLIENT_ID = () =>
  document.querySelector('meta[name="google-client-id"]')?.content || '';

let _initialized = false;

/** Carga el script de GSI dinámicamente (lazy) */
function loadGSI() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts) { resolve(); return; }
    const existing = document.querySelector('script[src*="accounts.google.com/gsi"]');
    if (existing) {
      const check = setInterval(() => {
        if (window.google?.accounts) { clearInterval(check); resolve(); }
      }, 100);
      setTimeout(() => { clearInterval(check); reject(new Error('Google GSI timeout')); }, 8000);
      return;
    }
    const script   = document.createElement('script');
    script.src     = 'https://accounts.google.com/gsi/client';
    script.async   = true;
    script.defer   = true;
    script.onload  = resolve;
    script.onerror = () => reject(new Error('No se pudo cargar Google Sign-In'));
    document.head.appendChild(script);
  });
}

/**
 * Inicia el flujo de Google Sign-In.
 *
 * @param {Function} onSuccess(data)  — recibe { token, user }, el llamador navega
 * @param {Function} onError(message) — muestra el error
 * @param {Function} onLoading(bool)  — activa/desactiva spinner
 */
export async function signInWithGoogle(onSuccess, onError, onLoading) {
  // En Electron el popup de Google no puede comunicarse de vuelta al proceso
  // renderer por restricciones de seguridad (contextIsolation). Usar email.
  // Detección via userAgent — sincrónica, sin depender de preload ni contextBridge.
  if (navigator.userAgent.includes('Electron')) {
    onError('En la app de escritorio usá tu email y contraseña para iniciar sesión.');
    return;
  }

  // En la app Android (Capacitor WebView), Google bloquea el login desde
  // WebViews por política de seguridad anti-phishing. El botón se oculta en
  // la UI, pero por si acaso, redirigir a email/contraseña.
  if (window.Capacitor?.isNativePlatform?.()) {
    onError('En la app usá tu email y contraseña para iniciar sesión.');
    return;
  }

  const clientId = CLIENT_ID();

  if (!clientId || clientId.includes('REEMPLAZAR')) {
    onError('Google Sign-In no está configurado. Usá email y contraseña.');
    return;
  }

  try {
    onLoading(true);
    await loadGSI();

    if (!_initialized) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback:  (response) => handleCredential(response, onSuccess, onError, onLoading),
        ux_mode:   'popup',
        context:   'signin',
      });
      _initialized = true;
    } else {
      // Re-registrar el callback con los nuevos handlers
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback:  (response) => handleCredential(response, onSuccess, onError, onLoading),
        ux_mode:   'popup',
      });
    }

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        onLoading(false);
      }
    });

  } catch (err) {
    onLoading(false);
    onError(err.message || 'Error al conectar con Google');
  }
}

/** Recibe el credential de Google y lo verifica con el backend */
async function handleCredential(response, onSuccess, onError, onLoading) {
  try {
    const data = await api.post('/auth/google', { credential: response.credential });
    localStorage.setItem('guyunusa_token', data.token);
    onSuccess(data); // el llamador hace store.update() y router.navigate()
  } catch (err) {
    onError(err.message || 'Error al iniciar sesión con Google');
  } finally {
    onLoading(false);
  }
}
