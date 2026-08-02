# BNC-UY — Inventario de dominios y documentos

**Versión:** 62.0.0
**Fecha:** 2026-08-01
**Estado:** activo

---

## Descripción

Este archivo es el registro maestro de la Base Nacional de Conocimiento Uruguay (BNC-UY). Lista todos los dominios activos, su estructura, cantidad de archivos y estado. Es utilizado por Guyunusa para descubrir qué dominios indexar.

---

## Dominios standalone

Los dominios standalone siguen el formato normalizado BNC-UY: directorio con nombre `<dominio>-uy/`, archivos numerados `01-tema.md … NN-tema.md`, sin frontmatter YAML, con sección `## Palabras clave` al final de cada archivo. Optimizados para BM25 + embedding semántico.

| # | Dominio | Archivos | Descripción |
|---|---|---|---|
| 1 | `agro-uy` | 25 | Sector agropecuario: producción, instituciones (MGAP/INIA/INAC), cultivos, ganadería, forestación, pesca, agroindustria |
| 2 | `archivos-uy` | 10 | Sistema archivístico nacional: AGN, archivos departamentales, universitarios, notariales, normas archivísticas |
| 3 | `arqueologia-uy` | 21 | Arqueología uruguaya: prehistoria, sitios, pueblos originarios, legislación, patrimonio arqueológico |
| 4 | `arquitectura-uy` | 21 | Arquitectura uruguaya: historia, movimientos, obras, arquitectos, patrimonio construido |
| 5 | `basquet-uy` | 18 | Básquetbol uruguayo: historia, LUB, selección nacional, clubes, FUBB, competencias internacionales |
| 6 | `bibliotecas-uy` | 11 | Sistema bibliotecario: BNU, ANEP, UdelaR, municipales, especializadas, normas, Plan Nacional |
| 7 | `ciencias-uy` | 26 | Ciencia y tecnología: investigación, PEDECIBA, ANII, UdelaR, institutos, áreas disciplinarias, Clemente Estable |
| 8 | `clima-meteorologia-uy` | 27 | Clima y meteorología: clasificación, regiones, estaciones, fenómenos, INUMET, cambio climático |
| 9 | `cultura-uy` | 36 | Cultura uruguaya: historia cultural, identidad, candombe (UNESCO), carnaval, literatura, música, teatro, danza, artes visuales, cine, museos, gastronomía, turismo cultural, MEC/SODRE/ICAU |
| 10 | `turismo-uy` | 22 | Turismo uruguayo: historia, MINTUR, economía turística, Montevideo, Punta del Este, Colonia, costa atlántica, Cabo Polonio, naturaleza/SNAP, termas, estancias rurales, turismo cultural, gastronomía/enoturismo, deportes, interior, infraestructura, sostenibilidad, estadísticas |
| 11 | `documentacion-oficial-uy` | 16 | Documentación oficial del Estado: IMPO, Diario Oficial, RNLD, bases normativas, textos ordenados, metodología de referencias para BNC-UY, digitalización documental |
| 12 | `servicio-civil-uy` | 15 | Servicio civil y función pública: ONSC, Estatuto Funcionario Público (Ley 19.121/2013), INAP, ingreso por concurso, carrera administrativa, remuneraciones, régimen disciplinario, incompatibilidades, negociación colectiva (Ley 18.508/COFE), estadísticas empleo público, reforma Estado (AGEV/GpR) |
| 13 | `transparencia-uy` | 15 | Transparencia pública: Ley 18.381, UAIP, JUTEP (Ley 17.060), declaraciones juradas, ética pública, conflicto de intereses, control externo (TCR/AIN/Parlamento), gobierno abierto (OGP), transparencia presupuestal, financiamiento político, contrataciones, lobby (Ley 19.823) |
| 14 | `gobierno-digital-uy` | 15 | Gobierno digital: AGESIC, gub.uy, trámites en línea, identidad digital (eDOC/TuID), firma electrónica, interoperabilidad, datos abiertos, ciberseguridad (CERTuy), inclusión digital (Plan Ibirapitá), Plan Ceibal, contrataciones electrónicas (SICE/Comprauruguay), marco jurídico |
| 15 | `vivienda-uy` | 16 | Vivienda: MVOTMA, ANV, BHU, MEVIR, Ley 13.728/1968, Plan Nacional de Vivienda, cooperativas (FUCVAM/FECOVI), vivienda promovida (Ley 18.795), asentamientos irregulares, crédito hipotecario (UI), ordenamiento territorial (Ley 18.308) |
| 16 | `seguridad-social-uy` | 16 | Seguridad social: BPS, jubilaciones, pensiones, sistema mixto, AFAPs, reformas 1996 y 2023, seguro desempleo, subsidios, asignaciones familiares (AFAM/AFAM-PE), FONASA, cajas paraestatales |
| 17 | `empresas-publicas-uy` | 19 | Empresas públicas: UTE, ANCAP, ANTEL, OSE, BROU, BHU, BSE, AFE, ANP, ASSE; historia estado empresario, marco jurídico, referéndums 1992/2004, regulación, peso económico |
| 18 | `defensa-del-consumidor-uy` | 18 | Defensa del consumidor: Ley 17.250/2000, UDECO/MIEM, derechos del consumidor, garantías, contratos de adhesión, crédito, e-commerce, metrología, competencia (Ley 18.159/COPRODEC), arbitraje, reclamos, publicidad |
| 19 | `departamentos-uy` | 21 | Los 19 departamentos: fichas con datos geográficos, demográficos (Censo 2023), intendencias |
| 20 | `desarrollo-social-inclusion-uy` | 23 | Desarrollo social e inclusión: MIDES, INAU, INJU, INMAYORES, INMUJERES, PRONADIS, SNIC, AFAM-PE, TUS, primera infancia, juventudes, discapacidad, género, pobreza, cooperación internacional |
| 21 | `administracion-publica-estadisticas-uy` | 22 | Administración Pública, Estado uruguayo, servicio civil, gestión pública, gobierno digital, transparencia, INE, estadísticas nacionales, censos, encuestas, indicadores |
| 22 | `economia-finanzas-impuestos-uy` | 25 | Economía, finanzas públicas y tributación: MEF, DGI, BCU, impuestos (IVA/IRPF/IRAE/IASS/IMESI), sistema financiero, comercio exterior, inversiones, estadísticas, CND, ANDE |
| 23 | `sistema-financiero-uy` | 23 | Sistema financiero: BCU, SSF, BROU, BHU, BSE, AFAPs, mercado de valores, seguros, regulación prudencial, inclusión financiera, crisis 1982, crisis 2002, prevención lavado activos |
| 24 | `aduanas-uy` | 21 | Aduanas y comercio exterior: DNA, nomenclatura arancelaria, AEC MERCOSUR, importaciones, exportaciones, regímenes especiales, zonas francas, despachantes, OEA, contrabando |
| 25 | `comercio-exterior-uy` | 21 | Comercio exterior: exportaciones (celulosa, carne, soja, lácteos), importaciones, destinos, MERCOSUR, ALADI, OMC, acuerdo MERCOSUR-UE, China, IED, zonas francas, logística, defensa comercial |
| 26 | `educacion-superior-uy` | 16 | Educación superior: UdelaR, UTEC, universidades privadas, CES/CEIP/ANEPE, titulaciones, internacionalización |
| 27 | `educacion-tecnica-uy` | 13 | Educación técnico-profesional: UTU, CETP, formación dual, cualificaciones, sector productivo |
| 28 | `educacion-uy` | 23 | Sistema educativo nacional: MEC, ANEP, CODICEN, niveles, historia, Plan Ceibal, becas, educación permanente, Varela educador |
| 29 | `energia-uy` | 30 | Energía: UTE, ANCAP, URSEA, matriz energética, renovables, hidroeléctrica, eólica, solar, eficiencia |
| 30 | `geografia-uy` | 23 | Geografía física y humana: relieve, hidrografía, costas, suelos, población, asentamientos, IGM |
| 31 | `justicia-uy` | 20 | Sistema de justicia: Poder Judicial, SCJ, Fiscalía, Defensoría, procesos, mediación, profesiones jurídicas |
| 32 | `movilidad-transporte-uy` | 22 | Movilidad y transporte: MTOP, STM, AFE, ANP, DINACIA, UNASEV, rutas, ferrocarril, aviación, puertos, seguridad vial |
| 33 | `naturaleza-uy` | 31 | Naturaleza y biodiversidad: ecosistemas, flora, fauna, SNAP, parques nacionales, humedales, costas |
| 34 | `oceanografia-uy` | 23 | Oceanografía: Río de la Plata, Océano Atlántico, corrientes, mareas, biodiversidad marina, SOHMA |
| 35 | `patrimonio-uy` | 15 | Patrimonio cultural y natural: UNESCO, MEC, ICOMOS, sitios declarados, política patrimonial |
| 36 | `pueblos-originarios-uy` | 25 | Pueblos originarios: charrúas, guaraníes, chanás, historia, resistencia, identidad contemporánea, legislación |
| 37 | `gastronomia-uy` | 21 | Gastronomía uruguaya: asado, chivito, mate, pasta, vinos Tannat, dulce de leche, ferias, Mercado del Puerto, patrimonio gastronómico, Conaprole, INAVI |
| 38 | `telecomunicaciones-uy` | 21 | Telecomunicaciones y medios: ANTEL, fibra óptica, telefonía móvil, televisión, radio, prensa, Ley 19.307, URSEC, libertad de prensa, brecha digital, convergencia |
| 39 | `medio-ambiente-uy` | 21 | Medio ambiente: Ministerio de Ambiente, DINAMA, SNAP, áreas protegidas, biodiversidad, humedales, costa marina, recursos hídricos, cambio climático, transición energética, energía renovable, residuos, educación ambiental |
| 40 | `derechos-humanos-uy` | 21 | Derechos humanos: INDDHH, dictadura 1973-1985, Ley Caducidad, justicia transicional, reparación víctimas, DESC, derechos de la mujer, LGBTIQ+, afrodescendientes, pueblos indígenas, migración, sistema carcelario |
| 41 | `salud-uy` | 32 | Salud pública y SNIS: MSP, ASSE, FONASA, JUNASA, mutualismo, reforma 2007, atención primaria, epidemiología, vacunación, ENT, cáncer, salud mental, salud materna, IVE, trasplantes, COVID-19, derechos usuarios, salud digital |
| 42 | `tecnologia-uy` | 36 | Tecnología e innovación: industria software, exportación, ecosistema startups, AGESIC, ANII, CUTI, LATU, MIEM, Plan Ceibal, gobierno digital, ciberseguridad, IA, GeneXus, Bantotal, dLocal, PedidosYa, Tryolabs y otras empresas TIC |
| 43 | `deportes-uy` | 26 | Deporte uruguayo: fútbol (AUF, La Celeste, Copa América, Mundial 1930, Maracanazo, Estadio Centenario, Nacional, Peñarol, figuras históricas y contemporáneas), rugby Los Teros, atletismo, remo, ciclismo, vela, deportes de combate, natación, canotaje, tenis, deporte femenino, sistema deportivo COU/ISEF |
| 44 | `cooperativismo-uy` | 20 | Cooperativismo uruguayo: historia, Ley 18.407/2008, INACOOP, CUDECOOP, tipos de cooperativas, FUCVAM, CONAPROLE, cooperativas de trabajo/agrarias/vivienda/consumo/crédito/sociales, economía social y solidaria, género, educación, interior del país |
| 45 | `sindicalismo-uy` | 20 | Sindicalismo uruguayo: CNT/PIT-CNT, historia, Ley 17.940/2006, Ley 18.566/2009, Consejos de Salarios, derecho de huelga, ocupación, sindicatos por sector (público, educación, salud, industria, servicios, agro), dictadura y democracia, género |
| 46 | `afrodescendientes-uy` | 20 | Comunidad afrodescendiente: historia esclavitud, abolición 1842, Barrio Sur/Palermo, candombe (UNESCO 2009), Llamadas, comparsas, umbanda, identidad, discriminación racial, Ley 19.122/2013, INAFRO, estadísticas, música/literatura, figuras históricas, organizaciones civiles |
| 47 | `relaciones-internacionales-uy` | 26 | Relaciones internacionales: historia diplomática 1828–2026, MRREE, política exterior, servicio exterior, relaciones bilaterales (Argentina, Brasil, Paraguay), integración regional, MERCOSUR, ALADI, OEA, ONU, UNESCO, cooperación internacional, tratados, misiones de paz, comercio internacional, asuntos globales, Antártida, fronteras, línea de tiempo, glosario |
| 48 | `seguridad-publica-uy` | 33 | Seguridad pública: Ministerio del Interior, Policía Nacional, jefaturas departamentales, policía científica, cibercrimen, seguridad rural (abigeato), policía caminera, bomberos (DNB), emergencias 911, personas ausentes/Alerta Amber, violencia basada en género (Ley 19.580), trata de personas (Ley 19.643), migración, sistema penitenciario (INR), estadísticas criminalidad y penitenciarias, SGSP, políticas nacionales de seguridad, seguridad privada, asuntos internos, derechos humanos y actuación policial, servicios ciudadanos, tecnología aplicada, línea de tiempo, glosario |
| 49 | `defensa-nacional-uy` | 37 | Defensa nacional: concepto y marco legal (Ley 18.650/2010, Ley 19.775/2019), MDN, conducción política, CODENA, ESMADE, Ejército, Armada, FAU, espacios de soberanía, fronteras, misiones de paz (6 activas), Antártida (IAU/BCAA), CALEN, formación militar, personal, sanidad, servicios sociales, SRPFFAA, aviación civil (DINACIA), accidentes aéreos (JIAIAC), DIH, derechos humanos, cultura de defensa, ciberdefensa, industria, ciencia, apoyo a emergencias, historia militar, dictadura 1973-1985, transición democrática, relaciones internacionales de defensa, ejercicios conjuntos, línea de tiempo, glosario, fuentes, FAQ |
| 50 | `sinae-uy` | 43 | Sistema Nacional de Emergencias y Gestión Integral del Riesgo (GIRD): Ley 18.621, creación y evolución histórica, estructura (Junta Nacional, DNE, CDE, Cecoed), gestión integral del riesgo, prevención, mitigación, preparación, respuesta, rehabilitación, recuperación, principales riesgos (hidrometeorológicos, incendios, hídrico, biológicos, sustancias peligrosas), MAIF, MASHI, MASPEL, MIRA, sistemas de alerta y monitoreo, datos abiertos, visualizadores, centros de evacuación, acción humanitaria, poblaciones vulnerables, comunicación del riesgo, cultura de prevención, guías y recomendaciones, capacitación, planificación, Marco de Sendai, cambio climático, tecnología, eventos históricos, línea de tiempo, glosario, fuentes, FAQ |
| 51 | `historia-uy` | 26 | Historia del Uruguay (1724–2026): período colonial y Banda Oriental, artiguismo, Artigas, independencia 1825–1830, Lavalleja y Treinta y Tres, Fructuoso Rivera, siglo XIX y guerras civiles, reforma vareliana, modelo agroexportador, Batlle y Ordóñez, batllismo y Estado de bienestar, industrialización e ISI, historia económica, crisis del modelo 1955–1973, dictadura cívico-militar (perspectiva histórica), transición democrática, democracia 1985–2005, Frente Amplio en el gobierno, Uruguay contemporáneo 2020–2026, símbolos nacionales, cronología, glosario, fuentes, FAQ |
| 52 | `sistema-politico-uy` | 23 | Sistema político uruguayo: Constitución (historia y texto vigente), Poder Ejecutivo, Poder Legislativo (Parlamento bicameral), Poder Judicial (SCJ, Fiscalía), sistema electoral y balotaje, partidos políticos (Colorado, Nacional, Frente Amplio, Cabildo Abierto), democracia directa (referéndums, iniciativa popular), Corte Electoral, gobierno departamental e intendencias, municipios (Ley 18.567), sociedad civil y medios, historia constitucional, reformas electorales, políticas públicas, relación civiles-militares (Ley 18.650), cronología, glosario, fuentes |
| 53 | `personalidades-uy` | 23 | Personalidades notables de Uruguay: héroes fundacionales (Artigas, Lavalleja, Rivera), escritores y poetas (Rodó, Agustini, Ibarbourou, Quiroga, Benedetti, Onetti, Galeano), pedagogos (Jesualdo Sosa, Reina Reyes, Miguel Soler Roca), figuras políticas contemporáneas (Mujica, Vázquez), música y cultura (Zitarrosa, Viglietti, Rada, Gardel, candombe, murga), deportistas (Tabárez, Ghiggia, Forlán), científicos (Clemente Estable), cronología y fuentes |
| 54 | `agua-uy` | 25 | Recursos hídricos de Uruguay: marco jurídico (Art. 47 Const., Ley 18.610), DINAGUA, Comisiones de Cuenca, OSE (agua potable), DINASA (saneamiento), calidad del agua (eutrofización, Santa Lucía), crisis hídrica 2022-2023, Acuífero Guaraní, aguas termales, CARU (Río Uruguay), Comisión Mixta Merín, conflicto papeleras/UPM, agua y cambio climático, riego agropecuario, agua y energía (represas), pesca continental, navegación fluvial, hidrodinámica del Río Uruguay (modelo TELEMAC 2D), historia hídrica, datos e indicadores, cronología, glosario y fuentes |

