# Finanzas Personales — Uruguay

**Versión:** 1.0.0
**Fecha:** 2026-08-25
**Estado:** activo

---

## Descripción

Dominio de educación y orientación en finanzas personales y familiares, adaptado a la realidad uruguaya. Permite a Guyunusa actuar como asistente de educación financiera, ayudando al usuario a comprender su situación económica, organizar presupuestos, evaluar capacidad de endeudamiento y tomar decisiones más informadas.

Este dominio es independiente de BNC-UY. Pertenece al módulo **Finanzas Personales** de Guyunusa IA.

> **Límite fundamental:** Este dominio proporciona educación y orientación financiera. No es asesoramiento financiero profesional ni reemplaza la consulta a un contador, asesor financiero habilitado o institución competente cuando la situación lo requiere.

---

## Principio rector

> *Ayudar a la persona a comprender antes de decidir.*

La finalidad no es promover el consumo ni el crédito, sino proporcionar conocimiento que permita tomar decisiones económicas más informadas, responsables y sostenibles.

---

## Arquitectura

```
GUYUNUSA
   │
FINANZAS PERSONALES
   │
   └── finanzas-personales-uy/   ← este dominio
```

---

## Propósito del dominio

Ayudar al usuario a:

- Comprender su situación económica actual.
- Organizar ingresos y gastos.
- Evaluar capacidad real de endeudamiento.
- Comprender cuotas, intereses y costo financiero.
- Detectar situaciones de sobreendeudamiento.
- Analizar préstamos, tarjetas y otras obligaciones.
- Comparar escenarios antes de asumir nuevas deudas.
- Organizar estrategias razonables para reducir obligaciones.
- Crear hábitos de ahorro y planificación.
- Comprender conceptos financieros sin conocimientos técnicos previos.

---

## Estructura de directorios

```
finanzas-personales-uy/
├── _templates/                        ← plantilla base de documentos
├── presupuesto/                       ← presupuesto, ingresos, gastos, flujo de caja
├── endeudamiento/                     ← capacidad de pago, nivel, sobreendeudamiento
├── credito/                           ← préstamos, tarjetas, cuotas, créditos
├── conceptos/                         ← intereses, tasas, CFT, mora
├── gestion-deudas/                    ← refinanciación, reestructuración, consolidación
├── ahorro/                            ← fondo de emergencia, ahorro, planificación
├── decisiones/                        ← compras, escenarios, necesidad vs impulso
├── alertas/                           ← señales de alerta, estrategias de recuperación
└── contexto-uy/                       ← BCU, COPAB, moneda, UI, instituciones Uruguay
```

---

## Convenciones de identificadores

| Campo   | Formato                               | Ejemplo                               |
|---------|---------------------------------------|---------------------------------------|
| `id`    | `fpu-{categoria}-{slug}`              | `fpu-presupuesto-flujo-de-caja`       |
| Archivo | `{slug}.md`                           | `flujo-de-caja-familiar.md`           |

---

## Metadatos por documento

Cada documento usa frontmatter YAML:

```yaml
id: "fpu-{categoria}-{slug}"
title: "{Título descriptivo}"
category: "{presupuesto|endeudamiento|credito|conceptos|gestion-deudas|ahorro|decisiones|alertas|contexto-uy}"
topic_type: "{educacion|analisis|prevencion|orientacion}"
audience: "{general|profesionales-salud|rural}"
complexity: "{basico|intermedio|avanzado}"
uruguay_specific: "{true|false}"
source_type: "{oficial|educativo}"
updated_at: "YYYY-MM-DD"
version: "1.0.0"
tags: [...]
```

---

## Detección contextual

El dominio se activa cuando la conversación contiene conceptos relacionados con:

**Crédito y deuda:** préstamo, crédito, cuota, tarjeta, deuda, intereses, mora, refinanciación, reestructuración, consolidación, aval, fiador

**Presupuesto:** presupuesto, ingresos, gastos, flujo de caja, sueldo, salario, sobra, falta, llegar a fin de mes

**Situación financiera:** endeudamiento, sobreendeudamiento, capacidad de pago, economía familiar, finanzas personales, no llego, debo, me cobran

**Ahorro y planificación:** ahorro, fondo de emergencia, planificación, reserva, ahorrar, emergencia

**Evaluación:** ¿me conviene?, ¿puedo pagar?, ¿es caro?, ¿qué pasa si no pago?, ¿cómo salgo de las deudas?

---

## Principios de actuación

- **Prevención:** detectar señales de alerta y comunicarlas sin juzgar.
- **Educación:** explicar conceptos en lenguaje claro antes de dar orientación.
- **Neutralidad:** no recomendar instituciones financieras específicas ni productos comerciales.
- **Límites claros:** distinguir orientación general de asesoramiento profesional.
- **Honestidad:** cuando la situación requiere un profesional, decirlo explícitamente.

---

## Situaciones de alerta a detectar

