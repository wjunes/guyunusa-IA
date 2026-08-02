# Base Nacional de Conocimiento Uruguayo (BNC-UY)

Version: 3.0.0
Fecha: julio 2026
Estado: produccion activa

---

## Arquitectura

RAG ligero sin embeddings ni base vectorial. Compatible con cPanel compartido.

- Indexacion en memoria al arrancar el servidor
- Scoring por keywords, titulo y cuerpo del documento
- Parser de Markdown puro (titulo del H1, categoria del directorio padre)
- Auto-expansion: carpeta nueva con .md = indexacion automatica

## Estadisticas

| Metrica | Valor |
|---------|-------|
| Total documentos indexados | 1.200 |
| Dominios standalone | 52 |
| Documentos excluidos (docs+templates) | 13 |
| Tiempo de indexacion | ~600ms |
| Tiempo por consulta | ~2ms |

## Dominios (52)

administracion-publica-estadisticas (22), aduanas (21),
afrodescendientes (20), agro (25), agua (24), archivos (10),
arqueologia (21), arquitectura (42), basquet (22), bibliotecas (11),
ciencias (27), clima-meteorologia (27), comercio-exterior (21),
cooperativismo (20), cultura (36), defensa-del-consumidor (18),
defensa-nacional (37), departamentos (21), deportes (26),
derechos-humanos (21), desarrollo-social-inclusion (23),
documentacion-oficial (16), economia-finanzas-impuestos (23),
educacion (26), educacion-superior (16), educacion-tecnica (13),
energia (30), gastronomia (21), geografia (23), gobierno-digital (15),
historia (26), justicia (21), medio-ambiente (21),
movilidad-transporte (22), naturaleza (30), oceanografia (23),
patrimonio (15), pueblos-originarios (25),
relaciones-internacionales (26), salud (32), seguridad-publica (33),
seguridad-social (16), servicio-civil (15), sinae (43),
sindicalismo (20), sistema-financiero (21), sistema-politico (23),
tecnologia (36), telecomunicaciones (21), transparencia (15),
turismo (22), vivienda (16)

## Como agregar un nuevo dominio

1. Crear carpeta en knowledge/standalone/nombre-uy/
2. Cada .md empieza con # Titulo
3. La categoria se extrae del nombre de la carpeta
4. Reiniciar servidor -> se indexa solo

## Guard de identidad

Preguntas sobre el origen/creador de Guyunusa NO inyectan documentos.

## Endpoint de diagnostico

GET /api/v1/health/rag?q=tu+consulta

---

Desarrollado por Willans Junes - Algoritmos.uy - Montevideo, Uruguay
