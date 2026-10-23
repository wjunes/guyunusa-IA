# Correcciones al Corpus BNC-UY

## Propósito

Este archivo documenta los errores fácticos identificados en el corpus BNC-UY durante la construcción del dominio `organizaciones-artisticas-uy`, con evidencia de la corrección y recomendación de acción sobre el archivo afectado.

---

## Corrección 1 — AUDEM: identidad incorrecta

### Archivo afectado
`propiedad-intelectual-uy/03-gestion-colectiva-de-derechos.md`

### Error documentado
El archivo identifica a AUDEM como **"Asociación Uruguaya de Editores de Música"**.

### Corrección confirmada
La denominación correcta es **"Asociación Uruguaya de Músicos"** — entidad gremial/sindical que representa a músicos trabajadores, no a editores.

### Evidencia

1. **Resolución MTSS n.° 79.025** (gub.uy): designa a AUDEM como organización gremial en la **Comisión Certificadora del Registro Nacional de Artistas** junto a FUDEM, SUA, ADDU y Agremyarte. Una asociación de editores no tendría ese rol en una comisión de certificación de artistas.

2. **Cluster de Música Uruguay**: AUDEM figura como organización de músicos (gremial) junto a SUDEI (ejecutantes), CUD (productores fonográficos), AGADU (autores) y otras organizaciones. La posición de AUDEM en este ecosistema corresponde a músicos gremial, no a editores.

3. **Decreto 192/2020**: designa a AUDEM como representación en la Comisión Certificadora (MTSS), rol consistente con una organización gremial de músicos, no de editores.

4. **Carta COVID-19 (marzo 2020)**: documentos de prensa citan a AUDEM como organización de músicos, no de editores.

### Posible origen del error
Confusión con la denominación anglófona similar: en inglés, "music publishers" (editores musicales) son entidades distintas de los músicos ejecutantes. La sigla AUDEM pudo haberse confundido con alguna entidad de editores, pero en Uruguay esta sigla corresponde exclusivamente a la Asociación Uruguaya de Músicos.

### Acción recomendada
**Corregir** en `propiedad-intelectual-uy/03-gestion-colectiva-de-derechos.md`:
- Reemplazar "Asociación Uruguaya de Editores de Música" por "Asociación Uruguaya de Músicos"
- Actualizar cualquier descripción de funciones que implique gestión editorial
- Añadir nota de corrección con fecha

---

## Ambigüedad 1 — CUD: dos entidades con la misma sigla

### Archivos afectados
- `propiedad-intelectual-uy/03-gestion-colectiva-de-derechos.md` (documenta CUD reprografía)
- `organizaciones-artisticas-uy/10-sector-musica-organizaciones.md` (documenta CUD disco)

### Situación
La sigla **CUD** corresponde a dos entidades distintas en Uruguay:

| Entidad | Sector | Función |
|---|---|---|
| **Cámara Uruguaya del Disco** | Música / fonogramas | Derechos conexos de productores fonográficos |
| **Cámara Uruguaya de Reprografía y Documentación** | Reprografía / texto | Derechos reprográficos (fotocopias, reproducciones de texto) |

### Estado
No es un error sino una **ambigüedad real del sector**: son dos organizaciones legítimamente distintas que comparten la sigla CUD. No hay error factual en el corpus existente siempre que quede claro a qué CUD se refiere.

### Acción recomendada
En `propiedad-intelectual-uy/03-gestion-colectiva-de-derechos.md`, añadir una nota de desambiguación indicando que "CUD" en ese contexto refiere a la Cámara Uruguaya de Reprografía y Documentación, y que existe también la Cámara Uruguaya del Disco con la misma sigla. Referencia cruzada con este dominio.

---

## Dato no confirmado 1 — COOPAUDEM

### Estado
Tras búsqueda sistemática (INACOOP, IMPO, prensa, fuentes institucionales), no se encontró ninguna organización denominada **COOPAUDEM**.

La entidad probablemente referida como "COOPAUDEM" en fuentes informales es **COOPARTE** (Cooperativa de las Artes del Uruguay), que sí está documentada y activa.

### Acción recomendada
Si el término "COOPAUDEM" aparece en cualquier archivo del corpus BNC-UY, verificar si la entidad correcta es COOPARTE y corregir la referencia.

---

## Palabras clave

correcciones corpus BNC-UY, AUDEM error identificación, AUDEM músicos no editores, CUD ambigüedad Uruguay, COOPAUDEM no confirmada, calidad datos BNC-UY, propiedad intelectual Uruguay correcciones
