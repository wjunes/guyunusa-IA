import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDB, closeDB, getAdapter } from './src/db/database.js';
import { logger } from './src/utils/logger.js';
import { errorMiddleware } from './src/middleware/error.middleware.js';

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
    res.json({ ok: true, app: 'Guyunusa', version: '1.0.0', db: getAdapter() });
  });

  // ── 404 para rutas API no encontradas ──
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
