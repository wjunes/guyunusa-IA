#!/usr/bin/env node
/**
 * generate-icons.js
 * Genera todos los íconos de Android desde icons/guyunusa.png
 * usando sharp. Ejecutar después de `cap sync`.
 *
 * Uso:  node scripts/generate-icons.js
 *  o :  npm run icons
 */

const path = require('path');
const fs = require('fs');

// ── Verificar que sharp esté disponible ───────────────────────────────────────
let sharp;
try {
    sharp = require('sharp');
} catch {
    console.error('❌  sharp no está instalado. Ejecuta: npm install --save-dev sharp');
    process.exit(1);
}

// ── Rutas ─────────────────────────────────────────────────────────────────────
const SOURCE_PNG = path.resolve(__dirname, '..', 'icons', 'guyunusa.png');
const RES_DIR = path.resolve(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

if (!fs.existsSync(SOURCE_PNG)) {
    console.error(`❌  No se encontró el ícono fuente: ${SOURCE_PNG}`);
    process.exit(1);
}

// ── Definición de densidades ──────────────────────────────────────────────────
// ic_launcher     → ícono legacy (cuadrado, sin transparencia)
// ic_launcher_round → ícono circular legacy
// ic_launcher_foreground → capa delantera del ícono adaptable
//
// Tamaños según la densidad de pantalla:
//   densidad  | launcher | foreground
//   ----------|----------|-----------
//   mdpi      |   48     |   108
//   hdpi      |   72     |   162
//   xhdpi     |   96     |   216
//   xxhdpi    |  144     |   324
//   xxxhdpi   |  192     |   432

const DENSITIES = [
    { dir: 'mipmap-mdpi', launcher: 48, foreground: 108 },
    { dir: 'mipmap-hdpi', launcher: 72, foreground: 162 },
    { dir: 'mipmap-xhdpi', launcher: 96, foreground: 216 },
    { dir: 'mipmap-xxhdpi', launcher: 144, foreground: 324 },
    { dir: 'mipmap-xxxhdpi', launcher: 192, foreground: 432 },
];

// Color de fondo del ícono adaptable (coincide con el tema de la app)
const BG_COLOR = { r: 26, g: 79, b: 160, alpha: 1 };  // #1a4fa0

// ── Función auxiliar ──────────────────────────────────────────────────────────
async function resizeAndSave(size, destPath, background = null) {
    let pipeline = sharp(SOURCE_PNG).resize(size, size, { fit: 'contain' });

    if (background) {
        // Añadir fondo de color para el ícono legacy (sin transparencia)
        pipeline = pipeline.flatten({ background });
    }

    await pipeline.png().toFile(destPath);
    console.log(`  ✔  ${path.relative(RES_DIR, destPath)}  (${size}×${size})`);
}

// ── Principal ─────────────────────────────────────────────────────────────────
(async () => {
    console.log('\n🎨  Generando íconos Android desde guyunusa.png …\n');

    for (const { dir, launcher, foreground } of DENSITIES) {
        const destDir = path.join(RES_DIR, dir);
        if (!fs.existsSync(destDir)) {
            console.warn(`  ⚠  Carpeta no encontrada, se omite: ${dir}`);
            continue;
        }

        // Ícono legacy con fondo sólido
        await resizeAndSave(launcher, path.join(destDir, 'ic_launcher.png'), BG_COLOR);

        // Ícono circular legacy (mismo tratamiento)
        await resizeAndSave(launcher, path.join(destDir, 'ic_launcher_round.png'), BG_COLOR);

        // Capa delantera del ícono adaptable (con transparencia)
        await resizeAndSave(foreground, path.join(destDir, 'ic_launcher_foreground.png'));
    }

    console.log('\n✅  Íconos generados correctamente.\n');
    console.log('ℹ️   Recuerda ejecutar este script cada vez que hagas `cap sync`.');
    console.log('    Ejemplo de flujo completo:');
    console.log('      npm run cap:sync && npm run icons\n');
})();
