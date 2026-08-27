# Tensiones, receptores y alumbrado — RBT Caps. XIV a XVII

## Alcance

Los Capítulos XIV al XVII del RBT regulan las instalaciones a tensiones especiales y los requisitos aplicables a los receptores eléctricos.

**Cap. XIV — Pequeñas tensiones:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-14.pdf
**Cap. XV — Tensiones especiales:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-15.pdf
**Cap. XVI — Receptores:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-16.pdf
**Cap. XVII — Receptores para alumbrado:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-17.pdf

## Instalaciones a pequeñas tensiones (Capítulo XIV)

El RBT define las **tensiones de seguridad muy bajas (MBTS y MBTP)** para locales y aplicaciones donde la tensión de red representa un peligro inaceptable.

### Definiciones de tensiones de seguridad

| Sistema | Sigla | Tensión máxima CA | Tensión máxima CC |
|---|---|---|---|
| Muy baja tensión de seguridad (sin conexión a tierra) | MBTS | 50 V | 120 V |
| Muy baja tensión de protección (con conexión a tierra) | MBTP | 50 V | 120 V |
| Reducida para zonas de riesgo | — | 25 V (húmedos) / 12 V (sumersión) | — |

### Aplicaciones principales en Uruguay

- **Alumbrado de piscinas y fuentes:** 12 V CA (obligatorio en Zona 0).
- **Alumbrado de jardines:** 12 V o 24 V CA/CC.
- **Obras de construcción en ambientes mojados:** 25 V CA o inferior.
- **Juguetes y equipos de entretenimiento infantil:** 12 V o 24 V.
- **Circuitos de control y señalización:** según el diseño del sistema.

### Transformadores de seguridad

Los circuitos MBTS deben estar alimentados obligatoriamente por transformadores de seguridad con separación galvánica (aislamiento doble o reforzado), conforme a normas IEC. No se admiten autotransformadores ni divisores de tensión resistivos para alimentar circuitos MBTS.

## Instalaciones a tensiones especiales (Capítulo XV)

Este capítulo cubre instalaciones que operan a tensiones superiores a las de la red de BT estándar (sobre 1.000 V CA) cuando dichas instalaciones forman parte del equipamiento de locales abastecidos por UTE en BT, como:
- Equipos de rayos X y resonancia magnética.
- Instalaciones de calentamiento por inducción o por radiofrecuencia.
- Sistemas de ensayo de alta tensión.
- Tubos de neón y letreros luminosos a alta tensión.

Los requisitos incluyen: señalización de peligro, acceso restringido, distancias de seguridad y protecciones específicas según el tipo de equipo.

## Receptores (Capítulo XVI)

### Definición
Un receptor es todo equipo o aparato eléctrico destinado a transformar la energía eléctrica en otra forma de energía (luz, calor, movimiento mecánico, etc.).

### Corriente de arranque y protección
Los receptores inductivos (motores, compresores, ascensores) producen una corriente de arranque varias veces superior a la corriente nominal. El diseño de la protección (termomagnético) debe contemplar esta corriente transitoria sin disparar innecesariamente, eligiendo la curva de disparo adecuada:
- **Curva B (3–5 In):** alumbrado fluorescente, resistencias.
- **Curva C (5–10 In):** uso general, pequeños motores.
- **Curva D (10–20 In):** motores grandes, transformadores, cargas con alta corriente de arranque.

### Factor de potencia (cos φ)
Los receptores inductivos (motores, balastos electromagnéticos) consumen energía reactiva y tienen un factor de potencia inferior a 1. El RBT, en su Capítulo XX, regula la compensación de energía reactiva para instalaciones industriales, obligatoria a partir de ciertos umbrales de consumo reactivo para evitar penalizaciones en la factura de UTE.

### Conexión de receptores monofásicos y trifásicos
- Los receptores monofásicos deben distribuirse equilibradamente entre las tres fases de una instalación trifásica para evitar desequilibrios.
- Los receptores trifásicos deben conectarse respetando la secuencia de fases correcta (especialmente motores, cuya inversión de secuencia invierte el sentido de giro).

### Clavijas y tomacorrientes
Los tomacorrientes y clavijas usados en Uruguay responden al **sistema tipo L (italiano)**, compatible con el sistema universal y con el sistema tipo C (europeo de dos clavijas), aunque la norma admite distintos tipos según el uso. La instalación debe prever tomas adecuadas a los receptores habituales del local.

## Receptores para alumbrado (Capítulo XVII)

### Tipos de fuentes de luz

**Lámparas incandescentes y halógenas:** en desuso progresivo por eficiencia energética. El RBT cubre sus requisitos de instalación históricos.

**Lámparas fluorescentes (tubos y compactas):** requieren balasto (electromagnético o electrónico) e ignitor. El balasto electromagnético consume energía reactiva y puede causar parpadeo; el electrónico opera a alta frecuencia (sin parpadeo visible) y tiene mejor factor de potencia. En desuso creciente por el LED.

**Lámparas LED:** tecnología dominante actualmente. Requieren driver (fuente de alimentación) interno o externo que convierte la CA de red en CC a baja tensión para el módulo LED. Los drivers deben cumplir con EMC (compatibilidad electromagnética) y eficiencia energética según normativa URSEA/MIEM.

**Lámparas de vapor de sodio y mercurio:** uso en alumbrado público y gran industrial. Requieren arrancador e inductancia. En proceso de sustitución por LED en alumbrado público en Uruguay.

### Alumbrado en locales especiales
- **Locales húmedos (baños, cocinas):** luminarias con IP44 o superior.
- **Piscinas y zonas de agua:** ver Cap. XII y sus restricciones.
- **Locales de trabajo:** niveles mínimos de iluminancia (lux) según la tarea, definidos en normas UNIT y en las normativas laborales del MTSS.
- **Alumbrado de emergencia:** según Cap. X para locales de pública concurrencia.

### Corrección del factor de potencia en alumbrado
Los balastos electromagnéticos de lámparas fluorescentes tienen cos φ bajo (0,5 aproximadamente). El RBT recomienda la corrección mediante condensadores para elevar el cos φ por encima de 0,85. Los equipos con balasto electrónico moderno no requieren corrección adicional.

## Fuentes

- Cap. XIV (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-14.pdf
- Cap. XV (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-15.pdf
- Cap. XVI (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-16.pdf
- Cap. XVII (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-17.pdf

## Palabras clave

MBTS tensión seguridad Uruguay piscina, pequeñas tensiones instalación Uruguay, transformador seguridad MBTS Uruguay, receptores eléctricos Uruguay curva disparo B C D, factor potencia motor Uruguay, alumbrado LED Uruguay normativa, alumbrado fluorescente Uruguay balasto, receptores trifásicos Uruguay secuencia fases, lámparas vapor sodio Uruguay alumbrado público, tomacorrientes Uruguay tipo L, iluminancia mínima local trabajo Uruguay, alumbrado emergencia pública concurrencia Uruguay
