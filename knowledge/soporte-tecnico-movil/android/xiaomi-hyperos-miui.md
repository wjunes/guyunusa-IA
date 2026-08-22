---
id: "stm-sistema-android-xiaomi-hyperos-miui"
title: "Android Xiaomi - Diferenciaciones HyperOS / MIUI"
category: "sistema"
device_type: "smartphone"
manufacturer: "xiaomi"
os: "android"
os_version: "agnostic"
component: "aplicaciones"
difficulty: "intermediate"
severity: "low"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "xiaomi"
  - "hyperos"
  - "miui"
  - "android"
  - "rutas-menu"
  - "fabricante"
---

# Android Xiaomi — Diferenciaciones HyperOS / MIUI

## Sistema operativo
Android con HyperOS (Xiaomi desde 2024) o MIUI (versiones anteriores). Aplica a Xiaomi, Redmi y POCO.

## Descripción
Referencia de rutas de menú y características exclusivas de Xiaomi (HyperOS / MIUI) que difieren del Android estándar. Complementa los documentos generales de Android cuando el usuario tiene un dispositivo Xiaomi, Redmi o POCO.

## Rutas de menú específicas de HyperOS / MIUI

### Ajustes principales
| Función estándar Android | Ruta en HyperOS / MIUI (Xiaomi) |
|---|---|
| Acerca del teléfono | Ajustes → Mi teléfono (o Acerca del teléfono) |
| Número de compilación (desarrollador) | Ajustes → Mi teléfono → Versión de HyperOS / MIUI → pulsar 7 veces |
| Opciones de desarrollador | Ajustes → Ajustes adicionales → Opciones de desarrollador |
| Actualización del sistema | Ajustes → Acerca del teléfono → Actualización del sistema |
| Batería | Ajustes → Batería |
| Ahorro de energía | Ajustes → Batería → Ahorro de batería |
| Almacenamiento | Ajustes → Almacenamiento |
| Aplicaciones | Ajustes → Aplicaciones |
| Permisos de app | Ajustes → Aplicaciones → [app] → Permisos |
| Red móvil | Ajustes → Tarjetas SIM y redes móviles |
| Wi-Fi | Ajustes → Wi-Fi |
| Bluetooth | Ajustes → Bluetooth |
| Punto de acceso | Ajustes → Punto de acceso personal |
| No molestar | Ajustes → Sonido y vibración → No molestar |
| Restablecer ajustes de red | Ajustes → Ajustes adicionales → Restablecer → Restablecer ajustes Wi-Fi, datos móviles y Bluetooth |
| Restablecimiento de fábrica | Ajustes → Ajustes adicionales → Restablecer → Borrar todos los datos (restablecer de fábrica) |
| Diagnóstico del dispositivo | Ajustes → Acerca del teléfono → Todas las especificaciones → Diagnóstico |

### Cuenta Xiaomi (Mi Account)
- Ajustes → Mi Account (o cuenta Xiaomi).
- URL de recuperación remota: https://i.mi.com
- Permite localizar, bloquear o borrar el dispositivo de forma remota.
- Requisito: Mi Account vinculada y dispositivo con datos activos.

### Modo seguro en Xiaomi
- Apagar el dispositivo completamente.
- Encender manteniendo pulsado el botón de bajar volumen hasta que arranque en modo seguro.
- O: Mantener pulsado el botón de encendido → deslizar el ícono de apagado hacia abajo (en algunos modelos MIUI).

### Modo Recovery en Xiaomi
- Apagar el dispositivo.
- Encender manteniendo pulsado **Encendido + Subir volumen**.
- Navegar con los botones de volumen; seleccionar con el de encendido.
- Algunos modelos Redmi: **Encendido + Bajar volumen** accede al Fastboot; desde allí se puede seleccionar Recovery.

### Diagnóstico integrado
- Ajustes → Acerca del teléfono → Diagnóstico → permite probar pantalla, altavoz, micrófono, cámara y sensores.
- Código alternativo en MIUI: *#*#64663#*#* (puede variar según el modelo).

### Características exclusivas relevantes en soporte
- **Aplicaciones duales (Dual Apps):** Xiaomi permite duplicar apps de redes sociales; puede causar confusión al diagnosticar problemas de cuenta.
- **Segundo espacio:** partición de usuario separada con datos completamente independientes; el usuario puede no saber que está en el espacio secundario.
- **Bloqueo de Seguridad MIUI:** en algunos modelos, tras varios intentos de PIN fallidos, bloquea y solicita la Mi Account.
- **Restricciones de segundo plano MIUI/HyperOS:** agresivas por defecto; pueden cortar notificaciones de apps de terceros.
  - Solución: Ajustes → Aplicaciones → [app] → Ahorro de batería → Sin restricciones.

## Advertencias
- Mi Account y Google Account son independientes: problemas con una no afectan a la otra.
- Las restricciones de segundo plano de MIUI/HyperOS son más agresivas que en stock Android: muchos problemas de notificaciones se resuelven ajustando esta configuración.
- HyperOS y MIUI pueden tener traducciones diferentes según la región del dispositivo: buscar por nombre en el buscador de Ajustes si no se encuentra una opción.

## Fuentes
- https://www.mi.com/es/support
- https://i.mi.com

## Palabras clave
Xiaomi HyperOS rutas menú, MIUI ajustes diferencias Android, Xiaomi Mi Account gestión, Xiaomi modo seguro activar, Xiaomi recovery mode, Xiaomi opciones desarrollador activar, MIUI restricciones segundo plano notificaciones, Xiaomi diagnóstico dispositivo, Redmi POCO diferencias menú, Xiaomi restablecimiento fábrica, MIUI doble aplicación dual apps
