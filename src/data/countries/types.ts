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
