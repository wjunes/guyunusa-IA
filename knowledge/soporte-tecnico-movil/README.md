# Soporte Técnico — Dispositivos Móviles

**Versión:** 2.0.0
**Fecha:** 2026-08-19
**Estado:** activo — Fase 1, 2 y 3 completas

---

## Descripción

Dominio de asistencia técnica para dispositivos móviles (smartphones y tablets). Permite a Guyunusa actuar como asistente de diagnóstico conversacional, guiando al usuario desde el síntoma hasta la resolución o el escalamiento a soporte profesional.

Este dominio es independiente de BNC-UY. Pertenece al módulo **Asistencia Técnica** de Guyunusa IA.

---

## Arquitectura

```
GUYUNUSA
   │
ASISTENCIA TÉCNICA
   │
   ├── soporte-tecnico/         ← computadoras (Windows, Linux)
   └── soporte-tecnico-movil/   ← este dominio
```

---

## Sistemas operativos cubiertos

| OS      | Estado       | Versiones de referencia  |
|---------|--------------|--------------------------|
| Android | ✅ Activo     | Android 13, 14, 15       |
| iOS     | ✅ Activo     | iOS 16, 17, 18           |

> La arquitectura está preparada para incorporar otros sistemas móviles si alcanzan relevancia suficiente.

---

## Fabricantes contemplados

La capa de fabricante es **transversal**: los documentos son agnósticos por defecto. Se indica la variación de fabricante cuando existe una diferencia real de procedimiento.

Fabricantes priorizados para diferenciaciones futuras (Fase 3):
Samsung · Xiaomi · Motorola · Google Pixel · OPPO · OnePlus · Apple

---

## Estructura de directorios

```
soporte-tecnico-movil/
├── _templates/            ← plantilla base de documentos
├── android/               ← documentos exclusivos de Android (sistema, modos especiales)
├── ios/                   ← documentos exclusivos de iOS (Apple ID, iTunes, Finder)
├── conectividad/          ← Wi-Fi, datos móviles, Bluetooth, SIM, eSIM, hotspot, NFC
├── audio/                 ← altavoz, micrófono, auriculares, llamadas, multimedia
├── pantalla/              ← pantalla negra, congelada, táctil, brillo, rotación
├── camara/                ← cámara no abre, negra, enfoque, permisos
├── bateria/               ← descarga rápida, no carga, calentamiento, puerto
├── almacenamiento/        ← almacenamiento lleno, caché, microSD, fotos, videos
├── aplicaciones/          ← no abre, se cierra, no actualiza, permisos, caché
├── llamadas/              ← no entra, no sale, sin audio, calidad, SIM
├── seguridad/             ← recuperación de cuenta, acceso legítimo, bloqueo
├── actualizaciones/       ← errores de actualización, espacio insuficiente, bucles
└── interoperabilidad/     ← Android↔Windows, iPhone↔Windows, Bluetooth, hotspot
```

---

## Convenciones de identificadores

| Campo    | Formato                              | Ejemplo                            |
|----------|--------------------------------------|------------------------------------|
| `id`     | `stm-{categoria}-{os}-{slug}`        | `stm-conectividad-android-wifi`    |
| Archivo  | `{os}-{problema-slug}.md`            | `android-wifi-no-conecta.md`       |

---

## Metadatos por documento

Cada documento usa frontmatter YAML compatible con el sistema de soporte-tecnico:

```yaml
id: "stm-{categoria}-{os}-{slug}"
title: "{OS} - {Síntoma}"
category: "{categoria}"
device_type: "{smartphone|tablet|agnostic}"
manufacturer: "{agnostic|samsung|xiaomi|...}"
os: "{android|ios|agnostic}"
os_version: "{agnostic|android-14|ios-18}"
component: "{componente}"
difficulty: "{basic|intermediate|advanced}"
severity: "{low|medium|high|critical}"
source_type: "{official|community-support}"
updated_at: "YYYY-MM-DD"
version: "1.0.0"
tags: [...]
```

---

## Flujo de diagnóstico

```
SÍNTOMA
   ↓
IDENTIFICACIÓN DEL DISPOSITIVO
   ↓
IDENTIFICACIÓN DEL SO
   ↓
IDENTIFICACIÓN DEL PROBLEMA
   ↓
PREGUNTAS DE DIAGNÓSTICO
   ↓
CAUSAS PROBABLES
   ↓
SOLUCIÓN PROGRESIVA (básica → intermedia → avanzada)
   ↓
VERIFICACIÓN
   ↓
RESOLUCIÓN / NUEVO DIAGNÓSTICO / ESCALAMIENTO
```

---

## Principios de seguridad

- **No solicitar** contraseñas, PIN, códigos 2FA ni credenciales.
- **No ofrecer** procedimientos para evadir bloqueos o acceder sin autorización.
- **Advertir siempre** antes de operaciones destructivas (restablecimiento de fábrica, borrado de datos).
- **Priorizar soluciones reversibles.**
- **Escalar** ante daño físico, batería hinchada, calor extremo, humo o chispas.

---

## Fases de implementación

| Fase | Contenido                                                        | Estado     |
|------|------------------------------------------------------------------|------------|
| 1    | Android + iOS: conectividad, audio, batería, almacenamiento, apps, actualizaciones | ✅ Completa |
| 2    | Cámara, pantalla, llamadas, seguridad, interoperabilidad        | ✅ Completa |
| 3    | Sistema (modos especiales, cuentas, fabricantes)                 | ✅ Completa |
| 4    | Incorporación basada en consultas reales de usuarios             | 🔜 Pendiente |

