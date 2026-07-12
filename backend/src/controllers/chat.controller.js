import { getDB, withTransaction } from '../db/database.js';
import {
  chat,
  chatStream
} from '../services/ai.service.js';
import { extractText }   from '../services/fileExtractor.service.js';
import { unlink }        from 'fs/promises';
import { SYSTEM_PROMPT } from '../../../shared/systemPrompt.js';
import { HTTP_STATUS, ERRORS, FREE_DAILY_LIMIT } from '../../../shared/constants.js';
import { logger } from '../utils/logger.js';

/* ══════════════════════════════════════════════════════════════════
   UPLOAD DE ARCHIVO PARA CHAT
   POST /api/v1/chat/file
   Recibe multipart/form-data { file }.
   Extrae el texto y lo devuelve al frontend; NO guarda en BD.
   ══════════════════════════════════════════════════════════════════ */
export async function processFileUpload(req, res) {
  if (!req.file) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      ok: false,
      message: 'No se recibió ningún archivo',
    });
  }

  try {
    const result = await extractText(req.file);
    logger.info(`Archivo procesado: ${result.filename} (${result.size} bytes, método: ${result.method})`);
    return res.json({ ok: true, ...result });
  } catch (err) {
    logger.warn(`Error procesando archivo: ${err.message}`);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ ok: false, message: err.message });
  } finally {
    // Siempre limpiar el archivo temporal de multer
    unlink(req.file.path).catch(() => {});
  }
}

/* ══════════════════════════════════════════════════════════════════
   HELPERS INTERNOS
   ══════════════════════════════════════════════════════════════════ */

/**
 * prepareChat — valida límite, crea/verifica conversación,
 * guarda mensaje del usuario y arma el array de mensajes para la IA.
 *
 * @param {number} userId
 * @param {string} content        — texto del usuario (se guarda en BD tal cual)
 * @param {number|null} conversation_id
 * @param {object|null} fileContext — { fileName, fileContent, truncated }
 */
async function prepareChat(userId, content, conversation_id, fileContext = null) {
  return withTransaction(async (db) => {
    const user = await db.prepare('SELECT plan, username FROM users WHERE id = ?').get(userId);

    if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 401 });

    // Verificar límite plan free
    if (user.plan === 'free') {
      const today = new Date().toISOString().slice(0, 10);
      const count = await db.prepare(
        `SELECT COUNT(*) AS n FROM messages m
         JOIN conversations c ON m.conversation_id = c.id
         WHERE c.user_id = ? AND m.role = 'user' AND DATE(m.created_at) = ?`
      ).get(userId, today);
      if ((count?.n ?? 0) >= FREE_DAILY_LIMIT) {
        throw Object.assign(new Error(ERRORS.RATE_LIMITED), { status: 400 });
      }
    }

    // Obtener o crear conversación
    let convId = conversation_id ? Number(conversation_id) : null;
    if (!convId) {
      const result = await db.prepare(
        'INSERT INTO conversations (user_id, title) VALUES (?, ?)'
      ).run(userId, content.slice(0, 60));
      convId = result.lastInsertRowid;
      logger.info(`Nueva conversación: id=${convId}`);
    } else {
      const owns = await db.prepare(
        'SELECT id FROM conversations WHERE id = ? AND user_id = ?'
      ).get(convId, userId);
      if (!owns) {
        throw Object.assign(
          new Error('Conversación no encontrada o sin permiso'),
          { status: 403 }
        );
      }
    }

    // Guardar mensaje del usuario en BD (solo su texto, sin el contenido del archivo)
    await db.prepare(
      'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)'
    ).run(convId, 'user', content);

    // Historial reciente para contexto de la IA
    const historyRows = await db.prepare(
      `SELECT m.role, m.content FROM messages m
       JOIN conversations c ON c.id = m.conversation_id
       WHERE m.conversation_id = ? AND c.user_id = ?
       ORDER BY m.id DESC LIMIT 20`
    ).all(convId, userId);
    const history = historyRows.reverse();

    // Sistema + contexto del usuario
    const userContext = `\n\n## Usuario actual\nEstás hablando con ${user.username}. Podés llamarle por su nombre o apodo cuando sea natural hacerlo.`;
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + userContext },
      ...history,
    ];

    // Si hay archivo adjunto, reemplazar el último mensaje del usuario
    // (ya guardado en BD como text puro) con una versión enriquecida que incluye el contenido
    if (fileContext?.fileContent) {
      const { fileName, fileContent, truncated } = fileContext;
      const truncNote = truncated
        ? '\n\n> ⚠ El archivo fue truncado a 30.000 caracteres por ser muy largo.'
        : '';
      const lastUserIdx = messages.map(m => m.role).lastIndexOf('user');
      if (lastUserIdx >= 0) {
        messages[lastUserIdx] = {
          role: 'user',
          content:
            `El usuario adjuntó el archivo **${fileName}**:\n\n` +
            `\`\`\`\n${fileContent}\n\`\`\`` +
            truncNote +
            `\n\n${content}`,
        };
      }
    }

    return { convId, messages, username: user.username };
  });
}

