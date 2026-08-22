---
id: "st-perifericos-w11-teclado-no-responde"
title: "Windows 11 - Teclado no responde"
category: "perifericos"
os: "windows-11"
component: "keyboard-usb-bluetooth"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-14"
version: "1.1.0"
tags:
  - "perifericos"
  - "teclado"
  - "entrada"
---

# Windows 11 - Teclado no responde

## Metadatos

### id

st-perifericos-w11-teclado-no-responde

### category

perifericos

### os

windows-11

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

perifericos, teclado, entrada

## Descripción

Guía de diagnóstico conversacional para cuando el teclado no responde en Windows 11, total o parcialmente.

## Síntomas

- El teclado no escribe en ninguna aplicación.
- Algunas teclas no funcionan o responden con retraso.
- Funciona en BIOS, pero no dentro de Windows.
- Teclado Bluetooth se desconecta o no empareja.
- Teclado USB enciende, pero no registra entrada.

## Causas posibles

- Conexión física inestable o puerto USB con falla.
- Batería baja en teclado inalámbrico.
- Driver de teclado/HID con error.
- Configuración de accesibilidad activada por accidente.
- Conflicto tras actualización de Windows.

## Diagnóstico

### Preguntas guiadas

1. ¿Es teclado USB, Bluetooth o integrado de notebook?
2. ¿Falla en todas las apps o solo en una?
3. ¿Comenzó después de actualizar o instalar software?
4. ¿El teclado funciona en pantalla de inicio de sesión?
5. ¿Probaste otro puerto USB u otro teclado?

## Solución básica

1. Desconectar y reconectar el teclado.
2. Probar otro puerto USB directo al equipo.
3. Si es inalámbrico, cambiar baterías y volver a emparejar.
4. Reiniciar el equipo.
5. Verificar que no estén activadas teclas especiales de accesibilidad.

## Solución intermedia

1. Abrir Administrador de dispositivos y revisar “Teclados” y “Dispositivos de interfaz humana”.
2. Desinstalar dispositivo de teclado y reiniciar para reinstalación automática.
3. Ejecutar solucionador de teclado en Windows.
4. Confirmar distribución de teclado correcta (idioma/región).
5. Probar con usuario nuevo de Windows para descartar perfil dañado.

## Solución avanzada

1. Actualizar o reinstalar controladores de chipset/USB desde fabricante oficial.
2. Revisar eventos del sistema relacionados a HID/USB.
3. Realizar arranque limpio para descartar conflicto de software.
4. En notebook, validar en entorno de recuperación si el teclado interno responde.
5. Si persiste, evaluar posible falla física del periférico o controlador de placa.

## Verificación

- El teclado responde en escritorio y aplicaciones.
- No hay errores del dispositivo en Administrador de dispositivos.
- No se producen desconexiones intermitentes.
- Se mantiene funcionamiento tras reinicio.

## Cuándo escalar

- No responde ningún teclado probado en el equipo.
- El teclado funciona en otros equipos pero no en este.
- Persisten errores HID/USB tras reinstalar controladores.
- Hay daño físico, líquido derramado o fallas eléctricas.

## Riesgos y advertencias

- No instalar drivers desde sitios no oficiales.
- No deshabilitar dispositivos críticos HID sin respaldo.
- En caso de líquido o olor a quemado, apagar y derivar a servicio técnico.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 11 teclado no responde, teclado usb, teclado bluetooth, hid, administrador de dispositivos, entrada bloqueada
