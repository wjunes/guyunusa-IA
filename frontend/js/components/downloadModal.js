/**
 * downloadModal.js — Modal "Descargar app Windows"
 * Ofrece instalable .exe y versión portable.
 */
import { api } from '../services/api.js';

export async function openDownloadModal() {
  if (document.getElementById('download-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'c-modal-overlay';
  overlay.id = 'download-modal-overlay';

  overlay.innerHTML = `
    <div class="c-download-modal" role="dialog" aria-modal="true"
        aria-label="Descargar Guyunusa para Windows">
      <div class="c-download-modal__icon">${iconWindows()}</div>
      <h2 class="c-download-modal__title">Guyunusa para Windows</h2>
      <p class="c-download-modal__subtitle">
        Elegí cómo querés instalar la app de escritorio
      </p>

      <div class="c-download-modal__options" id="download-options">
        <div class="c-download-modal__loading">Buscando versiones disponibles...</div>
      </div>

      <button class="c-download-modal__close" id="download-close">Cerrar</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.getElementById('download-close')?.addEventListener('click', close);

  // Consultar qué archivos hay disponibles
  try {
    const data = await api.get('/downloads');
    renderOptions(data.installer, data.portable);
  } catch {
    renderOptions(null, null, true);
  }
}

function renderOptions(installer, portable, error = false) {
  const el = document.getElementById('download-options');
  if (!el) return;

  if (error) {
    el.innerHTML = `<p class="c-download-modal__error">
      No se pudo conectar con el servidor. Intentá de nuevo más tarde.
    </p>`;
    return;
  }

  if (!installer && !portable) {
    el.innerHTML = `<p class="c-download-modal__error">
      Todavía no hay versiones de escritorio publicadas. ¡Pronto vas a poder descargarla!
    </p>`;
    return;
  }

  el.innerHTML = `
    ${installer ? `
      <a class="c-download-option" href="${installer.url}" download>
        <div class="c-download-option__icon">${iconInstaller()}</div>
        <div class="c-download-option__info">
          <strong>Instalador (.exe)</strong>
          <span>Recomendado · Se instala como cualquier programa de Windows${installer.sizeMB ? ` · ${installer.sizeMB} MB` : ''}</span>
        </div>
        <div class="c-download-option__arrow">${iconDownload()}</div>
      </a>` : ''}

    ${portable ? `
      <a class="c-download-option" href="${portable.url}" download>
        <div class="c-download-option__icon">${iconPortable()}</div>
        <div class="c-download-option__info">
          <strong>Versión portable</strong>
          <span>No requiere instalación · Ejecutar directamente${portable.sizeMB ? ` · ${portable.sizeMB} MB` : ''}</span>
        </div>
        <div class="c-download-option__arrow">${iconDownload()}</div>
      </a>` : ''}
  `;
}

/* ── Íconos ── */
function iconWindows() {
  return `<svg width="36" height="36" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.832V8.313H0v5.482zM7.278 8.313v6.4L16 16V8.313H7.278zM16 0 7.278 1.21v7.103H16V0z"/>
  </svg>`;
}
function iconInstaller() {
  return `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
  </svg>`;
}
function iconPortable() {
  return `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
    <path d="M3 1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 1v12h10V2z"/>
  </svg>`;
}
function iconDownload() {
  return `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
  </svg>`;
}
