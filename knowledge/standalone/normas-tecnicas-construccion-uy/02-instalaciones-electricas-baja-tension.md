# Instalaciones Eléctricas de Baja Tensión en Uruguay

## Marco normativo general

Las instalaciones eléctricas de baja tensión en Uruguay se rigen principalmente por el **RBT (Reglamento de Instalaciones Eléctricas de Baja Tensión)** establecido por **UTE (Administración Nacional de Usinas y Trasmisiones Eléctricas)**. El RBT es el documento técnico-legal de referencia para toda instalación eléctrica en inmuebles (viviendas, edificios comerciales, industrias) conectados a la red de distribución de baja tensión de UTE.

El RBT se basa en los estándares de la **IEC (Comisión Electrotécnica Internacional)**, particularmente en la serie **IEC 60364** (Instalaciones Eléctricas de Edificios), adaptada a las condiciones del sistema eléctrico uruguayo: tensión de distribución 230/400 V, frecuencia 50 Hz, sistema TN-C-S.

Las normas UNIT que complementan el RBT en el ámbito eléctrico son adoptadas de la serie IEC: UNIT-IEC 60364 (partes relevantes adaptadas), normas UNIT para conductores y cables, normas UNIT para materiales eléctricos (tableros, interruptores, tomas de corriente).

## Tensiones y sistemas de distribución en Uruguay

| Nivel de tensión | Rango | Aplicación |
|-----------------|-------|-----------|
| Ultra Alta Tensión (UAT) | 500 kV | Transmisión ADME/UTE |
| Alta Tensión (AT) | 150 kV / 60 kV / 31,5 kV | Subtransmisión UTE |
| Media Tensión (MT) | 15 kV / 6 kV | Distribución primaria UTE |
| Baja Tensión (BT) | 230/400 V (fase-neutro/fase-fase) | Distribución domiciliaria |
| Muy Baja Tensión (MBT) | ≤ 50 V CA ó ≤ 120 V CC | Sistemas especiales, TBTS |

El sistema de distribución domiciliaria en Uruguay es **trifásico 400 V / monofásico 230 V**, sistema de neutro sólido a tierra (sistema **TN-C-S**). Las viviendas unifamiliares reciben habitualmente conexión monofásica o bifásica; los edificios de apartamentos y comercios reciben conexión trifásica.

## Acometida y medición

La **acometida** es la conexión entre la red de distribución de UTE y la instalación del cliente. El punto de entrega es el **medidor (contador)** de UTE, instalado en la fachada o en un nicho de medición. A partir del medidor comienza la instalación del cliente, que debe cumplir con el RBT.

El **tablero general de distribución (TGD)** o **tablero principal** es el primer elemento de protección de la instalación del cliente. Debe contener:
- **Interruptor general de corte omnipolar**: permite cortar toda la instalación manualmente
- **Interruptor diferencial de alta sensibilidad (30 mA)**: protección general contra contacto indirecto
- **Interruptores termomagnéticos (ITM)** o **disyuntores**: protección de cada circuito individual

## Conductores y cables

Las normas UNIT-IEC establecen los requisitos para los conductores y cables utilizados en instalaciones de baja tensión:

**Materiales**: el conductor más utilizado en Uruguay es el **cobre** (Cu), aunque se admite el aluminio (Al) para alimentadores de secciones grandes. Los conductores deben cumplir con normas UNIT de resistividad, pureza y características mecánicas.

**Secciones mínimas**: el RBT establece secciones mínimas según el tipo de circuito:

| Tipo de circuito | Sección mínima (Cu) |
|-----------------|---------------------|
| Circuito de alumbrado | 1,5 mm² |
| Circuitos de tomas de corriente | 2,5 mm² |
| Circuitos de climatización/cocina | 4,0 mm² o según carga |
| Alimentadores de tableros | Calculado por caída de tensión |

**Aislación**: los cables más usados en Uruguay son:
- **H07V-U / H07V-R** (450/750 V): cable unipolar de cobre con aislación de PVC, para uso en cañerías (caño corrugado o rígido)
- **NYY / RVK** (0,6/1 kV): cable multipolar con aislación y cubierta de PVC o XLPE, para circuitos de media potencia enterrados o en bandeja
- **XLPE / EPR**: para circuitos de mayor tensión o temperatura de operación

**Caída de tensión admisible**: el RBT establece una caída de tensión máxima del 3 % en circuitos de alumbrado y del 5 % en circuitos de fuerza motriz, desde el tablero general hasta el punto de utilización más alejado.

## Protecciones eléctricas

Las instalaciones de baja tensión deben contar con tres tipos de protecciones complementarias:

**Protección contra sobrecargas y cortocircuitos**: mediante **interruptores termomagnéticos (ITM)** o **fusibles**. El ITM combina un disparador térmico (protección contra sobrecarga) y un disparador magnético (protección contra cortocircuito).

