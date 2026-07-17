import { clearApp, $ }      from '../utils/dom.js';
import { validateRegister }  from '../utils/validators.js';
import { register }          from '../services/auth.js';
import { store, router }     from '../app.js';
import { toggleTheme,
         getCurrentTheme }   from '../modules/theme.js';
import { Platform }          from '../modules/native.js';
import { isElectron }        from '../utils/electron.js';

export function mount() {
  const app = clearApp();

  app.innerHTML = `
    <div class="auth-screen">

      <div class="auth-topbar">
        ${Platform.isDesktopBrowser && !isElectron ? `
          <button class="auth-download-btn" id="auth-download-win"
                  title="Descargar app de escritorio para Windows">
            ${iconWindows()}
            <span>Descargar app Windows</span>
          </button>` : ''}

        <button class="auth-theme-btn" id="auth-theme-btn"
                title="Cambiar tema" aria-label="Cambiar tema">
          ${themeIcon()}
        </button>
      </div>

      <div class="auth-brand">
        <div class="auth-brand__logo">
          <img src="assets/icons/guyunusa.ico" alt="Guyunusa"
               style="width:90px;height:90px;border-radius:50%;object-fit:contain;"/>
        </div>
        <div class="auth-brand__name">Guyunusa</div>
        <p class="auth-brand__tagline">
          Una voz uruguaya que llegó al mundo sin perder su raíz.
        </p>
        <div class="auth-brand__stripes">
          ${Array.from({length:9}, () => '<span></span>').join('')}
        </div>
        <span class="auth-brand__footer">guyunusa.uy</span>
      </div>

      <div class="auth-form-panel">
        <div class="auth-form-wrap">
          <h2>Creá tu cuenta</h2>
          <p class="auth-subtitle">Gratis, sin tarjeta. Empezá ahora.</p>

          <div id="auth-alert" class="auth-alert" role="alert"></div>

          ${!isElectron ? `
            <button class="c-btn-google" id="btn-google" type="button">
              <span class="c-btn-google__icon">${googleIcon()}</span>
              Registrarse con Google
            </button>
            <div class="auth-or">o completá el formulario</div>
          ` : ''}

          <form class="auth-form" id="register-form" novalidate>
            <div class="field">
              <label for="email">Email</label>
              <input class="input" type="email" id="email"
                     placeholder="vos@ejemplo.com" autocomplete="email"/>
              <span class="field-error" id="error-email"></span>
            </div>
            <div class="field">
              <label for="username">Nombre de usuario</label>
              <input class="input" type="text" id="username"
                     placeholder="tuapodo" autocomplete="username"/>
              <span class="field-error" id="error-username"></span>
            </div>
            <div class="field">
              <label for="password">Contraseña</label>
              <div class="field__password-wrap">
                <input class="input" type="password" id="password"
                       placeholder="Mínimo 6 caracteres" autocomplete="new-password"/>
                <button type="button" class="field__eye-btn" id="toggle-password"
                        aria-label="Mostrar contraseña">
                  ${iconEye()}
                </button>
              </div>
              <span class="field-error" id="error-password"></span>
            </div>
            <button class="btn btn--primary" type="submit" id="submit-btn">
              Crear cuenta
            </button>
          </form>

          <p class="auth-switch">
            ¿Ya tenés cuenta? <a href="#/login">Ingresá acá</a>
          </p>

          ${!isElectron ? `
            <div class="auth-playstore-wrap">
              <button class="auth-playstore-btn" id="auth-playstore-btn"
                      title="Descargar Guyunusa para Android">
                ${iconPlayStore()}
                <span class="auth-playstore-btn__text">
                  <small>Disponible en</small>
                  <strong>Google Play</strong>
                </span>
              </button>
            </div>
          ` : ''}

        </div>
      </div>

    </div>

    <footer class="c-footer">
      <img class="c-footer__icon" src="assets/icons/guyunusa.ico" alt="Guyunusa"/>
      <span class="c-footer__brand">guyunusa.uy — IA Uruguaya</span>
      <span class="c-footer__sep">·</span>
      <span>© 2026</span>
      <span class="c-footer__sep">·</span>
      <span>Desarrollado por: Willans Junes —
        <a class="c-footer__link" href="https://www.algoritmos.uy"
           target="_blank" rel="noopener noreferrer">www.algoritmos.uy</a>
      </span>
    </footer>
  `;

  $('#auth-theme-btn')?.addEventListener('click', function() {
    toggleTheme();
    this.innerHTML = themeIcon();
  });

  $('#auth-download-win')?.addEventListener('click', async () => {
    try {
      const { openDownloadModal } = await import('../components/downloadModal.js');
      openDownloadModal();
    } catch { /* módulo no disponible — falla silenciosa */ }
  });

  $('#auth-playstore-btn')?.addEventListener('click', () => {
    window.open('https://play.google.com/store/apps/details?id=uy.guyunusa.app', '_blank', 'noopener');
  });

  // Toggle ver/ocultar contraseña
  $('#toggle-password')?.addEventListener('click', () => {
    const input   = $('#password');
    const btn     = $('#toggle-password');
    const visible = input.type === 'text';
    input.type    = visible ? 'password' : 'text';
    btn.innerHTML = visible ? iconEye() : iconEyeOff();
    btn.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
  });

  const form      = $('#register-form');
  const submitBtn = $('#submit-btn');
  const alertEl   = $('#auth-alert');

  function showFieldError(field, msg) {
    $(`#${field}`)?.classList.toggle('error', !!msg);
    const e = $(`#error-${field}`);
    if (e) e.textContent = msg || '';
  }
  function clearErrors() {
    ['email','username','password'].forEach(f => showFieldError(f, ''));
    alertEl.className = 'auth-alert';
    alertEl.textContent = '';
  }
  function showAlert(msg, type = 'error') {
    alertEl.className   = `auth-alert ${type}`;
    alertEl.textContent = msg;
  }

  // Google — solo en navegador web (no Electron)
  $('#btn-google')?.addEventListener('click', async () => {
    const btn = $('#btn-google');
    try {
      const { signInWithGoogle } = await import('../services/googleAuth.js');
      signInWithGoogle(
        (data) => {
          store.update({ user: data.user, token: data.token });
          router.navigate('/');
        },
        (msg) => showAlert(msg),
        (loading) => {
          if (!btn) return;
          btn.disabled  = loading;
          btn.innerHTML = loading
            ? '<span style="font-size:13px;color:var(--text-muted)">Conectando...</span>'
            : `<span class="c-btn-google__icon">${googleIcon()}</span>Registrarse con Google`;
        }
      );
    } catch {
      showAlert('Google Sign-In no disponible en este momento.');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const email    = $('#email').value.trim();
    const username = $('#username').value.trim();
    const password = $('#password').value;

    const errors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = 'Ingresá un email válido';
    if (!username || username.length < 3)
      errors.username = 'El usuario debe tener al menos 3 caracteres';
    if (!password || password.length < 6)
      errors.password = 'La contraseña debe tener al menos 6 caracteres';

    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([f, m]) => showFieldError(f, m));
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Creando cuenta...';

    try {
      await register(email, username, password, store);
      router.navigate('/');
    } catch (err) {
      showAlert(err.message || 'No se pudo crear la cuenta. Intentá de nuevo.');
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Crear cuenta';
    }
  });
}

