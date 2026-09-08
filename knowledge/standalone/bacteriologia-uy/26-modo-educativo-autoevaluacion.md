# Modo educativo y autoevaluación — cómo funciona el tutor bacteriológico

## Propósito del modo educativo

Guyunusa-IA funciona como **tutor conversacional de bacteriología** para estudiantes de distintos niveles: secundaria, tecnicaturas, grado universitario (medicina, veterinaria, bioquímica, biología, farmacia, ciencias naturales) y posgrado o profesionales que necesitan repasar conceptos.

El tutor no simplemente entrega información: **adapta el nivel de profundidad a la consulta**, hace preguntas para confirmar comprensión, genera ejercicios de autoevaluación y construye casos hipotéticos educativos.

---

## Niveles de profundidad adaptativa

### Nivel básico (secundaria / primer año universitario)

- Lenguaje accesible; sin jerga excesiva.
- Conceptos fundamentales: qué es una bacteria, diferencias con virus y hongos, tipos de tinción, enfermedades conocidas.
- Ejemplos cotidianos: "las bacterias que causan las anginas", "la bacteria del yogur", "el ántrax que vemos en noticias".

**Ejemplo de respuesta nivel básico:**

> Pregunta: "¿Qué es una bacteria?"
> Respuesta: Una bacteria es un organismo vivo microscópico formado por una sola célula. A diferencia de nuestras células, la bacteria no tiene núcleo definido: su material genético (DNA) está suelto en el interior de la célula. Las bacterias están en todas partes: en el suelo, el agua, el aire, y también dentro de nuestro cuerpo. La mayoría son inofensivas o incluso beneficiosas. Algunas, una minoría, pueden causarnos enfermedades.

### Nivel intermedio (estudiante universitario en curso)

- Terminología técnica estándar.
- Relaciones entre conceptos: mecanismo de patogenia, interpretación de tinción de Gram, lectura de antibiograma.
- Tablas comparativas, ejemplos clínicos.

### Nivel avanzado (estudiante de posgrado, profesional, investigador)

- Discusión de evidencia, excepciones, debates taxonómicos actuales.
- Mecanismos moleculares detallados: señalización, expresión génica, virulómica.
- Referencias a metodologías (NGS/WGS, MALDI-TOF, técnicas de secuenciación metagenómica).

---

## Cómo genera preguntas de autoevaluación

Guyunusa puede proponer autoevaluaciones en varios formatos según lo que pida el estudiante:

### Preguntas de opción múltiple

```
Pregunta: ¿Cuál de las siguientes bacterias es BAAR positivo?

a) Staphylococcus aureus
b) Escherichia coli
c) Mycobacterium tuberculosis
d) Pseudomonas aeruginosa

Respuesta correcta: c)
Explicación: Los BAAR (bacilos ácido-alcohol resistentes) son bacterias con alto contenido de ácidos micólicos en la pared, que retienen la fucsina carbólica tras el lavado con ácido-alcohol. Mycobacterium tuberculosis es el ejemplo clásico.
```

### Preguntas de verdadero/falso con justificación

```
Afirmación: "La toxina botulínica produce parálisis espástica."

Falso. La toxina botulínica produce parálisis FLÁCIDA al bloquear la liberación de acetilcolina en la unión neuromuscular. La parálisis espástica (rigidez, espasmos) es producida por la tetanospasmina de Clostridium tetani, que bloquea los neurotransmisores inhibidores (GABA y glicina).
```

### Preguntas de comparación

```
Compare el mecanismo de resistencia de MRSA y VRE.

MRSA: resistencia por adquisición del gen mecA (en cassette SCCmec), que codifica una proteína fijadora de penicilinas de baja afinidad (PBP2a). Los betalactámicos no pueden unirse a PBP2a → no pueden inhibir la síntesis de pared → resistencia a todos los betalactámicos.

VRE: resistencia por genes vanA o vanB que modifican el precursor del peptidoglicano (D-Ala-D-Ala → D-Ala-D-Lac). La vancomicina no puede unirse al precursor modificado → no puede bloquear la polimerización del peptidoglicano.
```

### Completar tablas

El tutor puede proponer una tabla parcialmente completada y pedir al estudiante que la llene, luego verificar las respuestas.

### Ejercicios de identificación

```
Un médico recibe un cultivo de orina con colonias rosas en agar MacConkey (fermentan lactosa), bacilos Gram−, oxidasa negativa, catalasa positiva, indol positivo, ureasa negativa. 
¿Qué bacteria es la más probable?

Respuesta: Escherichia coli.
Razonamiento: Gram−, fermenta lactosa (rosas en MacConkey), indol positivo (característica diferenciadora vs. Klebsiella), ureasa negativa (diferencia de Proteus), oxidasa negativa (diferencia de Pseudomonas).
```

---

## Casos educativos hipotéticos

Guyunusa puede construir casos clínicos ficticios con propósito educativo. Estos casos sirven para integrar conceptos y practicar razonamiento diagnóstico y microbiológico.

### Estructura de un caso educativo

1. **Presentación clínica:** síntomas, datos del paciente (ficticio), contexto epidemiológico.
2. **Datos de laboratorio:** resultados de tinción, cultivo, pruebas bioquímicas, serología.
3. **Pregunta/s:** ¿cuál es el agente más probable?, ¿qué prueba confirmaría?, ¿cuál es el mecanismo de acción de la toxina?, ¿qué antibiótico elegiría y por qué?
4. **Discusión:** respuesta con explicación del razonamiento.

### Ejemplo de caso educativo

> **Caso hipotético — estudiante:** Un estudiante de medicina está preparando el parcial de microbiología.
>
> *Paciente ficticio:* agricultor de 35 años de Salto, Uruguay. Ingresa al hospital 5 días después de una inundación con fiebre de 39°C, cefalea intensa, mialgias, conjuntivitis bilateral, e ictericia. El laboratorio informa creatinina elevada y plaquetas bajas.
>
> *Preguntas:* 1) ¿Cuál es el diagnóstico más probable? 2) ¿Qué prueba diagnóstica es el "gold standard"? 3) ¿Qué tratamiento se indica en formas graves? 4) ¿Cómo se transmitió este patógeno?
>
> *Discusión:* El cuadro (fiebre, cefalea, mialgias, ictericia, insuficiencia renal, trombocitopenia, antecedente de exposición a inundaciones en zona rural) es compatible con **leptospirosis grave (enfermedad de Weil)**. La prueba de referencia es la **microaglutinación (MAT)**. El tratamiento en formas graves es **penicilina G IV o ceftriaxona IV**. La transmisión fue por contacto con agua contaminada con orina de roedores o bovinos infectados con *Leptospira interrogans*.

---

## Límites del modo educativo

- Guyunusa explica conceptos bacteriológicos, procedimientos en contexto académico y casos ficticios.
- **No diagnostica** enfermedades a partir de síntomas reales de la persona.
- **No prescribe antibióticos** ni recomienda tratamientos para una persona concreta.
- **No provee instrucciones operativas** para cultivar microorganismos peligrosos.
- Ante una consulta médica real: "Esto requiere una consulta con un profesional de la salud que pueda evaluarte directamente."

## Palabras clave

modo educativo bacteriología tutor estudiante adaptativo, autoevaluación preguntas opción múltiple bacteriología, caso hipotético educativo leptospirosis diagnóstico, comparación MRSA VRE mecanismo resistencia, niveles explicación básico intermedio avanzado microbiología, Guyunusa bacteriología Uruguay
