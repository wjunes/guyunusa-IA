# Preguntas frecuentes — Instalaciones eléctricas UTE Uruguay

## Sobre el suministro

**¿Qué tensión suministra UTE en Uruguay?**
230 V entre fase y neutro (monofásico) y 400 V entre fases (trifásico), a 50 Hz. Esta es la tensión vigente desde la transición completada en 2004. Instalaciones muy antiguas pueden haber sido diseñadas para 220/380 V, pero el suministro actual es 230/400 V.

**¿Qué potencia debo contratar?**
Depende de las cargas simultáneas máximas de tu hogar o comercio. Las potencias normalizadas van de 1,4 kW a 11,5 kW en monofásico y de 6 a 40 kW en trifásico. Para una casa estándar con termo eléctrico y horno, generalmente 5,5 a 8,5 kW es suficiente. Si se agrega cargador de VE o bomba de calor, se puede requerir 11,5 kW o trifásico. Ver documento 19-potencias-tarifas.md.

**¿Qué pasa si el ICP dispara frecuentemente?**
El ICP (limitador de potencia) dispara cuando el consumo instantáneo supera la potencia contratada. Las opciones son: reducir las cargas simultáneas, o solicitar a UTE un aumento de potencia contratada. El trámite es en https://portal.ute.com.uy/tramites.

**¿Cómo reporto una avería de UTE?**
Llamando al **0800 1875** (gratuito, 24 horas). También puede reportarse en la app de UTE o en el portal.

## Sobre instalaciones y normativa

**¿Quién puede realizar instalaciones eléctricas en Uruguay?**
Solo Firmas Instaladoras habilitadas con Técnicos Instaladores habilitados por UTE. Contratar instaladores no habilitados implica riesgos legales, de seguridad y puede impedir la conexión a UTE. Verificar habilitación en: https://portal.ute.com.uy/firmas-y-tecnicos-instaladores.

**¿Puedo hacer trabajos eléctricos en mi propia casa?**
El propietario puede realizar pequeños trabajos de mantenimiento (cambio de enchufes, interruptores) en su propia instalación, pero para instalaciones nuevas, ampliaciones o modificaciones que requieran la intervención de UTE (nueva conexión, aumento de potencia, microgeneración) es obligatorio contar con un Técnico Instalador habilitado.

**¿Qué es el sistema TT y por qué Uruguay lo usa?**
El sistema TT es el esquema de distribución en el que el neutro de UTE está conectado a tierra en el transformador, y la instalación del abonado tiene su propia toma de tierra independiente. Es el sistema utilizado en Uruguay (y en muchos países de Europa y Latinoamérica) porque simplifica el diseño de la puesta a tierra del abonado y es compatible con la protección por diferencial (DCDR). Ver documento 01-conceptos-terminologia.md.

**¿Por qué hay dos diferenciales en mi tablero?**
Es una práctica recomendada (y en algunos casos obligatoria) dividir la instalación en dos o más grupos de circuitos protegidos por diferenciales independientes. Si un diferencial dispara por una falla, solo se cortan los circuitos de ese grupo, y el resto de la instalación sigue funcionando. En instalaciones modernas es común tener un diferencial para alumbrado y otro para tomas de corriente y electrodomésticos.

**¿Cuándo es obligatorio el diferencial de 30 mA?**
En Uruguay, el RBT exige diferencial de 30 mA para protección de contactos indirectos en todas las instalaciones domésticas (según Cap. VI). El diferencial de 300 mA se usa en instalaciones industriales para protección a nivel de cuadro general (selectividad), con diferenciales de 30 mA aguas abajo en los circuitos con personas.

**¿Qué sección mínima deben tener los conductores?**
- Circuitos de alumbrado: 1,5 mm² Cu.
- Circuitos de tomacorrientes y fuerza: 2,5 mm² Cu.
- Circuito de cocina u horno: 4–6 mm² Cu (según potencia).
- Circuito de cargador VE (wallbox 32 A): 6 mm² Cu.
Ver documento 04-instalaciones-interiores-receptoras.md.

