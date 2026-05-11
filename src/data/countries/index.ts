// Re-exports all countries from regional modules
export type { Venue, Country } from './types';

import { EUROPE } from './europe';
import { MIDDLE_EAST } from './middle-east';
import { AFRICA } from './africa';
import { ASIA_PACIFIC } from './asia-pacific';
import { AMERICAS } from './americas';

export { EUROPE, MIDDLE_EAST, AFRICA, ASIA_PACIFIC, AMERICAS };

export const COUNTRIES = [
  ...EUROPE,
  ...MIDDLE_EAST,
  ...AFRICA,
  ...ASIA_PACIFIC,
  ...AMERICAS,
];

// Quick lookup by slug
export function getCountryBySlug(slug: string) {
  return COUNTRIES.find(c => c.slug === slug);
}

// All slugs for static generation
export function getAllCountrySlugs(): string[] {
  return COUNTRIES.map(c => c.slug);
}
