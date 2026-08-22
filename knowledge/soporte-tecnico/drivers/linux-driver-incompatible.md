# Linux - Driver incompatible

## Metadatos

### id

st-drivers-linux-incompatible

### category

drivers

### os

linux

### component

kernel-module-device-driver

### difficulty

intermediate

### severity

medium

### source_type

official

### updated_at

2026-08-14

### version

1.1.0

### tags

drivers, linux, incompatible, kernel, modulo

## Descripción

Guía de diagnóstico conversacional para resolver incompatibilidades de drivers en Linux que causan fallos de dispositivo, inestabilidad o pérdida de funcionalidades.

## Síntomas

- Dispositivo no reconocido tras actualización.
- Mensajes de error al cargar módulos.
- Funcionalidad parcial de red, audio, video o periféricos.
- Fallos al iniciar entorno gráfico.
- Inestabilidad después de cambio de kernel.

## Causas posibles

- Módulo no compatible con versión de kernel actual.
- Driver de terceros sin soporte para la distribución.
- Firmware faltante o desactualizado.
- Conflicto entre controlador libre y propietario.
- Paquetes de driver incompletos o dañados.

## Diagnóstico

### Preguntas guiadas

1. ¿Qué distribución y versión estás usando?
2. ¿Qué dispositivo específico falla?
3. ¿Comenzó tras actualizar kernel o instalar un driver?
4. ¿El problema ocurre siempre o en casos puntuales?
5. ¿El dispositivo funciona con kernel anterior?

## Solución básica

1. Reiniciar equipo y verificar si el fallo persiste.
2. Confirmar actualizaciones pendientes del sistema.
3. Probar dispositivo en otro puerto o sesión.
4. Comprobar si el problema afecta a una sola función.
5. Probar arranque con kernel anterior.

## Solución intermedia

1. Validar que el módulo del driver cargue correctamente.
2. Reinstalar paquete del driver desde repositorios oficiales.
3. Instalar firmware recomendado por la distribución.
4. Evitar mezclar controladores de orígenes no oficiales.
5. Reprobar funcionamiento tras reinicio.

## Solución avanzada

1. Revisar logs del kernel para errores de módulo/firmware.
2. Fijar temporalmente kernel estable si hay regresión.
3. Cambiar entre driver libre y propietario solo con justificación técnica.
4. Verificar compatibilidad exacta de hardware y versión de kernel.
5. Escalar con logs y datos completos del dispositivo.

## Verificación

- El dispositivo es reconocido correctamente.
- No hay errores de módulo en arranque.
- La función afectada opera de forma estable.
- El problema no reaparece tras reinicios.

## Cuándo escalar

- El driver sigue fallando en kernel estable y repositorio oficial.
- El dispositivo desaparece del sistema repetidamente.
- Hay errores críticos persistentes de firmware o módulo.
- Se sospecha daño físico del hardware.

## Riesgos y advertencias

- No instalar drivers desde fuentes no verificadas.
- No compilar/controlar módulos sin respaldo previo.
- Documentar cambios para poder revertir.

## Fuentes

- https://ubuntu.com/support
- https://help.ubuntu.com/
- https://wiki.debian.org/
- https://docs.fedoraproject.org/

## Palabras clave

linux driver incompatible, modulo kernel, firmware faltante, controlador propietario, controlador libre, regresion kernel