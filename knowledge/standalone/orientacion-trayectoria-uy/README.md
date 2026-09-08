# Orientación de Trayectoria — Uruguay

**Versión:** 1.0.0
**Fecha:** 2026-08-25
**Estado:** activo

---

## Descripción

Dominio de orientación educativa y profesional para jóvenes uruguayos. Permite a Guyunusa actuar como **compañero de exploración conversacional**, ayudando al usuario a descubrir sus intereses, explorar áreas de conocimiento, comprender el sistema educativo uruguayo y construir una trayectoria de formación realista y motivadora.

**Principio rector:** No decirle a la persona qué debe ser. Ayudarla a descubrir qué quiere construir y qué necesita aprender para conseguirlo.

Este dominio es independiente de BNC-UY. Pertenece al módulo **Orientación y Desarrollo** de Guyunusa IA.

---

## Arquitectura

```
GUYUNUSA
   │
ORIENTACIÓN Y DESARROLLO
   │
   └── orientacion-trayectoria-uy/   ← este dominio
```

---

## Propósito — qué hace y qué no hace

### Hace
- Explorar intereses, motivaciones y preferencias cognitivas mediante conversación progresiva.
- Proponer áreas profesionales compatibles con lo que el usuario expresa, explicando el razonamiento.
- Informar sobre el sistema educativo uruguayo (Udelar, UTU, privadas, tecnicaturas).
- Acompañar la construcción de una trayectoria de aprendizaje realista.
- Abordar situaciones especiales (presión familiar, miedo al fracaso, limitaciones económicas).

### No hace
- No realiza diagnósticos psicológicos ni test de personalidad.
- No asigna porcentajes de compatibilidad (80% medicina, 72% ingeniería).
- No garantiza empleo, ingresos ni éxito profesional.
- No discrimina por género, origen ni situación económica.
- No presenta una profesión como superior a otra por prestigio social.
- No reemplaza la orientación vocacional profesional cuando es necesaria.

---

## Metodología conversacional

La conversación **comienza como diálogo**, no como cuestionario.

```
CONSULTA INICIAL
   ↓
EXPLORACIÓN DE INTERESES (qué temas, qué actividades, qué busca)
   ↓
PROFUNDIZACIÓN (por qué ese interés, qué aspecto concretamente)
   ↓
MOTIVACIONES (qué impulsa: curiosidad, ayudar, crear, resolver, liderar...)
   ↓
PREFERENCIAS COGNITIVAS (analizar, construir, comunicar, diseñar...)
   ↓
TOLERANCIA AL ESFUERZO (disposición, contexto, tiempo disponible)
   ↓
EXPLORACIÓN DE ÁREAS COMPATIBLES (con explicación del razonamiento)
   ↓
ALTERNATIVAS EDUCATIVAS EN URUGUAY
   ↓
CONSTRUCCIÓN DE TRAYECTORIA PROGRESIVA
```

Las conclusiones **surgen de la conversación**, no de un algoritmo de puntuación.

---

## Estructura de directorios

```
orientacion-trayectoria-uy/
├── _templates/                    ← plantilla base de documentos
├── metodologia/                   ← cómo conducir la exploración conversacional
│   ├── exploracion-conversacional.md
│   ├── senales-de-interes.md
│   ├── motivaciones-y-preferencias.md
│   └── tolerancia-al-esfuerzo.md
├── areas/                         ← áreas profesionales y de conocimiento
│   ├── tecnologia-informatica.md
│   ├── ingenieria.md
│   ├── ciencias-exactas.md
│   ├── ciencias-naturales.md
│   ├── medicina-salud.md
│   ├── psicologia.md
│   ├── educacion-docencia.md
│   ├── derecho.md
│   ├── economia-administracion.md
│   ├── comunicacion.md
│   ├── diseno.md
│   ├── arquitectura.md
│   ├── arte-cultura.md
│   ├── ciencias-sociales.md
│   ├── agro-agricultura.md
│   ├── medio-ambiente.md
│   ├── ciencias-del-mar.md
│   ├── turismo.md
│   ├── gastronomia.md
│   └── oficios-formacion-tecnica.md
├── educacion-uy/                  ← sistema educativo uruguayo
│   ├── sistema-educativo-uruguay.md
│   ├── formacion-tecnica-utu.md
│   └── becas-apoyo-economico.md
├── trayectorias/                  ← construcción de caminos formativos
│   ├── construccion-de-trayectoria.md
│   └── realidad-laboral.md
└── situaciones/                   ← situaciones especiales
    ├── presion-familiar.md
    ├── no-me-gusta-estudiar.md
    ├── soy-malo-en-matematica.md
    ├── sin-recursos-economicos.md
    └── miedo-a-equivocarse.md
```

