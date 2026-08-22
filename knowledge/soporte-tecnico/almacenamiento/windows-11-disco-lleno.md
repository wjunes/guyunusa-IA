---
id: "st-almacenamiento-w11-disco-lleno"
title: "Windows 11 - Disco lleno"
category: "almacenamiento"
os: "windows-11"
component: "storage-disk"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-14"
version: "1.1.0"
tags:
  - "almacenamiento"
  - "disco-lleno"
  - "espacio"
---

# Windows 11 - Disco lleno

## Metadatos

### id

st-almacenamiento-w11-disco-lleno

### category

almacenamiento

### os

windows-11

### component

storage-disk

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

almacenamiento, disco-lleno, espacio

## Descripción

Guía de diagnóstico conversacional para cuando el disco del sistema en Windows 11 está lleno o con poco espacio, afectando rendimiento y actualizaciones.

## Síntomas

- Mensajes de “espacio insuficiente”.
- Windows Update falla por falta de espacio.
- Sistema lento al abrir archivos o aplicaciones.
- No se pueden descargar/instalar programas.
- Advertencias sobre almacenamiento casi completo.

## Causas posibles

- Archivos temporales acumulados.
- Descargas y archivos multimedia grandes.
- Papelera sin vaciar.
- Aplicaciones que ocupan mucho espacio.
- Puntos de restauración o cachés extensas.
- Sincronización local excesiva (nube).

## Diagnóstico

### Preguntas guiadas

1. ¿Qué unidad está llena (C:, D:, externa)?
2. ¿Desde cuándo aparece la alerta?
3. ¿Hubo instalación reciente de apps/juegos pesados?
4. ¿El problema afecta actualizaciones o uso general?
5. ¿Tenés archivos personales grandes en escritorio/descargas?

## Solución básica

1. Vaciar Papelera de reciclaje.
2. Ejecutar limpieza de archivos temporales desde Configuración.
3. Revisar carpeta Descargas y eliminar/mover archivos innecesarios.
4. Desinstalar aplicaciones que no se usan.
5. Reiniciar equipo y verificar espacio recuperado.

## Solución intermedia

1. Usar “Archivos temporales” y “Sensor de almacenamiento” de Windows.
2. Mover archivos personales a otra unidad o nube.
3. Limpiar cachés de apps pesadas (navegadores, editores, launchers).
4. Revisar tamaño de carpetas de usuario para detectar consumo anómalo.
5. Confirmar que Windows Update tenga espacio suficiente para operar.

## Solución avanzada

1. Revisar uso detallado por tipo de archivo y ruta.
2. Evaluar redimensionar partición solo con respaldo previo.
3. Comprobar salud del disco y errores de sistema de archivos.
4. En equipos con HDD antiguo, evaluar migración a SSD de mayor capacidad.
5. Definir política de limpieza periódica automatizada.

## Verificación

- La unidad del sistema recupera espacio libre operativo.
- Desaparecen alertas de almacenamiento insuficiente.
- Windows Update vuelve a instalar correctamente.
- Mejora la respuesta general del sistema.

## Cuándo escalar

- El espacio vuelve a llenarse rápidamente sin causa clara.
- Hay errores repetidos de lectura/escritura.
- Se detectan sectores defectuosos o fallos físicos.
- Existen riesgos de pérdida de datos.

## Riesgos y advertencias

- No borrar carpetas del sistema manualmente sin validación.
- No modificar particiones sin backup.
- Confirmar rutas antes de eliminar archivos grandes.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 11 disco lleno, poco espacio, archivos temporales, limpieza de disco, almacenamiento insuficiente, sensor de almacenamiento, windows update sin espacio
