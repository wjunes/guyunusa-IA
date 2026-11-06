# Investigación académica en inteligencia artificial en Uruguay

## InCo y grupos de investigación en la UdelaR

### El Instituto de Computación (InCo)

El Instituto de Computación (InCo) es la principal unidad de investigación en computación de
la Facultad de Ingeniería de la Universidad de la República (FING-UdelaR).
Organiza su actividad en torno a áreas temáticas: inteligencia artificial, gestión de datos,
sistemas distribuidos, ingeniería de software y teoría de la computación.
No se encontraron denominaciones de "laboratorio" documentadas para los grupos del InCo en las
fuentes consultadas.
El sitio web oficial del InCo (inco.fing.edu.uy) no respondió durante esta investigación, lo que
limita la capacidad de confirmar la lista completa de grupos activos en IA.

La producción media del InCo era de aproximadamente 1,2 publicaciones por investigador por año
(promedio 2015–2023), por encima de la media uruguaya de 0,78 según datos de la Revista BITS de
la Universidad de Chile.

### Grupo RETUYT-InCo (Procesamiento del Lenguaje Natural)

El grupo con mayor producción verificada en IA dentro del InCo es **RETUYT-InCo**, también
llamado Grupo PLN / pln-fing-udelar, dedicado al procesamiento del lenguaje natural.
Mantiene presencia pública en GitHub (pln-fing-udelar) y en el ACL Anthology.
Sus líneas activas en 2022–2026 incluyen:

- NLP educativo: generación de respuestas de tutor de IA, extracción de crucigramas para
  aprendizaje de idiomas
- Simplificación de texto en español con LLMs (fine-tuning de Mistral-7B)
- Traducción automática guaraní–español
- Modelos de lenguaje para el español uruguayo (ROUBERTa, Corpus UY22)
- Análisis de discurso de odio en español rioplatense

**Aiala Rosá** (Profesora Agregada TC, lideresa del grupo, SNI/PEDECIBA) es la investigadora
principal del grupo con mayor trayectoria documentada.
**Luis Chiruzzo** es investigador del grupo especializado en NLP para lenguas de bajos recursos.
**Lorena Etcheberry** (Profesora Adjunta, SNI/PEDECIBA) coordina la Maestría en Ciencia de Datos
y Aprendizaje Automático y trabaja en grafos de conocimiento, privacidad en ciencia de datos y
mitigación de sesgos algorítmicos.
**Santiago Góngora** e **Ignacio Sastre** integran RETUYT-InCo; su estatus formal (docente o
estudiante de posgrado) no pudo confirmarse en fuentes primarias (pendiente de verificación).
**Alexis Baladón** coautora en NLP para guaraní; su vínculo institucional con el InCo no fue
verificado en fuentes primarias más allá de LinkedIn (pendiente de verificación).

Una limitante estructural documentada es la infraestructura computacional: el modelo ROUBERTa
fue entrenado en 30 días en una única GPU Nvidia P100, ilustrando las restricciones de cómputo
del grupo.

### Otros investigadores del InCo en IA (identificados en convocatorias ANII)

**Marcel Bentancor** (UdelaR, Facultad de Ciencias): PI del proyecto de IA y visión
computacional para predicción de rendimiento en Vitis vinifera cv Tannat, financiado por ANII 2022,
con socios en EMBRAPA y UFSC de Brasil.

**Lorena Etcheberry** (PI en CRUZAR, ANII 2022): proyecto de OCR e IA aplicados a
aproximadamente 3 millones de páginas del Archivo Berrutti (archivos de la dictadura), con
colaboración del Laboratorio de Humanidades Digitales de Brasil.

Entre los proyectos **no financiados** en la convocatoria ANII 2022 figuran grupos del InCo:
Baliosian (aprendizaje por refuerzo para nube), Dufrechou (enfermedades hipocampales) y
Chatterjee (predicción cardiovascular con IoT/IA), lo que permite inferir actividad investigadora
en IA más allá de lo financiado.

**Martín Rocamora**, quien trabajó en ML para señales de audio en FING hasta circa 2023, es
actualmente Tenure-track Professor en la Universitat Pompeu Fabra (España) y no tiene afiliación
activa a la UdelaR.

## PEDECIBA Computación

### Naturaleza y financiamiento

PEDECIBA (Programa de Desarrollo de las Ciencias Básicas) es financiado conjuntamente por la
UdelaR y el MEC.
Su **Área Informática** ofrece Maestría en Informática y Doctorado en Informática, que son el
primer y máximo nivel de formación investigadora en computación del país.
El programa no financia proyectos de investigación directamente, sino becas de formación;
los proyectos se financian vía ANII o fondos propios de la UdelaR.
Los estudiantes de doctorado son el principal recurso humano para la investigación del InCo.

