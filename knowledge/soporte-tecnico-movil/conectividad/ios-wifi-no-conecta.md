---
id: "stm-conectividad-ios-wifi-no-conecta"
title: "iOS - Wi-Fi no conecta o sin Internet"
category: "conectividad"
device_type: "smartphone"
manufacturer: "apple"
os: "ios"
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
  - "ios"
  - "iphone"
  - "conectividad"
---

# iOS — Wi-Fi no conecta o sin Internet

## Sistema operativo
iOS (iPhone). Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Apple iPhone.

## Descripción
Diagnóstico conversacional para resolver fallas de Wi-Fi en iPhone: desde no ver redes disponibles hasta estar conectado pero sin acceso real a Internet.

## Síntomas
- No aparecen redes Wi-Fi disponibles.
- Se conecta pero no hay Internet (ícono Wi-Fi sin acceso).
- Se desconecta de forma intermitente.
- Velocidad muy baja o inestable.
- Error al autenticar con contraseña correcta.
- El Wi-Fi se desactiva solo.

## Causas posibles
- Wi-Fi desactivado o modo avión activo.
- Perfil de red guardada corrupto.
- Configuración DNS o IP incorrecta.
- Problema del router (no del iPhone).
- Fecha y hora incorrectas del dispositivo.
- Problema tras actualización de iOS.
- Restricciones de red activas (Screen Time / control parental).

## Diagnóstico (preguntas guiadas)
1. ¿El problema afecta solo al iPhone o también a otros dispositivos?
2. ¿La red aparece en la lista de redes disponibles?
3. ¿Muestra el ícono de Wi-Fi con exclamación o no aparece señal?
4. ¿Ocurre en todas las redes o solo en una?
5. ¿Empezó tras actualizar iOS o cambiar la configuración?
6. ¿Con datos móviles funciona Internet?

## Solución básica (segura)
1. Activar y desactivar el modo avión: Ajustes → Modo Avión (esperar 10 segundos y desactivar).
2. Desactivar Wi-Fi y reactivarlo: Ajustes → Wi-Fi.
3. Reiniciar el iPhone (mantener botón lateral + bajar volumen en iPhone X o posterior).
4. Reiniciar el router (desenchufar 30 segundos).
5. Olvidar la red y reconectarse:
   - Ajustes → Wi-Fi → tocar el ícono (ℹ) junto a la red → Olvidar esta red.

## Solución intermedia
1. Verificar y corregir la configuración IP:
   - Ajustes → Wi-Fi → (ℹ) de la red → Configurar IP → Automático (DHCP).
2. Cambiar DNS manualmente:
   - Ajustes → Wi-Fi → (ℹ) → Configurar DNS → Manual → añadir 8.8.8.8 y 8.8.4.4.
3. Renovar el contrato DHCP:
   - Ajustes → Wi-Fi → (ℹ) → Renovar contrato.
4. Verificar que la fecha y hora sean correctas:
   - Ajustes → General → Fecha y hora → Ajustar automáticamente.
5. Revisar si Screen Time bloquea la conexión:
   - Ajustes → Tiempo en pantalla → Restricciones de contenido y privacidad.

## Solución avanzada
> ⚠️ El restablecimiento de ajustes de red elimina todas las redes Wi-Fi guardadas, contraseñas, configuraciones VPN y APN.

1. Restablecer ajustes de red:
   - Ajustes → General → Transferir o restablecer el iPhone → Restablecer → Restablecer ajustes de red.
2. Verificar actualizaciones de iOS pendientes:
   - Ajustes → General → Actualización de software.
3. Si persiste en todas las redes, puede indicar fallo del módulo Wi-Fi (hardware).

## Verificación
- El iPhone obtiene IP válida del router.
- Safari o el navegador carga páginas correctamente.
- El ícono de Wi-Fi no muestra exclamación.
- La conexión se mantiene estable tras reiniciar.

## Cuándo escalar
Escalar a soporte Apple o técnico autorizado si:
- el iPhone no detecta ninguna red Wi-Fi;
- el interruptor de Wi-Fi aparece en gris y no se puede activar;
- el problema persiste tras restablecimiento de red;
- hay antecedente de daño físico o exposición al agua.

## Advertencias
- No instalar perfiles de configuración de fuentes desconocidas.
- El restablecimiento de red no elimina fotos, apps ni datos personales.
- Si el Wi-Fi está bloqueado por Screen Time, se necesita el código de Screen Time para modificarlo.

## Fuentes
- https://support.apple.com/es-es/111786
- https://support.apple.com/es-es/108913

## Palabras clave
iPhone Wi-Fi no conecta, iOS Wi-Fi sin Internet, iPhone red no disponible, Wi-Fi iPhone exclamación, olvidar red iPhone, DNS iPhone cambiar, renovar DHCP iPhone, restablecer red iPhone, Wi-Fi gris iPhone, iOS actualización Wi-Fi problema, iPhone no se conecta al Wi-Fi
