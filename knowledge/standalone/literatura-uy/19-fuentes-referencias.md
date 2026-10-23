# Fuentes y Referencias — literatura-uy

Inventario de fuentes utilizadas y recomendadas para el dominio `literatura-uy`, clasificadas por jerarquía y tipo. Incluye metodología de verificación y estado de los datos.

---

## Jerarquía de fuentes

| Nivel | Tipo | Criterio | Auto-approve en JSON |
|-------|------|----------|---------------------|
| 1 | Oficial (Estado uruguayo) | Organismos públicos: MEC, ANEP, BN, Presidencia | Sí |
| 2 | Institucional | Editoriales, universidades, organismos culturales con respaldo institucional | Condicional |
| 3 | Secundaria | Prensa, revistas académicas, enciclopedias de referencia | No |

---

## Fuentes Nivel 1 — Oficiales

### MEC — Academia Nacional de Letras
- **URL**: https://www.gub.uy/ministerio-educacion-cultura/academia-letras
- **Uso**: fichas de autores del Panteón Nacional de Letras, Premio Nacional de Literatura, normativa del español
- **Estado**: VIGENTE

### MEC/ICAU — Catálogo de Literatura Infantil y Juvenil
- **URL**: https://icau.mec.gub.uy/innovaportal/file/35550/1/catalogoliteratura-ij_mec_.pdf
- **Uso**: escritores uruguayos de LIJ, catálogo oficial
- **Estado**: VIGENTE (verificar actualización)

### gub.uy/presidencia — Premio Cervantes 2018 (Ida Vitale)
- **URL**: https://www.gub.uy/presidencia/comunicacion/noticias/ida-vitale-recibio-reconocimiento-importante-otorga-estado-uruguayo-medalla
- **Uso**: Confirmación Premio Cervantes 2018, reconocimiento estatal
- **Estado**: VIGENTE

### ANEP-CES — Programas de Literatura (Secundaria)
- **URL**: https://www.ces.edu.uy
- **Uso**: canon escolar de Educación Media, programas vigentes
- **Estado**: VIGENTE (programas se actualizan por reforma curricular)

### ANEP-CEP — Programas de Primaria
- **URL**: https://www.cep.edu.uy
- **Uso**: lecturas canónicas de Educación Primaria
- **Estado**: VIGENTE

### Biblioteca Nacional del Uruguay
- **URL**: https://www.bibna.edu.uy
- **Uso**: archivo literario, catálogos, obras digitalizadas
- **Estado**: VIGENTE

---

## Fuentes Nivel 2 — Institucionales

### FHCE/UdelaR — Publicaciones académicas
- **URL**: https://ojs.fhce.edu.uy
- **Uso**: investigación crítica sobre literatura uruguaya, estudios sobre Generación del 45, Marcha, etc.
- **Estado**: VIGENTE
- **Nota**: contiene los trabajos de Pablo Rocca y otros investigadores de referencia

### Ediciones de la Banda Oriental
- **URL**: https://www.bandaoriental.com.uy (verificar)
- **Uso**: catálogo editorial nacional, datos históricos de la editorial (fundada 1961)
- **Estado**: VIGENTE

### Cámara Uruguaya del Libro
- **URL**: https://camaradellibro.com.uy
- **Uso**: estadísticas del sector editorial, Feria Internacional del Libro, directorio de editoriales
- **Estado**: VIGENTE

### AGADU
- **URL**: https://www.agadu.org.uy
- **Uso**: afiliación de escritores, gestión de derechos de autor
- **Estado**: VIGENTE. Ver también `organizaciones-artisticas-uy/02-agadu-gestion-autores.md`

---

## Fuentes Nivel 3 — Secundarias

### El Observador — Cultura y espectáculos
- **URL**: https://www.elobservador.com.uy
- **Uso**: cobertura de la literatura uruguaya contemporánea, entrevistas a autores, reseñas
- **Estado**: VIGENTE. Artículo de referencia: "Radiografía de la literatura infantil uruguaya" (2025)

### La Diaria — Cultura
- **URL**: https://ladiaria.com.uy
- **Uso**: crítica literaria contemporánea, cobertura cultural
- **Estado**: VIGENTE

### Semanario Brecha
- **URL**: https://brecha.com.uy
- **Uso**: crítica literaria, debate cultural, continuación espiritual de Marcha
- **Estado**: VIGENTE

### Britannica
- **URL**: https://www.britannica.com
- **Uso**: fichas académicas de autores uruguayos (Emir Rodríguez Monegal, etc.)
- **Estado**: VIGENTE

### Escritores.org
- **URL**: https://www.escritores.org
- **Uso**: perfiles de escritores en español, ficha de Ida Vitale Premio Cervantes 2018
- **Estado**: VIGENTE

### La Nación (Argentina) — Cultura
- **URL**: https://www.lanacion.com.ar/cultura
- **Uso**: cobertura rioplatense de la literatura uruguaya
- **Estado**: VIGENTE

---

## Fuentes académicas especializadas (Nivel 3)

### Latin American Theatre Review (LATR) — Universidad de Kansas
- **URL**: https://journals.ku.edu/latr
- **Uso**: estudios sobre teatro uruguayo (Rosencof, Langsner, Blanco, Florencio Sánchez)
- **Estado**: VIGENTE