---

## Índice de documentos — 38 archivos

### Conectividad
| Archivo | Descripción |
|---|---|
| `conectividad/android-wifi-no-conecta.md` | Android — Wi-Fi no conecta o sin Internet |
| `conectividad/android-datos-moviles-no-funcionan.md` | Android — Datos móviles no funcionan |
| `conectividad/android-bluetooth-no-empareja.md` | Android — Bluetooth no empareja o no conecta |
| `conectividad/ios-wifi-no-conecta.md` | iOS — Wi-Fi no conecta o sin Internet |
| `conectividad/ios-datos-moviles-no-funcionan.md` | iOS — Datos móviles no funcionan |
| `conectividad/ios-bluetooth-no-empareja.md` | iOS — Bluetooth no empareja o no conecta |

### Audio
| Archivo | Descripción |
|---|---|
| `audio/android-no-hay-sonido.md` | Android — Sin sonido o volumen sin efecto |
| `audio/ios-no-hay-sonido.md` | iOS — Sin sonido o volumen sin efecto |

### Batería
| Archivo | Descripción |
|---|---|
| `bateria/android-bateria-descarga-rapida.md` | Android — Batería se descarga rápido |
| `bateria/ios-bateria-descarga-rapida.md` | iOS — Batería se descarga rápido |

### Almacenamiento
| Archivo | Descripción |
|---|---|
| `almacenamiento/android-almacenamiento-lleno.md` | Android — Almacenamiento lleno o sin espacio |
| `almacenamiento/ios-almacenamiento-lleno.md` | iOS — Almacenamiento lleno o sin espacio |

### Aplicaciones
| Archivo | Descripción |
|---|---|
| `aplicaciones/android-app-no-abre.md` | Android — Aplicación no abre o falla |
| `aplicaciones/ios-app-no-abre.md` | iOS — Aplicación no abre o falla |

### Actualizaciones
| Archivo | Descripción |
|---|---|
| `actualizaciones/android-actualizacion-error.md` | Android — Error al actualizar el sistema |
| `actualizaciones/ios-actualizacion-error.md` | iOS — Error al actualizar el sistema |

### Pantalla
| Archivo | Descripción |
|---|---|
| `pantalla/android-pantalla-no-funciona.md` | Android — Pantalla táctil no responde o falla |
| `pantalla/ios-pantalla-no-funciona.md` | iOS — Pantalla táctil no responde o falla |

### Cámara
| Archivo | Descripción |
|---|---|
| `camara/android-camara-no-funciona.md` | Android — Cámara no funciona o falla |
| `camara/ios-camara-no-funciona.md` | iOS — Cámara no funciona o falla |

### Llamadas
| Archivo | Descripción |
|---|---|
| `llamadas/android-llamadas-problema.md` | Android — Problemas con llamadas de voz |
| `llamadas/ios-llamadas-problema.md` | iOS — Problemas con llamadas de voz |

### Seguridad
| Archivo | Descripción |
|---|---|
| `seguridad/android-seguridad.md` | Android — Acceso, desbloqueo y seguridad del dispositivo |
| `seguridad/ios-seguridad.md` | iOS — Face ID, Touch ID, código y Activation Lock |

### Interoperabilidad
| Archivo | Descripción |
|---|---|
| `interoperabilidad/android-interoperabilidad.md` | Android — USB, casting, hotspot, Android Auto |
| `interoperabilidad/ios-interoperabilidad.md` | iOS — AirPlay, AirDrop, CarPlay, USB, hotspot |

### Sistema Android (modos especiales y cuentas)
| Archivo | Descripción |
|---|---|
| `android/android-modo-seguro.md` | Android — Modo seguro: diagnóstico por apps de terceros |
| `android/android-modo-recovery.md` | Android — Modo Recovery: caché del sistema y restablecimiento |
| `android/android-opciones-desarrollador.md` | Android — Opciones de desarrollador: activación y uso básico |
| `android/android-cuenta-google.md` | Android — Cuenta Google: gestión, sincronización y FRP |

### Sistema Android — Diferenciaciones por fabricante
| Archivo | Descripción |
|---|---|
| `android/samsung-one-ui.md` | Samsung One UI — rutas de menú y características exclusivas |
| `android/xiaomi-hyperos-miui.md` | Xiaomi HyperOS / MIUI — rutas de menú y características exclusivas |
| `android/motorola-diferencias.md` | Motorola My UX — rutas de menú y Moto Actions |
| `android/google-pixel-diferencias.md` | Google Pixel — Android puro, referencia base y Android Flash Tool |

### Sistema iOS (Apple ID, iCloud, modos especiales)
| Archivo | Descripción |
|---|---|
| `ios/ios-apple-id-gestion.md` | iOS — Apple ID: gestión, acceso y recuperación |
| `ios/ios-icloud-gestion.md` | iOS — iCloud: copia de seguridad, sincronización y espacio |
| `ios/ios-modo-recuperacion-dfu.md` | iOS — Modo de recuperación y modo DFU |
| `ios/ios-finder-itunes.md` | iOS — Finder e iTunes: copia de seguridad y restauración |
