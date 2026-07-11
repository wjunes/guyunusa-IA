import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { createHighlighter } from 'shiki';

let shikiHighlighterPromise = null;

function getShikiHighlighter() {
  if (!shikiHighlighterPromise) {
    shikiHighlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 'bash', 'html', 'css', 'json', 'text']
    });
  }
  return shikiHighlighterPromise;
}

function normalizeLang(langRaw) {
  const lang = (langRaw || 'text').toLowerCase();
  if (lang === 'js') return 'javascript';
  if (lang === 'ts') return 'typescript';
  if (lang === 'py') return 'python';
  if (lang === 'c#' || lang === 'cs') return 'csharp';
  if (lang === 'sh' || lang === 'shell') return 'bash';
  return lang;
}

function attachCodeCopyButtons(container) {
  const pres = container.querySelectorAll('pre');
  pres.forEach((pre) => {
    if (pre.dataset.copyBound === '1') return;
    pre.dataset.copyBound = '1';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn mini';
    btn.textContent = 'Copiar';
    btn.title = 'Copiar código';

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copiado';
        btn.dataset.copied = 'true';
        setTimeout(() => {
          btn.textContent = 'Copiar';
          btn.dataset.copied = 'false';
        }, 1200);
      } catch {
        btn.textContent = 'Error';
        setTimeout(() => (btn.textContent = 'Copiar'), 1200);
      }
    });

    pre.appendChild(btn);
  });
}

