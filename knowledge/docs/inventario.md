# Inventario BCN-UY

Versión: 14.0.0
Fecha: 2026-07-23
Estado: en desarrollo activo

---

## Resumen

| Métrica | Valor |
|---------|-------|
| Dominios activos | 19 |
| Documentos de contenido | 307 |
| Instituciones | 48 |
| Empresas (EMP) | 12 |
| Conceptos (CON) | 17 |
| Personas TEC | 2 |
| Personas SAL | 3 |
| Personas GAS | 2 |
| Personas DRH | 2 |
| Personas MAM | 2 |
| Personas TEL | 2 |
| Plantillas | 8 |
| Documentos de sistema | 3 |
| Total documentos | ~377 |
| Dominios pendientes | 0 |
| **Dominios standalone** | **4** |
| **Docs standalone (basquet-uy)** | **22** |
| **Docs standalone (arquitectura-uy)** | **22** |
| **Docs standalone (ciencias-uy)** | **27** |
| **Docs standalone (naturaleza-uy)** | **30** |

### Tipos de documento disponibles
- **Empresa (EMP):** documentos sobre empresas (TEC). Prefijo EMP.
- **Concepto (CON):** documentos conceptuales (TEC, SAL). Prefijo CON.
- **Tema (TEM), Persona (PER), Institución (INS), Lugar (LUG), Evento (EVT), Obra (OBR), Movimiento (MOV), Normativa (NOR):** tipos estándar de la BCN-UY.

---

## Estructura de directorios

```
knowledge/
├── docs/
│   ├── README.md
│   ├── ids.md
│   └── inventario.md
├── tecnologia/
│   ├── panorama_sector_tecnologico.md
│   ├── historia_informatica_uruguay.md
│   ├── evolucion_industria_software.md
│   ├── ecosistema_startups.md
│   ├── exportacion_software.md
│   ├── gobierno_digital.md
│   ├── inteligencia_artificial_uruguay.md
│   ├── formacion_tecnologica.md
│   ├── marco_legal_incentivos_software.md
│   ├── ciberseguridad_uruguay.md
│   ├── investigacion_innovacion_tech.md
│   ├── tecnologias_emergentes.md
│   ├── software_saas_uruguay.md
│   ├── transformacion_digital_concepto.md
│   ├── ia_concepto.md
│   ├── gobierno_electronico_concepto.md
│   ├── empresas/
│   │   ├── genexus_artech.md
│   │   ├── dlocal.md
│   │   ├── pedidosya.md
│   │   ├── bantotal.md
│   │   ├── quanam.md
│   │   ├── tryolabs.md
│   │   ├── infocorp.md
│   │   ├── pyxis.md
│   │   ├── abstracta.md
│   │   ├── arkano_software.md
│   │   ├── netlabs.md
│   │   └── scanntech.md
│   ├── instituciones/
│   │   ├── agesic.md
│   │   ├── anii.md
│   │   ├── cuti.md
│   │   ├── miem.md
│   │   ├── latu.md
│   │   └── plan_ceibal_tecnologia.md
│   └── personas/
│       ├── nicolas_jodal.md
│       └── sebastian_kanovich.md
├── medio-ambiente/
│   ├── panorama_medio_ambiente.md
│   ├── energia_renovable.md
│   ├── recursos_hidricos.md
│   ├── biodiversidad.md
│   ├── areas_protegidas.md
│   ├── cambio_climatico.md
│   ├── contaminacion_residuos.md
│   ├── industria_forestal_ambiente.md
│   ├── agroquimicos_soja.md
│   ├── costa_marina.md
│   ├── humedales.md
│   ├── politica_ambiental.md
│   ├── ciudades_ambiente.md
│   ├── educacion_ambiental.md
│   ├── transicion_energetica_concepto.md
│   ├── huella_carbono_uruguay.md
│   ├── instituciones/
│   │   ├── ministerio_ambiente.md
│   │   ├── dinama.md
│   │   └── snap.md
│   └── personas/
│       ├── daniel_vidart.md
│       └── ramon_mendez.md
├── telecomunicaciones/
│   ├── panorama_telecomunicaciones.md
│   ├── antel_historia.md
│   ├── internet_conectividad.md
│   ├── telefonia_movil.md
│   ├── radio_uruguay.md
│   ├── television_uruguay.md
│   ├── television_digital.md
│   ├── medios_publicos.md
│   ├── prensa_escrita.md
│   ├── medios_digitales.md
│   ├── medios_interior.md
│   ├── marco_regulatorio.md
│   ├── brecha_digital.md
│   ├── libertad_prensa.md
│   ├── pluralismo_concentracion.md
│   ├── convergencia_digital.md
│   ├── instituciones/
│   │   ├── antel.md
│   │   ├── ursec.md
│   │   └── tv_nacional.md
│   └── personas/
│       ├── carlos_quijano.md
│       └── german_araujo.md
├── derechos-humanos/
│   ├── panorama_derechos_humanos.md
│   ├── historia_derechos_humanos.md
│   ├── dictadura_derechos_humanos.md
│   ├── memoria_verdad_justicia.md
│   ├── derechos_civiles_politicos.md
│   ├── derechos_economicos_sociales_culturales.md
│   ├── derechos_infancia_adolescencia.md
│   ├── derechos_mujer_genero.md
│   ├── diversidad_sexual_identidad_genero.md
│   ├── derechos_pueblos_indigenas.md
│   ├── afrodescendientes_uruguay.md
│   ├── migracion_derechos.md
│   ├── sistema_carcelario.md
│   ├── marco_institucional_ddhh.md
│   ├── ley_caducidad_impunidad.md
│   ├── reparacion_victimas.md
│   ├── instituciones/
│   │   ├── inddhh.md
│   │   ├── secretaria_ddhh_pasado_reciente.md
│   │   └── inmujeres.md
│   └── personas/
│       ├── elena_quinteros.md
│       └── luisa_cuesta.md
├── gastronomia/
│   ├── panorama_gastronomia_uruguaya.md
│   ├── asado_uruguayo.md
│   ├── chivito.md
│   ├── mate_gastronomia.md
│   ├── dulce_de_leche.md
│   ├── vinos_tannat.md
│   ├── pasta_gastronomia.md
│   ├── gastronomia_campo.md
│   ├── pescados_mariscos.md
│   ├── panaderia_reposteria.md
│   ├── ferias_mercados.md
│   ├── gastronomia_contemporanea_montevideo.md
│   ├── productos_lacteos.md
│   ├── bebidas_tradicionales.md
│   ├── terroir_uruguayo.md
│   ├── patrimonio_gastronomico.md
│   ├── instituciones/
│   │   ├── mercado_puerto.md
│   │   ├── conaprole.md
│   │   └── inavi.md
│   └── personas/
│       ├── lucia_soria.md
│       └── roberto_bueno.md
├── salud/
│   ├── panorama_sistema_salud.md
│   ├── historia_salud_publica.md
│   ├── reforma_salud_2007.md
│   ├── organizacion_snis.md
│   ├── atencion_primaria.md
│   ├── atencion_secundaria_terciaria.md
│   ├── vacunacion.md
│   ├── salud_materno_infantil.md
│   ├── salud_mental.md
│   ├── salud_sexual_reproductiva.md
│   ├── control_cancer.md
│   ├── enfermedades_no_transmisibles.md
│   ├── enfermedades_transmisibles.md
│   ├── salud_publica_epidemiologia.md
│   ├── derechos_usuarios_salud.md
│   ├── salud_digital.md
│   ├── emergencias_sanitarias.md
│   ├── profesionales_salud.md
│   ├── mutualismo_iamc.md
│   ├── cuidados_paliativos_trasplantes.md
│   ├── cobertura_universal_salud.md
│   ├── medicina_preventiva_concepto.md
│   ├── epidemiologia_concepto.md
│   ├── instituciones/
│   │   ├── msp.md
│   │   ├── asse.md
│   │   ├── junasa.md
│   │   ├── fonasa.md
│   │   ├── facultad_medicina.md
│   │   └── escuela_enfermeria.md
│   └── personas/
│       ├── manuel_quintela.md
│       ├── roberto_caldeyro_barcia.md
│       └── julio_cesar_estol.md
├── templates/
│   ├── template_persona.md
│   ├── template_tema.md
│   ├── template_movimiento.md
│   ├── template_institucion.md
│   ├── template_lugar.md
│   ├── template_evento.md
│   ├── template_obra.md
│   └── template_normativa.md
├── instituciones/
│   ├── daecpu.md
│   ├── sodre.md
│   ├── teatro_galpon.md
│   ├── comedia_nacional.md
│   ├── parlamento.md
│   ├── corte_electoral.md
│   ├── auf.md
│   ├── anep.md
│   ├── codicen.md
│   ├── dgeip.md
│   ├── dges.md
│   ├── utu.md
│   ├── mec.md
│   ├── udelar.md
│   ├── utec.md
│   ├── ineed.md
│   ├── bcu.md
│   ├── mef.md
│   ├── ine.md
│   ├── bps.md
│   ├── dgi.md
│   ├── uruguay_xxi.md
│   ├── ande.md
│   └── cnd.md
├── economia/
│   ├── historia_economica.md
│   ├── modelo_agroexportador.md
│   ├── industrializacion.md
│   ├── crisis_1982.md
│   ├── crisis_2002.md
│   ├── recuperacion_crecimiento.md
│   ├── produccion_agropecuaria.md
│   ├── ganaderia.md
│   ├── agricultura.md
│   ├── industria_forestal.md
│   ├── industria_alimentaria.md
│   ├── pesca.md
│   ├── energia.md
│   ├── logistica.md
│   ├── servicios_financieros.md
│   ├── turismo_economia.md
│   ├── industria_software.md
│   ├── economia_conocimiento.md
│   ├── desarrollo_sostenible.md
│   ├── comercio_exterior.md
│   ├── mercosur.md
│   ├── zonas_francas.md
│   ├── inversion_extranjera.md
│   ├── politica_fiscal.md
│   ├── politica_monetaria.md
│   ├── sistema_bancario.md
│   └── conceptos_macroeconomicos.md
└── cultura/
    ├── carnaval/
    │   ├── historia.md
    │   ├── murgas/murgas.md
    │   ├── comparsas/comparsas.md
    │   ├── humoristas/humoristas.md
    │   ├── parodistas/parodistas.md
    │   ├── revistas/revistas.md
    │   └── teatro-verano/teatro_verano.md
    ├── candombe/
    │   ├── historia.md
    │   ├── llamadas.md
    │   ├── tambores.md
    │   ├── personajes.md
    │   ├── comparsas/comparsas.md
    │   ├── lagrima_rios.md
    │   └── rosa_luna.md
    ├── musica/
    │   ├── canto_popular.md
    │   ├── rock.md
    │   ├── tango.md
    │   ├── jazz.md
    │   ├── folclore.md
    │   ├── milonga.md
    │   ├── candombe_beat.md
    │   ├── tropical.md
    │   ├── pop.md
    │   ├── academica.md
    │   └── ramon_collazo.md
    ├── literatura/
    │   ├── literatura.md
    │   ├── narrativa.md
    │   ├── poesia.md
    │   ├── ensayo.md
    │   ├── benedetti.md
    │   ├── onetti.md
    │   ├── galeano.md
    │   ├── idea_vilarino.md
    │   ├── delmira_agustini.md
    │   ├── horacio_quiroga.md
    │   ├── juana_de_ibarbourou.md
    │   ├── felisberto_hernandez.md
    │   └── jose_enrique_rodo.md
    ├── teatro/
    │   ├── teatro.md
    │   ├── teatro_independiente.md
    │   ├── teatro_solis.md
    │   ├── atahualpa_del_cioppo.md
    │   ├── china_zorrilla.md
    │   ├── cristina_moran.md
    │   ├── cuque_sclavo.md
    │   ├── taco_larreta.md
    │   ├── alberto_candeau.md
    │   ├── nelly_goitino.md
    │   ├── jorge_bolani.md
    │   ├── florencio_sanchez.md
    │   └── mariana_percovich.md
    ├── plastica/
    │   ├── artes_plasticas.md
    │   ├── torres_garcia.md
    │   ├── pedro_figari.md
    │   ├── paez_vilaro.md
    │   ├── jose_cuneo.md
    │   ├── juan_manuel_blanes.md
    │   ├── museo_torres_garcia.md
    │   └── casapueblo.md
    ├── historia/
    │   ├── historia.md
    │   ├── independencia.md
    │   ├── batllismo.md
    │   ├── dictadura.md
    │   ├── democracia.md
    │   ├── artigas.md
    │   ├── batlle_ordonez.md
    │   ├── lavalleja.md
    │   ├── rivera.md
    │   ├── grito_asencio.md
    │   └── declaracion_independencia.md
    ├── politica/
    │   ├── sistema_politico.md
    │   ├── partido_colorado.md
    │   ├── partido_nacional.md
    │   ├── frente_amplio.md
    │   ├── jose_pedro_varela.md
    │   ├── jose_mujica.md
    │   └── tabare_vazquez.md
    ├── identidad/
    │   ├── identidad.md
    │   ├── mate.md
    │   ├── gastronomia.md
    │   ├── simbolos_nacionales.md
    │   ├── ser_uruguayo.md
    │   └── pueblo_charrua.md
    ├── turismo/
    │   ├── turismo.md
    │   ├── turismo_naturaleza.md
    │   ├── turismo_playa.md
    │   ├── punta_del_este.md
    │   ├── colonia_del_sacramento.md
    │   ├── cabo_polonio.md
    │   ├── quebrada_cuervos.md
    │   ├── valle_lunarejo.md
    │   ├── parque_santa_teresa.md
    │   └── cerro_catedral.md
    ├── deportes/
    │   ├── deportes.md
    │   ├── futbol_uruguayo.md
    │   ├── la_celeste.md
    │   ├── estadio_centenario.md
    │   ├── mundial_1930.md
    │   ├── maracanazo.md
    │   ├── obdulio_varela.md
    │   ├── enzo_francescoli.md
    │   ├── diego_forlan.md
    │   ├── ladislao_mazurkiewicz.md
    │   ├── luis_suarez.md
    │   └── edinson_cavani.md
    └── educacion/
        ├── sistema_educativo.md
        ├── historia_educacion.md
        ├── educacion_inicial_primaria.md
        ├── educacion_media.md
        ├── educacion_tecnico_profesional.md
        ├── educacion_terciaria.md
        ├── plan_ceibal.md
        ├── educacion_permanente.md
        ├── varela_educador.md
        ├── carlos_vaz_ferreira.md
        ├── reina_reyes.md
        ├── jesualdo_sosa.md
        ├── clemente_estable.md
        └── miguel_soler_roca.md
```

