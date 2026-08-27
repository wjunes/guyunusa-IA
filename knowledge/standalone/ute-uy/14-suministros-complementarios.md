# Suministros complementarios — RBT Capítulo XXV

## Alcance

**Cap. XXV — Suministros complementarios:** https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-25.pdf

Este capítulo regula las fuentes de suministro complementarias que pueden coexistir con el suministro principal de UTE en una instalación: grupos electrógenos, UPS, fuentes de energía renovable (antes de la regulación específica de los Caps. XXVIII y XXIX) y cualquier otra fuente local que no sea la red de distribución de UTE.

## Principio fundamental: no retorno a la red

El principio más importante que establece el RBT para los suministros complementarios es la **prohibición de retorno de energía a la red de UTE** sin la autorización expresa y el equipamiento específico habilitado por UTE para ello.

Esto protege:
- La seguridad del personal de UTE que trabaja en líneas que se supone están sin tensión.
- La calidad del suministro en la red de distribución.
- Los equipos de otros abonados conectados a la misma red.

El dispositivo que impide el retorno y asegura la separación galvánica entre la red de UTE y la fuente complementaria es el **conmutador de red/grupo** (interlock mecánico o eléctrico que hace imposible la conexión simultánea de ambas fuentes).

## Grupos electrógenos (socorro y emergencia)

### Clasificación por tiempo de conmutación

| Tipo | Tiempo máximo de conmutación | Aplicación típica |
|---|---|---|
| Grupo de socorro | > 15 segundos | Alumbrado de emergencia, cargas no críticas |
| Grupo de emergencia | ≤ 15 segundos | Hospitales, centros de datos, cargas críticas |
| Sistema de alimentación ininterrumpida (SAI/UPS) | 0 ms (sin interrupción) | Servidores, equipos médicos de soporte vital |

### Requisitos de instalación del grupo electrógeno

- **Sala o gabinete propio:** el motor de combustión requiere ventilación adecuada para el arranque y funcionamiento, y para la evacuación de los gases de escape.
- **Depósito de combustible:** reglamentado por las normativas de seguridad contra incendios (DINACIA / SUCTA) además del RBT. El depósito diario (a pie del grupo) tiene límites de capacidad; el depósito principal puede requerir autorización especial.
- **Escape:** tubo de escape al exterior, con silenciador y orientado para evitar la reingesta de gases.
- **Conmutador ATS:** el conmutador automático (ATS — Automatic Transfer Switch) detecta la falta de suministro de UTE y conmuta la carga al grupo sin intervención humana. La reconexión a la red de UTE también es automática (tras verificar el restablecimiento del suministro y la sincronización o temporización adecuada).
- **Puesta a tierra del grupo:** el neutro del alternador debe conectarse a tierra local cuando el grupo opera en isla. La puesta a tierra del grupo puede ser la misma que la de la instalación o una independiente, según el diseño.

### Pruebas periódicas

Los grupos electrógenos deben someterse a pruebas periódicas de arranque y funcionamiento bajo carga para garantizar que estarán disponibles en caso de emergencia. Se recomienda al menos una prueba mensual con carga real o resistiva.

## Sistemas de alimentación ininterrumpida (SAI / UPS)

Los SAI/UPS combinan un rectificador, baterías y un inversor para proporcionar suministro sin interrupción ante la falta del suministro de red. Se clasifican en:

| Topología | Descripción |
|---|---|
| **Off-line (standby)** | En condiciones normales la carga es alimentada directamente por la red; el inversor entra en servicio solo al fallar la red. Tiempo de conmutación de 5–20 ms. |
| **Line-interactive** | El inversor está siempre activo y regula la tensión; ante falta de red opera con baterías. Mayor protección frente a fluctuaciones de tensión. |
| **On-line (doble conversión)** | La carga es alimentada siempre por el inversor; la red alimenta al rectificador-cargador. Tiempo de conmutación 0 ms; máxima protección. Para cargas críticas. |

### Baterías del SAI

Las baterías de plomo-ácido selladas (VRLA) son las más comunes en SAI industriales y de instalación. Las baterías de litio (LiFePO4) están creciendo en el mercado por su mayor vida útil y densidad de energía. Ambas requieren:
- Local ventilado (especialmente las de plomo, que pueden emitir hidrógeno durante la carga).
- Temperatura controlada (las baterías de plomo se degradan significativamente por encima de 25°C).
- Inspección y reemplazo periódico (vida útil típica de baterías VRLA: 3–5 años en entornos con temperatura controlada).

## Fuentes de energía renovable como suministro complementario

Antes de la entrada en vigor de los Decretos de microgeneración (Decreto 173/010 y siguientes), las instalaciones fotovoltaicas, eólicas y otras fuentes renovables debían operar en modalidad isla (sin conexión a la red de UTE) o como suministro complementario con conmutador. La regulación específica de la conexión a la red y la venta de excedentes está ahora contemplada en los Caps. XXVIII y XXIX del RBT (ver documento 16-microgeneracion-autoconsumo.md).

## Fuentes

- Cap. XXV (PDF): https://portal.ute.com.uy/sites/default/files/files-cuerpo-paginas/C-25.pdf

## Palabras clave

grupo electrógeno Uruguay ATS conmutador, suministro complementario UTE Uruguay no retorno red, UPS SAI Uruguay instalación, batería plomo VRLA Uruguay SAI, conmutador red grupo electrógeno Uruguay, grupo emergencia hospital Uruguay tiempo conmutación, depósito combustible grupo electrógeno Uruguay, prueba grupo electrógeno Uruguay mensual, UPS doble conversión Uruguay, sistema isla fotovoltaico Uruguay
