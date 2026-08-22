---
id: "stm-conectividad-android-wifi-no-conecta"
title: "Android - Wi-Fi no conecta o sin Internet"
category: "conectividad"
device_type: "agnostic"
manufacturer: "agnostic"
os: "android"
os_version: "agnostic"
component: "wifi"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-18"
version: "1.0.0"
tags:
  - "wifi"
  - "sin-internet"
  - "conectividad"
  - "android"
---

# Android — Wi-Fi no conecta o sin Internet

## Sistema operativo
Android (agnóstico de versión y fabricante)

## Dispositivo / fabricante
Agnóstico. Válido para Samsung, Xiaomi, Motorola, Google Pixel, OPPO, OnePlus y otros.

## Descripción
Guía de diagnóstico conversacional para resolver fallas de Wi-Fi en Android: desde no ver redes disponibles hasta estar "conectado" pero sin acceso real a Internet.

## Síntomas
- No aparecen redes Wi-Fi en la lista.
- Se conecta pero muestra "Sin Internet" o "Red restringida".
- Se desconecta de forma intermitente.
- Velocidad muy baja o conexión inestable.
- Error al introducir contraseña correcta.
- Ícono de Wi-Fi con signo de exclamación.

## Causas posibles
- Modo avión activado o Wi-Fi deshabilitado.
- Perfil de red guardada corrupto.
- Configuración IP o DNS incorrecta.
- Fallo o reinicio pendiente del router.
- Problema de la red (no del dispositivo).
- Problema tras actualización del sistema.
- Dirección MAC aleatoria causando conflicto DHCP.

## Diagnóstico (preguntas guiadas)
1. ¿El problema afecta solo a este dispositivo o también a otros?
2. ¿La red aparece en la lista de Wi-Fi disponibles?
3. ¿Muestra "Conectado, sin Internet" o no conecta en absoluto?
4. ¿Ocurre con todas las redes Wi-Fi o solo con una?
5. ¿Empezó tras una actualización o cambio reciente?
6. ¿Con datos móviles funciona Internet?

## Solución básica (segura)
1. Activar y desactivar el modo avión; esperar 10 segundos y desactivarlo.
2. Desactivar Wi-Fi, esperar 5 segundos y volver a activarlo.
3. Reiniciar el dispositivo y el router (desenchufar 30 segundos).
4. "Olvidar" la red y volver a conectarse:
   - Ajustes → Wi-Fi → mantener pulsada la red → Olvidar.
5. Verificar que la contraseña sea correcta.

> **Nota:** El nombre del menú puede variar según el fabricante. En Samsung puede llamarse "Conexiones"; en Xiaomi, "WLAN".

## Solución intermedia
1. Verificar la configuración IP de la red:
   - Ajustes → Wi-Fi → tocar el ícono de información (ℹ) de la red → comprobar que IP sea automática (DHCP).
2. Cambiar DNS manualmente a uno confiable:
   - En la configuración de la red, cambiar a IP estática o usar DNS privado:
   - Ajustes → Red e Internet → DNS privado → dns.google (o 1.1.1.1).
3. Revisar si la dirección MAC es aleatoria y puede causar conflicto:
   - Ajustes → Wi-Fi → información de la red → Privacidad → usar MAC del dispositivo.
4. Verificar fecha y hora correctas del sistema (una hora incorrecta puede bloquear conexiones cifradas).

## Solución avanzada
> ⚠️ El restablecimiento de red elimina todas las redes Wi-Fi guardadas, configuraciones Bluetooth y APN de datos móviles.

1. Restablecer configuración de red:
   - Ajustes → Sistema → Opciones de restablecimiento → Restablecer Wi-Fi, datos móviles y Bluetooth.
2. Verificar si hay actualizaciones pendientes del sistema que puedan corregir el problema.
3. Si el problema persiste en todas las redes, puede indicar fallo del adaptador Wi-Fi (hardware).

## Verificación
- El dispositivo obtiene IP válida del router (no 169.x.x.x).
- La navegación web funciona con fluidez.
- No aparece el ícono de exclamación en Wi-Fi.
- La conexión se mantiene estable tras reiniciar.

## Cuándo escalar
Escalar a técnico si:
- no detecta ninguna red Wi-Fi aun reiniciando;
- el problema persiste en múltiples redes distintas;
- el adaptador Wi-Fi no aparece en la configuración;
- hay antecedente de caída o daño físico del dispositivo.

## Advertencias
- No instalar aplicaciones de "reparación de Wi-Fi" de origen desconocido.
- No restablecer de fábrica sin antes intentar las soluciones anteriores.
- Si el restablecimiento de red elimina datos importantes de APN, consultar con el operador los valores correctos.

## Fuentes
- https://support.google.com/android/answer/9075549
- https://support.google.com/pixelphone/answer/2819519

## Palabras clave
Android Wi-Fi no conecta, sin Internet Android, red restringida Android, Wi-Fi conectado pero no funciona, no aparecen redes Wi-Fi, señal Wi-Fi exclamación Android, olvidar red Android, DNS Android, IP estática Android, restablecer red Android, DHCP Android, Wi-Fi intermitente Android, modo avión Android