### Situación en 2025–2026

El Consejo Científico del Área Informática reclamó en **abril de 2026** más recursos para
defender los posgrados ante el crecimiento del área.
Un informe de **abril de 2025** señaló estancamiento en el número anual de egresados de
maestrías y doctorados en Informática.
Los montos actualizados de estipendios/becas de PEDECIBA Informática para 2024–2026 y el número
total de estudiantes activos en maestría y doctorado para 2024 no pudieron obtenerse (pendiente
de verificación).

### Programas de posgrado en IA en la UdelaR

La **Maestría en Ciencia de Datos y Aprendizaje Automático** (FING-UdelaR), coordinada por
Lorena Etcheberry y con participación del InCo, el IIE y el IMERL, es el programa más
directamente vinculado a la IA en la UdelaR.
Su plan fue aprobado en 2020 y actualizado en 2021; una cohorte 2027 estaba anunciada al cierre
de esta investigación.
La **Maestría Profesional en Ciencia de Datos** (FING, desde 2019, 24 meses) tiene perfil más
aplicado.
No existe un programa denominado específicamente "Maestría en IA" en Uruguay; los contenidos de
IA están distribuidos entre estos programas.

## ROUBERTa y Procesamiento del Lenguaje Natural

### El modelo ROUBERTa

**ROUBERTa** (`pln-udelar/rouberta-base-uy22-cased`) es un modelo RoBERTa-base entrenado desde
cero con texto periodístico uruguayo por investigadores del Grupo RETUYT-InCo (Filevich, Marco,
Castro, Chiruzzo y Rosá).
Fue presentado en LREC-COLING 2024, taller TDLE.
Su desempeño supera al modelo BETO (referencia en español) en tareas de NLP sobre textos
uruguayos.
Fue entrenado con el **Corpus UY22**, un corpus de aproximadamente 6 GiB de prensa uruguaya.
Publicado en Hugging Face con licencia MIT, es uno de los recursos de NLP más concretos que el
ecosistema uruguayo ha contribuido a la comunidad global.
El corpus UY22 también está publicado en Hugging Face con licencia abierta.

### Otros recursos de NLP producidos en Uruguay

**QuALES:** dataset de preguntas y respuestas sobre noticias uruguayas (COVID-19), producido por
el Grupo PLN de la UdelaR.

**Dataset de audio rioplatense para ASR** (`redemerco/rioplatense-asr-dataset`): audio con
transcripciones para reconocimiento de voz en español rioplatense (Argentina/Uruguay).

**Corpus guaraní-español para code-switching** (IberLEF 2023, ~1.500 textos/25.000 tokens) y
recursos hacia un WordNet en guaraní, producidos por el grupo RETUYT-InCo.

**Corpus rioplatense de hate speech:** comentarios de Twitter en español rioplatense más corpus
de preentrenamiento de ~5 millones de respuestas; código y modelos públicos en GitHub.

### Publicaciones destacadas en NLP (2022–2026)

- LREC-COLING 2024, taller TDLE: ROUBERTa (Filevich, Marco, Castro, Chiruzzo, Rosá)
- NAACL 2024: traducción automática guaraní-español con data augmentation gramatical
  (Lucas, Baladón, Pardiñas, Agüero-Torales, Góngora, Chiruzzo)
- BEA-MLSP 2024: simplificación de texto con Mistral-7B (Sastre, Alfonso, Fleitas, Gil, Lucas,
  Spoturno, Góngora, Rosá, Chiruzzo)
- BEA 2024: extracción automática de crucigramas para aprendizaje de idiomas
  (Berruti, Collazo, Sellanes, Rosá, Chiruzzo)
- BEA 2023: respuestas de tutor de IA con BertScore F1 = 0,71; puesto 4,5
- BEA 2025: modelos menores a 1B parámetros para evaluación de tutor de IA
- NAACL 2025 Findings (arXiv:2410.12174): hate speech en rioplatense con LLMs
  (Pérez, Miguel, Cotik)
- arXiv:2504.01045 (2025): ML para identificación de beneficiarios de programas sociales
  uruguayos (Beron Curti, Vargas Sainz, Tseo) — resultado de colaboración MIT-UTEC

## CICADA

### Creación y composición

El **Centro Interdisciplinario en Ciencia de Datos y Aprendizaje Automático (CICADA)** fue
creado en 2021 como unidad dependiente del Espacio Interdisciplinario de la UdelaR.
Reúne a aproximadamente 25 miembros de diversas disciplinas, entre ellos investigadores del
InCo, del IIE y del IMERL.
Es el articulador transversal entre disciplinas dentro de la UdelaR y el nodo más visible de ML
fuera del NLP puro.