- Múltiples préstamos activos simultáneos.
- Varias tarjetas usadas al límite.
- Pago de una deuda con otra deuda.
- Cuotas acumuladas que superan el 40% de los ingresos.
- Atrasos reiterados.
- Refinanciaciones sucesivas.
- Uso del crédito para gastos básicos (comida, luz, alquiler).
- Ingresos insuficientes frente a obligaciones corrientes.

Ante estas situaciones: enfoque preventivo, explicar riesgos sin juzgar, orientar hacia recursos disponibles (BCU, COPAB, defensa del consumidor).

---

## Capacidades de análisis

Guyunusa puede analizar situaciones planteadas por el usuario, por ejemplo:

```
Ingresos mensuales: $60.000
Cuotas actuales: $18.000
Nueva cuota propuesta: $12.000
```

Y calcular/explicar:
- Obligaciones actuales y futuras.
- Porcentaje de ingresos comprometido.
- Dinero disponible.
- Impacto sobre el presupuesto.
- Riesgos y aspectos a evaluar antes de decidir.

El análisis siempre incluye interpretación del resultado, no solo el cálculo matemático.

---

## Contexto uruguayo

Referentes institucionales del dominio:

| Institución | Rol |
|---|---|
| Banco Central del Uruguay (BCU) | Regulación del sistema financiero, tasas máximas, SIIF |
| COPAB | Protección al usuario bancario |
| UDEPE (MVOTMA) | Programas de ahorro y acceso a vivienda |
| Defensa del Consumidor (MIEM) | Derechos del consumidor financiero |
| Clearing de Informes | Registro de deudas e historial crediticio |
| BROU, BHU | Bancos públicos de referencia |

---

## Fuentes oficiales

- BCU: https://www.bcu.gub.uy
- COPAB: https://www.copab.org.uy
- IMPO (normativa): https://www.impo.com.uy
- Defensa del Consumidor: https://www.gub.uy/ministerio-industria-energia-mineria/consumidores
- BROU: https://www.brou.com.uy
- INE (índices de precios, inflación): https://www.ine.gub.uy

---

## Índice de documentos — 25 archivos

### presupuesto/
| Archivo | Descripción |
|---|---|
| `presupuesto-personal-familiar.md` | Qué es un presupuesto, para qué sirve, cómo construirlo |
| `ingresos-fijos-variables.md` | Tipos de ingresos y cómo estimarlos |
| `gastos-esenciales-variables-prescindibles.md` | Clasificación de gastos y prioridades |
| `flujo-de-caja-familiar.md` | Flujo de caja: ingresos menos gastos en el tiempo |

### endeudamiento/
| Archivo | Descripción |
|---|---|
| `capacidad-de-pago.md` | Cómo calcular cuánto se puede pagar realmente |
| `nivel-de-endeudamiento.md` | Indicadores de endeudamiento y sus límites recomendados |
| `sobreendeudamiento.md` | Qué es, cómo se llega, cómo salir |
| `riesgo-deuda-sobre-deuda.md` | Riesgos de pagar deudas con nuevas deudas |

### credito/
| Archivo | Descripción |
|---|---|
| `prestamos-personales.md` | Tipos, condiciones y evaluación de préstamos personales |
| `creditos-de-consumo.md` | Créditos de consumo: características y riesgos |
| `tarjetas-de-credito.md` | Cómo funcionan las tarjetas, costos ocultos, riesgos |
| `compras-en-cuotas.md` | Cuotas: lo que muestran y lo que esconden |

### conceptos/
| Archivo | Descripción |
|---|---|
| `intereses-tasas.md` | TNA, TEA, TEM: qué son y cómo compararlas |
| `costo-financiero-total.md` | CFT: qué incluye, cómo leerlo, para qué sirve |
| `mora-recargos-atrasos.md` | Consecuencias del atraso: mora, recargos, Clearing |

### gestion-deudas/
| Archivo | Descripción |
|---|---|
| `refinanciacion-reestructuracion.md` | Cuándo conviene y cuándo es una trampa |
| `consolidacion-deudas.md` | Unificar deudas: ventajas, riesgos y condiciones |

### ahorro/
| Archivo | Descripción |
|---|---|
| `fondo-de-emergencia.md` | Por qué es la primera prioridad y cómo construirlo |
| `ahorro-planificacion.md` | Estrategias de ahorro accesibles y hábitos financieros |

### decisiones/
| Archivo | Descripción |
|---|---|
| `compras-importantes.md` | Cómo evaluar una compra grande antes de decidir |
| `necesidad-vs-impulso.md` | Diferenciar necesidad real de consumo impulsivo |
| `planificacion-economica-familiar.md` | Planificación anual de la economía familiar |
| `analisis-escenarios.md` | Comparar escenarios financieros antes de comprometerse |

### alertas/
| Archivo | Descripción |
|---|---|
| `senales-alerta.md` | Señales de deterioro financiero y cómo interpretarlas |
| `estrategias-recuperacion.md` | Estrategias generales para recuperar el equilibrio |

### contexto-uy/
| Archivo | Descripción |
|---|---|
| `marco-regulatorio-instituciones.md` | BCU, COPAB, UI, inflación, derechos del consumidor financiero en Uruguay |
