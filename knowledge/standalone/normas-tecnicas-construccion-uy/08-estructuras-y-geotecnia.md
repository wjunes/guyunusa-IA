# Estructuras y Geotecnia en la Construcción Uruguaya

## Marco normativo estructural

El diseño estructural de edificios en Uruguay se basa en un conjunto de normas técnicas que regulan el comportamiento de los materiales (hormigón armado, acero, madera) y las cargas a considerar. A diferencia de países con alta sismicidad, Uruguay se ubica en una zona de **muy baja sismicidad** (sin norma sísmica de aplicación obligatoria a nivel nacional a agosto de 2026), lo que simplifica el diseño estructural frente a otras regiones de América Latina. Sin embargo, las cargas de viento y las cargas de uso son determinantes en el diseño.

Los documentos de referencia más utilizados por los proyectistas estructurales uruguayos son:

- **Reglamento CIRSOC 201** (Argentina): para diseño de estructuras de hormigón armado y pretensado. Uruguay lo adopta como referencia técnica, dado que no existe un reglamento estructural propio de aplicación obligatoria.
- **Reglamento CIRSOC 301** (Argentina): para diseño de estructuras de acero.
- **CIRSOC 102**: para determinación de cargas (peso propio, sobrecargas de uso, cargas de viento, nieve).
- **Normas UNIT** específicas para materiales (acero, cemento, áridos, madera).
- **ACI 318** (American Concrete Institute): referencia complementaria internacional para hormigón armado.
- **AISC 360** (American Institute of Steel Construction): referencia para estructuras de acero.

## Geotecnia y estudios de suelo

El estudio geotécnico previo a la construcción es esencial para determinar la capacidad portante del suelo y diseñar la fundación correcta. En Uruguay no existe una norma geotécnica propia de aplicación obligatoria a nivel nacional, pero se utilizan como referencia las normas **ASTM**, **ISO** y **CIRSOC 501** (Argentina, cargas sobre fundaciones).

**Tipos de estudio geotécnico según escala de la obra**:

| Tipo de obra | Estudio mínimo recomendado |
|--------------|---------------------------|
| Vivienda unifamiliar de 1-2 plantas | Reconocimiento visual + sondeo manual o penetrómetro dinámico |
| Edificio de 3-6 plantas | SPT (Standard Penetration Test) + perfiles estratigráficos |
| Edificio de más de 6 plantas | SPT + calicatas + ensayos de laboratorio (granulometría, Atterberg, consolidación) |
| Obras de infraestructura | SPT + presiómetro + ensayos de carga en placa |

**SPT (Standard Penetration Test — Ensayo de Penetración Estándar)**: es el ensayo geotécnico más utilizado en Uruguay. Consiste en hincar un muestreador estándar en el suelo mediante golpes de un martillo de 63,5 kg caído 76 cm; se registran los golpes para cada intervalo de 15 cm (valor N). El valor N del SPT permite estimar la densidad relativa de arenas y la resistencia no drenada de arcillas.

**Clasificación de suelos en Uruguay**: los suelos más frecuentes en Uruguay incluyen:
- **Arcillas limosas** (suelos de baja plasticidad a alta plasticidad): frecuentes en la cuenca del Río de la Plata, el litoral y las zonas bajas del interior. Requieren análisis de consolidación y pueden tener capacidad portante baja.
- **Arenas finas y limos arenosos**: frecuentes en las costas y en zonas ribereñas. Susceptibles a licuación ante cargas dinámicas (aunque la sismicidad en Uruguay es muy baja, se debe verificar).
- **Tosca (caliche calcáreo)**: horizonte de carbonato de calcio presente en muchos suelos del sur de Uruguay; puede tener alta capacidad portante pero comportamiento frágil ante excavaciones.
- **Roca cristalina** (granito, basalto): aflora en el norte, noreste y en el sur (Montevideo, Canelones). Capacidad portante muy alta; permite fundaciones superficiales de alta carga.

## Tipos de fundaciones

La elección del tipo de fundación depende de la capacidad portante del suelo, las cargas de la estructura y las condiciones de nivel freático:

**Fundaciones superficiales**:
- **Zapatas aisladas**: para columnas aisladas sobre suelo de buena capacidad portante (qa > 150 kPa)
- **Vigas de fundación (zoclos)**: conectan las zapatas y rigidizan el sistema de fundación; distribuyen mejor las cargas
- **Losa de fundación**: cuando el suelo tiene baja capacidad portante o las cargas son altas; toda la superficie de la planta baja actúa como fundación

**Fundaciones profundas**:
- **Pilotes de hormigón in situ** (pilotes Franki, pilotes barrenados): para suelos blandos o cargas muy altas; la carga se transfiere a estratos profundos con mayor capacidad portante
- **Pilotes prefabricados de hormigón** y **pilotes de acero (perfiles H o tubos)**: para obras de infraestructura portuaria y puentes

## Cargas de diseño

El diseño estructural considera las siguientes cargas:

**Cargas permanentes (Carga Muerta — CM)**: peso propio de la estructura (hormigón armado: 25 kN/m³; acero: 78,5 kN/m³) más el peso de los elementos no estructurales (tabiques, revestimientos, instalaciones fijas).

