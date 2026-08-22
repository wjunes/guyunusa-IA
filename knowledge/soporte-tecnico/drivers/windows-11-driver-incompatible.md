---
id: "st-drivers-w11-incompatible"
title: "Windows 11 - Driver incompatible"
category: "drivers"
os: "windows-11"
component: "device-driver"
difficulty: "intermediate"
severity: "medium"
source_type: "official"
updated_at: "2026-08-14"
version: "1.1.0"
tags:
  - "drivers"
  - "incompatible"
  - "device-manager"
---

# Windows 11 - Driver incompatible

## Descripción
Guía de diagnóstico conversacional para cuando un controlador (driver) no funciona correctamente en Windows 11, aparece como incompatible o provoca fallos tras una actualización.

## Síntomas
- Dispositivo con signo de advertencia en **Administrador de dispositivos**.
- Código de error (ej.: Código 10, 28, 31, 43).
- El dispositivo dejó de funcionar después de actualizar Windows o instalar un driver.
- Pantallazos, reinicios o inestabilidad al usar el dispositivo.
- Funciones parciales (audio/video/red) después de cambio de driver.

## Causas posibles
- Driver no compatible con la versión/build de Windows 11.
- Instalación incompleta o corrupta del controlador.
- Conflicto entre driver genérico y driver del fabricante.
- Firmware/BIOS desactualizado (en algunos equipos).
- Actualización automática reemplazó un driver estable.

## Diagnóstico (preguntas guiadas)
1. ¿Qué dispositivo falla exactamente (audio, red, GPU, Bluetooth, impresora, etc.)?
2. ¿Cuándo empezó: tras actualización de Windows, instalación manual o cambio de hardware?
3. ¿Qué código de error muestra el Administrador de dispositivos?
4. ¿El problema ocurre siempre o solo en ciertas apps/escenarios?
5. ¿El driver fue descargado desde sitio oficial del fabricante?

## Solución básica (segura)
1. Reiniciar equipo y verificar si el error persiste.
2. Abrir **Administrador de dispositivos** y revisar estado del dispositivo:
   - `Win + X` → Administrador de dispositivos.
3. En **Propiedades > Controlador**, revisar:
   - Proveedor
   - Fecha
   - Versión
4. Ejecutar **Windows Update** y aplicar actualizaciones pendientes.
5. Probar deshabilitar/habilitar el dispositivo.

## Solución intermedia
1. **Rollback de driver** (si el fallo comenzó tras actualización):
   - Propiedades del dispositivo → **Controlador** → **Revertir controlador**.
2. **Desinstalar driver y reinstalar limpio**:
   - Administrador de dispositivos → clic derecho → **Desinstalar dispositivo**.
   - Marcar “Intentar quitar el software de controlador” si aparece.
   - Reiniciar equipo.
3. Instalar el driver desde fuente oficial:
   - Fabricante del equipo (Dell/HP/Lenovo/ASUS/Acer) o
   - Fabricante del componente (Intel/AMD/NVIDIA/Realtek/etc.).

## Solución avanzada
1. Confirmar versión exacta de Windows:
   - `Win + R` → `winver`.
2. Verificar ID de hardware:
   - Propiedades del dispositivo → **Detalles** → **Id. de hardware**.
3. Instalar manualmente versión específica recomendada por el fabricante.
4. Bloquear temporalmente actualización automática del driver problemático si Windows vuelve a reemplazarlo (solo cuando hay evidencia de regresión).

## Verificación
- El dispositivo aparece sin advertencias en Administrador de dispositivos.
- La función afectada vuelve a operar (audio/video/red/etc.).
- No se reproducen errores tras reinicio.
- El código de error desaparece.

## Cuándo escalar
Escalar a técnico si:
- persisten códigos críticos (ej.: 43) tras reinstalación oficial;
- hay fallos repetidos después de varias reinstalaciones limpias;
- aparecen síntomas físicos (sobrecalentamiento, apagados, artefactos).

## Riesgos / advertencias
- No descargar drivers desde sitios no oficiales o “packs” genéricos.
- No editar registro ni BIOS/UEFI sin respaldo y justificación técnica.
- Antes de cambios avanzados, crear punto de restauración.

## Fuentes
- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows-hardware/drivers
- https://www.intel.com/
- https://www.amd.com/
- https://www.nvidia.com/

## Palabras clave
driver incompatible windows 11, codigo 43, codigo 10, rollback driver, administrador de dispositivos, reinstalar controlador, id de hardware

## Metadatos

Pendiente de completar.

## Diagnóstico

Pendiente de completar.

## Solución básica

Pendiente de completar.

## Riesgos y advertencias

Pendiente de completar.

