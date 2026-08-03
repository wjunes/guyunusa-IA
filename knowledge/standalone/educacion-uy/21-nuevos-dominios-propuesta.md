# Propuesta de Nuevos Dominios para BNC-UY

## Descripción

Este documento propone la creación de **nuevos dominios independientes** para la Base Nacional de Conocimiento Uruguay (BNC-UY), derivados del análisis del dominio `educacion-uy`. Cada propuesta incluye justificación, alcance potencial, prioridad y organismos fuente.

La creación de dominios independientes está justificada cuando: (a) el volumen de información supera la capacidad de un subdominio dentro de `educacion-uy`, (b) la temática tiene entidad propia con múltiples instituciones y fuentes, y (c) el dominio sería consultado de forma independiente por usuarios de un sistema RAG.

## Dominios propuestos

### 1. `patrimonio-uy` — Patrimonio Cultural del Uruguay

**Prioridad:** ALTA

**Justificación:** El patrimonio cultural uruguayo tiene una entidad institucional, normativa y técnica propia que supera la capacidad de tratamiento dentro de `educacion-uy`. La Comisión del Patrimonio Cultural de la Nación, los sitios Patrimonio Mundial de la UNESCO (Colonia del Sacramento, Fray Bentos), los Monumentos Históricos Nacionales, el patrimonio inmaterial (candombe, tango) y las políticas de protección merecen un dominio propio.

**Alcance:**
- Comisión del Patrimonio Cultural de la Nación (MEC)
- Sitios Patrimonio Mundial UNESCO en Uruguay
- Monumentos Históricos Nacionales (declaraciones, estado)
- Patrimonio inmaterial (candombe, tango, carnaval, gastronomía)
- Marco legal de protección patrimonial (Ley 14.040 y modificativas)
- Museos nacionales y departamentales
- Restauración y conservación patrimonial
- AGN como patrimonio documental

**Organismos fuente:** Comisión del Patrimonio MEC, UNESCO, AGN, municipios, Intendencias

**Archivos estimados:** 12–15

### 2. `cultura-uy` — Cultura, Artes y Expresiones Culturales del Uruguay

**Prioridad:** ALTA

**Justificación:** La cultura uruguaya —música popular, carnaval, artes visuales, teatro, literatura, cine, danza, artes escénicas— es un campo vastísimo que ya tiene presencia parcial en BNC-UY (dominio `carnaval`) pero carece de un dominio sistémico. La DNC del MEC, el FEFCA, el SODRE, los festivales nacionales e internacionales, la industria cultural y las políticas de fomento justifican un dominio independiente.

**Alcance:**
- Dirección Nacional de Cultura (DNC) del MEC
- SODRE: televisión pública, radio, ópera, ballet, orquesta sinfónica
- INAE e INBA
- Literatura uruguaya (Rodó, Benedetti, Onetti, Galeano, et al.)
- Música uruguaya (candombe, tango, murga, rock, pop)
- Teatro y danza
- Cine uruguayo
- Artes visuales (Torres García, Barradas)
- FEFCA y política de fomento cultural
- Festivales culturales (Montevideo Festival, etc.)

**Organismos fuente:** DNC, SODRE, INAE, INBA, Cinemateca Uruguaya, AGADU, AUC

**Archivos estimados:** 18–22

### 3. `educacion-superior-uy` — Educación Superior Universitaria en Uruguay

**Prioridad:** ALTA

**Justificación:** La Udelar, con ~160.000 estudiantes, es una institución con suficiente complejidad para justificar un dominio propio separado de `educacion-uy`. El dominio existente `udelar` puede ser ampliado y reformalizado como `educacion-superior-uy`, incorporando también las universidades privadas y el debate sobre la educación superior. Alternativamente, `udelar` puede mantenerse como dominio propio y crear `universidades-privadas-uy`.

**Alcance:**
- Udelar: historia, estructura, facultades, CENUR, cogobierno, ingreso irrestricto
- UTEC: sedes, carreras, modelo pedagógico
- Universidades privadas: UCU, ORT, UM, CLAEH
- Marco regulatorio: MEC, habilitación, acreditación
- Posgrados y doctorados
- ARCU-SUR y acreditación regional

**Nota:** El dominio existente `udelar` cubre una parte de este espacio. Se recomienda evaluar si ampliarlo o crear un nuevo dominio de alcance más amplio.

**Organismos fuente:** Udelar, UTEC, MEC (habilitación), universidades privadas

**Archivos estimados:** 14–18

### 4. `educacion-tecnica-uy` — Educación Técnica y Formación Profesional

**Prioridad:** MEDIA-ALTA

