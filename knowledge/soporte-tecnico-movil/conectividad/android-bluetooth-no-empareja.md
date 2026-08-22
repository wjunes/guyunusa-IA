---
id: "stm-conectividad-android-bluetooth-no-empareja"
title: "Android - Bluetooth no empareja o no conecta"
category: "conectividad"
device_type: "agnostic"
manufacturer: "agnostic"
os: "android"
os_version: "agnostic"
component: "bluetooth"
difficulty: "basic"
severity: "low"
source_type: "official"
updated_at: "2026-08-18"
version: "1.0.0"
tags:
  - "bluetooth"
  - "emparejamiento"
  - "auriculares"
  - "android"
  - "conectividad"
---

# Android — Bluetooth no empareja o no conecta

## Sistema operativo
Android (agnóstico de versión y fabricante)

## Dispositivo / fabricante
Agnóstico. Válido para Samsung, Xiaomi, Motorola, Google Pixel, OPPO, OnePlus y otros.

## Descripción
Diagnóstico conversacional para resolver problemas de Bluetooth en Android: dispositivo que no aparece en la lista, falla al emparejar, se empareja pero no conecta, o se desconecta de forma intermitente.

## Síntomas
- El dispositivo Bluetooth no aparece al buscar.
- Intento de emparejamiento falla o se queda cargando.
- Se empareja pero no conecta (auriculares, altavoz, auto).
- Se desconecta solo de forma repetida.
- Audio entrecortado o con latencia alta.
- El dispositivo aparece en la lista pero dice "No conectado".

## Causas posibles
- Bluetooth desactivado en el teléfono o en el dispositivo externo.
- Dispositivo externo no está en modo de emparejamiento.
- Caché de Bluetooth corrupta.
- Demasiados dispositivos emparejados guardados.
- Interferencia de otras señales (Wi-Fi 2.4 GHz, microondas).
- Distancia excesiva o obstáculos entre dispositivos.
- Problema tras actualización del sistema.

## Diagnóstico (preguntas guiadas)
1. ¿Qué tipo de dispositivo intenta conectar (auriculares, altavoz, auto, teclado)?
2. ¿El dispositivo externo está en modo de emparejamiento (indicador parpadeando)?
3. ¿El dispositivo aparece en la lista de Bluetooth del teléfono?
4. ¿Alguna vez se conectaron correctamente?
5. ¿El problema empezó después de una actualización?
6. ¿Ocurre con todos los dispositivos Bluetooth o solo con uno?

## Solución básica (segura)
1. Verificar que el Bluetooth esté activado en ambos dispositivos.
2. Poner el dispositivo externo en modo de emparejamiento (consultar su manual).
3. Desactivar y reactivar el Bluetooth del teléfono.
4. Acercar los dispositivos (menos de 1 metro, sin obstáculos).
5. En el teléfono: olvidar el dispositivo y volver a emparejarlo:
   - Ajustes → Bluetooth → tocar el nombre del dispositivo → Olvidar / Desvincular.
6. Reiniciar el teléfono y el dispositivo externo.

> **Nota:** El nombre del menú varía. En Samsung: "Conexiones → Bluetooth". En Xiaomi: "Bluetooth" directo en Ajustes.

## Solución intermedia
1. Limpiar la caché del proceso Bluetooth del sistema:
   - Ajustes → Aplicaciones → ver todas → buscar "Bluetooth" o "Servicios de Bluetooth" → Almacenamiento → Limpiar caché.
2. Eliminar todos los dispositivos emparejados y comenzar desde cero.
3. Desactivar temporalmente el Wi-Fi (en banda 2.4 GHz) para reducir interferencias mientras se empareja.
4. Verificar que el dispositivo externo tenga batería suficiente (batería baja puede causar fallos de conexión).

## Solución avanzada
> ⚠️ El restablecimiento de red elimina todos los dispositivos Bluetooth emparejados y redes Wi-Fi guardadas.

1. Restablecer configuración de red:
   - Ajustes → Sistema → Opciones de restablecimiento → Restablecer Wi-Fi, datos móviles y Bluetooth.
2. Verificar si el dispositivo externo funciona correctamente con otro teléfono.
3. Verificar actualizaciones pendientes del sistema o del firmware del dispositivo externo.

## Verificación
- El dispositivo aparece en la lista y muestra "Conectado".
- El audio (si corresponde) se reproduce sin cortes.
- La conexión se mantiene estable al moverse dentro del rango.

## Cuándo escalar
Escalar a técnico si:
- el Bluetooth no detecta ningún dispositivo externo conocido como funcional;
- el módulo Bluetooth no aparece en los ajustes;
- hay antecedente de daño físico o caída del dispositivo;
- el problema persiste tras restablecimiento de red.

## Advertencias
- No instalar apps de "mejora de Bluetooth" de origen desconocido.
- Los auriculares Bluetooth con batería baja pueden parecer defectuosos: cargarlos completamente antes de diagnosticar.
- Para conexión con automóvil: algunas marcas requieren configuración específica en el sistema de audio del vehículo.

## Fuentes
- https://support.google.com/android/answer/9075217
- https://support.google.com/pixelphone/answer/2819521

## Palabras clave
Android Bluetooth no conecta, Bluetooth no empareja Android, auriculares Bluetooth no conectan Android, altavoz Bluetooth Android problema, emparejar Bluetooth Android falla, Bluetooth desconecta solo Android, caché Bluetooth Android, olvidar dispositivo Bluetooth Android, Bluetooth intermitente Android, auto Bluetooth Android no conecta
