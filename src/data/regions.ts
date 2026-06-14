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
    name: 'Nordic countries',
    countrySlugs: ['sweden', 'norway', 'iceland', 'estonia', 'latvia', 'lithuania'],
    center: [61, 15],
    previewFlags: ['se', 'no', 'is'],
    totalVenues: '18,500+',
    status: 'active',
  },
  {
    slug: 'western-europe',
    name: 'Western Europe',
    countrySlugs: ['uk', 'ireland', 'france', 'belgium', 'netherlands', 'luxembourg'],
    center: [49, 2],
    previewFlags: ['gb', 'fr', 'nl'],
    totalVenues: '32,000+',
    status: 'active',
  },
  {
    slug: 'central-europe',
    name: 'Central Europe',
    countrySlugs: ['czech-republic', 'poland', 'slovakia', 'hungary', 'switzerland'],
    center: [49, 15],
    previewFlags: ['cz', 'pl', 'ch'],
    totalVenues: '24,000+',
    status: 'active',
  },
  {
    slug: 'southern-europe',
    name: 'Southern Europe',
    countrySlugs: ['spain', 'portugal', 'italy', 'greece', 'malta'],
    center: [40, 10],
    previewFlags: ['es', 'it', 'gr'],
    totalVenues: '28,500+',
    status: 'active',
  },
  {
    slug: 'balkans-southeast',
    name: 'Balkans & Southeast',
    countrySlugs: ['croatia', 'slovenia', 'serbia', 'bosnia-herzegovina', 'montenegro', 'north-macedonia', 'romania'],
    center: [44, 19],
    previewFlags: ['hr', 'rs', 'ro'],
    totalVenues: '9,800+',
    status: 'active',
  },

  // ── Additional European ──
  {
    slug: 'nordic-extended',
    name: 'Nordic Extended',
    countrySlugs: ['finland', 'denmark'],
    center: [60, 20],
    previewFlags: ['fi', 'dk'],
    totalVenues: '8,200+',
    status: 'active',
  },
  {
    slug: 'central-europe-extended',
    name: 'Central Europe Extended',
    countrySlugs: ['germany', 'bulgaria', 'moldova', 'ukraine'],
    center: [50, 15],
    previewFlags: ['de', 'bg', 'ua'],
    totalVenues: '14,000+',
    status: 'active',
  },
  {
    slug: 'balkans-extended',
    name: 'Balkans Extended',
    countrySlugs: ['albania', 'andorra', 'monaco', 'gibraltar', 'eswatini'],
    center: [42, 20],
    previewFlags: ['al', 'ad', 'mc'],
    totalVenues: '3,500+',
    status: 'active',
  },

  // ── Global regions (now active!) ──
  {
    slug: 'middle-east',
    name: 'Middle East',
    countrySlugs: ['turkey', 'israel', 'jordan', 'lebanon', 'saudi-arabia', 'qatar', 'bahrain', 'kuwait', 'oman'],
    center: [28, 42],
    previewFlags: ['sa', 'ae', 'tr'],
    totalVenues: '18,000+',
    status: 'active',
  },
  {
    slug: 'africa',
    name: 'Africa',
    countrySlugs: ['south-africa', 'egypt', 'nigeria', 'kenya', 'ethiopia', 'ghana', 'tanzania', 'morocco', 'tunisia', 'senegal', 'rwanda', 'uganda', 'cameroon', 'angola', 'mozambique', 'namibia', 'botswana', 'zambia', 'zimbabwe', 'madagascar', 'mauritius', 'seychelles', 'mali', 'niger', 'chad', 'guinea', 'guinea-bissau', 'sierra-leone', 'liberia', 'gambia', 'benin', 'togo', 'burkina-faso', 'central-african-republic', 'congo', 'eritrea', 'djibouti', 'somalia', 'sudan', 'south-sudan', 'lesotho', 'malawi', 'mauritania', 'cape-verde', 'equatorial-guinea', 'sao-tome-and-principe', 'algeria'],
    center: [5, 20],
    previewFlags: ['za', 'ng', 'ke'],
    totalVenues: '28,000+',
    status: 'active',
  },
  {
    slug: 'asia-pacific',
    name: 'Asia Pacific',
    countrySlugs: ['japan', 'south-korea', 'china', 'india', 'australia', 'new-zealand', 'singapore', 'hong-kong', 'macau', 'malaysia', 'indonesia', 'thailand', 'vietnam', 'philippines', 'cambodia', 'laos', 'myanmar', 'bangladesh', 'nepal', 'sri-lanka', 'pakistan', 'afghanistan', 'kazakhstan', 'kyrgyzstan', 'uzbekistan', 'mongolia', 'brunei', 'fiji', 'samoa', 'tonga', 'vanuatu', 'palau', 'kiribati', 'micronesia', 'marshall-islands', 'nauru', 'tuvalu', 'maldives', 'bhutan', 'armenia', 'azerbaijan', 'georgia'],
    center: [25, 100],
    previewFlags: ['jp', 'au', 'sg'],
    totalVenues: '72,000+',
    status: 'active',
  },
  {
    slug: 'north-america',
    name: 'North America',
    countrySlugs: ['canada', 'mexico', 'puerto-rico', 'bermuda', 'cayman-islands', 'jamaica', 'bahamas', 'barbados', 'dominican-republic', 'antigua-and-barbuda', 'saint-kitts-and-nevis', 'saint-lucia', 'saint-vincent-and-the-grenadines', 'grenada', 'dominica', 'belize', 'guatemala', 'honduras', 'el-salvador', 'nicaragua', 'costa-rica', 'panama', 'united-states', 'cuba', 'haiti', 'martinique', 'guadeloupe'],
    center: [25, -80],
    previewFlags: ['ca', 'mx', 'jm'],
    totalVenues: '38,000+',
    status: 'active',
  },
  {
    slug: 'south-america',
    name: 'South America',
    countrySlugs: ['brazil', 'argentina', 'chile', 'colombia', 'peru', 'ecuador', 'bolivia', 'paraguay', 'uruguay', 'aruba'],
    center: [-15, -60],
    previewFlags: ['br', 'ar', 'cl'],
    totalVenues: '24,000+',
    status: 'active',
  },
];

// Quick lookup
export function getRegionBySlug(slug: string): Region | undefined {
  return REGIONS.find(r => r.slug === slug);
}

export function getRegionForCountry(countrySlug: string): Region | undefined {
  return REGIONS.find(r => r.countrySlugs.includes(countrySlug));
}
