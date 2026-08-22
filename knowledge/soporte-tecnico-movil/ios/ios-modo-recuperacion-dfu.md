---
id: "stm-sistema-ios-modo-recuperacion-dfu"
title: "iOS - Modo de recuperación y modo DFU"
category: "sistema"
device_type: "smartphone"
manufacturer: "apple"
os: "ios"
os_version: "agnostic"
component: "aplicaciones"
difficulty: "advanced"
severity: "critical"
source_type: "official"
updated_at: "2026-08-19"
version: "1.0.0"
tags:
  - "modo-recuperacion"
  - "dfu"
  - "ios"
  - "iphone"
  - "restauracion"
---

# iOS — Modo de recuperación y modo DFU

## Sistema operativo
iOS (iPhone). Agnóstico de versión salvo indicación específica.

## Dispositivo / fabricante
Apple iPhone. Los pasos exactos varían según el modelo.

## Descripción
Modos especiales de arranque del iPhone que permiten restaurar o actualizar iOS desde un ordenador cuando el sistema no responde. Son el último recurso de software antes de escalar a soporte hardware.

## Diferencia entre modo de recuperación y modo DFU

| | Modo de recuperación | Modo DFU |
|---|---|---|
| iBoot (bootloader) | Carga | No carga |
| Pantalla del iPhone | Logo de cable y ordenador | Pantalla negra |
| Uso principal | Actualizar o restaurar iOS | Restauración completa de firmware |
| Riesgo de pérdida de datos | Alto (restaura iOS) | Total (borra todo) |
| Cuándo usarlo | iPhone no arranca, iOS corrupto | Modo recuperación no funciona, actualizar firmware base |

> ⚠️ Ambos modos requieren Finder (macOS Catalina o posterior) o iTunes (Windows / macOS Mojave o anterior).
> ⚠️ Realizar copia de seguridad antes si el iPhone responde aunque sea parcialmente.

## Modo de recuperación

### Cuándo usarlo
- El iPhone no arranca y muestra pantalla negra o logo de Apple permanente.
- iOS está corrupto tras una actualización fallida.
- El iPhone está en bucle de reinicio.
- El código de acceso se olvidó y no hay otra forma de recuperar el acceso.

### Cómo entrar en modo de recuperación

**iPhone 8, iPhone X, o posterior (incluye todos los iPhone con Face ID):**
1. Conectar el iPhone al ordenador con el cable.
2. Pulsar y soltar rápidamente el botón de **Subir volumen**.
3. Pulsar y soltar rápidamente el botón de **Bajar volumen**.
4. Mantener pulsado el botón lateral hasta que el iPhone entre en modo de recuperación (pantalla con cable y logo de Finder/iTunes).

**iPhone 7 / 7 Plus:**
1. Conectar el iPhone al ordenador.
2. Mantener pulsados simultáneamente el botón lateral y el botón de **Bajar volumen**.
3. Soltar cuando aparezca la pantalla de modo de recuperación.

**iPhone 6s, SE (1.ª generación) o anterior:**
1. Conectar el iPhone al ordenador.
2. Mantener pulsados simultáneamente el botón de **Inicio** y el botón lateral.
3. Soltar cuando aparezca la pantalla de modo de recuperación.

### Opciones en Finder / iTunes
- **Actualizar:** intenta reinstalar iOS conservando los datos. Recomendado como primera opción.
- **Restaurar:** reinstala iOS y borra todos los datos. Usar si "Actualizar" falla.

## Modo DFU (Device Firmware Update)

### Cuándo usarlo
- El modo de recuperación no funciona o no es detectado por el ordenador.
- Se necesita actualizar el firmware base del dispositivo (casos muy específicos).
- El iPhone no responde a ningún método de arranque.

### Cómo entrar en modo DFU

**iPhone 8 o posterior:**
1. Conectar el iPhone al ordenador.
2. Pulsar y soltar rápidamente **Subir volumen**.
3. Pulsar y soltar rápidamente **Bajar volumen**.
4. Mantener pulsado el botón lateral **10 segundos** (sin soltar).
5. Sin soltar el botón lateral, añadir **Bajar volumen** durante **5 segundos**.
6. Soltar solo el botón lateral, mantener **Bajar volumen** otros **5 segundos**.
7. La pantalla debe quedar **completamente negra** (sin logo de Apple ni cable). Si hay imagen, no entró en DFU.

**iPhone 7 / 7 Plus:**
1. Conectar al ordenador.
2. Mantener pulsados **lateral + Bajar volumen** durante **10 segundos**.
3. Soltar solo el botón lateral, mantener **Bajar volumen** 5 segundos más.

**iPhone 6s o anterior:**
1. Conectar al ordenador.
2. Mantener pulsados **Inicio + lateral** durante **10 segundos**.
3. Soltar solo el lateral, mantener **Inicio** 5 segundos más.

> La señal de modo DFU correcto: pantalla negra y Finder/iTunes detecta el iPhone en modo de recuperación.

## Salir del modo DFU sin restaurar
- Mantener pulsados los botones de reinicio forzado del modelo correspondiente hasta que el iPhone reinicie normalmente.

## Verificación
- Finder / iTunes muestra el mensaje de que el iPhone está en modo de recuperación.
- Tras la restauración: el iPhone inicia el asistente de configuración.
- La versión de iOS en Ajustes → General → Información refleja la versión instalada.

## Cuándo escalar
- Si el iPhone no es detectado en modo de recuperación ni en DFU por ningún ordenador con varios cables MFi: posible fallo de hardware en el puerto o en la placa.
- Si la restauración falla con un código de error específico de Apple (1, 4, 4013, 4014): hardware dañado; escalar a Apple Store o servicio autorizado.

## Advertencias
- El modo DFU borra todos los datos del iPhone sin excepción. Solo usar como último recurso.
- Usar cables certificados MFi: los cables de baja calidad pueden interrumpir el proceso.
- Tras la restauración, el Bloqueo de activación pedirá el Apple ID vinculado antes del restablecimiento: tener las credenciales disponibles.

## Fuentes
- https://support.apple.com/es-es/HT201263
- https://support.apple.com/es-es/111900

## Palabras clave
iPhone modo recuperación activar, iOS recovery mode, DFU mode iPhone, restaurar iPhone Finder iTunes, iPhone no arranca modo recuperación, iPhone bucle reinicio restaurar, modo DFU iPhone 8, modo DFU iPhone 7, modo DFU iPhone 6, actualizar iOS Finder modo recuperación, iPhone pantalla negra recovery, error restauración iPhone código