### Líneas de investigación

**María Inés Fariello Rico** lidera en CICADA proyectos de ML aplicado a genómica de poblaciones
uruguayas: análisis de genomas de aproximadamente 850 individuos para identificar patrones de
migración y herencia nativa prehispánica.

### Colaboración internacional

CICADA es **Community Partner del Catalyst Project** (financiado por Chan Zuckerberg Initiative,
con soporte de 2i2c y MetaDocencia) para acceso a computación en la nube.
Esta colaboración alivia parcialmente la limitante de infraestructura computacional.

## Colaboraciones internacionales

Las colaboraciones documentadas son predominantemente con América Latina y América del Norte.
No se encontraron colaboraciones formales verificables con instituciones europeas o de Asia-Pacífico
en IA para 2020–2026.

**KHIPU 2023 (Montevideo):** evento internacional de deep learning organizado en Montevideo
con participación de investigadores de UdelaR; produjo una declaración sobre IA en América Latina
firmada por aproximadamente 500 investigadores.

**MIT-UTEC:** el programa MISTI del MIT colaboró con UTEC en formación en ML y ciencia de datos;
un proyecto de justicia algorítmica para programas sociales uruguayos dio lugar a un preprint
publicado en arXiv en 2025 (arXiv:2504.01045).

**Universidad de Michigan:** coautores del paper ROUBERTa 2024 incluyen investigadores afiliados
a la Universidad de Michigan.

**Brasil:** EMBRAPA y UFSC (proyecto Tannat/ANII 2022); Laboratorio de Humanidades Digitales
(proyecto CRUZAR/ANII 2022); FURG (posgrado trinacional UTEC).

**México:** Universidad de Colima, Universidad de Guadalajara, Colegio de Postgraduados
(proyecto genómica/ANII 2022).

**Argentina:** FCEN-UBA (proyecto verificación IA/ANII 2022); coautores en trabajos de NLP
rioplatense.

**Microsoft:** laboratorio AI for Good Lab en LATU (2023–presente), con proyectos para
organismos del Estado uruguayo.

**Catalyst Project** (Chan Zuckerberg Initiative): acceso a computación en la nube para CICADA.

## Output científico

### Financiamiento de investigación (ANII 2022)

La **convocatoria conjunta ANII-IDRC (Canadá) de 2022** es el instrumento de financiamiento
específico en IA más documentado:

| Proyecto | PI | Institución | Monto (UYU) |
|---|---|---|---|
| IA para archivos del pasado reciente (CRUZAR) | Lorena Etcheberry | UdelaR/FING | 1.140.284 |
| Deep learning para selección genómica | María Inés Fariello Rico | UdelaR/FING | 1.430.000 |
| Verificación de Sistemas Inteligentes con ML | Sergio Yovine | ORT Uruguay | 1.430.000 |
| IA y visión computacional para viticultura Tannat | Marcel Bentancor | UdelaR/FCien | 1.428.965 |

Total: UYU 5.429.249 en cuatro proyectos financiados de 19 postulaciones.

Una fuente externa señala que el financiamiento específico para IA en Uruguay es escaso y que la
convocatoria 2022 es una de las pocas excepciones (Council of Science, febrero 2025).

### Proyectos CRUZAR

El proyecto CRUZAR (PI: Lorena Etcheberry, UdelaR) aplica OCR e IA a aproximadamente 3 millones
de páginas del Archivo Berrutti (archivos de la última dictadura cívico-militar uruguaya).
Fue reportado por La Diaria en agosto de 2025 como proyecto activo de IA aplicada a derechos
humanos e historia reciente.
Es una de las aplicaciones de IA de mayor impacto social del ecosistema académico uruguayo.

## Institut Pasteur de Montevideo en IA biomédica

El **Institut Pasteur de Montevideo (IP Montevideo)** tiene actividad investigadora en
bioinformática y genómica computacional.
La **Unidad de Bioinformática**, dirigida por **Hugo Naya** (PhD, afiliado también a Facultad
de Agronomía UdelaR), trabaja en respuesta celular humana a patógenos y genómica evolutiva de
bacterias, con financiamiento del Fondo Clemente Estable (ANII).
El **Laboratorio de Genómica Microbiana**, liderado por **Gregorio Iraola**, trabaja en
filodinámica, metagenómica urbana y resistencia antibiótica.
Iraola recibió el Premio Talent Award de la red internacional Pasteur y lidera el proyecto
Latinbiota.
La biotecnológica **Guska** (spin-off de investigadores de UdelaR e IP Montevideo) firmó un
acuerdo con **Marvik** (empresa uruguaya de IA) para desarrollar una plataforma generativa
de nuevos virus oncolíticos.
Guska fue seleccionada para MassBio Drive Boston en septiembre de 2026, siendo la única empresa
latinoamericana del cohorte.
No se encontraron publicaciones recientes (2023–2025) con uso explícito de ML o deep learning
en los laboratorios del IP Montevideo (pendiente de verificación).
La vigencia de la afiliación de Iraola al IP Montevideo como cargo principal no pudo confirmarse
(pendiente de verificación).

