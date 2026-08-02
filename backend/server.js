import { config as dotenvConfig } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
dotenvConfig({ path: join(__dirname, '.env'), override: true });

import express from 'express';
import cors from 'cors';
import { initDB, closeDB, getAdapter } from './src/db/database.js';
import { buildKnowledgeIndex } from './src/services/knowledge.service.js';
import { logger } from './src/utils/logger.js';
import { errorMiddleware } from './src/middleware/error.middleware.js';
import { requireAuth } from './src/middleware/auth.middleware.js';

import authRoutes from './src/routes/auth.routes.js';
import storyRoutes from './src/routes/story.routes.js';
import paymentRoutes from './src/routes/payment.routes.js';
import chatRoutes from './src/routes/chat.routes.js';
import userRoutes from './src/routes/user.routes.js';
import downloadsRoutes from './src/routes/downloads.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
  // ── Base de datos ──
  await initDB();
  logger.info(`Adaptador DB: ${getAdapter()}`);

  // ── Base de conocimiento uruguayo (RAG) ──
  try {
    buildKnowledgeIndex();
  } catch (err) {
    logger.warn(`No se pudo construir el índice de knowledge: ${err.message}`);
  }

  // ── CORS ──
  // En desarrollo permite cualquier localhost independientemente del puerto
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Dominio base extraído del APP_PUBLIC_URL para aceptar cualquier subdominio
  const appHost = (() => {
    try {
      return new URL(process.env.APP_PUBLIC_URL || '').hostname;
    } catch { return ''; }
  })();

  app.use(cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, curl, Electron, SSE)
      if (!origin) return callback(null, true);

      // Desarrollo — cualquier localhost/127.0.0.1
      if (process.env.NODE_ENV !== 'production') {
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
          return callback(null, true);
        }
      }

      // Producción — orígenes explícitos en ALLOWED_ORIGINS
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Producción — cualquier subdominio del dominio base (www, app, api, etc.)
      if (appHost) {
        try {
          const originHost = new URL(origin).hostname;
          if (originHost === appHost || originHost.endsWith('.' + appHost)) {
            return callback(null, true);
          }
        } catch { /* origin inválido */ }
      }

      logger.warn(`CORS bloqueó origin: ${origin}`);
      callback(new Error(`Origin no permitido: ${origin}`));
    },
    credentials: true,
  }));

  app.use(express.json({ limit: '1mb' }));

  // ── Garantizar que TODAS las respuestas API sean JSON ──
  app.use('/api', (_req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // ── Frontend estático en producción o cuando corre bajo Electron ──
  if (process.env.NODE_ENV === 'production' || process.env.ELECTRON === 'true') {
    const { default: path } = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const frontendPath = path.join(__dirname, '..', 'frontend');
    app.use(express.static(frontendPath));
    logger.info(`Frontend estático: ${frontendPath}`);
  }

  // ── Avatares de usuarios
  {
    const { default: path } = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const uploadsPath = path.join(__dirname, 'uploads');
    app.use('/uploads', express.static(uploadsPath));
  }

  // ── Descargas de la app desktop (instalable .exe y portable) ──
  // Carpeta backend/downloads
  {
    const { default: path } = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const downloadsPath = path.join(__dirname, 'downloads');
    app.use('/downloads', express.static(downloadsPath, {
      // Forzar descarga en lugar de abrir en el navegador
      setHeaders: (res, filePath) => {
        const filename = path.basename(filePath);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      },
    }));
  }

  // ── Rutas API ──
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/story', storyRoutes);
  app.use('/api/v1/payment', paymentRoutes);
  app.use('/api/v1/chat', chatRoutes);
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/downloads', downloadsRoutes);

  // ── Health check ──
  app.get('/api/v1/health', (_req, res) => {
    res.json({ ok: true, app: 'Guyunusa', version: '2.0.0', db: getAdapter() });
  });

  // ── Diagnóstico técnico — Fase 6 ──
  // Verifica cada componente del pipeline.
  // Sin auth para acceso rápido; datos de usuario solo si hay sesión.
  app.get('/api/v1/health/diag', async (req, res) => {
    try {
      const { SYSTEM_PROMPT }       = await import('../shared/systemPrompt.js');
      const { getPlanConfig,
              TOKEN_ESTIMATION }    = await import('../shared/constants.js');
      const { getDailyUsage }       = await import('./src/services/usage.service.js');
      const { isKnowledgeReady,
              getKnowledgeStats }   = await import('./src/services/knowledge.service.js');

      // Intentar extraer usuario del token (opcional)
      let userInfo = null;
      try {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
          const jwt = await import('jsonwebtoken');
          const token = authHeader.slice(7);
          const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
          const plan = decoded.plan || 'free';
          const usage = await getDailyUsage(decoded.id || decoded.userId, plan);
          userInfo = {
            plan,
            usage: {
              totalTokens:  usage.totalTokens,
              requestCount: usage.requestCount,
              remaining:    usage.remaining,
              percentUsed:  usage.limit > 0 ? Math.round((usage.totalTokens / usage.limit) * 100) : 0,
              canQuery:     usage.canQuery,
            },
          };
        }
      } catch { /* sin sesión — no pasa nada */ }

      const plan   = userInfo?.plan || 'free';
      const config = getPlanConfig(plan);
      const knowledge = getKnowledgeStats();

      res.json({
        ok: true,
        phases: {
          fase1_config: {
            status: 'ok',
            plan,
            dailyTokenLimit:      config.dailyTokenLimit,
            maxOutputTokens:      config.maxOutputTokens,
            maxContextTokens:     config.maxContextTokens,
            maxHistoryMessages:   config.maxHistoryMessages,
            maxAutoContinuations: config.maxAutoContinuations,
          },
          fase2_timeout: {
            status: 'ok',
            connectionTimeoutMs: config.connectionTimeoutMs,
            heartbeatMs: 15000,
          },
          fase3_tokens: {
            status: userInfo ? 'ok' : 'sin_sesion',
            todayUsage: userInfo?.usage || 'Logueate para ver tu consumo',
          },
          fase4_continuation: {
            status: 'ok',
            maxAutoContinuations: config.maxAutoContinuations,
          },
          fase5_plans: {
            status: 'ok',
            currentPlan: plan,
          },
        },
        systemPrompt: {
          loaded:      typeof SYSTEM_PROMPT === 'string',
          length:      SYSTEM_PROMPT?.length ?? 0,
          hasWillans:  SYSTEM_PROMPT?.includes('Willans Junes') ?? false,
          hasFemenino: SYSTEM_PROMPT?.includes('femenino') ?? false,
        },
        knowledge: {
          ready:     knowledge.ready,
          documents: knowledge.documents,
        },
        tokenEstimation: {
          test: TOKEN_ESTIMATION.estimate('Hola, esto es una prueba de estimación de tokens'),
          charsPerToken: TOKEN_ESTIMATION.charsPerToken,
        },
      });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  // ── 404 para rutas API no encontradas ──
  // Diagnóstico RAG: /api/v1/health/rag?q=tu+consulta
  app.get('/api/v1/health/rag', async (_req, res) => {
    try {
      const { searchKnowledge, getKnowledgeStats, buildKnowledgeContext }
        = await import('./src/services/knowledge.service.js');
      const stats = getKnowledgeStats();
      const query = _req.query.q || '';

      if (!query) {
        return res.json({
          ok: true,
          usage: 'Agregá ?q=tu+consulta para probar una búsqueda',
          stats,
        });
      }

      const results = searchKnowledge(query, 5);
      const context = buildKnowledgeContext(query);

      res.json({
        ok: true,
        query,
        stats,
        results: results.map(r => ({
          titulo: r.titulo,
          categoria: r.categoria,
          score: r.score,
          bodyPreview: r.body?.slice(0, 150) + '...',
        })),
        contextInjected: context ? {
          titulos: context.titulos,
          totalChars: context.context.length,
        } : null,
      });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });
  app.use('/api', (_req, res) => {
    res.status(404).json({ ok: false, message: 'Ruta no encontrada' });
  });

  // ── Manejo de errores (siempre devuelve JSON) ──
  app.use(errorMiddleware);

  // ── Arrancar ──
  const server = app.listen(PORT, () => {
    logger.info(`🧉 Guyunusa backend en http://localhost:${PORT}`);
    logger.info(`   Health: http://localhost:${PORT}/api/v1/health`);
  });

  const shutdown = async () => {
    await closeDB();
    server.close();
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

main().catch(err => {
  console.error('Error fatal al iniciar:', err);
  process.exit(1);
});
