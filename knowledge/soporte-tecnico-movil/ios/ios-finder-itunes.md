---
id: "stm-sistema-ios-finder-itunes"
title: "iOS - Finder e iTunes: conexión, copia de seguridad y restauración"
category: "sistema"
device_type: "smartphone"
manufacturer: "apple"
os: "ios"
os_version: "agnostic"
component: "usb"
difficulty: "intermediate"
severity: "medium"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "finder"
  - "itunes"
  - "ios"
  - "iphone"
  - "copia-seguridad"
  - "restauracion"
---

# iOS — Finder e iTunes: conexión, copia de seguridad y restauración

## Sistema operativo
iOS (iPhone). Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Apple iPhone.

## Descripción
Finder (macOS Catalina o posterior) e iTunes (Windows / macOS Mojave o anterior) son las herramientas de escritorio para gestionar el iPhone desde un ordenador: copia de seguridad local, restauración, actualización de iOS y transferencia de contenido.

## Cuándo usar Finder / iTunes en lugar de iCloud
- Hacer una copia de seguridad completa sin límite de espacio en la nube.
- Restaurar el iPhone cuando iCloud no está disponible o no es suficiente.
- Actualizar o restaurar iOS en modo de recuperación o DFU.
- Transferir música, podcasts o archivos de apps específicas.
- Gestionar el iPhone cuando no hay conexión Wi-Fi disponible.

## Requisitos
- **macOS Catalina (10.15) o posterior:** usar Finder (integrado en el sistema).
- **Windows / macOS Mojave o anterior:** descargar iTunes desde https://www.apple.com/es/itunes/ o Microsoft Store.
- Cable Lightning o USB-C certificado (MFi).
- Puerto USB funcional en el ordenador.

## Conectar el iPhone al ordenador

1. Conectar el cable al iPhone y al ordenador.
2. Desbloquear el iPhone.
3. Cuando aparezca "¿Deseas permitir que este ordenador acceda a información de tu iPhone?" → pulsar **Permitir** e introducir el código de acceso.
4. Abrir Finder (Mac) o iTunes (Windows):
   - **Finder:** el iPhone aparece en la barra lateral izquierda bajo "Ubicaciones".
   - **iTunes:** el ícono del iPhone aparece en la barra superior izquierda.

**Si el iPhone no aparece:**
- Verificar que el cable sea MFi y tenga capacidad de datos.
- Probar con otro puerto USB.
- Reiniciar el iPhone y el ordenador.
- En Windows: verificar que Apple Mobile Device Support esté instalado.
- Tocar "Confiar" en el iPhone si el diálogo sigue apareciendo.

## Copia de seguridad local

**Desde Finder:**
- Finder → [iPhone] → pestaña General → "Crear una copia de seguridad de todos los datos de tu iPhone en este Mac" → Crear copia de seguridad ahora.
- Activar "Cifrar copia de seguridad local" para incluir contraseñas y datos de salud.

**Desde iTunes:**
- iTunes → [ícono iPhone] → Resumen → "Este ordenador" → Crear copia de seguridad ahora.

**Dónde se guardan las copias:**
- Mac: `~/Library/Application Support/MobileSync/Backup/`
- Windows: `C:\Users\[usuario]\AppData\Roaming\Apple Computer\MobileSync\Backup\`

## Restaurar desde copia de seguridad local

> ⚠️ Restaurar desde copia de seguridad borra el contenido actual del iPhone y lo reemplaza con el de la copia.

1. Conectar el iPhone al ordenador de confianza.
2. Finder / iTunes → [iPhone] → Restaurar copia de seguridad.
3. Seleccionar la copia de seguridad más reciente → confirmar.
4. Mantener el iPhone conectado hasta que finalice.

## Actualizar iOS desde Finder / iTunes

- Finder / iTunes → [iPhone] → Buscar actualizaciones.
- Útil cuando la actualización OTA falla o cuando el iPhone está en modo de recuperación.

## Advertencias
- Una copia de seguridad no cifrada no incluye contraseñas, datos de salud ni datos de HomePod.
- Si se olvida la contraseña de cifrado de la copia de seguridad, no hay forma de recuperarla. Mantener nota segura de esa contraseña.
- Restaurar en un iPhone diferente puede requerir reautenticación en apps con licencia específica por dispositivo.

## Fuentes
- https://support.apple.com/es-es/HT210377
- https://support.apple.com/es-es/HT201250
- https://support.apple.com/es-es/HT204156

## Palabras clave
Finder iPhone Mac conectar, iTunes iPhone Windows conectar, copia seguridad iPhone Finder, copia seguridad iTunes iPhone, restaurar iPhone Finder copia, restaurar iTunes iPhone, iPhone no aparece Finder, iPhone no aparece iTunes, Apple Mobile Device Support Windows, cifrar copia seguridad iPhone iTunes, actualizar iPhone Finder iTunes, transferir iPhone ordenador
