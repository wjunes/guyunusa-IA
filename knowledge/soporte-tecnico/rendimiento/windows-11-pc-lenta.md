---
id: "st-rendimiento-w11-pc-lenta"
title: "Windows 11 - PC lenta"
category: "rendimiento"
os: "windows-11"
component: "system-performance"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-14"
version: "1.1.0"
tags:
  - "rendimiento"
  - "pc-lenta"
  - "cpu-ram-disco"
---

# Windows 11 - PC lenta

## Metadatos

### id

st-rendimiento-w11-pc-lenta

### category

rendimiento

### os

windows-11

### component

system-performance

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

rendimiento, pc-lenta, cpu-ram-disco

## Descripción

Guía de diagnóstico conversacional para casos en que Windows 11 responde con lentitud, se congela o tarda demasiado en abrir aplicaciones.

## Síntomas

- Inicio del sistema muy lento.
- Programas tardan en abrir o se congelan.
- Uso alto de CPU, RAM o disco en Administrador de tareas.
- Demoras al cambiar entre ventanas.
- Ventiladores en alta velocidad con tareas simples.

## Causas posibles

- Exceso de programas de inicio.
- Falta de memoria RAM disponible.
- Procesos en segundo plano consumiendo recursos.
- Disco con poco espacio o alta actividad.
- Actualizaciones pendientes o controladores inestables.
- Sobrecalentamiento o limitación térmica.

## Diagnóstico

### Preguntas guiadas

1. ¿La lentitud ocurre siempre o solo en momentos puntuales?
2. ¿Comenzó después de instalar/actualizar algo?
3. ¿Qué recurso llega a valores altos (CPU, RAM, disco)?
4. ¿El disco del sistema está casi lleno?
5. ¿El equipo se calienta más de lo normal?

## Solución básica

1. Reiniciar el equipo.
2. Cerrar apps no necesarias y pestañas pesadas del navegador.
3. Verificar espacio libre en disco (ideal: al menos 15–20%).
4. Desactivar programas de inicio no esenciales.
5. Aplicar actualizaciones de Windows pendientes.

## Solución intermedia

1. Revisar procesos con alto consumo en Administrador de tareas.
2. Ejecutar comprobación de archivos del sistema:
   - `sfc /scannow`
3. Revisar estado del disco:
   - `chkdsk /scan`
4. Comprobar malware con Seguridad de Windows.
5. Actualizar drivers clave desde fabricante oficial.

## Solución avanzada

1. Analizar eventos de sistema para detectar errores repetitivos.
2. Revisar temperatura y comportamiento térmico del equipo.
3. Evaluar ampliación de RAM si el uso es constantemente alto.
4. En HDD mecánico, considerar migración a SSD.
5. Realizar arranque limpio para aislar servicios de terceros.

## Verificación

- Menor tiempo de arranque.
- Apertura fluida de aplicaciones comunes.
- Uso de CPU/RAM/disco en rangos normales en reposo.
- Reducción de congelamientos y microcortes.

## Cuándo escalar

- La lentitud persiste tras limpieza y ajustes.
- Hay sobrecalentamiento severo o apagados.
- Se detectan errores de disco recurrentes.
- Existen signos de falla física de hardware.

## Riesgos y advertencias

- No deshabilitar servicios críticos del sistema sin validación.
- No usar optimizadores de terceros no confiables.
- Antes de cambios avanzados, crear respaldo o punto de restauración.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/
- https://www.intel.com/
- https://www.amd.com/

## Palabras clave

windows 11 pc lenta, cpu 100, disco 100, ram alta, inicio lento, sfc scannow, chkdsk scan, optimizar rendimiento
