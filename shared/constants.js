/**
 * constants.js — Configuración centralizada de Guyunusa
 *
 * ════════════════════════════════════════════════════════════════════
 * PUNTO ÚNICO DE VERDAD para límites, planes, tokens y errores.
 * Tanto el backend como el frontend importan desde aquí.
 *
 * Para agregar un plan nuevo (ej: "institucional"), solo hay que
 * agregar una entrada en PLAN_CONFIG. Cero cambios en la lógica.
 * ════════════════════════════════════════════════════════════════════
 */

export const API_VERSION = 'v1';
export const API_BASE    = `/api/${API_VERSION}`;

/* ── Proveedores de IA ── */
export const AI_PROVIDERS = {
  OPENROUTER: 'openrouter',
  DEEPSEEK:   'deepseek',
};

/* ── Roles de mensaje ── */
export const MESSAGE_ROLES = {
  USER:      'user',
  ASSISTANT: 'assistant',
  SYSTEM:    'system',
};

/* ── Planes de usuario ── */
export const USER_PLANS = {
  FREE: 'free',
  PRO:  'pro',
  // INSTITUCIONAL: 'institucional',  // reservado para v3
};

/* ══════════════════════════════════════════════════════════════════
   CONFIGURACIÓN CENTRALIZADA DE PLANES

   Cada plan define su cuota diaria de tokens, límites de generación,
   contexto, continuaciones y historial.

   Para agregar un plan nuevo, solo hay que agregar una entrada aquí.
   La lógica del sistema lee estos valores dinámicamente.
   ══════════════════════════════════════════════════════════════════ */
export const PLAN_CONFIG = {
  free: {
    // Cuota diaria
    dailyTokenLimit:       50_000,    // tokens totales (prompt + completion) por día

    // Generación
    maxOutputTokens:       2_048,     // tokens máximos de salida por respuesta
    maxContextTokens:      12_000,    // tokens máximos de contexto (system + history + RAG)

    // Continuación automática
    maxAutoContinuations:  2,         // máximo de continuaciones automáticas por respuesta

    // Historial de contexto
    maxHistoryMessages:    10,        // mensajes recientes enviados como contexto

    // Streaming
    streamTimeoutMs:       120_000,    // timeout máximo para streaming completo (60s)
    connectionTimeoutMs:   45_000,    // timeout para establecer conexión con proveedor (30s)

    // Temperatura
    temperature:           0.8,
  },

  pro: {
    dailyTokenLimit:       500_000,
    maxOutputTokens:       8_192,
    maxContextTokens:      32_000,
    maxAutoContinuations:  5,
    maxHistoryMessages:    20,
    streamTimeoutMs:       180_000,
    connectionTimeoutMs:   45_000,
    temperature:           0.8,
  },

  // ── Plan institucional (reservado, no activo) ──
  // institucional: {
  //   dailyTokenLimit:       2_000_000,
  //   maxOutputTokens:       16_384,
  //   maxContextTokens:      64_000,
  //   maxAutoContinuations:  8,
  //   maxHistoryMessages:    30,
  //   streamTimeoutMs:       180_000,
  //   connectionTimeoutMs:   15_000,
  //   temperature:           0.7,
  // },
};

/**
 * getPlanConfig — Obtiene la configuración de un plan.
 * Si el plan no existe, devuelve la configuración de 'free' como fallback.
 * @param {string} planName — nombre del plan ('free', 'pro', etc.)
 * @returns {object} configuración del plan
 */
export function getPlanConfig(planName) {
  return PLAN_CONFIG[planName] || PLAN_CONFIG.free;
}

/* ── Límite legacy (mantener compatibilidad durante la migración) ── */
export const FREE_DAILY_LIMIT = 20;

/* ── Defaults del sistema ── */
export const SYSTEM_DEFAULTS = {
  streaming:                  true,
  retryOnRecoverableTimeout:  true,
  saveUsage:                  true,
  savePartialOnError:         true,   // guardar contenido parcial si el stream falla
  heartbeatIntervalMs:        15_000, // ping cada 15s para mantener SSE viva en Apache/cPanel
};

/* ── Estimación de tokens (fallback cuando el proveedor no los devuelve) ── */
export const TOKEN_ESTIMATION = {
  charsPerToken:  3.5,   // promedio para español con DeepSeek/Gemma
  estimate(text) {
    if (!text) return 0;
    return Math.ceil(text.length / this.charsPerToken);
  },
};

/* ── Estados del streaming ── */
export const STREAM_STATES = {
  IDLE:                'idle',
  STARTING:            'starting',
  STREAMING:           'streaming',
  CONTINUING:          'continuing',
  COMPLETED:           'completed',
  QUOTA_REACHED:       'quota_reached',
  TIMEOUT_RECOVERABLE: 'timeout_recoverable',
  TIMEOUT_FATAL:       'timeout_fatal',
  ERROR:               'error',
  STOPPED:             'stopped',    // usuario detuvo manualmente
};

/* ── HTTP status codes ── */
export const HTTP_STATUS = {
  OK:           200,
  CREATED:      201,
  BAD_REQUEST:  400,
  UNAUTHORIZED: 401,
  FORBIDDEN:    403,
  NOT_FOUND:    404,
  TOO_MANY:     429,
  SERVER_ERROR: 500,
};

/* ── Mensajes de error ── */
export const ERRORS = {
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  USER_EXISTS:         'El usuario ya existe',
  TOKEN_EXPIRED:       'Sesión expirada, volvé a ingresar',
  AI_UNAVAILABLE:      'Los servicios de IA no están disponibles ahora. Intentá de nuevo en unos minutos.',
  RATE_LIMITED:        'Llegaste al límite de mensajes por hoy',
  QUOTA_EXCEEDED:      'Alcanzaste tu límite diario de uso. Vuelve mañana o actualizá a Pro para más capacidad.',
  RESPONSE_TOO_LONG:   'La respuesta fue muy extensa. Intentá ser más específico en tu consulta.',
  TIMEOUT_FRIENDLY:    'La respuesta está tardando más de lo esperado. Intentá de nuevo con una consulta más corta.',
};
