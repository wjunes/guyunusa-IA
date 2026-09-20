# Cálculo de estructuras de hormigón armado

## Marco normativo de referencia

El diseño de estructuras de hormigón armado en Uruguay se basa principalmente en el **Reglamento CIRSOC 201** (Centro de Investigación de los Reglamentos Nacionales de Seguridad para las Obras Civiles, Argentina), adoptado como referencia técnica en ausencia de un reglamento estructural propio de aplicación obligatoria a nivel nacional.

Como referencia internacional complementaria se utiliza el **ACI 318** (American Concrete Institute, EE.UU.), cuya metodología es conceptualmente equivalente al CIRSOC 201. Ambos emplean el método de **diseño por resistencia** (Load and Resistance Factor Design — LRFD): se aplican factores de mayoración a las cargas (φ_cargas) y factores de reducción a la resistencia de los materiales (φ_resistencia), de modo que la resistencia de diseño sea mayor o igual a la solicitación de diseño.

**Principio fundamental:**

φ·Rn ≥ Σ(γi·Qi)

Donde:
- φ = factor de reducción de resistencia (varía según el tipo de solicitación)
- Rn = resistencia nominal del elemento
- γi = factores de mayoración de carga
- Qi = valores nominales de las acciones (cargas)

---

## Combinaciones de carga

Las combinaciones de carga de diseño más utilizadas (conforme CIRSOC 101/102 y ACI 318) son:

- **1,4·CM** (solo carga muerta)
- **1,2·CM + 1,6·CV** (carga muerta + carga viva, la más frecuentemente determinante)
- **1,2·CM + 1,0·CV + 1,0·CW** (con viento)
- **0,9·CM + 1,0·CW** (con viento, verificación de estabilidad)

Donde CM = carga muerta, CV = carga viva, CW = carga de viento.

En Uruguay, dado que la sismicidad es muy baja, generalmente no se agregan combinaciones sísmicas al diseño de edificios corrientes.

---

## Factores de reducción de resistencia (φ)

El CIRSOC 201 y el ACI 318 establecen factores φ según el tipo de solicitación:

| Tipo de solicitación | Factor φ |
|---|---|
| Flexión (sin carga axial) | 0,90 |
| Tracción axial | 0,90 |
| Compresión axial (con estribos) | 0,65 |
| Compresión axial (con espirales) | 0,70 |
| Corte y torsión | 0,75 |
| Aplastamiento sobre hormigón | 0,65 |

---

## Diseño de vigas a flexión

### Principios básicos
El hormigón armado trabaja combinando la resistencia a la compresión del hormigón con la resistencia a la tracción del acero de armadura. La distribución de tensiones en la sección transversal se modela mediante el **bloque rectangular de compresiones** (bloque de Whitney).

**Hipótesis de diseño:**
- Sección plana permanece plana tras la deformación (compatibilidad de deformaciones).
- Deformación unitaria máxima del hormigón comprimido: εcu = 0,003.
- El acero trabaja elásticamente hasta su límite de fluencia fy.
- Se desprecia la resistencia a tracción del hormigón.

### Diseño a flexión simple (viga rectangular)

**Datos de partida:** Momento último de diseño Mu (kN·m), resistencia del hormigón f'c (MPa), límite de fluencia del acero fy (MPa), ancho de la viga b (mm), altura total h (mm).

**Altura útil:** d = h – recubrimiento – diámetro de estribo – φ_barra/2

**Momento resistente nominal:**

Mn = As·fy·(d – a/2)

