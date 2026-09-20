# Control de calidad estructural en obra

## Objetivos del control de calidad

El **control de calidad** en obras de hormigón armado tiene por objetivo verificar que los materiales, la dosificación y la ejecución cumplen los requisitos del proyecto y las normas aplicables, de modo que la estructura terminada tenga la resistencia y la durabilidad previstas.

El control de calidad no garantiza que cada elemento sea perfecto: trabaja sobre la base de la estadística, estableciendo criterios de aceptación y rechazo que permiten tomar decisiones racionales sobre el material producido.

---

## Control del hormigón fresco

### Muestreo
El muestreo del hormigón debe realizarse de manera representativa. El CIRSOC 201 y el ACI 318 establecen requisitos mínimos de frecuencia de ensayo:

- Al menos una muestra por cada 100 m³ de hormigón colocado, o por cada 500 m² de losa, o por cada jornada de hormigonado (lo que ocurra primero).
- Al menos una muestra por elemento estructural de tipo diferente (columnas de primera planta, losas de segundo piso, etc.).
- Como mínimo, 5 muestras por tipo de hormigón utilizado en la obra.

Cada muestra da origen a un mínimo de **3 probetas cilíndricas** para ensayo a los 28 días (y opcionalmente a los 7 días para seguimiento temprano).

### Ensayo de asentamiento (cono de Abrams)
Se realiza en el momento de la toma de muestra, sobre el hormigón fresco antes de colocar las probetas. Permite verificar que la consistencia del hormigón entregado corresponde a lo especificado. Un asentamiento fuera del rango especificado puede indicar exceso o déficit de agua.

### Temperatura del hormigón fresco
En climas calurosos o fríos, se mide con termómetro la temperatura del hormigón fresco: valores > 32°C o < 5°C pueden requerir medidas correctivas.

### Contenido de aire
En hormigones con aditivo incorporador de aire (para resistencia a ciclos hielo-deshielo), se verifica el contenido de aire incorporado con el método de la olla de Washington (ASTM C231).

---

## Control del hormigón endurecido

### Fabricación y curado de probetas
Las probetas cilíndricas (150×300 mm o 100×200 mm) se fabrican en el lugar de la obra conforme a la norma UNIT correspondiente (equivalente a ASTM C31):
- Se llenan en dos o tres capas, compactando por varillado o vibración cada capa.
- Se identifican con el número de muestra, la fecha y el elemento al que corresponden.
- Se curan en obra durante las primeras 24 horas protegidas de golpes, temperatura extrema y desecación.
- Se transportan al laboratorio para curado normalizado (sumergidas en agua saturada de cal a 23±2°C) hasta el día del ensayo.

### Ensayo de compresión
El ensayo se realiza conforme a la norma UNIT equivalente a ASTM C39:
- Las probetas se retiran del curado, se miden, se refrentan (nivelado de las bases con azufre o con almohadillas elastoméricas) y se ensayan a compresión axial en prensa calibrada.
- La resistencia se calcula como la carga de rotura dividida por el área de la sección transversal de la probeta.
- El resultado se expresa en MPa.

### Criterio de aceptación de resistencia (CIRSOC 201 / ACI 318)
El hormigón de una obra se considera **aceptable** cuando se verifican simultáneamente:

1. El promedio de **cualquier serie de tres ensayos consecutivos** ≥ f'c
2. **Ningún resultado individual** sea < f'c – 3,5 MPa (para f'c ≤ 35 MPa)

Si estos criterios no se cumplen, el CIRSOC 201 establece pasos de investigación antes de tomar decisiones sobre la estructura.

---

## Procedimiento ante resultados no conformes

Cuando los resultados de las probetas no cumplen los criterios de aceptación, no implica necesariamente que la estructura deba demolerse. El procedimiento es:

**Paso 1 — Verificar la validez de los ensayos:** comprobar que las probetas fueron fabricadas, curadas y ensayadas correctamente. Los errores de muestreo, curado o ensayo pueden generar resultados bajos que no reflejan la resistencia real del hormigón en la estructura.

**Paso 2 — Ensayos adicionales sobre la estructura:** si los ensayos de probeta son válidos y los resultados son bajos, se realizan ensayos directos sobre el hormigón en la estructura:

