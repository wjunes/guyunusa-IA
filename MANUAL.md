# Manual operativo — Guyunusa IA

Este archivo centraliza **qué documento usar para cada tarea**.

## Lectura rápida por objetivo

- **Visión general del proyecto:** `README.md`
- **Arquitectura técnica detallada:** `docs/ARQUITECTURA.md`
- **Flujo de desarrollo local:** `docs/DEVELOPMENT.md`
- **Instalación Windows (usuarios):** `docs/GUIA-INSTALACION-WINDOWS.md`
- **Troubleshooting instalación Windows:** `docs/FIX-WINDOWS-INSTALL.md`
- **Contexto histórico del producto:** `docs/historia-guyunusa.md`

## Operación Android (Capacitor)

- Guía Android: `android/README-ANDROID.md`
- Estrategia de implementación: `android/ESTRATEGIA-CAPACITOR.md`
- Permisos Android/STT: `android/PERMISOS-ANDROID.md`

### Comandos recomendados (Android)

```bash
cd android
npm install
npm run sync
npx cap open android
```

> `npm run sync` es el flujo recomendado porque ejecuta `cap sync` y
> regenera íconos desde `android/icons/guyunusa.png`.

## Convenciones rápidas

- Mantener documentación y scripts sincronizados.
- Si cambia un comando en `package.json`, actualizar los docs afectados.
- Evitar duplicar información extensa: usar este manual como índice y
  enlazar al documento fuente.
