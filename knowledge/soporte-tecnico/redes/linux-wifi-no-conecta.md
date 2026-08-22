# Linux - Wi-Fi no conecta

## Metadatos

### id

st-redes-linux-wifi-no-conecta

### category

redes

### os

linux

### component

wifi-adapter-networkmanager

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

redes, linux, wifi, sin-internet

## Descripción

Guía de diagnóstico conversacional para resolver cuando Linux no conecta a Wi‑Fi, se desconecta o muestra conexión sin acceso a Internet.

## Síntomas

- No aparecen redes Wi‑Fi disponibles.
- Se conecta pero no navega.
- Desconexiones frecuentes.
- Contraseña correcta pero falla autenticación.
- Adaptador inalámbrico no detectado por el sistema.

## Causas posibles

- Adaptador deshabilitado por software o hardware.
- Driver/firmware faltante o incompatible.
- Perfil de red dañado.
- DNS o configuración IP incorrecta.
- Conflicto con ahorro de energía o administración de red.

## Diagnóstico

### Preguntas guiadas

1. ¿Qué distribución Linux estás usando?
2. ¿El problema afecta solo esa red o todas?
3. ¿La red aparece en el listado?
4. ¿Comenzó después de actualización del sistema?
5. ¿Con cable Ethernet funciona Internet?

## Solución básica

1. Reiniciar equipo y router.
2. Activar y desactivar Wi‑Fi desde interfaz de red.
3. Olvidar red y volver a conectarse.
4. Verificar fecha y hora del sistema.
5. Confirmar que modo avión esté desactivado.

## Solución intermedia

1. Verificar estado del adaptador de red.
2. Reiniciar NetworkManager.
3. Renovar IP y revisar DNS.
4. Probar conectividad local y externa.
5. Revisar si el firmware del adaptador está instalado.

## Solución avanzada

1. Identificar chipset del adaptador y validar driver oficial del kernel/distribución.
2. Revisar logs de red para errores de autenticación o firmware.
3. Desactivar ahorro de energía del adaptador para prueba.
4. Probar kernel alternativo estable de la distribución.
5. Escalar con logs y datos de hardware si persiste.

## Verificación

- El equipo se conecta de forma estable.
- Obtiene IP válida.
- Resuelve DNS correctamente.
- Navegación y descargas funcionan sin cortes.

## Cuándo escalar

- El adaptador no aparece en el sistema.
- Fallan múltiples redes pese a reinstalar firmware/driver.
- Persisten desconexiones graves con diferentes kernels.
- Hay indicios de fallo físico del adaptador.

## Riesgos y advertencias

- No instalar controladores desde fuentes no confiables.
- Evitar cambios de kernel/firmware sin respaldo.
- Documentar cambios para poder revertirlos.

## Fuentes

- https://ubuntu.com/support
- https://help.ubuntu.com/
- https://wiki.debian.org/
- https://docs.fedoraproject.org/

## Palabras clave

linux wifi no conecta, networkmanager, firmware wifi, sin internet, dns linux, adaptador inalambrico