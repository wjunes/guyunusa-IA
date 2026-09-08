# Seguridad eléctrica en instalaciones — Uruguay

## Principios fundamentales

La seguridad eléctrica en instalaciones se basa en tres mecanismos de protección complementarios:

1. **Protección contra contactos directos** (tocar partes en tensión normalmente accesibles): aislamiento de los conductores, distancias, barreras y envolventes.
2. **Protección contra contactos indirectos** (tocar masas que han quedado accidentalmente en tensión por una falla): puesta a tierra + interruptor diferencial (sistema TT de Uruguay), o doble aislamiento.
3. **Protección contra sobreintensidades** (sobrecargas y cortocircuitos): interruptores automáticos magnetotérmicos y fusibles.

## Riesgos eléctricos principales

### Electrocución por contacto

La corriente eléctrica que circula por el cuerpo humano es el factor determinante de la lesión. La resistencia del cuerpo humano es variable (depende de la humedad de la piel, la superficie de contacto, la presión de contacto) y puede estar en el rango de 500 Ω a varios kΩ.

| Corriente alterna 50 Hz | Efecto en el cuerpo |
|---|---|
| < 1 mA | Imperceptible |
| 1–10 mA | Cosquilleo, perceptible |
| 10–25 mA | Contracción muscular, dificultad para soltar |
| 25–100 mA | Peligro grave; fibrilación ventricular posible |
| > 100 mA | Fibrilación ventricular casi segura; muerte |

El interruptor diferencial de 30 mA está diseñado para actuar antes de que la corriente de falla supere el umbral de fibrilación ventricular (> 30 mA × tiempo de disparo ≤ 40 ms = umbral de seguridad).

### Incendio de origen eléctrico

El calentamiento por sobreintensidad (sobrecarga o cortocircuito) en conductores subdimensionados o protecciones inadecuadas es una de las causas más frecuentes de incendios en edificios. Factores que aumentan el riesgo:
- Conductores con sección insuficiente para la carga real.
- Conexiones mal apernadas o con oxidación (alta resistencia de contacto → calor).
- Protecciones recalibradas inapropiadamente (fusibles de mayor calibre que el conductor).
- Cableado deteriorado por la edad, roedores, aplastamiento o calor.

### Arco eléctrico

El arco eléctrico es una descarga sostenida entre dos conductores separados (o entre un conductor y tierra) que genera temperaturas de miles de grados y puede causar quemaduras graves e incendios. Causas: conexiones flojas, conductores deteriorados, apertura o cierre inapropiados de circuitos bajo carga.

### Sobretensiones

Las sobretensiones transitorias (rayos, maniobras en la red) pueden dañar equipos electrónicos y en casos extremos causar incendios o electrocuciones. Los descargadores de sobretensión (SPD) limitan los picos de tensión en la entrada de la instalación.

## Normas de seguridad para trabajo en instalaciones eléctricas

El trabajo en instalaciones eléctricas en Uruguay está regulado por las normas laborales del MTSS (Ministerio de Trabajo y Seguridad Social) y el IGTSS (Inspección General del Trabajo) además del RBT.

### Los cinco pasos para trabajar sin tensión

Antes de intervenir en cualquier instalación eléctrica, el procedimiento de seguridad reconocido internacionalmente (y adoptado por el RBT) exige:

1. **Desconectar:** abrir el interruptor o el fusible que alimenta la parte de la instalación sobre la que se va a trabajar.
2. **Bloquear (condenar):** si es posible, bloquear el interruptor en posición abierta para impedir su cierre accidental (candado de bloqueo LOTO — Lockout/Tagout).
3. **Verificar ausencia de tensión:** con un verificador o voltímetro calibrado y en buen estado, verificar que no hay tensión en los conductores sobre los que se va a trabajar. Verificar fase a neutro, fase a tierra y fase a fase.
4. **Poner a tierra y en cortocircuito:** en instalaciones de media tensión o de alta potencia, instalar un equipo de puesta a tierra y cortocircuito (PCC) para eliminar cualquier tensión residual o inducida. En BT doméstica este paso puede omitirse pero es buena práctica en instalaciones industriales.
5. **Delimitar la zona de trabajo:** señalizar y delimitar la zona de trabajo para evitar que terceros entren en contacto con las partes expuestas.

