# Windows 11

id: "st-impresoras-w11-offline"
title: "Windows 11 - Impresora offline"
category: "impresoras"
os: "windows-11"
component: "printer-spooler-driver"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-14"
version: "1.1.0"
tags:

- impresoras
- "offline"
- "cola-impresion"

## Windows 11 - Impresora offline

## Metadatos

### id

st-impresoras-w11-offline

### category

impresoras

### os

windows-11

### component

printer-spooler-driver

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

impresoras, offline, cola-impresion

## Descripción

Guía de diagnóstico conversacional para cuando una impresora aparece como offline en Windows 11 o no imprime aunque esté instalada.

## Síntomas

- La impresora figura como “Sin conexión” u “Offline”.
- Los trabajos quedan en cola y no avanzan.
- Windows detecta la impresora, pero no imprime.
- Error al enviar documentos desde una o varias aplicaciones.
- La impresora imprime desde otro equipo, pero no desde este.

## Causas posibles

- Servicio de cola de impresión detenido o bloqueado.
- Puerto o método de conexión incorrecto.
- Driver de impresora dañado o incompatible.
- Impresora no predeterminada o en modo “usar impresora sin conexión”.
- Problemas de red local (en impresoras Wi-Fi/Ethernet).

## Diagnóstico

### Preguntas guiadas

1. ¿La impresora es USB, Wi-Fi o de red cableada?
2. ¿El problema ocurre con todos los documentos o solo con algunos?
3. ¿Imprime desde otro dispositivo?
4. ¿La impresora aparece offline permanentemente o por momentos?
5. ¿Comenzó después de una actualización o cambio de red?

## Solución básica

1. Verificar que la impresora esté encendida y sin errores físicos.
2. Confirmar cables/conexión de red y reiniciar impresora.
3. En Windows, abrir cola de impresión y desactivar “Usar impresora sin conexión”.
4. Establecer impresora correcta como predeterminada.
5. Eliminar trabajos pendientes y reenviar una página de prueba.

## Solución intermedia

1. Reiniciar servicio de cola de impresión (Print Spooler).
2. Quitar y volver a agregar la impresora en Windows.
3. Verificar puerto asignado en propiedades de impresora.
4. Ejecutar solucionador de impresoras de Windows.
5. Revisar conectividad IP si es impresora de red.

## Solución avanzada

1. Reinstalar driver desde fabricante oficial del equipo/impresora.
2. Limpiar completamente cola de impresión y reiniciar servicio.
3. Asignar IP fija o reserva DHCP para impresoras de red.
4. Validar compatibilidad del driver con versión de Windows 11.
5. Probar impresión por otro protocolo soportado por el fabricante.

## Verificación

- La impresora aparece en estado “Lista” u “Online”.
- La página de prueba imprime correctamente.
- La cola se vacía sin errores.
- La impresión funciona desde aplicaciones habituales.

## Cuándo escalar

- Persisten errores tras reinstalar driver y limpiar cola.
- La impresora no responde en red pese a conectividad confirmada.
- Aparecen fallos físicos del equipo de impresión.
- Hay múltiples equipos afectados en la misma red.

## Riesgos y advertencias

- No instalar drivers desde sitios no oficiales.
- No modificar firmware de impresora sin guía oficial.
- Evitar borrar configuraciones de red sin respaldo.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/
- https://support.hp.com/
- https://www.dell.com/support/
- https://www.lenovo.com/support/

## Palabras clave

windows 11 impresora offline, cola de impresion, print spooler, impresora sin conexion, driver impresora, impresora predeterminada