**Protección diferencial (falla a tierra)**: mediante **interruptores diferenciales (ID)** de alta sensibilidad (30 mA para circuitos de viviendas, 300 mA como protección complementaria en circuitos industriales). El diferencial detecta desequilibrios entre la corriente de fase y el neutro, que indican una derivación a tierra (contacto accidental de una persona con un conductor activo).

**Protección contra sobretensiones**: mediante **varistores** o **descargadores de sobretensión (SPD)** en los tableros, especialmente en zonas con alta incidencia de tormentas eléctricas. El RBT recomienda su instalación en la acometida.

## Puesta a tierra (PAT)

La **puesta a tierra (PAT)** es el conjunto de conductores y electrodos que conectan las masas metálicas de la instalación con el suelo, a fin de limitar la tensión de contacto en caso de falla. El RBT establece los requisitos de:

- **Electrodos de tierra**: varillas de cobre o acero cobrizado enterradas verticalmente (mínimo 1,5 m de profundidad), o mallas de cobre enterradas en la cimentación
- **Resistencia de tierra máxima**: ≤ 10 Ω para instalaciones residenciales (el RBT especifica los valores según el tipo de instalación y el diferencial utilizado)
- **Conductor de protección (PE)**: sección mínima determinada por la sección del conductor de fase (tabla IEC)
- **Equipotencialización**: unión equipotencial de todas las masas metálicas en cuartos de baño (bañeras, lavabos, cañerías, radiadores)

## Circuitos y tomas de corriente

El RBT organiza la instalación en **circuitos independientes** para diferentes usos:
- Circuito de alumbrado general
- Circuito de tomas de corriente de uso general (electrodomésticos)
- Circuito de cocina / horno / microondas (alta demanda)
- Circuito de lavarropa
- Circuito de climatización (aire acondicionado, bomba de calor)
- Circuito de calefón eléctrico
- Circuito de ducha eléctrica

**Tomas de corriente**: en Uruguay el estándar es el **enchufe tipo L** (norma UNIT 1063, adoptada de la norma italiana CEI 23-50), con tres clavijas (fase, neutro, tierra) para tomas de 10 A, y tomas tipo **Schuko** para 16 A. El tipo L es el estándar obligatorio desde mediados de los años 2000 (antes se usaban los tipos A/B y el tipo norma IRAM argentino).

## Instalaciones en cuartos de baño

El RBT y la norma IEC 60364-7-701 establecen **zonas de protección** en cuartos de baño, con restricciones para la instalación de aparatos eléctricos según su distancia a bañeras y duchas:
- **Zona 0**: interior de bañera/ducha; solo aparatos específicos para esa zona (IPX7), tensión máxima 12 V
- **Zona 1**: directamente sobre o al lado de bañera/ducha; solo luminarias y aparatos específicos (IPX4), 230 V máximo
- **Zona 2**: hasta 0,6 m del borde de bañera/ducha; protección diferencial obligatoria
- **Fuera de zonas**: instalaciones normales con diferencial de 30 mA

## Habilitación de instalaciones

Toda instalación eléctrica nueva o modificada en Uruguay debe ser habilitada por UTE antes de su puesta en servicio. El proceso incluye:
1. Proyecto eléctrico elaborado por un **instalador eléctrico habilitado** por UTE
2. Presentación del proyecto ante UTE para aprobación (instalaciones industriales y grandes edificios)
3. Ejecución de la instalación
4. Inspección de UTE o empresa habilitada
5. Emisión del certificado de habilitación

Los **instaladores eléctricos** deben estar registrados y habilitados por UTE. Existen diferentes categorías según la potencia y complejidad de las instalaciones que pueden realizar.

## Palabras clave

RBT Uruguay Reglamento Instalaciones Eléctricas Baja Tensión UTE edificios viviendas, IEC 60364 Uruguay instalaciones eléctricas edificios adaptación UTE BT, baja tensión Uruguay 230 400 V sistema TN-C-S distribución domiciliaria, conductor cobre cable H07V NYY XLPE Uruguay secciones mínimas circuitos, interruptor termomagnético ITM diferencial 30 mA Uruguay protecciones eléctricas, puesta a tierra PAT Uruguay resistencia electrodo cobre varilla PE equipotencialización, enchufe tipo L Uruguay norma UNIT 1063 CEI 23-50 toma corriente estándar, habilitación instalación eléctrica Uruguay UTE instalador habilitado certificado, circuitos independientes Uruguay cocina lavarropa climatización calefón ducha eléctrica, caída de tensión admisible Uruguay RBT 3% alumbrado 5% fuerza motriz, zonas protección baño Uruguay IEC 60364-7-701 bañera ducha IPX diferencial, tablero general distribución TGD Uruguay interruptor general diferencial ITM
