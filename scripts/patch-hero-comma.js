// Change the homePage hero accent separator from em-dash to a comma.
// "En partner — EventPartner." → "En partner, EventPartner."
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
  const patch = {
    'heroHeadlineAccent.en': 'One partner, EventPartner.',
    'heroHeadlineAccent.sv': 'En partner, EventPartner.',
  };
  const res = await client.patch('homePage').set(patch).commit();
  console.log('Patched homePage hero accent → comma. New rev:', res._rev);
}

run().catch((e) => {
  console.error('PATCH FAILED:', e.message);
  process.exit(1);
});
