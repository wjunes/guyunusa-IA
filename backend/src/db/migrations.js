/**
 * migrations.js — Migraciones manuales de la base de datos
 * Ejecutar con: node src/db/migrations.js
 * 
 * Agrega columnas nuevas a tablas existentes de forma segura.
 */
import 'dotenv/config';
import { initDB, getDB, closeDB } from './database.js';
import { logger } from '../utils/logger.js';

async function migrate() {
  await initDB(process.env.DB_PATH || './data/guyunusa.db');
  const db = getDB();

  const migrations = [
    {
      name: 'add google_id to users',
      check: `SELECT COUNT(*) as n FROM pragma_table_info('users') WHERE name='google_id'`,
      run:   `ALTER TABLE users ADD COLUMN google_id TEXT`,
    },
    {
      name: 'add plan_expires_at to users',
      check: `SELECT COUNT(*) as n FROM pragma_table_info('users') WHERE name='plan_expires_at'`,
      run:   `ALTER TABLE users ADD COLUMN plan_expires_at TEXT`,
    },
    {
      name: 'create payments table',
      check: `SELECT COUNT(*) as n FROM sqlite_master WHERE type='table' AND name='payments'`,
      run: `CREATE TABLE IF NOT EXISTS payments (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        provider      TEXT    NOT NULL,
        external_id   TEXT,
        preference_id TEXT,
        status        TEXT    NOT NULL DEFAULT 'pending',
        amount        REAL    NOT NULL DEFAULT 6.00,
        currency      TEXT    NOT NULL DEFAULT 'USD',
        metadata      TEXT,
        created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
        updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
      )`,
    },
  ];

  let applied = 0;
  for (const m of migrations) {
    const row = db.prepare(m.check).get();
    if (row.n === 0) {
      try {
        db.prepare(m.run).run();
        logger.info(`✓ Migración aplicada: ${m.name}`);
        applied++;
      } catch (err) {
        logger.error(`✖ Error en migración "${m.name}": ${err.message}`);
      }
    } else {
      logger.info(`· Ya existe: ${m.name}`);
    }
  }

  logger.info(`\nMigraciones completadas. ${applied} aplicadas.`);
  closeDB();
}

migrate().catch(err => {
  console.error('Error fatal en migraciones:', err);
  process.exit(1);
});
