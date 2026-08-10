import { getDB, withTransaction } from '../db/database.js';
import {
  chat,
  chatStream
} from '../services/ai.service.js';
import { extractText } from '../services/fileExtractor.service.js';
import { buildKnowledgeContext } from '../services/knowledge.service.js';
import { buildWebContext, isWebSearchQuery } from '../services/websearch.service.js';
import { recordUsage, checkQuota, getDailyUsage,
         estimateTokens, estimateMessagesTokens } from '../services/usage.service.js';
import { unlink } from 'fs/promises';
import * as constants from '../../../shared/constants.js';
const { HTTP_STATUS, ERRORS, FREE_DAILY_LIMIT, getPlanConfig,
        SYSTEM_DEFAULTS, TOKEN_ESTIMATION } = constants;

import { SYSTEM_PROMPT } from '../../../shared/systemPrompt.js';

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
    unlink(req.file.path).catch(() => { });
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
async function prepareChat(userId, content, conversation_id, fileContext = null, planConfig = null) {
  return withTransaction(async (db) => {
    const user = await db.prepare('SELECT plan, username FROM users WHERE id = ?').get(userId);

    if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 401 });

    // ── Fase 3: Verificar cuota diaria por TOKENS ──
    const planName = user.plan || 'free';
    const config   = planConfig || getPlanConfig(planName);
    await checkQuota(userId, planName);

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

    // Guardar mensaje del usuario en BD
    await db.prepare(
      'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)'
    ).run(convId, 'user', content);

    // ── Fase 5: Historial limitado por plan ──
    const maxHistory = config.maxHistoryMessages || 10;
    const historyRows = await db.prepare(
      `SELECT m.role, m.content FROM messages m
       JOIN conversations c ON c.id = m.conversation_id
       WHERE m.conversation_id = ? AND c.user_id = ?
       ORDER BY m.id DESC LIMIT ?`
    ).all(convId, userId, maxHistory);
    let history = historyRows.reverse();

    // Sistema + contexto del usuario
    const userContext = `\n\n## Usuario actual\nEstás hablando con ${user.username}. Podés llamarle por su nombre o apodo cuando sea natural hacerlo.`;

    // ── RAG: buscar conocimiento uruguayo relevante ──
    let knowledgeContext = '';
    try {
      const kb = buildKnowledgeContext(content, { maxDocs: 4, maxChars: 12000 });
      if (kb) {
        knowledgeContext =
          `\n\n## Base de conocimiento uruguayo\n` +
          `Usá la siguiente información verificada de la Biblioteca del Conocimiento ` +
          `para responder con precisión. Si la consulta se relaciona con estos temas, ` +
          `basá tu respuesta en estos datos. No inventes información que no esté acá ` +
          `ni menciones que estás leyendo documentos — respondé con naturalidad.\n` +
          kb.context;
        logger.info(`Knowledge inyectado: ${kb.titulos.join(', ')}`);
      }
    } catch (err) {
      logger.warn(`Knowledge retriever: ${err.message}`);
    }

    // ── Búsqueda web: si el RAG no tiene resultados Y la consulta lo amerita ──
    let webContext = '';
    if (!knowledgeContext && isWebSearchQuery(content)) {
      try {
        const web = await buildWebContext(content, { count: 5, freshness: true });
        if (web) {
          webContext =
            `\n\n## Información de la web (búsqueda en tiempo real)\n` +
            `Encontré estos resultados actuales en la web. Usalos para dar una respuesta ` +
            `informada y actualizada. Podés mencionar las fuentes de forma natural ` +
            `(por ejemplo: "según [fuente]..."). No copies textualmente — resumí ` +
            `y respondé con tu estilo.\n` +
            web.context;
          logger.info(`Web search inyectado: ${web.sources.length} resultados`);
        }
      } catch (err) {
        logger.warn(`Web search: ${err.message}`);
      }
    }

    // ── Fase 5: Recortar historial si excede maxContextTokens del plan ──
    const systemContent = SYSTEM_PROMPT + userContext + knowledgeContext + webContext;
    const systemTokens  = estimateTokens(systemContent);
    const maxCtxTokens  = config.maxContextTokens || 12_000;
    const budgetForHistory = maxCtxTokens - systemTokens;

    if (budgetForHistory > 0) {
      // Recortar mensajes más viejos si el historial excede el presupuesto
      let historyTokens = 0;
      const trimmed = [];
      // Recorrer desde el más reciente al más viejo
      for (let i = history.length - 1; i >= 0; i--) {
        const msgTokens = estimateTokens(history[i].content) + 4;
        if (historyTokens + msgTokens > budgetForHistory) break;
        historyTokens += msgTokens;
        trimmed.unshift(history[i]);
      }
      if (trimmed.length < history.length) {
        logger.info(`[context] Historial recortado: ${history.length} → ${trimmed.length} msgs (plan ${planName}, max ${maxCtxTokens} tokens)`);
      }
      history = trimmed;
    }

    const messages = [
      { role: 'system', content: systemContent },
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

  const planConfig = getPlanConfig(req.user.plan || 'free');

  try {
    const { convId, messages } = await prepareChat(req.user.id, content, conversation_id, null, planConfig);
    const { content: reply, provider, promptTokens, completionTokens } = await chat(messages, planConfig);
    const totalTokens = (promptTokens || 0) + (completionTokens || 0);

    await saveResponse(convId, reply, provider, totalTokens, content);
    await recordUsage(req.user.id, promptTokens || 0, completionTokens || 0);

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
   HELPER: leer un stream de IA y enviar chunks por SSE
   Retorna { finishReason, contentDelta, promptTokens, completionTokens }
   ══════════════════════════════════════════════════════════════════ */
async function readStream(response, send) {
  const reader  = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let contentDelta    = '';
  let finishReason    = 'stop';
  let promptTokens    = 0;
  let completionTokens = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    for (const line of chunk.split('\n')) {
      if (!line.startsWith('data: ')) continue;
      const raw = line.slice(6).trim();
      if (raw === '[DONE]') continue;

      try {
        const parsed = JSON.parse(raw);
        const delta  = parsed.choices?.[0]?.delta?.content;
        if (delta) {
          contentDelta += delta;
          send('chunk', { text: delta });
        }
        const fr = parsed.choices?.[0]?.finish_reason;
        if (fr) finishReason = fr;
        if (parsed.usage) {
          promptTokens     = parsed.usage.prompt_tokens     || 0;
          completionTokens = parsed.usage.completion_tokens || 0;
        }
      } catch { /* ignorar */ }
    }
  }

  return { finishReason, contentDelta, promptTokens, completionTokens };
}

/* ══════════════════════════════════════════════════════════════════
   ENDPOINT STREAMING SSE — Fase 4: continuación automática
   POST /api/v1/chat/stream

   Cuando finish_reason === 'length' (el modelo se cortó por max_tokens):
   1. Verifica que quede cuota disponible
   2. Envía evento SSE 'continuing' al frontend
   3. Llama al modelo pidiendo que continúe desde donde quedó
   4. Repite hasta finish_reason === 'stop' o se acaben continuaciones
   5. La continuación es transparente para el usuario
   ══════════════════════════════════════════════════════════════════ */
export async function sendMessageStream(req, res) {
  const { conversation_id, content, file_name, file_content } = req.body;

  if (!content?.trim()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ ok: false, message: 'El mensaje no puede estar vacío' });
  }

  const userPlan   = req.user.plan || 'free';
  const planConfig = getPlanConfig(userPlan);

  res.setHeader('Content-Type',      'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control',     'no-cache, no-transform');
  res.setHeader('Connection',        'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const send = (event, data) => {
    try { res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`); }
    catch { /* cliente desconectado */ }
  };

  const heartbeat = setInterval(() => {
    try { res.write(`: heartbeat\n\n`); }
    catch { clearInterval(heartbeat); }
  }, SYSTEM_DEFAULTS.heartbeatIntervalMs || 15_000);

  let convId, fullContent = '', provider = 'unknown';
  let totalPromptTokens = 0, totalCompletionTokens = 0;

  try {
    const fileContext = (file_name && file_content)
      ? { fileName: file_name, fileContent: file_content, truncated: false }
      : null;

    const prepared = await prepareChat(req.user.id, content, conversation_id, fileContext, planConfig);
    convId = prepared.convId;

    const promptEstimate = estimateMessagesTokens(prepared.messages);

    send('start', { conversation_id: convId });

    // ── Primera generación ──
    const { response, provider: prov } = await chatStream(prepared.messages, planConfig);
    provider = prov;

    let result = await readStream(response, send);
    fullContent += result.contentDelta;
    totalPromptTokens     += result.promptTokens || promptEstimate;
    totalCompletionTokens += result.completionTokens || estimateTokens(result.contentDelta);

    // ── Loop de continuación automática ──
    let continuations = 0;
    const maxContinuations = planConfig.maxAutoContinuations || 2;

    while (result.finishReason === 'length' && continuations < maxContinuations) {
      continuations++;
      logger.info(`[continuation] #${continuations}/${maxContinuations} para conv=${convId}`);

      // Verificar que todavía hay cuota
      try {
        await checkQuota(req.user.id, userPlan);
      } catch {
        logger.info(`[continuation] Cuota agotada, deteniendo en continuación #${continuations}`);
        break;
      }

      // Notificar al frontend que estamos continuando
      send('continuing', { continuation: continuations, max: maxContinuations });

      // Armar mensajes de continuación:
      // system prompt original + historial + respuesta parcial + instrucción de continuar
      const contMessages = [
        ...prepared.messages,
        { role: 'assistant', content: fullContent },
        {
          role: 'user',
          content:
            'Continuá exactamente desde donde terminaste. ' +
            'No repitas nada de lo que ya dijiste. ' +
            'No agregues introducciones ni resúmenes de lo anterior. ' +
            'Continuá directamente con el texto que faltaba.',
        },
      ];

      try {
        const { response: contResp } = await chatStream(contMessages, planConfig);
        result = await readStream(contResp, send);
        fullContent += result.contentDelta;
        totalCompletionTokens += result.completionTokens || estimateTokens(result.contentDelta);
      } catch (contErr) {
        logger.warn(`[continuation] Error en continuación #${continuations}: ${contErr.message}`);
        break; // no perder lo que ya tenemos
      }
    }

    // ── Guardar respuesta completa y registrar consumo ──
    const finalPromptTokens     = totalPromptTokens;
    const finalCompletionTokens = totalCompletionTokens;

    await saveResponse(convId, fullContent, provider, finalPromptTokens + finalCompletionTokens, content);
    await recordUsage(req.user.id, finalPromptTokens, finalCompletionTokens);

    send('done', {
      conversation_id: convId,
      provider,
      full_content:    fullContent,
      finish_reason:   result.finishReason,
      continuations,
      usage: {
        prompt_tokens:     finalPromptTokens,
        completion_tokens: finalCompletionTokens,
        total_tokens:      finalPromptTokens + finalCompletionTokens,
      },
    });

  } catch (err) {
    logger.error(`Stream error (user=${req.user.id}):`, err.message);

    if (fullContent.trim() && convId && SYSTEM_DEFAULTS.savePartialOnError) {
      try {
        const partialTokens = estimateTokens(fullContent);
        await saveResponse(convId, fullContent, provider, partialTokens, content);
        await recordUsage(req.user.id, 0, partialTokens);
        logger.info(`[partial] Guardado parcial: ${fullContent.length} chars, ~${partialTokens} tokens`);
      } catch (saveErr) {
        logger.error(`[partial] Error guardando parcial: ${saveErr.message}`);
      }
    }

    const isTimeout = err.name === 'AbortError' ||
                      err.message?.includes('aborted') ||
                      err.message?.includes('timeout');

    if (isTimeout && fullContent.trim()) {
      send('done', {
        conversation_id: convId,
        provider,
        full_content:    fullContent,
        finish_reason:   'timeout_partial',
        partial:         true,
      });
    } else if (isTimeout) {
      send('error', { message: ERRORS.TIMEOUT_FRIENDLY });
    } else {
      const friendlyMessage = err.status === 429
        ? ERRORS.QUOTA_EXCEEDED
        : err.status === 400
          ? err.message
          : ERRORS.AI_UNAVAILABLE;
      send('error', { message: friendlyMessage });
    }
  } finally {
    clearInterval(heartbeat);
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

/* ══════════════════════════════════════════════════════════════════
   ENDPOINT DE CUOTA — Fase 3
   GET /api/v1/chat/quota
   Devuelve el consumo y cuota restante del usuario para el día.
   ══════════════════════════════════════════════════════════════════ */
export async function getQuota(req, res) {
  try {
    const planName = req.user.plan || 'free';
    const usage    = await getDailyUsage(req.user.id, planName);

    return res.json({
      ok:   true,
      plan: planName,
      usage: {
        totalTokens:  usage.totalTokens,
        requestCount: usage.requestCount,
        remaining:    usage.remaining,
        limit:        usage.limit,
        canQuery:     usage.canQuery,
        percentUsed:  usage.limit > 0
          ? Math.round((usage.totalTokens / usage.limit) * 100)
          : 0,
      },
    });
  } catch (err) {
    logger.error('Error en getQuota:', err.message);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ ok: false, message: err.message });
  }
}