function themeIcon() {
  return getCurrentTheme() === 'dark'
    ? `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
      </svg>`
    : `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6 .278a.77.77 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"/>
      </svg>`;
}

function googleIcon() {
  return `<svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>`;
}

function iconEye() {
  return `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
  </svg>`;
}

function iconEyeOff() {
  return `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
    <path d="M3.35 5.47q-.27.238-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/>
    <path d="m13.646 14.354-12-12 .708-.708 12 12z"/>
  </svg>`;
}

function iconWindows() {
  return `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.832V8.313H0v5.482zM7.278 8.313v6.4L16 16V8.313H7.278zM16 0 7.278 1.21v7.103H16V0z"/>
  </svg>`;
}

function iconPlayStore() {
  return `<svg width="22" height="22" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#00D2FF" d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z"/>
    <path fill="#00F076" d="M47.5 0c-7 4.4-11.4 12.3-11.4 23v466c0 10.7 4.4 18.6 11.4 23l264.6-256L47.5 0z"/>
    <path fill="#FF3A44" d="M325.3 277.7 104.6 499l280.7-161.2-60-60.1z"/>
    <path fill="#FFBC00" d="M384.9 226.2 405 207l59.8 32.6c14.4 8 14.4 21 0 29l-59.8 32.6-60.7-60.7 60.6-60.6z"/>
  </svg>`;
}
