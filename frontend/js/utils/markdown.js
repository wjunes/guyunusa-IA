/**
 * Parser de markdown mínimo — sin dependencias externas
 * Soporta: bold, italic, code inline, code blocks, listas, párrafos
 */
export function parseMarkdown(text) {
  if (!text) return '';

  // 1. Extraer code blocks ANTES de escapar HTML:
  //    - protege el código del escape de entidades
  //    - evita que el splitter de párrafos rompa bloques con líneas en blanco internas
  const codeBlocks = [];
  let out = text.replace(/```([\w-]*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const trimmed = code.trim();
    const escaped = trimmed
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const langClass = lang ? ` language-${lang.toLowerCase()}` : '';
    const html = `<pre class="c-code-block"><code class="hljs${langClass}">${escaped}</code></pre>`;
    const idx = codeBlocks.push(html) - 1;
    return `\x00CODE${idx}\x00`;
  });

  // 2. Escapar HTML del texto restante
  out = out
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code inline `...`
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold **...**
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic *...*
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Listas con -
  out = out.replace(/^- (.+)$/gm, '<li>$1</li>');
  out = out.replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>');

  // Listas numeradas
  out = out.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Saltos de línea → párrafos
  // Los placeholders \x00CODE…\x00 se tratan igual que etiquetas HTML (no se envuelven en <p>)
  out = out
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => (p.startsWith('<') || p.startsWith('\x00')) ? p : `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  // 3. Restaurar code blocks
  out = out.replace(/\x00CODE(\d+)\x00/g, (_, i) => codeBlocks[+i]);

  return out;
}