**Justificación:** La UTU/DGETP es la segunda institución de educación media del país (~130.000 estudiantes) y tiene una complejidad curricular, histórica e institucional que justifica un dominio propio. Incluye la articulación con INEFOP, las tecnicaturas y la educación técnica agraria.

**Alcance:**
- DGETP/UTU: historia, estructura, oferta educativa completa
- Bachilleratos tecnológicos por área
- Tecnicaturas universitarias y no universitarias
- Centros agrarios
- FPB (Formación Profesional Básica)
- Educación técnica en contextos especiales (cárceles, INAU)
- INEFOP: formación laboral continua
- Articulación UTU-UTEC-empresas

**Organismos fuente:** DGETP/UTU, INEFOP, ANEP, UTEC

**Archivos estimados:** 12–16

### 5. `bibliotecas-uy` — Bibliotecas y Sistema Bibliotecario del Uruguay

**Prioridad:** MEDIA

**Justificación:** La Biblioteca Nacional, las bibliotecas departamentales, las bibliotecas universitarias (Udelar, UTEC), las bibliotecas escolares y las bibliotecas especializadas forman un sistema con entidad propia. Uruguay tiene además un movimiento biblioteconómico activo y referentes en la región.

**Alcance:**
- Biblioteca Nacional: historia, fondos, depósito legal, servicios
- Sistema de Bibliotecas de Udelar
- Bibliotecas departamentales y municipales
- Bibliotecas escolares (ANEP)
- Bibliotecas especializadas (AGN, ministerios)
- AUCI (cooperación internacional en bibliotecas)
- Asociación Uruguaya de Archivólogos y Bibliotecólogos (AUB)
- Marco legal: Ley de depósito legal

**Organismos fuente:** Biblioteca Nacional, Udelar, ANEP, MEC, AUB

**Archivos estimados:** 8–12

### 6. `archivos-uy` — Archivos y Documentación Histórica del Uruguay

**Prioridad:** MEDIA

**Justificación:** El AGN, los archivos históricos departamentales, los archivos del Poder Judicial, los archivos militares y los archivos especializados (de prensa, audiovisuales) merecen un dominio propio para la BNC-UY, especialmente dado el creciente interés por la historia reciente y la memoria colectiva.

**Alcance:**
- AGN: historia, fondos, acceso, digitalización
- Archivos departamentales
- Archivo de la Cámara de Representantes y Senado
- Archivo del Poder Judicial
- Archivo de la Memoria del MUME (Museo de la Memoria)
- Archivos audiovisuales del SODRE
- Marco legal del patrimonio documental
- Digitalización y acceso abierto

**Organismos fuente:** AGN, MEC, MUME, Cámara de Representantes, Poder Judicial

**Archivos estimados:** 8–10

## Resumen de propuestas

| Dominio propuesto | Prioridad | Archivos est. | Organismos clave |
|-------------------|-----------|--------------|-----------------|
| `patrimonio-uy` | ALTA | 12–15 | Comisión Patrimonio MEC, UNESCO |
| `cultura-uy` | ALTA | 18–22 | DNC, SODRE, INAE, INBA |
| `educacion-superior-uy` | ALTA | 14–18 | Udelar, UTEC, MEC |
| `educacion-tecnica-uy` | MEDIA-ALTA | 12–16 | DGETP/UTU, INEFOP |
| `bibliotecas-uy` | MEDIA | 8–12 | Biblioteca Nacional, Udelar |
| `archivos-uy` | MEDIA | 8–10 | AGN, MUME |

**Total de nuevos archivos estimados:** 72–93 archivos en 6 dominios

## Recomendación de secuencia de creación

1. **`patrimonio-uy`**: alta demanda de consultas RAG; base normativa e institucional clara; se puede construir con fuentes oficiales.
2. **`cultura-uy`**: volumen muy grande; alta demanda; puede dividirse en subproyectos (música, teatro, literatura, etc.).
3. **`educacion-superior-uy`**: reorganizar y ampliar el dominio `udelar` existente; incorporar UTEC y privadas.
4. **`educacion-tecnica-uy`**: extraer y expandir el contenido de `educacion-uy/06` y `educacion-uy/09`.
5. **`bibliotecas-uy`** y **`archivos-uy`**: menor urgencia; fuentes más especializadas.

## Palabras clave

nuevos dominios BNC-UY, propuesta dominios conocimiento Uruguay, patrimonio-uy dominio, cultura-uy dominio, educacion-superior-uy dominio, educacion-tecnica-uy dominio, bibliotecas-uy dominio, archivos-uy dominio, Base Nacional Conocimiento Uruguay expansión, dominios RAG Uruguay, organismos educativos culturales Uruguay, estructuración conocimiento Uruguay
