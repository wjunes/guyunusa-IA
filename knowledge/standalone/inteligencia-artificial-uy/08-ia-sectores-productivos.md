# Inteligencia artificial en sectores productivos de Uruguay

Uruguay combina activos de datos excepcionales con una adopción de IA que sigue siendo incipiente o no está
documentada públicamente en la mayoría de los sectores. El país tiene la trazabilidad bovina individual más completa
del mundo, la red de medición eléctrica inteligente más extensa de América Latina y decenas de millones de registros
ambientales anuales. Sin embargo, ninguno de estos activos está conectado a sistemas de aprendizaje automático
operativos en escala a 2026.

Los casos verificados más consolidados se concentran en el sector financiero (dLocal y los modelos propios de ML de
Itaú Uruguay) y en el subsector insurtech emergente. La agroindustria, la energía, la logística y el medioambiente
poseen infraestructura de datos avanzada pero no tienen implementaciones de aprendizaje automático operativas
confirmadas a nivel productivo.

## Agroindustria y ganadería

### El SNIG no usa IA: aclaración sobre la trazabilidad bovina

Uruguay es el único país del mundo con la totalidad de su rodeo bovino identificado y trazado individualmente de
forma obligatoria. El número de cabezas identificadas se aproxima a 12 millones. Esta trazabilidad opera desde hace
casi dos décadas.

El Sistema Nacional de Información Ganadera (SNIG), administrado por INAC (Instituto Nacional de Carnes), funciona
sobre identificación por caravana electrónica de radiofrecuencia (RFID) y base de datos centralizada. Este sistema
no incorpora modelos de aprendizaje automático, análisis predictivo ni ningún componente de inteligencia artificial.
Es un sistema de trazabilidad de datos, no un sistema de IA.

Describirlo como "sistema inteligente" sin esta aclaración constituye una afirmación inexacta frecuente en medios de
comunicación y materiales institucionales. La inteligencia del sistema es organizacional (trazabilidad completa,
datos de movimientos, sanidad y producción), no computacional en el sentido de modelos de ML.

Los primeros proyectos con componentes de ML en trazabilidad bovina fueron aprobados en mayo de 2025 por MGAP, INIA,
INAC y ANII. Los dos proyectos aprobados son "Innovación en caravanas uruguayas con geolocalización y análisis
predictivo" y "Sistema de identificación, monitoreo y trazabilidad bovina". El financiamiento es de aproximadamente
4,7 millones de pesos uruguayos por proyecto. Ambos proyectos están en fase de desarrollo, no operativos.

El activo estratégico de la trazabilidad bovina uruguaya para aplicar IA en el futuro es real: décadas de datos
individuales por animal con historial completo de movimientos, sanidad y producción. La conexión de esta
infraestructura con modelos de ML está en curso como proceso de investigación, no como realidad productiva.

### INIA — ML para selección genómica

El Instituto Nacional de Investigación Agropecuaria (INIA) tiene proyectos formales de aprendizaje profundo para
selección genómica. Los trabajos incluyen modelos Transformers para integración de datos genómicos y ambientales en
arroz y ganado vacuno. Los proyectos son liderados por la investigadora María Inés Fariello y financiados por ANII.
El informe final del proyecto fue cerrado en abril de 2025.

Los modelos Transformers, originalmente desarrollados para procesamiento de lenguaje natural, están siendo adaptados
para integrar datos genómicos (secuencias de SNPs, marcadores moleculares) con datos fenotípicos y ambientales (clima,
suelo, manejo) para predecir el mérito genético de animales y plantas con mayor precisión que los métodos estadísticos
tradicionales.

Se trata de investigación básica aplicada en entorno académico, no de plataformas productivas desplegadas para uso
de los productores agropecuarios. Los resultados publicados constituyen conocimiento científico transferible,
pendiente de implementación en herramientas de uso productivo para el sector agropecuario uruguayo.

### Ecosistema agtech privado

El ecosistema agtech uruguayo incluye aproximadamente 29 emprendimientos según un estudio de Universidad ORT de 2022,
de los cuales el 21% opera en agricultura de precisión y análisis predictivo. No se encontraron empresas agtech
uruguayas de nombre propio con producto ML verificado y resultados de campo documentados independientemente.

La empresa israelí Taranis ingresó al mercado uruguayo a través de su socio local Lanafil para ofrecer agricultura
de precisión con imágenes aéreas analizadas con IA. Las imágenes son captadas por drones o satélites y analizadas
por modelos de visión computacional para detectar enfermedades, plagas, estrés hídrico y variaciones de rendimiento
a nivel de lote. Es el caso mejor documentado de IA en agtech con presencia verificada en Uruguay.

