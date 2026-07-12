function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function looksLikeCode(text = '') {
  const t = String(text);
  const lines = t.split('\n').filter(l => l.trim().length > 0);
  if (lines.length < 2) return false;

  let score = 0;
  for (const l of lines) {
    if (/^\s*(const|let|var|function|class|if|for|while|return|import|export)\b/.test(l)) score++;
    if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i.test(l)) score++;
    if (/[{}();]|=>|<\/?[a-z][^>]*>/i.test(l)) score++;
  }
  return score >= 2;
}

export function renderMessageHtml(raw = '') {
  const text = String(raw || '').replace(/\r\n/g, '\n');
  const lines = text.split('\n');

  let out = '';
  let inCode = false;
  let lang = 'plaintext';
  let buf = [];
  let builtCodeBlock = false;

  for (const line of lines) {
    const open = line.match(/^\s*`{3,}([\w-]+)?\s*$/);
    if (!inCode && open) {
      inCode = true;
      lang = (open[1] || 'plaintext').toLowerCase();
      buf = [];
      continue;
    }

    if (inCode && /^\s*`{3,}\s*$/.test(line)) {
      out += `<pre class="c-code-block"><code class="hljs language-${lang}">${esc(buf.join('\n'))}</code></pre>`;
      inCode = false;
      lang = 'plaintext';
      buf = [];
      builtCodeBlock = true;
      continue;
    }

    if (inCode) {
      buf.push(line);
    } else {
      out += `<p class="c-msg-p">${esc(line) || '&nbsp;'}</p>`;
    }
  }

  if (inCode) {
    out += `<pre class="c-code-block"><code class="hljs language-${lang}">${esc(buf.join('\n'))}</code></pre>`;
    builtCodeBlock = true;
  }

  // Fallback fuerte: si no hubo fences pero parece código, renderiza todo como bloque
  if (!builtCodeBlock && looksLikeCode(text)) {
    out = `<pre class="c-code-block"><code class="hljs language-plaintext">${esc(text)}</code></pre>`;
  }

  return out;
}

// Re-exportamos desde el módulo robusto para que los importadores
// existentes (messageItem.js, chatWindow.js) no necesiten cambios.
export { highlightCodeBlocks } from './highlighter.js';