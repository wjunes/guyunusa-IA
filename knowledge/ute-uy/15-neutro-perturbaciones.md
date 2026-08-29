# Neutro y perturbaciones en la red — RBT Caps. XXVI y XXVII

## Alcance

**Cap. XXVI — El neutro:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-26.pdf
**Cap. XXVII — Perturbaciones en la red:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-27.pdf

## El conductor neutro (Capítulo XXVI)

### Función del conductor neutro

En los sistemas de distribución en baja tensión (sistema trifásico + neutro de UTE), el conductor neutro cumple dos funciones:
1. **Conductor de retorno de corriente:** en los circuitos monofásicos, la corriente circula por la fase y retorna por el neutro.
2. **Referencia de tensión:** el neutro (a potencial nominalmente cero) establece la referencia para medir la tensión de fase (230 V entre fase y neutro en Uruguay).

### Prohibición de interrumpir el neutro

El RBT prohíbe instalar fusibles, interruptores automáticos, o cualquier dispositivo de protección que pueda interrumpir el neutro sin interrumpir simultáneamente las fases asociadas. La interrupción del neutro en una instalación trifásica con cargas monofásicas produce un desequilibrio de tensiones que puede elevar la tensión sobre las fases con menor carga a valores peligrosos para los equipos conectados.

En los interruptores tetra polares (4P), el polo de neutro puede ser conmutado simultáneamente con las tres fases, lo que está permitido. Lo que no se admite es un fusible o disyuntor solo en el neutro.

### Sección del conductor neutro

En circuitos monofásicos: la sección del neutro debe ser igual a la de la fase.

En circuitos trifásicos:
- Si la carga es equilibrada y sin armónicos: el neutro puede tener sección reducida (hasta la mitad de la sección de fase, con un mínimo de 16 mm² Cu).
- **Si existen cargas no lineales** (ordenadores, variadores, iluminación LED con drivers de mala calidad, rectificadores): el armónico de tercer orden y sus múltiplos (3°, 9°, 15°...) circulan por el neutro y se suman en lugar de cancelarse. En estos casos el neutro puede llegar a circular más corriente que la fase y debe tener **la misma sección que los conductores de fase**, o incluso mayor.

### Identificación del neutro

El conductor neutro se identifica con color azul claro en toda la instalación. No se admite el uso del color azul para otro conductor que no sea el neutro.

## Perturbaciones en la red de distribución (Capítulo XXVII)

### Tipos de perturbaciones

**Sobretensiones temporales (TOV):** elevaciones de tensión de corta duración originadas en la red de UTE (maniobras de interruptores, falta de fase). Pueden dañar equipos sensibles.

**Sobretensiones transitorias:** picos de tensión de microsegundos a milisegundos de origen atmosférico (rayos) o de maniobra (apertura de interruptores inductivos). Los descargadores (SPD) las limitan.

**Huecos de tensión (dips):** reducciones breves de la tensión de suministro (de ciclos a segundos) provocadas por arranques de grandes motores, cortocircuitos en la red, o conexión de grandes cargas. Pueden causar la reinicialización de equipos electrónicos o el disparo de variadores de frecuencia.

**Interrupciones:** cortes completos del suministro. Pueden ser planificadas (mantenimiento) o no planificadas (averías).

**Desequilibrio de fases:** diferencia de tensión o de ángulo entre las tres fases de un sistema trifásico. Causado por cargas monofásicas no distribuidas uniformemente o por averías en la red. Perjudica a los motores trifásicos (genera corrientes inversas que calientan el bobinado).

**Flicker (centelleo):** variaciones rápidas y repetidas de la tensión que causan variaciones de luminosidad perceptibles en el alumbrado incandescente. Causado por cargas que varían bruscamente (hornos de arco, soldadoras). La normativa IEC 61000-3-3 y UNIT equivalente regulan los límites.

**Armónicos:** componentes de frecuencia múltipla de la frecuencia fundamental (50 Hz) generados por cargas no lineales. El contenido total de distorsión armónica (THD — Total Harmonic Distortion) en la red debe mantenerse por debajo de los límites establecidos para no afectar otros equipos.

### Responsabilidades

Las perturbaciones en la red de UTE que afectan a los abonados son responsabilidad de UTE cuando se originan en la red de distribución. Las perturbaciones que los equipos del abonado inyectan a la red son responsabilidad del abonado, quien debe cumplir los límites de emisión establecidos.

**URSEA** es el organismo que regula la calidad del suministro eléctrico en Uruguay, incluyendo los índices de continuidad (SAIDI, SAIFI) y calidad de tensión. Las reclamaciones por perturbaciones de calidad de suministro pueden dirigirse a URSEA.

**Contacto URSEA:** https://www.ursea.gub.uy

### Medidas de mitigación para el abonado

| Perturbación | Mitigación |
|---|---|
| Sobretensiones transitorias | Descargadores (SPD) en el tablero de entrada |
| Huecos de tensión | UPS on-line para equipos críticos |
| Armónicos generados por equipos propios | Filtros de armónicos activos o pasivos, reactancias de línea en variadores |
| Desequilibrio de fases | Redistribuir cargas monofásicas equitativamente entre las tres fases |
| Flicker de equipos propios | Estudiar con UTE; puede requerir compensador estático (SVC) |

## Fuentes

- Cap. XXVI (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-26.pdf
- Cap. XXVII (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-27.pdf
- URSEA: https://www.ursea.gub.uy

## Palabras clave

conductor neutro Uruguay sección armónicos, neutro trifásico cargas no lineales Uruguay, prohibición fusible neutro Uruguay, identificación neutro azul Uruguay, perturbaciones red eléctrica Uruguay, sobretensión transitoria Uruguay descargador SPD, hueco tensión Uruguay UPS, armónicos THD Uruguay variador frecuencia, desequilibrio fases Uruguay motores, URSEA calidad suministro Uruguay reclamación, flicker centelleo Uruguay soldadora horno arco, SAIDI SAIFI Uruguay continuidad suministro