---

## Documentos por dominio

### Salud

#### Documentos temáticos SAL

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_SAL_0001 | salud/panorama_sistema_salud.md | Panorama del sistema de salud uruguayo | Tema | verificado |
| TEM_SAL_0002 | salud/historia_salud_publica.md | Historia de la salud pública en Uruguay | Tema | verificado |
| TEM_SAL_0003 | salud/reforma_salud_2007.md | Reforma del sistema de salud (2007) y creación del SNIS | Tema | verificado |
| TEM_SAL_0004 | salud/organizacion_snis.md | Organización y funcionamiento del SNIS | Tema | verificado |
| TEM_SAL_0005 | salud/atencion_primaria.md | Atención primaria de salud en Uruguay | Tema | verificado |
| TEM_SAL_0006 | salud/atencion_secundaria_terciaria.md | Atención secundaria y terciaria en Uruguay | Tema | verificado |
| TEM_SAL_0007 | salud/vacunacion.md | Programa Nacional de Vacunación de Uruguay | Tema | verificado |
| TEM_SAL_0008 | salud/salud_materno_infantil.md | Salud materno-infantil en Uruguay | Tema | verificado |
| TEM_SAL_0009 | salud/salud_mental.md | Salud mental en Uruguay | Tema | verificado |
| TEM_SAL_0010 | salud/salud_sexual_reproductiva.md | Salud sexual y reproductiva en Uruguay | Tema | verificado |
| TEM_SAL_0011 | salud/control_cancer.md | Control del cáncer en Uruguay | Tema | verificado |
| TEM_SAL_0012 | salud/enfermedades_no_transmisibles.md | Enfermedades no transmisibles en Uruguay | Tema | verificado |
| TEM_SAL_0013 | salud/enfermedades_transmisibles.md | Enfermedades transmisibles — VIH/SIDA, tuberculosis e ITS | Tema | verificado |
| TEM_SAL_0014 | salud/salud_publica_epidemiologia.md | Salud pública y vigilancia epidemiológica en Uruguay | Tema | verificado |
| TEM_SAL_0015 | salud/derechos_usuarios_salud.md | Derechos y deberes de los usuarios de salud en Uruguay | Tema | verificado |
| TEM_SAL_0016 | salud/salud_digital.md | Salud digital — historia clínica electrónica y telemedicina | Tema | verificado |
| TEM_SAL_0017 | salud/emergencias_sanitarias.md | Emergencias sanitarias y gestión de crisis — COVID-19 | Tema | verificado |
| TEM_SAL_0018 | salud/profesionales_salud.md | Formación y ejercicio profesional en salud en Uruguay | Tema | verificado |
| TEM_SAL_0019 | salud/mutualismo_iamc.md | El mutualismo y las IAMC en Uruguay | Tema | verificado |
| TEM_SAL_0020 | salud/cuidados_paliativos_trasplantes.md | Cuidados paliativos y trasplante de órganos en Uruguay | Tema | verificado |

#### Instituciones SAL

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| INS_SAL_0001 | salud/instituciones/msp.md | Ministerio de Salud Pública (MSP) | Institución | verificado |
| INS_SAL_0002 | salud/instituciones/asse.md | Administración de los Servicios de Salud del Estado (ASSE) | Institución | verificado |
| INS_SAL_0003 | salud/instituciones/junasa.md | Junta Nacional de Salud (JUNASA) | Institución | verificado |
| INS_SAL_0004 | salud/instituciones/fonasa.md | Fondo Nacional de Salud (FONASA) | Institución | verificado |
| INS_SAL_0005 | salud/instituciones/facultad_medicina.md | Facultad de Medicina (Universidad de la República) | Institución | verificado |
| INS_SAL_0006 | salud/instituciones/escuela_enfermeria.md | Escuela Universitaria de Enfermería (EUE) — Udelar | Institución | verificado |

#### Personas SAL

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| PER_SAL_0001 | salud/personas/manuel_quintela.md | Manuel Quintela | Persona | verificado_con_reservas |
| PER_SAL_0002 | salud/personas/roberto_caldeyro_barcia.md | Roberto Caldeyro Barcia | Persona | verificado |
| PER_SAL_0003 | salud/personas/julio_cesar_estol.md | Julio César Estol | Persona | verificado_con_reservas |

#### Conceptos SAL (tipo: Concepto / prefijo CON)

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| CON_SAL_0001 | salud/cobertura_universal_salud.md | Cobertura universal de salud en Uruguay | Concepto | verificado |
| CON_SAL_0002 | salud/medicina_preventiva_concepto.md | Medicina preventiva y promoción de la salud en Uruguay | Concepto | verificado |
| CON_SAL_0003 | salud/epidemiologia_concepto.md | Epidemiología — concepto y aplicación en Uruguay | Concepto | verificado |

---

### Instituciones

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| INS_CAR_0001 | instituciones/daecpu.md | DAECPU | Institución | borrador |
| INS_MUS_0001 | instituciones/sodre.md | SODRE | Institución | borrador |
| INS_TEA_0001 | instituciones/teatro_galpon.md | Teatro El Galpón | Institución | borrador |
| INS_TEA_0002 | instituciones/comedia_nacional.md | Comedia Nacional | Institución | borrador |
| INS_POL_0001 | instituciones/parlamento.md | Poder Legislativo — Parlamento | Institución | borrador |
| INS_POL_0002 | instituciones/corte_electoral.md | Corte Electoral | Institución | borrador |
| INS_DEP_0001 | instituciones/auf.md | Asociación Uruguaya de Fútbol (AUF) | Institución | borrador |
| INS_EDU_0001 | instituciones/anep.md | Administración Nacional de Educación Pública (ANEP) | Institución | borrador |
| INS_EDU_0002 | instituciones/codicen.md | Consejo Directivo Central (CODICEN) | Institución | borrador |
| INS_EDU_0003 | instituciones/dgeip.md | Dirección General de Educación Inicial y Primaria (DGEIP) | Institución | borrador |
| INS_EDU_0004 | instituciones/dges.md | Dirección General de Educación Secundaria (DGES) | Institución | borrador |
| INS_EDU_0005 | instituciones/utu.md | Consejo de Educación Técnico-Profesional — UTU | Institución | borrador |
| INS_EDU_0006 | instituciones/mec.md | Ministerio de Educación y Cultura (MEC) | Institución | borrador |
| INS_EDU_0007 | instituciones/udelar.md | Universidad de la República (Udelar) | Institución | borrador |
| INS_EDU_0008 | instituciones/utec.md | Universidad Tecnológica del Uruguay (UTEC) | Institución | borrador |
| INS_EDU_0009 | instituciones/ineed.md | Instituto Nacional de Evaluación Educativa (INEEd) | Institución | borrador |
| INS_ECO_0001 | instituciones/bcu.md | Banco Central del Uruguay (BCU) | Institución | verificado |
| INS_ECO_0002 | instituciones/mef.md | Ministerio de Economía y Finanzas (MEF) | Institución | verificado |
| INS_ECO_0003 | instituciones/ine.md | Instituto Nacional de Estadística (INE) | Institución | verificado |
| INS_ECO_0004 | instituciones/bps.md | Banco de Previsión Social (BPS) | Institución | verificado |
| INS_ECO_0005 | instituciones/dgi.md | Dirección General Impositiva (DGI) | Institución | verificado |
| INS_ECO_0006 | instituciones/uruguay_xxi.md | Uruguay XXI — Agencia de Promoción de Inversiones y Exportaciones | Institución | verificado |
| INS_ECO_0007 | instituciones/ande.md | Agencia Nacional de Desarrollo (ANDE) | Institución | verificado |
| INS_ECO_0008 | instituciones/cnd.md | Corporación Nacional para el Desarrollo (CND) | Institución | verificado |

---

### Medio Ambiente

#### Documentos temáticos MAM

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_MAM_0001 | medio-ambiente/panorama_medio_ambiente.md | Panorama del medio ambiente en Uruguay | Tema | verificado |
| TEM_MAM_0002 | medio-ambiente/energia_renovable.md | Transición energética y energías renovables en Uruguay | Tema | verificado |
| TEM_MAM_0003 | medio-ambiente/recursos_hidricos.md | Recursos hídricos en Uruguay — agua, cuencas y Acuífero Guaraní | Tema | verificado |
| TEM_MAM_0004 | medio-ambiente/biodiversidad.md | Biodiversidad en Uruguay — ecosistemas, flora y fauna | Tema | verificado |
| TEM_MAM_0005 | medio-ambiente/areas_protegidas.md | Sistema Nacional de Áreas Protegidas (SNAP) de Uruguay | Tema | verificado |
| TEM_MAM_0006 | medio-ambiente/cambio_climatico.md | Cambio climático y Uruguay — impactos y compromisos | Tema | verificado |
| TEM_MAM_0007 | medio-ambiente/contaminacion_residuos.md | Contaminación y gestión de residuos en Uruguay | Tema | verificado |
| TEM_MAM_0008 | medio-ambiente/industria_forestal_ambiente.md | La industria forestal y celulosa desde la perspectiva ambiental | Tema | verificado_con_reservas |
| TEM_MAM_0009 | medio-ambiente/agroquimicos_soja.md | Agroquímicos, soja y medio ambiente en Uruguay | Tema | verificado_con_reservas |
| TEM_MAM_0010 | medio-ambiente/costa_marina.md | Recursos costeros y marinos en Uruguay | Tema | verificado |
| TEM_MAM_0011 | medio-ambiente/humedales.md | Humedales en Uruguay — ecosistemas, conservación y amenazas | Tema | verificado |
| TEM_MAM_0012 | medio-ambiente/politica_ambiental.md | Política ambiental en Uruguay — marco legal e institucional | Tema | verificado |
| TEM_MAM_0013 | medio-ambiente/ciudades_ambiente.md | Ciudades y medio ambiente urbano en Uruguay | Tema | verificado |
| TEM_MAM_0014 | medio-ambiente/educacion_ambiental.md | Educación ambiental en Uruguay | Tema | verificado |

#### Instituciones MAM

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| INS_MAM_0001 | medio-ambiente/instituciones/ministerio_ambiente.md | Ministerio de Ambiente de Uruguay | Institución | verificado |
| INS_MAM_0002 | medio-ambiente/instituciones/dinama.md | DINAMA — Dirección Nacional de Medio Ambiente | Institución | verificado |
| INS_MAM_0003 | medio-ambiente/instituciones/snap.md | SNAP — Sistema Nacional de Áreas Protegidas de Uruguay | Institución | verificado |

#### Personas MAM

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| PER_MAM_0001 | medio-ambiente/personas/daniel_vidart.md | Daniel Vidart | Persona | verificado_con_reservas |
| PER_MAM_0002 | medio-ambiente/personas/ramon_mendez.md | Ramón Méndez Galain | Persona | verificado_con_reservas |