La startup Gander IA desarrolló soluciones de monitoreo ganadero con drones e IA, aunque los detalles de producto
y estado actual no fueron confirmados en fuente primaria.

La solución de la empresa Agentify sobre reducciones del 15-50% en tiempos de auditoría en trazabilidad no tiene
confirmación en fuentes oficiales; son materiales promocionales no verificados.

### Situación del sector agtech

El ecosistema agtech existe pero es incipiente. No hay casos documentados de resultados de campo verificables para
cultivos o ganado uruguayos con modelos de ML. La trazabilidad bovina está consolidada como infraestructura de datos
sin IA; los proyectos de ML están en desarrollo desde 2025. La investigación en selección genómica existe en el
ámbito del INIA pero no llega aún a los productores como herramienta productiva.

## Energía

### UTE — red de medidores inteligentes más extensa de América Latina

UTE, la empresa pública de electricidad de Uruguay, posee la red de medición inteligente más extensa de América
Latina. En 2025 alcanzó 1.700.000 hogares con medidores inteligentes, con solo alrededor de 3.000 restantes en todo
el país. El proyecto se inició en 2016.

Los medidores inteligentes permiten lecturas granulares cada 15 minutos y reconexiones remotas sin visita técnica.
Los resultados operativos verificados son notables: las facturas estimadas bajaron del 10% al 0,28% entre 2018 y
2025, y las pérdidas no técnicas por hurto eléctrico del 18% al 13% en el mismo período.

Esta infraestructura es la base técnica necesaria para aplicar modelos de IA en predicción de demanda, mantenimiento
predictivo de la red y detección de anomalías de consumo. El potencial es significativo: 1,7 millones de puntos de
medición cada 15 minutos generan aproximadamente 97 millones de lecturas diarias.

Sin embargo, no existe confirmación pública de que UTE opere internamente modelos de ML para despacho, pronóstico
de demanda o gestión de red en producción. Los modelos de IA que sí existen para datos de UTE son publicaciones
académicas con datos del operador: un modelo ExtraTreesRegressor para pronóstico de demanda eléctrica con un error
del 5,17%, y redes LSTM Encoder-Decoder para generación fotovoltaica. Estas son publicaciones en revistas
científicas con datos de UTE, no confirmaciones de adopción interna por parte de la empresa.

La distinción es relevante para el corpus BNC-UY: Uruguay tiene la infraestructura de datos para aplicar IA en
energía, pero no hay evidencia de que lo esté haciendo sistemáticamente de forma operativa.

### ANTEL y el Desafío UTE 2024

La convocatoria ANII "Desafíos UTE 2024" incluyó proyectos seleccionados para predecir consumo eléctrico mediante
ML y un agente virtual de atención comercial basado en IA generativa. Estos son propuestas ganadoras de un concurso
de innovación, no implementaciones en producción confirmadas.

ANTEL, por su parte, firmó un acuerdo con Google Cloud para alojar Google Distributed Cloud en su data center de
Pando, creando una solución de nube híbrida soberana. Este acuerdo establece la infraestructura técnica para que el
Estado uruguayo pueda ejecutar cargas de trabajo de IA en territorio nacional.

## Sector financiero

### Banca — solo Itaú confirmado

Itaú Uruguay es el único banco operando en Uruguay con una implementación verificada de IA descrita públicamente en
el mercado local. Usa aprendizaje automático para autenticación biométrica de comportamiento y detección de patrones
de fraude mediante análisis de hábitos de uso, ubicación geográfica y tipo de dispositivo. El sistema evalúa el
riesgo de cada sesión en tiempo real.

Es probable que Santander y BBVA apliquen modelos globales de sus casas matrices en Uruguay, pero no existe
comunicación pública verificable al respecto para el mercado local.

El Copiloto BROU eBanking, desarrollado por Abstracta con financiamiento ANII-BROU de aproximadamente 4,24 millones
de pesos uruguayos, funciona por voz o texto para pagos, transferencias y plantillas. Su estado en producción está
pendiente de verificación.

### dLocal como referencia en ML para fintech

dLocal (Nasdaq: DLO), con sede en Montevideo, desarrolla tecnología de aprendizaje automático propia para detección
de fraude en pagos de mercados emergentes. Su motor Smart Defense usa XGBoost y redes neuronales profundas con
tiempo de respuesta declarado inferior a 100 milisegundos. Los modelos son específicos por industria y se reentrenan
con frecuencia casi diaria. Es el caso más técnicamente detallado de ML aplicado en una empresa fintech uruguaya con
especificaciones técnicas publicadas.

