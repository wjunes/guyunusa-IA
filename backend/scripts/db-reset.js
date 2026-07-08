/**
 * db-reset.js
 * Verifica/crea el schema en MySQL y corre las migraciones de columnas.
 *
 * ⚠️ Ya NO borra datos existentes (a diferencia del comportamiento
 * anterior con SQLite, donde eliminar el archivo .db sí reseteaba
 * todo). schema.sql usa CREATE TABLE IF NOT EXISTS — es seguro
 * correrlo repetidamente sobre una base con datos.
 * Si necesitás un reset destructivo real (DROP + recreate), avisá
 * antes de automatizarlo: es una operación irreversible.
 */
import 'dotenv/config';
import { initDB, closeDB } from '../src/db/database.js';

async function main() {
    await initDB();
    console.log('✓ Schema verificado/creado (no se borraron datos existentes)');
    await closeDB();
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});