# Dosificación y propiedades del hormigón

## Concepto de dosificación

La **dosificación** (o diseño de mezcla) es el proceso de determinar las proporciones óptimas de cemento, áridos (arena y piedra), agua y aditivos para obtener un hormigón que satisfaga los requisitos de:
- **Trabajabilidad** en estado fresco (para una correcta colocación y compactación).
- **Resistencia mecánica** en estado endurecido (resistencia característica f'c a 28 días).
- **Durabilidad** frente al ambiente de exposición.
- **Economía** (minimizar el contenido de cemento sin comprometer la calidad).

El método de dosificación más utilizado en Uruguay como referencia es el **Método ACI 211** (American Concrete Institute, Comité 211), complementado con las normas UNIT para los materiales componentes.

---

## Parámetros de entrada para la dosificación

### Resistencia requerida (f'cr)
La resistencia requerida de diseño de mezcla es mayor que la resistencia característica de proyecto (f'c) para compensar la variabilidad de la producción:

f'cr = f'c + 1,34·S (cuando se dispone de datos estadísticos de producción)

o conservadoramente:

f'cr = f'c + 8,3 MPa (cuando no se dispone de historial estadístico)

donde S es la desviación estándar de los ensayos de resistencia del hormigón producido.

### Relación agua/cemento (a/c)
La relación a/c es el parámetro fundamental de la dosificación. La resistencia del hormigón disminuye cuando aumenta a/c (ley de Abrams). El CIRSOC 201 y ACI 318 establecen valores máximos de a/c según la clase de exposición:

| Clase de exposición | a/c máxima | f'c mínima (MPa) |
|---|---|---|
| Interior, sin contacto con agua | 0,60 | 21 |
| Exposición a humedad moderada | 0,55 | 25 |
| Exposición severa (suelos con sulfatos, ambientes costeros moderados) | 0,45 | 30 |
| Exposición muy severa (zona costera directa, salpicadura de olas) | 0,40 | 35 |

### Consistencia (asentamiento)
La consistencia del hormigón fresco se mide con el **cono de Abrams** (slump test). Los valores típicos según el tipo de elemento:

| Tipo de elemento | Asentamiento (cm) |
|---|---|
| Fundaciones y losas de hormigón simple | 2–5 |
| Losas, vigas y muros | 5–10 |
| Columnas y elementos de densidad alta de armadura | 8–12 |
| Hormigón bombeado | 12–18 |

### Tamaño máximo del árido (TMA)
El TMA condiciona la trabajabilidad y la cantidad de agua necesaria. Para estructuras de hormigón armado, el TMA debe ser ≤ 3/4 del espaciado mínimo entre barras de armadura y ≤ 1/5 del lado mínimo del molde.

Los TMA más frecuentes en Uruguay: 19 mm (3/4") y 25 mm (1") para estructura; 9,5 mm (3/8") para elementos de alta densidad de armadura.

---

## Proceso de dosificación (Método ACI 211)

**Paso 1:** Determinar f'cr (resistencia requerida) a partir de f'c y los datos de producción disponibles.

**Paso 2:** Determinar la relación a/c a partir de f'cr (mediante tablas o curvas empíricas). Verificar que no supere el límite por durabilidad.

**Paso 3:** Determinar el contenido de agua por m³ de hormigón en función del TMA y la consistencia requerida (tablas ACI 211).

**Paso 4:** Calcular el contenido de cemento: c = agua / (a/c).

**Paso 5:** Determinar el volumen de árido grueso por m³ en función del TMA y el módulo de finura de la arena (tablas ACI 211).

**Paso 6:** Calcular el volumen de arena por diferencia (volúmenes absolutos).

**Paso 7:** Corregir las proporciones por humedad de los áridos (los áridos se pesan húmedos; el agua de mezcla se ajusta según la humedad libre de los áridos).

---

## Corrección por humedad de los áridos

Los áridos en obra tienen humedad variable. La dosificación de laboratorio trabaja con áridos en condición **SSS** (Saturado Superficialmente Seco): los poros están llenos de agua pero la superficie está seca. En obra, los áridos pueden estar húmedos (con humedad libre) o secos.

**Corrección del agua de mezcla:**

Agua efectiva = Agua de dosificación – Agua libre de áridos

Agua libre árido = Peso árido húmedo × (W% – Ab%)

donde W% = humedad del árido, Ab% = absorción del árido.

Este ajuste es fundamental: un error en el agua efectiva modifica la relación a/c real y altera significativamente la resistencia del hormigón producido.

---

## Propiedades del hormigón fresco

### Trabajabilidad
La trabajabilidad es la facilidad con que el hormigón puede ser mezclado, transportado, colocado y compactado sin segregación. Se controla principalmente mediante el asentamiento (cono de Abrams) y se ajusta con la cantidad de agua o con aditivos plastificantes.

### Segregación y exudación
- **Segregación:** separación del árido grueso del mortero. Se produce por exceso de agua, caída libre excesiva o vibraciones prolongadas.
- **Exudación (sangrado):** ascenso del agua de mezcla hacia la superficie. Exceso de exudación debilita la zona superior de las capas de hormigón.

### Temperatura del hormigón fresco
La temperatura afecta el tiempo de fraguado y la resistencia. El ACI 305 (hormigonado en tiempo caluroso) recomienda que el hormigón fresco no supere los 32°C al momento de la colocación. En Uruguay, durante el verano en Montevideo y el norte del país, la temperatura del hormigón puede ser un factor crítico.

---

## Propiedades del hormigón endurecido

### Resistencia a la compresión
Es la propiedad mecánica fundamental. Se mide con probetas cilíndricas de 150×300 mm (o 100×200 mm) ensayadas a compresión axial a los 28 días. Las probetas se curan en laboratorio bajo condiciones controladas (temperatura 23±2°C, sumergidas en agua saturada de cal).

**Resistencia característica f'c:** valor por debajo del cual se puede esperar que caiga no más del 5% de los resultados de ensayo (percentil 5%). La resistencia media esperada es mayor que f'c.

**Criterio de aceptación (CIRSOC 201):** el hormigón es satisfactorio cuando:
1. Cada resultado individual ≥ f'c – 3,5 MPa
2. El promedio de tres resultados consecutivos ≥ f'c

### Módulo de elasticidad
El módulo de elasticidad del hormigón (Ec) se estima:

Ec = 4700·√f'c (MPa, con f'c en MPa)

Para f'c = 25 MPa: Ec ≈ 23.500 MPa (vs. 200.000 MPa del acero).

### Fluencia y retracción
- **Fluencia (creep):** deformación diferida bajo carga sostenida. El coeficiente de fluencia típico para hormigones normales en Uruguay es del orden de 2,0–3,0 (la deformación final por fluencia es 2 a 3 veces la deformación elástica inicial).
- **Retracción de fraguado y secado:** el hormigón se contrae al perder agua. La retracción puede generar fisuras si el hormigón está impedido de deformarse. Se controla con juntas de contracción, curado adecuado y, en algunos casos, con aditivos reductores de retracción.

### Durabilidad
La durabilidad del hormigón es su capacidad para resistir el deterioro a lo largo de la vida útil de la estructura. Depende de la permeabilidad (determinada fundamentalmente por la relación a/c y el grado de hidratación), el recubrimiento de armadura y las condiciones ambientales. Ver archivo 19 sobre durabilidad y patologías.

---

## Hormigón elaborado en Uruguay

En Uruguay es frecuente el uso de **hormigón elaborado** (mezclado en planta y transportado en mixer): permite mayor control de la dosificación que el mezclado en obra. Las plantas de hormigón elaborado están presentes en Montevideo y en las principales ciudades del interior.

Al solicitar hormigón elaborado, el comprador especifica: f'c (resistencia), TMA (tamaño máximo del árido), asentamiento requerido y, cuando corresponde, la clase de exposición y el contenido mínimo de cemento.

## Palabras clave

dosificación hormigón Uruguay ACI 211, relación agua cemento resistencia hormigón, cono de Abrams slump asentamiento Uruguay, resistencia característica f'c f'cr hormigón, corrección humedad áridos dosificación, fluencia retracción hormigón, módulo elasticidad hormigón Ec, criterio aceptación hormigón CIRSOC 201, probetas cilíndricas ensayo compresión 28 días, hormigón elaborado mixer Uruguay, tamaño máximo árido TMA, exudación segregación hormigón fresco
