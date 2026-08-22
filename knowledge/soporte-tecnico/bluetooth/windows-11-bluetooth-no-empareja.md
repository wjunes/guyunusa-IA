---
id: "st-bluetooth-w11-no-empareja"
title: "Windows 11 - Bluetooth no empareja"
category: "bluetooth"
os: "windows-11"
component: "bluetooth-adapter"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-14"
version: "1.1.0"
tags:
  - "bluetooth"
  - "emparejamiento"
  - "dispositivo"
---

# Windows 11 - Bluetooth no empareja

## Metadatos

### id

st-bluetooth-w11-no-empareja

### category

bluetooth

### os

windows-11

### component

bluetooth-adapter

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

bluetooth, emparejamiento, dispositivo

## Descripción

Guía de diagnóstico conversacional para cuando Bluetooth no empareja dispositivos en Windows 11 o se desconecta de forma recurrente.

## Síntomas

- El dispositivo Bluetooth no aparece al buscar.
- El emparejamiento falla o queda en “conectando”.
- Se conecta y se desconecta al poco tiempo.
- Windows indica que Bluetooth está desactivado o no disponible.
- El periférico aparece como vinculado pero no funciona.

## Causas posibles

- Bluetooth desactivado en Windows o en el equipo.
- Adaptador Bluetooth con driver inestable.
- Dispositivo en modo no detectable.
- Conflicto con emparejamientos previos.
- Ahorro de energía suspendiendo el adaptador.

## Diagnóstico

### Preguntas guiadas

1. ¿El problema ocurre con un solo dispositivo o con varios?
2. ¿El Bluetooth aparece activo en Configuración?
3. ¿El dispositivo externo está en modo emparejamiento?
4. ¿Comenzó después de una actualización?
5. ¿El adaptador muestra error en Administrador de dispositivos?

## Solución básica

1. Activar y desactivar Bluetooth en Windows.
2. Reiniciar el equipo y el dispositivo externo.
3. Quitar el dispositivo vinculado y volver a emparejar.
4. Confirmar que el dispositivo esté en modo visible/emparejamiento.
5. Acercar el dispositivo para reducir interferencia.

## Solución intermedia

1. Abrir Administrador de dispositivos y revisar el adaptador Bluetooth.
2. Deshabilitar y habilitar el adaptador.
3. Ejecutar solucionador de Bluetooth de Windows.
4. Eliminar dispositivos antiguos no usados.
5. Verificar que el servicio de soporte Bluetooth esté en ejecución.

## Solución avanzada

1. Reinstalar driver Bluetooth desde fabricante oficial.
2. Revisar configuración de energía del adaptador y evitar suspensión automática.
3. Validar coexistencia con Wi-Fi en 2.4 GHz si hay interferencias.
4. Probar con otro periférico para aislar si la falla es del adaptador o del dispositivo.
5. Evaluar falla física si múltiples dispositivos no emparejan nunca.

## Verificación

- El dispositivo se detecta y empareja correctamente.
- La conexión se mantiene estable en uso normal.
- No reaparecen errores tras reinicio.
- Funciona en aplicaciones reales (audio, teclado, mouse, etc.).

## Cuándo escalar

- Ningún dispositivo Bluetooth empareja en ese equipo.
- El adaptador desaparece o da error persistente tras reinstalar driver.
- La conexión se corta repetidamente pese a ajustes y pruebas.
- Hay indicios de daño físico del adaptador.

## Riesgos y advertencias

- No instalar drivers desde sitios no oficiales.
- No modificar BIOS/UEFI sin necesidad y sin respaldo.
- Si hay daño físico o líquido, detener pruebas y derivar a técnico.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 11 bluetooth no empareja, bluetooth desconecta, adaptador bluetooth, controlador bluetooth, quitar y volver a vincular
