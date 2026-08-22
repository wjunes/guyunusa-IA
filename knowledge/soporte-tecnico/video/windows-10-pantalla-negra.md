# Windows 10 - Pantalla negra al iniciar

## Metadatos

### id

st-video-w10-pantalla-negra

### category

video

### os

windows-10

### component

gpu-display-driver

### difficulty

intermediate

### severity

high

### source_type

official

### updated_at

2026-08-14

### version

1.1.0

### tags

video, windows-10, pantalla-negra, gpu, monitor

## Descripción

Guía de diagnóstico conversacional para resolver pantalla negra en Windows 10 durante el arranque o al iniciar sesión.

## Nota de vigencia de soporte

El estado de soporte de Windows 10 y la disponibilidad de actualizaciones pueden variar según edición, licencia, canal y programa ESU.

Antes de recomendar una acción, verificar siempre el estado oficial vigente en Microsoft para la fecha de atención.
## Síntomas
- Pantalla negra después del logo de Windows.
- Cursor visible, pero sin escritorio.
- Monitor sin señal al iniciar.
- Pantalla negra tras actualización de controlador.
- Parpadeos o artefactos antes del fallo.

## Causas posibles

- Driver gráfico incompatible o corrupto.
- Error en salida de video seleccionada.
- Conflicto con actualización reciente.
- Fallo de explorador de Windows al cargar escritorio.
- Problema físico en cable, monitor o GPU.

## Diagnóstico

### Preguntas guiadas

1. ¿El problema empezó después de una actualización?
2. ¿Se escucha sonido de inicio aunque no haya imagen?
3. ¿Sucede con un solo monitor o con todos?
4. ¿Hay cursor visible en pantalla negra?
5. ¿Con otro cable o monitor cambia el comportamiento?

## Solución básica

1. Reiniciar equipo y monitor.
2. Verificar cable y puerto de video.
3. Probar combinación para reiniciar controlador gráfico.
4. Desconectar periféricos no esenciales.
5. Probar otro monitor o salida de video.

## Solución intermedia

1. Iniciar en modo seguro.
2. Revertir o desinstalar driver gráfico desde Administrador de dispositivos.
3. Reiniciar proceso del explorador de Windows.
4. Ejecutar reparación de inicio.
5. Comprobar actualizaciones pendientes del sistema.

## Solución avanzada

1. Instalar driver estable desde fabricante oficial.
2. Ejecutar verificación de archivos del sistema.
3. Reparar imagen de Windows con DISM.
4. Revisar registros de eventos de sistema y video.
5. Evaluar restauración del sistema si el fallo inició tras update.

## Verificación

- El escritorio carga normalmente.
- No reaparece pantalla negra tras reiniciar.
- El video se mantiene estable en uso normal.
- No hay errores de GPU en Administrador de dispositivos.

## Cuándo escalar

- Persisten fallos tras reinstalar driver oficial.
- Hay artefactos, apagones de video o reinicios.
- El problema aparece también fuera de Windows.
- Se sospecha daño físico de GPU, monitor o placa.

## Riesgos y advertencias

- No instalar drivers de sitios no oficiales.
- No actualizar BIOS/firmware sin respaldo y validación.
- Si hay olor a quemado o fallos eléctricos, apagar y derivar a técnico.
- No afirmar fechas de soporte sin validación oficial vigente.
## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 10 pantalla negra, no inicia escritorio, driver grafico, modo seguro, monitor sin señal, reparar inicio

