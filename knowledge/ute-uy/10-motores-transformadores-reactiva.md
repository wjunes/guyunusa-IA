# Motores, transformadores y compensación reactiva — RBT Caps. XVIII, XIX y XX

## Alcance

**Cap. XVIII — Aparatos de caldeo:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-18.pdf
**Cap. XIX — Motores, Generadores, Convertidores, Transformadores, Reactancias:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-19.pdf
**Cap. XX — Compensación de energía reactiva:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-20.pdf

## Aparatos de caldeo (Capítulo XVIII)

Los aparatos de caldeo son aquellos que transforman la energía eléctrica en calor. En Uruguay se utilizan ampliamente dada la alta penetración del suministro eléctrico y la creciente electrificación de los usos térmicos.

### Tipos de aparatos de caldeo regulados

**Resistencias calefactoras fijas (calefacción de locales):** paneles eléctricos, radiadores de aceite, calefactores de techo, calefacción por suelo radiante eléctrico. Requieren circuito propio cuando la potencia supera 1.000 W.

**Calentadores de agua (termos eléctricos):** deben instalarse en circuito exclusivo. La sección del conductor se calcula para la potencia del equipo con un factor de utilización de 1 (funcionan en ciclo continuo). En Uruguay los termos eléctricos domésticos más comunes son de 1.500 W a 3.000 W.

**Cocinas y hornos eléctricos:** circuito exclusivo con sección mínima de 6 mm² para cocinas de hasta 7.000 W; mayor sección para equipos de mayor potencia. La cocina y el horno pueden compartir circuito si están diseñados para ello.

**Bombas de calor (heat pumps):** para calefacción y ACS (agua caliente sanitaria). En Uruguay en fuerte expansión. Requieren circuito exclusivo dimensionado para la corriente de arranque del compresor. UTE tiene programas específicos de apoyo a la electrificación de ACS mediante bombas de calor.

**Acumuladores de calor:** dispositivos que almacenan calor durante el horario nocturno (tarifa reducida) y lo liberan durante el día. Requieren circuito exclusivo y pueden vincularse a tarifarías horarias de UTE.

### Distancias de seguridad de aparatos de caldeo
Los aparatos de caldeo fijos (resistencias, calefacción por techo) deben guardar distancias mínimas con materiales combustibles (madera, telas, papel) y con cañerías de gas y agua, según especificaciones del fabricante y criterios del RBT.

## Motores, generadores y transformadores (Capítulo XIX)

### Motores eléctricos

Los motores eléctricos son los receptores industriales más frecuentes en Uruguay. Sus instalaciones deben cumplir:

**Protección contra sobrecarga:** relé térmico calibrado para la corriente nominal del motor (In) con margen de regulación. El relé debe ajustarse al valor de In indicado en la placa del motor.

**Protección contra cortocircuito:** fusibles calibrados o termomagnético con curva D, calibrados para soportar la corriente de arranque sin disparar pero protegiendo en caso de cortocircuito.

**Arrancadores:**
- **Arranque directo (DOL):** solo para motores pequeños (hasta 5–7 kW en BT según el operador). La corriente de arranque puede ser 5–8 veces la corriente nominal.
- **Arranque estrella-triángulo (Y-Δ):** reduce la corriente de arranque a 1/3 del valor DOL; para motores de 5–30 kW aproximadamente.
- **Variador de frecuencia (VFD / inverter):** control total de la aceleración y velocidad; elimina picos de corriente y es obligatorio en ciertos sistemas de bombeo para eficiencia energética.
- **Arrancador suave (soft-starter):** limita la corriente de arranque progresivamente sin control de velocidad.

**Protección contra marcha en dos fases:** relé de asimetría de fases, obligatorio en motores trifásicos a partir de cierta potencia para proteger el bobinado del estátor.

