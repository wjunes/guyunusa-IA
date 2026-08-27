/*
 * ai.service.js — Servicio de IA con failover y timeout inteligente
 *
 * Fase 2: Separa timeout de CONEXIÓN (corto, para detectar proveedor caído)
 * del timeout de STREAMING (largo, controlado por plan del usuario).
 
 * El timeout de conexión aborta si el proveedor no responde en 30s.
 * Una vez que el streaming empieza, NO hay timeout duro — el controller
 * se encarga de manejar la duración según el plan.
 */
import { logger } from '../utils/logger.js';
import * as constants from '../../../shared/constants.js';
const { AI_PROVIDERS, getPlanConfig } = constants;

const PROVIDERS = {
  [AI_PROVIDERS.OPENROUTER]: {
    baseURL: () => process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    apiKey: () => process.env.OPENROUTER_API_KEY,
    model: () => process.env.OPENROUTER_MODEL || 'google/gemma-2-9b-it:free',
    headers: {
      'HTTP-Referer': 'https://guyunusa.uy',
      'X-Title': 'Guyunusa',
    },
  },
  [AI_PROVIDERS.DEEPSEEK]: {
    baseURL: () => process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
    apiKey: () => process.env.DEEPSEEK_API_KEY,
    model: () => process.env.DEEPSEEK_MODEL || 'deepseek-v4-pro',
    headers: {},
  },
};

/**
 * callProvider — Llama a un proveedor de IA.
 *
 * @param {string} providerKey
 * @param {Array}  messages
 * @param {boolean} stream
 * @param {object} planConfig — configuración del plan del usuario
 * @returns {Response}
 */
async function callProvider(providerKey, messages, stream = false, planConfig = null) {
  const providerDef = PROVIDERS[providerKey];
  // Resolver getters (funciones) en runtime
  const provider = {
    baseURL: providerDef.baseURL(),
    apiKey: providerDef.apiKey(),
    model: providerDef.model(),
    headers: providerDef.headers,
  };
  if (!provider.apiKey) throw new Error(`API key no configurada para ${providerKey}`);

  const config = planConfig || getPlanConfig('free');

  // ── Timeout inteligente ──
  // CONEXIÓN: timeout corto (15s) — si el proveedor no responde, failover rápido.
  // STREAMING: sin timeout aquí — el controller lo maneja según el plan.
  //            Una vez que fetch() resuelve, el stream está vivo y no debe cortarse.

  const body = {
    model: provider.model,
    messages,
    stream,
    temperature: config.temperature ?? 0.6,
    max_tokens: config.maxOutputTokens ?? 2048,
  };

  // DeepSeek soporta stream_options para devolver usage en streaming
  if (stream && providerKey === AI_PROVIDERS.DEEPSEEK) {
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
    response = await fetch(`${provider.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provider.apiKey}`,
        ...provider.headers,
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
    throw new Error(`${providerKey} error ${response.status}: ${err}`);
  }

  return response;
}

/**
 * chat — Respuesta completa sin streaming (fallback).
 */
export async function chat(messages, planConfig = null) {
  const order = [AI_PROVIDERS.DEEPSEEK, AI_PROVIDERS.OPENROUTER];
  let lastError;

  for (const providerKey of order) {
    try {
      logger.info(`Intentando proveedor: ${providerKey}`);
      const response = await callProvider(providerKey, messages, false, planConfig);
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? '';
      const usage = data.usage || {};

      logger.info(`Respuesta OK desde ${providerKey} (${usage.total_tokens ?? 0} tokens)`);
      return {
        content,
        provider: providerKey,
        tokens: usage.total_tokens ?? 0,
        promptTokens: usage.prompt_tokens ?? 0,
        completionTokens: usage.completion_tokens ?? 0,
        finishReason: data.choices?.[0]?.finish_reason ?? 'stop',
      };
    } catch (err) {
      logger.warn(`Proveedor ${providerKey} falló: ${err.message}`);
      lastError = err;
    }
  }

  throw new Error(`Todos los proveedores fallaron. Último error: ${lastError?.message}`);
}

/**
 * chatStream — Inicia streaming con un proveedor.
 * Devuelve la respuesta fetch para que el controller la lea chunk a chunk.
 */
export async function chatStream(messages, planConfig = null) {
  const order = [AI_PROVIDERS.DEEPSEEK, AI_PROVIDERS.OPENROUTER];
  let lastError;

  for (const providerKey of order) {
    try {
      logger.info(`Streaming desde: ${providerKey}`);
      const response = await callProvider(providerKey, messages, true, planConfig);
      return { response, provider: providerKey };
    } catch (err) {
      logger.warn(`Stream ${providerKey} falló: ${err.message}`);
      lastError = err;
    }
  }

  throw new Error(`Streaming no disponible. Último error: ${lastError?.message}`);
}