**Total: 54 dominios standalone — 1218 archivos**

---

## Dominios no-standalone (subdirectorios)

Dominios con estructura propia pero sin el formato normalizado BNC-UY. Candidatos a conversión futura.

| Dominio | Archivos | Descripción |
|---|---|---|
**Total: 0 dominios no-standalone — 0 archivos**

Todos los dominios no-standalone han sido convertidos al formato BNC-UY standalone.

---

## Documentos planos (raíz)

A julio de 2026, **no hay archivos de contenido en la raíz**. Todos los documentos heredados han sido migrados a dominios standalone, incorporados a dominios existentes, o eliminados por ser redundantes.

La raíz contiene únicamente archivos de infraestructura del repositorio: README.md, inventario.md, knowledge_README.md, auditoria-raiz.md, y templates (template_evento.md, template_institucion.md, template_lugar.md, template_movimiento.md, template_normativa.md, template_obra.md, template_persona.md, template_tema.md).

**Total: 0 archivos de contenido en raíz**

---

## Dominios propuestos (próximas incorporaciones)

A julio de 2026, no hay dominios pendientes de incorporación. Todos los dominios propuestos han sido creados como standalone.

---

## Historial de versiones

| Versión | Fecha | Cambio principal |
|---|---|---|
| 62.0.0 | 2026-08-01 | Enriquecimiento de `oceanografia-uy` con contenido del IAR Viridien 2025 (prospección sísmica 3D ZEE). Actualizados: `07-geologia-marina.md` (3 cuencas offshore con nombres, 7 sistemas de cañones, 17 montículos carbonáticos, 41 pockmarks, bloques OFF-1–OFF-7, Res. MIEM 198/23); `04-zona-economica-exclusiva.md` (exploración sísmica ANCAP/Viridien, 5 cables submarinos activos: SAM-1/SAC/Tannat/Malbec/Firmina); `16-conservacion-marina.md` (8 sitios conservación ZEE: RM 1151/2022 — Banco Inglés, Lobos, Restinga Pez Limón, Pozo de Fango, moluscos, ACPM merluza, talud, cañones); `08-recursos-marinos.md` (categorías flota A/B/C/D, ZCPAU, mínimo merluza 10.576 t/2021, flota: 6/55 barcos operativos a enero 2025). Sin cambio en cantidad de archivos (22 + README = 23). Total: 54 dominios, 1218 archivos. |
| 61.0.0 | 2026-08-01 | Nuevo archivo `agua-uy/24-hidrodinamica-rio-uruguay.md`: modelo hidrodinámico bidimensional TELEMAC 2D del tramo Salto Grande – Nueva Palmira (Junes, Fossati, Solari; IMFIA/UdelaR; AIDIS 2019; financiado por CARU). Inversiones de flujo hasta La Calera en caudales bajos y medios; dominio del Río de la Plata en el tramo Fray Bentos – Nueva Palmira; velocidades máximas ~2,5 m/s en caudal alto. agua-uy: 25 archivos. Total: 54 dominios, 1218 archivos. |
| 60.0.0 | 2026-07-31 | Alta de `agua-uy` (24 archivos: README + 23 contenido). Dominio de recursos hídricos: marco jurídico (Art. 47, Ley 18.610), DINAGUA, Comisiones de Cuenca, OSE, DINASA, calidad del agua, crisis 2022-2023, Acuífero Guaraní, aguas termales, CARU, Comisión Mixta Merín, conflicto papeleras, agua y cambio climático, riego agropecuario, agua y energía hidroeléctrica, pesca continental, navegación fluvial, historia hídrica, datos e indicadores, cronología, glosario y fuentes. Total: 54 dominios, 1217 archivos. |
| 59.0.0 | 2026-07-31 | Alta de `personalidades-uy` (23 archivos: README + 22 contenido). Perfiles de héroes fundacionales, escritores (Rodó, Agustini, Ibarbourou, Quiroga, Benedetti, Onetti, Galeano), pedagogos (Jesualdo Sosa, Reina Reyes, Soler Roca), figuras políticas (Mujica, Vázquez), músicos (Zitarrosa, Viglietti, Rada), deportistas (Tabárez, Ghiggia, Forlán), científicos (Estable). Incorporaciones Grupo A: crisis_1982→sistema-financiero-uy (archivo 21), crisis_2002→sistema-financiero-uy (22), cnd→economia-finanzas-impuestos-uy (23), ande→economia-finanzas-impuestos-uy (24), varela_educador→educacion-uy (22), clemente_estable→ciencias-uy (26). Raíz de contenido: 0 archivos — migración completa del corpus heredado. |
| 58.0.0 | 2026-07-31 | Alta de `sistema-politico-uy` (23 archivos: README + 22 contenido). Dominio del sistema político: Constitución, tres poderes, partidos políticos (Colorado, Nacional, FA, Cabildo Abierto), sistema electoral, balotaje, democracia directa, Corte Electoral, gobierno departamental, municipios, sociedad civil, historia constitucional, reformas electorales, relación civiles-militares. Archivos raíz eliminados: sistema_politico, parlamento, frente_amplio, partido_colorado, partido_nacional, corte_electoral. |
| 57.0.0 | 2026-07-31 | Alta de `historia-uy` (26 archivos: README + 25 contenido). Dominio de historia nacional: período colonial, artiguismo, Artigas, independencia, Lavalleja, Rivera, siglo XIX, reforma vareliana, modelo agroexportador, Batlle y Ordóñez, batllismo, ISI, historia económica, crisis 1955–1973, dictadura (perspectiva histórica), transición democrática, democracia 1985–2005, FA en gobierno, Uruguay contemporáneo, símbolos nacionales, cronología, glosario, fuentes, FAQ. Archivos raíz migrados al dominio: historia.md, batllismo.md, independencia.md, grito_asencio.md, industrializacion.md, modelo_agroexportador.md, historia_economica.md, democracia.md, simbolos_nacionales.md, artigas.md, lavalleja.md, rivera.md, batlle_ordonez.md, dictadura.md. |
| 56.0.0 | 2026-07-31 | Corrección de inventario: `defensa-del-consumidor-uy`, `empresas-publicas-uy` y `seguridad-social-uy` ya incorporados como standalone (filas 16–18). Eliminados de "Dominios propuestos". Sección propuestos actualizada: sin pendientes. |
| 55.0.0 | 2026-07-31 | Alta de `sinae-uy` (43 archivos: README + 42 contenido). Dominio del Sistema Nacional de Emergencias y GIRD: Ley 18.621, estructura institucional (Junta Nacional, DNE, CDE, Cecoed), gestión integral del riesgo, riesgos hidrometeorológicos, incendios, hídrico, MAIF/MASHI/MASPEL, MIRA, alertas, datos abiertos, acción humanitaria, cultura preventiva, Marco de Sendai, cambio climático, tecnología, eventos históricos, glosario y FAQ. |
| 54.0.0 | 2026-07-31 | Alta de `defensa-nacional-uy` (37 archivos: README + 36 contenido). Dominio de defensa nacional: MDN, CODENA, ESMADE, tres fuerzas, misiones de paz, Antártida, CALEN, DIH, historia, dictadura, transición democrática, relaciones internacionales de defensa, ejercicios conjuntos, industria, ciberdefensa y glosario. |
| 53.0.0 | 2026-07-31 | Alta de `seguridad-publica-uy` (33 archivos: README + 32 contenido). Dominio de seguridad pública: Ministerio del Interior, Policía Nacional, unidades especializadas, bomberos, emergencias, sistema penitenciario, estadísticas, políticas de seguridad y glosario. |
| 52.0.0 | 2026-07-31 | Alta de `relaciones-internacionales-uy` (26 archivos: README + 25 contenido). Dominio de relaciones internacionales, política exterior, MERCOSUR, ALADI, ONU, OEA, UNESCO, misiones de paz, Antártida y fronteras. Inventario supera los 1000 archivos. |
| 51.0.0 | 2026-07-30 | Alta de `afrodescendientes-uy` (20 archivos: README + 19 contenido). Nuevo dominio standalone. |
| 50.0.0 | 2026-07-30 | Alta de `sindicalismo-uy` (20 archivos: README + 19 contenido). Nuevo dominio standalone. |
| 49.0.0 | 2026-07-30 | Alta de `cooperativismo-uy` (20 archivos: README + 19 contenido). Nuevo dominio standalone. |
| 48.0.0 | 2026-07-30 | Alta de `deportes-uy` (26 archivos: README + 25 contenido). Nuevo dominio standalone de deporte uruguayo. |
| 47.0.0 | 2026-07-30 | Conversión de `tecnologia` a standalone `tecnologia-uy` (36 archivos: README + 35 contenido). Todos los dominios no-standalone convertidos. |
| 46.0.0 | 2026-07-30 | Conversión de `salud` a standalone `salud-uy` (32 archivos: README + 31 contenido) |
| 45.0.0 | 2026-07-30 | Conversión de `derechos-humanos` a standalone `derechos-humanos-uy` (21 archivos: README + 20 contenido) |
| 44.0.0 | 2026-07-30 | Conversión de `medio-ambiente` a standalone `medio-ambiente-uy` (21 archivos: README + 20 contenido) |
| 43.0.0 | 2026-07-30 | Conversión de `telecomunicaciones` a standalone `telecomunicaciones-uy` (21 archivos: README + 20 contenido) |
| 42.0.0 | 2026-07-30 | Conversión de `gastronomia` a standalone `gastronomia-uy` (21 archivos: README + 20 contenido) |
| 41.0.0 | 2026-07-30 | Alta de `documentacion-oficial-uy` (16 archivos: README + 15 contenido) — dominio transversal de trazabilidad normativa |
| 40.0.0 | 2026-07-30 | Alta de `servicio-civil-uy` (15 archivos: README + 14 contenido) |
| 39.0.0 | 2026-07-30 | Alta de `transparencia-uy` (15 archivos: README + 14 contenido) |
| 38.0.0 | 2026-07-30 | Alta de `gobierno-digital-uy` (15 archivos: README + 14 contenido) |
| 37.0.0 | 2026-07-30 | Alta de `vivienda-uy` (16 archivos: README + 15 contenido) |
| 36.0.0 | 2026-07-29 | Alta de `seguridad-social-uy` (16 archivos: README + 15 contenido) |
| 35.0.0 | 2026-07-29 | Alta de `empresas-publicas-uy` (19 archivos: README + 18 contenido) |
| 34.0.0 | 2026-07-29 | Alta de `defensa-del-consumidor-uy` (18 archivos: README + 17 contenido) |
| 33.0.0 | 2026-07-29 | Alta de `turismo-uy` (22 archivos: README + 21 contenido) |
| 32.0.0 | 2026-07-29 | Consolidación y expansión de `cultura-uy`: de 17 a 36 archivos (README + 35 contenido) |
| 31.0.0 | 2026-07-27 | Alta de `desarrollo-social-inclusion-uy` (23 archivos) |
| 30.0.0 | 2026-07-27 | Alta de `comercio-exterior-uy` (21 archivos) |
| 29.0.0 | 2026-07-27 | Alta de `aduanas-uy` (21 archivos) |
| 28.0.0 | 2026-07-27 | Alta de `sistema-financiero-uy` (21 archivos) |
| 27.0.0 | 2026-07-27 | Alta de `administracion-publica-estadisticas-uy` (22 archivos) |
| 26.0.0 | 2026-07-27 | Alta de `economia-finanzas-impuestos-uy` (23 archivos); reconstrucción del inventario con métricas completas |
| 25.0.0 | 2026-07-27 | Alta de `movilidad-transporte-uy` (22 archivos) |
| 24.0.0 | 2026-07-26 | Alta de `archivos-uy` (10 archivos) |
| 23.0.0 | 2026-07-26 | Alta de `bibliotecas-uy` (11 archivos) |
| 22.0.0 | 2026-07-26 | Alta de `cultura-uy`, `educacion-superior-uy`, `educacion-tecnica-uy`, `patrimonio-uy` |
| 21.0.0 | 2026-07-26 | Alta de `justicia-uy` (20 archivos) |
| 20.0.0 | 2026-07-25 | Alta de `educacion-uy` (22 archivos) |
| …anteriores | 2026-07 | Dominios: arqueologia-uy, oceanografia-uy, clima-meteorologia-uy, departamentos-uy, agro-uy, geografia-uy, naturaleza-uy, ciencias-uy, arquitectura-uy, basquet-uy, energia-uy, pueblos-originarios-uy |
