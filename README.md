# Guyunusa IA Uruguaya

> Asistente de inteligencia artificial con identidad uruguaya — web, desktop y móvil.

---

## Características implementadas

- **Chat con IA en streaming** — respuestas en tiempo real via Server-Sent Events (SSE)
- **Syntax highlighting** — bloques de código coloreados con highlight.js v11.10.0, robusto frente a demoras de CDN
- **Upload de archivos** — el usuario sube archivos para que la IA los analice, modifique y devuelva
  - Texto y código fuente (50+ extensiones)
  - PDF (`pdf-parse@1.1.1`)
  - Word / DOCX (`mammoth`)
  - Límite: 10 MB, hasta 30 000 caracteres de contexto
- **Autenticación** — registro/login propio + OAuth con Google
- **Multiidioma** — Español, English, Português
- **Tema claro / oscuro** — persiste entre sesiones, sin flash al cargar
- **Avatar** — upload con recorte integrado
- **Sidebar** — historial de conversaciones, redimensionable
- **Compartir** — modal para compartir conversaciones
- **Rate limiting** — protección de endpoints en producción
- **Pagos** *(integración parcial)* — MercadoPago y PayPal (webhooks pendientes)
- **App desktop** — Electron (Windows, macOS, Linux)
- **App móvil** — Capacitor / Android *(en preparación)*

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Vanilla JS (ES Modules, sin bundler), CSS ITCSS |
| Backend | Node.js + Express.js |
| Base de datos | MySQL (producción) · SQLite/sql.js (desarrollo) |
| IA | API externa (servicio configurable via `.env`) |
| Autenticación | JWT + Google OAuth 2.0 |
| Upload | Multer |
| Streaming | Server-Sent Events (SSE) |
| Highlighting | highlight.js v11.10.0 |
| Desktop | Electron |
| Móvil | Capacitor (Android / iOS) |

---

## Estructura del proyecto

```
guyunusa-IA/
├── backend/
│   ├── src/
│   │   ├── controllers/        # auth, chat, payment, user
│   │   ├── db/                 # conexión, migraciones, schema
│   │   ├── middleware/         # auth, error, rateLimit, upload
│   │   ├── routes/             # auth, chat, downloads, payment, story, user
│   │   ├── services/           # ai, auth, avatar, chat, google, mercadopago, paypal
│   │   └── utils/              # crypto, logger
│   ├── uploads/                # avatars (gitignored, excepto .gitkeep)
│   ├── data/                   # base de datos SQLite (desarrollo)
│   ├── scripts/                # check-env, db-reset
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/                    # Arquitectura ITCSS (7 capas)
│   │   ├── 1-settings/
│   │   ├── 2-tools/
│   │   ├── 3-generic/
│   │   ├── 4-elements/
│   │   ├── 5-objects/
│   │   ├── 6-components/
│   │   └── 7-trumps/
│   ├── js/
│   │   ├── components/         # chatWindow, messageItem, inputBar, header, sidebar…
│   │   ├── modules/            # router, store, eventBus, i18n, theme…
│   │   ├── pages/              # chatPage, loginPage, registerPage, settingsPage
│   │   ├── services/           # api, auth, chat, googleAuth, storage
│   │   └── utils/              # markdown, messageFormat, highlighter, dom, helpers
│   ├── i18n/                   # es.js · en.js · pt.js
│   ├── assets/
│   └── index.html
│
├── desktop/                    # Electron
│   ├── main.js
│   ├── preload.js
│   └── package.json
│
├── android/                    # Capacitor
│   ├── capacitor.config.json
│   └── package.json
│
└── docs/
    ├── DEVELOPMENT.md
    ├── FIX-WINDOWS-INSTALL.md
    └── historia-guyunusa.md
```

---

## Requisitos

