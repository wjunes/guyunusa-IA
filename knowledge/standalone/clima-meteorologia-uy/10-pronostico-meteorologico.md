# Pronóstico Meteorológico en Uruguay

---

## Definición y alcance

El **pronóstico meteorológico** es la predicción del estado futuro de la atmósfera en un lugar o región determinados. Comprende tanto la predicción de variables cuantitativas (temperatura, viento, precipitación) como la descripción cualitativa del tiempo esperado (soleado, lluvioso, tormentoso).

INUMET es el organismo oficial responsable de los pronósticos meteorológicos para Uruguay. Sus servicios de predicción están organizados según las escalas temporales y los usuarios destinatarios.

---

## Clasificación de los pronósticos por escala temporal

| Escala | Horizonte temporal | Técnica principal | Nivel de confianza |
|--------|-------------------|-------------------|-------------------|
| **Nowcasting** | 0–2 horas | Extrapolación de radar; análisis de imágenes satelitales | Muy alto localmente |
| **Muy corto plazo** | 2–12 horas | PNT + nowcasting | Alto |
| **Corto plazo** | 12–72 horas | Predicción Numérica del Tiempo (PNT) | Alto a moderado |
| **Mediano plazo** | 3–7 días | PNT de largo alcance; ensambles | Moderado |
| **Extendido** | 8–15 días | Modelos de ensamble global | Bajo a moderado |
| **Estacional** | 1–6 meses | Modelos climáticos; ENSO; estadísticas | Orientativo |

---

## Productos de pronóstico de INUMET

INUMET elabora y difunde los siguientes productos de predicción operativa:

### Productos generales

- **Pronóstico del tiempo:** Texto narrativo y/o gráfico para el día, las 72 horas y el extendido semanal.
- **Probabilidad de precipitación:** Expresada en porcentaje (%) de que la precipitación supere un umbral definido (~0,1 mm en 24 h).
- **Alertas meteorológicas:** Aviso Especial de Tiempo (AET); alerta temprana; niveles de alerta (verde/amarillo/naranja/rojo) según intensidad y zona.

### Productos especializados

| Producto | Usuario objetivo |
|----------|----------------|
| Boletín agrometeorológico | Productores agropecuarios; MGAP; INIA |
| Pronóstico de oleaje y viento costero | Navegantes; Armada; SOHMA; puertos |
| Meteorología aeronáutica: METAR, TAF, SIGMET, PIREP | Aviación civil; DINACIA; aeropuertos |
| Pronóstico hidrológico (en coordinación con DINAGUA) | Gestión de embalses; alerta de inundaciones |
| Pronóstico estacional (trimestral) | Planificación energética; agricultura |
| Boletín de seguimiento ENSO | Técnicos; tomadores de decisión |

---

## La Predicción Numérica del Tiempo (PNT)

La **Predicción Numérica del Tiempo** (PNT; en inglés NWP, *Numerical Weather Prediction*) es el método central del pronóstico meteorológico moderno. Se basa en:

1. **Ecuaciones de la dinámica atmosférica:** Las leyes de la física (conservación de masa, momento y energía) se traducen en sistemas de ecuaciones diferenciales parciales.
2. **Discretización:** Las ecuaciones se resuelven numéricamente sobre una malla tridimensional (horizontal × vertical × tiempo).
3. **Condiciones iniciales:** Datos de observación del estado actual de la atmósfera (radiosondes, estaciones, satélites, radar, boyas, aviones) que se incorporan mediante un proceso de **asimilación de datos**.
4. **Integración temporal:** El modelo se "ejecuta hacia el futuro" con un paso de tiempo determinado.

### Modelos utilizados por INUMET

INUMET utiliza salidas de modelos globales de grandes centros internacionales:

| Modelo | Centro | Resolución aproximada | Horizonte |
|--------|--------|----------------------|-----------|
| GFS (*Global Forecast System*) | NCEP/NOAA (EE.UU.) | ~13 km | 16 días |
| IFS (*Integrated Forecasting System*) | ECMWF (Europa) | ~9 km | 10–15 días |
| ICON | DWD (Alemania) | ~13 km | 7,5 días |
| WRF (*Weather Research and Forecasting*) | Implementación regional (INUMET) [VERIFICAR] | Resolución local más alta | 3–5 días |

*INUMET también puede contar con acceso a modelos regionales LAPS, ETA o similares según los acuerdos de cooperación con SMN Argentina y CPTEC/INPE Brasil [VERIFICAR estado actual].*

---

## Sistemas de ensamble (ensemble)

Los modelos de **ensamble** (*ensemble*) son conjuntos de múltiples corridas del mismo modelo o de varios modelos, cada una con ligeras perturbaciones en las condiciones iniciales o en los parámetros físicos. Permiten:

- Cuantificar la **incertidumbre** del pronóstico.
- Generar **probabilidades** de ocurrencia de un evento meteorológico.
- Identificar escenarios alternativos posibles.

| Sistema de ensamble | Centro | Número de miembros | Horizonte |
|--------------------|--------|-------------------|-----------|
| GEFS | NOAA | 31 | 16 días |
| ENS (ECMWF Ensemble) | ECMWF | 51 | 15 días |
| TIGGE | Múltiples centros | >300 | 15 días |

---

## Asimilación de datos

La **asimilación de datos** es el proceso mediante el cual las observaciones meteorológicas de distintas fuentes se integran con las salidas del modelo para generar las mejores condiciones iniciales posibles. Los métodos más comunes son:

- **3D-Var** (variacional tridimensional)
- **4D-Var** (variacional cuatridimensional; ECMWF)
- **EnKF** (*Ensemble Kalman Filter*)

---

## Fuentes de datos para el pronóstico

