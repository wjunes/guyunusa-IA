/**
 * usage.service.js — Registro y consulta de consumo de tokens
 *
 * Punto único de acceso para:
 *   - Consultar cuota diaria disponible de un usuario
 *   - Registrar consumo de tokens (prompt + completion)
 *   - Verificar si el usuario puede hacer una nueva consulta
 *
 * Usa la tabla `token_usage` con un registro por usuario por día.
 * Se actualiza con INSERT ... ON DUPLICATE KEY UPDATE para atomicidad.
 */
import { getDB } from '../db/database.js';
import { getPlanConfig, TOKEN_ESTIMATION } from '../../../shared/constants.js';
import { logger } from '../utils/logger.js';

/**
 * getDailyUsage — Obtiene el consumo del día para un usuario.
 * @param {number} userId
 * @returns {{ totalTokens, requestCount, remaining, limit, canQuery }}
 */
export async function getDailyUsage(userId, plan = 'free') {
  const db      = getDB();
  const config  = getPlanConfig(plan);
  const today   = new Date().toISOString().slice(0, 10);

  const row = await db.prepare(
    'SELECT total_tokens, request_count FROM token_usage WHERE user_id = ? AND usage_date = ?'
  ).get(userId, today);

  const totalTokens  = row?.total_tokens  ?? 0;
  const requestCount = row?.request_count ?? 0;
  const remaining    = Math.max(0, config.dailyTokenLimit - totalTokens);

  return {
    totalTokens,
    requestCount,
    remaining,
    limit: config.dailyTokenLimit,
    canQuery: remaining > 0,
  };
}

/**
 * checkQuota — Verifica si el usuario tiene cuota disponible.
 * Lanza un error con status 429 si la cuota se agotó.
 * @param {number} userId
 * @param {string} plan
 */
export async function checkQuota(userId, plan = 'free') {
  const usage = await getDailyUsage(userId, plan);
  if (!usage.canQuery) {
    const err = new Error(
      plan === 'free'
        ? 'Alcanzaste tu límite diario de uso. Volvé mañana o actualizá a Pro para más capacidad.'
        : 'Alcanzaste tu límite diario de uso.'
    );
    err.status = 429;
    err.code   = 'QUOTA_EXCEEDED';
    throw err;
  }
  return usage;
}

/**
 * recordUsage — Registra el consumo de tokens de una respuesta.
 * Usa INSERT ... ON DUPLICATE KEY UPDATE para atomicidad (MySQL).
 *
 * @param {number} userId
 * @param {number} promptTokens    — tokens del prompt (system + history + user)
 * @param {number} completionTokens — tokens de la respuesta generada
 */
export async function recordUsage(userId, promptTokens = 0, completionTokens = 0) {
  const db    = getDB();
  const today = new Date().toISOString().slice(0, 10);
  const total = promptTokens + completionTokens;

  try {
    await db.prepare(`
      INSERT INTO token_usage (user_id, usage_date, prompt_tokens, completion_tokens, total_tokens, request_count)
      VALUES (?, ?, ?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE
        prompt_tokens     = prompt_tokens + VALUES(prompt_tokens),
        completion_tokens = completion_tokens + VALUES(completion_tokens),
        total_tokens      = total_tokens + VALUES(total_tokens),
        request_count     = request_count + 1,
        updated_at        = CURRENT_TIMESTAMP
    `).run(userId, today, promptTokens, completionTokens, total);

    logger.info(`[usage] user=${userId} +${total} tokens (prompt=${promptTokens}, completion=${completionTokens})`);
  } catch (err) {
    // No bloquear el flujo si falla el registro — logear y continuar
    logger.error(`[usage] Error registrando consumo user=${userId}: ${err.message}`);
  }
}

/**
 * estimateTokens — Estima tokens a partir de texto.
 * Se usa como fallback cuando el proveedor no devuelve `usage` (streaming).
 * @param {string} text
 * @returns {number}
 */
export function estimateTokens(text) {
  return TOKEN_ESTIMATION.estimate(text);
}

/**
 * estimateMessagesTokens — Estima tokens de un array de mensajes.
 * Útil para estimar el costo del prompt antes de enviar al proveedor.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {number}
 */
export function estimateMessagesTokens(messages) {
  if (!messages?.length) return 0;
  // 4 tokens overhead por mensaje (role, separadores)
  return messages.reduce((sum, msg) => {
    return sum + estimateTokens(msg.content || '') + 4;
  }, 0);
}
