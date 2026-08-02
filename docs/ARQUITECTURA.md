# Arquitectura de Guyunusa IA — v2.0

Última actualización: julio 2026
Desarrollado por Willans Junes · Algoritmos.uy · Montevideo, Uruguay

---

## Visión general

Guyunusa es una aplicación de chat con inteligencia artificial, con identidad
uruguaya profunda. Funciona como web app, app Android (Capacitor) y app de
escritorio (Electron), todas conectadas al mismo backend.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Vanilla HTML/CSS (ITCSS) / JS ES Modules — sin frameworks |
| Backend | Node.js + Express |
| Base de datos | MySQL (mysql2) en cPanel |
| IA principal | DeepSeek V4 Pro (API directa) |
| IA failover | OpenRouter → Gemma 2 9B (gratuito) |
| Knowledge (RAG) | Sistema propio keyword-based, sin embeddings |
| Android | Capacitor 6 — Modo A (WebView remoto) |
| Desktop | Electron 1.1.0 — WebView remoto |
| Hosting | cPanel compartido (guyunusa.uy) |
| Pagos | MercadoPago Checkout Pro |

## Plataformas

| Plataforma | Modo | URL/Config |
|-----------|------|-----------|
| Web | Directo | https://guyunusa.uy |
| Android | Capacitor Modo A | WebView carga guyunusa.uy |
| Desktop | Electron | WebView carga guyunusa.uy?electron=1 |

Las tres plataformas cargan el frontend desde el servidor. Al actualizar
archivos en producción, todas las plataformas se actualizan sin rebuild.

## Estructura del proyecto

```
guyunusa-IA/
├── backend/
│   ├── server.js                    # Punto de entrada, health checks, middleware
│   ├── .env                         # Variables de entorno (no versionado)
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js   # Login, registro, Google Auth
│       │   ├── chat.controller.js   # Chat streaming, continuación automática
│       │   ├── payment.controller.js# MercadoPago, PayPal
│       │   └── user.controller.js   # Perfil, cambio/creación de contraseña
│       ├── services/
│       │   ├── ai.service.js        # Proveedores IA, failover, timeout inteligente
│       │   ├── knowledge.service.js # RAG: indexación y búsqueda en BNC-UY
│       │   ├── usage.service.js     # Registro y verificación de cuota de tokens
│       │   ├── mercadopago.service.js # Checkout Pro
│       │   └── google.service.js    # Verificación de tokens de Google
│       ├── db/
│       │   ├── database.js          # Conexión MySQL, migraciones
│       │   └── schema.sql           # Tablas: users, conversations, messages, token_usage
│       ├── middleware/
│       │   ├── auth.middleware.js    # JWT verification
│       │   └── upload.middleware.js  # Multer para avatares y archivos
│       └── routes/
│           ├── auth.routes.js
│           ├── chat.routes.js       # Incluye /quota
│           ├── payment.routes.js
│           └── user.routes.js
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── main.css                 # Imports ITCSS
│   │   └── 6-components/           # Estilos por componente
│   └── js/
│       ├── app.js                   # Store, router, inicialización
│       ├── pages/
│       │   ├── chatPage.js          # Chat principal, streaming, continuación
│       │   ├── loginPage.js         # Login + Google + toast contraseña
│       │   ├── registerPage.js      # Registro + términos
│       │   └── settingsPage.js      # Perfil, plan, contraseña, upgrade
│       ├── components/
│       │   ├── messageItem.js       # Burbujas de chat + copiar + compartir
│       │   ├── sidebar.js           # Historial + limpiar historial
│       │   ├── paymentModal.js      # Modal de upgrade (MP + PayPal)
│       │   ├── termsModal.js        # Términos y Política de Privacidad
│       │   └── shareModal.js        # Compartir conversación
│       ├── services/
│       │   ├── chat.js              # Streaming SSE, getQuota
│       │   ├── api.js               # HTTP client con JWT
│       │   ├── auth.js              # Login/logout, token management
│       │   └── googleAuth.js        # Google Identity Services + FedCM
│       └── modules/
│           ├── native.js            # Detección Capacitor/Electron, share
│           ├── store.js             # Store reactivo en memoria
│           └── i18n.js              # Internacionalización
├── shared/
│   ├── constants.js                 # Config centralizada: planes, tokens, errores
│   └── systemPrompt.js             # Identidad de Guyunusa (11.104 chars)
├── knowledge/                       # BNC-UY — Base Nacional de Conocimiento
│   ├── cultura/                     # 75 docs
│   ├── deportes/                    # 12 docs
│   ├── economia/                    # 27 docs
│   ├── instituciones/               # 50 docs
│   ├── standalone/                  # 445 docs en 20 subdominios
│   └── docs/README.md              # Documentación de la BNC-UY
├── android/                         # Configuración Capacitor
├── desktop/                         # Configuración Electron
└── docs/                            # Documentación del proyecto
```

---

## Sistema de IA

### Proveedores y failover

Orden: DeepSeek V4 Pro → OpenRouter (Gemma 2 9B:free).
Si DeepSeek falla (timeout, error, API caída), cambia automáticamente al failover.

### Timeout inteligente

El timeout de conexión (30s) solo aplica al fetch inicial. Una vez que el
streaming empieza, el timer se cancela — no hay límite de tiempo para el
streaming en curso. Heartbeat cada 15s mantiene la conexión SSE viva en Apache.

### Continuación automática

Cuando la respuesta alcanza max_tokens (finish_reason: 'length'):
1. Verifica cuota disponible
2. Envía evento SSE 'continuing' al frontend
3. Llama al modelo con instrucciones anti-repetición
4. Repite hasta completar o agotar continuaciones (free: 2, pro: 5)

