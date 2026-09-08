# Microgeneración y autoconsumo fotovoltaico — RBT Caps. XXVIII y XXIX

## Alcance

**Cap. XXVIII — Microgeneración:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/Capítulo%20XXVIII.pdf
**Cap. XXIX — Autoconsumo fotovoltaico:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/Capítulo%20XXIX.pdf

## Marco legal

El marco normativo que habilita la conexión de fuentes de generación distribuida a la red de UTE se basa en:

- **Decreto 173/010** (2010): regula la microgeneración de energía eléctrica a partir de fuentes renovables, establece el régimen de medición neta (net metering) y fija las condiciones técnicas y comerciales para la conexión.
- **Decreto 354/009** y modificaciones: marco de eficiencia energética.
- **Ley 18.597** (Eficiencia Energética): base legal para las políticas de generación distribuida.
- **RBT Capítulo XXVIII** (microgeneración) y **Capítulo XXIX** (autoconsumo fotovoltaico, actualizado en 2026): normas técnicas de UTE que complementan el marco legal y definen los requisitos eléctricos específicos de la instalación.

## Microgeneración — Capítulo XXVIII

### Definición y límites de potencia

La microgeneración cubre instalaciones de generación a partir de fuentes renovables (solar fotovoltaica, eólica, micro-hidráulica, biomasa) con potencia de inyección a la red de **hasta 150 kW** para abonados en baja tensión.

### Medición neta (net metering)

El régimen de medición neta funciona de la siguiente forma:
- El abonado consume energía de la red cuando su generación es insuficiente (noche, días nublados).
- El abonado inyecta energía a la red cuando su generación supera su consumo.
- El contador bidireccional registra por separado la energía consumida de la red y la energía inyectada.
- En la factura mensual, la energía inyectada se descuenta de la energía consumida a la misma tarifa (o a la tarifa acordada según el contrato con UTE).
- Si la inyección supera el consumo en un período, el saldo acreedor se traslada a períodos siguientes (según los términos del contrato vigente).

### Requisitos técnicos generales

- **Inversor aprobado:** el inversor (equipo que convierte la CC del panel FV a CA de red) debe estar en la lista de equipos aprobados por UTE. Los modelos de inversores habilitados se consultan en el portal de UTE. Un inversor no listado no puede conectarse a la red.
- **Protecciones de desconexión automática:** el inversor debe desconectarse automáticamente de la red ante faltas de tensión, sobretensiones, bajadas de tensión, o variaciones de frecuencia fuera de los rangos admitidos. Esta función es obligatoria para evitar que el inversor mantenga tensión en la red cuando UTE ha interrumpido el suministro (riesgo para el personal de UTE).
- **Contador bidireccional:** UTE instala un contador bidireccional (o de importación/exportación) en el punto de conexión. El abonado puede solicitar el cambio de contador como parte del trámite de conexión.
- **Protección contra isla (anti-islanding):** función obligatoria del inversor que lo desconecta en menos de 2 segundos si detecta que opera en isla (sin referencia de la red de UTE).

## Autoconsumo fotovoltaico — Capítulo XXIX (actualizado agosto 2026)

El Capítulo XXIX, en su versión actualizada vigente desde el 13 de agosto de 2026, establece los requisitos técnicos específicos para las instalaciones de autoconsumo fotovoltaico. Es el capítulo de referencia para la gran mayoría de las instalaciones domésticas y comerciales en Uruguay.

### Componentes de una instalación FV conectada a la red

```
Paneles FV (CC)
      ↓
Inversor FV (CC→CA)
      ↓
Tablero de la instalación del abonado
      ↓
Medidor bidireccional (UTE)
      ↓
Red de distribución de UTE
```

### Inversores aprobados por UTE

La lista de inversores aprobados está disponible en:
**https://portal.ute.com.uy/microgeneracion**

El abonado o su Firma Instaladora debe verificar que el inversor a utilizar figure en esta lista antes de adquirirlo. La homologación implica que el inversor cumple con los requisitos de protección antiislanding, rango de operación de tensión y frecuencia, THD de corriente inyectada, y compatibilidad con la red de UTE.

