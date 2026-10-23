cd b// ── test-brave-direct.mjs ──
// Correr en el servidor: node test-brave-direct.mjs
// Requiere: BRAVE_SEARCH_API_KEY en el .env o como variable de entorno
//
// Si tu .env necesita override: true, cambiá la línea de import por:
//   import dotenv from 'dotenv'; dotenv.config({ override: true });

import 'dotenv/config';

const API_KEY = process.env.BRAVE_SEARCH_API_KEY;
if (!API_KEY) {
  console.error('ERROR: BRAVE_SEARCH_API_KEY no encontrada');
  console.error('Asegurate de tener BRAVE_SEARCH_API_KEY en tu .env');
  process.exit(1);
}

console.log(`API Key: ${API_KEY.slice(0, 8)}...${API_KEY.slice(-4)}`);

const queries = [
  '"Rodrigo Junes Blanco"',
  '"Rodrigo Junes Blanco" ingeniero civil',
  '"Juana Mariela Blanco Coronel"',
  'Rodrigo Junes Blanco',  // sin comillas, para comparar
];

for (const q of queries) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`QUERY: ${q}`);
  console.log('='.repeat(60));

  const params = new URLSearchParams({
    q,
    count: '5',
    text_decorations: 'false',
    safesearch: 'moderate',
  });

  try {
    const resp = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': API_KEY,
      },
    });

    console.log(`Status: ${resp.status}`);
    const data = await resp.json();

    if (data.web?.results?.length) {
      console.log(`Resultados: ${data.web.results.length}`);
      data.web.results.forEach((r, i) => {
        console.log(`  ${i+1}. ${r.title}`);
        console.log(`     ${r.url}`);
        console.log(`     ${r.description?.slice(0, 150)}`);
      });
    } else {
      console.log('SIN RESULTADOS');
      if (data.query) console.log('Query info:', JSON.stringify(data.query));
      if (data.type) console.log('Response type:', data.type);
      // Mostrar la respuesta cruda para debug
      console.log('Raw response keys:', Object.keys(data));
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
  }
}
