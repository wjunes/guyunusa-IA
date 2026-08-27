# Carga de vehículos eléctricos — RBT Capítulo XXX

## Alcance

**Cap. XXX — Instalaciones para la carga de vehículos eléctricos:** https://portal.ute.com.uy/sites/default/files/docs/C-30.pdf

El Capítulo XXX regula las instalaciones eléctricas destinadas a la carga de vehículos eléctricos (VE) y vehículos eléctricos híbridos enchufables (PHEV) conectadas a la red de distribución de UTE.

**Contacto UTE para movilidad eléctrica:** movilidadelectrica@ute.com.uy

## Contexto: movilidad eléctrica en Uruguay

Uruguay tiene una política activa de promoción de la movilidad eléctrica, con incentivos fiscales para la importación de VE y PHEV, y una red de cargadores públicos operada en parte por UTE. La demanda de instalaciones de carga privada (domicilios, empresas, estacionamientos, flotas) está creciendo de forma sostenida.

UTE opera el portal de movilidad eléctrica: **https://portal.ute.com.uy/movilidad-electrica**

## Tipos de carga y equipos (EVSE)

### Modos de carga (IEC 61851-1)

| Modo | Descripción | Cargador | Uso típico |
|---|---|---|---|
| **Modo 1** | Conexión directa a tomacorriente doméstico (schuko o tipo L) | Sin EVSE específico | No recomendado; riesgo eléctrico |
| **Modo 2** | Cable con EVSE in-cable (ICCPD) entre tomacorriente y VE | ICCPD en el cable | Carga doméstica ocasional |
| **Modo 3** | EVSE fijo (wallbox) conectado permanentemente; comunicación entre VE y EVSE | Wallbox (AC) | Carga doméstica e institucional |
| **Modo 4** | Carga rápida en CC; EVSE de alta potencia con conversión CA→CC externa al VE | Cargador rápido DC | Estaciones públicas de carga rápida |

El RBT y UTE recomiendan el **Modo 3 (wallbox)** para instalaciones fijas privadas por razones de seguridad, control y durabilidad.

### Tipos de conectores

| Conector | Estándar | Uso |
|---|---|---|
| **Tipo 2 (Mennekes)** | IEC 62196-2 | Carga AC monofásica y trifásica; estándar dominante en Uruguay y Europa |
| **CCS Combo 2** | IEC 62196-3 | Carga AC + DC rápida; estándar en VE europeos y gran parte de los modernos |
| **CHAdeMO** | JARI | Carga DC rápida; estándar de Nissan y Mitsubishi; en retroceso |
| **GB/T** | Chino | Algunos VE de origen chino; requiere adaptador |

UTE estandariza el conector **Tipo 2** para carga AC en su red de cargadores públicos.

## Requisitos de la instalación eléctrica (Cap. XXX)

### Circuito exclusivo

La instalación de un wallbox (EVSE Modo 3) requiere un **circuito exclusivo** desde el tablero de la vivienda o local hasta el punto de carga. No se admite compartir el circuito con otros receptores.

### Sección de conductores y potencia

| Potencia del EVSE | Corriente nominal | Sección mínima recomendada |
|---|---|---|
| 3,7 kW (monofásico 16 A) | 16 A | 2,5 mm² Cu |
| 7,4 kW (monofásico 32 A) | 32 A | 6 mm² Cu |
| 11 kW (trifásico 16 A) | 3×16 A | 2,5 mm² Cu por fase |
| 22 kW (trifásico 32 A) | 3×32 A | 6 mm² Cu por fase |

La longitud del circuito debe contemplarse para que la caída de tensión no supere el 3% (circuito de carga de VE asimilable a circuito de fuerza).

### Protecciones obligatorias

El RBT Cap. XXX exige, como mínimo en el circuito de carga del VE:

1. **Interruptor diferencial de tipo B** (o tipo A con protección adicional contra corriente de falta de CC): los cargadores en Modo 3 pueden generar corrientes de falta que incluyen componentes de CC, que no son detectadas por los diferenciales tipo AC ni tipo A convencionales. El diferencial tipo B detecta tanto corrientes alternas senoidales como pulsantes y continuas lisas.
2. **Interruptor automático magnetotérmico** calibrado para la corriente del circuito.
3. El propio EVSE (wallbox) debe cumplir la norma IEC 61851-1 y contar con marcado CE.

> **Nota importante:** el diferencial **tipo B** es considerablemente más caro que el tipo AC o tipo A. Algunos fabricantes de wallbox incorporan en el propio equipo una protección equivalente, lo que permite usar un diferencial tipo A en el circuito; esto debe verificarse en las especificaciones del wallbox antes de elegir la protección diferencial.

### Puesta a tierra

El circuito de carga del VE debe tener conductor de protección (PE) dimensionado según las reglas del Cap. XXIII. El wallbox debe estar conectado a la puesta a tierra de la instalación.

### Carga en estacionamientos y garajes

Para instalaciones de carga en estacionamientos colectivos (edificios, centros comerciales, empresas) se requiere un diseño de la instalación que contemple:
- La potencia simultánea máxima probable (no todos los VE cargan al mismo tiempo).
- La posibilidad de gestión de carga (smart charging / EMS) para limitar la demanda total y evitar superar la potencia contratada con UTE.
- Un sistema de medición individual si la carga es facturada a cada usuario.
- La gestión de potencia dinámica cuando se combina con generación fotovoltaica propia.

### Ampliación de potencia contratada

La instalación de cargadores de VE puede requerir ampliar la potencia contratada con UTE si la instalación existente no tiene capacidad suficiente. UTE ofrece las **potencias normalizadas** que se detallan en el documento 19-potencias-tarifas.md. El trámite de ampliación de potencia se realiza a través de:

**https://portal.ute.com.uy/tramites**

## Instalaciones de carga pública

Las estaciones de carga públicas (propiedad de UTE, de municipios, o de privados) tienen requisitos adicionales de telecomunicaciones (OCPP — protocolo de gestión de cargadores), seguridad física y protección contra vandalismo, y están sujetas a los reglamentos de URSEA para operadores de movilidad eléctrica.

## Fuentes

- Cap. XXX (PDF): https://portal.ute.com.uy/sites/default/files/docs/C-30.pdf
- Portal movilidad eléctrica UTE: https://portal.ute.com.uy/movilidad-electrica
- Email UTE movilidad eléctrica: movilidadelectrica@ute.com.uy

## Palabras clave

carga vehículo eléctrico Uruguay wallbox, instalación EVSE Uruguay RBT Cap XXX, diferencial tipo B cargador VE Uruguay, modo 3 wallbox Uruguay circuito exclusivo, conector tipo 2 Mennekes Uruguay, CCS combo 2 Uruguay carga rápida, sección cable wallbox Uruguay 6mm2, potencia carga VE Uruguay ampliación potencia UTE, smart charging estacionamiento Uruguay, gestión carga flota vehículos eléctricos Uruguay, movilidad eléctrica UTE Uruguay portal, IEC 61851 Uruguay cargador
