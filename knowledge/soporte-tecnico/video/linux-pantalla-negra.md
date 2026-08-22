# Linux - Pantalla negra al iniciar

## Metadatos

### id

st-video-linux-pantalla-negra

### category

video

### os

linux

### component

gpu-display-manager-kernel

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

video, linux, pantalla-negra, gpu, display-manager

## Descripción

Guía de diagnóstico conversacional para resolver casos en que Linux inicia con pantalla negra, sin entorno gráfico o con señal de video inestable.

## Síntomas

- Pantalla negra después del logo de arranque.
- Cursor parpadeante sin escritorio.
- Monitor sin señal tras iniciar sesión.
- Entorno gráfico no carga, pero el sistema responde.
- Falla luego de actualización de kernel o driver gráfico.

## Causas posibles

- Driver gráfico incompatible o corrupto.
- Display manager fallando al iniciar.
- Kernel nuevo con regresión de video.
- Configuración incorrecta de GPU híbrida.
- Resolución/frecuencia no compatible con monitor.

## Diagnóstico

### Preguntas guiadas

1. ¿Qué distribución Linux estás usando?
2. ¿El problema empezó después de actualizar kernel o drivers?
3. ¿El equipo responde por teclado o terminal virtual?
4. ¿Es GPU integrada, dedicada o híbrida?
5. ¿Con otro monitor/cable ocurre lo mismo?

## Solución básica

1. Reiniciar equipo y comprobar conexiones de monitor/cable.
2. Probar otra salida de video o otro monitor.
3. Iniciar en modo recuperación si está disponible.
4. Intentar acceder a terminal virtual para confirmar que el sistema sigue activo.
5. Probar arranque con kernel anterior desde el menú de arranque.

## Solución intermedia

1. Verificar estado del display manager.
2. Revisar logs del arranque gráfico.
3. Reinstalar o reconfigurar driver gráfico desde repositorios oficiales.
4. Comprobar configuración de GPU híbrida.
5. Regenerar configuración de video si la distribución lo recomienda.

## Solución avanzada

1. Analizar logs de kernel y GPU para errores críticos.
2. Fijar temporalmente parámetros de arranque para diagnóstico.
3. Probar versión estable de kernel anterior sin regresión.
4. Validar firmware y microcódigo según fabricante.
5. Escalar con logs completos y datos de hardware.

## Verificación

- El entorno gráfico inicia correctamente.
- La señal de video se mantiene estable.
- No reaparecen pantallas negras tras reinicios.
- El sistema funciona con resolución y frecuencia correctas.

## Cuándo escalar

- Persisten fallos con kernel anterior y driver oficial.
- Pantalla negra ocurre también fuera de Linux.
- Hay artefactos visuales o apagados de video frecuentes.
- Se sospecha falla física de GPU, RAM de video o monitor.

## Riesgos y advertencias

- No instalar drivers desde fuentes no oficiales.
- No aplicar cambios de kernel/boot sin respaldo.
- Documentar cada cambio para poder revertir.

## Fuentes

- https://ubuntu.com/support
- https://help.ubuntu.com/
- https://wiki.debian.org/
- https://docs.fedoraproject.org/

## Palabras clave

linux pantalla negra, no inicia entorno grafico, display manager, driver gpu linux, kernel regresion video, monitor sin señal