### Ecosistema insurtech

El subsector más dinámico en IA financiera uruguaya es el insurtech. El sector tiene al menos 21 startups y captó
USD 12,1 millones en seis meses durante 2025.

ProtectU usa IA para simplificar pólizas de seguro mediante su asistente Amparo. Cerró una ronda ángel de USD
100.000 en 2024 con alianzas con Sancor Seguros, SBI Seguros y Universal Assistance.

Foliume automatiza flujos de trabajo de seguros con agentes de IA para corredores y aseguradoras, incluyendo
generación de cotizaciones, validación de datos y renovación de pólizas. Captó USD 1 millón en una ronda seed
liderada por Pitchdrive e Íope Ventures (Telefónica) en mayo de 2025.

## Logística y transporte

### ANP — Smart Port

No se encontraron datos verificados en fuente primaria sobre implementaciones de IA en la Administración Nacional de
Puertos (ANP) en el marco de proyectos descritos como Smart Port o similares. Este punto está pendiente de
verificación mediante consulta directa a la ANP.

## Infraestructura de datos

### Google — data center en Canelones (USD 850 millones)

Google comenzó en agosto de 2024 las obras de su data center en el Parque de las Ciencias en Canelones. La inversión
es de USD 850 millones, siendo el segundo data center sudamericano de Google después del de Chile. El proyecto está
vinculado explícitamente al acceso regional a soluciones de IA, según declaraciones de la empresa.

Las obras comenzaron con una ceremonia oficial con participación del gobierno uruguayo. El data center generará
capacidad de cómputo en la nube directamente en territorio uruguayo, reduciendo la latencia para aplicaciones que
requieren procesamiento en regiones cercanas.

### Proyecto hiperescala de USD 5.700 millones

En octubre de 2026 se anunció un complejo hiperescala verde de USD 5.700 millones con data centers en Canelones y
San José. Este proyecto está en etapa de anuncio; los inversores y el estado de obras no fueron confirmados
públicamente a la fecha de este documento.

### ANTEL — data centers con foco en IA

ANTEL, la empresa pública de telecomunicaciones, opera en dos frentes en infraestructura de IA. Anunció una inversión
de USD 70 millones para un nuevo data center con foco en IA en Canelones. También anunció previamente un data center
de USD 8 millones en Pando previsto operativo en 2026.

El plan de inversión total de ANTEL hacia 2030 supera los USD 750 millones, con USD 180 millones confirmados para
2027. Esta inversión cubre fibra óptica, cobertura 5G, servicios en la nube y data centers.

### Conectividad como base de infraestructura para IA

Más del 90% de las conexiones hogareñas en Uruguay son por fibra óptica. El país cuenta con 1.054 radiobases 5G
(799 de ANTEL) según URSEC. La meta es completar cobertura de FTTH en localidades de más de 500 habitantes para
fines de 2026. Esta infraestructura de conectividad constituye una ventaja competitiva regional real para
aplicaciones de IA que requieren transmisión estable de datos en tiempo real.

## Medioambiente

### DINACEA — datos en volumen, IA en fase de anuncio

La Dirección Nacional de Calidad y Evaluación Ambiental (DINACEA) recibe aproximadamente 80.000 datos diarios de su
sistema de monitoreo continuo de efluentes, equivalente a unos 29 millones de datos por año. Esta infraestructura
de datos genera demanda real de herramientas analíticas avanzadas para detectar anomalías en emisiones y predecir
incumplimientos antes de que ocurran.

En junio de 2026, el Ministerio de Ambiente anunció que incorporará IA a los controles ambientales y firmará un
acuerdo con la Universidad de la República para desarrollar las capacidades necesarias. Estado: anunciado; sin
implementación operativa confirmada.

No se encontraron proyectos operativos de IA para monitoreo de calidad del agua, biodiversidad, gestión de residuos
o cambio climático en Uruguay.

## Paradoja de la infraestructura sin IA

Uruguay posee algunos de los activos de datos más completos de la región pero no los ha conectado con sistemas de IA
operativos en escala productiva. Esta es la paradoja estructural del ecosistema productivo uruguayo en relación con
la IA.

Los tres activos principales:

Doce millones de bovinos con trazabilidad individual de décadas mediante RFID: sin ML operativo en el SNIG. Los
prototipos con análisis predictivo están en desarrollo desde mayo de 2025.

Un millón setecientos mil medidores inteligentes con lecturas cada 15 minutos: sin ML interno confirmado en UTE.
Los modelos académicos existen pero no hay confirmación de adopción interna.

