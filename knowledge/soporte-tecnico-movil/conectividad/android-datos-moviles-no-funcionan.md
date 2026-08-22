---
id: "stm-conectividad-android-datos-moviles"
title: "Android - Datos móviles no funcionan"
category: "conectividad"
device_type: "agnostic"
manufacturer: "agnostic"
os: "android"
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
  - "APN"
  - "android"
  - "sin-internet"
---

# Android — Datos móviles no funcionan

## Sistema operativo
Android (agnóstico de versión y fabricante)

## Dispositivo / fabricante
Agnóstico. Válido para Samsung, Xiaomi, Motorola, Google Pixel, OPPO, OnePlus y otros.

## Descripción
Diagnóstico conversacional para casos en que el dispositivo Android no tiene acceso a Internet a través de la red móvil del operador: ícono sin señal de datos, "H", "4G" o "5G" visible pero sin navegación, o datos directamente desactivados.

## Síntomas
- El ícono de datos móviles aparece pero no hay Internet.
- No aparece ningún ícono de datos (H, 4G, 5G, LTE).
- Internet funciona con Wi-Fi pero no con datos móviles.
- Apps no cargan con datos móviles activos.
- Mensaje "Sin servicio" o "Solo llamadas de emergencia".

## Causas posibles
- Datos móviles desactivados en ajustes.
- Modo avión activado.
- Límite de datos alcanzado (operador o configuración del dispositivo).
- APN (punto de acceso) incorrecto o corrupto.
- SIM mal insertada o dañada.
- Problema de cobertura o del operador.
- Problema tras actualización del sistema.
- Roaming desactivado fuera del país.

## Diagnóstico (preguntas guiadas)
1. ¿Con Wi-Fi funciona Internet en el mismo dispositivo?
2. ¿Los datos móviles están activados en Ajustes?
3. ¿Aparece algún ícono de señal de datos (4G, 5G, H)?
4. ¿El problema ocurre en un lugar específico o en todas partes?
5. ¿Otros usuarios del mismo operador tienen el mismo problema?
6. ¿Estás fuera de tu país de origen (roaming)?
7. ¿Hubo cambio de SIM o actualización reciente?

## Solución básica (segura)
1. Verificar que los datos móviles estén activados:
   - Bajar el panel de notificaciones → asegurarse de que el ícono de datos esté activo.
   - O: Ajustes → Red e Internet → Datos móviles → activar.
2. Activar y desactivar el modo avión; esperar 15 segundos.
3. Reiniciar el dispositivo.
4. Extraer la SIM, limpiarla con un paño seco e insertarla de nuevo.
5. Verificar si el operador reporta problemas de red (web del operador o redes sociales).

> **Nota:** El nombre del menú varía según el fabricante. En Samsung: "Conexiones → Uso de datos". En Xiaomi: "SIM y red móvil".

## Solución intermedia
1. Verificar y corregir el APN (punto de acceso de red):
   - Ajustes → Red e Internet → SIM → Nombres de punto de acceso (APN).
   - Consultar el APN correcto con el operador o en su web oficial.
   - Si hay un APN incorrecto, eliminarlo y agregar el correcto.
2. Seleccionar el tipo de red manualmente:
   - Ajustes → Red e Internet → SIM → Tipo de red preferida → probar con 4G/LTE o 3G.
3. Si hay límite de datos configurado, desactivarlo o ampliarlo:
   - Ajustes → Red e Internet → Ahorro de datos / Uso de datos.
4. Para roaming: activar datos en roaming:
   - Ajustes → Red e Internet → SIM → Itinerancia de datos → activar.

## Solución avanzada
> ⚠️ El restablecimiento de red elimina todas las redes Wi-Fi guardadas y configuraciones APN.

1. Restablecer configuración de red:
   - Ajustes → Sistema → Opciones de restablecimiento → Restablecer Wi-Fi, datos móviles y Bluetooth.
2. Verificar si la SIM funciona en otro dispositivo compatible.
3. Contactar al operador para verificar: estado de la línea, plan de datos activo, posible bloqueo técnico.

## Verificación
- El ícono de datos muestra señal activa (4G, 5G, LTE).
- Las apps cargan correctamente sin Wi-Fi.
- La navegación web funciona con Wi-Fi desactivado.

## Cuándo escalar
Escalar a técnico o al operador si:
- la SIM no es reconocida por el dispositivo;
- el problema persiste con otra SIM del mismo operador;
- hay mensaje permanente de "Sin servicio" en zona con cobertura;
- la tarjeta SIM presenta daño físico visible.

## Advertencias
- No modificar el APN con valores de fuentes no oficiales: puede dejar el dispositivo sin datos.
- El roaming puede generar cargos adicionales: confirmar con el operador antes de activarlo.
- No instalar apps de "señal" o "booster" de fuentes desconocidas.

## Fuentes
- https://support.google.com/android/answer/9075549
- https://support.google.com/fi/answer/6202739

## Palabras clave
Android datos móviles no funcionan, Internet móvil no anda Android, 4G conectado sin Internet Android, APN Android configurar, punto de acceso Android, datos móviles desactivados Android, sin señal datos Android, roaming Android, límite de datos Android, SIM Android no reconocida, operador datos móviles problema
