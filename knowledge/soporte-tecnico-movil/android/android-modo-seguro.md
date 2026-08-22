---
id: "stm-sistema-android-modo-seguro"
title: "Android - Modo seguro: uso y diagnóstico"
category: "sistema"
device_type: "smartphone"
manufacturer: "agnostic"
os: "android"
os_version: "agnostic"
component: "aplicaciones"
difficulty: "intermediate"
severity: "medium"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "modo-seguro"
  - "android"
  - "diagnostico"
  - "sistema"
  - "apps-terceros"
---

# Android — Modo seguro: uso y diagnóstico

## Sistema operativo
Android. Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Android. El método de acceso varía según el fabricante.

## Descripción
El modo seguro inicia Android cargando únicamente las apps del sistema, sin apps de terceros. Es la herramienta principal para determinar si un problema es causado por una app instalada por el usuario o por el sistema operativo en sí.

## Para qué sirve
- Diagnosticar si una app de terceros causa: lentitud, cierres inesperados, consumo excesivo de batería, problemas de audio o pantalla, o comportamiento inusual del dispositivo.
- Desinstalar apps que no se pueden eliminar en modo normal (apps que bloquean el sistema).
- Verificar si el hardware funciona correctamente aislando el software de terceros.

## Cómo entrar en modo seguro

**Método estándar (mayoría de dispositivos Android):**
1. Mantener pulsado el botón de encendido hasta que aparezca el menú.
2. Mantener pulsado "Apagar" o "Reiniciar" hasta que aparezca la opción "Modo seguro".
3. Confirmar. El dispositivo reiniciará y mostrará "Modo seguro" en la esquina inferior de la pantalla.

**Variaciones por fabricante:**
- **Samsung:** Mantener pulsado el botón lateral → mantener pulsado "Apagar" → "Modo seguro".
- **Xiaomi:** Mantener pulsado encendido → deslizar el ícono de apagado hacia abajo → Modo seguro.
- **Motorola / Pixel:** Mantener pulsado encendido → mantener pulsado "Apagar" → Modo seguro.
- **Si el dispositivo no responde al menú:** apagarlo completamente → encender manteniendo pulsado el botón de bajar volumen hasta que arranque.

## Cómo salir del modo seguro
- Reiniciar el dispositivo normalmente (encendido → Reiniciar).
- El dispositivo vuelve al modo normal con todas las apps activas.

## Diagnóstico en modo seguro

| Resultado en modo seguro | Conclusión |
|---|---|
| El problema desaparece | Una app de terceros es la causa |
| El problema persiste | El problema es del sistema operativo o del hardware |

**Si el problema desaparece en modo seguro:**
1. Identificar la app causante: desinstalar la última app instalada antes de que comenzara el problema.
2. Si no se identifica: desinstalar apps de terceros de una en una, reiniciando y verificando tras cada eliminación.
3. Como último recurso: restablecimiento de fábrica.

**Si el problema persiste en modo seguro:**
- El origen es el sistema operativo o el hardware.
- Proceder con restablecimiento de fábrica (software) o escalar a técnico (hardware).

## Advertencias
- En modo seguro no funcionan las apps de terceros: no es una solución permanente, solo un entorno de diagnóstico.
- Las apps de terceros siguen instaladas en el dispositivo; el modo seguro solo las inhibe temporalmente.
- No usar el dispositivo en modo seguro para actividades cotidianas: las notificaciones y apps importantes no funcionarán.

## Fuentes
- https://support.google.com/android/answer/7668188
- https://www.samsung.com/es/support/mobile-devices/

## Palabras clave
Android modo seguro activar, safe mode Android, diagnóstico apps Android modo seguro, Android app causa problema, Samsung modo seguro, Xiaomi modo seguro, Motorola modo seguro, salir modo seguro Android, Android lento apps terceros, desinstalar app Android modo seguro