#### Conceptos MAM (tipo: Concepto / prefijo CON)

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| CON_MAM_0001 | medio-ambiente/transicion_energetica_concepto.md | Transición energética — concepto y caso uruguayo | Concepto | verificado |
| CON_MAM_0002 | medio-ambiente/huella_carbono_uruguay.md | Huella de carbono y compromisos climáticos de Uruguay | Concepto | verificado |

---

### Derechos Humanos

#### Documentos temáticos DRH

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_DRH_0001 | derechos-humanos/panorama_derechos_humanos.md | Panorama de los derechos humanos en Uruguay | Tema | verificado |
| TEM_DRH_0002 | derechos-humanos/historia_derechos_humanos.md | Historia de los derechos humanos en Uruguay | Tema | verificado |
| TEM_DRH_0003 | derechos-humanos/dictadura_derechos_humanos.md | La dictadura cívico-militar y las violaciones a los DDHH (1973-1985) | Tema | verificado |
| TEM_DRH_0004 | derechos-humanos/memoria_verdad_justicia.md | Memoria, verdad y justicia en Uruguay | Tema | verificado |
| TEM_DRH_0005 | derechos-humanos/derechos_civiles_politicos.md | Derechos civiles y políticos en Uruguay | Tema | verificado |
| TEM_DRH_0006 | derechos-humanos/derechos_economicos_sociales_culturales.md | Derechos económicos, sociales y culturales en Uruguay | Tema | verificado |
| TEM_DRH_0007 | derechos-humanos/derechos_infancia_adolescencia.md | Derechos de la infancia y la adolescencia en Uruguay | Tema | verificado |
| TEM_DRH_0008 | derechos-humanos/derechos_mujer_genero.md | Derechos de la mujer y perspectiva de género en Uruguay | Tema | verificado |
| TEM_DRH_0009 | derechos-humanos/diversidad_sexual_identidad_genero.md | Diversidad sexual e identidad de género en Uruguay | Tema | verificado |
| TEM_DRH_0010 | derechos-humanos/derechos_pueblos_indigenas.md | Derechos de los pueblos indígenas en Uruguay — el pueblo charrúa | Tema | verificado_con_reservas |
| TEM_DRH_0011 | derechos-humanos/afrodescendientes_uruguay.md | Afrodescendientes y derechos humanos en Uruguay | Tema | verificado |
| TEM_DRH_0012 | derechos-humanos/migracion_derechos.md | Migración y derechos humanos en Uruguay | Tema | verificado |
| TEM_DRH_0013 | derechos-humanos/sistema_carcelario.md | Sistema carcelario y derechos en Uruguay | Tema | verificado |
| TEM_DRH_0014 | derechos-humanos/marco_institucional_ddhh.md | Marco institucional de DDHH en Uruguay | Tema | verificado |

#### Instituciones DRH

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| INS_DRH_0001 | derechos-humanos/instituciones/inddhh.md | Institución Nacional de Derechos Humanos y Defensoría del Pueblo (INDDHH) | Institución | verificado |
| INS_DRH_0002 | derechos-humanos/instituciones/secretaria_ddhh_pasado_reciente.md | Secretaría de DDHH para el Pasado Reciente | Institución | verificado |
| INS_DRH_0003 | derechos-humanos/instituciones/inmujeres.md | Instituto Nacional de las Mujeres (Inmujeres) | Institución | verificado |

#### Personas DRH

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| PER_DRH_0001 | derechos-humanos/personas/elena_quinteros.md | Elena Quinteros Almeida | Persona | verificado |
| PER_DRH_0002 | derechos-humanos/personas/luisa_cuesta.md | Luisa Cuesta | Persona | verificado_con_reservas |

#### Conceptos DRH (tipo: Concepto / prefijo CON)

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| CON_DRH_0001 | derechos-humanos/ley_caducidad_impunidad.md | Ley de Caducidad e impunidad en Uruguay | Concepto | verificado |
| CON_DRH_0002 | derechos-humanos/reparacion_victimas.md | Reparación a las víctimas de la dictadura en Uruguay | Concepto | verificado |

---

### Telecomunicaciones y Medios

#### Documentos temáticos TEL

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_TEL_0001 | telecomunicaciones/panorama_telecomunicaciones.md | Panorama de las telecomunicaciones y medios en Uruguay | Tema | verificado |
| TEM_TEL_0002 | telecomunicaciones/antel_historia.md | ANTEL y la historia de las telecomunicaciones en Uruguay | Tema | verificado |
| TEM_TEL_0003 | telecomunicaciones/internet_conectividad.md | Internet, banda ancha y conectividad en Uruguay | Tema | verificado |
| TEM_TEL_0004 | telecomunicaciones/telefonia_movil.md | Telefonía móvil en Uruguay | Tema | verificado |
| TEM_TEL_0005 | telecomunicaciones/radio_uruguay.md | La radio en Uruguay — historia e impacto cultural | Tema | verificado |
| TEM_TEL_0006 | telecomunicaciones/television_uruguay.md | La televisión en Uruguay — historia y estructura del sistema | Tema | verificado |
| TEM_TEL_0007 | telecomunicaciones/television_digital.md | Televisión digital terrestre (TDT) en Uruguay | Tema | verificado |
| TEM_TEL_0008 | telecomunicaciones/medios_publicos.md | Medios públicos en Uruguay — SODRE y TV Nacional | Tema | verificado |
| TEM_TEL_0009 | telecomunicaciones/prensa_escrita.md | La prensa escrita en Uruguay — historia y presente | Tema | verificado |
| TEM_TEL_0010 | telecomunicaciones/medios_digitales.md | Medios digitales y periodismo online en Uruguay | Tema | verificado |
| TEM_TEL_0011 | telecomunicaciones/medios_interior.md | Medios de comunicación del interior de Uruguay | Tema | verificado |
| TEM_TEL_0012 | telecomunicaciones/marco_regulatorio.md | Marco regulatorio de telecomunicaciones y medios en Uruguay | Tema | verificado |
| TEM_TEL_0013 | telecomunicaciones/brecha_digital.md | Brecha digital en Uruguay | Tema | verificado |
| TEM_TEL_0014 | telecomunicaciones/libertad_prensa.md | Libertad de prensa y expresión en Uruguay | Tema | verificado |

#### Instituciones TEL

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| INS_TEL_0001 | telecomunicaciones/instituciones/antel.md | ANTEL — Administración Nacional de Telecomunicaciones | Institución | verificado |
| INS_TEL_0002 | telecomunicaciones/instituciones/ursec.md | URSEC — Unidad Reguladora de Servicios de Comunicaciones | Institución | verificado |
| INS_TEL_0003 | telecomunicaciones/instituciones/tv_nacional.md | TV Nacional Uruguay — Canal 5 | Institución | verificado |

#### Personas TEL

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| PER_TEL_0001 | telecomunicaciones/personas/carlos_quijano.md | Carlos Quijano | Persona | verificado_con_reservas |
| PER_TEL_0002 | telecomunicaciones/personas/german_araujo.md | Germán Araújo | Persona | verificado_con_reservas |

#### Conceptos TEL (tipo: Concepto / prefijo CON)

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| CON_TEL_0001 | telecomunicaciones/pluralismo_concentracion.md | Pluralismo y concentración de medios en Uruguay | Concepto | verificado |
| CON_TEL_0002 | telecomunicaciones/convergencia_digital.md | Convergencia digital y transformación de los medios en Uruguay | Concepto | verificado |

---

### Gastronomía

#### Documentos temáticos GAS

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_GAS_0001 | gastronomia/panorama_gastronomia_uruguaya.md | Panorama de la gastronomía uruguaya | Tema | verificado |
| TEM_GAS_0002 | gastronomia/asado_uruguayo.md | El asado uruguayo | Tema | verificado |
| TEM_GAS_0003 | gastronomia/chivito.md | El chivito — el sándwich uruguayo | Tema | verificado |
| TEM_GAS_0004 | gastronomia/mate_gastronomia.md | El mate — cultura y práctica gastronómica en Uruguay | Tema | verificado |
| TEM_GAS_0005 | gastronomia/dulce_de_leche.md | El dulce de leche uruguayo | Tema | verificado |
| TEM_GAS_0006 | gastronomia/vinos_tannat.md | Vinos uruguayos y el Tannat | Tema | verificado |
| TEM_GAS_0007 | gastronomia/pasta_gastronomia.md | La pasta en Uruguay — herencia italiana y tradición propia | Tema | verificado |
| TEM_GAS_0008 | gastronomia/gastronomia_campo.md | Cocina de campo y tradición gaucha en Uruguay | Tema | verificado |
| TEM_GAS_0009 | gastronomia/pescados_mariscos.md | Pescados y mariscos en la gastronomía uruguaya | Tema | verificado |
| TEM_GAS_0010 | gastronomia/panaderia_reposteria.md | Panadería, repostería y facturas en Uruguay | Tema | verificado |
| TEM_GAS_0011 | gastronomia/ferias_mercados.md | Ferias y mercados gastronómicos de Uruguay | Tema | verificado |
| TEM_GAS_0012 | gastronomia/gastronomia_contemporanea_montevideo.md | La escena gastronómica contemporánea en Uruguay | Tema | verificado |
| TEM_GAS_0013 | gastronomia/productos_lacteos.md | Productos lácteos uruguayos — quesos, manteca y Conaprole | Tema | verificado |
| TEM_GAS_0014 | gastronomia/bebidas_tradicionales.md | Bebidas tradicionales uruguayas — grappa, medio y medio, clericó y caña | Tema | verificado |

#### Instituciones GAS

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| INS_GAS_0001 | gastronomia/instituciones/mercado_puerto.md | Mercado del Puerto de Montevideo | Institución | verificado |
| INS_GAS_0002 | gastronomia/instituciones/conaprole.md | Conaprole — Cooperativa Nacional de Productores de Leche | Institución | verificado |
| INS_GAS_0003 | gastronomia/instituciones/inavi.md | INAVI — Instituto Nacional de Vitivinicultura | Institución | verificado |

#### Personas GAS

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| PER_GAS_0001 | gastronomia/personas/lucia_soria.md | Lucía Soria | Persona | verificado_con_reservas |
| PER_GAS_0002 | gastronomia/personas/roberto_bueno.md | Roberto Bueno | Persona | verificado_con_reservas |

#### Conceptos GAS (tipo: Concepto / prefijo CON)

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| CON_GAS_0001 | gastronomia/terroir_uruguayo.md | Terroir uruguayo — suelo, clima e identidad agroalimentaria | Concepto | verificado |
| CON_GAS_0002 | gastronomia/patrimonio_gastronomico.md | Patrimonio gastronómico e identidad culinaria en Uruguay | Concepto | verificado |

---

### Carnaval

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_CAR_0001 | cultura/carnaval/historia.md | Historia del Carnaval Uruguayo | Tema | borrador |
| TEM_CAR_0002 | cultura/carnaval/murgas/murgas.md | Murgas | Tema | borrador |
| TEM_CAR_0003 | cultura/carnaval/comparsas/comparsas.md | Comparsas | Tema | borrador |
| TEM_CAR_0004 | cultura/carnaval/humoristas/humoristas.md | Humoristas | Tema | borrador |
| TEM_CAR_0005 | cultura/carnaval/parodistas/parodistas.md | Parodistas | Tema | borrador |
| TEM_CAR_0006 | cultura/carnaval/revistas/revistas.md | Revistas | Tema | borrador |
| LUG_CAR_0001 | cultura/carnaval/teatro-verano/teatro_verano.md | Teatro de Verano | Lugar | borrador |

---

### Candombe

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_CAN_0001 | cultura/candombe/historia.md | Historia del Candombe Uruguayo | Tema | borrador |
| TEM_CAN_0002 | cultura/candombe/llamadas.md | Las Llamadas | Tema | borrador |
| TEM_CAN_0003 | cultura/candombe/tambores.md | Los Tambores del Candombe | Tema | borrador |
| TEM_CAN_0004 | cultura/candombe/personajes.md | Personajes del Candombe | Tema | borrador |
| TEM_CAN_0005 | cultura/candombe/comparsas/comparsas.md | Comparsas de Candombe | Tema | borrador |
| PER_CAN_0001 | cultura/candombe/lagrima_rios.md | Lágrima Ríos | Persona | borrador |
| PER_CAN_0002 | cultura/candombe/rosa_luna.md | Rosa Luna | Persona | borrador |

---