## Tabla de investigadores en IA (2024–2026)

| Nombre | Afiliación principal | Área de IA | Estado |
|---|---|---|---|
| Aiala Rosá | InCo, FING-UdelaR | NLP, IA educativa | Activa |
| Luis Chiruzzo | InCo, FING-UdelaR | NLP, lenguas de bajos recursos, MT guaraní-español | Activo |
| Lorena Etcheberry | InCo, FING-UdelaR | Ciencia de datos, grafos de conocimiento, sesgo | Activa |
| María Inés Fariello Rico | CICADA, FING-UdelaR | ML para genómica | Activa |
| Matías Di Martino | Instituto Vidart | Visión computacional, ML en salud y agricultura | Activo |
| Sergio Yovine | ORT Uruguay/FING | Verificación formal de sistemas de IA | Activo |
| Hugo Naya | Institut Pasteur / Fac. Agronomía | Bioinformática, genómica evolutiva computacional | Activo |

## Proyecto CRUZAR: IA y derechos humanos

El proyecto CRUZAR es un caso destacado de IA aplicada a la memoria histórica.
Aplicó técnicas de reconocimiento óptico de caracteres (OCR) e IA a aproximadamente 3 millones
de páginas del Archivo Berrutti, que contiene documentos de la última dictadura cívico-militar
uruguaya (1973–1985).
El proyecto fue publicado en La Diaria en agosto de 2025.
Su PI es Lorena Etcheberry (UdelaR), con colaboración del Laboratorio de Humanidades Digitales
de Brasil y financiamiento de ANII 2022.
Representa la intersección más documentada entre IA, derechos humanos e historia reciente en el
ecosistema académico uruguayo.

## Brecha de infraestructura computacional

La limitación más consistentemente documentada en el ecosistema académico uruguayo de IA es la
infraestructura computacional.
ROUBERTa fue entrenado en 30 días utilizando una única GPU Nvidia P100, lo que ilustra las
restricciones de cómputo del Grupo RETUYT-InCo.
El Consejo Científico de PEDECIBA Informática calificó en abril de 2026 la infraestructura y el
financiamiento como insuficientes frente al crecimiento del área.
La participación de CICADA en el Catalyst Project (Chan Zuckerberg Initiative) provee acceso a
computación en la nube, aliviando parcialmente esta brecha.
El Instituto Vidart, con su financiamiento proyectado, representa el intento más ambicioso de
cerrar la brecha computacional para la investigación en IA del país.
Microsoft, a través del AI Co-Innovation Lab y el AI for Good Lab en el LATU, también provee
infraestructura computacional para proyectos del ecosistema.

## Notas metodológicas sobre la investigación

Las fuentes consultadas fueron principalmente publicaciones del ACL Anthology, arXiv, sitios
institucionales de UdelaR y PEDECIBA, y medios periodísticos.
El InCo no publicó un listado completo de grupos de investigación en IA accesible durante esta
investigación (inco.fing.edu.uy no respondió).
Los datos sobre número total de estudiantes activos en maestría y doctorado en Informática para
2024 no pudieron obtenerse.
El listado completo de proyectos financiados por ANII fuera de convocatorias específicas de IA
no fue identificado.

## Palabras clave

InCo Instituto de Computación UdelaR, RETUYT-InCo procesamiento lenguaje natural NLP,
Aiala Rosá NLP Uruguay, Luis Chiruzzo guaraní español machine translation,
Lorena Etcheberry ciencia datos sesgo algorítmico, ROUBERTa modelo lenguaje español uruguayo,
Corpus UY22 prensa uruguaya Hugging Face, CICADA Centro Interdisciplinario ciencia datos,
María Inés Fariello Rico ML genómica, PEDECIBA Informática maestría doctorado,
Maestría Ciencia de Datos Aprendizaje Automático UdelaR, KHIPU deep learning Montevideo 2023,
MIT UTEC colaboración ML programas sociales, CRUZAR OCR archivos dictadura IA,
Institut Pasteur Montevideo bioinformática IA, Hugo Naya Gregorio Iraola genómica,
Guska Marvik biotecnología IA Uruguay, ANII convocatoria IA 2022 IDRC financiamiento,
Espacio Interdisciplinario UdelaR, Catalyst Project Chan Zuckerberg CICADA
