# Estrategia Capacitor para Guyunusa Mobile

## Concepto central

Igual que Electron envuelve el frontend web en un contenedor desktop,
**Capacitor lo envuelve en un contenedor nativo Android/iOS**. El mismo
código HTML/CSS/JS que ya funciona en el navegador se renderiza dentro
de un WebView nativo, con acceso a APIs del dispositivo.

Como el frontend de Guyunusa ya tiene excelente responsividad y ya detecta
la plataforma (`Platform.isCapacitor`), gran parte del trabajo está hecho.

---

## Arquitectura: dos modos de conexión

### Modo A — WebView remoto (recomendado para empezar)
La app Capacitor carga la URL de producción directamente:
```
https://guyunusa.uy
```
- **Ventaja:** actualizás la web y todos los usuarios ven los cambios sin
  reinstalar la app. Cero fricción de deploys.
- **Ventaja:** el build de la app casi nunca cambia → menos publicaciones
  en Play Store.
- **Desventaja:** requiere conexión siempre (pero es una app de chat IA,
  igual la necesita).

### Modo B — Assets empaquetados (para más adelante)
El frontend se copia dentro de la app (`webDir`), y solo las llamadas API
van al servidor.
- **Ventaja:** carga inicial más rápida, funciona parcialmente offline.
- **Desventaja:** cada cambio de UI requiere rebuild + republicar en Play Store.

**Decisión:** arrancamos con **Modo A** para el beta. Migramos a Modo B
cuando la UI esté estable y queramos optimizar carga.

---

## Plan de implementación por fases

### Fase 1 — Setup base
1. Instalar Capacitor en el proyecto
   ```
   npm install @capacitor/core @capacitor/cli
   npx cap init Guyunusa uy.guyunusa.app
   ```
2. Configurar `capacitor.config.json`:
   - `appId: uy.guyunusa.app` (mismo que ya usa el botón Play Store)
   - `appName: Guyunusa`
   - `server.url: https://guyunusa.uy` (Modo A)
3. Agregar plataforma Android
   ```
   npm install @capacitor/android
   npx cap add android
   ```

### Fase 2 — Plugins nativos esenciales
Instalar solo los que Guyunusa realmente usa:
- `@capacitor/splash-screen` — pantalla de carga con logo
- `@capacitor/status-bar` — color de barra de estado (azul patrio)
- `@capacitor/keyboard` — manejo del teclado (que no tape el input)
- `@capacitor/app` — botón atrás de Android, deep links
- `@capacitor/haptics` — vibración (ya se usa `vibrate()` en el código)

### Fase 3 — Ajustes de detección de plataforma
El código ya tiene `Platform.isCapacitor`. Verificar que:
- El STT (micrófono) pida permisos nativos correctamente
- El botón "Descargar Windows" siga oculto (ya lo hace)
- El botón Play Store siga oculto en la app (ya lo hace)
- La URL de API apunte bien (ya detecta Capacitor → https://guyunusa.uy)
- El botón atrás de Android cierre el sidebar/modales antes de salir

### Fase 4 — Permisos Android (AndroidManifest.xml)
- INTERNET (obvio)
- RECORD_AUDIO (para el STT del micrófono)
- Configurar `usesCleartextTraffic` solo si hiciera falta (no, usamos HTTPS)

### Fase 5 — Branding nativo
- Ícono de la app (adaptive icon: foreground + background)
- Splash screen con el Sol de Mayo / logo Guyunusa
- Nombre "Guyunusa" bajo el ícono
- Color de tema en la barra de estado

### Fase 6 — Build y prueba
```
npm run build          # si hay build del frontend
npx cap sync android   # copia web + plugins al proyecto Android
npx cap open android   # abre Android Studio
```
- Probar en emulador y dispositivo real
- Generar APK de debug para pruebas
- Verificar: login, chat streaming, STT, sidebar drawer, temas

### Fase 7 — Publicación Play Store
- Generar keystore de firma (¡guardar seguro, no versionar!)
- Build de release firmado (AAB — Android App Bundle)
- Cuenta de Google Play Console (pago único ~$25 USD)
- Ficha de la app: capturas, descripción, ícono, categoría
- Revisar políticas (privacidad, permisos justificados)

---

## Ventajas de este enfoque para Guyunusa

1. **Un solo código** para web, desktop (Electron) y mobile (Capacitor)
2. **Mantenimiento mínimo** — un fix en el frontend beneficia a las 3 plataformas
3. **La responsividad ya está** — el drawer mobile, los breakpoints, todo
   ya funciona
4. **Detección de plataforma ya implementada** — `Platform.isCapacitor`
5. **En Modo A**, actualizás la web y la app mobile se actualiza sola

---

## Puntos de atención específicos

- **Teclado Android:** el input no debe quedar tapado. El plugin Keyboard
  + ajuste de viewport lo resuelve.
- **STT permisos:** la primera vez, Android pide permiso de micrófono.
  Manejar el caso "denegado" con mensaje claro (ya existe en inputBar.js).
- **Botón atrás:** interceptarlo para cerrar drawer/modal en vez de salir.
- **SSE streaming en WebView:** verificar que el streaming funcione dentro
  del WebView de Android (generalmente sí, pero hay que probar).
- **Safe areas:** notch y barra de navegación — usar `env(safe-area-inset-*)`
  (el CSS ya usa `--safe-bottom` en algunos lugares).

---

## Orden sugerido de trabajo

Cuando retomemos con el RAR:
1. Fase 1 + 2 (setup + plugins) — una sesión
2. Fase 3 + 4 (ajustes plataforma + permisos) — una sesión
3. Fase 5 (branding) — una sesión
4. Fase 6 (build + prueba en dispositivo) — iterativo
5. Fase 7 (publicación) — cuando esté todo probado
