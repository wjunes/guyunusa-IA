/**
 * database.js — Conexión a MySQL/MariaDB (pool centralizado)
 *
 * FASE 2 del fix de aislamiento multi-usuario: reemplaza el adapter
 * SQLite/sql.js (almacenamiento LOCAL por proceso) por una única base
 * de datos de red, compartida por TODAS las instancias del backend.
 * Elimina de raíz el vector que causaba el bug: cada instancia de
 * sql.js tenía su propia numeración autoincremental de `users.id`,
 * así que un mismo JWT podía apuntar a usuarios distintos según en
 * qué instancia cayera la request.
 */
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger } from '../utils/logger.js';

const __dir = dirname(fileURLToPath(import.meta.url));

let _pool = null; // pool mysql2 — compartido por toda la app, thread-safe
let _db = null; // wrapper con la API .prepare(sql).get/all/run() (ahora async)

/* ─── Normalizar parámetros: mismo criterio que el adapter anterior ─── */
function flatParams(args) {
  if (args.length === 0) return [];
  if (args.length === 1 && Array.isArray(args[0])) return args[0];
  return args;
}

/* ─── Wrapper: expone `.prepare(sql).get/all/run()` igual que antes,
   pero ahora ASÍNCRONO. El único cambio que exige en los controllers
   es anteponer `await` — la forma de escribir las queries no cambia.
   Funciona tanto sobre el pool como sobre una conexión individual de
   una transacción (ambos exponen `.execute()`). ─────────────────── */
function wrapExecutor(executor) {
  function prepare(sql) {
    return {
      async run(...args) {
        const params = flatParams(args);
        const [result] = await executor.execute(sql, params);
        return { lastInsertRowid: result.insertId, changes: result.affectedRows };
      },
      async get(...args) {
        const params = flatParams(args);
        const [rows] = await executor.execute(sql, params);
        return rows[0];
      },
      async all(...args) {
        const params = flatParams(args);
        const [rows] = await executor.execute(sql, params);
        return rows;
      },
    };
  }
  return { prepare };
}

/* ─── Migraciones automáticas de columnas (equivalente MySQL de lo que
   antes hacía pragma_table_info en SQLite) ───────────────────────── */
const COLUMN_MIGRATIONS = [
  { table: 'users', column: 'avatar_url', def: 'TEXT NULL' },
  { table: 'users', column: 'plan_expires_at', def: 'DATETIME NULL' },
  { table: 'users', column: 'google_id', def: 'VARCHAR(255) NULL' },
];

async function runColumnMigrations() {
  for (const { table, column, def } of COLUMN_MIGRATIONS) {
    try {
      const [cols] = await _pool.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [table, column]
      );
      if (cols.length === 0) {
        await _pool.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${def}`);
        logger.info(`✓ Columna agregada: ${table}.${column}`);
      }
    } catch (e) {
      logger.warn(`Migración ${table}.${column}: ${e.message}`);
    }
  }
}

/* ─── Ejecutar schema.sql con soporte multi-statement ────────────────
   Conexión temporal dedicada con multipleStatements:true SOLO para
   el bootstrapping. El pool principal lo mantiene en false (default)
   por seguridad — evita SQL injection vía statement-stacking en el
   resto de la app, donde nunca hace falta correr varios statements
   en un solo query. ──────────────────────────────────────────────── */
async function runSchema(baseConfig, schemaSql) {
  const bootConn = await mysql.createConnection({
    ...baseConfig,
    multipleStatements: true,
  });
  try {
    await bootConn.query(schemaSql);
  } finally {
    await bootConn.end();
  }
}

/* ═══════════════════════════════════════
   API PÚBLICA
   ═══════════════════════════════════════ */

export async function initDB() {
  const baseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4', // el default del driver es utf8 clásico (3 bytes) — sin esto, emojis/chars 4-byte se truncan o rechazan
  };

  const schema = readFileSync(join(__dir, 'schema.sql'), 'utf-8');
  await runSchema(baseConfig, schema);

  _pool = mysql.createPool({
    ...baseConfig,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_SIZE || 10),
    queueLimit: 0,
    dateStrings: true,
  });

  // Sin este listener, un error de conexión en background (p.ej. el
  // servidor MySQL cerrando una conexión ociosa por `wait_timeout`)
  // es un evento 'error' sin manejar → Node lo trata como excepción no
  // capturada y puede derribar TODO el proceso, no solo el request.
  // Puede tardar horas/días en manifestarse tras el deploy — exactamente
  // el tipo de bug "solo pasa en producción" de esta conversación.
  _pool.on('error', (err) => {
    logger.error(`[DB pool] Error en background: ${err.code || err.message}`);
  });

  // Verificar conexión real antes de dar por lista la DB
  const conn = await _pool.getConnection();
  await conn.ping();
  conn.release();

  _db = wrapExecutor(_pool);
  await runColumnMigrations();

  logger.info(`✓ DB lista con MySQL/MariaDB: ${baseConfig.database}@${baseConfig.host}:${baseConfig.port}`);
  return _db;
}

export function getDB() {
  if (!_db) throw new Error('DB no inicializada. Llamá a initDB() primero.');
  return _db;
}

/* ─── Transacción real: reemplaza el mutex de aplicación ─────────────
   Con MySQL/MariaDB centralizado, la concurrencia entre requests —
   incluso entre DISTINTAS instancias del backend, que ahora comparten
   la misma base — la resuelve el motor InnoDB con locks a nivel de
   fila. El mutex de Node anterior solo protegía un único proceso y
   quedaba ciego ante réplicas/instancias múltiples. ────────────────── */
export async function withTransaction(fn) {
  const conn = await _pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(wrapExecutor(conn));
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export function getAdapter() { return 'mysql2'; }

export async function closeDB() {
  if (_pool) {
    await _pool.end();
    _pool = null;
    _db = null;
    logger.info('DB cerrada (mysql2)');
  }
}