**Sobrecargas de uso (Carga Viva — CV)**: cargas impuestas por el uso del edificio. El CIRSOC 102 establece valores mínimos:

| Uso del local | Sobrecarga mínima (kN/m²) |
|--------------|--------------------------|
| Vivienda (dormitorios, living) | 2,0 |
| Vivienda (escaleras, balcones) | 3,0 |
| Oficinas | 2,5 |
| Salas de reunión, restaurantes | 4,0 |
| Almacenes, depósitos ligeros | 5,0 |
| Estacionamientos de vehículos | 3,0 |
| Azoteas inaccesibles | 1,0 |

**Cargas de viento**: Uruguay tiene vientos predominantes del sur y suroeste (pampero) con ráfagas que pueden superar 100 km/h. El CIRSOC 102 establece la presión básica del viento según la zona geográfica y la altura del edificio. Para edificios de altura media y alta en Montevideo, el viento es la carga horizontal dominante (en ausencia de sismicidad significativa).

**Cargas de agua y empuje de tierras**: en sótanos y muros de contención, el diseño debe contemplar el empuje hidrostático del agua freática y el empuje activo/pasivo del suelo.

## Estructuras de hormigón armado

El **hormigón armado** es el sistema estructural dominante en la construcción uruguaya (edificios de apartamentos, oficinas, hospitales, centros comerciales). Las tipologías más frecuentes son:

**Pórticos**: sistema de columnas y vigas de hormigón armado que forman marcos rígidos. Apto para edificios de hasta 20-25 plantas con losas entre plantas.

**Muros estructurales (muros de corte)**: usados en edificios de mediana y alta altura para resistir las cargas horizontales de viento. Se combinan con pórticos (sistema dual).

**Losas**: las losas de hormigón armado para forjados pueden ser:
- **Losas macizas bidireccionales**: armadas en dos direcciones, para luces de hasta 7-8 m
- **Losas nervuradas (alivianadas)**: con nervios o casetones; reducen el peso y permiten mayores luces
- **Losas planas (flat slab)**: sin vigas; las cargas se transfieren directamente a las columnas mediante capiteles o losas de transferencia; frecuentes en Uruguay en edificios de planta libre
- **Losas mixtas Steel Deck**: chapa de acero colaborante + hormigón; usada en estructuras mixtas acero-hormigón

**Control de fisuración**: el reglamento CIRSOC 201 limita el ancho de fisura en elementos de hormigón armado (w ≤ 0,30 mm para elementos interiores; w ≤ 0,20 mm para elementos expuestos a ambientes agresivos o con estética controlada) para garantizar la durabilidad del armado.

## Estructuras de acero

Las estructuras de acero son frecuentes en Uruguay para:
- Galpones industriales y depósitos (estructura de pórticos de acero + cerramientos metálicos)
- Estructuras de techos de grandes luces (polideportivos, shoppings, hangares)
- Edificios de altura media con estructura mixta acero-hormigón
- Pasarelas y puentes peatonales

Los aceros estructurales más usados en Uruguay son el **ASTM A36** (límite de fluencia 250 MPa) y los aceros de alta resistencia **ASTM A572 Gr.50** (350 MPa) y **ASTM A992** para perfiles H. Los perfiles se importan principalmente de Argentina y Brasil.

## Madera estructural

La madera (pino taeda, eucalipto, pino elliottii) tiene creciente uso estructural en Uruguay, especialmente en:
- Techos de viviendas unifamiliares (armaduras tipo Fink o Howe, fabricadas en planta con conectores metálicos —"clavijas"— o ensambles tradicionales)
- Sistemas constructivos de madera maciza (Timber Frame) o entramado liviano (Wood Framing)
- Decks y estructuras de uso exterior

Las normas UNIT para madera estructural adoptan los criterios de clasificación visual y mecánica de las normas IRAM y de la norma europea EN 338 (clases resistentes de madera: C14 a C40 para coníferas).

## Palabras clave

estructuras hormigón armado Uruguay CIRSOC 201 pórticos muros corte losas planas, geotecnia estudio suelo Uruguay SPT penetración estándar capacidad portante estratigrafía, arcillas limosas tosca granito basalto suelos Uruguay fundaciones capacidad portante, zapatas aisladas vigas fundación losa fundación Uruguay pilotes superficial profunda, cargas diseño estructural Uruguay CIRSOC 102 carga muerta viva viento sobrecargas uso, viento Uruguay pampero sur suroeste presión edificios altura diseño horizontal, acero estructural Uruguay ASTM A36 A572 A992 pórticos galpones industria, madera estructural Uruguay pino taeda eucalipto armaduras techo Wood Framing Timber Frame, losas hormigón Uruguay maciza nervurada flat slab Steel Deck mixta, pilotes hormigón in situ Franki barrenados Uruguay suelos blandos fundaciones profundas, sismicidad muy baja Uruguay zona diseño estructural sin norma sísmica nacional, ACI 318 AISC 360 Uruguay referencias complementarias hormigón acero estructural
