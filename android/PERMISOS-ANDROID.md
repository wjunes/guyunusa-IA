# Permisos Android — Guyunusa

Después de correr `npx cap add android`, hay que agregar el permiso de
micrófono para que funcione el dictado por voz (STT).

## 1. Editar AndroidManifest.xml

Ruta:
```
android/android/app/src/main/AndroidManifest.xml
```

Agregar estos permisos **antes** de la etiqueta `<application>`:

```xml
<!-- Internet (ya viene por defecto, pero confirmá que esté) -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Micrófono para dictado por voz (STT) -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- Estado de red (para el monitor de conexión) -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## 2. Verificar que el WebView permita micrófono

El WebView de Capacitor debe conceder el permiso cuando la web lo pide.
Esto ya lo maneja el plugin, pero si el micrófono no funciona, verificá
que en `MainActivity.java` no haya restricciones extra.

## 3. Permiso en tiempo de ejecución

El código de `inputBar.js` ya solicita el permiso via `getUserMedia()`
cuando el usuario toca el botón de micrófono por primera vez. Android
muestra el diálogo nativo de permiso automáticamente.

Si el usuario **niega** el permiso:
- El botón muestra un aviso: "Necesito permiso de micrófono. Activalo en los ajustes de la app."
- El usuario puede reactivarlo desde: Ajustes de Android → Apps → Guyunusa → Permisos → Micrófono

## 4. Rebuild después de cambiar el manifest

```bash
cd android
npx cap sync android
npx cap open android
```
En Android Studio: rebuild y correr de nuevo.

---

## Nota sobre STT en WebView

El Web Speech API (`webkitSpeechRecognition`) funciona en el WebView de
Chrome de Android que usa Capacitor. Requiere:
- Permiso RECORD_AUDIO (este documento)
- Conexión a internet (el reconocimiento de Google es en la nube)

Si en algún dispositivo el Web Speech API no estuviera disponible, el
botón de micrófono se oculta automáticamente (el código ya lo maneja).
Como alternativa futura para mayor compatibilidad, se podría integrar el
plugin `@capacitor-community/speech-recognition`.
