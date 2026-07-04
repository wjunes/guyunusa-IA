import { getDB }          from '../db/database.js';
import { chat,
         chatStream }     from '../services/ai.service.js';
import { SYSTEM_PROMPT }  from '../../../shared/systemPrompt.js';
import { HTTP_STATUS, ERRORS, FREE_DAILY_LIMIT } from '../../../shared/constants.js';
import { logger }         from '../utils/logger.js';

const NOW = `datetime('now')`;

/* ── Helper compartido: validar límite, crear/obtener conversación, guardar mensaje user ── */
function prepareChat(userId, content, conversation_id) {
  const db   = getDB();
  const user = db.prepare('SELECT plan, username FROM users WHERE id = ?').get(userId);

  if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 401 });

  if (user.plan === 'free') {
    const today = new Date().toISOString().slice(0, 10);
    const count = db.prepare(
      `SELECT COUNT(*) AS n FROM messages m
       JOIN conversations c ON m.conversation_id = c.id
       WHERE c.user_id = ? AND m.role = 'user' AND date(m.created_at) = ?`
    ).get(userId, today);
    if ((count?.n ?? 0) >= FREE_DAILY_LIMIT) {
      throw Object.assign(new Error(ERRORS.RATE_LIMITED), { status: 400 });
    }
  }

  let convId = conversation_id ? Number(conversation_id) : null;
  if (!convId) {
    const result = db.prepare(
      'INSERT INTO conversations (user_id, title) VALUES (?, ?)'
    ).run(userId, content.slice(0, 60));
    convId = result.lastInsertRowid;
    logger.info(`Nueva conversación: id=${convId}`);
  } else {
    // Verificar que la conversación pertenece al usuario actual
    const owns = db.prepare(
      'SELECT id FROM conversations WHERE id = ? AND user_id = ?'
    ).get(convId, userId);
    if (!owns) {
      throw Object.assign(
        new Error('Conversación no encontrada o sin permiso'),
        { status: 403 }
      );
    }
  }

  db.prepare(
    'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)'
  ).run(convId, 'user', content);

  const history = db.prepare(
    'SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY id DESC LIMIT 20'
  ).all(convId).reverse();

  const userContext = `\n\n## Usuario actual\nEstás hablando con ${user.username}. Podés llamarle por su nombre o apodo cuando sea natural hacerlo.`;
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT + userContext },
    ...history,
  ];

  return { db, convId, messages, username: user.username };
}

/* ── Helper: guardar respuesta y actualizar conversación ── */
function saveResponse(db, convId, content, provider, tokens, userContent) {
  db.prepare(
    'INSERT INTO messages (conversation_id, role, content, provider, tokens_used) VALUES (?, ?, ?, ?, ?)'
  ).run(convId, 'assistant', content, provider, tokens ?? 0);

  const msgCount = db.prepare(
    'SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ?'
  ).get(convId);

  if ((msgCount?.n ?? 0) <= 2) {
    db.prepare(`UPDATE conversations SET title = ?, updated_at = ${NOW} WHERE id = ?`)
      .run(userContent.slice(0, 60), convId);
  } else {
    db.prepare(`UPDATE conversations SET updated_at = ${NOW} WHERE id = ?`)
      .run(convId);
  }
}

/* ══════════════════════════════════════════════
   ENDPOINT CLÁSICO (sin streaming) — se mantiene
   ══════════════════════════════════════════════ */
export async function sendMessage(req, res) {
  const { conversation_id, content } = req.body;
  if (!content?.trim()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ ok: false, message: 'El mensaje no puede estar vacío' });
  }

  try {
    const { db, convId, messages } = prepareChat(req.user.id, content, conversation_id);
    const { content: reply, provider, tokens } = await chat(messages);
    saveResponse(db, convId, reply, provider, tokens, content);

    return res.json({
      ok: true,
      conversation_id: convId,
      message: { role: 'assistant', content: reply },
      provider,
    });
  } catch (err) {
    logger.error('Error en sendMessage:', err.message);
    const status = err.status || HTTP_STATUS.SERVER_ERROR;
    return res.status(status).json({ ok: false, message: err.message });
  }
}

/* ══════════════════════════════════════════════
   ENDPOINT STREAMING SSE
   POST /api/v1/chat/stream
   ══════════════════════════════════════════════ */
export async function sendMessageStream(req, res) {
  const { conversation_id, content } = req.body;

  if (!content?.trim()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ ok: false, message: 'El mensaje no puede estar vacío' });
  }

  // ── Configurar cabeceras SSE ──
  res.setHeader('Content-Type',  'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection',    'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // deshabilitar buffer en nginx
  res.flushHeaders();

  // Helper para enviar eventos SSE
  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  let db, convId, fullContent = '', provider = 'unknown';

  try {
    const prepared = prepareChat(req.user.id, content, conversation_id);
    db     = prepared.db;
    convId = prepared.convId;

    // Notificar al cliente el ID de conversación (puede ser nuevo)
    send('start', { conversation_id: convId });

    // ── Obtener stream de la IA ──
    const { response, provider: prov } = await chatStream(prepared.messages);
    provider = prov;

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    // ── Leer chunks del stream ──
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') continue;

        try {
          const parsed = JSON.parse(raw);
          const delta  = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            fullContent += delta;
            send('chunk', { text: delta });
          }
        } catch { /* ignorar líneas malformadas */ }
      }
    }

    // ── Stream terminado: guardar en DB y notificar ──
    saveResponse(db, convId, fullContent, provider, 0, content);
    send('done', {
      conversation_id: convId,
      provider,
      full_content: fullContent,
    });

  } catch (err) {
    logger.error('Error en stream:', err.message);
    send('error', { message: err.message || ERRORS.AI_UNAVAILABLE });
  } finally {
    res.end();
  }
}

/* ── Resto de endpoints sin cambios ── */

export function getConversations(req, res) {
  try {
    const db    = getDB();
    const convs = db.prepare(
      'SELECT id, title, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC'
    ).all(req.user.id);
    return res.json({ ok: true, conversations: convs });
  } catch (err) {
    logger.error('Error en getConversations:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}

export function getMessages(req, res) {
  try {
    const db     = getDB();
    const convId = Number(req.params.id);
    const conv   = db.prepare(
      'SELECT * FROM conversations WHERE id = ? AND user_id = ?'
    ).get(convId, req.user.id);

    if (!conv) return res.status(HTTP_STATUS.NOT_FOUND).json({ ok: false, message: 'Conversación no encontrada' });

    const messages = db.prepare(
      'SELECT id, role, content, provider, created_at FROM messages WHERE conversation_id = ? ORDER BY id ASC'
    ).all(convId);

    return res.json({ ok: true, conversation: conv, messages });
  } catch (err) {
    logger.error('Error en getMessages:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}

export function deleteConversation(req, res) {
  try {
    const db     = getDB();
    const convId = Number(req.params.id);
    const conv   = db.prepare(
      'SELECT id FROM conversations WHERE id = ? AND user_id = ?'
    ).get(convId, req.user.id);

    if (!conv) return res.status(HTTP_STATUS.NOT_FOUND).json({ ok: false, message: 'Conversación no encontrada' });

    db.prepare('DELETE FROM conversations WHERE id = ?').run(convId);
    return res.json({ ok: true, message: 'Conversación eliminada' });
  } catch (err) {
    logger.error('Error en deleteConversation:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}
