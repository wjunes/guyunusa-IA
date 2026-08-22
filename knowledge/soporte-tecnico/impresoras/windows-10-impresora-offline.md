# Windows 10 - Impresora offline

## Metadatos

### id

st-impresoras-w10-offline

### category

impresoras

### os

windows-10

### component

printer-spooler-driver

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

impresoras, windows-10, offline, cola-impresion

## Descripción

Guía de diagnóstico conversacional para cuando una impresora aparece offline o no imprime en Windows 10.

## Nota de vigencia de soporte

El estado de soporte de Windows 10 y la disponibilidad de actualizaciones pueden variar según edición, licencia, canal y programa ESU.

Antes de recomendar una acción, verificar siempre el estado oficial vigente en Microsoft para la fecha de atención.

## Síntomas

- La impresora figura como sin conexión.
- Los trabajos quedan en cola y no se imprimen.
- Error al enviar impresión desde aplicaciones.
- La impresora imprime desde otro equipo, pero no desde este.

## Causas posibles

- Servicio de cola de impresión detenido.
- Puerto o conexión incorrecta.
- Driver dañado o incompatible.
- Impresora en modo “usar sin conexión”.
- Problema de red local en impresoras Wi-Fi/Ethernet.

## Diagnóstico

### Preguntas guiadas

1. ¿La impresora es USB, Wi-Fi o red cableada?
2. ¿Ocurre con todos los documentos?
3. ¿Imprime desde otro equipo?
4. ¿Empezó tras actualización o cambio de red?
5. ¿Aparece error en cola de impresión?

## Solución básica

1. Verificar encendido y estado físico de impresora.
2. Reiniciar impresora y equipo.
3. Desactivar “usar impresora sin conexión”.
4. Establecer impresora correcta como predeterminada.
5. Limpiar cola y reenviar página de prueba.

## Solución intermedia

1. Reiniciar servicio Print Spooler.
2. Quitar y volver a agregar la impresora.
3. Verificar puerto asignado en propiedades.
4. Ejecutar solucionador de impresoras.
5. Validar conectividad IP si es de red.

## Solución avanzada

1. Reinstalar driver desde fabricante oficial.
2. Limpiar cola de impresión completa y reiniciar servicio.
3. Asignar IP fija o reserva DHCP en red local.
4. Validar compatibilidad de driver con versión de Windows 10.
5. Escalar con logs y evidencia técnica.

## Verificación

- La impresora aparece online/lista.
- La página de prueba se imprime correctamente.
- La cola se vacía sin errores.
- Funciona desde aplicaciones habituales.

## Cuándo escalar

- Persiste offline tras reinstalación de driver oficial.
- Falla en múltiples equipos de la misma red.
- Hay indicios de fallo físico del equipo de impresión.
- No hay certeza documental sobre cobertura de soporte/ESU.

## Riesgos y advertencias

- No instalar drivers desde sitios no oficiales.
- No modificar firmware sin guía oficial.
- No afirmar fechas de soporte sin validación oficial vigente.

## Fuentes

- https://support.microsoft.com/windows
- https://learn.microsoft.com/windows/

## Palabras clave

windows 10 impresora offline, cola de impresion, print spooler, impresora sin conexion, driver impresora

