---
id: "stm-sistema-android-opciones-desarrollador"
title: "Android - Opciones de desarrollador: activación y uso básico"
category: "sistema"
device_type: "smartphone"
manufacturer: "agnostic"
os: "android"
os_version: "agnostic"
component: "aplicaciones"
difficulty: "intermediate"
severity: "low"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "opciones-desarrollador"
  - "android"
  - "depuracion-usb"
  - "sistema"
  - "diagnostico"
---

# Android — Opciones de desarrollador: activación y uso básico

## Sistema operativo
Android. Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Android. La ruta exacta varía por fabricante.

## Descripción
Las opciones de desarrollador son un conjunto de ajustes avanzados del sistema, ocultos por defecto, que permiten depuración USB, diagnóstico de rendimiento y configuración avanzada. Su uso en soporte técnico es puntual y específico.

## Para qué sirve en soporte técnico
- Habilitar la depuración USB (ADB) para diagnóstico por ordenador.
- Activar la visualización de consumo de CPU/GPU en pantalla.
- Reducir las animaciones del sistema para mejorar el rendimiento percibido.
- Forzar la finalización de actividades en segundo plano para liberar RAM.
- Diagnóstico de conectividad Bluetooth (registro de eventos).

## Cómo activar las opciones de desarrollador

**Método estándar:**
1. Ajustes → Acerca del teléfono (o "Información del teléfono").
2. Buscar "Número de compilación" (o "Build number").
3. Pulsar 7 veces seguidas sobre "Número de compilación".
4. Introducir el PIN si se solicita.
5. Aparecerá el mensaje: "¡Ya eres desarrollador!".

**Variaciones por fabricante:**
- **Samsung:** Ajustes → Acerca del teléfono → Información de software → Número de compilación.
- **Xiaomi (MIUI/HyperOS):** Ajustes → Mi cuenta (a veces) → Ajustes → Acerca del teléfono → Versión de MIUI / HyperOS → pulsar 7 veces.
- **Motorola:** Ajustes → Acerca del teléfono → Número de compilación.
- **Google Pixel:** Ajustes → Acerca del teléfono → Número de compilación.

**Dónde encontrar las opciones activadas:**
- Ajustes → Sistema → Opciones de desarrollador.
- Samsung: Ajustes → Opciones de desarrollador (al final del menú de Ajustes).

## Opciones útiles en soporte técnico

| Opción | Para qué sirve |
|---|---|
| Depuración USB | Conectar el dispositivo al ordenador para diagnóstico con ADB |
| Escala de animación de ventanas/transiciones | Reducir a 0.5x o deshabilitar para mejorar fluidez |
| No mantener actividades | Liberar RAM forzando el cierre de apps al salir |
| Límite de procesos en segundo plano | Controlar cuántas apps pueden estar activas en segundo plano |
| Mostrar toques en pantalla | Útil para grabaciones de pantalla o diagnóstico táctil |
| Registro Bluetooth HCI | Capturar eventos Bluetooth para diagnóstico avanzado |

## Cómo desactivar las opciones de desarrollador
- Ajustes → Sistema → Opciones de desarrollador → desactivar el interruptor principal.
- O: Ajustes → Acerca del teléfono → restablece la opción al reiniciar en algunos modelos.

## Verificación
- "Opciones de desarrollador" aparece en el menú de Ajustes.
- La depuración USB activa muestra una notificación al conectar el cable al ordenador.

## Advertencias
- Desactivar las opciones de desarrollador cuando no se usen activamente: exponen el dispositivo a conexiones no autorizadas vía ADB si se conecta a un ordenador no de confianza.
- "No mantener actividades" puede causar comportamiento errático en apps que dependen de actividades persistentes.
- No modificar opciones desconocidas en el menú de desarrollador: pueden afectar negativamente el rendimiento o la estabilidad.

## Fuentes
- https://developer.android.com/studio/debug/dev-options
- https://support.google.com/android/answer/7664692

## Palabras clave
Android opciones desarrollador activar, número de compilación Android 7 veces, depuración USB Android activar, ADB Android habilitar, Samsung opciones desarrollador, Xiaomi MIUI opciones desarrollador, animaciones Android reducir fluidez, opciones desarrollador desactivar Android, Pixel opciones desarrollador, Motorola desarrollador activar
