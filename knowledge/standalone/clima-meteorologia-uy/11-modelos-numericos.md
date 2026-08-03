# Modelos Numéricos del Tiempo y el Clima

## Definición

Un **modelo numérico del tiempo** (MNT; en inglés NWP, *Numerical Weather Prediction*) es un sistema computacional que reproduce el comportamiento de la atmósfera mediante la resolución numérica de las ecuaciones que gobiernan la física y la dinámica atmosférica. A diferencia de los métodos estadísticos o empíricos, los MNT se fundamentan en principios físicos primeros (*first principles*): conservación de masa, momento y energía, ecuación de estado de los gases ideales y termodinámica.

El origen de los modelos numéricos se remonta al trabajo teórico de **Lewis Fry Richardson** (1922), quien formuló las ecuaciones fundamentales y las resolvió manualmente —un proceso que tardó semanas—. El primer pronóstico numérico operativo con computadora fue realizado en 1950 por **Charney, Fjørtoft y Von Neumann** usando el ENIAC.

## Ecuaciones fundamentales

Los MNT resuelven numéricamente las **ecuaciones primitivas** de la atmósfera:

1. **Ecuación de movimiento horizontal** (dos componentes):
   - Conservación de momento; incluye la fuerza de Coriolis, gradiente de presión y fricción.
2. **Ecuación de continuidad** (conservación de masa):
   - La divergencia del flujo de masa es igual a la variación temporal de la densidad.
3. **Ecuación termodinámica** (primer principio de la termodinámica):
   - La variación de temperatura sigue el trabajo y los intercambios de calor.
4. **Ecuación de estado** de los gases ideales:
   - p = ρ R T
5. **Ecuación de agua** (conservación del vapor de agua, agua líquida y hielo).

## Estructura de un modelo atmosférico

| Componente | Descripción |
|-----------|-------------|
| **Dominio** | Región geográfica cubierta (global o regional) |
| **Malla (grid)** | Discretización espacial horizontal (latitud × longitud o proyección conforme) |
| **Niveles verticales** | Capas sigma (σ), híbridas o de presión; típicamente 50–137 niveles |
| **Paso de tiempo (Δt)** | Intervalo de integración temporal (segundos a minutos) |
| **Condiciones iniciales** | Estado observado de la atmósfera en t=0; producto de la asimilación de datos |
| **Condiciones de contorno** | Topografía; TSM; uso del suelo; hielo marino; concentración de CO₂ |
| **Parametrizaciones** | Procesos subgrid: convección, microfísica de nubes, capa límite, radiación, turbulencia |

## Modelos globales de referencia

| Modelo | Organización | País | Resolución horizontal | Niveles verticales | Horizonte |
|--------|-------------|------|-----------------------|-------------------|-----------|
| **IFS** (*Integrated Forecasting System*) | ECMWF | Europa (multilateral) | ~9 km (HRES) | 137 | 10–15 días |
| **GFS** (*Global Forecast System*) | NCEP/NOAA | EE.UU. | ~13 km | 127 | 16 días |
| **ICON** | DWD | Alemania | ~13 km | 90 | 7,5 días |
| **ARPEGE** | Météo-France | Francia | ~5 km (Europa) / ~40 km (global) | 105 | 4 días |
| **UKMET Unified Model** | UK Met Office | Reino Unido | ~10 km | 70 | 7 días |
| **NICAM** | JMA/RIKEN | Japón | ~7 km | 78 | — |
| **BAM** (*Brazilian Atmospheric Model*) | CPTEC/INPE | Brasil | ~20 km | 64 | 15 días |

*El modelo del ECMWF (IFS) es consistentemente considerado el más preciso globalmente para pronósticos de mediano plazo (3–7 días), especialmente en el hemisferio sur.*

## Modelos regionales de área limitada (LAM)

Los modelos de **área limitada** (*Limited Area Models*, LAM) o modelos de **mesoescala** ofrecen mayor resolución espacial sobre una región específica. Reciben sus condiciones de contorno de un modelo global.

| Modelo | Organización de referencia | Dominio habitual | Resolución |
|--------|--------------------------|-----------------|-----------|
| **WRF** (*Weather Research and Forecasting*) | NCAR/NOAA (EE.UU.) | Regional configurable | 1–10 km |
| **ETA** | NCEP / SMN Argentina | América del Sur | ~10–20 km |
| **RegCM** | ICTP | Regional configurable | 10–50 km |
| **COSMO** | DWD / consorcio COSMO | Europa y derivados | 1–7 km |
| **ALARO / AROME** | Météo-France / ALADIN | Europa; adaptaciones regionales | 1–3 km |

En Uruguay, INUMET y el grupo de meteorología de IMFIA (Facultad de Ingeniería, Udelar) han trabajado con versiones del modelo **WRF** y del modelo **ETA** para aplicaciones regionales [VERIFICAR configuraciones actuales].

## Modelos de ensamble

Los **sistemas de ensamble** (*ensemble prediction systems*, EPS) ejecutan múltiples simulaciones con perturbaciones en las condiciones iniciales (y/o en las parametrizaciones), generando una distribución de pronósticos posibles en lugar de una única solución determinista.

### Utilidad del ensamble

- Cuantificación de la **incertidumbre** del pronóstico.
- Pronósticos **probabilísticos** (ej.: "70 % de probabilidad de precipitación > 10 mm en 48 h").
- Detección de **regímenes de tiempo** alternativos (bimodalidad).
- Mejor representación de eventos extremos de baja probabilidad.

### Principales sistemas de ensamble global

