# Windows 11 - Aplicación no abre

## Metadatos

### id

st-software-w11-app-no-abre

### category

software

### os

windows-11

### component

application-runtime

### difficulty

basic

### severity

medium

### source_type

official

### updated_at

2026-08-14

### version

1.1.0

### tags

software, aplicacion, no-abre

## Descripción

Guía de diagnóstico conversacional para cuando una aplicación no abre, se cierra al iniciar o queda congelada en Windows 11.

## Síntomas

- La app no inicia al hacer doble clic.
- Se abre y se cierra inmediatamente.
- Queda en pantalla de carga sin avanzar.
- Muestra error de permisos o archivo faltante.
- Solo falla en un usuario o en todas las cuentas.

## Causas posibles

- Instalación dañada o incompleta.
- Dependencias faltantes (runtime/librerías).
- Permisos insuficientes o bloqueo por seguridad.
- Conflicto tras actualización de Windows o de la app.
- Perfil de usuario corrupto o caché dañada.

## Diagnóstico

### Preguntas guiadas

1. ¿La falla ocurre en una sola app o en varias?
2. ¿Empezó después de una actualización o instalación reciente?
3. ¿Aparece mensaje de error concreto?
4. ¿La app abre con otro usuario del equipo?
5. ¿La app fue instalada desde fuente oficial?

## Solución básica

1. Reiniciar Windows.
2. Ejecutar la app como administrador (solo prueba).
3. Verificar fecha/hora del sistema.
4. Revisar si hay actualizaciones de la app.
5. Reparar o restablecer la app desde Configuración.

## Solución intermedia

1. Reinstalar la app desde fuente oficial.
2. Limpiar caché local de la aplicación.
3. Verificar exclusiones de antivirus/seguridad si hay bloqueo.
4. Instalar dependencias requeridas por la app (desde origen oficial).
5. Probar en un perfil de usuario nuevo.

## Solución avanzada

1. Revisar Visor de eventos para error de aplicación.
2. Ejecutar comprobación del sistema:
   - `sfc /scannow`
3. Reparar imagen del sistema:
   - `DISM /Online /Cleanup-Image /RestoreHealth`
4. Validar conflictos con servicios de terceros en arranque limpio.
5. Escalar con logs de error y versión exacta de app/Windows.

## Verificación

- La aplicación abre y opera sin cierres inesperados.
- No reaparecen errores al reiniciar el sistema.
- Funciona en tareas normales durante varios minutos.

## Cuándo escalar

- Persiste tras reinstalación oficial y reparación del sistema.
- La app falla en múltiples equipos con la misma versión.
- Hay errores críticos repetidos en eventos del sistema.
- Se sospecha incompatibilidad profunda con build de Windows.

## Riesgos y advertencias

- No descargar instaladores de sitios no oficiales.
- No desactivar seguridad del sistema de forma permanente.
- Respaldar datos antes de reinstalaciones complejas.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 11 app no abre, aplicacion se cierra, reparar aplicacion, reinstalar app, visor de eventos, sfc scannow, dism restorehealth