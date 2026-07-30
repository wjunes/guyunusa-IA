# Redes de Observación Meteorológica en Uruguay

---

## Introducción

La **red de observación meteorológica** es la infraestructura física e institucional que permite registrar el estado de la atmósfera en tiempo real. Sin observaciones, no hay pronóstico, ni climatología, ni investigación. Uruguay cuenta con una red de múltiples componentes, operada principalmente por INUMET, complementada por otras instituciones (SOHMA, INIA, DINAGUA, aeropuertos, Facultad de Ciencias, IMFIA).

---

## Red principal de INUMET

### Estaciones sinópticas

Son las estaciones de mayor jerarquía. Realizan observaciones completas de todas las variables meteorológicas en las **horas sinópticas principales** (00, 06, 12 y 18 UTC) y las horas intermedias (03, 09, 15, 21 UTC), conforme a los estándares de la OMM. Sus datos se transmiten a los bancos de datos internacionales a través de la red GTS (*Global Telecommunication System*) de la OMM.

| Estación sinóptica | Indicativo OMM | Ubicación aproximada |
|-------------------|---------------|---------------------|
| Montevideo | 86580 | Aeropuerto de Carrasco |
| Colonia del Sacramento | 86560 | Colonia |
| Florida | 86612 | Florida |
| Paso de los Toros | 86625 | Tacuarembó |
| Melo | 86665 | Cerro Largo |
| Artigas | 86470 | Artigas |
| Salto | 86500 | Salto |
| Paysandú | 86540 | Paysandú |
| Treinta y Tres | 86640 | Treinta y Tres |
| Rocha | [VERIFICAR indicativo] | Rocha |

*[VERIFICAR lista completa y actualizada de estaciones sinópticas y sus indicativos según INUMET]*

### Estaciones climatológicas

Registran principalmente temperatura máxima y mínima (con termómetros de máxima y mínima) y precipitación (pluviómetro). Son las estaciones más numerosas y forman la base de la red climatológica nacional. Muchas son operadas por observadores voluntarios o colaboradores (escuelas rurales, intendencias, productores, etc.).

### Estaciones automáticas (AWS)

Las **Estaciones Meteorológicas Automáticas** (*Automatic Weather Stations*, AWS) registran múltiples variables en forma continua (frecuencia de 1 min a 10 min) y transmiten los datos en tiempo real mediante:

- Redes de comunicación GPRS/GSM.
- Satélites meteorológicos (DCP — *Data Collection Platform*).

Las AWS de INUMET cubren todo el territorio nacional y han reemplazado progresivamente a las estaciones convencionales con observador humano en muchos puntos.

**Variables típicamente registradas por una AWS:**
- Temperatura del aire (a 1,5–2,0 m sobre superficie)
- Temperatura del suelo (a distintas profundidades, en algunas)
- Humedad relativa
- Presión atmosférica
- Velocidad y dirección del viento (a 10 m)
- Radiación solar global
- Precipitación acumulada
- Temperatura del agua (en estaciones costeras)

---

## Red de radiosondeos

Los **radiosondeos** (*upper-air soundings*) son el principal método de observación del perfil vertical de la atmósfera hasta la estratosfera (~30–35 km de altitud).

### Metodología

Se libera un **globo de helio** que asciende a una velocidad de ~5 m/s llevando una **radiosonde**: instrumento electrónico que mide temperatura, humedad y presión, y transmite los datos en tiempo real por radio. El viento se calcula a partir del desplazamiento horizontal del globo (seguimiento GPS).

### Estaciones de radiosondeo en Uruguay

| Estación | Frecuencia de lanzamientos | Hora UTC |
|----------|--------------------------|---------|
| Montevideo (Aeropuerto de Carrasco) | 2 por día | 00 UTC y 12 UTC |
| Artigas | 2 por día [VERIFICAR si sigue operativa] | 00 UTC y 12 UTC |

Los datos de radiosonde de Uruguay se transmiten a la red de la OMM y son utilizados por todos los centros de pronóstico del mundo para la inicialización de los modelos numéricos.

---

## Red de radares meteorológicos

Los radares meteorológicos son instrumentos activos que emiten pulsos de microondas y detectan la energía retrodispersada (*backscattered*) por las hidrometeoros (gotas de lluvia, cristales de hielo, granizo).

### Principios de funcionamiento

- **Reflectividad (dBZ):** Relacionada con la intensidad de precipitación.
- **Efecto Doppler:** Permite medir la velocidad radial del viento; detectar circulaciones (tornados, mesociclones).
- **Polarimetría (banda C o S):** Permite identificar el tipo de hidrometeoro (lluvia/granizo/nieve/mezcla) y la distribución de tamaños de gota.

### Cobertura en Uruguay