### Música

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_MUS_0001 | cultura/musica/canto_popular.md | Canto Popular Uruguayo | Tema | borrador |
| TEM_MUS_0002 | cultura/musica/rock.md | Rock Uruguayo | Tema | borrador |
| TEM_MUS_0003 | cultura/musica/tango.md | Tango Uruguayo | Tema | borrador |
| TEM_MUS_0004 | cultura/musica/jazz.md | Jazz Uruguayo | Tema | borrador |
| TEM_MUS_0005 | cultura/musica/folclore.md | Folclore Uruguayo | Tema | borrador |
| TEM_MUS_0006 | cultura/musica/milonga.md | Milonga Uruguaya | Tema | borrador |
| TEM_MUS_0007 | cultura/musica/candombe_beat.md | Candombe Beat | Tema | borrador |
| TEM_MUS_0008 | cultura/musica/tropical.md | Música Tropical Uruguaya | Tema | borrador |
| TEM_MUS_0009 | cultura/musica/pop.md | Pop Uruguayo | Tema | borrador |
| TEM_MUS_0010 | cultura/musica/academica.md | Música Académica Uruguaya | Tema | borrador |
| PER_MUS_0001 | cultura/musica/ramon_collazo.md | Ramón Collazo | Persona | borrador |

---

### Literatura

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_LIT_0001 | cultura/literatura/literatura.md | Literatura Uruguaya (panorama) | Tema | borrador |
| TEM_LIT_0002 | cultura/literatura/narrativa.md | Narrativa Uruguaya | Tema | borrador |
| TEM_LIT_0003 | cultura/literatura/poesia.md | Poesía Uruguaya | Tema | borrador |
| TEM_LIT_0004 | cultura/literatura/ensayo.md | Ensayo Uruguayo | Tema | borrador |
| PER_LIT_0001 | cultura/literatura/benedetti.md | Mario Benedetti | Persona | borrador |
| PER_LIT_0002 | cultura/literatura/onetti.md | Juan Carlos Onetti | Persona | borrador |
| PER_LIT_0003 | cultura/literatura/galeano.md | Eduardo Galeano | Persona | borrador |
| PER_LIT_0004 | cultura/literatura/idea_vilarino.md | Idea Vilariño | Persona | borrador |
| PER_LIT_0005 | cultura/literatura/delmira_agustini.md | Delmira Agustini | Persona | borrador |
| PER_LIT_0006 | cultura/literatura/horacio_quiroga.md | Horacio Quiroga | Persona | borrador |
| PER_LIT_0007 | cultura/literatura/juana_de_ibarbourou.md | Juana de Ibarbourou | Persona | borrador |
| PER_LIT_0008 | cultura/literatura/felisberto_hernandez.md | Felisberto Hernández | Persona | borrador |
| PER_LIT_0009 | cultura/literatura/jose_enrique_rodo.md | José Enrique Rodó | Persona | borrador |

---

### Teatro

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_TEA_0001 | cultura/teatro/teatro.md | Teatro Uruguayo (panorama) | Tema | borrador |
| TEM_TEA_0002 | cultura/teatro/teatro_independiente.md | Teatro Independiente Uruguayo | Tema | borrador |
| LUG_TEA_0001 | cultura/teatro/teatro_solis.md | Teatro Solís | Lugar | borrador |
| PER_TEA_0001 | cultura/teatro/atahualpa_del_cioppo.md | Atahualpa del Cioppo | Persona | borrador |
| PER_TEA_0002 | cultura/teatro/china_zorrilla.md | China Zorrilla | Persona | borrador |
| PER_TEA_0003 | cultura/teatro/cristina_moran.md | Cristina Morán | Persona | borrador |
| PER_TEA_0004 | cultura/teatro/cuque_sclavo.md | Cuque Sclavo | Persona | borrador |
| PER_TEA_0005 | cultura/teatro/taco_larreta.md | Taco Larreta | Persona | borrador |
| PER_TEA_0006 | cultura/teatro/alberto_candeau.md | Alberto Candeau | Persona | borrador |
| PER_TEA_0007 | cultura/teatro/nelly_goitino.md | Nelly Goitiño | Persona | borrador |
| PER_TEA_0008 | cultura/teatro/jorge_bolani.md | Jorge Bolani | Persona | borrador |
| PER_TEA_0009 | cultura/teatro/florencio_sanchez.md | Florencio Sánchez | Persona | borrador |
| PER_TEA_0010 | cultura/teatro/mariana_percovich.md | Mariana Percovich | Persona | borrador |

---

### Artes Plásticas

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_PLA_0001 | cultura/plastica/artes_plasticas.md | Artes Plásticas Uruguayas (panorama) | Tema | borrador |
| PER_PLA_0001 | cultura/plastica/torres_garcia.md | Joaquín Torres García | Persona | borrador |
| PER_PLA_0002 | cultura/plastica/pedro_figari.md | Pedro Figari | Persona | borrador |
| PER_PLA_0003 | cultura/plastica/paez_vilaro.md | Carlos Páez Vilaró | Persona | borrador |
| PER_PLA_0004 | cultura/plastica/jose_cuneo.md | José Cúneo | Persona | borrador |
| PER_PLA_0005 | cultura/plastica/juan_manuel_blanes.md | Juan Manuel Blanes | Persona | borrador |
| LUG_PLA_0001 | cultura/plastica/museo_torres_garcia.md | Museo Torres García | Lugar | borrador |
| LUG_PLA_0002 | cultura/plastica/casapueblo.md | Casapueblo | Lugar | borrador |

---

### Historia

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_HIS_0001 | cultura/historia/historia.md | Historia del Uruguay (panorama) | Tema | borrador |
| TEM_HIS_0002 | cultura/historia/independencia.md | Independencia y formación del Estado | Tema | borrador |
| TEM_HIS_0003 | cultura/historia/batllismo.md | El Uruguay batllista (1903-1958) | Tema | borrador |
| TEM_HIS_0004 | cultura/historia/dictadura.md | La dictadura cívico-militar (1973-1985) | Tema | borrador |
| TEM_HIS_0005 | cultura/historia/democracia.md | El retorno a la democracia (1985+) | Tema | borrador |
| PER_HIS_0001 | cultura/historia/artigas.md | José Gervasio Artigas | Persona | borrador |
| PER_HIS_0002 | cultura/historia/batlle_ordonez.md | José Batlle y Ordóñez | Persona | borrador |
| PER_HIS_0003 | cultura/historia/lavalleja.md | Juan Antonio Lavalleja | Persona | borrador |
| PER_HIS_0004 | cultura/historia/rivera.md | Fructuoso Rivera | Persona | verificado_con_reservas |
| EVT_HIS_0001 | cultura/historia/grito_asencio.md | El Grito de Asencio (1811) | Evento | borrador |
| EVT_HIS_0002 | cultura/historia/declaracion_independencia.md | Declaración de Independencia (1825) | Evento | borrador |

---

### Política

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_POL_0001 | cultura/politica/sistema_politico.md | Sistema político uruguayo | Tema | borrador |
| TEM_POL_0002 | cultura/politica/partido_colorado.md | Partido Colorado | Tema | borrador |
| TEM_POL_0003 | cultura/politica/partido_nacional.md | Partido Nacional (Blancos) | Tema | borrador |
| TEM_POL_0004 | cultura/politica/frente_amplio.md | Frente Amplio | Tema | borrador |
| PER_POL_0001 | cultura/politica/jose_pedro_varela.md | José Pedro Varela | Persona | borrador |
| PER_POL_0002 | cultura/politica/jose_mujica.md | José Mujica | Persona | borrador |
| PER_POL_0003 | cultura/politica/tabare_vazquez.md | Tabaré Vázquez | Persona | borrador |

*Instituciones de este dominio → ver tabla Instituciones: INS_POL_0001, INS_POL_0002*

---

### Identidad

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_IDN_0001 | cultura/identidad/identidad.md | Identidad uruguaya — panorama | Tema | borrador |
| TEM_IDN_0002 | cultura/identidad/mate.md | El mate | Tema | borrador |
| TEM_IDN_0003 | cultura/identidad/gastronomia.md | Gastronomía uruguaya | Tema | borrador |
| TEM_IDN_0004 | cultura/identidad/simbolos_nacionales.md | Símbolos nacionales | Tema | borrador |
| TEM_IDN_0005 | cultura/identidad/ser_uruguayo.md | Rasgos del ser uruguayo | Tema | borrador |
| TEM_IDN_0006 | cultura/identidad/pueblo_charrua.md | El pueblo charrúa | Tema | borrador |

---

### Turismo

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_TUR_0001 | cultura/turismo/turismo.md | Turismo en Uruguay — panorama | Tema | borrador |
| TEM_TUR_0002 | cultura/turismo/turismo_naturaleza.md | Turismo rural, natural y de senderismo | Tema | borrador |
| TEM_TUR_0003 | cultura/turismo/turismo_playa.md | Turismo de sol y playa | Tema | borrador |
| LUG_TUR_0001 | cultura/turismo/punta_del_este.md | Punta del Este | Lugar | borrador |
| LUG_TUR_0002 | cultura/turismo/colonia_del_sacramento.md | Colonia del Sacramento | Lugar | borrador |
| LUG_TUR_0003 | cultura/turismo/cabo_polonio.md | Cabo Polonio | Lugar | borrador |
| LUG_TUR_0004 | cultura/turismo/quebrada_cuervos.md | Quebrada de los Cuervos | Lugar | borrador |
| LUG_TUR_0005 | cultura/turismo/valle_lunarejo.md | Valle del Lunarejo | Lugar | borrador |
| LUG_TUR_0006 | cultura/turismo/parque_santa_teresa.md | Parque Santa Teresa | Lugar | borrador |
| LUG_TUR_0007 | cultura/turismo/cerro_catedral.md | Cerro Catedral y Sierra de las Ánimas | Lugar | borrador |

---

### Deportes

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_DEP_0001 | cultura/deportes/deportes.md | Deportes en Uruguay — panorama | Tema | borrador |
| TEM_DEP_0002 | cultura/deportes/futbol_uruguayo.md | El fútbol uruguayo | Tema | borrador |
| TEM_DEP_0003 | cultura/deportes/la_celeste.md | La Celeste — selección nacional de fútbol | Tema | borrador |
| LUG_DEP_0001 | cultura/deportes/estadio_centenario.md | Estadio Centenario | Lugar | borrador |
| EVT_DEP_0001 | cultura/deportes/mundial_1930.md | Copa del Mundo 1930 | Evento | borrador |
| EVT_DEP_0002 | cultura/deportes/maracanazo.md | El Maracanazo (1950) | Evento | borrador |
| PER_DEP_0001 | cultura/deportes/obdulio_varela.md | Obdulio Varela | Persona | borrador |
| PER_DEP_0002 | cultura/deportes/enzo_francescoli.md | Enzo Francescoli | Persona | borrador |
| PER_DEP_0003 | cultura/deportes/diego_forlan.md | Diego Forlán | Persona | borrador |
| PER_DEP_0004 | cultura/deportes/ladislao_mazurkiewicz.md | Ladislao Mazurkiewicz | Persona | borrador |
| PER_DEP_0005 | cultura/deportes/luis_suarez.md | Luis Suárez | Persona | borrador |
| PER_DEP_0006 | cultura/deportes/edinson_cavani.md | Edinson Cavani | Persona | borrador |

*Institución de este dominio → ver tabla Instituciones: INS_DEP_0001*

---

### Educación

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_EDU_0001 | cultura/educacion/sistema_educativo.md | Sistema educativo uruguayo — panorama | Tema | borrador |
| TEM_EDU_0002 | cultura/educacion/historia_educacion.md | Historia de la educación uruguaya | Tema | borrador |
| TEM_EDU_0003 | cultura/educacion/educacion_inicial_primaria.md | Educación inicial y primaria | Tema | borrador |
| TEM_EDU_0004 | cultura/educacion/educacion_media.md | Educación media | Tema | borrador |
| TEM_EDU_0005 | cultura/educacion/educacion_tecnico_profesional.md | Educación técnico-profesional | Tema | borrador |
| TEM_EDU_0006 | cultura/educacion/educacion_terciaria.md | Educación terciaria y universitaria | Tema | borrador |
| TEM_EDU_0007 | cultura/educacion/plan_ceibal.md | Plan Ceibal | Tema | borrador |
| TEM_EDU_0008 | cultura/educacion/educacion_permanente.md | Educación permanente y formación continua | Tema | borrador |
| PER_EDU_0001 | cultura/educacion/varela_educador.md | José Pedro Varela — legado pedagógico | Persona | borrador |
| PER_EDU_0002 | cultura/educacion/carlos_vaz_ferreira.md | Carlos Vaz Ferreira | Persona | borrador |
| PER_EDU_0003 | cultura/educacion/reina_reyes.md | Reina Reyes | Persona | verificado_con_reservas |
| PER_EDU_0004 | cultura/educacion/jesualdo_sosa.md | Jesualdo Sosa | Persona | verificado_con_reservas |
| PER_EDU_0005 | cultura/educacion/clemente_estable.md | Clemente Estable | Persona | borrador |
| PER_EDU_0006 | cultura/educacion/miguel_soler_roca.md | Miguel Soler Roca | Persona | verificado_con_reservas |

*Instituciones de este dominio → ver tabla Instituciones: INS_EDU_0001 al INS_EDU_0009*

---

