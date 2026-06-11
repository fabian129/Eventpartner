// VIP "Tre enkla steg" steg 2: bort med nivå-språket (det finns bara ETT VIP-program).
// Malin 2026-06-11: "matchar er med rätt VIP-nivå" måste skrivas om.
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

async function run() {
  const res = await client
    .patch('vipPage')
    .set({
      'steps[_key=="st2"].description.sv':
        'Vårt team granskar er ansökan och er eventvolym. Ni får besked inom 48 timmar.',
      'steps[_key=="st2"].description.en':
        "Our team reviews your application and event volume. You'll hear back within 48 hours.",
    })
    .commit();
  console.log('Patched vipPage steg 2 (nivå-språket borta). Rev:', res._rev);
}

run().catch((e) => { console.error('PATCH FAILED:', e.message); process.exit(1); });
