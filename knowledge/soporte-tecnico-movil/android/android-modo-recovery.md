---
id: "stm-sistema-android-modo-recovery"
title: "Android - Modo Recovery: caché y restablecimiento"
category: "sistema"
device_type: "smartphone"
manufacturer: "agnostic"
os: "android"
os_version: "agnostic"
component: "almacenamiento"
difficulty: "advanced"
severity: "high"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "recovery"
  - "android"
  - "restablecimiento"
  - "cache"
  - "sistema"
---

# Android — Modo Recovery: caché y restablecimiento

## Sistema operativo
Android. Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Android. El aspecto de la interfaz Recovery varía por fabricante, pero las opciones principales son equivalentes.

## Descripción
El modo Recovery es un entorno de mantenimiento del sistema, independiente de Android, que permite limpiar la caché del sistema y realizar restablecimiento de fábrica cuando el sistema operativo no responde o no puede hacerlo por sí mismo.

## Para qué sirve
- Limpiar la partición de caché del sistema (soluciona problemas tras actualizaciones).
- Realizar restablecimiento de fábrica cuando el sistema no arranca o no responde.
- Verificar el arranque del hardware de forma independiente al sistema operativo.

## Cómo entrar en modo Recovery

> ⚠️ La combinación de botones varía según el fabricante. Si el dispositivo arranca normalmente, probar el método estándar.

**Método estándar:**
1. Apagar el dispositivo completamente.
2. Mantener pulsado simultáneamente: **Encendido + Subir volumen** (en la mayoría de dispositivos).
3. Soltar cuando aparezca el logo del fabricante o el menú de Recovery.

**Variaciones:**
- **Samsung:** Encendido + Subir volumen + Botón Bixby (modelos con Bixby físico) / Encendido + Subir volumen (modelos recientes).
- **Xiaomi:** Encendido + Subir volumen. En algunos modelos: Encendido + Bajar volumen para acceder al Fastboot primero.
- **Motorola / Pixel:** Encendido + Bajar volumen (accede a Fastboot) → seleccionar Recovery con los botones de volumen.
- **Dispositivo con pantalla no responsiva:** la combinación de botones es la única vía de acceso.

**Navegación en Recovery:**
- Botones de volumen: moverse entre opciones.
- Botón de encendido: seleccionar.

## Operaciones disponibles en Recovery

### Limpiar partición de caché (Wipe cache partition)
> ✅ Operación segura: no elimina datos personales.

- Útil cuando el sistema es lento o inestable tras una actualización de Android.
- Elimina archivos temporales del sistema, no fotos ni apps.
- Procedimiento: Recovery → Wipe cache partition → confirmar → reiniciar.

### Restablecimiento de fábrica (Factory reset / Wipe data)
> ⚠️ Elimina TODOS los datos del dispositivo: fotos, apps, configuraciones, cuentas locales.
> Realizar copia de seguridad antes si el dispositivo permite acceder a ella.
> Tras el restablecimiento se activará FRP si hay una cuenta de Google vinculada: tener las credenciales disponibles.

- Procedimiento: Recovery → Factory reset / Wipe data/factory reset → confirmar → reiniciar.

## Verificación
- Tras limpiar caché: el sistema arranca con normalidad y el rendimiento mejora.
- Tras restablecimiento: el dispositivo inicia el asistente de configuración como nuevo.

## Cuándo usar Recovery vs Ajustes
| Situación | Vía recomendada |
|---|---|
| Sistema funciona, solo lentitud post-actualización | Recovery → Wipe cache partition |
| Sistema funciona, quiero restablecer | Ajustes → Sistema → Restablecer |
| Sistema no arranca o no responde | Recovery → opciones según necesidad |

## Advertencias
- No seleccionar opciones de Recovery desconocidas (especialmente en dispositivos con Recovery personalizado).
- El modo Fastboot/Bootloader es diferente al Recovery: no permite las mismas operaciones.
- En dispositivos con cifrado activo (la mayoría), el wipe de datos es irreversible.

## Fuentes
- https://support.google.com/android/answer/7680439
- https://support.google.com/pixel/answer/4596627

## Palabras clave
Android modo recovery, recovery Android acceder, wipe cache partition Android, restablecimiento fábrica Android recovery, Samsung recovery mode, Xiaomi recovery mode, Motorola recovery mode, Pixel recovery mode, Android no arranca recovery, limpiar caché sistema Android, factory reset Android sin sistema