### Redes de observación convencional

- Estaciones meteorológicas de superficie (INUMET, INIA, aeropuertos).
- Radiosondes: INUMET lanza radiosondes en el aeropuerto de Carrasco (Montevideo) y en Artigas [VERIFICAR frecuencia actual: generalmente 2 lanzamientos/día a 00 y 12 UTC]; en coordinación con la red regional de la OMM.
- Boyas oceánicas.

### Datos remotos

| Sistema | Parámetros obtenidos |
|---------|---------------------|
| **Radar meteorológico** | Precipitación (reflectividad); viento (Doppler); identificación de tornados/granizo |
| **Satélite geoestacionario (GOES)** | Nubosidad; TSM; humedad; temperatura de tope de nubes; rayos |
| **Satélite de órbita polar (NOAA, Metop)** | Perfiles de temperatura y humedad en columna; viento; hielo marino |
| **Datos de aviación (PIREP, AMDAR)** | Temperatura; viento; turbulencia en vuelo |
| **Navegación satelital (GPS-RO)** | Perfiles de temperatura y humedad |

---

## Radar meteorológico en Uruguay

INUMET opera una **red de radares meteorológicos** (Doppler, banda C) cuyos datos son fundamentales para el nowcasting y la vigilancia de tormentas severas. La red incluye radares estratégicamente ubicados para cubrir el territorio nacional [VERIFICAR número exacto y ubicaciones actuales]. Los radares producen:

- **PPI** (*Plan Position Indicator*): imagen horizontal de reflectividad a elevación fija.
- **CAPPI** (*Constant Altitude PPI*): corte horizontal a altitud constante.
- **RHI** (*Range-Height Indicator*): perfil vertical de la tormenta.
- Producto de detección de granizo.
- Estimación de precipitación acumulada.

---

## Vigilancia meteorológica y alertas en Uruguay

### Sistema de Alerta Temprana (SAT)

INUMET mantiene un sistema de **vigilancia permanente** (24/7) para la emisión de alertas. Las alertas meteorológicas se coordinan con el **SINAE** (Sistema Nacional de Emergencias) para la comunicación a la población y a las autoridades.

### Niveles de alerta de INUMET

| Nivel | Color | Significado |
|-------|-------|-------------|
| 1 | Verde | Sin peligro |
| 2 | Amarillo | Posible impacto; precaución |
| 3 | Naranja | Impacto significativo probable; advertencia |
| 4 | Rojo | Impacto muy severo; alerta máxima |

*[VERIFICAR nomenclatura exacta y criterios umbrales para cada nivel según protocolo vigente de INUMET]*

---

## Meteorología aeronáutica

La meteorología aeronáutica es uno de los servicios más críticos e internacionalmente regulados de INUMET. Se rige por los estándares de la OACI (*Organización de Aviación Civil Internacional*) y la OMM.

| Producto | Descripción | Periodicidad |
|----------|-------------|-------------|
| **METAR** | Observación meteorológica de aeródromo en tiempo real | Cada 30 min o 1 h |
| **SPECI** | METAR especial ante cambio significativo de condiciones | Cuando corresponde |
| **TAF** | Pronóstico de aeródromo para las próximas 24–30 h | Cada 6 h |
| **SIGMET** | Aviso de fenómenos significativos en ruta (tormenta severa, ceniza volcánica, turbulencia, etc.) | Cuando corresponde |
| **GAMET** | Pronóstico de área de baja altitud | Cada 6 h |
| **ATIS** | Información automática del terminal en aeropuerto | Continuo |

El aeropuerto internacional de Carrasco (Montevideo) es la principal estación de meteorología aeronáutica; existe también cobertura en Punta del Este, Salto, Colonia y otros aeródromos.

---

## Verificación del pronóstico

La verificación es el proceso de comparar los pronósticos con las observaciones reales para medir la calidad predictiva. Las métricas más utilizadas son:

| Métrica | Qué mide |
|---------|---------|
| RMSE (*Root Mean Square Error*) | Error cuadrático medio; para variables continuas (temperatura, presión) |
| MAE (*Mean Absolute Error*) | Error medio absoluto |
| Bias | Sesgo sistemático del pronóstico |
| BSS (*Brier Skill Score*) | Calidad de pronósticos probabilísticos de precipitación |
| ETS (*Equitable Threat Score*) | Destreza en la predicción de eventos de precipitación |

INUMET realiza verificaciones periódicas de sus pronósticos en el marco de los estándares de la OMM.

---

## Comunicación del pronóstico

La comunicación efectiva del pronóstico meteorológico a la población general es parte fundamental del servicio de INUMET:

- Sitio web: publicación de pronósticos texto, gráficos e imágenes de radar y satélite.
- Redes sociales: avisos de alerta y resúmenes diarios.
- Boletines por correo para sectores productivos.
- Coordinación con medios de comunicación.
- Avisos del SINAE a gobiernos departamentales e intendencias.

---

## Palabras clave

pronóstico meteorológico Uruguay INUMET escala temporal nowcasting corto plazo estacional, predicción numérica del tiempo PNT NWP modelos GFS ECMWF IFS WRF Uruguay, modelos ensamble ensemble incertidumbre precipitación probabilidad Uruguay, asimilación de datos radiosonde 4D-Var Uruguay, radar meteorológico Uruguay INUMET Doppler banda C nowcasting tormentas severas, satélite GOES imagen nubosidad TSM Uruguay meteorología, alerta meteorológica Uruguay niveles verde amarillo naranja rojo SINAE, meteorología aeronáutica Uruguay METAR TAF SIGMET OACI Carrasco, verificación pronóstico RMSE bias Uruguay, sistema alerta temprana SAT Uruguay INUMET SINAE coordinación
