/*
 * ai.service.js — Servicio de IA (DeepSeek único proveedor)
 *
 * v3.0 — OpenRouter eliminado. DeepSeek es el único proveedor.
 *   - Sin failover: si DeepSeek falla, se reporta directamente.
 *   - Timeout de conexión inteligente (30s) según plan del usuario.
 *   - Una vez que el streaming empieza, sin timeout duro — el controller
 *     se encarga de manejar la duración según el plan.
 */
import { logger } from '../utils/logger.js';
import * as constants from '../../../shared/constants.js';
const { getPlanConfig } = constants;

const DEEPSEEK = {
  baseURL: () => process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
  apiKey: () => process.env.DEEPSEEK_API_KEY,
  model:  () => process.env.DEEPSEEK_MODEL || 'deepseek-v4-pro',
};

/**
 * callDeepSeek — Llama a DeepSeek.
 *
 * @param {Array}   messages
 * @param {boolean} stream
 * @param {object}  planConfig — configuración del plan del usuario
 * @returns {Response}
 */
async function callDeepSeek(messages, stream = false, planConfig = null, modelOverride = null) {
  const apiKey = DEEPSEEK.apiKey();
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY no configurada');

  const baseURL = DEEPSEEK.baseURL();
  const model   = modelOverride || DEEPSEEK.model();
  const config  = planConfig || getPlanConfig('free');

  const body = {
    model,
    messages,
    stream,
    temperature: config.temperature ?? 0.6,
    max_tokens:  config.maxOutputTokens ?? 2048,
  };

  // DeepSeek soporta stream_options para devolver usage en streaming
  if (stream) {
    body.stream_options = { include_usage: true };
  }

  // ── Timeout inteligente ──
  // Solo timeout de CONEXIÓN: si no responde en 30s, abortar.
  // Una vez que fetch() resuelve (primer byte), cancelar el timeout
  // para que el streaming corra sin límite de tiempo.
  const connectionTimeout = config.connectionTimeoutMs || 30_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), connectionTimeout);

  let response;
  try {
    response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }

  // Conexión establecida — cancelar timeout (streaming sin límite)
  clearTimeout(timer);

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`deepseek error ${response.status}: ${err}`);
  }

  return response;
}

/**
 * chat — Respuesta completa sin streaming (fallback).
 */
export async function chat(messages, planConfig = null, modelOverride = null) {
  try {
    logger.info(`Chat desde: deepseek (modelo: ${modelOverride || 'default'})`);
    const response = await callDeepSeek(messages, false, planConfig, modelOverride);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    const usage = data.usage || {};

    logger.info(`Respuesta OK desde deepseek (${usage.total_tokens ?? 0} tokens)`);
    return {
      content,
      provider: 'deepseek',
      tokens: usage.total_tokens ?? 0,
      promptTokens: usage.prompt_tokens ?? 0,
      completionTokens: usage.completion_tokens ?? 0,
      finishReason: data.choices?.[0]?.finish_reason ?? 'stop',
    };
  } catch (err) {
    logger.error(`DeepSeek falló: ${err.message}`);
    throw new Error(`DeepSeek no disponible: ${err.message}`);
  }
}

/**
 * chatStream — Inicia streaming con DeepSeek.
 * Devuelve la respuesta fetch para que el controller la lea chunk a chunk.
 */
export async function chatStream(messages, planConfig = null, modelOverride = null) {
  try {
    logger.info(`Streaming desde: deepseek (modelo: ${modelOverride || 'default'})`);
    const response = await callDeepSeek(messages, true, planConfig, modelOverride);
    return { response, provider: 'deepseek' };
  } catch (err) {
    logger.error(`Stream deepseek falló: ${err.message}`);
    throw new Error(`Streaming no disponible: ${err.message}`);
  }
}
