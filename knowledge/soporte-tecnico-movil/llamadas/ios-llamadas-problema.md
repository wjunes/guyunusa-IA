---
id: "stm-llamadas-ios-llamadas-problema"
title: "iOS - Problemas con llamadas"
category: "llamadas"
device_type: "smartphone"
manufacturer: "apple"
os: "ios"
os_version: "agnostic"
component: "sim"
difficulty: "basic"
severity: "high"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "llamadas"
  - "ios"
  - "iphone"
  - "sin-señal"
  - "voz"
---

# iOS — Problemas con llamadas

## Sistema operativo
iOS (iPhone). Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Apple iPhone.

## Descripción
Diagnóstico conversacional para problemas con llamadas de voz en iPhone: no se pueden realizar ni recibir llamadas, llamadas entrecortadas, sin señal, interlocutor que no escucha, o llamadas que se caen.

## Síntomas
- No se puede llamar: "Sin servicio" o "Sin línea".
- No se reciben llamadas (van directo al buzón).
- Las llamadas se cortan a los pocos segundos.
- El interlocutor no escucha la voz (micrófono).
- No se escucha al interlocutor (auricular).
- Eco o interferencias durante la llamada.
- Silencio de llamada: el iPhone suena pero no muestra quién llama.

## Causas posibles
- Sin cobertura en la zona.
- SIM o eSIM mal configurada o no reconocida.
- Modo avión activo.
- Desvío de llamadas activo sin saberlo.
- Tarifa o línea con problema en el operador.
- Focus o "No molestar" bloqueando llamadas entrantes.
- VoLTE o Wi-Fi Calling no configurado correctamente.
- Silencio de llamada activado (iOS 16+: silencia llamadas de desconocidos).

## Diagnóstico (preguntas guiadas)
1. ¿Aparece señal en la barra de estado?
2. ¿El problema es con llamadas salientes, entrantes, o ambas?
3. ¿El iPhone suena al recibir llamadas o van directo al buzón?
4. ¿El audio en las llamadas falla en ambas direcciones o solo en una?
5. ¿El problema ocurre en una zona concreta o en todas partes?
6. ¿Hay desvío de llamadas activo?

## Solución básica (segura)
1. Verificar que el modo avión esté desactivado.
2. Activar y desactivar el modo avión; esperar 15 segundos.
3. Reiniciar el iPhone.
4. Verificar cobertura del operador en la zona.
5. Verificar que "No molestar" / Focus no bloquee llamadas:
   - Ajustes → Focus → revisar excepciones de llamadas.
6. Verificar que el silencio de llamadas de desconocidos esté desactivado si el problema son llamadas entrantes:
   - Ajustes → Teléfono → Silenciar llamadas de desconocidos.

## Solución intermedia
1. Verificar y desactivar el desvío de llamadas:
   - Ajustes → Teléfono → Desvío de llamadas → desactivar.
2. Activar VoLTE si el operador lo soporta:
   - Ajustes → Datos móviles → Opciones de datos móviles → Voz y datos → VoLTE.
3. Activar Wi-Fi Calling si hay cobertura débil:
   - Ajustes → Teléfono → Llamadas Wi-Fi → activar.
4. Restablecer ajustes de red:
   - Ajustes → General → Transferir o restablecer el iPhone → Restablecer → Restablecer ajustes de red.
5. Verificar con el operador el estado de la línea.

## Solución avanzada
> ⚠️ El restablecimiento de red elimina Wi-Fi guardados y configuración VPN.

1. Probar con otra SIM compatible si la disponible es física.
2. Para eSIM: contactar al operador para reactivación.
3. Restaurar el iPhone desde copia de seguridad si el problema es de software persistente.

## Verificación
- Se puede realizar y recibir llamadas con normalidad.
- El audio en ambas direcciones es claro y sin cortes.
- Las llamadas no se caen en zonas con cobertura normal.

## Cuándo escalar
- Si el micrófono o el auricular tienen daño físico (ver doc de audio).
- Si la eSIM no se activa tras contacto con el operador.
- Si el operador confirma problema con la línea que requiere gestión presencial.

## Advertencias
- "Silenciar llamadas de desconocidos" (iOS 13+) puede hacer que el iPhone parezca no recibir llamadas: verificarlo siempre.
- El desvío de llamadas se puede cancelar marcando ##002# desde el teclado de llamada en la mayoría de operadores.
- Wi-Fi Calling puede generar cargos adicionales según el operador: confirmar antes de activar.

## Fuentes
- https://support.apple.com/es-es/HT203032
- https://support.apple.com/es-es/111786

## Palabras clave
iPhone llamadas no funcionan, sin señal iPhone llamadas, SIM iPhone no reconocida, llamadas iPhone se cortan, desvío llamadas iPhone cancelar, No molestar iPhone llamadas, VoLTE iPhone configurar, Wi-Fi Calling iPhone, silenciar llamadas desconocidos iPhone, eSIM iPhone problema, operador iPhone llamadas falla