/**
 * saveResponse — guarda la respuesta de la IA y actualiza el título/timestamp
 * de la conversación. Opera en su propia transacción (separada de prepareChat).
 */
async function saveResponse(convId, content, provider, tokens, userContent) {
  return withTransaction(async (db) => {
    await db.prepare(
      'INSERT INTO messages (conversation_id, role, content, provider, tokens_used) VALUES (?, ?, ?, ?, ?)'
    ).run(convId, 'assistant', content, provider, tokens ?? 0);

    const msgCount = await db.prepare(
      'SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ?'
    ).get(convId);

    if ((msgCount?.n ?? 0) <= 2) {
      await db.prepare(`UPDATE conversations SET title = ?, updated_at = NOW() WHERE id = ?`)
        .run(userContent.slice(0, 60), convId);
    } else {
      await db.prepare(`UPDATE conversations SET updated_at = NOW() WHERE id = ?`)
        .run(convId);
    }
  });
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
    const { convId, messages } = await prepareChat(req.user.id, content, conversation_id);
    const { content: reply, provider, tokens } = await chat(messages);
    await saveResponse(convId, reply, provider, tokens, content);

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

/* ══════════════════════════════════════════════════════════════════
   ENDPOINT STREAMING SSE
   POST /api/v1/chat/stream
   Body: { content, conversation_id?, file_name?, file_content? }
   ══════════════════════════════════════════════════════════════════ */
export async function sendMessageStream(req, res) {
  const { conversation_id, content, file_name, file_content } = req.body;

  if (!content?.trim()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ ok: false, message: 'El mensaje no puede estar vacío' });
  }

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  let convId, fullContent = '', provider = 'unknown';

  try {
    // Construir contexto de archivo si viene en el body
    const fileContext = (file_name && file_content)
      ? { fileName: file_name, fileContent: file_content, truncated: false }
      : null;

    const prepared = await prepareChat(req.user.id, content, conversation_id, fileContext);
    convId = prepared.convId;

    send('start', { conversation_id: convId });

    const { response, provider: prov } = await chatStream(prepared.messages);
    provider = prov;

    const reader  = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

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

    await saveResponse(convId, fullContent, provider, 0, content);
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

/* ── Resto de endpoints ── */

export async function getConversations(req, res) {
  try {
    const db = getDB();
    const convs = await db.prepare(
      'SELECT id, title, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC'
    ).all(req.user.id);
    return res.json({ ok: true, conversations: convs });
  } catch (err) {
    logger.error('Error en getConversations:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}

export async function getMessages(req, res) {
  try {
    const db = getDB();
    const convId = Number(req.params.id);
    const conv = await db.prepare(
      'SELECT * FROM conversations WHERE id = ? AND user_id = ?'
    ).get(convId, req.user.id);

    if (!conv) return res.status(HTTP_STATUS.NOT_FOUND).json({ ok: false, message: 'Conversación no encontrada' });

    const messages = await db.prepare(
      'SELECT id, role, content, provider, created_at FROM messages WHERE conversation_id = ? ORDER BY id ASC'
    ).all(convId);

    return res.json({ ok: true, conversation: conv, messages });
  } catch (err) {
    logger.error('Error en getMessages:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}

export async function deleteConversation(req, res) {
  try {
    const db = getDB();
    const convId = Number(req.params.id);
    const conv = await db.prepare(
      'SELECT id FROM conversations WHERE id = ? AND user_id = ?'
    ).get(convId, req.user.id);

    if (!conv) return res.status(HTTP_STATUS.NOT_FOUND).json({ ok: false, message: 'Conversación no encontrada' });

    await db.prepare('DELETE FROM conversations WHERE id = ?').run(convId);
    return res.json({ ok: true, message: 'Conversación eliminada' });
  } catch (err) {
    logger.error('Error en deleteConversation:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}
