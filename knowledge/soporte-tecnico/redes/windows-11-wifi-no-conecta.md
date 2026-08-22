---
id: "st-redes-w11-wifi-no-conecta"
title: "Windows 11 - Wi-Fi no conecta"
category: "redes"
os: "windows-11"
component: "wifi-adapter"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-14"
version: "1.1.0"
tags:
  - "redes"
  - "wifi"
  - "sin-internet"
---

# Windows 11 - Wi-Fi no conecta

## Descripción
Guía de diagnóstico conversacional para resolver fallas de conexión Wi‑Fi en Windows 11, desde verificaciones básicas hasta comprobaciones técnicas de adaptador, IP y DNS.

## Síntomas
- No aparecen redes Wi‑Fi disponibles.
- Se conecta a la red pero dice “Sin Internet”.
- Se desconecta de forma intermitente.
- Velocidad muy baja o latencia alta.
- Error al autenticar contraseña correcta.

## Causas posibles
- Adaptador Wi‑Fi deshabilitado o con driver inestable.
- Configuración IP/DNS incorrecta.
- Fallo del router o saturación de canal.
- Perfil de red corrupto en Windows.
- Problema tras actualización del sistema/controlador.

## Diagnóstico (preguntas guiadas)
1. ¿El problema afecta solo a este equipo o también a otros dispositivos?
2. ¿La red Wi‑Fi aparece en la lista?
3. ¿Muestra “Conectado, sin Internet” o no conecta en absoluto?
4. ¿Comenzó después de actualización de Windows/driver?
5. ¿Con Ethernet funciona Internet correctamente?

## Solución básica (segura)
1. Activar/desactivar modo avión y volver a intentar.
2. Reiniciar router y equipo.
3. “Olvidar red” y reconectar:
   - Configuración → Red e Internet → Wi‑Fi → Administrar redes conocidas.
4. Confirmar fecha/hora correctas del sistema.
5. Ejecutar solucionador de problemas de red de Windows.

## Solución intermedia
1. Verificar adaptador en Administrador de dispositivos:
   - `Win + X` → Administrador de dispositivos → Adaptadores de red.
2. Deshabilitar/habilitar adaptador Wi‑Fi.
3. Renovar IP y limpiar DNS (explicar antes de ejecutar):
   - `ipconfig /release`
   - `ipconfig /renew`
   - `ipconfig /flushdns`
4. Probar conectividad:
   - `ping 8.8.8.8`
   - `nslookup google.com`
5. Cambiar DNS a proveedor confiable (temporal de prueba).

## Solución avanzada
1. Restablecimiento de red de Windows:
   - Configuración → Red e Internet → Configuración de red avanzada → Restablecimiento de red.
2. Reinstalar driver Wi‑Fi desde fabricante oficial (equipo o chipset).
3. Revisar configuración de energía del adaptador:
   - Desactivar ahorro de energía agresivo en el dispositivo.
4. Validar canal/banda del router (2.4 GHz/5 GHz) y congestión local.

## Verificación
- El equipo obtiene IP válida del router.
- Navegación web estable sin cortes.
- `ping` y resolución DNS correctos.
- No reaparecen desconexiones tras reinicio.

## Cuándo escalar
Escalar a técnico si:
- no detecta redes aun con driver reinstalado;
- múltiples redes fallan solo en ese equipo;
- persisten cortes frecuentes tras restablecimiento de red;
- hay indicios de fallo físico del adaptador.

## Riesgos / advertencias
- No instalar drivers desde sitios no oficiales.
- Evitar cambios avanzados en router sin respaldo.
- Documentar cambios para poder revertir.

## Fuentes
- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/client-management/
- https://www.intel.com/

## Palabras clave
windows 11 wifi no conecta, conectado sin internet, ipconfig release renew, flushdns, adaptador wifi, dns, restablecimiento de red

## Metadatos

Pendiente de completar.

## Diagnóstico

Pendiente de completar.

## Solución básica

Pendiente de completar.

## Riesgos y advertencias

Pendiente de completar.