---

## Convenciones de identificadores

| Campo    | Formato                        | Ejemplo                              |
|----------|--------------------------------|--------------------------------------|
| `id`     | `otu-{categoria}-{slug}`       | `otu-areas-tecnologia-informatica`   |
| Archivo  | `{slug}.md`                    | `tecnologia-informatica.md`          |

**Prefix:** `otu` = orientación trayectoria Uruguay

---

## Metadatos por documento

```yaml
id: "otu-{categoria}-{slug}"
title: "{Título del documento}"
category: "{categoria}"
topic_type: "metodologia|area-profesional|educacion|trayectoria|situacion-especial"
audience: "jovenes|general"
complexity: "basico|intermedio|avanzado"
uruguay_specific: "true|false"
source_type: "educativo|oficial|metodologico"
updated_at: "YYYY-MM-DD"
version: "1.0.0"
tags: [...]
```

---

## Palabras clave de detección contextual

El dominio se activa ante consultas que contengan estas señales semánticas:

**Indecisión vocacional:**
carrera, estudiar, profesión, vocación, qué estudiar, no sé qué quiero, futuro, trabajo, ocupación

**Exploración de intereses:**
me gusta, me interesa, disfruto, me apasiona, me llama la atención, soy bueno en, tengo habilidad para

**Áreas específicas:**
tecnología, programar, medicina, diseño, arte, derecho, biología, matemática, comunicación, psicología, animales, naturaleza, personas, computadoras, juegos, música, cocinar, arquitectura, agro, medio ambiente

**Dificultades comunes:**
no sé si hacer universidad, no tengo dinero para estudiar, mis padres quieren que estudie, no me gusta estudiar, soy malo en matemática, miedo de equivocarme, carrera técnica o universitaria

**Orientación laboral:**
trabajo, empleo, salida laboral, dónde trabajaría, independiente, emprendimiento, remoto

---

## Situaciones especiales contempladas

| Situación | Documento |
|---|---|
| Presión de la familia para elegir carrera | `situaciones/presion-familiar.md` |
| "No me gusta estudiar" | `situaciones/no-me-gusta-estudiar.md` |
| "Soy malo en matemática" | `situaciones/soy-malo-en-matematica.md` |
| Limitaciones económicas para estudiar | `situaciones/sin-recursos-economicos.md` |
| Miedo a elegir la carrera equivocada | `situaciones/miedo-a-equivocarse.md` |

---

## Principios de orientación

- **Exploración progresiva:** no asumir el área de interés; explorar detrás de la respuesta superficial.
- **Sin jerarquías de profesiones:** ninguna carrera es superior a otra por su prestigio social o remuneración.
- **Honestidad sobre el esfuerzo:** mostrar que cada trayectoria requiere inversión real de tiempo y aprendizaje.
- **Universidad no es el único camino:** la formación técnica, los oficios y la educación no formal son alternativas válidas.
- **Privacidad:** no requerir datos personales para orientar; usar solo lo que el usuario decida compartir.
- **Humildad:** las propuestas son hipótesis de exploración, no diagnósticos.

---

## Índice de documentos — 34 archivos

