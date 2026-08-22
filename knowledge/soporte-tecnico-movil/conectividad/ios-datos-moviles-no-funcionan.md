---
id: "stm-conectividad-ios-datos-moviles"
title: "iOS - Datos móviles no funcionan"
category: "conectividad"
device_type: "smartphone"
manufacturer: "apple"
os: "ios"
os_version: "agnostic"
component: "datos-moviles"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-18"
version: "1.0.0"
tags:
  - "datos-moviles"
  - "internet-movil"
  - "iphone"
  - "ios"
  - "APN"
---

# iOS — Datos móviles no funcionan

## Sistema operativo
iOS (iPhone). Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Apple iPhone.

## Descripción
Diagnóstico conversacional para casos en que el iPhone no tiene acceso a Internet a través de la red móvil: ícono de señal visible pero sin datos, apps que no cargan, o datos directamente desactivados.

## Síntomas
- Ícono de señal (4G, 5G, LTE) visible pero sin Internet.
- Las apps no cargan fuera de Wi-Fi.
- Datos móviles desactivados o en gris.
- Mensaje "Sin servicio" o "Solo llamadas de emergencia".
- Internet funciona con Wi-Fi pero no con datos.

## Causas posibles
- Datos móviles desactivados en Ajustes.
- Modo avión activo.
- Límite de datos del plan alcanzado.
- Configuración APN incorrecta.
- SIM mal insertada o no reconocida.
- Problema de cobertura o del operador.
- Roaming desactivado fuera del país.
- Restricciones de Screen Time activas.
- Problema tras actualización de iOS o cambio de SIM a eSIM.

## Diagnóstico (preguntas guiadas)
1. ¿Con Wi-Fi funciona Internet en el mismo iPhone?
2. ¿Los datos móviles están activados en Ajustes → Datos móviles?
3. ¿Aparece señal de red (4G, 5G, LTE) en la barra de estado?
4. ¿El problema ocurre en un lugar concreto o en todas partes?
5. ¿Otros usuarios del mismo operador tienen el mismo problema?
6. ¿Estás fuera de tu país (roaming)?
7. ¿Hubo cambio de SIM o actualización reciente de iOS?

## Solución básica (segura)
1. Verificar datos móviles activos:
   - Ajustes → Datos móviles → activar.
2. Activar y desactivar el modo avión; esperar 15 segundos.
3. Reiniciar el iPhone.
4. Extraer la SIM (si es física), limpiarla y reinsertarla.
5. Verificar el estado de la red del operador (web o redes sociales del operador).

## Solución intermedia
1. Verificar que cada app tenga permiso para usar datos móviles:
   - Ajustes → Datos móviles → desplazarse hacia abajo → verificar que las apps necesarias estén activadas.
2. Activar datos en roaming si estás fuera del país:
   - Ajustes → Datos móviles → Opciones de datos móviles → Itinerancia de datos.
3. Revisar y restablecer el APN (punto de acceso):
   - Ajustes → General → Transferir o restablecer el iPhone → Restablecer → Restablecer ajustes de red.
   - El APN correcto suele configurarse automáticamente al reinsertar la SIM o tras el restablecimiento.
4. Revisar restricciones de Screen Time:
   - Ajustes → Tiempo en pantalla → Restricciones de contenido → Datos móviles.
5. Seleccionar la red manualmente:
   - Ajustes → Datos móviles → Opciones de datos móviles → Selección de red → Manual → seleccionar operador.

## Solución avanzada
> ⚠️ El restablecimiento de ajustes de red elimina todas las redes Wi-Fi guardadas, contraseñas, VPN y configuración APN.

1. Restablecer ajustes de red:
   - Ajustes → General → Transferir o restablecer el iPhone → Restablecer → Restablecer ajustes de red.
2. Verificar si la SIM funciona en otro iPhone compatible.
3. Contactar al operador: verificar estado de la línea, plan de datos activo y posible bloqueo técnico.

## Verificación
- El ícono de datos muestra señal activa (4G, 5G, LTE).
- Las apps cargan correctamente sin Wi-Fi.
- Safari navega con Wi-Fi desactivado.

## Cuándo escalar
Escalar a técnico o al operador si:
- la SIM no es reconocida (sin señal en zona con cobertura);
- el problema persiste con otra SIM compatible;
- hay daño físico en la bandeja de SIM;
- la eSIM no se activa correctamente.

## Advertencias
- El roaming puede generar cargos adicionales: confirmar con el operador antes de activarlo.
- El restablecimiento de red no elimina fotos ni datos personales, pero sí contraseñas Wi-Fi guardadas.
- Para eSIM: la reactivación puede requerir contacto directo con el operador.

## Fuentes
- https://support.apple.com/es-es/111786
- https://support.apple.com/es-es/101602

## Palabras clave
iPhone datos móviles no funcionan, iOS Internet móvil no anda, 4G iPhone sin Internet, 5G iPhone no carga, datos móviles iPhone desactivado, APN iPhone, roaming iPhone activar, SIM iPhone no reconocida, Screen Time datos móviles iPhone, operador iPhone problema, LTE iPhone no funciona
