import { api }    from './api.js';

/* ── Envío clásico (fallback sin streaming) ── */
export async function sendMessage(content, conversationId, store) {
  store.set('loading', true);
  try {
    const data = await api.post('/chat/message', {
      content,
      conversation_id: conversationId,
    });
    return data;
  } finally {
    store.set('loading', false);
  }
}

/* ── Envío con streaming SSE ─────────────────────────────────────────
   Llama a POST /api/v1/chat/stream y procesa los eventos SSE
   en tiempo real.

   Callbacks:
     onChunk(text)              → texto parcial recibido
     onStart(conversationId)    → nueva conversación creada (si era nueva)
     onDone(conversationId, provider) → stream completo
     onError(message)           → error del servidor o red
   ────────────────────────────────────────────────────────────────── */
export async function sendMessageStream(content, conversationId, store, {
  onChunk  = () => {},
  onStart  = () => {},
  onDone   = () => {},
  onError  = () => {},
} = {}) {
  store.set('loading', true);

  // Obtener la URL base de api.js replicando su lógica
  const port = window.location.port;
  let base;
  if (window.Capacitor)       base = 'https://api.guyunusa.uy/api/v1';
  else if (window.electronAPI) base = 'http://localhost:3000/api/v1';
  else if (port && port !== '3000') base = `http://${window.location.hostname}:3000/api/v1`;
  else                         base = '/api/v1';

  const token = localStorage.getItem('guyunusa_token');
  const headers = {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const res = await fetch(`${base}/chat/stream`, {
      method:  'POST',
      headers,
      body:    JSON.stringify({ content, conversation_id: conversationId }),
      signal:  AbortSignal.timeout(60_000), // 60s para streams largos
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    const reader  = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let   buffer  = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // guardar línea incompleta

      for (const line of lines) {
        if (line.startsWith('event: ')) continue; // nombre del evento (ya lo sabemos)
        if (!line.startsWith('data: '))  continue;

        const raw = line.slice(6).trim();
        if (!raw) continue;

        try {
          const evt = JSON.parse(raw);

          // Detectar el tipo de evento por su contenido
          if ('text' in evt)              onChunk(evt.text);
          else if ('conversation_id' in evt && !('full_content' in evt))
                                          onStart(evt.conversation_id);
          else if ('full_content' in evt) onDone(evt.conversation_id, evt.provider);
          else if ('message' in evt)      onError(evt.message);
        } catch { /* ignorar JSON malformado */ }
      }
    }

  } catch (err) {
    onError(err.message || 'Error de conexión');
  } finally {
    store.set('loading', false);
  }
}

/* ── Resto de funciones sin cambios ── */

export async function loadConversations(store) {
  const data = await api.get('/chat/conversations');
  store.set('conversations', data.conversations);
  return data.conversations;
}

export async function loadMessages(conversationId, store) {
  const data = await api.get(`/chat/conversations/${conversationId}`);
  store.update({ messages: data.messages, activeConvId: conversationId });
  return data;
}

export async function deleteConversation(id, store) {
  await api.delete(`/chat/conversations/${id}`);
  const convs = store.get('conversations').filter(c => c.id !== id);
  store.update({ conversations: convs });
  if (store.get('activeConvId') === id) store.update({ activeConvId: null, messages: [] });
}