| Sistema | Centro | Miembros | Horizonte |
|---------|--------|---------|-----------|
| **ENS** (ECMWF Ensemble) | ECMWF | 51 (1 control + 50 perturbados) | 15 días |
| **GEFS** (*Global Ensemble Forecast System*) | NOAA | 31 | 16 días |
| **MEPS** (*MetCoOp Ensemble Prediction System*) | Nordics | 10 | 60 h |
| **TIGGE** | WMO | >300 (multi-modelo) | 15 días |

### MOGREPS / SuperEnsemble

Los **superensambles** o **ensambles multi-modelo** combinan salidas de distintos centros (ECMWF, NOAA, UKMET, DWD, etc.) para obtener mayor destreza predictiva que cualquier modelo individual. INUMET accede a estas salidas a través de la OMM.

## Modelos climáticos

Los **Modelos de Circulación General** (MCG) o **Modelos del Sistema Tierra** (MST) son el equivalente para el clima de los MNT: simulan la evolución del sistema climático durante décadas a siglos. A diferencia de los MNT, no son inicializados con observaciones recientes sino con concentraciones de GEI y otros forzantes externos.

| Tipo de modelo | Aplicación | Ejemplo |
|---------------|-----------|---------|
| MCG atmosférico (AGCM) | Circulación atmosférica; clima | CAM, ARPEGE-Climat |
| MCG oceánico (OGCM) | Circulación oceánica; TSM | NEMO, MOM |
| MCG acoplado (CGCM) | Sistema climático océano-atmósfera | CESM2, HadGEM3, IPSL-CM6 |
| Modelo del Sistema Tierra (ESM) | Incluye ciclos biogeoquímicos, carbono, vegetación | CMIP6 ESMs |

### CMIP (Coupled Model Intercomparison Project)

El **CMIP** es el marco internacional de comparación de modelos climáticos acoplados, organizado por el WCRP. Su fase más reciente (**CMIP6**) ha sido la base científica del IPCC AR6. Los resultados de CMIP6 son accesibles públicamente y son utilizados por investigadores uruguayos para generar proyecciones climáticas regionales.

## Reducción de escala (downscaling)

Las proyecciones climáticas de los MCG globales (resolución ~100–200 km) son demasiado gruesas para muchas aplicaciones prácticas en Uruguay. La **reducción de escala** (*downscaling*) permite obtener proyecciones a mayor resolución:

| Tipo | Método | Resolución obtenible |
|------|--------|---------------------|
| **Downscaling dinámico** | Modelo regional de clima (ej. RegCM, WRF) anidado en MCG global | 10–50 km |
| **Downscaling estadístico** | Relaciones estadísticas entre variables de gran escala y locales | Punto de estación |
| **Corrección de sesgo (bias correction)** | Ajuste de la distribución del MCG a observaciones históricas | Variable |

En Uruguay, proyecciones de downscaling dinámico han sido realizadas por investigadores de la Facultad de Ciencias (Departamento de Ciencias de la Atmósfera y los Océanos, DCAO) y del IMFIA [VERIFICAR proyectos actuales].

## Modelos hidrológicos acoplados a modelos meteorológicos

Los modelos hidrológicos (ej. VIC, mHM, GR4J) pueden acoplarse o forzarse con salidas de MNT o MCG para:

- Pronósticos de caudales e inundaciones.
- Evaluación del riesgo de sequía hídrica.
- Gestión de embalses (Rincón del Bonete, Baygorria, Palmar, Salto Grande).

DINAGUA y ADME (*Administración del Mercado Eléctrico*) utilizan pronósticos meteorológicos e hidrológicos para la gestión hídrica y la planificación energética.

## Acceso a datos de modelos en Uruguay

INUMET y los grupos de investigación acceden a datos de modelos mediante:

- **Portal NOMADS** (NOAA): datos GFS, GEFS, NAM en tiempo real (acceso público).
- **Servidor ECMWF**: acceso institucional a datos IFS/ENS (requiere acuerdo).
- **Copernicus Climate Data Store (CDS)**: ERA5 y otras reanalysis (acceso público tras registro).
- **CPTEC/INPE Brasil**: datos BAM y modelos regionales latinoamericanos.
- **OMM TIGGE**: datos de ensambles multi-modelo.

## Reanálisis climáticos

Los **reanálisis** son simulaciones retrospectivas de la atmósfera que combinan modelos con observaciones históricas mediante asimilación de datos. Producen series temporales homogéneas y completas del estado de la atmósfera desde el pasado hasta el presente.

| Reanálisis | Centro | Período | Resolución |
|-----------|--------|---------|-----------|
| **ERA5** | ECMWF | 1940–presente | 31 km; 137 niveles; horario |
| **NCEP/NCAR Reanalysis 1** | NOAA | 1948–presente | ~2,5° |
| **20CRv3** (*20th Century Reanalysis*) | NOAA | 1836–2015 | ~75 km |
| **JRA-55** | JMA | 1958–presente | ~55 km |

El **ERA5** es ampliamente utilizado en Uruguay para estudios de variabilidad climática, extremos y calibración de modelos regionales.

## Palabras clave

modelos numéricos tiempo atmósfera NWP Uruguay predicción numérica, ecuaciones primitivas atmosféricas conservación masa momento energía modelo atmosférico, ECMWF IFS modelo global mejor pronóstico hemisferio sur, GFS NOAA modelo global pronóstico Uruguay acceso datos NOMADS, WRF modelo regional mesoescala Uruguay INUMET IMFIA Facultad Ingeniería, modelos ensamble ensemble incertidumbre pronóstico ECMWF ENS 51 miembros, modelos climáticos CGCM MCG CMIP6 IPCC AR6 proyecciones Uruguay, downscaling dinámico RegCM WRF proyecciones climáticas Uruguay resolución regional, ERA5 reanálisis ECMWF 1940 Uruguay estudios climáticos, modelos hidrológicos acoplados pronóstico caudales embalses Uruguay DINAGUA
