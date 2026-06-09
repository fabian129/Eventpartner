// Targeted patch of the homePage hero copy in Sanity (client-provided launch copy).
// Uses patch().set() on specific fields only — NOT a blind string replace.
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
    'heroHeadline.en': 'Everything your event needs.',
    'heroHeadline.sv': 'Allt ditt event behöver.',
    'heroHeadlineAccent.en': 'One partner — EventPartner.',
    'heroHeadlineAccent.sv': 'En partner — EventPartner.',
    'heroSubheadline.en':
      "Tell us what you need. We'll source venues and event services, compare options, negotiate rates and manage the entire booking process.",
    'heroSubheadline.sv':
      'Beskriv ert event. Vi hittar de bästa lokalerna och leverantörerna, jämför alternativen, förhandlar priserna och hanterar hela bokningsprocessen från start till mål.',
    'heroBadge.en': '175 Countries • 340,000+ Venues',
    'heroBadge.sv': '175 länder • 340 000+ venues',
  };
  const res = await client.patch('homePage').set(patch).commit();
  console.log('Patched homePage hero. New rev:', res._rev);
}

run().catch((e) => {
  console.error('PATCH FAILED:', e.message);
  process.exit(1);
});
