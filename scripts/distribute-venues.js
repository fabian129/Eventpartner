// Distributes each region's totalVenues across its countries (Malin P8, mail 2026-06-10):
// "Ta dessa nummer per region och splitta ut per land så det stämmer överens.
//  Större länder fler anläggningar. Sverige har ex. 2475 st. Mindre på Island etc."
// Weighted by country size tier, Sweden pinned to 2,475, sums match region totals.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const COUNTRY_FILES = ['europe.ts', 'africa.ts', 'americas.ts', 'asia-pacific.ts', 'middle-east.ts']
  .map((f) => path.join(DATA, 'countries', f));

// ── Parse regions.ts ────────────────────────────────────────────
const regionsSrc = fs.readFileSync(path.join(DATA, 'regions.ts'), 'utf8');
const regionBlocks = [...regionsSrc.matchAll(/\{\s*slug:\s*'([^']+)'[\s\S]*?countrySlugs:\s*\[([^\]]*)\][\s\S]*?totalVenues:\s*'([^']+)'/g)];
const regions = regionBlocks.map((m) => ({
  slug: m[1],
  countries: [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]),
  total: parseInt(m[3].replace(/[^\d]/g, ''), 10),
}));

// ── Size weights (bigger market = more venues) ──────────────────
const PINNED = {
  sweden: 2475,
  norway: 1125,
  finland: 325,
  denmark: 224,
  iceland: 45
};
const MAJOR = ['uk', 'france', 'germany', 'italy', 'spain', 'turkey', 'united-states', 'china', 'india', 'japan', 'australia', 'brazil', 'mexico', 'canada'];
const LARGE = ['netherlands', 'poland', 'switzerland', 'austria', 'portugal', 'greece', 'czech-republic', 'ireland', 'belgium', 'hungary', 'romania', 'denmark', 'finland', 'norway', 'israel', 'united-arab-emirates', 'uae', 'saudi-arabia', 'qatar', 'singapore', 'south-korea', 'thailand', 'indonesia', 'malaysia', 'vietnam', 'philippines', 'new-zealand', 'argentina', 'chile', 'colombia', 'peru', 'south-africa', 'egypt', 'morocco', 'nigeria', 'kenya'];
const MICRO = ['iceland', 'malta', 'luxembourg', 'montenegro', 'monaco', 'andorra', 'liechtenstein', 'san-marino', 'brunei', 'maldives', 'seychelles', 'mauritius', 'bahrain', 'fiji', 'bhutan', 'comoros', 'sao-tome-and-principe', 'cape-verde', 'djibouti', 'eswatini', 'lesotho', 'gambia', 'guinea-bissau', 'equatorial-guinea', 'antigua-and-barbuda', 'barbados', 'saint-lucia', 'grenada', 'dominica', 'saint-kitts-and-nevis', 'saint-vincent-and-the-grenadines', 'samoa', 'tonga', 'vanuatu', 'palau', 'micronesia', 'kiribati', 'tuvalu', 'nauru', 'marshall-islands', 'solomon-islands', 'timor-leste', 'belize', 'suriname', 'guyana'];
const weightOf = (slug) =>
  MAJOR.includes(slug) ? 8 : LARGE.includes(slug) ? 4.5 : MICRO.includes(slug) ? 0.5 : 1.2;

// ── Allocate per region ──────────────────────────────────────────
const round25 = (n) => Math.max(50, Math.round(n / 25) * 25);
const alloc = {}; // slug -> number
const report = [];
const seen = new Set();

for (const r of regions) {
  const fresh = r.countries.filter((c) => !seen.has(c)); // first region wins on overlap
  let remaining = r.total;
  const pinnedHere = fresh.filter((c) => PINNED[c] !== undefined);
  for (const c of pinnedHere) { alloc[c] = PINNED[c]; remaining -= PINNED[c]; seen.add(c); }
  const rest = fresh.filter((c) => PINNED[c] === undefined);
  const sumW = rest.reduce((s, c) => s + weightOf(c), 0);
  let allocated = 0;
  rest.forEach((c, i) => {
    let v = round25((remaining * weightOf(c)) / sumW);
    if (i === rest.length - 1) v = Math.max(50, round25(remaining - allocated)); // absorb rounding
    alloc[c] = v; allocated += v; seen.add(c);
  });
  const sum = r.countries.reduce((s, c) => s + (alloc[c] || 0), 0);
  report.push(`${r.slug.padEnd(26)} mål ${String(r.total).padStart(7)}  blev ${String(sum).padStart(7)}  (${r.countries.length} länder)`);
}

// ── Write back into country files ────────────────────────────────
const fmt = (n) => n.toLocaleString('en-US') + '+';
let updated = 0, missing = [];
for (const file of COUNTRY_FILES) {
  let src = fs.readFileSync(file, 'utf8');
  for (const [slug, v] of Object.entries(alloc)) {
    const re = new RegExp(`(slug: "${slug}",[^\\n]*venues: ")[^"]+(")`);
    if (re.test(src)) { src = src.replace(re, `$1${fmt(v)}$2`); updated++; }
  }
  fs.writeFileSync(file, src);
}
// countries in data files but in no region
for (const file of COUNTRY_FILES) {
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/slug: "([^"]+)"/g)) {
    if (!alloc[m[1]]) missing.push(m[1]);
  }
}

console.log(report.join('\n'));
console.log(`\nUppdaterade venues-värden: ${updated}`);
console.log(`Sverige: ${alloc.sweden} | UK: ${alloc.uk} | Island: ${alloc.iceland} | USA: ${alloc['united-states']}`);
console.log(`Totalsumma alla länder: ${Object.values(alloc).reduce((a, b) => a + b, 0).toLocaleString('en-US')}`);
if (missing.length) console.log(`\n⚠ Länder utan region (orörda, behåller gamla värdet): ${missing.join(', ')}`);
