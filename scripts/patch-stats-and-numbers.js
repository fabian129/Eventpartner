// Patch homePage: 300,000 -> 340,000 venue count across ALL fields, and
// replace the "Partners 2,400+" servicesStat with "Proposals 3+".
// Operates on the LIVE document (preserves the earlier hero patch).
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
  const doc = await client.getDocument('homePage');
  if (!doc) throw new Error('homePage not found');

  // 1) Venue count: safe literal swap (the only 300,000 in this doc are venue counts;
  //    euro amounts / capacities live in messages + country data, not here).
  let s = JSON.stringify(doc);
  const before = (s.match(/300,000|300 000/g) || []).length;
  s = s.split('300,000').join('340,000').split('300 000').join('340 000');
  const updated = JSON.parse(s);

  // 2) servicesStats: Partners 2,400+ -> Proposals 3+
  let statChanged = false;
  if (Array.isArray(updated.servicesStats)) {
    updated.servicesStats = updated.servicesStats.map((st) => {
      const isPartners = st._key === 'partners' || (st.label && st.label.en === 'Partners');
      if (isPartners) {
        statChanged = true;
        return { _key: 'proposals', label: { en: 'Proposals', sv: 'Förslag' }, value: '3+' };
      }
      return st;
    });
  }

  await client.createOrReplace(updated);
  console.log(`Patched homePage. venue-number swaps: ${before}, partners->proposals: ${statChanged}`);
  console.log('servicesStats:', JSON.stringify(updated.servicesStats));
}

run().catch((e) => {
  console.error('PATCH FAILED:', e.message);
  process.exit(1);
});
