# Base de Conocimiento Nacional Uruguaya (BCN-UY)

Versión: 2.0.0
Fecha: 2026-07-27
Estado: producción activa

---

## Descripción

La Base de Conocimiento Nacional Uruguaya (BCN-UY) es el repositorio
estructurado de conocimiento verificado que alimenta a **Guyunusa**,
la primera IA con identidad uruguaya profunda.

El sistema opera como un **RAG ligero** (Retrieval-Augmented Generation)
sin embeddings ni base vectorial, diseñado para funcionar en hosting
compartido (cPanel) con cero dependencias externas.

---

## Arquitectura del pipeline

```
Usuario envía consulta
        |
knowledge.service.js (searchKnowledge)
        |
Indice en memoria (~758 documentos)
        |
  Es pregunta sobre la propia Guyunusa?
    SI -> null (guard de identidad, el system prompt responde)
    NO -> puntúa documentos por coincidencia de keywords/título/cuerpo
        |
  Top 4 documentos (max 12.000 chars)
        |
  Se inyectan en el system prompt bajo "Base de conocimiento uruguayo"
        |
Guyunusa responde con datos verificados + su personalidad
```

### Detección automática de formato

| Formato | Ubicación | Cómo extrae metadatos |
|---------|-----------|----------------------|
| YAML frontmatter | knowledge/ raiz | titulo, categoria, keywords, tags, nombres |
| Markdown puro | knowledge/standalone/ | Titulo del H1, categoria del directorio padre, keywords auto-generadas |

### Auto-expansión

**No se necesita tocar código para agregar nuevos dominios.** El scanner
es recursivo y genérico: cualquier carpeta nueva con archivos .md dentro
de knowledge/ se indexa automáticamente al reiniciar el servidor.

Solo se excluyen: docs/, templates/, assets/, config/, indexes/, sources/.

---

## Estadísticas actuales (v2.0)

| Métrica | Valor |
|---------|-------|
| Total documentos indexados | 758 |
| Dominios BCN-UY (YAML frontmatter) | 19 |
| Dominios standalone (markdown puro) | 20 |
| Total dominios activos | 39 |
| Documentos excluidos (docs+templates) | 12 |
| Tiempo de indexación | ~580ms |
| Tiempo por consulta | ~2ms |

---

## Cómo agregar un nuevo dominio

### Con frontmatter YAML (BCN-UY)

1. Crear carpeta en knowledge/nombre-dominio/
2. Cada .md empieza con bloque ---/---
3. Reiniciar servidor -> se indexa solo

### Sin frontmatter (standalone)

1. Crear carpeta en knowledge/standalone/nombre-uy/
2. Cada .md empieza con # Titulo
3. La categoria se extrae del nombre de la carpeta
4. Reiniciar servidor -> se indexa solo

---

## Guard de identidad

Preguntas sobre el origen/creador de Guyunusa NO inyectan documentos.
La respuesta correcta esta en el system prompt; documentos extra la diluyen.

## Notas técnicas

- Sin embeddings: scoring por keywords con matching de palabra completa
- Limites: max 4 docs, max 12.000 chars total, max 5.000 chars por doc
- Stopwords de dominio: uruguay/uruguayo/uruguaya excluidos (no discriminan)

---

Desarrollado por Willans Junes - Algoritmos.uy - Montevideo, Uruguay
Guyunusa — Una voz uruguaya que llego al mundo sin perder su raiz