donde: a = As·fy / (0,85·f'c·b) (profundidad del bloque de compresión equivalente)

**Verificación:** φ·Mn ≥ Mu

**Armado mínimo** (para garantizar ductilidad, CIRSOC 201):

As,min = max [ 0,25·√f'c/fy · b·d ; 1,4/fy · b·d ]

**Armado máximo** (para garantizar modo de falla dúctil):

ρmax ≤ 0,75·ρb (donde ρb es la cuantía balanceada)

Para f'c = 25 MPa y fy = 420 MPa: ρmax ≈ 0,016 (1,6%)

### Tabla de referencia orientativa (viga rectangular, fy=420 MPa)

| f'c (MPa) | ρmin (%) | ρbalanceada (%) | ρmax diseño (%) |
|---|---|---|---|
| 21 | 0,33 | 2,8 | 2,1 |
| 25 | 0,33 | 2,9 | 2,2 |
| 30 | 0,33 | 3,1 | 2,3 |

---

## Diseño de vigas a corte

El corte en vigas de hormigón armado es resistido por la contribución del hormigón (Vc) y de los estribos (Vs):

Vn = Vc + Vs

**Resistencia del hormigón al corte:**

Vc = 0,17·√f'c · b·d (en N, con f'c en MPa, b y d en mm)

**Resistencia de los estribos:**

Vs = Av·fy·d / s

donde Av = área total de ramas del estribo, s = separación de estribos.

**Verificación:** φ·Vn ≥ Vu (φ = 0,75 para corte)

**Separación máxima de estribos:**
- s ≤ d/2 cuando Vs ≤ 0,33·√f'c·b·d
- s ≤ d/4 cuando Vs > 0,33·√f'c·b·d
- s ≤ 600 mm en todos los casos

**Zona de confinamiento en apoyos:** en las zonas de gran momento y corte (primeras longitudes junto a los apoyos), se deben colocar estribos a menor separación.

---

## Diseño de columnas

Las columnas trabajan fundamentalmente bajo carga axial comprimida con flexión (excentricidad). El diseño se realiza mediante **diagramas de interacción** P-M (carga axial vs. momento).

### Excentricidad mínima
Para tener en cuenta imperfecciones geométricas, el CIRSOC 201 establece una excentricidad mínima:

emin = 0,01·h + 0,03·d

(donde h y d son dimensiones de la sección)

### Cuantía de armado
- **Mínima:** ρmin = 1% del área bruta (Ag)
- **Máxima:** ρmax = 8% del área bruta (en la práctica se recomienda no superar 4–5% por dificultades de hormigonado)

### Esbeltez
Las columnas cortas (esbeltez λ < 22 para columnas con desplazamiento lateral restringido) se diseñan sin amplificación de momentos. Las columnas esbeltas requieren considerar los efectos de segundo orden (amplificación de momentos por la deformación lateral).

---

## Diseño de losas

### Losa maciza unidireccional
Se diseña como una viga de ancho unitario (1 m). Se calcula el momento y corte por metro de ancho, y se dispone la armadura principal en la dirección de la luz y la armadura de distribución (mínimo 20% de la armadura principal) en la dirección transversal.

### Losa maciza bidireccional
Para losas con relación de lados Ly/Lx ≤ 2 se trabajan en dos direcciones. El método de los coeficientes (tablas de Ca y Cb según condiciones de borde) permite determinar los momentos de diseño en cada dirección.

### Losa plana (flat slab)
La losa plana transmite cargas directamente a las columnas sin vigas. El diseño debe verificar especialmente el **punzonamiento** (corte por perforación alrededor de la columna). La resistencia al punzonamiento es un modo de falla frágil y crítico.

**Resistencia al punzonamiento (CIRSOC 201 / ACI 318):**

Vc = 0,33·√f'c · bo·d

donde bo = perímetro del área crítica (a d/2 del contorno de la columna).

Si la resistencia del hormigón no es suficiente, se deben agregar conectores de corte (studbolts o similar) o capiteles.

---

## Acero de armadura

En Uruguay se utiliza principalmente acero de armadura de **categoría ADN 420** (límite de fluencia fy = 420 MPa, resistencia a tracción fu ≥ 525 MPa) en barras con resaltes, con diámetros nominales en mm: 6, 8, 10, 12, 16, 20, 25, 32.

**Longitud de desarrollo (Ld):** las barras de armadura deben quedar ancladas en el hormigón una longitud mínima para que la adherencia transmita el esfuerzo. La longitud de desarrollo varía con el diámetro de la barra, f'c, fy y las condiciones de recubrimiento.

**Empalmes:** cuando es necesario empalmar barras, los empalmes traslapados tienen una longitud mínima de 1,3·Ld para barras en tracción.

---

## Verificación de deformaciones (flechas)

Además de la resistencia, las estructuras deben verificar que las deformaciones (flechas) no superen los límites admisibles establecidos por el reglamento. Los límites habituales son:

- Flecha total: L/240 (para elementos que no soportan elementos frágiles)
- Flecha diferida (luego de la instalación de elementos no estructurales): L/480

Las flechas en el hormigón armado aumentan con el tiempo por el fenómeno de la **fluencia** (creep): la flecha diferida puede ser 2 a 3 veces la flecha instantánea.

## Palabras clave

cálculo hormigón armado Uruguay, CIRSOC 201 diseño resistencia, ACI 318 Uruguay referencia, diseño vigas flexión corte hormigón armado, combinaciones de carga diseño estructural Uruguay, factores reducción resistencia phi, armado mínimo máximo cuantía, diseño columnas diagrama interacción P-M, losa plana punzonamiento flat slab, longitud desarrollo empalme barras armadura, acero ADN 420 Uruguay, flecha diferida fluencia hormigón armado