- **Esclerometría (martillo Schmidt):** mide la dureza superficial del hormigón. Es un ensayo no destructivo de screening; no equivale al ensayo de compresión en probetas, pero permite identificar zonas débiles.
- **Ultrasonido (velocidad de onda):** mide la velocidad de propagación de ondas ultrasónicas a través del hormigón. Permite detectar discontinuidades internas (oquedades, nidos de árido). Ensayo no destructivo.
- **Extracción de testigos (corazones):** se extraen cilindros de hormigón de la estructura con perforadora diamantada. Los testigos se ensayan a compresión en laboratorio. Es el método más directo y confiable para conocer la resistencia real del hormigón in situ. La correlación entre la resistencia del testigo y la resistencia de probeta estándar depende de la relación h/d del testigo (corrección si h/d ≠ 2).

**Paso 3 — Evaluación estructural:** si los ensayos sobre la estructura confirman resistencias bajas, un ingeniero estructural debe evaluar si la estructura puede mantenerse en servicio (quizás con restricciones de uso) o si requiere refuerzo o demolición.

---

## Control de armaduras

### Verificación de posición y recubrimiento
Antes del hormigonado, debe verificarse:
- Que las armaduras corresponden al diámetro, cantidad y disposición indicados en los planos.
- Que los recubrimientos son correctos (verificar con regla milimetrada que los separadores están colocados y tienen el espesor adecuado).
- Que los empalmes por traslape tienen la longitud correcta.
- Que las armaduras están libres de óxido suelto, aceite, barro u otras impurezas que afecten la adherencia.

El óxido superficial adherente (rojizo, no laminado) en barras nuevas es aceptable: no afecta la adherencia. El óxido laminado (que se desprende en escamas al golpear la barra) o la barra muy corroída deben descartarse.

### Ensayos sobre acero
El acero de armadura entregado en obra debe tener el certificado de calidad del fabricante. Los ensayos de verificación (tracción, doblado) se realizan en laboratorio sobre muestras de las partidas recibidas.

---

## Control de encofrado y geometría

Antes del hormigonado deben verificarse:
- La posición y las dimensiones del encofrado corresponden a los planos.
- El encofrado está adecuadamente soportado y arriostrado.
- Las juntas del encofrado están selladas para evitar pérdida de lechada.
- El nivel de la base del encofrado y la plomada de los muros y columnas.

---

## Plan de calidad de obra

Para obras de cierta envergadura (edificios de más de 5 plantas, infraestructura pública, obras industriales), es recomendable establecer un **plan de calidad** documentado que incluya:
- Especificaciones de materiales y proveedores aprobados.
- Procedimientos de muestreo y frecuencia de ensayos.
- Criterios de aceptación y rechazo.
- Procedimiento ante no conformidades.
- Registros (hojas de control de hormigonado, actas de inspección, certificados de materiales).

En Uruguay, las obras públicas licitadas por el MTOP u otras instituciones del Estado exigen habitualmente el cumplimiento de procedimientos de control de calidad y la presentación de registros.

---

## Inspección técnica de obra

La **inspección técnica** es la supervisión permanente o periódica de la obra por parte de un profesional independiente (o del comitente), distinto del director de obra del contratista. Su función es verificar el cumplimiento del proyecto y las especificaciones.

En Uruguay, para las obras públicas, la inspección técnica es ejercida por funcionarios del organismo comitente. Para las obras privadas, la Ley de Ordenamiento Territorial y los reglamentos departamentales establecen las condiciones de supervisión y responsabilidad profesional.

## Palabras clave

control calidad hormigón Uruguay, muestreo probetas cilíndricas hormigón, cono Abrams ensayo slump campo, criterio aceptación resistencia CIRSOC 201 ACI 318, esclerometría martillo Schmidt ensayo no destructivo, extracción testigos corazones hormigón in situ, ultrasonido hormigón ensayo no destructivo, verificación armaduras recubrimiento antes hormigonado, plan calidad obra hormigón armado, inspección técnica obra Uruguay, no conformidad hormigón investigación, resistencia testigo vs probeta estándar corrección
