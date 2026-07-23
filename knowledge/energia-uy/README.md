# energia-uy — Dominio Energético del Uruguay

## Descripción

**energia-uy** es un dominio standalone de la Base Nacional de Conocimiento Uruguay (BNC-UY), dedicado a documentar de forma integral el sistema energético uruguayo: su historia, instituciones, recursos, infraestructura, política energética, transición hacia energías renovables e innovación tecnológica.

El dominio está optimizado para búsqueda semántica híbrida (BM25 + embeddings) y para su uso en sistemas de Retrieval-Augmented Generation (RAG). Cada archivo es autocontenido, no usa YAML frontmatter ni el sistema de IDs de la BCN-UY principal, y termina con una sección `## Palabras clave`.

---

## Normas editoriales

- **Formato:** Markdown limpio; sin YAML frontmatter; sin IDs estructurados.
- **Autocontención:** cada archivo debe ser comprensible sin necesidad de consultar otros.
- **Español neutro:** sin regionalismos; ortografía y sintaxis impecables.
- **Objetividad:** sin opiniones, publicidad ni lenguaje evaluativo subjetivo.
- **Fechas:** siempre completas (día/mes/año cuando sea posible).
- **Datos inciertos:** marcados con `[VERIFICAR]`.
- **Expresiones prohibidas:** "actualmente", "recientemente", "hoy en día", "hace algunos años".
- **Terminología:** uniforme en todo el dominio (ej.: "capacidad instalada", "MW", "GWh").

---

## Estructura del dominio

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Este archivo: descripción, normas, índice |
| `01-historia-de-la-energia-en-uruguay.md` | Historia energética desde el período colonial hasta 2026 |
| `02-matriz-energetica.md` | Composición, evolución y análisis de la matriz energética uruguaya |
| `03-ute.md` | UTE: historia, estructura, competencias, generación, distribución |
| `04-ancap.md` | ANCAP: historia, refinería, combustibles, biocombustibles, gas |
| `05-miem-y-dne.md` | MIEM y Dirección Nacional de Energía: política y planificación |
| `06-adme.md` | ADME: mercado eléctrico mayorista, despacho, interconexión |
| `07-ursea.md` | URSEA: regulación y control del sector energético |
| `08-energia-hidroelectrica.md` | Hidroelectricidad: recursos, represas, historia, producción |
| `09-energia-eolica.md` | Energía eólica: recurso, evolución, parques, capacidad instalada |
| `10-energia-solar.md` | Energía solar fotovoltaica y térmica en Uruguay |
| `11-biomasa.md` | Biomasa: tipos, producción, plantas, marco regulatorio |
| `12-biocombustibles.md` | Biodiésel y bioetanol: producción, mezclas, marco legal |
| `13-gas-natural.md` | Gas natural: historia, regasificación, GNLM, distribución |
| `14-combustibles-fosiles.md` | Petróleo y derivados: importación, refinería La Teja, consumo |
| `15-hidrogeno-verde.md` | Hidrógeno verde: estrategia nacional, proyectos piloto, exportación |
| `16-red-electrica-nacional.md` | Red de transmisión y distribución eléctrica del Uruguay |
| `17-represas-y-centrales.md` | Fichas técnicas de represas y centrales de generación |
| `18-parques-eolicos.md` | Parques eólicos: ubicación, capacidad, propiedad, producción |
| `19-plantas-solares.md` | Plantas fotovoltaicas: instalaciones, capacidad, evolución |
| `20-eficiencia-energetica.md` | Eficiencia energética: política, programas, normas, resultados |
| `21-investigacion-e-innovacion.md` | I+D energética: universidades, centros, proyectos, cooperación |
| `22-energia-y-medio-ambiente.md` | Impacto ambiental, emisiones, descarbonización y sostenibilidad |
| `23-energia-y-economia.md` | Sector energético: impacto económico, mercado, inversiones, empleo |
| `24-cooperacion-internacional.md` | Acuerdos, organismos internacionales, interconexiones regionales |
| `25-linea-de-tiempo.md` | Cronología del sector energético uruguayo (1868–2026) |
| `26-glosario.md` | Términos técnicos, siglas e instituciones del sector energético |
| `27-bibliografia.md` | Fuentes oficiales, académicas y técnicas de referencia |
| `28-faq.md` | Preguntas frecuentes sobre energía en Uruguay |
| `29-proyectos-estrategicos.md` | Proyectos energéticos estratégicos y la segunda transición energética |

---

## Fuentes prioritarias

- UTE (Administración Nacional de Usinas y Trasmisiones Eléctricas)
- ANCAP (Administración Nacional de Combustibles, Alcohol y Pórtland)
- MIEM / DNE (Ministerio de Industria, Energía y Minería / Dirección Nacional de Energía)
- ADME (Administración del Mercado Eléctrico)
- URSEA (Unidad Reguladora de Servicios de Energía y Agua)
- LATU (Laboratorio Tecnológico del Uruguay)
- ANII (Agencia Nacional de Investigación e Innovación)
- Universidad de la República (UdelaR) — Facultad de Ingeniería
- BID (Banco Interamericano de Desarrollo)
- Banco Mundial
- IEA (Agencia Internacional de Energía)
- IRENA (Agencia Internacional de Energías Renovables)
- CEPAL
