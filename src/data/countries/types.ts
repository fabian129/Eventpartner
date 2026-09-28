export type Venue = {
  name: string;
  city: string;
  capacity: string;
  type: string;
  /** Optional venue-specific image (overrides the generic venue-best-N fallback) */
  image?: string;
};

export type Country = {
  slug: string;
  code: string;
  name: string;
  nameSv: string;
  venues: string;
  topVenues: Venue[];
};
