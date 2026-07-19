# Base de Conocimiento Nacional Uruguaya (BCN-UY)

Versión: 1.0.0

---

## Descripción

La Base de Conocimiento Nacional Uruguaya (BCN-UY) es un repositorio estructurado de conocimiento diseñado para proporcionar contexto confiable a modelos de Inteligencia Artificial con identidad uruguaya.

Su objetivo es ofrecer información organizada, verificable y fácilmente mantenible sobre Uruguay, permitiendo responder consultas generales y especializadas con precisión y contexto cultural.

La BCN-UY es independiente del modelo de lenguaje utilizado y puede ser utilizada por sistemas basados en DeepSeek, OpenAI, Anthropic, Google Gemini u otros modelos compatibles con arquitecturas RAG (Retrieval-Augmented Generation).

---

## Objetivos

La BCN-UY busca:

- Representar el conocimiento nacional de Uruguay de forma estructurada.
- Mantener una organización uniforme de todos los documentos.
- Facilitar la recuperación eficiente mediante RAG.
- Separar el conocimiento del comportamiento del modelo de IA.
- Permitir la ampliación continua sin modificar el System Prompt.
- Servir como fuente de contexto para aplicaciones educativas, jurídicas, culturales, turísticas y técnicas.

---

## Arquitectura General

```
                           Usuario
                              │
                              ▼
                    Clasificador de intención
                              │
             ┌────────────────┼─────────────────┐
             │                │                 │
             ▼                ▼                 ▼
      Conocimiento UY    Conocimiento Legal   Conocimiento General
             │                │                 │
             └────────────────┼─────────────────┘
                              │
                         Recuperación RAG
                              │
                      Ranking de documentos
                              │
                      Contexto para el LLM
                              │
                              ▼
                          Respuesta
```

El clasificador de intención determina qué colección consultar según el dominio de la pregunta. El RAG solo se activa cuando el dominio lo requiere; el modelo puede responder preguntas generales sin consultar la BCN-UY.

---

## Organización del Proyecto

```
knowledge/

    templates/
    indexes/
    config/
    assets/
    sources/

    identidad/
    historia/
    politica/
    cultura/
    economia/
    legislacion/
    turismo/
    gastronomia/
    deportes/
    salud/
    educacion/
    software/
    bps/
    dgi/
```

Cada categoría puede contener documentos temáticos y subdirectorios especializados.

---

## Tipos de Documentos

La BCN-UY utiliza distintos tipos de documentos.

| Tipo        | Descripción |
|-------------|-------------|
| Persona     | Figuras históricas, artistas, escritores, científicos, políticos, deportistas, etc. |
| Tema        | Conceptos generales o disciplinas. |
| Movimiento  | Corrientes culturales, artísticas o intelectuales (Universalismo Constructivo, Generación del 45, Candombe Beat, Canto Popular, etc.). |
| Institución | Organismos públicos y privados. |
| Lugar       | Ciudades, departamentos, monumentos, museos, espacios naturales. |
| Evento      | Hechos históricos o acontecimientos relevantes. |
| Obra        | Libros, canciones, pinturas, leyes, esculturas, etc. |
| Normativa   | Leyes, decretos, reglamentos y disposiciones. |

---

## Convenciones de Nombres

Los nombres de archivos deberán cumplir las siguientes reglas:

- Todo en minúsculas.
- Sin espacios.
- Separación mediante guiones bajos (_).
- Sin acentos.
- Sin caracteres especiales.

Ejemplos

```
mario_benedetti.md

alfredo_zitarrosa.md

jose_gervasio_artigas.md

teatro_solis.md
```

---

## Identificadores

Cada documento posee un identificador único permanente.

Formato

```
TIPO_AREA_NUMERO
```

Ejemplos

```
PER_LIT_0001

PER_POL_0012

TEM_HIS_0004

MOV_CUL_0001

INS_BPS_0001

LUG_MON_0003
```

El identificador nunca deberá modificarse.

---

## Versionado

Cada documento posee información de control.

- versión
- fecha de actualización
- estado
- autor del documento
- fuentes utilizadas

---

## Metadata

Todos los documentos comienzan con un bloque YAML.

Este bloque contiene la información utilizada por el sistema RAG para clasificar e indexar el contenido.

La estructura exacta dependerá del tipo de documento.

---

## Relaciones

Cada documento podrá establecer relaciones con otros documentos.

Ejemplos

- contemporáneo
- influencia
- discípulo / maestro
- autor
- colaborador
- institución
- obra
- movimiento
- género
- ubicación
- legislación relacionada

Estas relaciones permiten mejorar la recuperación semántica del conocimiento y habilitan al modelo a establecer conexiones entre figuras, obras y movimientos sin necesidad de inferirlas.

---

## Sistema de Tags

Cada documento deberá incluir etiquetas que faciliten la búsqueda.

Las etiquetas deberán ser:

- específicas
- consistentes
- descriptivas
- reutilizables

Ejemplo

```
tags:

- literatura

- generación45

- poesía

- novela

- exilio
```

---

## Criterios Editoriales

Toda la información deberá cumplir los siguientes principios.

### Precisión

La información debe estar basada en fuentes confiables.

### Neutralidad

La redacción deberá ser objetiva.

No se incluirán opiniones.

### Contexto

Siempre que sea posible se explicará el contexto histórico o cultural.

### Claridad

La redacción deberá ser comprensible tanto para personas como para modelos de IA.

### Uniformidad

Todos los documentos deberán mantener la misma estructura.

---

## Información Dinámica

La BCN-UY no almacenará información que cambie constantemente.

Ejemplos

- pronóstico del tiempo
- cotización del dólar
- ministros actuales
- resultados deportivos
- noticias
- vencimientos tributarios

Esta información será obtenida mediante APIs o servicios externos.

---

## Fuentes

Se priorizarán fuentes oficiales y académicas.

**Fuentes institucionales del Estado:**

- Presidencia de la República
- Parlamento del Uruguay
- IMPO
- Biblioteca Nacional del Uruguay
- Universidad de la República (UdelaR)
- MEC (Ministerio de Educación y Cultura)
- ANEP
- AGESIC
- BPS
- DGI
- INE
- Banco Central del Uruguay

**Fuentes culturales y municipales:**

- IMM / montevideo.gub.uy
- DAECPU (Directores Asociados de Espectáculos Carnavalescos y Populares del Uruguay)
- Museo del Carnaval
- Enciclopedia Uruguaya

**Fuentes de referencia general:**

- Wikipedia en español (utilizable como punto de partida; debe validarse contra fuentes primarias antes de incorporar al corpus)

Cuando existan múltiples fuentes, deberán privilegiarse las oficiales.

---

## Evolución

La BCN-UY es un proyecto vivo.

Nuevas categorías, documentos y relaciones podrán incorporarse sin alterar la arquitectura general.

Toda modificación deberá respetar esta especificación.

---

## Licencia

El contenido de la BCN-UY se distribuye bajo la licencia **Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)**.

Esto permite su uso, adaptación y redistribución libre, siempre que se cite la fuente y se mantenga la misma licencia en los trabajos derivados.

> Si el proyecto se mantiene como repositorio privado, reemplazar esta sección por la política de uso interno correspondiente.

---

## Estado del Proyecto

| Campo           | Valor           |
|-----------------|-----------------|
| Versión         | 1.0.0           |
| Estado          | En construcción |
| Documentos      | 0               |
| Última revisión | 2026-07-17      |
