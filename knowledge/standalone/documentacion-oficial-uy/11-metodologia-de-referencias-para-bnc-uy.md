# Metodología de Referencias Normativas para el BNC-UY

## Propósito

Este archivo define el **estándar de citación de documentación oficial** adoptado por el BNC-UY (Base Nacional de Conocimiento Uruguay). Su aplicación es obligatoria en todos los dominios del BNC-UY para garantizar coherencia, trazabilidad y verificabilidad de las fuentes normativas citadas.

La fuente primaria de verificación para toda citación normativa es el **Banco de Datos de IMPO** (https://www.impo.com.uy/bases).

---

## 1. Principios generales

- **Fuente primaria:** toda norma citada debe verificarse en el portal de IMPO (https://www.impo.com.uy/bases) o en publicaciones oficiales (RNLD, Diario Oficial)
- **Completitud:** la cita debe incluir tipo de norma, número, año, título descriptivo y, cuando corresponda, el artículo específico
- **Vigencia:** cuando se cita una norma modificada, se debe indicar si se refiere al texto original o al texto vigente (modificado); si existe texto ordenado, se menciona
- **Accesibilidad:** siempre que sea posible, incluir la URL del portal de IMPO donde se puede consultar la norma

---

## 2. Formato estándar por tipo de norma

### Leyes

**Formato:**
`Ley [número]/[año] — [Denominación descriptiva], [artículo específico si corresponde]`

**Ejemplos:**
- `Ley 18.381/2008 — Derecho de Acceso a la Información Pública, Art. 5`
- `Ley 19.355/2015 — Rendición de Cuentas, Art. 760 (equivalencia D.O. electrónico)`
- `Ley 16.736/1996 — Presupuesto Nacional, Art. 341 (Ley Orgánica IMPO)`

**URL IMPO:** `https://www.impo.com.uy/bases/leyes/[numero]-[año]`
Ejemplo: https://www.impo.com.uy/bases/leyes/18381-2008

### Decretos del Poder Ejecutivo

**Formato:**
`Decreto [número]/[año] — [Denominación descriptiva], [artículo si corresponde]`

**Ejemplos:**
- `Decreto 500/991 — Normas de Actuación en la Administración Central`
- `Decreto 232/010 — Reglamentación Ley 18.381, Art. 3`
- `Decreto 150/012 — TOCAF (Texto Ordenado Contabilidad y Administración Financiera)`

**URL IMPO:** `https://www.impo.com.uy/bases/decretos-ejecutivos/[numero]-[año]`

### Leyes orgánicas de presupuesto nacional

**Formato:**
`Ley [número]/[año] — Presupuesto Nacional [período]`

**Ejemplos:**
- `Ley 19.924/2020 — Presupuesto Nacional 2020-2024`
- `Ley 20.446/2025 — Presupuesto Nacional 2025-2029`

### Textos ordenados

**Formato:**
`[Nombre del texto ordenado] ([sigla]) — aprobado por [Decreto/Resolución] [número]/[año]`

**Ejemplos:**
- `TOCAF — aprobado por Decreto 150/012, vigente con modificaciones`
- `Texto Ordenado DGI — edición 2023`

### Constitución Nacional

**Formato:**
`Constitución de la República Oriental del Uruguay (1967, con reformas hasta [año]), Art. [número]`

**Ejemplo:**
- `Constitución de la República Oriental del Uruguay (1967, con reformas hasta 2004), Art. 72`

### Decretos departamentales y ordenanzas municipales

**Formato:**
`Decreto Departamental de [Intendencia] [número]/[año] — [descripción]`

---

## 3. Citación de artículos específicos

Cuando la referencia recae en un artículo particular, se indica luego del nombre de la norma:

- `Art. 341` (artículo único)
- `Arts. 341 y 341-2` (dos artículos)
- `Arts. 1 al 10` (rango)
- `Art. 341, num. 3°` (numeral dentro del artículo)

---

## 4. Indicación de modificaciones y derogaciones

Cuando una norma ha sido modificada:

- **Modificación parcial:** `Ley 18.XXX/20XX modificó el Art. Y de la Ley Z`
- **Derogación parcial:** `Art. X derogado por Ley 19.XXX/20XX`
- **Sustitución:** `Art. X sustituido en la redacción dada por Ley 19.XXX/20XX`

Cuando existe texto ordenado vigente, se indica: `(ver TOCAF vigente)` o `(texto ordenado IMPO actualizado a [año])`.

---

## 5. Referencias al Diario Oficial

Cuando la trazabilidad lo requiere, puede añadirse la referencia de publicación:

**Formato:**
`publicada en el Diario Oficial de fecha [DD/MM/AAAA], [sección/página si se conoce]`

**Ejemplo:**
`Ley 18.381/2008, publicada en el Diario Oficial del 17 de octubre de 2008`

---

## 6. Uso en el texto del BNC-UY

En el cuerpo de los archivos Markdown del BNC-UY, las normas deben citarse con el formato compacto integrado en el texto:

**Correcto:**
> "La Ley 18.600/2009 (Documento Electrónico y Firma Electrónica) estableció la equivalencia jurídica del documento electrónico..."

**También correcto (mención abreviada en segundo uso):**
> "Conforme a la Ley 18.600/2009, los documentos electrónicos..."

**Incorrecto (sin número de ley):**
> "La ley de firma electrónica establece..."

---

## 7. Dominios del BNC-UY y sus fuentes normativas primarias

Cada dominio del BNC-UY tiene sus fuentes normativas características. La siguiente tabla orienta sobre las fuentes primarias:

| Dominio BNC-UY | Fuente normativa principal |
|---|---|
| `transparencia-uy` | Ley 18.381, Decreto 232/010, UAIP |
| `gobierno-digital-uy` | Ley 18.600, AGESIC, Decreto 205/010 |
| `servicio-civil-uy` | Ley 19.121/2013, ONSC |
| `vivienda-uy` | Ley 13.728, ANV, MVOTMA |
| `educacion-uy` | Ley 18.437, ANEP, UdelaR |
| `salud` | Ley 18.211, MSP, ASSE, JUNASA |
| `documentacion-oficial-uy` | Ley 16.736, IMPO, RNLD, Diario Oficial |

---

## 8. Normas que no son accesibles en IMPO

Algunas normas históricas anteriores a la digitalización o resoluciones de baja difusión pueden no estar disponibles en el banco de datos de IMPO. En esos casos:

- Indicar la fuente alternativa de verificación (RNLD impreso, publicaciones del organismo emisor)
- No citar la norma si no puede verificarse su contenido exacto
- Señalar en el texto que la verificación requiere fuente física: `[verificar en RNLD impreso]`

---

## 9. Detección de nuevos dominios del BNC-UY a partir de referencias normativas

Durante la elaboración de contenidos, puede identificarse normativa que pertenece a un dominio temático aún no existente en el BNC-UY (por ejemplo, normativa específica sobre archivología, propiedad intelectual, normativa aduanera). En esos casos, registrar la observación como **propuesta de nuevo dominio** al final del archivo donde se detecta, con el formato:

> `[PROPUESTA DE DOMINIO]: [nombre-sugerido-uy] — Motivo: la normativa sobre [tema] citada en este archivo sugiere la creación de un dominio específico.`

## Palabras clave

metodología citación normativa Uruguay, formato citar leyes Uruguay, referencias normativas BNC-UY, estándar citación Ley Decreto Uruguay, URL IMPO normas consulta, trazabilidad normativa Uruguay, citación Diario Oficial Uruguay, texto ordenado vigente citar, modificaciones derogaciones normas Uruguay, verificación normativa IMPO base datos
