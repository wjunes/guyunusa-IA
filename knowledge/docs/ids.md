# Especificación de Identificadores (IDs)

Versión: 1.0.0

---

## Objetivo

Todo documento perteneciente a la Base de Conocimiento Nacional Uruguaya (BCN-UY) deberá poseer un identificador único, permanente e inmutable.

El identificador permite:

- Identificar un documento de forma unívoca.
- Establecer relaciones entre documentos.
- Facilitar la indexación.
- Simplificar la búsqueda.
- Mantener compatibilidad entre versiones.

Un ID nunca deberá reutilizarse ni modificarse una vez asignado.

---

## Estructura General

Todos los identificadores seguirán la siguiente estructura:

```
TIPO_AREA_NUMERO
```

Ejemplo

```
PER_LIT_0001
```

Donde:

| Segmento | Significado |
|----------|-------------|
| TIPO | Tipo de documento |
| AREA | Área temática |
| NUMERO | Número secuencial |

---

## Tipos de Documento

| Código | Tipo |
|---------|------|
| PER | Persona |
| TEM | Tema |
| INS | Institución |
| LUG | Lugar |
| EVT | Evento |
| OBR | Obra |
| MOV | Movimiento |
| NOR | Normativa |
| ORG | Organización |

---

## Áreas Temáticas

## Identidad

```
IDN
```

## Historia

```
HIS
```

## Política

```
POL
```

## Literatura

```
LIT
```

## Teatro

```
TEA
```

## Artes Plásticas

```
PLA
```

## Música

```
MUS
```

## Carnaval

```
CAR
```

## Candombe

```
CAN
```

## Turismo

```
TUR
```

## Gastronomía

```
GAS
```

## Deportes

```
DEP
```

## Educación

```
EDU
```

## Salud

```
SAL
```

## Economía

```
ECO
```

## Legislación

```
LEG
```

## Software

```
SOF
```

## BPS

```
BPS
```

## DGI

```
DGI
```

---

## Numeración

La numeración será secuencial dentro de cada combinación Tipo + Área.

Formato:

```
0001
```

El número secuencial deberá usar siempre 4 dígitos, completando con ceros a la izquierda cuando corresponda.

Ejemplos

```
PER_LIT_0001

PER_LIT_0002

PER_LIT_0003
```

```
PER_POL_0001

PER_POL_0002
```

```
TEM_CAR_0001

TEM_CAR_0002
```

Cada combinación mantiene su propia secuencia.

---

## Ejemplos

## Persona

```
PER_LIT_0001
Mario Benedetti
```

```
PER_MUS_0001
Alfredo Zitarrosa
```

---

## Tema

```
TEM_HIS_0001
Independencia del Uruguay
```

---

## Movimiento

```
MOV_MUS_0001
Canto Popular Uruguayo
```

---

## Obra

```
OBR_LIT_0001
La Tregua
```

---

## Institución

```
INS_BPS_0001
Banco de Previsión Social
```

---

## Lugar

```
LUG_TUR_0001
Cabo Polonio
```

---

## Evento

```
EVT_HIS_0001
Batalla de Las Piedras
```

---

## Organización

```
ORG_DEP_0001
Asociación Uruguaya de Fútbol
```

---

## Reglas

Los IDs:

- son únicos;
- son permanentes;
- nunca cambian;
- nunca se reutilizan;
- no contienen espacios;
- utilizan únicamente letras mayúsculas, números y guiones bajos (_).

---

## IDs Reservados

Se recomienda reservar bloques para documentos institucionales.

Ejemplo

```
0001 - 0099

Documentos fundamentales
```

```
0100 - 9999

Documentos generales
```

Esto facilita futuras reorganizaciones.

---

## Relación con Metadata

Todo documento deberá declarar su identificador en el bloque YAML.

Ejemplo

```yaml
---
id: PER_LIT_0001

titulo: Mario Benedetti

tipo: persona

categoria: cultura

subcategoria: literatura
---
```

---

## Compatibilidad

Una vez publicado un documento:

- su ID nunca deberá modificarse;
- el cambio de nombre del archivo no implica cambio de ID;
- el cambio de categoría tampoco modifica el ID.

El ID representa la identidad permanente del documento.

---

## Evolución

En futuras versiones podrán incorporarse nuevos códigos de tipo y nuevas áreas temáticas.

La incorporación de nuevos códigos nunca deberá alterar los ya existentes, garantizando la compatibilidad hacia atrás (backward compatibility).