### Economía

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_ECO_0001 | economia/historia_economica.md | Historia económica de Uruguay — panorama | Tema | verificado |
| TEM_ECO_0002 | economia/modelo_agroexportador.md | Modelo agroexportador (1870-1930) | Tema | verificado |
| TEM_ECO_0003 | economia/industrializacion.md | Industrialización y reformas económicas del siglo XX | Tema | verificado |
| TEM_ECO_0004 | economia/crisis_1982.md | Crisis económica de 1982 | Tema | verificado |
| TEM_ECO_0005 | economia/crisis_2002.md | Crisis económica de 2002 | Tema | verificado |
| TEM_ECO_0006 | economia/recuperacion_crecimiento.md | Recuperación y crecimiento (2003-presente) | Tema | verificado |
| TEM_ECO_0007 | economia/produccion_agropecuaria.md | Producción agropecuaria uruguaya — panorama | Tema | verificado |
| TEM_ECO_0008 | economia/ganaderia.md | Ganadería bovina y ovina en Uruguay | Tema | verificado |
| TEM_ECO_0009 | economia/agricultura.md | Agricultura uruguaya — cultivos y producción vegetal | Tema | verificado |
| TEM_ECO_0010 | economia/industria_forestal.md | Industria forestal y celulosa en Uruguay | Tema | verificado |
| TEM_ECO_0011 | economia/industria_alimentaria.md | Industria alimentaria y láctea en Uruguay | Tema | verificado |
| TEM_ECO_0012 | economia/pesca.md | Pesca y acuicultura en Uruguay | Tema | verificado_con_reservas |

| TEM_ECO_0013 | economia/energia.md | Energía en Uruguay — transición a las renovables | Tema | verificado |
| TEM_ECO_0014 | economia/logistica.md | Logística y transporte en Uruguay — hub regional | Tema | verificado |
| TEM_ECO_0015 | economia/servicios_financieros.md | Servicios financieros en Uruguay — plaza financiera regional | Tema | verificado |
| TEM_ECO_0016 | economia/turismo_economia.md | Turismo en Uruguay — economía y destinos | Tema | verificado |
| TEM_ECO_0017 | economia/industria_software.md | Industria del software y servicios tecnológicos en Uruguay | Tema | verificado |
| TEM_ECO_0018 | economia/economia_conocimiento.md | Economía del conocimiento en Uruguay | Tema | verificado |
| TEM_ECO_0019 | economia/desarrollo_sostenible.md | Desarrollo sostenible en Uruguay — economía verde y agenda 2030 | Tema | verificado |
| TEM_ECO_0020 | economia/comercio_exterior.md | Comercio exterior de Uruguay — exportaciones e importaciones | Tema | verificado |
| TEM_ECO_0021 | economia/mercosur.md | MERCOSUR — Uruguay en el bloque regional | Tema | verificado |
| TEM_ECO_0022 | economia/zonas_francas.md | Zonas francas en Uruguay | Tema | verificado |
| TEM_ECO_0023 | economia/inversion_extranjera.md | Inversión extranjera directa en Uruguay | Tema | verificado |
| TEM_ECO_0024 | economia/politica_fiscal.md | Política fiscal de Uruguay — ingresos, gasto y deuda pública | Tema | verificado |
| TEM_ECO_0025 | economia/politica_monetaria.md | Política monetaria en Uruguay — inflación y tipo de cambio | Tema | verificado |
| TEM_ECO_0026 | economia/sistema_bancario.md | Sistema bancario uruguayo — estructura y regulación | Tema | verificado |
| TEM_ECO_0027 | economia/conceptos_macroeconomicos.md | Conceptos macroeconómicos clave para entender la economía uruguaya | Tema | verificado |

*Instituciones de este dominio → ver tabla Instituciones: INS_ECO_0001 al INS_ECO_0008*

---

### Tecnología

#### Documentos temáticos

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| TEM_TEC_0001 | tecnologia/panorama_sector_tecnologico.md | Panorama del sector tecnológico uruguayo | Tema | verificado |
| TEM_TEC_0002 | tecnologia/historia_informatica_uruguay.md | Historia de la informática en Uruguay (1960-2010) | Tema | verificado |
| TEM_TEC_0003 | tecnologia/evolucion_industria_software.md | Evolución de la industria del software uruguaya (1988-presente) | Tema | verificado |
| TEM_TEC_0004 | tecnologia/ecosistema_startups.md | Ecosistema de startups y capital emprendedor en Uruguay | Tema | verificado |
| TEM_TEC_0005 | tecnologia/exportacion_software.md | Exportación de software y servicios tecnológicos de Uruguay | Tema | verificado |
| TEM_TEC_0006 | tecnologia/gobierno_digital.md | Gobierno digital en Uruguay — transformación del Estado | Tema | verificado |
| TEM_TEC_0007 | tecnologia/inteligencia_artificial_uruguay.md | Inteligencia Artificial en Uruguay — estrategia, aplicaciones y ética | Tema | verificado_con_reservas |
| TEM_TEC_0008 | tecnologia/formacion_tecnologica.md | Formación tecnológica en Uruguay — universidades, carreras y bootcamps | Tema | verificado |
| TEM_TEC_0009 | tecnologia/marco_legal_incentivos_software.md | Marco legal e incentivos fiscales para el software en Uruguay | Tema | verificado |
| TEM_TEC_0010 | tecnologia/ciberseguridad_uruguay.md | Ciberseguridad en Uruguay — CERTuy y política de seguridad digital | Tema | verificado_con_reservas |
| TEM_TEC_0011 | tecnologia/investigacion_innovacion_tech.md | Investigación e innovación tecnológica en Uruguay | Tema | verificado_con_reservas |
| TEM_TEC_0012 | tecnologia/tecnologias_emergentes.md | Tecnologías emergentes en Uruguay — blockchain, IoT, cloud y más | Tema | verificado_con_reservas |

#### Empresas (tipo: Empresa / prefijo EMP)

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| EMP_TEC_0001 | tecnologia/empresas/genexus_artech.md | Artech / GeneXus | Empresa | verificado |
| EMP_TEC_0002 | tecnologia/empresas/dlocal.md | dLocal | Empresa | verificado |
| EMP_TEC_0003 | tecnologia/empresas/pedidosya.md | PedidosYa | Empresa | verificado_con_reservas |
| EMP_TEC_0004 | tecnologia/empresas/bantotal.md | Bantotal | Empresa | verificado_con_reservas |
| EMP_TEC_0005 | tecnologia/empresas/quanam.md | Quanam | Empresa | verificado_con_reservas |
| EMP_TEC_0006 | tecnologia/empresas/tryolabs.md | Tryolabs | Empresa | verificado |
| EMP_TEC_0007 | tecnologia/empresas/infocorp.md | Infocorp | Empresa | verificado_con_reservas |
| EMP_TEC_0008 | tecnologia/empresas/pyxis.md | Pyxis | Empresa | verificado_con_reservas |
| EMP_TEC_0009 | tecnologia/empresas/abstracta.md | Abstracta | Empresa | verificado |
| EMP_TEC_0010 | tecnologia/empresas/arkano_software.md | Arkano Software | Empresa | verificado_con_reservas |
| EMP_TEC_0011 | tecnologia/empresas/netlabs.md | Netlabs | Empresa | verificado_con_reservas |
| EMP_TEC_0012 | tecnologia/empresas/scanntech.md | Scanntech | Empresa | verificado_con_reservas |

#### Instituciones TEC

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| INS_TEC_0001 | tecnologia/instituciones/agesic.md | AGESIC — Agencia de Gobierno Electrónico | Institución | verificado |
| INS_TEC_0002 | tecnologia/instituciones/anii.md | ANII — Agencia Nacional de Investigación e Innovación | Institución | verificado |
| INS_TEC_0003 | tecnologia/instituciones/cuti.md | CUTI — Cámara Uruguaya de Tecnologías de la Información | Institución | verificado |
| INS_TEC_0004 | tecnologia/instituciones/miem.md | MIEM — Ministerio de Industria, Energía y Minería (perspectiva TEC) | Institución | verificado |
| INS_TEC_0005 | tecnologia/instituciones/latu.md | LATU — Laboratorio Tecnológico del Uruguay | Institución | verificado |
| INS_TEC_0006 | tecnologia/instituciones/plan_ceibal_tecnologia.md | Plan Ceibal — perspectiva tecnológica e innovación | Institución | verificado |

#### Personas TEC

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| PER_TEC_0001 | tecnologia/personas/nicolas_jodal.md | Nicolás Jodal | Persona | verificado |
| PER_TEC_0002 | tecnologia/personas/sebastian_kanovich.md | Sebastián Kanovich | Persona | verificado_con_reservas |

#### Conceptos TEC (tipo: Concepto / prefijo CON)

| ID | Archivo | Título | Tipo | Estado |
|----|---------|--------|------|--------|
| CON_TEC_0001 | tecnologia/software_saas_uruguay.md | Software y SaaS en el contexto uruguayo | Concepto | verificado |
| CON_TEC_0002 | tecnologia/transformacion_digital_concepto.md | Transformación digital en el contexto uruguayo | Concepto | verificado |
| CON_TEC_0003 | tecnologia/ia_concepto.md | Inteligencia Artificial — definición y contexto uruguayo | Concepto | verificado_con_reservas |
| CON_TEC_0004 | tecnologia/gobierno_electronico_concepto.md | Gobierno electrónico — concepto y dimensiones en Uruguay | Concepto | verificado |

---

## Plantillas disponibles

| Archivo | Tipo de documento |
|---------|------------------|
| templates/template_persona.md | Persona |
| templates/template_tema.md | Tema |
| templates/template_movimiento.md | Movimiento |
| templates/template_institucion.md | Institución |
| templates/template_lugar.md | Lugar |
| templates/template_evento.md | Evento |
| templates/template_obra.md | Obra |
| templates/template_normativa.md | Normativa |

---

## Documentos con verificación pendiente

| ID | Archivo | Campo a verificar |
|----|---------|------------------|
| PER_HIS_0004 | cultura/historia/rivera.md | lugar_nacimiento (Yapeyú vs Durazno — debate historiográfico) |
| PER_POL_0002 | cultura/politica/jose_mujica.md | fecha_fallecimiento (13/05/2024 — posterior al período de entrenamiento) |
| TEM_IDN_0006 | cultura/identidad/pueblo_charrua.md | significado de "Guyunusa" en lengua charrúa |
| PER_EDU_0003 | cultura/educacion/reina_reyes.md | fechas exactas de nacimiento y fallecimiento |
| PER_EDU_0004 | cultura/educacion/jesualdo_sosa.md | fecha y lugar exactos de fallecimiento |
| PER_EDU_0006 | cultura/educacion/miguel_soler_roca.md | fecha y lugar de fallecimiento (2016, Ginebra) |
| TEM_ECO_0012 | economia/pesca.md | cifras exactas de producción y exportaciones pesqueras (verificar con DINARA) |

---

## Documentos adicionales sugeridos (backlog)

### Música (personas)
- Eduardo Mateo (PER_MUS_0002)
- Rubén Rada (PER_MUS_0003)
- Alfredo Zitarrosa (PER_MUS_0004)
- Daniel Viglietti (PER_MUS_0005)
- Los Olimareños (PER_MUS_0006)
- Jorge Drexler (PER_MUS_0007)
- Hugo Fattoruso (PER_MUS_0008)

### Literatura (personas)
- Carlos Real de Azúa
- Emir Rodríguez Monegal
- Amanda Berenguer
- Circe Maia

### Historia (temas)
- La Guerra Grande (1839-1851)
- La crisis de 2002
- El movimiento sindical uruguayo

### Deportes (personas/temas)
- Óscar Tabárez (PER_DEP_0007)
- El rugby uruguayo (Los Teros)

### Educación (personas adicionales)
- Francisco Bauzá
- Alfredo Traversoni

### Instituciones pendientes
- Biblioteca Nacional del Uruguay
- Academia Nacional de Letras del Uruguay
- Museo Nacional de Artes Visuales (MNAV)
- INAU (Instituto del Niño y Adolescente del Uruguay)

---

## Dominios Standalone

Los dominios standalone son bases de conocimiento temáticas integradas bajo `knowledge/` junto al árbol principal BCN-UY. No usan YAML frontmatter ni el sistema de IDs `TIPO_AREA_NNNN`. Cada archivo es autocontenido, optimizado para RAG con BM25 + embeddings, y termina con una sección `## Palabras clave`. Los datos inciertos se marcan con `[VERIFICAR]`.

### basquet-uy (Básquetbol Uruguayo)

