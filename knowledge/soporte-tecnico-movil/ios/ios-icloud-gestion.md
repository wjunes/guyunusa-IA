---
id: "stm-sistema-ios-icloud-gestion"
title: "iOS - iCloud: copia de seguridad, sincronización y gestión de espacio"
category: "sistema"
device_type: "smartphone"
manufacturer: "apple"
os: "ios"
os_version: "agnostic"
component: "almacenamiento"
difficulty: "intermediate"
severity: "medium"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "icloud"
  - "ios"
  - "iphone"
  - "copia-seguridad"
  - "sincronizacion"
---

# iOS — iCloud: copia de seguridad, sincronización y gestión de espacio

## Sistema operativo
iOS (iPhone). Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Apple iPhone.

## Descripción
iCloud es el servicio en la nube de Apple integrado en iOS. Gestiona copias de seguridad automáticas, sincronización de fotos, contactos, calendarios, contraseñas y documentos. Este documento cubre su configuración, diagnóstico de fallos y gestión de espacio.

## Funciones principales de iCloud
- Copia de seguridad automática del iPhone (cuando está en cargador y Wi-Fi).
- iCloud Fotos: sincronización y almacenamiento de fotos y videos.
- Sincronización de contactos, calendarios, notas y recordatorios.
- iCloud Drive: almacenamiento de documentos y archivos.
- Llavero de iCloud: sincronización de contraseñas entre dispositivos Apple.
- Buscar (Find My): localización del dispositivo.

## Espacio incluido y planes
- Plan gratuito: 5 GB (compartido entre todos los servicios iCloud).
- Planes de pago (iCloud+): 50 GB, 200 GB, 2 TB.
- Gestión: Ajustes → [nombre] → iCloud → Administrar almacenamiento de cuenta.

## Síntomas frecuentes
- "El almacenamiento de iCloud está lleno" — la copia de seguridad no se realiza.
- Fotos no sincronizadas entre dispositivos.
- Contactos o calendarios que desaparecen o se duplican.
- La copia de seguridad de iCloud no se actualiza.
- "Error al realizar la copia de seguridad de iCloud".

## Diagnóstico (preguntas guiadas)
1. ¿El problema es de copia de seguridad, fotos, contactos, o espacio?
2. ¿El iPhone está conectado a Wi-Fi y al cargador cuando falla la copia de seguridad?
3. ¿Cuánto espacio libre hay en iCloud?
4. ¿El Apple ID tiene verificación en dos factores activa?

## Copia de seguridad iCloud

**Verificar última copia:**
- Ajustes → [nombre] → iCloud → Copia de seguridad de iCloud → ver fecha de la última copia.

**Forzar copia de seguridad inmediata:**
- Ajustes → [nombre] → iCloud → Copia de seguridad de iCloud → Realizar copia ahora.
- Requisito: Wi-Fi activo, pantalla encendida, batería > 20 % (o en cargador).

**Error de copia por espacio insuficiente:**
1. Administrar almacenamiento: Ajustes → [nombre] → iCloud → Administrar almacenamiento de cuenta.
2. Eliminar copias de seguridad de dispositivos antiguos.
3. Reducir el tamaño de la copia: Ajustes → [nombre] → iCloud → Copia de seguridad de iCloud → [dispositivo] → desactivar apps no esenciales de la copia.
4. O ampliar el plan de iCloud (desde 50 GB/mes).

## iCloud Fotos

**Activar / verificar:**
- Ajustes → Fotos → iCloud Fotos → activar.
- Seleccionar "Optimizar almacenamiento del iPhone" para ahorrar espacio local.

**Fotos no sincronizadas:**
1. Verificar que iCloud Fotos esté activo.
2. Verificar conexión Wi-Fi (las fotos se sincronizan preferentemente por Wi-Fi).
3. Verificar espacio disponible en iCloud.
4. Esperar: la sincronización inicial puede tardar horas o días según el volumen.

## Sincronización de contactos y calendarios

**Activar:**
- Ajustes → [nombre] → iCloud → Contactos / Calendarios → activar.

**Contactos duplicados:**
- Acceder a iCloud.com → Contactos → unir contactos duplicados.

**Contactos desaparecidos:**
- Verificar que la cuenta de iCloud esté activa en el dispositivo.
- iCloud.com → Contactos → verificar si existen allí (problema local vs. nube).

## Advertencias
- Con solo 5 GB gratuitos, iCloud se llena rápidamente si hay fotos o copias de seguridad grandes. Evaluar ampliar el plan.
- La copia de seguridad de iCloud no incluye música comprada fuera de Apple Music, ni datos de apps que no la soporten.
- Desactivar iCloud Fotos sin exportar primero puede dejar las fotos solo en el dispositivo.

## Fuentes
- https://support.apple.com/es-es/HT207428
- https://support.apple.com/es-es/HT204247
- https://www.icloud.com

## Palabras clave
iCloud copia seguridad iPhone, iCloud espacio lleno iPhone, iCloud Fotos sincronizar iPhone, contactos iCloud desaparecieron, iCloud Drive iPhone, copia seguridad iCloud error, administrar almacenamiento iCloud iPhone, iCloud+ planes espacio, optimizar almacenamiento iPhone iCloud, calendarios iCloud sincronización falla, iCloud backup no actualiza
