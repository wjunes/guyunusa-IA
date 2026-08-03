# Instrumentación Meteorológica

## Introducción

La **instrumentación meteorológica** comprende todos los dispositivos utilizados para medir las variables del estado de la atmósfera. Su precisión, calibración y correcta instalación son fundamentales para la calidad de los datos climatológicos y de los pronósticos. La OMM establece los estándares internacionales de observación en su publicación **"Guide to Meteorological Instruments and Methods of Observation"** (CIMO Guide; WMO-No. 8).

## Temperatura del aire

### Termómetro

| Aspecto | Detalle |
|---------|---------|
| **Principio** | Dilatación de mercurio o alcohol; resistencia eléctrica (Pt100, termistor) en estaciones automáticas |
| **Ubicación** | Caseta meteorológica (Caseta Stevenson): 1,25–2,0 m sobre superficie; ventilación natural o forzada; pintura blanca reflectante |
| **Variables medidas** | Temperatura instantánea, temperatura máxima y mínima del día |
| **Unidades** | °C (grados Celsius) |
| **Termómetro de máxima** | Depósito de mercurio con estrangulamiento; retiene la temperatura más alta |
| **Termómetro de mínima** | Alcohol con índice flotante; retiene la temperatura más baja |
| **En AWS** | Sensor de resistencia de platino (Pt100) o termistor NTC; resolución 0,1 °C; precisión ±0,2 °C |

### Termómetro de suelo

Mide la temperatura del suelo a distintas profundidades (superficie, 5 cm, 10 cm, 20 cm, 30 cm, 50 cm, 100 cm). Importante para la agrometeorología y la predicción de heladas.

## Presión atmosférica

### Barómetro

| Aspecto | Detalle |
|---------|---------|
| **Tipo mercurial** | Columna de mercurio en tubo de vidrio; referencia de calibración; precisión ±0,1 hPa |
| **Tipo aneroide** | Cápsula metálica flexible; más portátil; menos preciso |
| **Tipo digital (transductor piezoeléctrico)** | Estándar en AWS modernas; resolución 0,1 hPa; precisión ±0,5 hPa |
| **Unidades** | hPa (hectopascales); equivalente a mbar (milibar) |
| **Corrección** | Se reduce al nivel del mar (QNH) para comparabilidad; p₀ = p_estación × e^(z/8.434) (fórmula barométrica simplificada) |
| **Presión media al nivel del mar Uruguay** | ~1.013,25 hPa (promedio global) |

## Humedad del aire

### Higrómetro y psicrómetro

| Instrumento | Principio |
|-------------|----------|
| **Higrómetro de cabello** | El cabello se contrae/dilata con la humedad relativa |
| **Psicrómetro (termómetro húmedo-seco)** | Diferencia entre termómetro seco y húmedo; la evaporación enfría el bulbo húmedo; la diferencia permite calcular la HR mediante tablas psicrométrica |
| **Sensor capacitivo (AWS)** | Cambio en la capacitancia de un polímero higroscópico; precisión ±2–3 % HR |
| **Higrótermógrafo** | Registrador gráfico continuo de temperatura y humedad |
| **Unidades** | Porcentaje (%) para la Humedad Relativa (HR) |

### Punto de rocío

El **punto de rocío** (Td) es la temperatura a la que el vapor de agua se condensa. Se calcula a partir de la temperatura y la HR:

- A mayor diferencia entre temperatura del aire y punto de rocío → aire más seco.
- Td ≈ T cuando HR ≈ 100 % (saturación).
- En Uruguay: Td media anual en Montevideo ~10–12 °C [VERIFICAR].

## Viento

### Anemómetro y veleta

| Aspecto | Detalle |
|---------|---------|
| **Anemómetro de cazoletas** | Tipo clásico; 3 cazoletas hemisféricas; la rotación mide la velocidad del viento; precisión ±0,5 m/s |
| **Anemómetro ultrasónico** | Mide el tiempo de vuelo de pulsos ultrasónicos en el aire; sin partes móviles; más preciso; estándar en AWS modernas |
| **Veleta** | Determina la dirección del viento (grados o rumbos); aleta orientable a favor del viento |
| **Altura de instalación** | 10 m sobre nivel del suelo (estándar OMM) |
| **Unidades** | m/s; km/h; nudos (kt) |
| **Escala Beaufort** | Escala descriptiva de 0 a 12 para la velocidad del viento (0 = calma; 12 = huracán ≥ 32,7 m/s) |
| **Racha de viento** | Velocidad máxima registrada en una ventana de 3 s (o 2–5 s según estándar) |

### Vientos medios en Uruguay

Para referencia, ver archivo 01-clima-del-uruguay.md (tabla de vientos) y 04-variables-meteorologicas.md.

## Precipitación

### Pluviómetro

| Aspecto | Detalle |
|---------|---------|
| **Tipo estándar (Hellmann o similar)** | Embudo colector de 200 cm² de área; depósito graduado; lectura manual diaria a las 09 UTC (o 06:00 hora local en horario de invierno) |
| **Pluviógrafo de flotador** | Registro continuo de precipitación en papel gráfico; permite conocer la intensidad en mm/h |
| **Pluviómetro de cubeta basculante (tipping bucket)** | Cada basculación = 0,1 mm de lluvia; señal digital; estándar en AWS; datos en tiempo real |
| **Pluviómetro pesador (weighing gauge)** | Mide la masa del agua acumulada; también puede medir nieve; el más preciso |
| **Unidades** | mm (milímetros) = litros/m² |
| **Diámetro colector estándar OMM** | 200 cm² (≈ 16 cm de diámetro interno) |
| **Altura del colector** | 30–100 cm sobre el suelo (varía según estándar nacional) |
| **Medida de nieve** | En Uruguay la nieve es excepcional (ver archivo 06-fenomenos-meteorologicos.md) |