### Técnico instalador habilitado

Las instalaciones de microgeneración y autoconsumo FV requieren un Técnico Instalador habilitado con **Categorías A y B**. El técnico firma el proyecto y es responsable técnico de la instalación.

### Proceso de conexión

1. **Evaluación previa:** el abonado o la Firma Instaladora verifica la potencia disponible en el empalme y la viabilidad técnica de la conexión.
2. **Diseño del sistema:** cálculo de la potencia FV, selección del inversor aprobado, diseño del circuito de CC (paneles, strings, cableado, fusibles de string, interruptor CC), diseño del circuito de CA, protecciones.
3. **Solicitud a UTE:** se presenta el proyecto ante UTE con la documentación requerida (esquema unifilar, memoria descriptiva, datos del inversor). La solicitud se realiza a través del portal de UTE o presencialmente.
4. **Análisis técnico por UTE:** UTE evalúa el impacto de la inyección en la red local y puede condicionar o limitar la potencia de inyección si la red no tiene capacidad suficiente.
5. **Instalación:** la Firma Instaladora ejecuta la instalación conforme al proyecto aprobado.
6. **Inspección y habilitación:** UTE inspecciona la instalación (o la da por aceptada con la firma del técnico habilitado, según el procedimiento vigente) y procede al cambio del medidor.
7. **Inicio de la medición neta:** el abonado comienza a operar bajo el régimen de net metering.

**Portal de trámites microgeneración:** https://portal.ute.com.uy/microgeneracion

### Requisitos técnicos del circuito FV

**Cableado de CC (paneles → inversor):**
- Cable tipo FV (fotovoltaico) de doble aislamiento, resistente a la intemperie y a los rayos UV, con tensión de trabajo de al menos 1.000 V CC.
- Sección mínima según la corriente de cortocircuito (Isc) del string.
- Los conductores positivo y negativo de cada string deben ir juntos (para reducir las corrientes circulantes por efecto inductivo y el riesgo de arco).

**Fusibles de string:** protegen cada string de paneles en caso de falla de otro string en paralelo. Obligatorios cuando se conectan 3 o más strings en paralelo.

**Interruptor de CC:** permite desconectar los paneles del inversor para mantenimiento. Debe ser de tipo CC (los interruptores convencionales de CA no están diseñados para interrumpir la corriente continua).

**Protección contra sobretensiones en CC:** descargadores (SPD) de CC en el tramo entre paneles e inversor, especialmente en instalaciones en zonas con alta densidad de rayos o con largas tiradas de cable al aire libre.

### Potencias habituales en instalaciones domésticas

| Tipo de vivienda | Potencia FV típica | Inversor típico |
|---|---|---|
| Apartamento / vivienda pequeña | 1,5–3 kWp | Microinversor o inversor string monofásico 1,5–3 kW |
| Casa estándar | 3–6 kWp | Inversor string monofásico 3–5 kW |
| Casa grande / con bomba de calor | 6–10 kWp | Inversor string monofásico 6–10 kW o trifásico |
| Comercio / industria pequeña | 10–50 kWp | Inversor string trifásico o múltiples inversores |

## Fuentes

- Cap. XXVIII (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/Capítulo%20XXVIII.pdf
- Cap. XXIX (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/Capítulo%20XXIX.pdf
- Portal microgeneración UTE: https://portal.ute.com.uy/microgeneracion
- Inversores aprobados UTE: https://portal.ute.com.uy/microgeneracion

## Palabras clave

autoconsumo fotovoltaico Uruguay UTE, microgeneración Uruguay Decreto 173/010, inversor aprobado UTE Uruguay lista, net metering medición neta Uruguay, paneles solares conectar red UTE Uruguay, técnico habilitado microgeneración Uruguay categoría A B, proceso conexión fotovoltaica UTE Uruguay, antiislanding inversor Uruguay, cable fotovoltaico CC Uruguay doble aislamiento, fusibles string paneles Uruguay, capacidad inyección red UTE Uruguay, contador bidireccional UTE Uruguay, Capítulo XXIX RBT actualización agosto 2026
