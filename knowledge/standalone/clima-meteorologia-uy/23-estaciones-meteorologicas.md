# Estaciones Meteorológicas de Uruguay

## Introducción

Las **estaciones meteorológicas** son los nodos fundamentales de la red de observación que permite conocer el estado de la atmósfera en un lugar y momento determinados. En Uruguay, la red de estaciones es operada principalmente por **INUMET**, con aportes complementarios del **INIA**, **DINAGUA**, el **SOHMA** y las redes de los aeropuertos. La densidad y calidad de la red determinan la precisión de los pronósticos y la representatividad de las normas climatológicas.

## Clasificación de las estaciones

La OMM establece una clasificación de las estaciones según su función, el número de variables observadas y la frecuencia de observación.

### Por tipo operativo

| Tipo | Descripción | Ejemplo en Uruguay |
|------|-------------|-------------------|
| **Estación sinóptica principal** | Observación completa a horas sinópticas (00, 06, 12, 18 UTC) y horarias; transmisión al GTS | Montevideo (Carrasco), Artigas, Salto |
| **Estación sinóptica secundaria** | Observación completa a horas sinópticas principales; puede no incluir todas las horas intermedias | Melo, Florida, Paysandú, Rocha |
| **Estación climatológica** | Temperatura máxima/mínima y precipitación; lectura manual diaria | Red de estaciones en interior del país |
| **Estación automática (AWS)** | Múltiples variables; registro continuo; transmisión en tiempo real | Red AWS de INUMET; estaciones INIA |
| **Estación pluviométrica** | Solo precipitación; lectura manual | Red densa de pluviógrafos en el interior |
| **Estación mareológica** | Nivel del mar; mareas | Montevideo, La Paloma (SOHMA) |
| **Estación aeronáutica** | METAR / TAF; estándar OACI | Aeropuerto de Carrasco, Laguna del Sauce, Salto |
| **Estación agrometeorológica** | Variables agroclimáticas; suelo; evapotranspiración | INIA Las Brujas, La Estanzuela, etc. |

### Por modo de operación

| Modo | Descripción |
|------|-------------|
| **Manual** | Un observador realiza las lecturas y las registra en formularios (o los ingresa al sistema). Requiere presencia humana en horarios definidos. |
| **Automático (AWS)** | Los sensores registran y transmiten los datos sin intervención humana. Operativa las 24 horas. |
| **Mixto** | Combina lecturas manuales con registros automáticos de algunas variables. |

## Estaciones sinópticas principales de INUMET

La siguiente tabla recoge las estaciones sinópticas y su información de referencia. Los indicativos de la OMM (5 dígitos, comenzando en 86 para Uruguay) identifican a cada estación en el sistema internacional.

| Estación | Indicativo OMM | Departamento | Latitud (aprox.) | Longitud (aprox.) | Elevación (aprox.) |
|----------|---------------|-------------|---------|----------|-----------|
| Montevideo (Aeropuerto Carrasco) | 86580 | Canelones | 34°50' S | 56°01' O | 32 m |
| Artigas | 86470 | Artigas | 30°24' S | 56°30' O | 110 m |
| Bella Unión | 86465 | Artigas | 30°16' S | 57°35' O | 40 m [VERIFICAR] |
| Salto | 86500 | Salto | 31°23' S | 57°57' O | 55 m |
| Paysandú | 86540 | Paysandú | 32°22' S | 58°04' O | 60 m |
| Colonia del Sacramento | 86560 | Colonia | 34°11' S | 57°51' O | 26 m |
| Florida | 86612 | Florida | 34°05' S | 56°13' O | 72 m |
| Paso de los Toros | 86625 | Tacuarembó | 32°49' S | 56°30' O | 92 m |
| Rivera | 86590 [VERIFICAR] | Rivera | 30°54' S | 55°32' O | 213 m |
| Melo | 86665 | Cerro Largo | 32°22' S | 54°10' O | 89 m |
| Treinta y Tres | 86640 | Treinta y Tres | 33°14' S | 54°21' O | 47 m |
| Rocha | 86680 [VERIFICAR] | Rocha | 34°28' S | 54°21' O | 15 m |

*[VERIFICAR: coordenadas, elevaciones e indicativos exactos según la base de datos OSCAR/Surface de la OMM — datos aproximados]*

## Red de estaciones automáticas (AWS)

INUMET ha desarrollado en los últimos años una red de **estaciones meteorológicas automáticas** (AWS) que amplía significativamente la cobertura espacial de la observación en Uruguay. Las AWS:

- Registran variables cada 10 minutos (o menor intervalo en algunas).
- Transmiten datos en tiempo real vía GPRS/GSM o satélite (DCP).
- Complementan y a veces reemplazan a las estaciones manuales.
- Proporcionan mayor resolución temporal para nowcasting y alertas.

