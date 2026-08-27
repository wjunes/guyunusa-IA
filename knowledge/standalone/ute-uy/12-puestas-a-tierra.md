# Puestas a tierra — RBT Capítulo XXIII

## Alcance

**Cap. XXIII — Puestas a tierra:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-23.pdf

La puesta a tierra (PAT) es el conjunto de elementos conductores que conectan las masas metálicas de la instalación con el terreno, con el fin de limitar las tensiones de contacto peligrosas ante una falla de aislamiento y garantizar el correcto funcionamiento de las protecciones diferenciales.

## Sistema TT — La puesta a tierra en Uruguay

Uruguay utiliza el **sistema TT**, en el que:
- La alimentación de UTE tiene el neutro conectado directamente a tierra en el transformador de distribución (primera T).
- Las masas de la instalación del abonado están conectadas a una toma de tierra local e independiente de la de UTE (segunda T).

En el sistema TT la protección contra contactos indirectos se garantiza mediante la combinación de:
1. **Interruptor diferencial** (dispositivo de corriente diferencial residual — DCDR) de sensibilidad adecuada (30 mA en instalaciones domésticas).
2. **Resistencia de la toma de tierra** del abonado suficientemente baja para que, ante una falla, la tensión de contacto no supere 50 V (en locales secos) o 24 V (en locales húmedos).

Condición del RBT: **Ra × IΔn ≤ 50 V**, donde Ra es la resistencia de la toma de tierra (en ohmios) e IΔn es la corriente diferencial nominal del dispositivo de protección (en amperios).

Ejemplo: con diferencial de 30 mA (0,03 A) → Ra ≤ 50 / 0,03 = **1.667 Ω**. En la práctica se apunta a valores mucho menores (< 10 Ω en instalaciones domésticas, < 5 Ω en instalaciones industriales, < 1 Ω en instalaciones especiales).

## Componentes de la puesta a tierra

### Electrodos de tierra

| Tipo | Descripción | Aplicación típica |
|---|---|---|
| Pica vertical | Varilla de acero cobrizado de 1,5 m o 2 m, clavada en el terreno | Instalaciones domésticas y pequeñas industrias |
| Placa horizontal | Chapa de cobre o acero galvanizado enterrada | Terrenos rocosos o alta resistividad |
| Conductor desnudo enterrado (anillo) | Cable de cobre desnudo de 35 mm² o superior enterrado en zanja perimetral | Instalaciones industriales, edificios |
| Malla (grid) | Red de conductores desnudos entrecruzados en el suelo | Subestaciones, instalaciones críticas |

Las picas de acero cobrizado deben tener al menos 14 mm de diámetro y un espesor de cobrizado de 70 µm para garantizar durabilidad.

### Conductores de tierra (CT) y de protección (CP)

| Conductor | Función |
|---|---|
| Conductor de tierra (CT) | Une el electrodo de tierra con el borne de tierra del cuadro principal |
| Conductor de protección (CP, PE) | Une las masas (chasis, envolventes) de los equipos con el borne de tierra del cuadro |
| Conductor de unión equipotencial principal | Une las tuberías metálicas (agua, gas, calefacción) con el borne de tierra |
| Conductor de unión equipotencial suplementaria | Une elementos conductores en zonas de especial peligro (baños, piscinas) |

**Sección mínima del conductor de tierra (CT):**
- Si el CT está protegido mecánicamente: igual a la mitad de la sección de la fase (mínimo 16 mm² Cu).
- Si el CT no está protegido mecánicamente: mínimo 25 mm² Cu (enterrado sin protección) o 50 mm² Fe.

**Sección del conductor de protección (CP/PE):**

| Sección del conductor de fase (S) | Sección mínima CP |
|---|---|
| S ≤ 16 mm² | Igual a S |
| 16 < S ≤ 35 mm² | 16 mm² |
| S > 35 mm² | S/2 |

### Borne principal de tierra (BPT)