### Metodología (4)
| Archivo | Descripción |
|---|---|
| `metodologia/exploracion-conversacional.md` | Cómo iniciar y sostener la exploración sin cuestionarios rígidos |
| `metodologia/senales-de-interes.md` | Cómo identificar y profundizar en los intereses del usuario |
| `metodologia/motivaciones-y-preferencias.md` | Tipos de motivación y preferencias cognitivas a explorar |
| `metodologia/tolerancia-al-esfuerzo.md` | Explorar honestamente la disposición al esfuerzo formativo |

### Áreas profesionales (20)
| Archivo | Descripción |
|---|---|
| `areas/tecnologia-informatica.md` | Programación, sistemas, IA, ciberseguridad, datos |
| `areas/ingenieria.md` | Ingeniería eléctrica, civil, industrial, mecánica, química |
| `areas/ciencias-exactas.md` | Matemática, física, estadística, actuaria |
| `areas/ciencias-naturales.md` | Biología, química, bioquímica, genética, microbiología |
| `areas/medicina-salud.md` | Medicina, enfermería, fisioterapia, nutrición, farmacia |
| `areas/psicologia.md` | Psicología clínica, educacional, laboral, social |
| `areas/educacion-docencia.md` | Magisterio, profesorado, educación inicial, especial |
| `areas/derecho.md` | Abogacía, notariado, relaciones laborales |
| `areas/economia-administracion.md` | Economía, contaduría, administración, RRHH, marketing |
| `areas/comunicacion.md` | Periodismo, publicidad, comunicación, relaciones públicas |
| `areas/diseno.md` | Diseño gráfico, UX/UI, industrial, de moda, interior |
| `areas/arquitectura.md` | Arquitectura, urbanismo, paisajismo |
| `areas/arte-cultura.md` | Artes visuales, música, teatro, danza, letras |
| `areas/ciencias-sociales.md` | Sociología, antropología, historia, geografía, trabajo social |
| `areas/agro-agricultura.md` | Agronomía, veterinaria, producción agropecuaria, forestal |
| `areas/medio-ambiente.md` | Ciencias ambientales, ecología, gestión ambiental |
| `areas/ciencias-del-mar.md` | Oceanografía, biología marina, náutica, pesca |
| `areas/turismo.md` | Turismo, hotelería, gestión cultural y eventos |
| `areas/gastronomia.md` | Gastronomía, cocina, repostería, gestión gastronómica |
| `areas/oficios-formacion-tecnica.md` | Electricidad, plomería, soldadura, mecánica, informática técnica |

### Educación en Uruguay (3)
| Archivo | Descripción |
|---|---|
| `educacion-uy/sistema-educativo-uruguay.md` | Panorama completo: Udelar, privadas, UTU, terciarios |
| `educacion-uy/formacion-tecnica-utu.md` | UTU: tecnicaturas, formación profesional, bachillerato tecnológico |
| `educacion-uy/becas-apoyo-economico.md` | Becas, IUPE, Udelar gratuita, apoyos económicos disponibles |

### Trayectorias (2)
| Archivo | Descripción |
|---|---|
| `trayectorias/construccion-de-trayectoria.md` | Cómo construir un camino formativo progresivo y adaptable |
| `trayectorias/realidad-laboral.md` | Demanda laboral, evolución del mercado, sin falsas promesas |

### Situaciones especiales (5)
| Archivo | Descripción |
|---|---|
| `situaciones/presion-familiar.md` | Cuando la familia quiere que el usuario estudie algo específico |
| `situaciones/no-me-gusta-estudiar.md` | Explorar qué significa realmente esa afirmación |
| `situaciones/soy-malo-en-matematica.md` | No descartar carreras; explorar nivel y disposición |
| `situaciones/sin-recursos-economicos.md` | Educación pública, becas, formación técnica gratuita |
| `situaciones/miedo-a-equivocarse.md` | Normalizar la incertidumbre y la reconversión |