## Sobre microgeneración fotovoltaica

**¿Puedo instalar paneles solares y conectarlos a la red de UTE?**
Sí. Uruguay tiene un régimen de microgeneración (net metering) que permite conectar instalaciones fotovoltaicas de hasta 150 kW a la red de UTE. La energía que no consumes se inyecta a la red y se descuenta de tu factura. El trámite es en https://portal.ute.com.uy/microgeneracion.

**¿Qué inversor puedo usar para conectar a la red de UTE?**
Solo los inversores que figuran en la lista de equipos aprobados por UTE. Verificar la lista actualizada en el portal de microgeneración antes de comprar. Un inversor no listado no puede conectarse a la red.

**¿Necesito un técnico especial para instalar paneles solares?**
Sí. Se requiere un Técnico Instalador habilitado con Categorías A y B para instalaciones de microgeneración/autoconsumo fotovoltaico.

**¿UTE cambia el medidor?**
Sí. UTE instala un medidor bidireccional (o de importación/exportación) sin costo adicional como parte del proceso de habilitación de la microgeneración.

## Sobre vehículos eléctricos

**¿Puedo cargar mi VE con cualquier enchufe?**
Técnicamente sí, con un cable con EVSE in-cable (Modo 2). Sin embargo, UTE y el RBT recomiendan instalar un wallbox (EVSE Modo 3) en un circuito exclusivo para mayor seguridad y durabilidad. La carga en tomacorriente doméstico estándar (sin circuito exclusivo) no es recomendable para uso habitual.

**¿Qué diferencial necesito para el wallbox?**
El RBT Cap. XXX exige un diferencial de **tipo B** para circuitos de carga de VE en Modo 3. Algunos wallbox incorporan protección equivalente internamente, lo que puede permitir usar un diferencial tipo A. Consultar las especificaciones del wallbox.

**¿Cuánto consume cargar un VE?**
Depende de la capacidad de la batería y del estado de carga. Un VE doméstico típico con batería de 40–70 kWh consume esa energía por cada carga completa. Con un wallbox de 7,4 kW, cargar de 0 a 100% un VE de 50 kWh toma aproximadamente 7 horas.

## Sobre puestas a tierra y diferenciales

**¿Cómo sé si mi casa tiene puesta a tierra?**
Con un verificador de tomacorrientes (probador de fases, disponible en ferreterías) se puede comprobar si el tomacorriente tiene conexión a tierra (PE). En instalaciones antiguas (anteriores a los años 90) es frecuente que no exista conductor de tierra. En ese caso la instalación no cumple el RBT actual.

**¿Es peligroso no tener puesta a tierra?**
Sin puesta a tierra, el diferencial no puede actuar correctamente ante una falla de aislamiento (contacto indirecto). La protección queda comprometida. La adecuación de la puesta a tierra es el trabajo de un Técnico Instalador habilitado.

**¿Con qué frecuencia debo revisar la instalación eléctrica de mi casa?**
Se recomienda una revisión por un técnico habilitado cada 10 años, o al cambiar de propietario o inquilino, o al realizar modificaciones importantes en la instalación.

## Palabras clave

preguntas frecuentes electricidad Uruguay, FAQ instalaciones eléctricas UTE Uruguay, qué potencia contratar UTE Uruguay, diferencial tipo B wallbox Uruguay, puesta a tierra casa Uruguay verificar, inversor aprobado UTE lista Uruguay, net metering Uruguay paneles solares, técnico instalador habilitado Uruguay, tensión 230V Uruguay 50Hz, ICP dispara Uruguay potencia, reportar avería UTE Uruguay 0800 1875, sección conductores Uruguay mínima, sistema TT Uruguay diferencial 30mA