async function renderBotMarkdown(mdText, container) {
  marked.setOptions({ gfm: true, breaks: true });

  // 1) Markdown -> HTML seguro
  const rawHtml = marked.parse(mdText || '');
  const safeHtml = DOMPurify.sanitize(rawHtml);
  container.innerHTML = safeHtml;

  // 2) Resaltado de bloques con Shiki
  try {
    const highlighter = await getShikiHighlighter();
    const theme = document.body.classList.contains('dark-theme') ? 'github-dark' : 'github-light';

    const blocks = Array.from(container.querySelectorAll('pre > code'));
    for (const codeEl of blocks) {
      const pre = codeEl.parentElement;
      const className = codeEl.className || '';
      const match = className.match(/language-([a-zA-Z0-9+#-]+)/);
      const lang = normalizeLang(match?.[1] || 'text');
      const code = codeEl.textContent || '';

      const shikiHtml = highlighter.codeToHtml(code, { lang, theme });
      const wrap = document.createElement('div');
      wrap.innerHTML = shikiHtml;

      const shikiNode = wrap.firstElementChild;
      if (pre && pre.parentNode && shikiNode) {
        pre.parentNode.replaceChild(shikiNode, pre);
      }
    }
  } catch (err) {
    console.warn('[renderBotMarkdown] Shiki fallback:', err);
    // Si falla Shiki, se mantiene HTML markdown sin romper UI
  }

  // 3) Botón copiar por bloque
  attachCodeCopyButtons(container);
}

document.addEventListener('DOMContentLoaded', async () => {
  const chatBox = document.getElementById('chatBox');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const saveApiKeyBtn = document.getElementById('saveApiKey');
  const providerSelect = document.getElementById('providerSelect');
  const themeToggle = document.getElementById('themeToggle');
  const historyToggle = document.getElementById('historyToggle');
  const historyPanel = document.getElementById('historyPanel');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistory'); // ✅ coincide con index.html

  const required = { chatBox, userInput, sendButton, apiKeyInput, saveApiKeyBtn, providerSelect };
  const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error('[INIT] Faltan elementos del DOM:', missing.join(', '));
    return;
  }

  let PROVIDER = localStorage.getItem('PROVIDER') || 'deepseek';
  let OPENAI_API_KEY = localStorage.getItem('OPENAI_API_KEY') || '';
  let DEEPSEEK_API_KEY = localStorage.getItem('DEEPSEEK_API_KEY') || '';
  let CLAUDE_API_KEY = localStorage.getItem('CLAUDE_API_KEY') || '';

  let queryHistory = JSON.parse(localStorage.getItem('queryHistory') || '[]');
  let lastUserMessageText = null;
  let lastBotMessageText = null;

  function persistHistory() {
    localStorage.setItem('queryHistory', JSON.stringify(queryHistory));
  }

  function getCurrentApiKey() {
    if (PROVIDER === 'openai') return OPENAI_API_KEY.trim();
    if (PROVIDER === 'claude') return CLAUDE_API_KEY.trim();
    return DEEPSEEK_API_KEY.trim();
  }

  async function addMessage(sender, text) {
    const el = document.createElement('div');
    el.className = `message ${sender}`;

    if (sender === 'bot') {
      el.dataset.rawMarkdown = text || '';
      await renderBotMarkdown(text, el);
      lastBotMessageText = text;
    } else {
      el.textContent = text;
      lastUserMessageText = text;
    }

    chatBox.appendChild(el);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function rerenderBotMessagesForTheme() {
    const botMessages = chatBox.querySelectorAll('.message.bot[data-raw-markdown]');
    for (const msg of botMessages) {
      await renderBotMarkdown(msg.dataset.rawMarkdown || '', msg);
    }
  }

  function updateHistoryList() {
    if (!historyList) return;
    historyList.innerHTML = '';
    [...queryHistory].reverse().forEach((q) => {
      const li = document.createElement('li');
      li.textContent = q;
      historyList.appendChild(li);
    });
  }

  // Modelos Claude sugeridos
  const CLAUDE_MODELS = {
    quick: 'claude-haiku-4-5',
    refactor: 'claude-sonnet-4-6',
    complex: 'claude-opus-4-6'
  };

  function pickClaudeModel(question) {
    const q = (question || '').toLowerCase();
    if (q.includes('arquitectura') || q.includes('complejo') || q.includes('diseño')) {
      return CLAUDE_MODELS.complex;
    }
    if (q.includes('refactor') || q.includes('debug') || q.includes('explica')) {
      return CLAUDE_MODELS.refactor;
    }
    return CLAUDE_MODELS.quick;
  }

  async function queryTechnicalSources(question) {
    const messages = [
      {
        role: 'system',
        content: 'Eres un asistente especializado en desarrollo full-stack.'
      }
    ];

    if (lastUserMessageText && lastBotMessageText) {
      messages.push({ role: 'user', content: `Contexto previo (pregunta): ${lastUserMessageText}` });
      messages.push({ role: 'assistant', content: `Contexto previo (respuesta): ${lastBotMessageText}` });
    }

    messages.push({ role: 'user', content: question });

    if (PROVIDER === 'claude') {
      const model = pickClaudeModel(question);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': getCurrentApiKey(),
          'anthropic-version': '2023-06-01',
          // Necesario si llamas directo desde navegador (riesgoso para producción)
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model,
          max_tokens: 2048,
          system: messages[0].content,
          messages: messages
            .filter(m => m.role !== 'system')
            .map(m => ({
              role: m.role === 'assistant' ? 'assistant' : 'user',
              content: m.content
            }))
        })
      });

      if (!response.ok) {
        const raw = await response.text();
        throw new Error(`Claude ${response.status} - ${raw}`);
      }

      const data = await response.json();
      return data?.content?.[0]?.text || 'Sin respuesta.';
    }

    const url = PROVIDER === 'openai'
      ? 'https://api.openai.com/v1/chat/completions'
      : 'https://api.deepseek.com/v1/chat/completions';

    const model = PROVIDER === 'openai' ? 'gpt-4o' : 'deepseek-coder-v2';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCurrentApiKey()}`
      },
      body: JSON.stringify({
        model: PROVIDER === 'openai' ? 'gpt-4o' : 'deepseek-chat',
        messages,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const raw = await response.text();
      throw new Error(`${PROVIDER} ${response.status} - ${raw}`);
    }
    const data = await response.json();
    return data?.choices?.[0]?.message?.content || 'Sin respuesta.';
  }

  async function handleSend(e) {
    if (e) e.preventDefault();
    const question = userInput.value.trim();
    if (!question) return;

    if (!getCurrentApiKey()) {
      addMessage('bot', `🔒 No hay API key para ${PROVIDER}.`);
      return;
    }

    sendButton.disabled = true;
    try {
      addMessage('user', question);
      userInput.value = '';

      queryHistory.push(question);
      if (queryHistory.length > 100) queryHistory = queryHistory.slice(-100);
      persistHistory();
      updateHistoryList();

      const answer = await queryTechnicalSources(question);
      addMessage('bot', answer);
    } catch (err) {
      console.error(err);
      addMessage('bot', `⚠️ Error al consultar: ${err.message}`);
    } finally {
      sendButton.disabled = false;
    }
  }

  // UI init
  providerSelect.value = PROVIDER;
  apiKeyInput.value = getCurrentApiKey();
  updateHistoryList();

  providerSelect.addEventListener('change', () => {
    PROVIDER = providerSelect.value;
    localStorage.setItem('PROVIDER', PROVIDER);
    apiKeyInput.value = getCurrentApiKey();
  });

  saveApiKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (PROVIDER === 'openai') {
      OPENAI_API_KEY = key; localStorage.setItem('OPENAI_API_KEY', key);
    } else if (PROVIDER === 'claude') {
      CLAUDE_API_KEY = key; localStorage.setItem('CLAUDE_API_KEY', key);
    } else {
      DEEPSEEK_API_KEY = key; localStorage.setItem('DEEPSEEK_API_KEY', key);
    }
    addMessage('bot', `🔐 API key de ${PROVIDER} guardada.`);
  });

  sendButton.addEventListener('click', handleSend);
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', async () => {
      document.body.classList.toggle('dark-theme');
      await rerenderBotMessagesForTheme(); // 👈 sincroniza tema Shiki en bloques ya renderizados
    });
  }

  if (historyToggle && historyPanel) {
    historyToggle.addEventListener('click', () => historyPanel.classList.toggle('active'));
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      queryHistory = [];
      persistHistory();
      updateHistoryList();
      addMessage('bot', '🧹 Historial limpiado.');
    });
  }

  // Devtools server (solo Electron)
  const startServerBtn = document.getElementById('startServerBtn');
  const stopServerBtn = document.getElementById('stopServerBtn');
  const serverStatus = document.getElementById('serverStatus');

  if (window.electronAPI?.devtools && startServerBtn && stopServerBtn) {
    startServerBtn.addEventListener('click', async () => {
      try {
        const res = await window.electronAPI.devtools.startServer({ port: 3000 });
        if (serverStatus) serverStatus.textContent = `Server: ${res?.url || 'iniciado'}`;
      } catch (e) {
        if (serverStatus) serverStatus.textContent = `Server error`;
      }
    });

    stopServerBtn.addEventListener('click', async () => {
      try {
        await window.electronAPI.devtools.stopServer();
        if (serverStatus) serverStatus.textContent = 'Server: detenido';
      } catch {
        if (serverStatus) serverStatus.textContent = 'Server: error';
      }
    });
  }

});
