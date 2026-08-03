# Hidrodinámica del Río Uruguay

## Características físicas del tramo compartido

El Río Uruguay, en su tramo compartido entre Argentina y Uruguay (504 km, desde las proximidades de la Isla Brasilera hasta la latitud de Punta Gorda), exhibe una hidrodinámica compleja determinada por la interacción entre los caudales aportados por Salto Grande y la influencia mareal y meteorológica del **Río de la Plata** en el tramo inferior.

El cauce presenta variaciones morfológicas significativas a lo largo del recorrido: tramos de canal único encajonado, zonas de islas fluviales y planicies de inundación amplias, y un tramo final (Fray Bentos – Nueva Palmira) de transición hacia el estuario. Esta variedad morfológica genera patrones de velocidad y nivel muy distintos según la ubicación y el rango de caudal.

## Modelación hidrodinámica bidimensional (TELEMAC 2D)

Entre 2017 y 2019, investigadores del **Instituto de Mecánica de los Fluidos e Ingeniería Ambiental (IMFIA)** de la Facultad de Ingeniería (UdelaR), con el apoyo de una beca de la CARU, aplicaron el modelo hidrodinámico bidimensional **TELEMAC 2D** al tramo completo del Río Uruguay entre **Salto Grande y Nueva Palmira**.

| Dato del estudio | Detalle |
|-----------------|---------|
| Autores | Rodrigo Junes, Mónica Fossati, Sebastián Solari (IMFIA, FIng, UdelaR) |
| Publicación | X Congreso Nacional de AIDIS, agosto 2019 |
| Financiamiento | Beca de investigación de la CARU |
| Modelo | TELEMAC 2D (código abierto, elemento finito) |
| Dominio | Salto Grande – Nueva Palmira (tramo completo compartido) |
| Período simulado | 2004–2010 |

### Datos de entrada y calibración

El **modelo de terreno digital (MDT)** del cauce fue construido integrando datos batimétricos de la CARU, relevamientos de la Facultad de Ingeniería (UdelaR), datos LIDAR de zonas emergidas, Cartas Náuticas del Servicio de Oceanografía, Hidrografía y Meteorología de la Armada Argentina (SOHMA) y la tesis de Casterá (2015).

La calibración del modelo se realizó ajustando el coeficiente de rugosidad de Manning:

| Zona | Coeficiente de Manning |
|------|------------------------|
| Cauce principal (tramo norte) | 0,022 |
| Cauce principal (tramo central) | 0,010 |
| Cauce principal (tramo sur) | 0,025 |
| Planicies de inundación e islas | 0,25 |
| Fricción del viento | 1,46 × 10⁻⁶ |

La **validación** se realizó sobre el año 2005, comparando niveles simulados con registros en 13 estaciones hidrométricas distribuidas a lo largo del tramo. Los resultados mostraron correlaciones superiores a 0,93 en todas las estaciones, con un error cuadrático medio (RMS) máximo de 0,79 m en Concordia (Argentina) y un valor medio de 0,33 m, lo que indica una buena representación de los patrones de nivel observados.

## Patrones de flujo y resultados principales

### Estructura general

Los niveles del río disminuyen de norte a sur (de Salto Grande hacia Nueva Palmira y el Río de la Plata). Sin embargo, la dinámica de velocidades y las direcciones del flujo presentan marcadas diferencias entre el tramo superior, medio e inferior del río.

El análisis del modelo identificó tres rangos de caudal con comportamientos hidrodinámicos distintos:

| Rango | Caudal (m³/s) | Dinámica dominante |
|-------|---------------|-------------------|
| Bajo | < 1.000 | Fuerte influencia del Río de la Plata; inversiones de flujo frecuentes |
| Medio | 1.000 – 10.000 | Influencia combinada de Salto Grande y Río de la Plata |
| Alto | > 10.000 | Predominio de caudales de Salto Grande; inversiones acotadas al tramo inferior |

### Inversiones de flujo

Uno de los hallazgos principales del estudio es la presencia de **inversiones de flujo** (corriente remontante, de aguas abajo hacia aguas arriba) en el tramo inferior del Río Uruguay, generadas por la propagación de ondas meteorológicas desde el Río de la Plata.

**En caudal bajo (< 1.000 m³/s):** las inversiones se registran hasta **La Calera** (progresiva aproximada km 265 desde la desembocadura), con velocidades de 0,7 m/s en Nueva Palmira que disminuyen hasta 0,1 m/s en La Calera. Estas inversiones están asociadas a **tormentas del Río de la Plata** con vientos de componente Sur superiores a 6 m/s, que elevan el nivel en la desembocadura y generan una onda de marea meteorológica que remonta el río.

**En caudal medio (1.000–10.000 m³/s):** se mantienen inversiones de flujo hasta La Calera, pero requieren vientos de componente Sur más intensos (superiores a 8 m/s) para generarse.

**En caudal alto (> 10.000 m³/s):** las inversiones de flujo quedan acotadas al tramo aguas abajo de **Fray Bentos**. Las velocidades máximas en este rango son del orden de **2,5 m/s** en los pasos más encauzados.

### Dos tramos hidrodinámicamente distintos

Los resultados permiten dividir el tramo compartido del Río Uruguay en dos sectores con lógicas de funcionamiento diferentes:

**Tramo Fray Bentos – Nueva Palmira (tramo inferior):** la dinámica está **dominada por el nivel del Río de la Plata** incluso bajo caudales superiores a 10.000 m³/s. La influencia estuarial es permanente, lo que determina condiciones de navegación variables y la frecuente ocurrencia de inversiones de corriente. Este tramo corresponde a la zona de transición fluvioestuarial donde los efectos de las mareas meteorológicas son determinantes.

**Tramo aguas arriba de Fray Bentos:** la dinámica está **dominada por los caudales de Salto Grande**. En este sector el régimen del río es fluvial y la influencia del Río de la Plata se hace sentir solo en caudales muy bajos o bajo condiciones meteorológicas extremas.

## Implicaciones para la gestión hídrica y la navegación

Los resultados del modelo TELEMAC 2D tienen consecuencias prácticas para la gestión del Río Uruguay:

**Navegación:** las inversiones de flujo en el tramo inferior generan condiciones variables de corriente y nivel que deben ser consideradas en la planificación de operaciones portuarias en Nueva Palmira, Fray Bentos y los puertos intermedios.

**Calidad del agua:** en períodos de caudal bajo con vientos del Sur, la corriente remontante puede redistribuir efluentes y sedimentos en zonas extensas del tramo inferior, con implicaciones para el monitoreo ambiental de la CARU.

**Gestión de inundaciones:** la interacción entre crecidas fluviales y sudestadas (viento del Sudeste que eleva el nivel del Río de la Plata) puede generar situaciones de inundación de mayor magnitud y duración que las originadas por el hidrograma de Salto Grande solo.

**Dragado:** la dinámica de sedimentación en el tramo Fray Bentos – Nueva Palmira está fuertemente condicionada por los flujos bidireccionales, lo que influye en la localización y frecuencia de los pasos de mantenimiento de dragado.

## Palabras clave

hidrodinámica Río Uruguay modelo TELEMAC 2D, inversiones flujo Río Uruguay estuario, influencia Río de la Plata hidrodinámica Río Uruguay, Junes Fossati Solari IMFIA UdelaR modelo hidrodinámico, caudal Salto Grande Río Uruguay navegación, CARU beca investigación hidrodinámica, marea meteorológica sudestada Río Uruguay, Fray Bentos Nueva Palmira tramo inferior estuarial, corriente remontante Río Uruguay viento sur, batimetría Río Uruguay MDT SOHMA CARU
