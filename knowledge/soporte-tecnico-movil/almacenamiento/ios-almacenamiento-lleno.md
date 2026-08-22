---
id: "stm-almacenamiento-ios-almacenamiento-lleno"
title: "iOS - Almacenamiento lleno o sin espacio"
category: "almacenamiento"
device_type: "smartphone"
manufacturer: "apple"
os: "ios"
os_version: "agnostic"
component: "almacenamiento"
difficulty: "basic"
severity: "medium"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "almacenamiento"
  - "espacio"
  - "ios"
  - "iphone"
  - "icloud"
---

# iOS — Almacenamiento lleno o sin espacio

## Sistema operativo
iOS (iPhone). Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Apple iPhone.

## Descripción
Diagnóstico conversacional para casos en que el iPhone avisa de almacenamiento lleno, no puede instalar apps, no guarda fotos, o el rendimiento es lento por falta de espacio.

## Síntomas
- Mensaje: "iPhone sin espacio" o "Almacenamiento casi lleno".
- No se pueden instalar ni actualizar apps.
- La cámara no guarda fotos o videos.
- iOS no puede instalar actualizaciones del sistema.
- El iPhone funciona con lentitud generalizada.

## Causas posibles
- Fotos y videos en alta resolución acumulados localmente.
- Apps con caché o documentos locales acumulados (especialmente streaming, redes sociales).
- Mensajes con archivos multimedia en iMessage o WhatsApp.
- Podcasts, música o contenido descargado sin limpiar.
- Copias de seguridad de iCloud que consumen espacio local temporalmente.
- iCloud no configurado o sin espacio, forzando almacenamiento local.

## Diagnóstico (preguntas guiadas)
1. ¿Cuánto espacio libre queda? (Ajustes → General → Almacenamiento del iPhone)
2. ¿Qué ocupa más espacio: Fotos, Apps, o Mensajes?
3. ¿Las fotos están respaldadas en iCloud o en otro servicio?
4. ¿Usa iCloud Fotos activo?

## Solución básica (segura)
1. Ver desglose detallado:
   - Ajustes → General → Almacenamiento del iPhone → revisar recomendaciones de iOS.
2. Activar iCloud Fotos para mover fotos a la nube y optimizar almacenamiento local:
   - Ajustes → Fotos → iCloud Fotos → activar → "Optimizar almacenamiento del iPhone".
3. Revisar y eliminar fotos duplicadas o borrosas (iOS 16+):
   - App Fotos → Álbumes → Duplicados.
4. Vaciar la papelera de Fotos:
   - Álbumes → Eliminados recientemente → Eliminar todo.
5. Eliminar apps no utilizadas (iOS conserva los datos para reinstalación).

## Solución intermedia
1. Seguir las recomendaciones de iOS:
   - Ajustes → General → Almacenamiento del iPhone → iOS sugiere acciones específicas.
2. Eliminar contenido descargado de apps de streaming:
   - Netflix, Spotify, Apple Music, Podcasts: eliminar descargas desde dentro de la app.
3. Reducir el espacio de Mensajes:
   - Ajustes → General → Almacenamiento del iPhone → Mensajes → Revisar conversaciones con adjuntos grandes.
4. Eliminar o transferir videos pesados a un ordenador o a iCloud Drive.
5. Desinstalar y reinstalar apps con documentos locales muy acumulados.

## Solución avanzada
> ⚠️ Eliminar una app borra sus datos locales. Verificar que los datos importantes estén sincronizados en la nube antes de desinstalar.

1. Usar "Descarga de apps no usadas" para recuperar espacio sin perder datos:
   - Ajustes → App Store → Descarga de apps no usadas → activar.
2. Eliminar copias de seguridad antiguas de iCloud (de otros dispositivos):
   - Ajustes → [nombre] → iCloud → Administrar almacenamiento de cuenta → Copias de seguridad.
3. Contratar más espacio en iCloud si el plan actual está lleno (desde 50 GB).

## Verificación
- Al menos un 10 % del almacenamiento total disponible como libre.
- La cámara guarda fotos sin error.
- Las apps se instalan y actualizan con normalidad.
- iOS puede descargar actualizaciones del sistema.

## Cuándo escalar
- Si el almacenamiento interno reporta errores persistentes no resueltos por software.
- Si iCloud Fotos no sincroniza correctamente pese a conexión activa y espacio disponible.

## Advertencias
- "Optimizar almacenamiento del iPhone" en iCloud Fotos mantiene miniaturas locales y descarga en alta resolución solo cuando se accede. Requiere conexión activa.
- Verificar siempre el respaldo antes de eliminar fotos o videos del dispositivo.
- Restaurar una copia de seguridad de iCloud requiere espacio temporal adicional en el iPhone.

## Fuentes
- https://support.apple.com/es-es/HT201656
- https://support.apple.com/es-es/HT204247

## Palabras clave
iPhone almacenamiento lleno, iOS sin espacio, liberar espacio iPhone, iCloud Fotos optimizar almacenamiento, iPhone fotos espacio, almacenamiento iPhone recomendaciones, Mensajes iPhone espacio, descarga apps no usadas iOS, iCloud espacio lleno iPhone, videos iPhone borrar espacio, duplicados fotos iPhone iOS 16