### Guardado parcial

Si el streaming falla después de recibir contenido, la respuesta parcial
se guarda en la DB. El usuario no pierde lo que ya recibió.

---

## Base Nacional de Conocimiento Uruguayo (BNC-UY)

### Arquitectura RAG

Sistema ligero sin embeddings ni base vectorial (compatible con cPanel):
- Indexación en memoria al arrancar el servidor (~580ms)
- Scoring por keywords, título y cuerpo del documento
- Dual parser: YAML frontmatter (BNC-UY) + Markdown puro (standalone)
- Auto-expansión: carpeta nueva con .md = indexación automática

### Estadísticas

| Métrica | Valor |
|---------|-------|
| Total documentos indexados | 1.200 |
| Dominios standalone | 52 |
| Tiempo de indexación | ~600ms |
| Tiempo por consulta | ~2ms |

### Dominios (52 — todos markdown puro, auto-expansible)

administración pública y estadísticas, aduanas, afrodescendientes,
agro, agua y saneamiento, archivos históricos, arqueología,
arquitectura, básquetbol, bibliotecas, ciencias, clima y meteorología,
comercio exterior, cooperativismo, cultura, defensa del consumidor,
defensa nacional, departamentos, deportes, derechos humanos,
desarrollo social e inclusión, documentación oficial,
economía finanzas e impuestos, educación, educación superior,
educación técnica, energía, gastronomía, geografía, gobierno digital,
historia, justicia, medio ambiente, movilidad y transporte,
naturaleza, oceanografía, patrimonio, pueblos originarios,
relaciones internacionales, salud, seguridad pública,
seguridad social, servicio civil, SINAE (emergencias),
sindicalismo, sistema financiero, sistema político,
tecnología, telecomunicaciones, transparencia, turismo, vivienda

### Guard de identidad

Preguntas sobre el origen/creador de Guyunusa NO inyectan documentos.
La respuesta correcta ya está en el system prompt.

### Stopwords de dominio

uruguay/uruguayo/uruguaya excluidos de búsqueda (no discriminan
en una base 100% uruguaya).

### Endpoint de diagnóstico RAG

```
GET /api/v1/health/rag?q=tu+consulta
```

Devuelve los documentos encontrados, scores y preview del contenido.
Útil para verificar que una consulta específica encuentra los docs correctos.

---

## Gestión de tokens y planes

### Configuración centralizada (shared/constants.js)

| Parámetro | Free | Pro | Admin |
|-----------|------|-----|-------|
| dailyTokenLimit | 50.000 | 500.000 | Ilimitado |
| maxOutputTokens | 2.048 | 8.192 | 8.192 |
| maxContextTokens | 12.000 | 32.000 | 32.000 |
| maxAutoContinuations | 2 | 5 | 10 |
| maxHistoryMessages | 10 | 20 | 30 |
| connectionTimeoutMs | 30s | 30s | 30s |

### Flujo de verificación de cuota

1. prepareChat() → checkQuota(userId, plan)
2. Si no hay cuota → error 429 → modal de upgrade (no error técnico)
3. Si hay cuota → generar respuesta → recordUsage()

### Endpoints

- GET /api/v1/chat/quota — consumo y cuota restante del día
- GET /api/v1/health/diag — diagnóstico completo de las 6 fases

---

## Autenticación

### Métodos

- Email + contraseña (todas las plataformas)
- Google Sign-In (solo web — oculto en Electron y Capacitor)

### Google Sign-In → Contraseña multiplataforma

Usuarios que se registran con Google no tienen contraseña. En Settings
pueden crear una para loguearse en Electron/Android con email+contraseña.
Después del primer login con Google aparece un toast sugiriendo esto.

### FedCM

Google está migrando a FedCM. Se usa use_fedcm_for_prompt: true y
fallback con renderButton() para navegadores donde prompt() falla (Edge).

---

## Pagos

### MercadoPago Checkout Pro

Flujo: Settings → "Pasarte a Pro" → modal → MP → checkout externo →
webhook → activatePro() → plan='pro' en DB → usuario vuelve con plan activo.

Variables de entorno requeridas:
- MP_ACCESS_TOKEN — token de producción o test
- APP_PUBLIC_URL — https://guyunusa.uy (para webhooks)
- FRONTEND_URL — https://guyunusa.uy (para back_urls)

---

## UX destacada

- Botón compartir en cada respuesta (web: share nativo, Electron: clipboard)
- Botón limpiar historial en sidebar
- Modal de cuota agotada con CTA a upgrade
- Toast post-Google sugiriendo crear contraseña (20s, una sola vez)
- Términos y Política de Privacidad en modal con checkbox
- Stop button durante streaming
- Indicador "Continuando..." para auto-continuación

---

## Endpoints de diagnóstico

| Endpoint | Auth | Propósito |
|----------|------|-----------|
| GET /api/v1/health | No | Estado básico, versión |
| GET /api/v1/health/diag | No* | Diagnóstico de las 6 fases + system prompt + knowledge |
| GET /api/v1/health/rag?q=X | No | Probar búsquedas en la BNC-UY |

*diag muestra datos de usuario si se pasa JWT en el header

---

## Variables de entorno (.env)

```
NODE_ENV=production
PORT=3000
JWT_SECRET=...
JWT_EXPIRES_IN=7d
DEEPSEEK_API_KEY=...
DEEPSEEK_MODEL=deepseek-v4-pro
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=google/gemma-2-9b-it:free
DB_HOST=localhost
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
MP_ACCESS_TOKEN=...
APP_PUBLIC_URL=https://guyunusa.uy
FRONTEND_URL=https://guyunusa.uy
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
PRO_PRICE_USD=6.00
```
