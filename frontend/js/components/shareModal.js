/**
 * shareModal.js — Compartir y exportar conversaciones
 * Opciones: copiar texto, copiar markdown, compartir nativo, descargar .txt, exportar PDF
 */
import { api }       from '../services/api.js';
import { shareText } from '../modules/native.js';

export async function openShareModal(conversationId) {
  let conv, messages;
  try {
    const data = await api.get(`/chat/conversations/${conversationId}`);
    conv     = data.conversation;
    messages = data.messages;
  } catch {
    showToast('No se pudo cargar la conversación', 'error');
    return;
  }

  const plainText = buildPlainText(conv, messages);
  const markdown  = buildMarkdown(conv, messages);

  const overlay = document.createElement('div');
  overlay.className = 'c-modal-overlay';
  overlay.id = 'share-modal-overlay';

  overlay.innerHTML = `
    <div class="c-share-modal" role="dialog" aria-modal="true"
         aria-label="Compartir conversación">
      <div class="c-share-modal__title">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
        </svg>
        Compartir conversación
      </div>

      <div class="c-share-modal__preview" id="share-preview">
        ${escHTML(plainText.slice(0, 600))}${plainText.length > 600 ? '\n…' : ''}
      </div>

      <div class="c-share-modal__copied" id="share-copied">✓ Copiado al portapapeles</div>

      <div class="c-share-modal__options">
        <button class="c-share-option" id="share-copy-text">
          <span class="c-share-option__icon">📋</span>Copiar texto
        </button>
        <button class="c-share-option" id="share-copy-md">
          <span class="c-share-option__icon">📝</span>Copiar Markdown
        </button>
        <button class="c-share-option" id="share-native">
          <span class="c-share-option__icon">📤</span>Compartir
        </button>
        <button class="c-share-option" id="share-download">
          <span class="c-share-option__icon">⬇</span>Descargar .txt
        </button>
        <button class="c-share-option" id="share-pdf">
          <span class="c-share-option__icon">📄</span>Exportar PDF
        </button>
      </div>

      <button class="c-share-modal__close" id="share-close">Cerrar</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.getElementById('share-close')?.addEventListener('click', close);

  document.getElementById('share-copy-text')?.addEventListener('click', async () => {
    await copyToClipboard(plainText); showCopied();
  });
  document.getElementById('share-copy-md')?.addEventListener('click', async () => {
    await copyToClipboard(markdown); showCopied();
  });
  document.getElementById('share-native')?.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share({ title: conv.title, text: plainText }); return; } catch {}
    }
    await shareText(conv.title || 'Conversación', plainText);
  });
  document.getElementById('share-download')?.addEventListener('click', () => {
    downloadFile(`guyunusa-${slugify(conv.title)}.txt`, plainText);
    close();
  });
  document.getElementById('share-pdf')?.addEventListener('click', async () => {
    const btn = document.getElementById('share-pdf');
    btn.innerHTML = '<span class="c-share-option__icon">⏳</span>Generando...';
    btn.disabled  = true;
    try {
      await exportPDF(conv, messages);
      close();
    } catch (err) {
      showToast('Error al generar PDF: ' + err.message, 'error');
      btn.innerHTML = '<span class="c-share-option__icon">📄</span>Exportar PDF';
      btn.disabled  = false;
    }
  });
}

/* ══════════════════════════════════════════════
   EXPORTAR PDF — sin librerías externas
   Usa la API de impresión del navegador con
   una ventana oculta y CSS de impresión.
   ══════════════════════════════════════════════ */
function exportPDF(conv, messages) {
  return new Promise((resolve, reject) => {
    try {
      const win = window.open('', '_blank',
        'width=900,height=700,scrollbars=yes,resizable=yes');
      if (!win) {
        reject(new Error('El navegador bloqueó la ventana emergente. Permitila e intentá de nuevo.'));
        return;
      }

      const html = buildPDFHtml(conv, messages);
      win.document.write(html);
      win.document.close();

      // Esperar a que cargue y luego imprimir
      win.onload = () => {
        setTimeout(() => {
          win.print();
          // Cerrar después de imprimir (o cancelar)
          win.onafterprint = () => { win.close(); resolve(); };
          // Fallback por si onafterprint no dispara (algunos browsers)
          setTimeout(() => { try { win.close(); } catch {} resolve(); }, 3000);
        }, 500);
      };
    } catch (err) {
      reject(err);
    }
  });
}

function buildPDFHtml(conv, messages) {
  const fecha = formatDate(conv.created_at);
  const rows  = messages
    .filter(m => m.role !== 'system')
    .map(m => {
      const quien = m.role === 'user' ? 'Usuario' : 'Guyunusa';
      const cls   = m.role === 'user' ? 'msg-user' : 'msg-ai';
      // Convertir saltos de línea a <br> para el PDF
      const texto = escHTML(m.content).replace(/\n/g, '<br>');
      return `
        <div class="msg ${cls}">
          <div class="msg-who">${quien}</div>
          <div class="msg-text">${texto}</div>
        </div>`;
    }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>${escHTML(conv.title || 'Conversación')} — Guyunusa</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      font-size: 12pt;
      color: #1a1a1a;
      background: #fff;
      padding: 20mm 20mm 15mm;
    }

    /* Cabecera */
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #1a4fa0;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .header-logo {
      font-size: 22pt;
      font-weight: 700;
      color: #1a4fa0;
      letter-spacing: -0.5px;
    }
    .header-sub {
      font-size: 9pt;
      color: #666;
    }
    .header-right {
      margin-left: auto;
      text-align: right;
      font-size: 9pt;
      color: #666;
    }

    /* Título de conversación */
    .conv-title {
      font-size: 15pt;
      font-weight: 600;
      color: #1a4fa0;
      margin-bottom: 6px;
    }
    .conv-date {
      font-size: 9pt;
      color: #888;
      margin-bottom: 24px;
    }

    /* Mensajes */
    .msg {
      margin-bottom: 16px;
      padding: 10px 14px;
      border-radius: 8px;
      page-break-inside: avoid;
    }
    .msg-user {
      background: #e8f0fb;
      border-left: 3px solid #1a4fa0;
      margin-left: 60px;
    }
    .msg-ai {
      background: #f5f5f3;
      border-left: 3px solid #e8b84b;
      margin-right: 60px;
    }
    .msg-who {
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #888;
      margin-bottom: 5px;
    }
    .msg-user .msg-who { color: #1a4fa0; }
    .msg-ai   .msg-who { color: #c98f1a; }
    .msg-text { line-height: 1.6; }

    /* Footer */
    .footer {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #ddd;
      font-size: 8pt;
      color: #aaa;
      display: flex;
      justify-content: space-between;
    }

    /* Print */
    @media print {
      body { padding: 0; }
      .header { page-break-after: avoid; }
      @page {
        margin: 20mm 20mm 15mm;
        @bottom-center {
          content: "Guyunusa — guyunusa.uy — Página " counter(page) " de " counter(pages);
          font-size: 8pt;
          color: #aaa;
        }
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="header-logo">🇺🇾 Guyunusa</div>
      <div class="header-sub">IA con identidad uruguaya · guyunusa.uy</div>
    </div>
    <div class="header-right">
      Exportado el ${formatDate(new Date().toISOString())}
    </div>
  </div>

  <div class="conv-title">${escHTML(conv.title || 'Conversación')}</div>
  <div class="conv-date">Creada el ${fecha} · ${messages.filter(m=>m.role!=='system').length} mensajes</div>

  ${rows}

  <div class="footer">
    <span>Guyunusa · guyunusa.uy · Algoritmos.uy</span>
    <span>Willans Junes · Montevideo, Uruguay</span>
  </div>
</body>
</html>`;
}

