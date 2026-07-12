import { api } from './api.js';

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

/* ── Envío con streaming SSE ── */
export async function sendMessageStream(content, conversationId, store, {
  onChunk     = () => {},
  onStart     = () => {},
  onDone      = () => {},
  onError     = () => {},
  signal      = null,   // AbortController.signal para cancelar el stream
  fileName    = null,   // nombre del archivo adjunto (si existe)
  fileContent = null,   // texto extraído del archivo (si existe)
} = {}) {
  store.set('loading', true);

  const port = window.location.port;
  let base;
  if (window.Capacitor)        base = 'https://guyunusa.uy/api/v1';
  else if (window.electronAPI) base = 'http://localhost:3000/api/v1';
  else if (port && port !== '3000') base = `http://${window.location.hostname}:3000/api/v1`;
  else                          base = '/api/v1';

  const token = localStorage.getItem('guyunusa_token');
  const headers = {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    // Usar la señal del usuario si existe, si no el timeout solo
    // Construir body — incluir archivo solo si ambos campos están presentes
    const body = { content, conversation_id: conversationId };
    if (fileName && fileContent) {
      body.file_name    = fileName;
      body.file_content = fileContent;
    }

    const res = await fetch(`${base}/chat/stream`, {
      method:  'POST',
      headers,
      body:    JSON.stringify(body),
      signal:  signal || AbortSignal.timeout(60_000),
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
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('event: ')) continue;
        if (!line.startsWith('data: '))  continue;

        const raw = line.slice(6).trim();
        if (!raw) continue;

        try {
          const evt = JSON.parse(raw);
          if ('text' in evt)              onChunk(evt.text);
          else if ('conversation_id' in evt && !('full_content' in evt))
                                          onStart(evt.conversation_id);
          else if ('full_content' in evt) onDone(evt.conversation_id, evt.provider);
          else if ('message' in evt)      onError(evt.message);
        } catch { /* ignorar JSON malformado */ }
      }
    }

  } catch (err) {
    // AbortError es el usuario deteniendo — no es un error
    if (err.name === 'AbortError') return;
    onError(err.message || 'Error de conexión');
  } finally {
    store.set('loading', false);
  }
}

/**
 * Carga conversaciones del usuario actual.
 * Verifica que el usuario no cambió durante la llamada async
 * para evitar que conversaciones de un usuario se muestren en otro.
 */
export async function loadConversations(store) {
  const userId = store.get('user')?.id;
  if (!userId) return [];

  const data = await api.get('/chat/conversations');

  // Verificar que el usuario no cambió mientras esperábamos la respuesta
  const currentUserId = store.get('user')?.id;
  if (currentUserId !== userId) {
    console.warn('[chat] Usuario cambió durante loadConversations — descartando respuesta');
    return [];
  }

  store.set('conversations', data.conversations);
  return data.conversations;
}

/**
 * Carga mensajes de una conversación.
 * Verifica ownership: el usuario actual debe ser el mismo que inició la carga.
 */
export async function loadMessages(conversationId, store) {
  const userId = store.get('user')?.id;
  if (!userId) throw new Error('No hay usuario autenticado');

  const data = await api.get(`/chat/conversations/${conversationId}`);

  // Verificar que el usuario no cambió
  const currentUserId = store.get('user')?.id;
  if (currentUserId !== userId) {
    console.warn('[chat] Usuario cambió durante loadMessages — descartando respuesta');
    return null;
  }

  store.update({ messages: data.messages, activeConvId: conversationId });
  return data;
}

export async function deleteConversation(id, store) {
  await api.delete(`/chat/conversations/${id}`);
  const convs = store.get('conversations').filter(c => c.id !== id);
  store.update({ conversations: convs });
  if (store.get('activeConvId') === id) store.update({ activeConvId: null, messages: [] });
}
