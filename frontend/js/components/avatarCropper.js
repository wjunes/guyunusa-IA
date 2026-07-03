/**
 * avatarCropper.js — Recortador circular de avatar en el browser
 * Sin librerías externas — usa Canvas API pura.
 *
 * Flujo:
 *   1. Usuario elige archivo JPG/PNG
 *   2. Se abre un modal con la imagen y un círculo de recorte draggable
 *   3. Usuario confirma → canvas genera un PNG circular
 *   4. Se sube al backend vía POST /api/v1/user/avatar
 *   5. onSuccess(avatarUrl) actualiza el store y la UI
 */
import { api } from '../services/api.js';

export function openAvatarCropper(onSuccess) {
  // Input de archivo oculto
  const input = document.createElement('input');
  input.type   = 'file';
  input.accept = 'image/jpeg,image/jpg,image/png';
  input.style.display = 'none';
  document.body.appendChild(input);

  input.addEventListener('change', () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => showCropModal(e.target.result, file.name, onSuccess);
    reader.readAsDataURL(file);
  });

  input.click();
}

function showCropModal(src, filename, onSuccess) {
  if (document.getElementById('avatar-crop-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'c-modal-overlay';
  overlay.id = 'avatar-crop-overlay';

  overlay.innerHTML = `
    <div class="c-avatar-cropper" role="dialog" aria-modal="true">
      <div class="c-avatar-cropper__title">Ajustá tu foto de perfil</div>
      <p class="c-avatar-cropper__hint">
        Mové la imagen para centrar el área circular
      </p>
      <div class="c-avatar-cropper__canvas-wrap">
        <canvas id="crop-canvas" width="280" height="280"></canvas>
        <div class="c-avatar-cropper__ring"></div>
      </div>
      <div class="c-avatar-cropper__zoom">
        <span>🔍</span>
        <input type="range" id="crop-zoom" min="0.5" max="3" step="0.01" value="1"/>
      </div>
      <div class="c-avatar-cropper__status" id="crop-status"></div>
      <div class="c-avatar-cropper__actions">
        <button class="btn btn--ghost" id="crop-cancel">Cancelar</button>
        <button class="btn btn--primary" id="crop-confirm">Guardar foto</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // ── Estado del crop ──
  const CANVAS_SIZE = 280;
  const canvas  = document.getElementById('crop-canvas');
  const ctx     = canvas.getContext('2d');
  const img     = new Image();
  let scale     = 1;
  let offsetX   = 0;
  let offsetY   = 0;
  let dragging  = false;
  let lastX     = 0;
  let lastY     = 0;

  img.onload = () => {
    // Escala inicial: imagen cubre todo el canvas
    const fitScale = Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
    scale   = fitScale;
    offsetX = (CANVAS_SIZE - img.width  * scale) / 2;
    offsetY = (CANVAS_SIZE - img.height * scale) / 2;
    draw();
  };
  img.src = src;

  function draw() {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);
    // Overlay oscuro fuera del círculo
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, CANVAS_SIZE/2 - 4, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
    // Borde del círculo
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, CANVAS_SIZE/2 - 4, 0, Math.PI*2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth   = 2;
    ctx.stroke();
  }

  // Drag
  canvas.addEventListener('mousedown',  e => { dragging = true;  lastX = e.clientX; lastY = e.clientY; });
  canvas.addEventListener('touchstart', e => { dragging = true;  lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('mouseup',    () => { dragging = false; });
  window.addEventListener('touchend',   () => { dragging = false; });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    offsetX += e.clientX - lastX;
    offsetY += e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    draw();
  });
  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    offsetX += e.touches[0].clientX - lastX;
    offsetY += e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    draw();
  }, { passive: true });

  // Zoom
  document.getElementById('crop-zoom')?.addEventListener('input', e => {
    const newScale  = parseFloat(e.target.value) *
      Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;
    offsetX  = cx - (cx - offsetX) * (newScale / scale);
    offsetY  = cy - (cy - offsetY) * (newScale / scale);
    scale    = newScale;
    draw();
  });

  // Cerrar
  const close = () => overlay.remove();
  document.getElementById('crop-cancel')?.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Confirmar — exportar círculo y subir
  document.getElementById('crop-confirm')?.addEventListener('click', async () => {
    const btn    = document.getElementById('crop-confirm');
    const status = document.getElementById('crop-status');
    btn.disabled = true;
    btn.textContent = 'Subiendo...';
    status.textContent = '';

    try {
      // Recortar solo el círculo en un canvas nuevo
      const out  = document.createElement('canvas');
      out.width  = CANVAS_SIZE;
      out.height = CANVAS_SIZE;
      const octx = out.getContext('2d');

      // Círculo clip
      octx.beginPath();
      octx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, CANVAS_SIZE/2, 0, Math.PI*2);
      octx.clip();
      octx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);

      // Canvas → Blob → FormData → backend
      out.toBlob(async (blob) => {
        try {
          const form = new FormData();
          form.append('avatar', blob, 'avatar.png');

          const token = localStorage.getItem('guyunusa_token');
          const port  = window.location.port;
          let base;
          if (window.Capacitor) base = 'https://guyunusa.uy/api/v1';
          else if (port && port !== '3000') base = `http://${window.location.hostname}:3000/api/v1`;
          else base = '/api/v1';

          const res  = await fetch(`${base}/user/avatar`, {
            method:  'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body:    form,
          });
          const data = await res.json();

          if (!data.ok) throw new Error(data.message || 'Error al subir');

          onSuccess(data.avatar_url);
          close();
        } catch (err) {
          status.textContent  = '⚠ ' + err.message;
          btn.disabled        = false;
          btn.textContent     = 'Guardar foto';
        }
      }, 'image/png');

    } catch (err) {
      status.textContent = '⚠ ' + err.message;
      btn.disabled       = false;
      btn.textContent    = 'Guardar foto';
    }
  });
}