## Radiación solar

### Piranómetro

| Aspecto | Detalle |
|---------|---------|
| **Principio** | Termopila con cúpulas de vidrio transparente; mide la irradiancia solar global (directa + difusa) |
| **Variable medida** | Irradiancia global (W/m²); radiación acumulada (MJ/m²) |
| **Unidades** | W/m² (vatios por metro cuadrado) |
| **Bandas espectrales** | 0,3–3 µm (radiación solar) |
| **Pirheliómetro** | Mide sólo la radiación solar directa (requiere seguidor solar) |
| **Pirómetro infrarrojo** | Mide la radiación de onda larga emitida por la atmósfera y la superficie |
| **Insolación** | Horas de sol real (brillo solar); sensor de umbral (≥ 120 W/m²); en Uruguay ~2.500–2.700 h/año |

## Radar meteorológico (como instrumento de observación)

Ver descripción técnica en archivo 14-redes-de-observacion.md. Como instrumento:

| Parámetro | Detalle |
|-----------|---------|
| **Frecuencia** | Banda C (~5 GHz) o banda S (~3 GHz) |
| **Longitud de onda** | ~5 cm (C) o ~10 cm (S) |
| **Alcance típico** | 200–250 km de radio desde la antena |
| **Productos** | Reflectividad (dBZ); velocidad Doppler (m/s); espectro de ancho; polarimetría (ZDR, KDP, ρhv) |
| **Resolución** | ~250 m a 1 km en radio; ~0,5–1° en azimut |
| **Volumen de escaneo** | Múltiples elevaciones (~5–18); ciclo completo en ~5–10 min |

## Radiosonde (globo meteorológico)

| Parámetro | Detalle |
|-----------|---------|
| **Composición** | Sensor de T, HR, p + GPS + transmisor de radio; peso ~250–500 g |
| **Globo** | Látex natural; diámetro inicial ~1 m; llega a ~10 m en estratosfera |
| **Gas de llenado** | Hidrógeno (H₂) o helio (He) |
| **Velocidad de ascenso** | ~5–6 m/s |
| **Altitud máxima** | ~30–35 km (cuando el globo revienta) |
| **Duración del vuelo** | ~90–120 min |
| **Datos transmitidos** | T, HR, p, velocidad y dirección del viento (GPS) |
| **Frecuencia en Uruguay** | 2 lanzamientos/día en Montevideo y Artigas [VERIFICAR] |

## Otros instrumentos

| Instrumento | Variable medida | Principio |
|-------------|----------------|----------|
| **Ceíómetro (ceilometer)** | Altura de la base de las nubes | Lidar de bajo poder |
| **Sensor de visibilidad** | Visibilidad horizontal (m; km) | Dispersión de luz (forward scatter) |
| **Disdrometro** | Distribución de tamaño de gotas de lluvia | Impacto acústico o imagen óptica |
| **Luviómetro de atrapante** | Deposición húmeda/seca (contaminación) | Colector continuo |
| **Evaporímetro Piché** | Evaporación potencial | Papel de filtro húmedo expuesto al aire |
| **Heliógrafo Campbell-Stokes** | Horas de sol (insolación) | Quema de papel por foco solar |
| **Nefoscopio** | Dirección y velocidad de movimiento de nubes | Observación visual |

## Calibración y control de calidad

La calibración de los instrumentos meteorológicos es esencial para la homogeneidad y comparabilidad de los datos:

- **Calibración en laboratorio:** Comparación contra patrones trazables a estándares internacionales (BIPM).
- **Calibración en campo:** Comparación entre instrumentos adyacentes; detección de derivas temporales.
- **Control de calidad automático (QC):** Algoritmos que detectan datos fuera de rango, inconsistencias físicas y valores sospechosos.
- **Homogeneización de series históricas:** Técnicas estadísticas para detectar y corregir cambios artificiales en las series largas (cambio de instrumento, reubicación de estación, cambio de observador).

INUMET realiza la gestión metrológica de sus instrumentos y participa en comparaciones internacionales bajo el marco CIMO de la OMM.

## Palabras clave

instrumentación meteorológica Uruguay OMM CIMO Guide WMO-8, termómetro caseta Stevenson temperatura máxima mínima Uruguay 1,25-2m, barómetro presión atmosférica hPa nivel del mar Uruguay 1013 hPa, higrómetro psicrómetro humedad relativa punto de rocío Uruguay sensor capacitivo AWS, anemómetro cazoletas ultrasónico viento 10m Uruguay m/s km/h nudos Beaufort, pluviómetro cubeta basculante 200cm2 precipitación mm Uruguay tipping bucket, piranómetro radiación solar global W/m2 Uruguay 2500 horas sol, radiosonde globo meteorológico Uruguay Montevideo Artigas perfil vertical temperatura humedad viento GPS, radar meteorológico banda C Uruguay dBZ Doppler polarimetría reflectividad granizo, calibración instrumentos INUMET metrología control calidad series históricas
