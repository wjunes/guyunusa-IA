# Windows 10 - No hay sonido

## Metadatos

### id

st-audio-w10-no-sonido

### category

audio

### os

windows-10

### component

audio-output-driver

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

audio, windows-10, sin-sonido, salida-audio

## Descripción

Guía de diagnóstico conversacional para resolver casos donde Windows 10 no reproduce sonido en parlantes, auriculares o salida HDMI.

## Nota de vigencia de soporte

El estado de soporte de Windows 10 y la disponibilidad de actualizaciones pueden variar según edición, licencia, canal y programa ESU.

Antes de recomendar una acción, verificar siempre el estado oficial vigente en Microsoft para la fecha de atención.
## Síntomas
- No se escucha audio en ninguna aplicación.
- El icono de volumen aparece activo, pero no hay salida.
- Auriculares o parlantes no son detectados.
- HDMI transmite video, pero no audio.
- Sonido intermitente o distorsionado.

## Causas posibles

- Dispositivo de salida incorrecto.
- Volumen del sistema o de la app en cero.
- Servicio de audio detenido.
- Driver de audio dañado o incompatible.
- Conflicto entre múltiples dispositivos de salida.

## Diagnóstico

### Preguntas guiadas

1. ¿El problema afecta a todas las aplicaciones?
2. ¿Qué salida estás usando (parlantes, auriculares, HDMI, Bluetooth)?
3. ¿Comenzó después de una actualización?
4. ¿Windows reconoce el dispositivo de audio?
5. ¿Aparece algún error en Administrador de dispositivos?

## Solución básica

1. Verificar volumen general y mezclador por aplicación.
2. Seleccionar manualmente el dispositivo de salida correcto.
3. Desconectar y reconectar auriculares/parlantes.
4. Reiniciar el equipo.
5. Ejecutar solucionador de audio de Windows.

## Solución intermedia

1. Reiniciar servicios de audio de Windows.
2. Deshabilitar y habilitar el dispositivo de audio.
3. Revisar estado del driver en Administrador de dispositivos.
4. Actualizar controlador desde Windows Update.
5. Probar audio con otra salida para aislar causa.

## Solución avanzada

1. Revertir controlador si el problema empezó tras actualización.
2. Desinstalar y reinstalar driver desde fabricante oficial.
3. Verificar conflictos con salida HDMI/Bluetooth.
4. Comprobar integridad del sistema si persiste.
5. Escalar con código de error y versión de driver.

## Verificación

- Se escucha audio de prueba del sistema.
- Funciona audio en navegador y reproductor local.
- La salida seleccionada se mantiene tras reinicio.
- No reaparecen errores del dispositivo.

## Cuándo escalar

- No hay salida de audio tras reinstalar driver oficial.
- Múltiples salidas fallan de forma persistente.
- El dispositivo no aparece en el sistema.
- Hay indicios de falla física de jack, placa o codec.

## Riesgos y advertencias

- No descargar drivers de sitios no oficiales.
- No editar registro como primer paso.
- Documentar cambios para poder revertir.
- No afirmar fechas de soporte sin validación oficial vigente.
## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 10 sin sonido, no hay audio, dispositivo de salida, driver de audio, hdmi sin audio, solucionador de audio