Todos los conductores de tierra deben converger en el **borne o barra colectora principal de tierra**, ubicado en el tablero general de la instalación. Desde el BPT parten:
- El conductor de tierra hacia el electrodo.
- Los conductores de protección (PE) hacia los circuitos.
- Los conductores de unión equipotencial.

El BPT debe ser accesible para realizar mediciones y debe permitir la desconexión individual de cada conductor (mediante bornes apernados o abrazaderas desmontables).

## Medición de la resistencia de tierra

La resistencia de tierra debe medirse con un **telurómetro** (medidor de tierra), que puede usar el método de las tres puntas (caída de tensión) o el método de pinza (clamp). Las mediciones deben realizarse:
- En el momento de la instalación, antes de la conexión a UTE.
- Periódicamente (al menos cada 5 años en instalaciones domésticas, anualmente en industrias).
- Después de trabajos que puedan haber afectado los electrodos.

La medición debe registrarse en el protocolo de la instalación, junto con la fecha, el método usado y las condiciones del suelo en el momento de la medición (temperatura, humedad).

## Resistividad del terreno en Uruguay

La resistividad del suelo (ρ, en Ω·m) varía significativamente según el tipo de terreno:

| Tipo de suelo | ρ aproximada (Ω·m) |
|---|---|
| Arcilla y tierra vegetal húmeda | 20–100 |
| Suelo arenoso húmedo | 50–200 |
| Suelo calcáreo | 100–500 |
| Arena seca | 500–1.500 |
| Roca granítica | 1.000–10.000 |

En Uruguay predominan los suelos arcillosos y sedimentarios con buena humedad, lo que en general favorece resistividades moderadas-bajas (50–200 Ω·m). En zonas costeras con suelos arenosos o en terrenos rocosos del norte del país los valores pueden ser más altos y requerir electrodos múltiples o mejoramientos con bentonita.

## Mejoramiento de la toma de tierra

Cuando la resistividad del terreno es alta y no se puede alcanzar el valor requerido de Ra con una sola pica, se pueden utilizar:
- **Picas adicionales en paralelo:** reducen la resistencia total; la mejora es efectiva si las picas están separadas al menos el doble de su longitud.
- **Bentonita o coke:** material higroscópico que se introduce alrededor del electrodo para mejorar el contacto con el suelo y reducir la resistividad local.
- **Anillo perimetral:** conductor desnudo enterrado perimetralmente al edificio.
- **Electrodos de mayor profundidad:** en terrenos con capa superficial de alta resistividad sobre capa húmeda profunda.

## Unión equipotencial

La **unión equipotencial principal** conecta al BPT todas las cañerías metálicas que penetran en el edificio (agua fría, agua caliente, gas, calefacción) y las armaduras metálicas de la estructura cuando son accesibles.

La **unión equipotencial suplementaria** se aplica en zonas de especial riesgo (baños, piscinas) para conectar entre sí todas las masas y elementos conductores que pueden ser tocados simultáneamente, sin esperar a que la corriente circule por el conductor PE hasta el cuadro.

En los baños la norma exige unión equipotencial suplementaria en los volúmenes 1 y 2, conectando: bañera/ducha metálica, tuberías de agua, tubería de calefacción, estructura metálica del suelo radiante, y el conductor PE de los circuitos del baño.

## Fuentes

- Cap. XXIII (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-23.pdf

## Palabras clave

puesta a tierra Uruguay sistema TT, resistencia tierra Uruguay telurómetro, conductor tierra cobre Uruguay sección, pica acero cobrizado Uruguay, borne principal tierra Uruguay, unión equipotencial baño Uruguay, diferencial 30mA tierra Uruguay Ra IΔn, resistividad suelo Uruguay arcilla, bentonita tierra Uruguay, medición tierra Uruguay método tres puntas, anillo perimetral tierra Uruguay, electrodo tierra Uruguay pica profundidad
