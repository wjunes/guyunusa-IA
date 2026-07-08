#!/usr/bin/env node
/**
 * check-env.js — Verifica que el entorno esté listo
 * Uso: node scripts/check-env.js
 */
import 'dotenv/config';
import { readFileSync, existsSync } from 'fs';

const REQUIRED = ['JWT_SECRET', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'OPENROUTER_API_KEY', 'DEEPSEEK_API_KEY'];
const OPTIONAL = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_POOL_SIZE', 'OPENROUTER_MODEL', 'DEEPSEEK_MODEL', 'NODE_ENV', 'ALLOWED_ORIGINS'];

let allOk = true;

console.log('\n🧉 Guyunusa — Verificación de entorno\n' + '─'.repeat(44));

// ── Versión de Node ──
const nodeVer = process.versions.node;
const nodeMajor = parseInt(nodeVer.split('.')[0]);
console.log(`\n⬢  Node.js: v${nodeVer}`);
if (nodeMajor < 18) {
  console.log(`   ✖  Node ${nodeVer} es demasiado viejo. Se requiere Node 18 o superior.`);
  console.log(`   → Solución en Windows:`);
  console.log(`     nvm use 20        (si usás nvm)`);
  console.log(`     o descargar desde: https://nodejs.org`);
  allOk = false;
} else {
  console.log(`   ✓  Versión compatible`);
}

// ── Driver de base de datos ──
// FASE 2: reemplaza el chequeo dual better-sqlite3/sql.js — el proyecto
// migró a MySQL/MariaDB centralizado y mysql2 es ahora el único driver.
console.log(`\n📦 Driver de base de datos:`);
try {
  await import('mysql2/promise');
  console.log(`   ✓  mysql2 — disponible`);
} catch {
  console.log(`   ✖  mysql2 no está instalado`);
  console.log(`   → Corré: npm install`);
  allOk = false;
}

// ── Variables de entorno ──
console.log('\n📋 Variables requeridas:');
for (const key of REQUIRED) {
  const val = process.env[key];
  const missing = !val || val.includes('REEMPLAZAR') || val.includes('xxxxxxx');
  if (missing) {
    console.log(`   ✖  ${key} — falta configurar en .env`);
    allOk = false;
  } else if (key === 'DB_PASSWORD') {
    // A diferencia de las API keys, esto es la contraseña real de un
    // servidor de datos — nunca mostramos ni un fragmento del valor
    // (un slice parcial podría revelar casi toda la password si es corta).
    console.log(`   ✓  ${key} = ******** (${val.length} caracteres)`);
  } else {
    const preview = (key.includes('KEY') || key.includes('SECRET'))
      ? val.slice(0, 8) + '...' + val.slice(-4)
      : val;
    console.log(`   ✓  ${key} = ${preview}`);
  }
}

console.log('\n📋 Variables opcionales:');
for (const key of OPTIONAL) {
  const val = process.env[key];
  console.log(`   ${val ? '✓' : '·'}  ${key} = ${val || '(valor por defecto)'}`);
}

// ── Conectividad MySQL ──
// Reemplaza la vieja sección "Directorio de datos" (mkdirSync sobre
// DB_PATH): con una base centralizada de red, lo que importa ya no es
// que exista una carpeta local, sino poder conectar de verdad al
// servidor con las credenciales dadas.
console.log('\n🗄️  Conectividad MySQL/MariaDB:');

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

if (!dbUser || !dbPass || !dbName) {
  console.log(`   ·  Conexión — saltando (faltan credenciales arriba)`);
} else {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT || 3306);
  try {
    const { default: mysql } = await import('mysql2/promise');
    const conn = await mysql.createConnection({
      host, port, user: dbUser, password: dbPass, database: dbName,
      connectTimeout: 8000,
    });
    await conn.ping();
    await conn.end();
    console.log(`   ✓  Conexión OK — ${dbName}@${host}:${port}`);
  } catch (err) {
    console.log(`   ✖  No se pudo conectar — ${err.code || err.message}`);
    console.log(`   → Verificá que el servidor MySQL esté corriendo y las credenciales sean correctas`);
    allOk = false;
  }
}

// ── Conectividad APIs ──
console.log('\n🌐 Verificando conectividad...');

async function checkAPI(name, baseURL, apiKey) {
  if (!apiKey || apiKey.includes('REEMPLAZAR') || apiKey.includes('xxxxxxx')) {
    console.log(`   ·  ${name.padEnd(12)} — key no configurada, saltando`);
    return;
  }
  try {
    const res = await fetch(`${baseURL}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      console.log(`   ✓  ${name.padEnd(12)} — OK (HTTP ${res.status})`);
    } else {
      console.log(`   ✖  ${name.padEnd(12)} — HTTP ${res.status}: verificá la API key`);
      allOk = false;
    }
  } catch (err) {
    console.log(`   ✖  ${name.padEnd(12)} — sin conexión (${err.message})`);
    allOk = false;
  }
}

await checkAPI('OpenRouter', process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1', process.env.OPENROUTER_API_KEY);
await checkAPI('DeepSeek', process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1', process.env.DEEPSEEK_API_KEY);

// ── Detección de truncamiento silencioso por '#' sin comillas ──
// dotenv trata '#' como inicio de comentario en valores sin comillas,
// incluso sin espacio previo. Esto puede truncar contraseñas/secretos
// silenciosamente — el .env "se ve bien" pero el valor real cargado
// es distinto y más corto.
console.log('\n🔍 Buscando valores truncados por "#" en .env:');
if (existsSync('.env')) {
  const raw = readFileSync('.env', 'utf-8');
  let foundIssue = false;
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([\w.-]+)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    if (![...REQUIRED, ...OPTIONAL].includes(key)) continue;

    const trimmed = rawValue.trim();
    const isQuoted = /^".*"$/.test(trimmed) || /^'.*'$/.test(trimmed);
    if (!isQuoted && trimmed.includes('#')) {
      console.log(`   ⚠️  ${key}: contiene "#" sin comillas — dotenv corta el valor ahí.`);
      console.log(`       → Envolvé el valor entre comillas: ${key}="valor#completo"`);
      foundIssue = true;
      allOk = false;
    }
  }
  if (!foundIssue) console.log('   ✓  Sin valores truncados detectados');
}

// ── Resumen ──
console.log('\n' + '─'.repeat(44));
if (allOk) {
  console.log('✅  Todo listo. Arrancá con:\n');
  console.log('    npm run dev\n');
} else {
  console.log('❌  Hay problemas. Revisá los puntos con ✖ arriba.\n');
  process.exit(1);
}
