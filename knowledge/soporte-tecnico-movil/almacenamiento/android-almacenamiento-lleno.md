---
id: "stm-almacenamiento-android-almacenamiento-lleno"
title: "Android - Almacenamiento lleno o sin espacio"
category: "almacenamiento"
device_type: "smartphone"
manufacturer: "agnostic"
os: "android"
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
  - "android"
  - "memoria"
  - "cache"
---

# Android — Almacenamiento lleno o sin espacio

## Sistema operativo
Android. Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Android (Samsung, Xiaomi, Motorola, Google Pixel, OPPO, OnePlus).

## Descripción
Diagnóstico conversacional para casos en que el dispositivo Android avisa de almacenamiento lleno, no puede instalar apps, no guarda fotos, o el rendimiento es lento por falta de espacio.

## Síntomas
- Mensaje: "Almacenamiento insuficiente" o "Sin espacio".
- No se pueden instalar ni actualizar apps.
- La cámara no guarda fotos o videos.
- El dispositivo funciona con lentitud generalizada.
- Las apps crashean con frecuencia.

## Causas posibles
- Fotos y videos acumulados sin limpiar.
- Caché de apps sin borrar (especialmente redes sociales y streaming).
- Apps instaladas que ya no se usan.
- Archivos de descarga olvidados.
- Copias de seguridad locales redundantes.
- Archivos temporales del sistema.

## Diagnóstico (preguntas guiadas)
1. ¿Cuánto espacio libre queda? (Ajustes → Almacenamiento)
2. ¿Qué ocupa más espacio: fotos, apps, o "Otros"?
3. ¿Hay fotos o videos que ya están respaldados en la nube?
4. ¿Usa tarjeta microSD?

## Solución básica (segura)
1. Ver desglose de almacenamiento:
   - Ajustes → Almacenamiento → revisar qué categoría ocupa más.
2. Borrar caché de apps con mayor consumo (redes sociales, streaming):
   - Ajustes → Aplicaciones → [app] → Almacenamiento → Borrar caché.
3. Eliminar fotos y videos duplicados o de baja calidad desde la galería.
4. Vaciar la papelera de la Galería / Google Fotos.
5. Eliminar archivos de descarga innecesarios:
   - App Archivos / Mis archivos → Descargas.

## Solución intermedia
1. Usar la herramienta de limpieza integrada del fabricante:
   - Samsung: Ajustes → Batería y cuidado del dispositivo → Almacenamiento → Limpiar.
   - Google Files / Archivos de Google: detecta y sugiere archivos a eliminar.
2. Desinstalar apps no utilizadas:
   - Ajustes → Aplicaciones → ordenar por tamaño → desinstalar las más pesadas no esenciales.
3. Mover fotos respaldadas a la nube y eliminar copias locales:
   - Google Fotos → Liberar espacio del dispositivo.
4. Mover apps y archivos a tarjeta microSD (si el dispositivo lo permite):
   - Ajustes → Aplicaciones → [app] → Almacenamiento → Cambiar a SD.
5. Revisar y eliminar mensajes con archivos adjuntos pesados (WhatsApp, Telegram).

## Solución avanzada
> ⚠️ Borrar los datos de una app elimina su configuración local, cuentas guardadas y progreso no sincronizado en la nube.

1. Borrar datos (no solo caché) de apps muy pesadas que se pueden reconigurar:
   - Ajustes → Aplicaciones → [app] → Almacenamiento → Borrar datos.
2. Desinstalar y reinstalar apps de streaming (Netflix, Spotify) que acumulan descargas.
3. Si el problema persiste y el almacenamiento está fragmentado: restablecimiento de fábrica como último recurso.

## Verificación
- Al menos un 10–15 % del almacenamiento total disponible como libre.
- La cámara guarda fotos sin error.
- Las apps se instalan y actualizan con normalidad.

## Cuándo escalar
- Si la tarjeta microSD no es reconocida o tiene errores.
- Si el almacenamiento interno tiene sectores dañados (el sistema reportará errores persistentes).

## Advertencias
- No borrar datos del sistema ni de apps críticas del sistema operativo.
- Verificar que las fotos estén respaldadas antes de eliminarlas del dispositivo.
- Google Fotos: "Liberar espacio" elimina las copias locales solo si las fotos ya están en la nube.

## Fuentes
- https://support.google.com/android/answer/7431795
- https://support.google.com/photos/answer/6128843

## Palabras clave
Android almacenamiento lleno, Android sin espacio, borrar caché Android, liberar espacio Android, almacenamiento insuficiente Android, Google Fotos liberar espacio, Samsung limpiar almacenamiento, tarjeta SD Android mover apps, descargas Android borrar, WhatsApp almacenamiento Android, Archivos Google limpiar
