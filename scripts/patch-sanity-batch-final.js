// Final Sanity content batch — all items verified verbatim against Malin's
// mail "Sista fixen / buggarna till hemsidan - EP" (2026-06-10).
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
  // ── aboutPage: stats + story headline (P1/P26/P33) ──
  let r = await client.patch('aboutPage').set({
    'stats[_key=="s2"].value': '30+',
    'stats[_key=="s2"].label.en': 'Years experience in meetings & events',
    'stats[_key=="s2"].label.sv': 'Års erfarenhet inom möten & event',
    'stats[_key=="s3"].value': '340,000+',
    'storyHeadline.en': 'We built EventPartner because',
    'storyHeadline.sv': 'Vi byggde EventPartner för att',
    'storyHeadlineAccent.en': 'organizing events is harder than it should be.',
    'storyHeadlineAccent.sv': 'det är svårare att skapa event än det borde vara.',
  }).commit();
  console.log('✅ aboutPage', r._rev);

  // ── leadershipPage: CTA (P28/P29) ──
  r = await client.patch('leadershipPage').set({
    'ctaHeadline.en': 'Want our help?',
    'ctaHeadline.sv': 'Vill du ha vår hjälp?',
    'ctaDescription.en': "With decades of combined experience in events, meetings, sales, AI and technology — we're committed to making your next event unforgettable.",
    'ctaDescription.sv': 'Med decenniers samlade erfarenhet inom event, möten, försäljning, AI och teknik — är vi engagerade i att göra ert nästa event oförglömligt.',
  }).commit();
  console.log('✅ leadershipPage', r._rev);

  // ── homePage: botten-CTA + Er väg + servicekort (P16/P10/P33) ──
  r = await client.patch('homePage').set({
    'ctaHeadline.en': 'Your partner, EventPartner.',
    'ctaHeadline.sv': 'Er partner, EventPartner.',
    'ctaCard2Sub.sv': 'På ert sätt.',
    'serviceCards[_key=="venues"].title.sv': 'Lokalbokning',
    'servicesFullserviceTitle.sv': 'Helhetsleverans',
  }).commit();
  console.log('✅ homePage', r._rev);

  // ── careersPage: 29 länder + öppen ansökan (P25/P32) ──
  r = await client.patch('careersPage').set({
    'perks[_key=="perk1"].desc.en': 'Work with colleagues across European countries.',
    'perks[_key=="perk1"].desc.sv': 'Arbeta med kollegor i flera europeiska länder.',
    'openApplicationDesc.en': "Think you'd be a great addition to EventPartner? We'd love to hear from you — we're always interested in exceptional talent.",
    'openApplicationDesc.sv': 'Tror du att du skulle passa hos EventPartner? Vi vill gärna höra från dig — vi är alltid intresserade av exceptionell talang.',
  }).commit();
  console.log('✅ careersPage', r._rev);

  // ── vipPage: städa bort legacy 2-nivåers tierCards (P9: ett program) ──
  r = await client.patch('vipPage').unset(['tierCards']).commit();
  console.log('✅ vipPage tierCards (legacy 2-tier) borttaget', r._rev);

  console.log('\nKLART — alla Sanity-patchar applicerade.');
}

run().catch((e) => { console.error('PATCH FAILED:', e.message); process.exit(1); });
