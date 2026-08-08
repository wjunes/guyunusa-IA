# Guyunusa Android — Capacitor 6

## Requisitos previos
- Node.js 18+
- Android Studio (Hedgehog o superior)
- Android SDK 24+ (Android 7.0 mínimo)
- Java JDK 17

## Instalación inicial (proyecto ya creado)

```bash
cd android
npm install
npm run sync
```

> `npm run sync` ejecuta `npx cap sync android` y luego
> `node scripts/generate-icons.js` para restaurar los íconos propios.

## Flujo de trabajo diario

```bash
# Después de cambiar código del frontend:
cd android
npm run sync

# Abrir Android Studio para compilar/testear:
npx cap open android

# O correr directamente en dispositivo/emulador:
npx cap run android
```

## Estructura generada por Capacitor

```text
android/
├── capacitor.config.json   ← configuración principal
├── package.json
├── android/                ← proyecto Android Studio (generado)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/uy/guyunusa/app/
│   │   │   │   └── MainActivity.java
│   │   │   ├── res/
│   │   │   │   ├── drawable/      ← íconos y splash
│   │   │   │   ├── values/        ← colores y strings
│   │   │   │   └── xml/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   └── build.gradle
└── node_modules/
```

## Íconos de la app (importante para release)

Capacitor puede sobrescribir íconos en `cap sync`. Para evitar que el AAB
salga con íconos por defecto, este repo usa:

- Fuente: `android/icons/guyunusa.png`
- Script: `android/scripts/generate-icons.js`
- Comando recomendado: `npm run sync`

Comandos útiles:

```bash
cd android
npm run icons   # regenera solo íconos
npm run sync    # cap sync + íconos
```

## Build de release (APK / AAB para Play Store)

```bash
# 1. Generar keystore (una sola vez)
keytool -genkey -v \
  -keystore guyunusa-release.keystore \
  -alias guyunusa \
  -keyalg RSA -keysize 2048 \
  -validity 10000

# 2. En Android Studio:
#    Build → Generate Signed Bundle / APK
#    Elegir Android App Bundle (.aab) para Play Store

# 3. O desde línea de comandos:
cd android/android
./gradlew bundleRelease
# El .aab queda en: app/build/outputs/bundle/release/
```

En Windows, también podés usar:

```bash
cd android/android
gradlew.bat bundleRelease
```

## Variables de entorno para la API

En producción, el frontend apunta a `https://guyunusa.uy`.
En desarrollo, Capacitor puede usar el servidor local:

```json
// capacitor.config.json — SOLO para desarrollo local
"server": {
  "url": "http://192.168.1.X:3000",
  "cleartext": true
}
```

Revertir antes de hacer build de release.