**Inversión de giro:** mediante inversión de dos fases en el arrancador (contactor inversor). Requiere enclavamiento eléctrico y mecánico para impedir la conexión simultánea de ambos contactores.

### Generadores y grupos electrógenos

Los grupos electrógenos (motor de combustión + generador eléctrico) se instalan como fuente de alimentación de emergencia o socorro. El RBT exige:
- Separación galvánica respecto a la red de UTE durante la operación del grupo (conmutador de red/grupo que impida la conexión simultánea).
- Puesta a tierra propia del grupo cuando opera en modo isla.
- Protecciones de sobreintensidad y de tensión/frecuencia.
- El conmutador automático (ATS — Automatic Transfer Switch) actúa sin intervención humana ante la falta del suministro de UTE.

### Transformadores de potencia

Los transformadores de distribución que alimentan instalaciones privadas (media tensión propia) deben:
- Instalarse en sala exclusiva con acceso restringido.
- Contar con protecciones de sobreintensidad en el primario (fusibles o interruptor).
- Disponer de sistema de recogida de dieléctrico (aceite) en caso de transformadores en baño de aceite.
- Tener puesta a tierra del neutro del secundario conectada a la puesta a tierra del local.

## Compensación de energía reactiva (Capítulo XX)

### Qué es la energía reactiva

Los receptores inductivos (motores, balastos, transformadores) consumen, además de la energía activa (que realiza trabajo útil), **energía reactiva**, que circula entre el generador y el receptor sin producir trabajo útil pero que ocupa capacidad de los conductores y de los transformadores.

El factor de potencia (cos φ) es la relación entre la potencia activa (kW) y la potencia aparente (kVA): cos φ = P / S. Un cos φ bajo (< 0,85) implica un alto consumo de reactiva.

### Penalización por energía reactiva en Uruguay

UTE factura la energía reactiva consumida a los abonados de media tensión y a los abonados de baja tensión con tarifas industriales que superen ciertos umbrales. La compensación es obligatoria para mantener el cos φ por encima del mínimo establecido (habitualmente ≥ 0,90 o 0,95 según la tarifa).

### Baterías de condensadores

La compensación se realiza mediante **baterías de condensadores** que inyectan energía reactiva capacitiva, compensando la inductiva de los receptores.

**Ubicaciones de compensación:**
- **Compensación centralizada:** batería de condensadores única en el tablero general; compensa toda la instalación pero no reduce las corrientes reactivas en los circuitos internos.
- **Compensación por grupo:** baterías en tableros seccionales; mejora la eficiencia de los conductores internos.
- **Compensación individual:** condensador en bornes de cada motor; máxima eficiencia pero mayor coste.

**Regulación automática:** los bancos de condensadores industriales incluyen un regulador de cos φ que conecta y desconecta escalones de condensadores según la demanda reactiva, evitando la sobrecompensación (que genera reactiva capacitiva y puede causar resonancias).

### Precaución: resonancias armónicas

Las instalaciones con cargas no lineales (variadores de frecuencia, rectificadores, UPS, LED con drivers de mala calidad) generan armónicos que pueden interactuar con las baterías de condensadores y causar resonancias que dañen los condensadores. En estos casos se requieren filtros de armónicos o reactancias en serie con los condensadores (bancos antiarmónicos).

## Fuentes

- Cap. XVIII (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-18.pdf
- Cap. XIX (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-19.pdf
- Cap. XX (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-20.pdf

## Palabras clave

motores eléctricos Uruguay instalación protección, relé térmico motor Uruguay, arranque estrella triángulo Uruguay, variador frecuencia Uruguay, compensación energía reactiva Uruguay, batería condensadores Uruguay, factor potencia cos phi Uruguay, penalización reactiva UTE Uruguay, grupo electrógeno instalación Uruguay ATS, transformador potencia media tensión privada Uruguay, bomba calor circuito exclusivo Uruguay, termo eléctrico circuito Uruguay, calefacción eléctrica Uruguay circuito
