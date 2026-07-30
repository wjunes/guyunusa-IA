# BNC-UY — Inventario de dominios y documentos

**Versión:** 33.0.0
**Fecha:** 2026-07-29
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
| 7 | `ciencias-uy` | 25 | Ciencia y tecnología: investigación, PEDECIBA, ANII, UdelaR, institutos, áreas disciplinarias |
| 8 | `clima-meteorologia-uy` | 27 | Clima y meteorología: clasificación, regiones, estaciones, fenómenos, INUMET, cambio climático |
| 9 | `cultura-uy` | 36 | Cultura uruguaya: historia cultural, identidad, candombe (UNESCO), carnaval, literatura, música, teatro, danza, artes visuales, cine, museos, gastronomía, turismo cultural, MEC/SODRE/ICAU |
| 10 | `turismo-uy` | 22 | Turismo uruguayo: historia, MINTUR, economía turística, Montevideo, Punta del Este, Colonia, costa atlántica, Cabo Polonio, naturaleza/SNAP, termas, estancias rurales, turismo cultural, gastronomía/enoturismo, deportes, interior, infraestructura, sostenibilidad, estadísticas |
| 11 | `departamentos-uy` | 21 | Los 19 departamentos: fichas con datos geográficos, demográficos (Censo 2023), intendencias |
| 12 | `desarrollo-social-inclusion-uy` | 23 | Desarrollo social e inclusión: MIDES, INAU, INJU, INMAYORES, INMUJERES, PRONADIS, SNIC, AFAM-PE, TUS, primera infancia, juventudes, discapacidad, género, pobreza, cooperación internacional |
| 13 | `administracion-publica-estadisticas-uy` | 22 | Administración Pública, Estado uruguayo, servicio civil, gestión pública, gobierno digital, transparencia, INE, estadísticas nacionales, censos, encuestas, indicadores |
| 14 | `economia-finanzas-impuestos-uy` | 23 | Economía, finanzas públicas y tributación: MEF, DGI, BCU, impuestos (IVA/IRPF/IRAE/IASS/IMESI), sistema financiero, comercio exterior, inversiones, estadísticas |
| 15 | `sistema-financiero-uy` | 21 | Sistema financiero: BCU, SSF, BROU, BHU, BSE, AFAPs, mercado de valores, seguros, regulación prudencial, inclusión financiera, crisis 2002, prevención lavado activos |
| 16 | `aduanas-uy` | 21 | Aduanas y comercio exterior: DNA, nomenclatura arancelaria, AEC MERCOSUR, importaciones, exportaciones, regímenes especiales, zonas francas, despachantes, OEA, contrabando |
| 17 | `comercio-exterior-uy` | 21 | Comercio exterior: exportaciones (celulosa, carne, soja, lácteos), importaciones, destinos, MERCOSUR, ALADI, OMC, acuerdo MERCOSUR-UE, China, IED, zonas francas, logística, defensa comercial |
| 18 | `educacion-superior-uy` | 16 | Educación superior: UdelaR, UTEC, universidades privadas, CES/CEIP/ANEPE, titulaciones, internacionalización |
| 19 | `educacion-tecnica-uy` | 13 | Educación técnico-profesional: UTU, CETP, formación dual, cualificaciones, sector productivo |
| 20 | `educacion-uy` | 22 | Sistema educativo nacional: MEC, ANEP, CODICEN, niveles, historia, Plan Ceibal, becas, educación permanente |
| 21 | `energia-uy` | 30 | Energía: UTE, ANCAP, URSEA, matriz energética, renovables, hidroeléctrica, eólica, solar, eficiencia |
| 22 | `geografia-uy` | 23 | Geografía física y humana: relieve, hidrografía, costas, suelos, población, asentamientos, IGM |
| 23 | `justicia-uy` | 20 | Sistema de justicia: Poder Judicial, SCJ, Fiscalía, Defensoría, procesos, mediación, profesiones jurídicas |
| 24 | `movilidad-transporte-uy` | 22 | Movilidad y transporte: MTOP, STM, AFE, ANP, DINACIA, UNASEV, rutas, ferrocarril, aviación, puertos, seguridad vial |
| 25 | `naturaleza-uy` | 31 | Naturaleza y biodiversidad: ecosistemas, flora, fauna, SNAP, parques nacionales, humedales, costas |
| 26 | `oceanografia-uy` | 23 | Oceanografía: Río de la Plata, Océano Atlántico, corrientes, mareas, biodiversidad marina, SOHMA |
| 27 | `patrimonio-uy` | 15 | Patrimonio cultural y natural: UNESCO, MEC, ICOMOS, sitios declarados, política patrimonial |
| 28 | `pueblos-originarios-uy` | 25 | Pueblos originarios: charrúas, guaraníes, chanás, historia, resistencia, identidad contemporánea, legislación |

