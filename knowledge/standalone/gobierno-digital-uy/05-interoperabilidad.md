# Interoperabilidad del Estado uruguayo

La interoperabilidad es la capacidad de los sistemas de información de distintos organismos del Estado de intercambiar datos de forma automática, segura y con significado compartido. Es la base técnica del principio "el Estado no debe pedir al ciudadano lo que ya tiene", que orienta la simplificación de trámites en Uruguay.

## Concepto y relevancia

En un Estado sin interoperabilidad, cada organismo funciona como una isla de información: el ciudadano debe presentar en papel documentos que otros organismos ya poseen en formato digital. Un empleador que solicita una habilitación debe presentar su certificado de situación tributaria (emitido por DGI) y su certificado de estar al día con BPS, aun cuando ambos organismos tienen esa información en sus sistemas.

La interoperabilidad elimina esta carga: el organismo que necesita un dato lo consulta directamente al organismo que lo posee, con el consentimiento del ciudadano y dentro del marco legal de protección de datos personales.

## Plataforma de Interoperabilidad del Estado uruguayo

AGESIC desarrolló e implementó la **Plataforma de Interoperabilidad del Estado**, que proporciona la infraestructura técnica para el intercambio de datos entre organismos públicos. La plataforma opera como un bus de servicios de datos que:

- Define los estándares técnicos para los servicios web de datos (APIs)
- Gestiona la autenticación y autorización entre organismos
- Registra las consultas realizadas (trazabilidad)
- Garantiza la disponibilidad y rendimiento del intercambio

Organismos que participan de la plataforma pueden exponer sus datos a otros organismos mediante servicios web, y consumir datos de otros organismos a través del mismo mecanismo.

## PDU: Plataforma de Datos de Uruguayos

La **PDU (Plataforma de Datos de Uruguayos)** es el componente de la plataforma de interoperabilidad que permite consultar datos básicos de identificación de personas físicas y jurídicas registradas en Uruguay. Organismos públicos habilitados pueden consultar datos como nombre, documento de identidad, domicilio y situación registral de personas, sin necesidad de que el ciudadano los aporte en cada trámite.

La PDU integra datos del **Ministerio del Interior** (cédulas de identidad), el **BPS** (historial laboral y aportes), la **DGI** (situación tributaria, RUT), el **Registro Civil** (nacimientos, defunciones, matrimonios) y otros organismos.

## Marco legal de la interoperabilidad

La interoperabilidad se apoya en varias normas:

**Ley 18.331/2008 (Protección de Datos Personales)**: establece que el intercambio de datos personales entre organismos del Estado debe tener base legal y respetar los principios de finalidad, proporcionalidad y seguridad. La URCDP (Unidad Reguladora y de Control de Datos Personales) controla el cumplimiento.

**Decretos de gobierno digital**: regulan los estándares técnicos, los protocolos de intercambio y las medidas de seguridad aplicables al intercambio de datos entre organismos.

**Principio de ventanilla única**: los organismos no pueden exigir al ciudadano documentación que puedan obtener directamente de otro organismo del Estado.

## Casos de uso de interoperabilidad

**Habilitaciones comerciales**: las intendencias y organismos reguladores pueden verificar la situación tributaria (DGI) y previsional (BPS) del solicitante sin exigir certificados en papel.

**Subsidios y prestaciones sociales**: el MIDES puede verificar datos de ingresos del BPS y la DGI para determinar la elegibilidad de un hogar para prestaciones sociales, sin que la familia deba aportar documentación.

**Compras estatales**: el sistema SICE verifica automáticamente la situación de los proveedores ante DGI y BPS antes de adjudicar contratos.

**Salud**: el MSP y ASSE pueden acceder a datos de afiliación al FONASA y al sistema de prestadores para coordinar la atención al paciente.

## Desafíos y limitaciones

La implementación de la interoperabilidad enfrenta desafíos persistentes:

- **Heterogeneidad tecnológica**: los sistemas de los distintos organismos usan tecnologías, formatos y estructuras de datos muy diferentes, lo que dificulta la integración
- **Resistencia institucional**: algunos organismos son reticentes a compartir sus datos por razones de control institucional, costos de adaptación o preocupaciones de seguridad
- **Calidad de los datos**: el intercambio solo es útil si los datos en origen son correctos y están actualizados
- **Financiamiento**: la adaptación de los sistemas de cada organismo para participar de la plataforma requiere inversión

## Palabras clave

interoperabilidad, plataforma interoperabilidad Estado, PDU, Plataforma de Datos de Uruguayos, AGESIC, ventanilla única, intercambio datos, Ley 18.331, protección datos personales, URCDP, DGI, BPS, simplificación administrativa, bus de servicios, APIs, gobierno digital Uruguay