La cobertura actual incluye estaciones en todos los departamentos, aunque la densidad varía. El objetivo es contar con una estación automática al menos cada ~50–100 km [VERIFICAR metas actuales de INUMET].

## Red agrometeorológica del INIA

El **INIA** (*Instituto Nacional de Investigación Agropecuaria*) opera estaciones agrometeorológicas en sus unidades experimentales:

| Estación INIA | Departamento | Especialidad |
|--------------|-------------|-------------|
| INIA Las Brujas | Canelones | Fruticultura; viticultura; horticultura |
| INIA La Estanzuela | Colonia | Ganadería; agricultura de secano |
| INIA Treinta y Tres | Treinta y Tres | Arroz; ganadería este |
| INIA Salto Grande | Salto | Citicultura; cultivos de riego |
| INIA Tacuarembó | Tacuarembó | Ganadería; forestación |

Las estaciones del INIA incluyen sensores especiales para la agrometeorología: temperatura del suelo a distintas profundidades, humedad del suelo (tensiómetros), balance de radiación, evapotranspiración real, horas de frío acumuladas (para fruticultura).

## Instalación y siting (emplazamiento) de estaciones

La calidad de los datos depende en gran medida del **emplazamiento** (siting) correcto de la estación. La OMM establece criterios de siting en el CIMO Guide:

| Criterio | Requerimiento OMM |
|---------|------------------|
| **Pluviómetro** | Zona despejada; distancia ≥ 2× la altura de obstáculos cercanos; sin viento excesivo ni sombra |
| **Termómetro** | Caseta Stevenson a 1,25–2,0 m; suelo cubierto de cesped corto; lejos de superficies artificiales |
| **Anemómetro** | A 10 m de altura; lejos de edificios y árboles; obstáculos a distancia ≥ 10× su altura |
| **Piranómetro** | Horizonte despejado; sin sombras en ningún momento del día; nivel |
| **Clasificación del entorno (WMO 2017)** | Clases 1–5 según la representatividad del entorno; Clase 1: entorno ideal; Clase 5: entorno muy comprometido |

La **urbanización** y el **cambio de entorno** a lo largo del tiempo son fuentes de heterogeneidad artificial en las series climáticas (breakpoints). La detección y corrección de estos quiebres es parte de la **homogeneización de series históricas**.

## Series históricas destacadas

Uruguay cuenta con algunas de las series meteorológicas más largas de América del Sur:

| Estación | Variable | Inicio de la serie |
|----------|---------|-------------------|
| Montevideo | Temperatura y precipitación | ~1891–1896 [VERIFICAR] |
| Colonia del Sacramento | Precipitación | Siglo XIX [VERIFICAR] |
| Salto | Temperatura y precipitación | Principios del siglo XX [VERIFICAR] |

La continuidad de estas series es de gran valor para los estudios de cambio climático, ya que permite detectar tendencias de largo plazo en temperatura y precipitación.

## Calidad de datos y control de calidad

Los datos de las estaciones son sometidos a procesos automatizados de control de calidad:

- **Control de rango:** verificar que los valores están dentro de límites físicamente posibles.
- **Control de consistencia interna:** verificar relaciones físicas entre variables (ej.: humedad relativa ≤ 100 % cuando no hay precipitación; temperatura del punto de rocío ≤ temperatura del aire).
- **Control de consistencia espacial:** comparar con estaciones vecinas para detectar anomalías locales.
- **Control de persistencia:** detectar valores constantes durante períodos sospechosamente largos (sensor bloqueado).

Los datos validados se almacenan en la base de datos climática de INUMET, que custodia el archivo meteorológico histórico de Uruguay.

## Palabras clave

estaciones meteorológicas Uruguay INUMET red sinóptica climatológica automática AWS, estaciones sinópticas Uruguay indicativos OMM 86580 Montevideo Carrasco 86470 Artigas 86500 Salto, AWS estaciones automáticas Uruguay GPRS satélite DCP tiempo real 10 minutos, INIA estaciones agrometeorológicas Uruguay Las Brujas La Estanzuela temperatura suelo humedad fruticultura, siting emplazamiento estaciones OMM CIMO Guide caseta Stevenson anemómetro 10m pluviómetro, series históricas Uruguay Montevideo 1891 temperatura precipitación largo plazo cambio climático, OSCAR Surface OMM metadatos estaciones Uruguay indicativos coordenadas elevación, control de calidad datos meteorológicos Uruguay rango consistencia espacial persistencia, homogeneización series históricas Uruguay cambio de entorno urbanización breakpoints, red pluviométrica Uruguay DINAGUA cuencas alertas inundaciones MGAP