**Directorio:** `knowledge/basquet-uy/`
**Total archivos:** 22 (README + 21 documentos)
**Última actualización:** 2026-07-22

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Descripción del dominio e índice |
| `01-historia-del-basquet-uruguayo.md` | Historia desde YMCA c.1912 hasta el presente |
| `02-federacion-uruguaya-de-basketball.md` | FUBB: estructura, competencias, afiliaciones |
| `03-seleccion-uruguaya.md` | Selección mayor masculina, participaciones internacionales |
| `04-conquistas-internacionales.md` | Medalla bronce Helsinki 1952, Sudamericanos, Panamericanos |
| `05-jugadores-historicos.md` | Fichas de jugadores históricos; Esteban Batista (NBA) |
| `06-entrenadores-destacados.md` | Entrenadores, certificaciones FIBA |
| `07-dirigentes-historicos.md` | Presidentes FUBB, árbitros, categorías FIBA |
| `08-clubes-historicos.md` | Goes, Trouville, Hebraica y Macabi, Malvín, Aguada, Cordón, Nacional |
| `09-liga-uruguaya.md` | Liga Uruguaya de Básquetbol: formato, historia, campeones |
| `10-campeonato-federal.md` | Campeonato Federal para el interior del país |
| `11-gimnasios-historicos.md` | Antel Arena, gimnasios de clubes, estándares FIBA |
| `12-clasicos.md` | Rivalidades históricas entre clubes |
| `13-basquet-femenino.md` | Liga Femenina, selección femenina, CONBASUR |
| `14-formativas.md` | Básquetbol juvenil, categorías, desarrollo |
| `15-uruguayos-en-el-exterior.md` | Esteban Batista NBA, ligas europeas, NBB Argentina, NCAA |
| `16-estadisticas-historicas.md` | Tablas estadísticas (con [VERIFICAR]) |
| `17-linea-de-tiempo.md` | Cronología desde 1891 hasta los 2020s |
| `18-glosario.md` | Posiciones, acciones, conceptos tácticos, reglas FIBA |
| `19-anecdotas-historicas.md` | Helsinki 1952, era dorada, impacto NBA en Uruguay |
| `20-bibliografia.md` | FUBB, FIBA, CONBASUR, COI, COU, prensa uruguaya |
| `21-faq.md` | 20+ preguntas frecuentes sobre básquetbol uruguayo |

---

### arquitectura-uy (Arquitectura Uruguaya)

**Directorio:** `knowledge/arquitectura-uy/`
**Total archivos:** 22 (README + 21 documentos)
**Última actualización:** 2026-07-23

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Descripción del dominio e índice completo |
| `01-historia-de-la-arquitectura-uruguaya.md` | Panorama histórico: 7 períodos desde lo colonial hasta el presente |
| `02-herencia-colonial.md` | Colonia del Sacramento (Portugal 1680), Montevideo (España 1724), materiales coloniales |
| `03-arquitectura-republicana.md` | Siglo XIX, neoclasicismo, Carlo Zucchi, Teatro Solís |
| `04-facultad-de-arquitectura.md` | FADU UdelaR: historia, carreras, influencia en la arquitectura nacional |
| `05-arquitectos-destacados.md` | Fichas: Vilamajó, Dieste, Fresnedo Siri, Scasso, Cravotto, Surraco, Sichero, Payssé Reyes, Aroztegui, Serralta, García Pardo, Viñoly |
| `06-obras-emblematicas.md` | Palacio Salvo, Legislativo, Centenario, FADU, Clínicas, Cristo Obrero, Mercado Puerto, Teatro Solís, Palacio Taranco, Castillo Pittamiglio, Aeropuerto Carrasco |
| `07-patrimonio-arquitectonico.md` | MHN, UNESCO, Ley 14.040, Comisión del Patrimonio, sitios declarados |
| `08-monumentos-historicos.md` | Lista de MHN; proceso de declaración; patrimonio en riesgo |
| `09-urbanismo.md` | Urbanismo uruguayo: cuadrícula colonial, Rambla, Cravotto, Ley 18.308 |
| `10-estilos-arquitectonicos.md` | Colonial, Neoclásico, Eclecticismo, Art Déco, Racionalismo, Cerámica Armada, Brutalismo, Contemporáneo |
| `11-materiales-y-tecnicas.md` | Adobe, ladrillo cocido, piedra, cal, hormigón armado, cerámica armada |
| `12-arquitectura-religiosa.md` | Catedral Metropolitana, Iglesia Cristo Obrero, capillas rurales, templos no católicos |
| `13-arquitectura-industrial.md` | Frigorífico Anglo Fray Bentos (UNESCO 2015), ferrocarril, puerto, Dieste industrial |
| `14-arquitectura-rural.md` | Estancias, ranchos, galpones, capillas rurales, colonias de inmigrantes |
| `15-arquitectura-moderna.md` | Movimiento Moderno en Uruguay 1930–1970: Vilamajó, Fresnedo Siri, Hospital Clínicas |
| `16-arquitectura-contemporanea.md` | Arquitectura uruguaya 1970–presente: dictadura, retorno democrático, Viñoly, sustentabilidad |
| `17-restauracion-y-conservacion.md` | Teatro Solís (restauración 2004), Colonia Sacramento, Ley 14.040, criterios Carta de Venecia |
| `18-linea-de-tiempo.md` | Cronología 1680–2023: Colonia, Montevideo, Teatro Solís, Dieste, Viñoly |
| `19-glosario.md` | Términos arquitectónicos y urbanísticos (A–Z) |
| `20-bibliografia.md` | CPCN, FADU, SAU, AGN, Biblioteca Nacional, UNESCO, Archdaily |
| `21-faq.md` | 20+ preguntas frecuentes sobre arquitectura uruguaya |

---

### ciencias-uy (Ciencia en Uruguay)

**Directorio:** `knowledge/ciencias-uy/`
**Total archivos:** 27 (README + 26 documentos)
**Última actualización:** 2026-07-23

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Descripción del dominio e índice de los 26 archivos |
| `01-historia-de-la-ciencia-en-uruguay.md` | Naturalistas (Azara, Bonpland, Darwin), UdelaR 1849, Clemente Estable 1927, dictadura, PEDECIBA 1986, Facultad de Ciencias 1990, ANII 2005 |
| `02-facultad-de-ciencias.md` | Historia: Humanidades y Ciencias 1945, intervención 1973, Facultad de Ciencias 1990, campus Iguá 4225, carreras, posgrados, PEDECIBA |
| `03-desarrollo-cientifico.md` | SNI (niveles, estadísticas), instrumentos ANII, evolución de la producción, fortalezas y desafíos del sistema |
| `04-principales-instituciones.md` | PEDECIBA, IIBCE (Clemente Estable 1927), Institut Pasteur Montevideo (2006), INIA (1989), LATU (1965), ANII (2005), MNHN (1837) |
| `05-centros-de-investigacion.md` | CURE, Centro Ceibal, CIN, IMERL, INCO, IIE, DINARA, SOHMA, Observatorio Los Molinos, INUMET |
| `06-cientificos-destacados.md` | Fichas: Clemente Estable, José Luis Massera, Rafael Radi, Gonzalo Moratorio, Henry Engler, Rodolfo Tálice, Ricardo Ehrlich, Ida Holz, Roberto Markarian |
| `07-mujeres-en-la-ciencia.md` | Paulina Luisi (primera médica 1909), María Viñas, Ida Holz, brecha de género en SNI por nivel y disciplina, políticas de género UdelaR y ANII |
| `08-inventos-uruguayos.md` | Test COVID-19 (Moratorio 2020), PIB Alzheimer (Engler), SNIG trazabilidad bovina (2004), Plan Ceibal (2007, primer país), gestión red eléctrica, patentes (DNPI) |
| `09-innovacion-y-tecnologia.md` | AGESIC, sector software (CUTI, exportaciones), biotecnología, energías renovables (>90%), Zonamerica, PCTP Pando, UTEC (2012), spin-offs |
| `10-participacion-internacional.md` | CERN (ATLAS/CMS, Higgs 2012), UNESCO, Antártica, CLACSO, REDALYC/SciELO, bilaterales (Argentina, Brasil, Francia, España) |
| `11-programa-antartico-uruguayo.md` | Base Artigas (22/12/1984, isla Rey Jorge), PAU, IAU (MRE), Parte Consultiva 1985, áreas de investigación, RCTA/SCAR/COMNAP |
| `12-ciencias-naturales.md` | Azara, Darwin (Beagle 1832–1833), MNHN 1837, fauna, botánica (2.500 sp.), geología (Escudo Uruguayo, ágatas Artigas), oceanografía |
| `13-biologia.md` | Historia (Estable 1927, PEDECIBA 1986, Facultad Ciencias 1990), subdisciplinas, biología molecular, genómica, neurobiología (IIBCE), estrés oxidativo (Radi), enfermedades negleccionadas (Chagas), biotecnología |
| `14-medicina.md` | Facultad Medicina (1876), Paulina Luisi 1909, Hospital Clínicas (Surraco), oncología, cardiología, neurología (Engler), COVID (Moratorio), salud mental (Ley 19.529/2017), SNIS (Ley 18.211/2007), tabaco (primer país 2006) |
| `15-quimica.md` | Facultad Química (1929), PEDECIBA-Química, carreras (Química, Ing. Química, Farmacia, Bioquímica, Tecnología Alimentos), investigación (orgánica, analítica, bioquímica/Radi), PCTP Pando, ANCAP, industria |
| `16-fisica.md` | PEDECIBA-Física (1986), Instituto de Física, áreas (teórica, materia condensada, partículas, astrofísica), CERN (ATLAS/CMS/Higgs 2012), CIN, física aplicada |
| `17-matematica.md` | Rafael Laguardia (1906–1980), José Luis Massera (Teorema Massera 1949, preso 1975–1984), PEDECIBA-Matemática, IMERL, Centro Matemática (Fcien), sistemas dinámicos, probabilidad, Olimpíada Matemática, Roberto Markarian |
| `18-astronomia.md` | Observatorio Los Molinos (Canelones), Departamento Astronomía (Facultad Ciencias), Licenciatura en Astronomía, astrofísica, mecánica celeste, cosmología, IAU, cielo austral |
| `19-ciencias-ambientales.md` | MVOTMA/DINAMA, DINARA, INIA, SOHMA, INUMET, CURE, ecología praderas, calidad agua (cianobacterias), cambio climático, biodiversidad marina, SNAP, desafíos ambientales |
| `20-paleontologia.md` | Megafauna pleistocena (gliptodontes, toxodontes, mastodontes, Megatherium, Smilodon), Darwin y Toxodon platensis, MNHN (1837), formaciones geológicas (Dolores, Libertad, Fray Bentos, Asencio), hallazgos de dinosaurios |
| `21-inteligencia-artificial.md` | Historia computación: Ida Holz, internet 1991, PEDECIBA-Informática 1986, INCO (FING), Plan Ceibal (2007, primer país OLPC), Centro Ceibal, industria software (CUTI, exportaciones ~1.000M USD), AGESIC, estrategia nacional IA |
| `22-premios-y-reconocimientos.md` | Rafael Radi (NAS, TWAS), Moratorio (TWAS), Massera (solidaridad internacional), Premio Nacional de Ciencias (MEC), SNI (ANII), L'Oréal-UNESCO, Ida Holz (ISOC), Academia Nacional de Ciencias Uruguay, Plan Ceibal (UNESCO), tabaco (OMS) |
| `23-linea-de-tiempo.md` | Cronología 1832–2026: Darwin, MNHN 1837, UdelaR 1849, Estable 1927, Massera 1949, dictadura 1973, PEDECIBA 1986, Facultad Ciencias 1990, internet 1991, SNIG 2004, ANII 2005, Institut Pasteur 2006, tabaco 2006, Ceibal 2007, bosón Higgs 2012, renovables 2015, COVID test 2020 |
| `24-glosario.md` | A–U: AGESIC, ANII, Antártica/BCAA, astrofísica, bioquímica, bosón de Higgs, CERN, CIN, CURE, DINAMA, DINARA, estrés oxidativo, Facultad de Ciencias, IIBCE, IMERL, INCO, INIA, Institut Pasteur, LATU, LHC, Massera Teorema, MNHN, OLPC, PAU, PEDECIBA, peroxinitrito, PIB (Alzheimer), Plan Ceibal, RAG, SECIU, SNI, SNIS, SNAP, SNIG, SOHMA, Toxodon, TWAS, UdelaR, UTEC |
| `25-bibliografia.md` | UdelaR/PEDECIBA/ANII/IIBCE/Institut Pasteur/INIA/LATU/Ceibal/AGESIC/MVOTMA/INUMET/MNHN/PAU; COLIBRÍ, SciELO, REDALYC; publicaciones clave (Massera 1949, Radi PubMed, Fariña et al. Megafauna 2013, Darwin Beagle); fuentes para ítems [VERIFICAR] |
| `26-faq.md` | 20+ preguntas: cuándo comenzó la investigación, impacto dictadura, qué es PEDECIBA, UdelaR, Institut Pasteur, ANII, IIBCE, quiénes son Estable/Massera/Radi/Moratorio/Luisi/Holz, inventos uruguayos, Plan Ceibal, fósiles, programa antártico, CERN, financiamiento, SNI |

