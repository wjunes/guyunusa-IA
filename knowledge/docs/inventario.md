# Inventario BCN-UY

Versión: 4.0.0
Fecha: 2026-07-19
Estado: en desarrollo activo

---

## Resumen

| Métrica | Valor |
|---------|-------|
| Dominios activos | 12 |
| Documentos de contenido | 133 |
| Plantillas | 8 |
| Documentos de sistema | 3 |
| Total documentos | 144 |
| Dominios pendientes | 0 |

---

## Estructura de directorios

```
knowledge/
├── docs/
│   ├── README.md
│   ├── ids.md
│   └── inventario.md
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
│   └── ineed.md
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

## Historial de versiones

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| 1.0.0 | 2026-07-18 | Creación del inventario. Dominios activos: carnaval, candombe, música, literatura. 35 documentos de contenido, 8 plantillas. |
| 2.0.0 | 2026-07-19 | Incorporación de 3 nuevos dominios: teatro, artes plásticas, historia. 72 documentos de contenido. Instituciones actualizadas. |
| 4.0.0 | 2026-07-19 | Incorporación de 5 nuevos dominios: política (9 docs), identidad (6 docs), turismo (10 docs), deportes (13 docs), educación (23 docs). Total: 12 dominios activos, 133 documentos de contenido, 16 instituciones. |