- Node.js ≥ 18
- npm ≥ 9
- MySQL 8+ (producción) o SQLite (desarrollo, sin configuración extra)
- Cuenta en el proveedor de IA configurado

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd guyunusa-IA
```

### 2. Configurar variables de entorno

```bash
cp .env.example backend/.env
```

Editar `backend/.env` con los valores correspondientes:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=guyunusa
DB_USER=root
DB_PASSWORD=

# JWT
JWT_SECRET=tu_secreto_aqui

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# IA
AI_API_KEY=
AI_API_URL=
AI_MODEL=

# Pagos (opcional)
MERCADOPAGO_ACCESS_TOKEN=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

### 3. Instalar dependencias del backend

```bash
cd backend
npm ci
```

> Para soporte de PDF y DOCX (opcional):
> ```bash
> npm install pdf-parse@1.1.1 mammoth
> ```

### 4. Inicializar la base de datos

```bash
npm run db:reset    # crea tablas y datos iniciales
```

### 5. Verificar configuración

```bash
npm run check:env
```

---

## Correr en desarrollo

```bash
# Desde /backend
npm run dev
```

El frontend se sirve estático desde Express. Abrir `http://localhost:3000`.

---

## Deploy a producción

```bash
cd backend
npm ci --omit=dev
NODE_ENV=production node server.js
```

> Se recomienda usar `npm ci` (no `npm install`) para deploys deterministas.

---

## App desktop — Electron

```bash
cd desktop
npm install
npm start          # desarrollo
npm run build      # generar ejecutable
```

---

## App móvil — Capacitor / Android

```bash
cd android
npm install
npx cap sync
npx cap open android   # abre Android Studio
```

> iOS requiere Mac con Xcode y cuenta Apple Developer.

---

## Scripts disponibles (backend)

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor con hot-reload |
| `npm start` | Servidor producción |
| `npm run check:env` | Valida variables de entorno |
| `npm run db:reset` | Reinicia la base de datos |

---

## Módulos frontend relevantes

| Archivo | Responsabilidad |
|---|---|
| `utils/markdown.js` | Parser de Markdown a HTML con soporte de bloques de código |
| `utils/highlighter.js` | Syntax highlighting con cola — tolerante a carga tardía de CDN |
| `utils/messageFormat.js` | Re-exporta `highlightCodeBlocks` desde `highlighter.js` |
| `components/chatWindow.js` | Rendering del chat, streaming SSE, finalización de respuesta |
| `components/messageItem.js` | Burbuja individual de mensaje con highlighting |
| `components/inputBar.js` | Barra de entrada con attach de archivos |
| `modules/router.js` | SPA router sin bundler |
| `modules/store.js` | Estado global reactivo |
| `modules/eventBus.js` | Comunicación entre componentes |

---

## Notas técnicas

**pdf-parse**: se debe instalar la versión `1.1.1` específicamente. Las versiones posteriores tienen un campo `exports` en `package.json` que bloquea el acceso interno y rompe la integración con ESM via `createRequire`.

**Highlighting en producción**: highlight.js se carga desde CDN (cdnjs con fallback a jsdelivr). El módulo `highlighter.js` encola los elementos si hljs aún no cargó y los procesa automáticamente cuando la librería está disponible, eliminando la condición de carrera.

**SSE y streaming**: el backend usa `text/event-stream` para enviar tokens de la IA en tiempo real. El frontend acumula el buffer y solo aplica highlighting al finalizar el stream (`finalizeStream`), no durante.

**Archivos subidos**: el contenido extraído de los archivos **no se guarda en la base de datos** (para evitar bloat). Se inyecta al array de mensajes de la IA solo durante la llamada a la API, de forma efímera.

---

## Roadmap

- [ ] Completar integración de pagos — MercadoPago (webhooks + verificación de firma)
- [ ] Completar integración de pagos — PayPal
- [ ] App móvil Android — build y publicación en Play Store
- [ ] App móvil iOS — build y publicación en App Store
- [ ] App desktop — builds para Windows, macOS y Linux

---

## Licencia

Uso privado. Todos los derechos reservados.