Veintinueve millones de registros ambientales anuales de efluentes en DINACEA: sin IA operativa. El acuerdo con la
UdelaR fue anunciado en junio de 2026, sin implementación confirmada.

Estos activos representan la mayor oportunidad del ecosistema productivo uruguayo para adopción de IA en los próximos
años, si los proyectos en curso y anunciados se consolidan. La combinación de datos históricos densos, cobertura
casi universal y calidad de conectividad sitúa a Uruguay en posición favorable para pasar de la infraestructura a la
implementación en los sectores agropecuario, energético y ambiental.


## Mapa de sectores productivos por nivel de adopción de IA

La siguiente clasificación sitúa cada sector según el nivel de adopción de IA verificado a 2026:

### Nivel 1 — Adopción operativa verificada

Fintech (dLocal): ML propio con XGBoost y redes neuronales profundas, especificidades técnicas publicadas,
sistemas en producción desde 2021.

Banca (Itaú Uruguay): ML para autenticación biométrica y fraude, confirmado en declaraciones institucionales.

Insurtech (ProtectU, Foliume): agentes de IA para automatización de pólizas, con rondas de capital verificadas.

### Nivel 2 — Proyectos aprobados en desarrollo

Agroindustria (MGAP/INAC/INIA): prototipos de ML para trazabilidad bovina y selección genómica, financiados por
ANII desde mayo de 2025, en desarrollo.

Energía (UTE/ANII Desafíos 2024): proyectos seleccionados en concurso para predicción de demanda con ML, en
proceso de implementación.

### Nivel 3 — Infraestructura disponible sin IA confirmada

Ganadería (SNIG): 12 millones de bovinos trazados con RFID; sin ML operativo.

Electricidad (UTE): 1,7 millones de medidores inteligentes con datos cada 15 minutos; sin ML interno confirmado.

Medioambiente (DINACEA): 29 millones de datos anuales de efluentes; sin IA operativa.

### Nivel 4 — Anunciado sin implementación

Medioambiente (Ministerio): acuerdo con UdelaR anunciado junio 2026, sin operación confirmada.

Logística portuaria (ANP): referencias a Smart Port no verificadas en fuente primaria.

### Nivel 5 — Sin datos disponibles

Sector agropecuario extensivo: sin empresas agtech con ML verificado y resultados de campo.

Industria manufacturera: sin casos documentados de adopción de IA en manufactura uruguaya en fuentes públicas.

Turismo: sin casos documentados de IA en sector turístico uruguayo.

## Referencia de inversión en infraestructura por actor

La siguiente tabla resume los montos de inversión en infraestructura de datos con relevancia para IA en Uruguay:

| Actor | Inversión | Destino | Estado |
|---|---|---|---|
| Google | USD 850 millones | Data center Canelones | Obras iniciadas ago/2024 |
| Proyecto hiperescala | USD 5.700 millones | Data centers Canelones y San José | Anunciado oct/2026, sin confirmar |
| ANTEL | USD 70 millones | Data center IA Canelones | Anunciado, en proyecto |
| ANTEL | USD 8 millones | Data center Pando | Previsto operativo 2026 |
| ANTEL total a 2030 | USD 750+ millones | Fibra, 5G, nube, data centers | Plan plurianual |
| ANTEL confirmado 2027 | USD 180 millones | Inversión confirmada | Verificado ConvergencIA 2026 |


## Sector retail e inteligencia de consumo

Scanntech opera la plataforma de inteligencia de retail de mayor escala de América Latina, procesando más de 400
millones de tickets por año en más de 300 categorías. Su plataforma ScannMarket, lanzada en julio de 2026, usa
aprendizaje automático para predecir el comportamiento del consumo. Es el caso más grande de ML en retail con
operaciones en Uruguay y presencia en siete países de la región.

## Palabras clave

IA sectores productivos Uruguay, agroindustria IA, trazabilidad bovina SNIG RFID, INIA selección genómica ML
Transformers, UTE medidores inteligentes red eléctrica, ANTEL data center IA Canelones, Google data center Uruguay,
infraestructura IA Uruguay, dLocal Smart Defense ML fraude, Itaú Uruguay ML fraude, insurtech Uruguay ProtectU
Foliume, Taranis Lanafil agricultura precisión, DINACEA monitoreo ambiental, hiperescala Uruguay 5700 millones,
paradoja infraestructura sin IA, ANOS data center, fibra óptica Uruguay, 5G cobertura Uruguay, agtech Uruguay ORT