INUMET opera una red de radares que cubre el territorio nacional. Los radares son de **banda C** (frecuencia ~5 GHz; longitud de onda ~5 cm) o **banda S** (frecuencia ~3 GHz; longitud de onda ~10 cm) [VERIFICAR tipo de radares actuales de INUMET y sus ubicaciones]. Las imágenes de radar se publican en tiempo real en el sitio web de INUMET y son fundamentales para el nowcasting de tormentas severas y la detección de granizo.

---

## Satélites meteorológicos

Uruguay no opera satélites propios, pero utiliza datos de sistemas satelitales internacionales:

### Satélites geoestacionarios

| Satélite | Organización | Cobertura en Uruguay |
|----------|-------------|---------------------|
| **GOES-East (GOES-16/18)** | NOAA (EE.UU.) | Cobertura completa; imágenes cada 5–10 min |
| **Meteosat** | EUMETSAT (Europa) | Cobertura marginal |

El satélite **GOES-16** (en operación desde 2017) provee imágenes de alta resolución espacial (~0,5–2 km) y temporal (hasta 1 min en el modo de área local) para el continente americano. Sus productos incluyen:

- Imágenes en bandas visible, infrarrojo cercano e infrarrojo térmico.
- Temperatura de tope de nubes (BT).
- Detección de rayos (GLM — *Geostationary Lightning Mapper*).
- Temperatura superficial del mar (TSM).
- Índices de inestabilidad (CAPE, LI) derivados.
- Detección de aerosoles y polvo.

### Satélites de órbita polar

| Satélite / constelación | Organización | Producto relevante |
|-----------------------|-------------|-------------------|
| NOAA-20, NOAA-21 | NOAA | Perfiles de T y HR; hielo marino |
| Metop-B, Metop-C | EUMETSAT | Perfiles T/HR; viento AMV; suelo |
| Sentinel-3 | ESA (Copernicus) | TSM; altimetría de nivel del mar |
| GPM (IMERG) | NASA/JAXA | Precipitación global |
| Sentinel-6 | Copernicus | Altimetría de nivel del mar |

---

## Redes complementarias

### Red agrometeorológica (INIA)

El **Instituto Nacional de Investigación Agropecuaria (INIA)** opera una red de estaciones agrometeorológicas ubicadas en sus establecimientos experimentales (Las Brujas, La Estanzuela, Treinta y Tres, Salto, Tacuarembó) y en convenio con productores privados. Sus datos son fundamentales para la agrometeorologíá aplicada y la calibración de modelos de simulación de cultivos.

### Red de DINAGUA

La **Dirección Nacional de Aguas (DINAGUA)** del Ministerio de Ambiente opera una red de estaciones pluviométricas e hidrométricoas orientadas a la gestión hídrica y el alerta de inundaciones. Incluye sensores de nivel en ríos y arroyos.

### Redes de aeropuertos (DINACIA)

Los aeropuertos uruguayos habilitados para la aviación comercial cuentan con estaciones meteorológicas operadas bajo los estándares de INUMET y la OACI para la producción de METARs.

### Red de la Facultad de Ciencias / IMFIA

El **Departamento de Ciencias de la Atmósfera y los Océanos (DCAO)** de la Facultad de Ciencias y el **IMFIA** operan algunas estaciones propias y equipos de investigación (perfiladores de viento, sensores de radiación, etc.) en el campus universitario y otras localizaciones.

---

## Sistema Global de Telecomunicaciones (GTS)

El **GTS** (*Global Telecommunication System*) es la red de comunicaciones de la OMM a través de la cual los datos meteorológicos observados en todo el mundo se intercambian entre los servicios meteorológicos en tiempo casi real. Uruguay, a través de INUMET y SOHMA, alimenta el GTS con datos de sus estaciones de superficie, radiosondeos y radares.

---

## Sistema Mundial de Observación (WIGOS)

El **WIGOS** (*WMO Integrated Global Observing System*) es el marco integrado de la OMM para todos los sistemas de observación del clima y el tiempo. INUMET gestiona los metadatos de sus estaciones en la base de datos OSCAR/Surface de la OMM.

---

## Palabras clave

redes observación meteorológica Uruguay INUMET estaciones sinópticas climatológicas automáticas AWS, radiosondeos Uruguay Montevideo Artigas globo helio perfil vertical atmósfera 00 12 UTC, radar meteorológico Uruguay INUMET banda C nowcasting tormentas severas granizo Doppler, GOES-16 satélite geoestacionario Uruguay imágenes nubosidad TSM rayos GLM, GPM IMERG precipitación global satélite NASA Uruguay, red agrometeorológica INIA Uruguay estaciones experimentales Las Brujas La Estanzuela, DINAGUA red pluviométrica hidrométrica alertas inundaciones Uruguay, GTS Sistema Global Telecomunicaciones OMM Uruguay datos tiempo real, WIGOS OSCAR superficie OMM metadatos estaciones Uruguay INUMET, DCP transmisión satélite estaciones automáticas Uruguay tiempo real
