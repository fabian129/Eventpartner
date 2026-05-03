// Region definitions — aligned with Cvent Supplier Network taxonomy
// Europe broken into 5 sub-regions (EP's USP), global regions as coming-soon

export type Region = {
  slug: string;
  name: string;
  countrySlugs: string[];     // references countries.ts slugs
  center: [number, number];   // [lat, lng] — globe rotation target
  previewFlags: string[];     // 3 country codes for mini-flag preview
  totalVenues: string;
  status: 'active' | 'coming-soon';
};

export const REGIONS: Region[] = [
  // ── Active European sub-regions ──
  {
    slug: 'nordics',
    name: 'Nordics',
    countrySlugs: ['sweden', 'norway', 'iceland', 'estonia', 'latvia', 'lithuania'],
    center: [61, 15],
    previewFlags: ['se', 'no', 'is'],
    totalVenues: '450+',
    status: 'active',
  },
  {
    slug: 'western-europe',
    name: 'Western Europe',
    countrySlugs: ['uk', 'ireland', 'france', 'belgium', 'netherlands', 'luxembourg'],
    center: [49, 2],
    previewFlags: ['gb', 'fr', 'nl'],
    totalVenues: '450+',
    status: 'active',
  },
  {
    slug: 'central-europe',
    name: 'Central Europe',
    countrySlugs: ['czech-republic', 'poland', 'slovakia', 'hungary', 'switzerland'],
    center: [49, 15],
    previewFlags: ['cz', 'pl', 'ch'],
    totalVenues: '375+',
    status: 'active',
  },
  {
    slug: 'southern-europe',
    name: 'Southern Europe',
    countrySlugs: ['spain', 'portugal', 'italy', 'greece', 'malta'],
    center: [40, 10],
    previewFlags: ['es', 'it', 'gr'],
    totalVenues: '375+',
    status: 'active',
  },
  {
    slug: 'balkans-southeast',
    name: 'Balkans & Southeast',
    countrySlugs: ['croatia', 'slovenia', 'serbia', 'bosnia-herzegovina', 'montenegro', 'north-macedonia', 'romania'],
    center: [44, 19],
    previewFlags: ['hr', 'rs', 'ro'],
    totalVenues: '525+',
    status: 'active',
  },

  // ── Global regions (Cvent-aligned, coming soon) ──
  {
    slug: 'middle-east-africa',
    name: 'Middle East & Africa',
    countrySlugs: [],
    center: [15, 30],
    previewFlags: [],
    totalVenues: '—',
    status: 'coming-soon',
  },
  {
    slug: 'asia-pacific',
    name: 'Asia Pacific',
    countrySlugs: [],
    center: [25, 100],
    previewFlags: [],
    totalVenues: '—',
    status: 'coming-soon',
  },
  {
    slug: 'americas',
    name: 'Americas',
    countrySlugs: [],
    center: [25, -80],
    previewFlags: [],
    totalVenues: '—',
    status: 'coming-soon',
  },
];

// Quick lookup
export function getRegionBySlug(slug: string): Region | undefined {
  return REGIONS.find(r => r.slug === slug);
}

export function getRegionForCountry(countrySlug: string): Region | undefined {
  return REGIONS.find(r => r.countrySlugs.includes(countrySlug));
}
