# Guyunusa v1.3.0 — Release Notes

**Fecha:** agosto 2026
**Desarrollador:** Willans Junes · Algoritmos.uy · Montevideo, Uruguay

---

## Nuevas funcionalidades

### Modo Conversación por Voz
- Botón de modo voz en la barra de entrada (al lado del micrófono)
- Al activarlo, el micrófono se abre automáticamente
- Detección de silencio con auto-envío del mensaje (1.8s)
- Guyunusa lee la respuesta en voz alta con voz femenina
- Multiidioma: español (es-419), inglés (en-US), portugués (pt-BR)
- Al terminar de hablar, el micrófono se reabre — loop conversacional
- Android: motor TTS nativo via @capacitor-community/text-to-speech (bridge)
- Web: speechSynthesis con selección automática de voz femenina por idioma
- Botón oculto en navegadores sin soporte STT (Firefox)

### Búsqueda Web en Tiempo Real (Brave Search)
- Consultas sobre actualidad, deportes, cine, política mundial se resuelven con búsqueda web
- Detección automática por patrones: líderes mundiales, diplomacia, economía, tecnología, deportes internacionales, temporalidad ("esta semana", "luego de", "semana pasada")
- Fallback inteligente: si Brave falla, RAG responde como respaldo
- Sin filtro de idioma (search_lang removido por incompatibilidad)

### YouTube Video Search
- Detección de intención: "mostrá un video", "video de", "quiero ver"
- YouTube Data API v3 con búsqueda por relevancia
- Videos renderizados como thumbnails clickeables con play button
- Click abre YouTube en nueva pestaña (evita problemas de embedding)
- Thumbnails con hover: play button rojo + sombra
- Datos enviados via evento SSE 'done' — videoIds directos de YouTube, sin depender del modelo

### Búsqueda de Imágenes
- Detección de intención: "imagen de", "foto de", "cómo se ve", "mostrame"
- Estrategia dual: Brave Image Search, fallback a Brave Web Search extrayendo thumbnails
- Grid de 3 columnas responsive, click abre imagen completa
- Imágenes rotas se ocultan automáticamente (onerror)
- Sin costo adicional — usa la misma BRAVE_SEARCH_API_KEY

### Plan Anual
- Opción de pago anual: USD 49,90/año (ahorro 30%)
- Selector visual Mensual/Anual con badge de ahorro
- Backend diferencia duración (30 vs 365 días) automáticamente

### Modal de Cuota Agotada
- Modal con CTA de upgrade en vez de error en la burbuja

### Tips de Uso
- Enlace en pantalla inicial: "Tips para aprovechar Guyunusa al máximo"
- 11 tips: nuevo chat por tema, modo voz, TTS, videos, imágenes, configuración, compartir, continuación

### Términos y Política de Privacidad
- Modal accesible desde login/registro con checkbox de aceptación

### Creación de Contraseña para Usuarios Google
- En Configuración: crear contraseña para login cross-platform
- Toast informativo post-login Google (una vez, 20s)

---

## Mejoras de rendimiento

### System Prompt Optimizado
- Reducido de 2.762 a 1.214 tokens (56% menos)
- Contenido cultural migrado a BNC-UY
- Consultas casuales responden 2-3x más rápido

### Contexto Dinámico por Tipo de Consulta
- Casual ("hola"): sin RAG, 4 msgs historial
- Corta (≤8 palabras): 2 docs RAG, 6 msgs historial
- Normal: 4 docs RAG, 10 msgs historial
- Web search: sin RAG (salvo fallback), historial completo

### Paralelismo en Backend
- Promise.all para operaciones independientes
- Web search en paralelo con carga de historial
- Admin no verifica cuota

### Fix de Streaming (Buffer SSE)
- Buffer de líneas incompletas (lineBuffer) evita pérdida de caracteres UTF-8
- decoder.decode() con flush final para bytes pendientes
- Eliminados errores de tipeo fantasma en las respuestas

### Timeout Inteligente
- AbortController manual: timeout solo de conexión (30s)
- Se cancela al recibir primer byte — streaming sin límite de tiempo
- Continuación automática funciona correctamente con respuestas largas

---

## Correcciones

### Botón Atrás Android
- Bridge nativo de Capacitor (window.Capacitor.Plugins.App)
- Jerarquía: cerrar modal → cerrar sidebar → volver al chat → minimizar app
- replaceState no se usa — navegación hash normal + listener Capacitor

### Google Sign-In en Edge
- FedCM con use_fedcm_for_prompt + fallback renderButton

### MercadoPago
- Webhook robusto: acepta type:'payment' y action:'payment.updated'
- Verificación activa de pagos pendientes en /payment/status
- MP_ACCESS_TOKEN con dotenv override

### MySQL Compatibility
- LIMIT interpolado en vez de parámetro preparado (mysql2 no soporta LIMIT ?)

### Cierre de Markdown
- Bloques de código y negritas se cierran al finalizar stream
- Fallback a texto plano si el parser falla

### Precisión Lingüística
- Instrucciones de voseo consistente, ortografía y elección de palabras
- Instrucción de foco en última pregunta del usuario
- Temperatura reducida a 0.4

---

## Base de Conocimiento (BNC-UY)

- 1.595+ documentos verificados sobre Uruguay
- 70 dominios temáticos
- Endpoint diagnóstico: /api/v1/health/rag?q=consulta

---

## Multimedia — Arquitectura

```
Consulta del usuario
  → isVideoQuery()  → YouTube API → thumbnails en done event
  → isImageQuery()  → Brave Images → grid en done event
  → isWebSearchQuery() → Brave Web → contexto inyectado al modelo
  → (ninguno) → RAG (BNC-UY) → contexto inyectado al modelo
  → Modelo responde con streaming
  → Frontend renderiza: texto + videos + imágenes
```

---

## Variables de Entorno

```
DEEPSEEK_API_KEY        # Modelo principal
OPENROUTER_API_KEY      # Failover (Gemma 2 9B)
BRAVE_SEARCH_API_KEY    # Web search + image search
YOUTUBE_API_KEY         # Video search (sin restricción de referrer)
MAPS_API_KEY            # Google Maps (pendiente implementación)
MP_ACCESS_TOKEN         # MercadoPago pagos
PRO_PRICE_ANNUAL_USD    # 49.90
```

---

## Plataformas verificadas

| Plataforma | Estado |
|-----------|--------|
| Web (Chrome, Edge, Safari) | ✓ Completo |
| Firefox | ✓ Sin STT/TTS (no soportado) |
| Android (Capacitor Modo A) | ✓ Completo + TTS nativo |
| Desktop (Electron) | ✓ Funcional (STT pendiente) |

---

**Guyunusa v1.3.0 — IA con identidad uruguaya, voz propia y visión global.**
**Desarrollada a puro huevo desde Montevideo, Uruguay.**