**Total: 28 dominios standalone — 608 archivos**

---

## Dominios no-standalone (subdirectorios)

Dominios con estructura propia pero sin el formato normalizado BNC-UY. Candidatos a conversión futura.

| Dominio | Archivos | Descripción |
|---|---|---|
| `derechos-humanos/` | 21 | Derechos humanos: historia, dictadura, INDDHH, normativa, pasado reciente |
| `gastronomia/` | 21 | Gastronomía uruguaya: platos, ingredientes, tradiciones culinarias, chivito, asado, mate |
| `medio-ambiente/` | 21 | Medio ambiente: MVOTMA, DINAMA, Agenda 2030, biodiversidad, residuos, cambio climático |
| `salud/` | 32 | Salud: SNIS, MSP, ASSE, mutualistas, FONASA, salud pública, estadísticas |
| `tecnologia/` | 36 | Tecnología e innovación: industria software, startups, AGESIC, gobierno digital, IA, CUTI |
| `telecomunicaciones/` | 21 | Telecomunicaciones: URSEC, ANTEL, espectro, internet, conectividad, regulación |

**Total: 6 dominios no-standalone — 152 archivos**

---

## Documentos planos (raíz)

Archivos .md individuales en la raíz del repositorio, organizados temáticamente por nombre de archivo. Representan el corpus documental heredado, anterior a la estructura standalone.

**Total aproximado: 160 archivos de contenido** (excluye templates y README)

Categorías temáticas principales presentes:

- **Historia**: historia.md, historia_economica.md, batllismo.md, dictadura.md, independencia.md, grito_asencio.md, industrializacion.md, modelo_agroexportador.md, recuperacion_crecimiento.md, crisis_1982.md, crisis_2002.md
- **Política**: sistema_politico.md, parlamento.md, democracia.md, frente_amplio.md, partido_colorado.md, partido_nacional.md, corte_electoral.md, tabare_vazquez.md, jose_mujica.md
- **Economía**: historia_economica.md, conceptos_macroeconomicos.md, politica_fiscal.md, politica_monetaria.md, comercio_exterior.md, economia_conocimiento.md, inversion_extranjera.md, logistica.md, zonas_francas.md, mercosur.md, servicios_financieros.md, sistema_bancario.md, bcu.md, mef.md, dgi.md, ine.md
- **Cultura y arte**: literatura.md, poesia.md, narrativa.md, ensayo.md, teatro.md, teatro_solis.md, teatro_galpon.md, teatro_independiente.md, artes_plasticas.md, musica_tango.md, musica_candombe_beat.md, musica_canto_popular.md, musica_milonga.md, musica_folclore.md, musica_jazz.md, musica_pop.md, musica_rock.md, musica_tropical.md, musica_academica.md, sodre.md
- **Carnaval y candombe**: candombe_historia.md, candombe_comparsas.md, candombe_tambores.md, candombe_llamadas.md, candombe_personajes.md, carnaval_historia.md, carnaval_murgas.md, carnaval_comparsas.md, carnaval_daecpu.md, carnaval_humoristas.md, carnaval_parodistas.md, carnaval_revistas.md, carnaval_teatro_verano.md

---

## Dominios propuestos (próximas incorporaciones)

| Dominio propuesto | Justificación |
|---|---|
| `defensa-del-consumidor-uy` | UDECO, Ley 17.250/2000, derechos del consumidor, metrología, defensa de la competencia (Ley 18.159) |
| `empresas-publicas-uy` | ANCAP, UTE, ANTEL, OSE, AFE, ANP, BSE, BROU, BHU: misión, historia, marco legal, regulación |
| `seguridad-social-uy` | BPS, AFAPs, pensiones, jubilaciones, reforma previsional (Ley 20.130/2023), subsidios, asignaciones familiares |
| `vivienda-uy` | MVOTMA, ANV, BHU, Plan Nacional de Vivienda, cooperativas, MEVIR, políticas habitacionales |
| `gobierno-digital-uy` | AGESIC, identidad digital, trámites en línea, interoperabilidad |
| `transparencia-uy` | acceso a la información pública, Ley 18.381, UAIP, ética pública |
| `servicio-civil-uy` | ONSC, función pública, carrera administrativa, concursos |

---

## Historial de versiones

| Versión | Fecha | Cambio principal |
|---|---|---|
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
