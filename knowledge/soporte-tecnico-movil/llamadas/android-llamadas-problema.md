---
id: "stm-llamadas-android-llamadas-problema"
title: "Android - Problemas con llamadas"
category: "llamadas"
device_type: "smartphone"
manufacturer: "agnostic"
os: "android"
os_version: "agnostic"
component: "sim"
difficulty: "basic"
severity: "high"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "llamadas"
  - "android"
  - "sin-señal"
  - "voz"
  - "sim"
---

# Android — Problemas con llamadas

## Sistema operativo
Android. Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Android (Samsung, Xiaomi, Motorola, Google Pixel, OPPO, OnePlus).

## Descripción
Diagnóstico conversacional para problemas con llamadas de voz: no se pueden realizar ni recibir llamadas, llamadas entrecortadas, sin señal, interlocutor que no escucha, o llamadas que se caen.

## Síntomas
- No se puede llamar: "Sin servicio" o "No hay red".
- No se reciben llamadas (van directo al buzón).
- Las llamadas se cortan a los pocos segundos.
- El interlocutor no escucha la voz (micrófono).
- No se escucha al interlocutor (altavoz/auricular).
- Eco o interferencias durante la llamada.

## Causas posibles
- Sin cobertura en la zona.
- SIM mal insertada o no reconocida.
- Modo avión activo.
- Desvío de llamadas activo sin saberlo.
- Tarifa o línea con problema en el operador.
- Micrófono o altavoz dañado (ver doc de audio).
- Modo "No molestar" bloqueando llamadas entrantes.
- VoLTE no configurado correctamente.

## Diagnóstico (preguntas guiadas)
1. ¿Aparece señal en la barra de estado (barras de red)?
2. ¿El problema es con llamadas salientes, entrantes, o ambas?
3. ¿El interlocutor escucha pero el usuario no, o al revés?
4. ¿El problema ocurre en una zona concreta o en todas partes?
5. ¿Otros contactos del mismo operador tienen el mismo problema?
6. ¿Hay desvío de llamadas activo?

## Solución básica (segura)
1. Verificar que el modo avión esté desactivado.
2. Activar y desactivar el modo avión: esperar 15 segundos.
3. Reiniciar el dispositivo.
4. Verificar la cobertura del operador en la zona.
5. Extraer y reinsertar la SIM.
6. Verificar que el "No molestar" no esté bloqueando llamadas:
   - Ajustes → Sonido → No molestar → excepciones de llamadas.

## Solución intermedia
1. Verificar y desactivar el desvío de llamadas:
   - App Teléfono → Menú (⋮) → Ajustes → Llamadas → Desvío de llamadas → desactivar todo.
2. Verificar VoLTE (voz sobre LTE):
   - Ajustes → Red móvil → VoLTE → activar si el operador lo soporta.
3. Seleccionar la red manualmente:
   - Ajustes → Red móvil → Operadores de red → Manual → seleccionar el operador.
4. Restablecer ajustes de red:
   - Ajustes → Sistema → Restablecer → Restablecer ajustes de red.
5. Verificar con el operador el estado de la línea y si hay bloqueos o deudas.

## Solución avanzada
> ⚠️ El restablecimiento de red elimina Wi-Fi guardados, VPN y configuración de red.

1. Probar la SIM en otro dispositivo para confirmar si el problema es de la SIM o del teléfono.
2. Solicitar reposición de SIM al operador si la SIM está dañada.
3. Restablecimiento de fábrica como último recurso de software.

## Verificación
- Se puede realizar y recibir llamadas con normalidad.
- El audio en ambas direcciones es claro y sin cortes.
- La llamada no se cae en zonas con cobertura normal.

## Cuándo escalar
- Si el micrófono o el altavoz auricular tienen daño físico (ver doc de audio).
- Si la SIM no es reconocida en ningún dispositivo (solicitar nueva SIM).
- Si el operador confirma problema con la línea que requiere gestión en tienda.

## Advertencias
- El desvío de llamadas puede activarse accidentalmente con marcaciones rápidas (##002# cancela todos los desvíos en la mayoría de operadores).
- VoLTE mejora la calidad de voz pero requiere soporte del operador y del dispositivo.

## Fuentes
- https://support.google.com/android/answer/9417604
- https://support.google.com/fi/answer/6330548

## Palabras clave
Android llamadas no funcionan, sin señal Android llamadas, SIM Android no reconocida, llamadas Android se cortan, desvío llamadas Android cancelar, No molestar Android llamadas, VoLTE Android configurar, operador Android problema llamadas, micrófono Android llamada, altavoz auricular Android, restablecer red Android llamadas