/* ── Formatos de texto ── */
function buildPlainText(conv, messages) {
  const header = [
    `Guyunusa — ${conv.title || 'Conversación'}`,
    `Fecha: ${formatDate(conv.created_at)}`,
    '─'.repeat(40), '',
  ].join('\n');
  const body = messages.filter(m => m.role !== 'system')
    .map(m => `${m.role === 'user' ? 'Vos' : 'Guyunusa'}:\n${m.content}\n`)
    .join('\n');
  return header + body + '\n\nguyunusa.uy';
}

function buildMarkdown(conv, messages) {
  const header = [
    `# ${conv.title || 'Conversación'}`,
    `> Exportado desde [Guyunusa](https://guyunusa.uy) · ${formatDate(conv.created_at)}`, '',
  ].join('\n');
  const body = messages.filter(m => m.role !== 'system')
    .map(m => `${m.role === 'user' ? '**Vos**' : '**Guyunusa**'}\n\n${m.content}`)
    .join('\n\n---\n\n');
  return header + body;
}

/* ── Helpers ── */
async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  a.remove(); URL.revokeObjectURL(url);
}

function showCopied() {
  const el = document.getElementById('share-copied');
  if (!el) return;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2200);
}

function showToast(msg, type = 'info') {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `
    position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
    background:${type==='error'?'#c0392b':'#2b2620'};
    color:white;padding:10px 20px;border-radius:8px;
    font-size:13px;z-index:400;white-space:nowrap;
    box-shadow:0 4px 16px rgba(0,0,0,.25);`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-UY', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

function slugify(str) {
  return (str || 'conversacion').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'conversacion';
}

function escHTML(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
