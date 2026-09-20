/**
 * prebuild.mjs
 * Copia el backend al directorio desktop/backend-build antes de empaquetar.
 * Se ejecuta automáticamente via "prebuild" en package.json.
 */
import { cpSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const desktopDir = join(__dirname, '..');
const src        = join(desktopDir, '..', 'backend');
const dest       = join(desktopDir, 'backend-build');

console.log('📦 Prebuild: copiando backend...');
console.log('   src :', src);
console.log('   dest:', dest);

if (!existsSync(src)) {
  console.error('❌ No se encontró la carpeta backend en:', src);
  process.exit(1);
}

// Limpiar copia anterior
if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}

cpSync(src, dest, {
  recursive: true,
  filter: (source) => {
    // Excluir .env con claves reales (cada instalación usa su propio .env)
    if (source.endsWith('.env') && !source.endsWith('.env.example')) return false;
    return true;
  },
});

console.log('✅ Backend copiado a desktop/backend-build');
