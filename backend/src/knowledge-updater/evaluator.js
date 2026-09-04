/**
 * evaluator.js — Knowledge Evaluator
 *
 * Evalúa un candidato usando IA (DeepSeek primario / OpenRouter fallback) y retorna
 * una puntuación estructurada: relevancia, novedad, confiabilidad,
 * vigencia, impacto, recomendación y motivo.
 *
 * En DRY_RUN devuelve una evaluación simulada sin llamar a la API.
 * Reutiliza las variables de entorno de ai.service.js.
 */
import { logger } from '../utils/logger.js';
import { LIMITS } from './env-guard.js';

// Proveedores en orden de prioridad: DeepSeek → OpenRouter
const PROVIDERS = [
  {
    name:    'deepseek',
    base:    () => process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
    key:     () => process.env.DEEPSEEK_API_KEY  || '',
    model:   () => process.env.KNOWLEDGE_EVAL_MODEL || process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    headers: {},
  },
  {
    name:    'openrouter',
    base:    () => process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    key:     () => process.env.OPENROUTER_API_KEY  || '',
    model:   () => process.env.KNOWLEDGE_EVAL_MODEL || process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat',
    headers: { 'HTTP-Referer': 'https://guyunusa.uy', 'X-Title': 'Guyunusa-KnowledgeUpdater' },
  },
];

/* ─── Thresholds de decisión ─────────────────────────────────── */
export const SCORE_BANDS = {
  AUTO_APPROVE: 90,
  REVIEW:       75,
  REVIEW_SECONDARY: 50,
};

export function scoreToRecommendation(score, thresholds = {}) {
  const band = {
    auto_approve: thresholds.auto_approve ?? SCORE_BANDS.AUTO_APPROVE,
    review:       thresholds.review       ?? SCORE_BANDS.REVIEW,
    discard:      thresholds.discard      ?? SCORE_BANDS.REVIEW_SECONDARY,
  };
  if (score >= band.auto_approve) return 'auto_approve';
  if (score >= band.review)       return 'review';
  if (score >= band.discard)      return 'review_secondary';
  return 'discard';
}

/* ─── Evaluación principal ───────────────────────────────────── */

/**
 * Evalúa un resultado usando el LLM.
 *
 * @param {{ domain, source, url, title, description, source_type }} result
 * @param {{ dryRun: boolean, thresholds: object }} opts
 * @returns {Promise<object>} evaluación estructurada
 */
export async function evaluate(result, { dryRun = true, thresholds = {} } = {}) {
  if (dryRun) {
    return buildDryRunEvaluation(result);
  }

  // Verificar que al menos un proveedor tiene API key
  const available = PROVIDERS.filter(p => p.key());
  if (available.length === 0) {
    logger.warn('[evaluator] Ningún proveedor configurado (DEEPSEEK_API_KEY / OPENROUTER_API_KEY) — usando evaluación simulada');
    return buildDryRunEvaluation(result);
  }

  const prompt = buildEvalPrompt(result);

  try {
    const { content, provider, model } = await callLLMWithFailover(prompt);
    const parsed = parseEvalResponse(content);
    const overallScore = computeOverallScore(parsed);
    return {
      ...parsed,
      overall_score: overallScore,
      recommendation: scoreToRecommendation(overallScore, thresholds),
      evaluated_at: new Date().toISOString(),
      provider,
      model,
      dry_run: false,
    };
  } catch (err) {
    logger.error(`[evaluator] Error evaluando "${result.url}": ${err.message}`);
    throw err;
  }
}

