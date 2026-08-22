# Windows 10 - Teclado no responde

## Metadatos

### id

st-perifericos-w10-teclado-no-responde

### category

perifericos

### os

windows-10

### component

keyboard-usb-bluetooth

### difficulty

basic

### severity

medium

### source_type

official

### updated_at

2026-08-14

### version

1.1.0

### tags

perifericos, windows-10, teclado, entrada

## Descripción

Guía de diagnóstico conversacional para cuando el teclado no responde en Windows 10, total o parcialmente.

## Nota de vigencia de soporte

El estado de soporte de Windows 10 y la disponibilidad de actualizaciones pueden variar según edición, licencia, canal y programa ESU.

Antes de recomendar una acción, verificar siempre el estado oficial vigente en Microsoft para la fecha de atención.

## Síntomas

- El teclado no escribe en ninguna aplicación.
- Algunas teclas fallan o tienen respuesta intermitente.
- Funciona en BIOS pero no en Windows.
- Teclado Bluetooth no empareja o se desconecta.
- Teclado USB enciende pero no registra entrada.

## Causas posibles

- Puerto USB con falla o conexión inestable.
- Batería baja en teclado inalámbrico.
- Driver HID/teclado con error.
- Configuración de accesibilidad alterada.
- Conflicto tras actualización o software reciente.

## Diagnóstico

### Preguntas guiadas

1. ¿El teclado es USB, Bluetooth o integrado?
2. ¿El fallo ocurre en todas las apps o solo en una?
3. ¿Comenzó tras actualización o instalación reciente?
4. ¿Funciona en pantalla de inicio de sesión?
5. ¿Probaste otro teclado o puerto USB?

## Solución básica

1. Desconectar y reconectar el teclado.
2. Probar otro puerto USB.
3. Si es inalámbrico, cambiar baterías y reemparejar.
4. Reiniciar el equipo.
5. Revisar opciones de accesibilidad relacionadas con teclado.

## Solución intermedia

1. Revisar “Teclados” y “Dispositivos de interfaz humana” en Administrador de dispositivos.
2. Desinstalar teclado y reiniciar para reinstalación automática.
3. Ejecutar solucionador de teclado.
4. Verificar idioma y distribución de teclado.
5. Probar en otra cuenta de usuario local.

## Solución avanzada

1. Reinstalar controladores de chipset/USB desde fabricante oficial.
2. Revisar eventos del sistema relacionados con HID/USB.
3. Probar arranque limpio para descartar conflictos.
4. Validar funcionamiento con teclado externo alternativo.
5. Escalar con logs y evidencia si persiste.

## Verificación

- El teclado responde en escritorio y aplicaciones.
- No hay advertencias de dispositivo en el sistema.
- Se mantiene funcionamiento tras reinicio.
- No hay desconexiones intermitentes.

## Cuándo escalar

- Ningún teclado funciona en el equipo.
- El error persiste tras reinstalar controladores oficiales.
- Hay signos de daño físico o eléctrico.
- El equipo presenta fallos USB generalizados.

## Riesgos y advertencias

- No instalar drivers desde sitios no oficiales.
- No deshabilitar dispositivos HID críticos sin respaldo.
- No afirmar fechas de soporte sin validación oficial vigente.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 10 teclado no responde, teclado usb, teclado bluetooth, dispositivo hid, entrada bloqueada

