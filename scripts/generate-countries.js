const fs = require('fs');
const path = require('path');

const parsed = require('../venues/parsed-venues.json');
const countries = Object.values(parsed).sort((a, b) => a.name.localeCompare(b.name));

let ts = `// Country data — 29 countries with real venue data from Pontus
// Auto-generated from .docx files on ${new Date().toISOString().split('T')[0]}
export type Venue = {
  name: string;
  city: string;
  capacity: string;
  type: string;
};

export type Country = {
  slug: string;
  code: string;
  name: string;
  nameSv: string;
  venues: string;
  topVenues: Venue[];
};

export const COUNTRIES: Country[] = [
`;

for (const c of countries) {
  ts += `  {\n`;
  ts += `    slug: "${c.slug}", code: "${c.code}", name: "${c.name}", nameSv: "${c.nameSv}", venues: "${c.venues}",\n`;
  ts += `    topVenues: [\n`;
  for (const v of c.topVenues) {
    const name = v.name.replace(/"/g, '\\"');
    const city = v.city.replace(/"/g, '\\"');
    const cap = v.capacity.replace(/"/g, '\\"');
    const type = v.type.replace(/"/g, '\\"');
    ts += `      { name: "${name}", city: "${city}", capacity: "${cap}", type: "${type}" },\n`;
  }
  ts += `    ],\n`;
  ts += `  },\n`;
}

ts += `];

// Quick lookup by slug
export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find(c => c.slug === slug);
}

// All slugs for static generation
export function getAllCountrySlugs(): string[] {
  return COUNTRIES.map(c => c.slug);
}
`;

const outPath = path.join(__dirname, '..', 'src', 'data', 'countries.ts');
fs.writeFileSync(outPath, ts);
console.log(`✅ Written ${countries.length} countries (${countries.reduce((s, c) => s + c.topVenues.length, 0)} total venues) to src/data/countries.ts`);