### Orbis Tertius — UNLP (Argentina)
- **URL**: https://orbistertius.unlp.edu.ar
- **Uso**: estudios sobre narrativa latinoamericana, Uruguay en el boom
- **Estado**: VIGENTE

### Cuadernos del CILHA — FHCE/UdelaR
- **URL**: https://ojs.fhce.edu.uy/index.php/cont
- **Uso**: investigación crítica sobre literatura uruguaya
- **Estado**: VIGENTE

### Redalyc y Dialnet
- **Uso**: artículos académicos sobre literatura latinoamericana con autores uruguayos
- **Estado**: VIGENTE

---

## Corpus existente en BNC-UY relacionado con literatura-uy

| Dominio | Archivos con contenido literario | Relación con literatura-uy |
|---------|----------------------------------|---------------------------|
| `cultura-uy` | 11, 12, 13, 14, 15 | Base para los archivos 01–05 (ampliados y reorganizados) |
| `personalidades-uy` | 03–10 | Fichas individuales de autores (no duplicadas, referenciadas) |
| `historia-uy` | 16, 17 | Contexto político para 09-literatura-sociedad-exilio |
| `organizaciones-artisticas-uy` | 02, 07, 13 | AGADU, FUTI, AUDE (referenciados) |

---

## Metodología de verificación

### Principios generales
1. **No encontrado ≠ inexistente**: la ausencia de resultados en una búsqueda no implica que el dato no exista, solo que no fue encontrado en las fuentes consultadas.
2. **Jerarquía de fuentes**: los datos de Nivel 1 (fuentes oficiales del Estado uruguayo) prevalecen sobre los de Nivel 2 y 3.
3. **Marcado de datos dinámicos**: todos los datos que pueden cambiar con el tiempo están marcados con `> **[DATO DINÁMICO]**` con fuente y fecha de acceso.
4. **Verificación de fechas biográficas**: las fechas de nacimiento y muerte de los autores fueron verificadas contra múltiples fuentes académicas de referencia.

### Datos pendientes de verificación
- Programas actualizados de Literatura en CES (reforma curricular 2025–2026 en curso).
- Catálogo actualizado de Editoriales Arca y Trilce (historia completa y catálogos).
- Estado actual de la Academia Nacional de Letras (composición, directores).
- Novedades literarias de autores contemporáneos (post-2025).

### Estado temporal de los archivos

| Archivo | Clasificación temporal | Nota |
|---------|----------------------|------|
| 01–03 (historia, Gen. 900, Gen. 45) | HISTÓRICA / VIGENTE | Información consolidada; autores fallecidos |
| 04–05 (poesía, narrativa) | HISTÓRICA / VIGENTE | Idem; sección contemporánea VIGENTE CON CAMBIOS |
| 06 (teatro) | VIGENTE CON CAMBIOS | Teatro independiente activo; datos dinámicos marcados |
| 07 (LIJ) | VIGENTE CON CAMBIOS | Roy Berocay sigue publicando |
| 08 (ensayo) | HISTÓRICA | Rama y Rodríguez Monegal fallecidos; Rocca activo |
| 09 (sociedad/exilio) | HISTÓRICA / VIGENTE | Dictadura = HISTÓRICA; debate memoria = VIGENTE |
| 10 (ecosistema editorial) | VIGENTE CON CAMBIOS | Editoriales activas; datos dinámicos marcados |
| 11 (revistas) | HISTÓRICA / VIGENTE | Marcha = HISTÓRICA; Brecha = VIGENTE |
| 12 (educación) | VIGENTE CON CAMBIOS | Programas educativos sujetos a reformas |
| 13 (proyección) | VIGENTE CON CAMBIOS | Traducciones y premios siguen ocurriendo |
| 14 (contemporáneos) | VIGENTE | Campo literario activo |
| 15 (Ida Vitale) | VIGENTE | Poeta viva; Premio Cervantes 2018 |
| 16 (Herrera y Reissig) | HISTÓRICA | Fallecido 1910 |
| 17 (Rosencof) | VIGENTE | Escritor vivo |

---

## Notas sobre el corpus y correcciones

### Corrección crítica: Ida Vitale ausente del corpus previo
El archivo `cultura-uy/12-poesia-uruguaya.md` no menciona a Ida Vitale (Premio Cervantes 2018). Se recomienda actualizar ese archivo. El dominio `literatura-uy` subsana esta omisión con el archivo `15-ida-vitale.md`.

### Relación con el dominio organizaciones-artisticas-uy
Las correcciones al corpus identificadas en `organizaciones-artisticas-uy/18-correcciones-corpus.md` (AUDEM, CUD, COOPAUDEM) son independientes del dominio literatura-uy. Sin embargo, el dominio comparte la fuente AGADU, que es relevante para los derechos de autor de los escritores.

---

## Palabras clave

fuentes literatura uruguaya, metodología verificación BNC-UY, Biblioteca Nacional Uruguay fuentes, FHCE UdelaR investigación literaria, MEC Academia Nacional Letras fuentes, Cámara Uruguaya del Libro fuentes, datos dinámicos literatura Uruguay, BNC-UY