> **Regla de oro:** nunca trabajar en una instalación eléctrica de BT domiciliaria o industrial hasta haber verificado con un instrumento de medición que no hay tensión en los puntos de trabajo. El hecho de que el interruptor esté abierto no garantiza la ausencia de tensión (puede haber otra alimentación, un error de maniobra, o tensión inducida).

### Elementos de protección personal (EPP)

Para trabajos eléctricos se deben utilizar EPP apropiados para el nivel de tensión y el riesgo:
- **Guantes dieléctricos** con categoría de tensión adecuada (Cat. 00 para hasta 500 V, Cat. 0 para hasta 1.000 V, etc.) y comprobados antes de su uso.
- **Calzado aislante:** botas o zapatos con suela dieléctrica.
- **Herramientas aisladas** (según IEC 60900 — mango aislado hasta 1.000 V).
- **Gafas o pantalla facial** para protección contra arcos eléctricos (especialmente en tableros industriales).
- **Ropa de trabajo:** sin cremalleras metálicas ni elementos conductores expuestos; algunas tareas requieren ropa ignífuga (FR — Flame Resistant).

### Trabajos en tensión

Los trabajos en tensión (con la instalación energizada) solo pueden realizarse por personal específicamente formado y habilitado para ello, con equipos y herramientas certificados para trabajo en tensión. En Uruguay, los trabajos en tensión en la red de distribución de UTE son realizados exclusivamente por personal de UTE o de empresas contratistas habilitadas.

En instalaciones privadas de BT, el RBT y las normas laborales desaconsejan los trabajos en tensión salvo cuando es estrictamente necesario y solo por personal debidamente formado.

## Inspecciones y mantenimiento preventivo

- **Instalaciones domésticas:** se recomienda una revisión general cada 10 años o al cambiar de propietario/inquilino, realizada por un Técnico Instalador habilitado.
- **Instalaciones industriales y comerciales:** inspección anual de tableros (apriete de bornes, verificación de protecciones, limpieza) y comprobación periódica de la puesta a tierra (con telurómetro).
- **Revisión de cables:** especialmente en instalaciones antiguas (anteriores a 1990) con conductor de aluminio o con aislamiento de goma vieja.

## Primeros auxilios ante accidente eléctrico

1. **No tocar a la víctima** hasta haber cortado la corriente (desconectar el interruptor o el diferencial).
2. Si no se puede cortar la corriente: separar a la víctima con un objeto no conductor (madera seca, plástico).
3. Una vez separada de la fuente: evaluar el estado de consciencia y respiración.
4. Llamar inmediatamente al **Sistema de Emergencias Médicas: 105 (SAMU)**.
5. Si hay parada cardiorrespiratoria: iniciar RCP (reanimación cardiopulmonar) hasta la llegada de los servicios de emergencia.

**Emergencias:** 105 (SAMU) | 911 (emergencias generales) | 102 (Bomberos)

## Fuentes

- RBT capítulos relevantes: https://portal.ute.com.uy/reglamento-bt
- MTSS Uruguay (normativa laboral y seguridad): https://www.mtss.gub.uy

## Palabras clave

seguridad eléctrica Uruguay instalaciones, electrocución Uruguay primeros auxilios, diferencial 30mA protección Uruguay, cinco pasos trabajo sin tensión Uruguay, LOTO lockout tagout Uruguay eléctrico, guantes dieléctricos Uruguay categoría, incendio origen eléctrico Uruguay prevención, arco eléctrico Uruguay protección, sobretensión transitoria Uruguay descargador, inspección instalación eléctrica Uruguay mantenimiento, RCP accidente eléctrico Uruguay SAMU 105, trabajos en tensión Uruguay formación habilitación
