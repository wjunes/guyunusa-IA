# Linux - Audio no funciona

## Metadatos

### id

st-audio-linux-no-funciona

### category

audio

### os

linux

### component

alsa-pipewire-pulseaudio

### difficulty

intermediate

### severity

medium

### source_type

official

### updated_at

2026-08-14

### version

1.1.0

### tags

audio, linux, sin-sonido, pipewire, pulseaudio

## Descripción

Guía de diagnóstico conversacional para resolver ausencia de sonido en Linux, incluyendo salida incorrecta, servicios de audio y controladores.

## Síntomas

- No hay sonido en ninguna aplicación.
- El sistema muestra dispositivo, pero no se escucha audio.
- Solo falla en auriculares o HDMI.
- Volumen visible, pero sin salida real.
- Micrófono o salida se desconectan al reiniciar.

## Causas posibles

- Dispositivo de salida incorrecto.
- Canal en mute o volumen bajo en mezclador.
- Servicio PipeWire o PulseAudio detenido.
- Driver del dispositivo de audio no cargado.
- Conflicto entre salidas HDMI, USB y analógica.

## Diagnóstico

### Preguntas guiadas

1. ¿Qué distribución Linux estás usando?
2. ¿El problema afecta a todas las aplicaciones?
3. ¿Qué salida estás usando (parlantes, auriculares, HDMI, USB)?
4. ¿Comenzó después de actualizar sistema o kernel?
5. ¿El dispositivo aparece en configuración de sonido?

## Solución básica

1. Verificar volumen general y que no esté en mute.
2. Confirmar salida correcta en configuración de audio.
3. Probar otro dispositivo de salida (auriculares o parlantes).
4. Reiniciar sesión o equipo.
5. Probar audio con archivo local y navegador.

## Solución intermedia

1. Revisar mezclador y canales activos.
2. Reiniciar servicio de audio del sistema.
3. Confirmar detección del hardware de audio.
4. Revisar si HDMI está tomando prioridad de salida.
5. Actualizar paquetes de audio desde repositorios oficiales.

## Solución avanzada

1. Validar módulos del kernel para el chipset de audio.
2. Revisar logs del sistema para errores de audio.
3. Probar kernel estable alternativo de la distribución.
4. Reconfigurar stack de audio (PipeWire/PulseAudio) según guía oficial.
5. Escalar con datos de hardware y logs si persiste.

## Verificación

- Se escucha sonido en prueba del sistema.
- Se escucha audio en apps locales y web.
- La salida correcta permanece tras reinicio.
- No reaparecen errores del servicio de audio.

## Cuándo escalar

- El dispositivo no aparece en el sistema.
- El problema persiste tras reinicio de servicios y actualización.
- Hay fallas repetidas luego de cambiar kernel/driver.
- Se sospecha daño físico del codec o placa.

## Riesgos y advertencias

- No instalar drivers desde fuentes no oficiales.
- No aplicar cambios de kernel sin respaldo.
- Documentar ajustes para poder revertir.

## Fuentes

- https://ubuntu.com/support
- https://help.ubuntu.com/
- https://wiki.debian.org/
- https://docs.fedoraproject.org/

## Palabras clave

linux sin sonido, audio linux no funciona, pipewire, pulseaudio, alsa, salida hdmi, dispositivo de audio