/* ─── Prompt de evaluación ───────────────────────────────────── */
function buildEvalPrompt(result) {
  return [
    {
      role: 'system',
      content:
        'Eres un evaluador de conocimiento para la Base de Conocimiento Nacional Uruguaya (BNC-UY). ' +
        'Tu tarea es evaluar si un resultado web es relevante, confiable y novedoso para el dominio indicado. ' +
        'Responde ÚNICAMENTE con un JSON válido, sin markdown ni texto adicional.',
    },
    {
      role: 'user',
      content:
        `Evalúa este resultado para el dominio "${result.domain}" (fuente: ${result.source_type}):\n\n` +
        `Título: ${result.title}\n` +
        `URL: ${result.url}\n` +
        `Descripción: ${result.description}\n\n` +
        'Devuelve un JSON con exactamente estos campos (todos numéricos 0-100 excepto reason y recommendation):\n' +
        '{\n' +
        '  "relevance": 0-100,\n' +
        '  "confidence": 0-100,\n' +
        '  "novelty": 0-100,\n' +
        '  "validity": 0-100,\n' +
        '  "impact": 0-100,\n' +
        '  "reason": "explicación breve en español",\n' +
        '  "key_topics": ["tema1", "tema2"]\n' +
        '}',
    },
  ];
}

/* ─── Llamada al LLM con failover DeepSeek → OpenRouter ─────── */
async function callLLMWithFailover(messages) {
  const available = PROVIDERS.filter(p => p.key());
  let lastError;

  for (const provider of available) {
    try {
      logger.debug(`[evaluator] Intentando proveedor: ${provider.name}`);
      const content = await callProvider(provider, messages);
      logger.debug(`[evaluator] Respuesta de ${provider.name}`);
      return { content, provider: provider.name, model: provider.model() };
    } catch (err) {
      logger.warn(`[evaluator] ${provider.name} falló: ${err.message} — intentando siguiente proveedor`);
      lastError = err;
    }
  }

  throw lastError || new Error('Todos los proveedores de IA fallaron');
}

async function callProvider(provider, messages) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LIMITS.requestTimeoutMs);

  let resp;
  try {
    resp = await fetch(`${provider.base()}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${provider.key()}`,
        ...provider.headers,
      },
      body: JSON.stringify({
        model:       provider.model(),
        messages,
        stream:      false,
        temperature: 0.2,
        max_tokens:  400,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${text.slice(0, 200)}`);
  }

  const data    = await resp.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('respuesta vacía del modelo');
  return content;
}

/* ─── Parsing de la respuesta ────────────────────────────────── */
function parseEvalResponse(raw) {
  // Extraer JSON del texto (el modelo a veces agrega texto alrededor)
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`[evaluator] No se encontró JSON en la respuesta: ${raw.slice(0, 200)}`);

  const parsed = JSON.parse(match[0]);

  // Validar y normalizar campos numéricos
  const numFields = ['relevance', 'confidence', 'novelty', 'validity', 'impact'];
  for (const f of numFields) {
    if (typeof parsed[f] !== 'number' || parsed[f] < 0 || parsed[f] > 100) {
      parsed[f] = 50; // fallback
    }
  }

  return parsed;
}

/* ─── Score global ───────────────────────────────────────────── */
function computeOverallScore(parsed) {
  const w = { relevance: 0.30, confidence: 0.25, novelty: 0.20, validity: 0.15, impact: 0.10 };
  return Math.round(
    (parsed.relevance  || 0) * w.relevance  +
    (parsed.confidence || 0) * w.confidence +
    (parsed.novelty    || 0) * w.novelty    +
    (parsed.validity   || 0) * w.validity   +
    (parsed.impact     || 0) * w.impact
  );
}

/* ─── Evaluación simulada para DRY_RUN ──────────────────────── */
function buildDryRunEvaluation(result) {
  // Score sintético basado en el tipo de fuente
  const baseScore = result.source_type === 'official'   ? 80
                  : result.source_type === 'scientific'  ? 78
                  : result.source_type === 'academic'    ? 75
                  : result.source_type === 'sectorial'   ? 65
                  : 55;

  return {
    relevance:      baseScore,
    confidence:     baseScore,
    novelty:        70,
    validity:       80,
    impact:         60,
    overall_score:  baseScore,
    recommendation: scoreToRecommendation(baseScore),
    reason:         `[DRY_RUN] Evaluación simulada para fuente tipo "${result.source_type}".`,
    key_topics:     [],
    evaluated_at:   new Date().toISOString(),
    model:          'dry-run',
    dry_run:        true,
  };
}