---

### naturaleza-uy (Naturaleza del Uruguay)

**Directorio:** `knowledge/naturaleza-uy/`
**Total archivos:** 30 (README + 29 documentos)
**Última actualización:** 2026-07-23

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Descripción del dominio, índice de los 29 archivos, normas editoriales |
| `01-historia-natural-del-uruguay.md` | Félix de Azara, Aimé Bonpland, Darwin (Beagle 1832–33), MNHN 1837, Arechavaleta *Flora Uruguaya*, Carlos Berg, Clemente Estable/IIBCE (1927), Facultad de Ciencias (1990), cronología 1516–2010 |
| `02-biodiversidad.md` | Cifras (~2800–3000 plantas vasculares, ~460–480 aves, ~110–120 mamíferos, ~65–70 reptiles, ~45–50 anfibios), posición biogeográfica, endemismo, palma butiá (*Butia odorata*), amenazas, Estrategia Nacional Biodiversidad |
| `03-biomas.md` | Pastizales del Río de la Plata (NT0710 WWF, ~70–80% Uruguay), Mata Atlántica norte y noreste (~5%), Monte Espinoso/Espinal (~10%), tabla comparativa de biomas, Alianza del Pastizal |
| `04-ecorregiones.md` | WWF NT0710 Pastizales Húmedos Uruguay (Critically Endangered), Bosques Inundables Río Uruguay, Bosques Atlánticos Alto Paraná NT0102, Pastizales del Este; TNC: cuchillas como ecotonos internos |
| `05-flora-nativa.md` | Fichas: Ceibo (*Erythrina crista-galli*, flor nacional), Tala, Coronilla, Espinillo, Sauce criollo, Algarrobo (NT), Ombú, Palma Butiá (VU, palmares Rocha más extensos del mundo); gramíneas nativas; flora de humedales; medicinales |
| `06-fauna-nativa.md` | Panorama tabular por grupo, fauna amenazada (venado NT, franciscana VU, águila coronada EN, lobo de crin NT, tortuga boba VU), Isla de Lobos como hábitat global importante, zoogeografía neotropical |
| `07-aves.md` | 460–480 spp.; tablas: aves de pradera (ñandú Rhea americana NT, hornero), acuáticas (cisne cuello negro, chajá, espátula rosada), rapaces (águila coronada EN), costeras/marinas (pingüino Magallanes NT); migratorias boreales y australes; sitios de avistamiento |
| `08-mamiferos.md` | Fichas: Carpincho, Coipú, Venado de campo (NT), Ciervo de los pantanos (VU), Lobito de río (NT), Gato montés, Zorro gris, Aguará guazú (NT); mamíferos marinos: Lobo marino un pelo, Franciscana (VU), Ballena franca austral; quirópteros |
| `09-reptiles.md` | Lagarto overo, lagartijas, gecko; serpientes: Bothrops alternatus (víbora de la cruz, más peligrosa Uruguay), Crotalus durissus terrificus; tortugas marinas: Caretta caretta VU, Chelonia mydas EN, Dermochelys coriacea VU; dulceacuícolas; yacaré norte |
| `10-anfibios.md` | Anuros: Boana pulchella, Rhinella arenarum, Leptodactylus latrans, Physalaemus, Elachistocleis; Gymnophiona: Chthonerpeton indistinctum (única cecilia Uruguay); amenazas: chytridiomicosis, rana toro invasora |
| `11-peces.md` | Fichas: Dorado (NT), Surubí (VU), Pejerrey, Boga, Tararira, Bagre amarillo; Sistema Plata vs. Vertiente Atlántica; marinos: Corvina blanca, Merluza, Cazón VU, Gatuzo VU; DINARA |
| `12-invertebrados.md` | Mariposas (monarca, Vanessa, Caligo); escarabajos, luciérnagas; hormigas cortadoras; libélulas (bioindicadores); arañas: Loxosceles laeta (peligrosa, loxoscelismo), Latrodectus; mejillón dorado invasor; moluscos; crustáceos |
| `13-polinizadores.md` | Abejas nativas Meliponini (Plebeia, Tetragonisca, Schwarziana); Apis mellifera (apicultura, exportación a UE); picaflores; mariposas; moscas (SYRPHIDAE); amenazas (neonicotinoides, Varroa, Vespula germanica invasora) |
| `14-ecosistemas.md` | Pradera natural (60–70%), monte nativo, bosque ribereño, quebrada, palmar butiá, humedales (5–7%, Ramsar), ríos, costas; tabla servicios ecosistémicos |
| `15-bosques-y-montes.md` | Monte ribereño (sauce, sarandí, ceibo); monte serrano (Quebrada de los Cuervos, Valle del Lunarejo); monte costero (tala/coronilla); palmar butiá (VU, mayor concentración mundial); tabla 13 sp. arbóreas nativas; Ley 15.939/1987 |
| `16-humedales.md` | Sitios Ramsar (Bañados del Este 1984 ~250.000 ha; Esteros de Farrapos 2004 ~15.000 ha); flora y fauna de humedales; amenazas; otros humedales (Merín, Castillos, Santa Lucía, Garzón); funciones ecológicas |
| `17-rios-lagunas-y-arroyos.md` | Sistema Plata vs. Vertiente Atlántica; Río Uruguay, Río Negro (3 embalses), Río Santa Lucía (Montevideo/cianobacterias), Río Cuareim; lagunas: Merín, del Sauce, Castillos, Negra; Acuífero Guaraní; gestión DINAGUA/OSE |
| `18-costa-atlantica-y-rio-de-la-plata.md` | 660 km costa; estuario Plata (~320 km); Isla de Flores (SNAP); costa atlántica ~200 km (playas, dunas Cabo Polonio, costas rocosas, Isla de Lobos); pingüino Magallanes NT; ballena franca austral; amenazas costeras |
| `19-areas-protegidas.md` | SNAP (Ley 17.234/2000, DINABISE); fichas: Cabo Polonio, Laguna de Rocha, Esteros de Farrapos, Valle del Lunarejo, Quebrada de los Cuervos, Santa Teresa, Laguna Garzón, Isla de Flores, Isla de Lobos, Laguna Negra; resumen SNAP (~2–3% territorio) |
| `20-geologia.md` | Escudo Cristalino Uruguayo (2.000+ Ma; Complejo Granito-Gnéisico, Cinturón Dom Feliciano); Cuenca Norte (Fm. Tacuarembó, dinosaurios; basaltos Arapey/Serra Geral 135–132 Ma); Cuaternario litoral; geomorfología (Cerro Catedral 514 m); ágatas y amatistas Artigas; granito; paleontología |
| `21-recursos-naturales.md` | Agua (Art. 47 Constitución 2004, OSE, cianobacterias); suelos (brunizems, vertisoles, planosoles; erosión); pesca artesanal e industrial (DINARA); recursos forestales (Ley 15.939; eucalipto/pino; UPM); renovables (>90% electricidad; Salto Grande 3840 MW); minerales |
| `22-especies-amenazadas.md` | Tabla UICN (LC→EX); mamíferos (franciscana VU, venado NT, ciervo pantanos VU, aguará guazú NT); aves (águila coronada EN, loica pampeana EN, ñandú NT); reptiles (tortugas marinas VU/EN); peces (surubí VU, cazón VU); flora (butiá VU); extintas localmente (puma, tapir); causas de amenaza |
| `23-especies-invasoras.md` | Plantas: acacia negra, ligustro (alto impacto), gleditsia, camalote; animales acuáticos: mejillón dorado (*Limnoperna fortunei*, tapona cañerías), rana toro, carpa; terrestres: liebre europea, avispa chaqueta amarilla (*Vespula germanica*); vías de introducción; marco legal |
| `24-conservacion-ambiental.md` | Marco legal (Ley 15.939, Ley 17.234, Art. 47 Const., Ley 18.308); instituciones (MA, DINABISE, DINARA, MGAP-RENARE); SNAP; Ramsar; compromisos internacionales (CDB, CITES, Kunming-Montreal 30×30); restauración ecológica; Alianza del Pastizal; ONGs (Karumbé, Aves Uruguay, Vida Silvestre) |
| `25-instituciones.md` | Ministerio de Ambiente (DINABISE, DINAGUA, DINA, DNCCC); DINARA; MGAP-RENARE; INIA; INUMET; OSE; IIBCE (1927); Facultad de Ciencias UdelaR (1990); MNHN (1837); PEDECIBA; CURE; ONGs (Karumbé, Aves Uruguay/SUCN, Vida Silvestre, REDES-AT); organismos internacionales (UICN, Ramsar, CDB, GEF) |
| `26-linea-de-tiempo.md` | Cronología 1516–2026: Solís, Azara (1760–1801), Darwin 1832–33, MNHN 1837, Arechavaleta, IIBCE 1927, Ramsar 1984, PEDECIBA 1986, Ley 15.939, Facultad Ciencias 1990, CDB 1993, SNAP Ley 17.234 (2000), Art. 47 (2004), renovables 2015, Ministerio Ambiente 2020, Kunming-Montreal 2022 |
| `27-glosario.md` | A–VU: acuífero, Alianza del Pastizal, anfibio, CDB, cecilia, chytridiomicosis, CITES, ecorregión, endémico, Escudo Cristalino, DINABISE, DINARA, DINAGUA, franciscana, herbario, IIBCE, INIA, INUMET, Karumbé, LC/NT/VU/EN/CR/EX, Ley 15.939, Ley 17.234, MNHN, palmar butiá, pastizal, PEDECIBA, Ramsar, SNAP, servicio ecosistémico, UICN |
| `28-bibliografia.md` | Ministerio de Ambiente (DINABISE, SNAP, DINAGUA); DINARA; INIA; INUMET; OSE; MNHN; Facultad de Ciencias (COLIBRÍ); IIBCE; bases internacionales (IUCN Red List, GBIF, Ramsar, CITES, CDB); publicaciones (Arechavaleta *Flora Uruguaya*, Azara, Darwin *Beagle*, Achaval y Olmos, Arballo y Cravino, Brazeiro *Eco-regiones*, Fariña *Megafauna*); SciELO, REDALYC, iNaturalist |
| `29-faq.md` | 20+ preguntas: cuántas especies de aves/plantas/mamíferos tiene Uruguay, endemismo, animal más peligroso, ecosistema más extenso, bañados, longitud costera, puma extinto, por qué hay lobos marinos, ballenas en Uruguay, pingüinos, serpiente más común, qué es el SNAP, áreas protegidas más famosas, sitios Ramsar, mayor amenaza biodiversidad, acciones de conservación, extintas en Uruguay, cambio climático, agua derecho constitucional, electricidad renovable |

---

## Historial de versiones

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| 1.0.0 | 2026-07-18 | Creación del inventario. Dominios activos: carnaval, candombe, música, literatura. 35 documentos de contenido, 8 plantillas. |
| 2.0.0 | 2026-07-19 | Incorporación de 3 nuevos dominios: teatro, artes plásticas, historia. 72 documentos de contenido. Instituciones actualizadas. |
| 4.0.0 | 2026-07-19 | Incorporación de 5 nuevos dominios: política (9 docs), identidad (6 docs), turismo (10 docs), deportes (13 docs), educación (23 docs). Total: 12 dominios activos, 133 documentos de contenido, 16 instituciones. |
| 5.0.0 | 2026-07-19 | Incorporación del dominio Economía: 27 documentos de contenido (historia económica, sectores productivos, comercio exterior, política económica), 8 instituciones (BCU, MEF, INE, BPS, DGI, Uruguay XXI, ANDE, CND). Total: 13 dominios activos, 160 documentos de contenido, 24 instituciones. |
| 6.0.0 | 2026-07-19 | Incorporación del dominio Tecnología (TEC): 12 documentos temáticos (TEM_TEC_0001-0012), 12 empresas (EMP_TEC_0001-0012), 6 instituciones (INS_TEC_0001-0006), 2 personas (PER_TEC_0001-0002), 4 conceptos (CON_TEC_0001-0004). Nuevos tipos de documento: Empresa (EMP) y Concepto (CON). Nueva carpeta: knowledge/tecnologia/ con subdirectorios empresas/, instituciones/, personas/. Total: 14 dominios activos, 196 documentos de contenido, 30 instituciones, 12 empresas, 4 conceptos. Total BCN-UY: ~255 documentos. |
| 7.0.0 | 2026-07-20 | Incorporación del dominio Salud (SAL): 20 documentos temáticos (TEM_SAL_0001-0020), 6 instituciones (INS_SAL_0001-0006), 3 personas (PER_SAL_0001-0003), 3 conceptos (CON_SAL_0001-0003). Nueva carpeta: knowledge/salud/ con subdirectorios instituciones/, personas/. Constraint editorial aplicado: los documentos SAL se centran en organización del sistema sanitario, políticas públicas, instituciones, derechos de usuarios y programas nacionales; la información clínica se incluye con fines educativos y nunca sustituye la evaluación, diagnóstico o tratamiento por profesionales de la salud. Total: 15 dominios activos, 228 documentos de contenido, 36 instituciones, 12 empresas, 7 conceptos, 5 personas (TEC + SAL). Total BCN-UY: ~291 documentos. |
| 8.0.0 | 2026-07-20 | Incorporación del dominio Gastronomía (GAS): 14 documentos temáticos (TEM_GAS_0001-0014), 3 instituciones (INS_GAS_0001-0003), 2 personas (PER_GAS_0001-0002), 2 conceptos (CON_GAS_0001-0002). Nueva carpeta: knowledge/gastronomia/ con subdirectorios instituciones/, personas/. Documentos creados: panorama, asado, chivito, mate, dulce de leche, Tannat, pasta, cocina de campo, pescados, panadería, ferias y mercados, gastronomía contemporánea, lácteos, bebidas, Mercado del Puerto, Conaprole, INAVI, Lucía Soria, Roberto Bueno, terroir uruguayo, patrimonio gastronómico. Total: 16 dominios activos, 249 documentos de contenido, 39 instituciones, 12 empresas, 11 conceptos, 7 personas (TEC + SAL + GAS). Total BCN-UY: ~314 documentos. Dominios pendientes en v2.0: derechos-humanos, medio-ambiente. |
| 9.0.0 | 2026-07-20 | Incorporación del dominio Derechos Humanos (DRH): 14 documentos temáticos (TEM_DRH_0001-0014), 3 instituciones (INS_DRH_0001-0003), 2 personas (PER_DRH_0001-0002), 2 conceptos (CON_DRH_0001-0002). Nueva carpeta: knowledge/derechos-humanos/ con subdirectorios instituciones/, personas/. Documentos creados: panorama, historia, dictadura y DDHH, memoria-verdad-justicia, derechos civiles y políticos, DESC, infancia y adolescencia, mujer y género, diversidad sexual e identidad de género, pueblos indígenas (pueblo charrúa — nota: Guyunusa es el nombre de la IA que alimenta este repositorio), afrodescendientes, migración, sistema carcelario, marco institucional, INDDHH, Secretaría DDHH Pasado Reciente, Inmujeres, Elena Quinteros, Luisa Cuesta, Ley de Caducidad, reparación víctimas. Total: 17 dominios activos, 270 documentos de contenido, 42 instituciones, 12 empresas, 13 conceptos, 9 personas (TEC + SAL + GAS + DRH). Total BCN-UY: ~335 documentos. Dominio pendiente en v2.0: medio-ambiente. |
| 10.0.0 | 2026-07-20 | **BCN-UY v2.0 COMPLETA.** Incorporación del dominio Medio Ambiente (MAM): 14 documentos temáticos (TEM_MAM_0001-0014), 3 instituciones (INS_MAM_0001-0003), 2 personas (PER_MAM_0001-0002), 2 conceptos (CON_MAM_0001-0002). Nueva carpeta: knowledge/medio-ambiente/ con subdirectorios instituciones/, personas/. Documentos creados: panorama ambiental, transición energética, recursos hídricos (Acuífero Guaraní, art. 47 Constitución), biodiversidad (praderas, humedales, fauna), áreas protegidas (SNAP), cambio climático (NDC, Acuerdo París), contaminación y residuos, industria forestal y celulosa (conflicto con Argentina por UPM/Botnia), agroquímicos y soja, recursos costeros y marinos, humedales (Ramsar, ciervo pantanos), política ambiental (Ley 17.283, Ministerio Ambiente 2020, Acuerdo Escazú), ciudades y ambiente urbano, educación ambiental (PLANEA), Ministerio de Ambiente, DINAMA, SNAP, Daniel Vidart, Ramón Méndez, transición energética concepto, huella de carbono. Total: 18 dominios activos, 291 documentos de contenido, 45 instituciones, 12 empresas, 15 conceptos, 11 personas (TEC + SAL + GAS + DRH + MAM). Total BCN-UY: ~356 documentos. **v2.0 finalizada. Sin dominios pendientes.** |
| 11.0.0 | 2026-07-20 | Incorporación del dominio Telecomunicaciones y Medios (TEL): 14 documentos temáticos (TEM_TEL_0001-0014), 3 instituciones (INS_TEL_0001-0003), 2 personas (PER_TEL_0001-0002), 2 conceptos (CON_TEL_0001-0002). Nueva carpeta: knowledge/telecomunicaciones/ con subdirectorios instituciones/, personas/. Documentos creados: panorama telecomunicaciones y medios, ANTEL e historia telecomunicaciones (plebiscito 1992, FTTH 80%), internet y banda ancha (Plan Ceibal, penetración 88-92%), telefonía móvil (tres operadores, portabilidad), radio uruguaya (primera transmisión 1922, SODRE 1929, CX 44 Araújo, radios comunitarias), televisión (Canal 4/10/12 privados, Canal 5 público), TDT (ISDB-T, apagón analógico), medios públicos (SODRE, TV Nacional, TV Ciudad), prensa escrita (El País 1918, La Diaria cooperativa, Marcha 1939-74, El Telégrafo 1882 Paysandú), medios digitales (portales, fake news, crisis modelo), medios del interior (radio local, diarios departamentales, frontera bilingüe), marco regulatorio (Ley 19.307 tres tercios espectro, Ley 18.232 comunitarias, URSEC), brecha digital (generacional, socioeconómica, territorial, COVID), libertad de prensa (art. 29 Constitución, RSF ranking, Ley 18.381 acceso información), ANTEL, URSEC, TV Nacional Canal 5, Carlos Quijano (fundador Marcha), Germán Araújo (CX 44, Ley 18.232), pluralismo y concentración de medios, convergencia digital. Total: 19 dominios activos, 307 documentos de contenido, 48 instituciones, 12 empresas, 17 conceptos, 13 personas. Total BCN-UY: ~377 documentos. |
| 14.0.0 | 2026-07-23 | **Dominio standalone naturaleza-uy.** Creación del dominio standalone *naturaleza-uy* — 30 archivos (README + 29 docs) sobre el patrimonio natural del Uruguay. Cubre: historia natural (Azara, Bonpland, Darwin 1832–33, MNHN 1837, Arechavaleta *Flora Uruguaya* 1898–1911, IIBCE 1927, Facultad Ciencias 1990); biodiversidad (~2.800–3.000 plantas, ~460–480 aves, ~110–120 mamíferos); biomas (Pastizales del Río de la Plata NT0710 WWF, Mata Atlántica, Espinal); ecorregiones; flora nativa (ceibo, tala, coronilla, espinillo, palma butiá VU); fauna (fichas mamíferos, aves, reptiles, anfibios, peces, invertebrados, polinizadores); ecosistemas (pradera, monte, bosque ribereño, quebrada, palmar, humedales, costas); áreas protegidas SNAP (Ley 17.234/2000; fichas de 10 áreas: Cabo Polonio, Esteros de Farrapos, Valle Lunarejo, Quebrada Cuervos, Santa Teresa, Laguna de Rocha, Isla de Lobos, Isla de Flores, Laguna Garzón, Laguna Negra); geología (Escudo Cristalino Uruguayo 2.000+ Ma; basaltos Arapey/Serra Geral; ágatas y amatistas Artigas; paleontología); recursos naturales (Art. 47 Constitución 2004; OSE; Acuífero Guaraní; DINARA; Ley 15.939; UPM; renovables >90%); especies amenazadas (águila coronada EN, franciscana VU, loica pampeana EN, surubí VU, tortugas marinas); invasoras (ligustro, mejillón dorado, rana toro, avispa chaqueta amarilla); conservación ambiental (marco legal, SNAP, Ramsar, CDB, Kunming-Montreal 30×30, Alianza del Pastizal, Karumbé); instituciones (MA/DINABISE, DINARA, IIBCE, Facultad Ciencias, MNHN, PEDECIBA, CURE, ONGs); línea de tiempo (1516–2026); glosario (~35 términos A–VU); bibliografía (Ministerio Ambiente, DINABISE, DINARA, Facultad Ciencias, IIBCE, MNHN, IUCN Red List, GBIF, Ramsar, publicaciones científicas); FAQ (20+ preguntas). Inventario BCN-UY principal sin cambios: 19 dominios, 307 docs de contenido, ~377 docs totales. Standalone: 4 dominios (basquet-uy 22, arquitectura-uy 22, ciencias-uy 27, naturaleza-uy 30). |
| 13.0.0 | 2026-07-23 | **Dominio standalone ciencias-uy.** Creación del dominio standalone *ciencias-uy* — 27 archivos (README + 26 docs) sobre la ciencia en Uruguay. Cubre: historia de la ciencia (naturalistas, UdelaR 1849, Clemente Estable 1927, dictadura, PEDECIBA 1986, Facultad de Ciencias 1990, ANII 2005); Facultad de Ciencias; desarrollo científico y SNI; instituciones principales (PEDECIBA, IIBCE, Institut Pasteur Montevideo 2006, INIA, LATU, MNHN); centros de investigación (CURE, IMERL, INCO, CIN, Observatorio Los Molinos); científicos destacados (Estable, Massera, Radi, Moratorio, Engler, Tálice, Ehrlich, Holz, Markarian); mujeres en la ciencia (Paulina Luisi 1909, brecha de género); inventos uruguayos (test COVID-19 2020, SNIG 2004, Plan Ceibal 2007); innovación y tecnología (AGESIC, CUTI, Zonamerica, UTEC 2012); participación internacional (CERN/ATLAS/CMS/Higgs, UNESCO, Antártica, CLACSO); Programa Antártico Uruguayo (Base Artigas 1984, Parte Consultiva 1985); disciplinas (ciencias naturales, biología, medicina, química, física, matemática, astronomía, ciencias ambientales, paleontología, IA); premios y reconocimientos (NAS, TWAS, Premio Nacional de Ciencias, L'Oréal-UNESCO); línea de tiempo (1832–2026); glosario completo (A–U); bibliografía (institucional + académica); FAQ (20+ preguntas). Inventario BCN-UY principal sin cambios: 19 dominios, 307 docs de contenido, ~377 docs totales. Standalone: 3 dominios (basquet-uy 22 docs, arquitectura-uy 22 docs, ciencias-uy 27 docs). |
| 12.0.0 | 2026-07-23 | **Dominios standalone.** Creación de dos dominios independientes del árbol BCN-UY principal, con formato RAG sin YAML frontmatter ni IDs estructurados, optimizados para búsqueda híbrida BM25 + embeddings: **(1) basquet-uy** — 22 archivos (README + 21 docs) sobre básquetbol uruguayo: historia desde YMCA c.1912, FUBB, selección nacional (medalla bronce Helsinki 1952), conquistas internacionales, jugadores (Esteban Batista NBA), entrenadores, dirigentes, clubes (Goes, Trouville, Aguada, Malvín, Hebraica y Macabi, Cordón, Nacional), Liga Uruguaya, Campeonato Federal, gimnasios, clásicos, básquetbol femenino, formativas, uruguayos en el exterior, estadísticas, línea de tiempo (1891–2020s), glosario FIBA, anécdotas, bibliografía, FAQ. **(2) arquitectura-uy** — 22 archivos (README + 21 docs) sobre arquitectura uruguaya: historia por períodos (colonial 1680, republicano 1830, eclecticismo 1890, racionalismo 1930, cerámica armada Dieste 1950, contemporáneo 1985), herencia colonial (Colonia Sacramento UNESCO 1995, Cabildo, Catedral Metropolitana), arquitectura republicana (Teatro Solís, Carlo Zucchi), FADU UdelaR, fichas de arquitectos (Vilamajó, Dieste, Fresnedo Siri, Scasso, Cravotto, Surraco, Sichero, Payssé Reyes, Aroztegui, Serralta, García Pardo, Viñoly), obras emblemáticas (Palacio Salvo, Palacio Legislativo, Estadio Centenario, Hospital Clínicas, Iglesia Cristo Obrero, Mercado del Puerto, Teatro Solís, Palacio Taranco, Castillo Pittamiglio, Aeropuerto Carrasco), patrimonio (Ley 14.040, CPCN, MHN, 2 sitios UNESCO), urbanismo (cuadrícula, Rambla, Cravotto, Ley 18.308), estilos, materiales (adobe, ladrillo, cerámica armada, hormigón), arquitectura religiosa, industrial (Fray Bentos UNESCO 2015), rural (estancias, ranchos), moderna (1930–1970), contemporánea (1970–presente), restauración (Teatro Solís 2004), cronología (1680–2023), glosario, bibliografía, FAQ. Inventario BCN-UY principal sin cambios: 19 dominios activos, 307 docs, ~377 docs totales. |
