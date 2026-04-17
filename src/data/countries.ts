// Country data with slugs, names and placeholder venues
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
  {
    slug: "sweden", code: "se", name: "Sweden", nameSv: "Sverige", venues: "420+",
    topVenues: [
      { name: "Stockholmsmässan", city: "Stockholm", capacity: "3,000", type: "Konferens" },
      { name: "Münchenbryggeriet", city: "Stockholm", capacity: "1,200", type: "Event" },
      { name: "Gothia Towers", city: "Göteborg", capacity: "2,500", type: "Hotell & Konferens" },
      { name: "Grand Hôtel", city: "Stockholm", capacity: "800", type: "Hotell" },
      { name: "Nalen", city: "Stockholm", capacity: "600", type: "Event & Underhållning" },
      { name: "Clarion Hotel Post", city: "Göteborg", capacity: "1,000", type: "Hotell & Konferens" },
      { name: "Malmö Live", city: "Malmö", capacity: "1,500", type: "Konferens" },
      { name: "Berns", city: "Stockholm", capacity: "450", type: "Event & Middag" },
      { name: "Hilton Stockholm Slussen", city: "Stockholm", capacity: "700", type: "Hotell" },
      { name: "Elite Hotel Marina Tower", city: "Stockholm", capacity: "500", type: "Hotell & Konferens" },
      { name: "Scandic Continental", city: "Stockholm", capacity: "600", type: "Hotell & Konferens" },
      { name: "Uppsala Konsert & Kongress", city: "Uppsala", capacity: "1,200", type: "Konferens" },
    ],
  },
  {
    slug: "ireland", code: "ie", name: "Ireland", nameSv: "Irland", venues: "180+",
    topVenues: [
      { name: "Convention Centre Dublin", city: "Dublin", capacity: "8,000", type: "Konferens" },
      { name: "Croke Park", city: "Dublin", capacity: "2,000", type: "Event" },
      { name: "The Shelbourne", city: "Dublin", capacity: "500", type: "Hotell" },
      { name: "Powerscourt Hotel", city: "Wicklow", capacity: "800", type: "Resort" },
      { name: "Citywest Hotel", city: "Dublin", capacity: "1,500", type: "Konferens" },
      { name: "Killarney Convention Centre", city: "Kerry", capacity: "2,000", type: "Konferens" },
      { name: "The K Club", city: "Kildare", capacity: "600", type: "Resort & Event" },
      { name: "Adare Manor", city: "Limerick", capacity: "400", type: "Hotell" },
      { name: "Cork International Hotel", city: "Cork", capacity: "700", type: "Konferens" },
      { name: "Galway Bay Hotel", city: "Galway", capacity: "500", type: "Hotell & Event" },
    ],
  },
  {
    slug: "uk", code: "gb", name: "United Kingdom", nameSv: "Storbritannien", venues: "1,200+",
    topVenues: [
      { name: "ExCeL London", city: "London", capacity: "10,000", type: "Konferens" },
      { name: "The O2", city: "London", capacity: "5,000", type: "Event" },
      { name: "Manchester Central", city: "Manchester", capacity: "3,000", type: "Konferens" },
      { name: "The Savoy", city: "London", capacity: "800", type: "Hotell" },
      { name: "ICC Birmingham", city: "Birmingham", capacity: "3,000", type: "Konferens" },
      { name: "EICC Edinburgh", city: "Edinburgh", capacity: "2,000", type: "Konferens" },
      { name: "The Shard", city: "London", capacity: "400", type: "Event & Middag" },
      { name: "Claridge's", city: "London", capacity: "500", type: "Hotell" },
      { name: "SEC Glasgow", city: "Glasgow", capacity: "3,000", type: "Konferens" },
      { name: "Natural History Museum", city: "London", capacity: "1,200", type: "Unik Venue" },
      { name: "Battersea Power Station", city: "London", capacity: "2,000", type: "Event" },
      { name: "One Great George Street", city: "London", capacity: "600", type: "Konferens" },
    ],
  },
  {
    slug: "iceland", code: "is", name: "Iceland", nameSv: "Island", venues: "45+",
    topVenues: [
      { name: "Harpa Concert Hall", city: "Reykjavik", capacity: "1,800", type: "Konferens" },
      { name: "Hilton Reykjavik Nordica", city: "Reykjavik", capacity: "500", type: "Hotell" },
      { name: "Grand Hotel Reykjavik", city: "Reykjavik", capacity: "400", type: "Hotell & Konferens" },
      { name: "Silfurberg Conference Centre", city: "Reykjavik", capacity: "600", type: "Konferens" },
      { name: "Blue Lagoon Retreat", city: "Grindavík", capacity: "200", type: "Unik Venue" },
      { name: "Fosshótel Glacier Lagoon", city: "Vatnajökull", capacity: "150", type: "Event" },
      { name: "Ion Adventure Hotel", city: "Selfoss", capacity: "120", type: "Event" },
      { name: "Canopy by Hilton", city: "Reykjavik", capacity: "300", type: "Hotell" },
      { name: "The Retreat at Blue Lagoon", city: "Grindavík", capacity: "100", type: "Unik Venue" },
      { name: "Perlan", city: "Reykjavik", capacity: "500", type: "Event & Museum" },
    ],
  },
  {
    slug: "germany", code: "de", name: "Germany", nameSv: "Tyskland", venues: "890+",
    topVenues: [
      { name: "Messe Berlin", city: "Berlin", capacity: "10,000", type: "Konferens" },
      { name: "ICM München", city: "München", capacity: "6,000", type: "Konferens" },
      { name: "Elbphilharmonie", city: "Hamburg", capacity: "2,100", type: "Unik Venue" },
      { name: "Hotel Adlon Kempinski", city: "Berlin", capacity: "1,000", type: "Hotell" },
      { name: "Congress Center Hamburg", city: "Hamburg", capacity: "3,500", type: "Konferens" },
      { name: "Koelnmesse", city: "Köln", capacity: "5,000", type: "Konferens" },
      { name: "Bayerischer Hof", city: "München", capacity: "800", type: "Hotell" },
      { name: "Estrel Berlin", city: "Berlin", capacity: "4,000", type: "Hotell & Konferens" },
      { name: "Alte Oper", city: "Frankfurt", capacity: "2,500", type: "Event" },
      { name: "The Westin Grand Berlin", city: "Berlin", capacity: "600", type: "Hotell" },
      { name: "Rheinterrasse", city: "Düsseldorf", capacity: "1,500", type: "Event" },
      { name: "Hauptstadtrepräsentanz", city: "Berlin", capacity: "700", type: "Event" },
    ],
  },
  {
    slug: "france", code: "fr", name: "France", nameSv: "Frankrike", venues: "760+",
    topVenues: [
      { name: "Palais des Congrès", city: "Paris", capacity: "3,700", type: "Konferens" },
      { name: "Le Grand Palais", city: "Paris", capacity: "5,000", type: "Event" },
      { name: "The Ritz Paris", city: "Paris", capacity: "600", type: "Hotell" },
      { name: "Château de Versailles", city: "Versailles", capacity: "2,000", type: "Unik Venue" },
      { name: "Palais Brongniart", city: "Paris", capacity: "1,200", type: "Event" },
      { name: "Centre de Congrès Lyon", city: "Lyon", capacity: "3,000", type: "Konferens" },
      { name: "Hôtel Plaza Athénée", city: "Paris", capacity: "500", type: "Hotell" },
      { name: "Nice Acropolis", city: "Nice", capacity: "2,500", type: "Konferens" },
      { name: "Carreau du Temple", city: "Paris", capacity: "800", type: "Event" },
      { name: "InterContinental Marseille", city: "Marseille", capacity: "600", type: "Hotell" },
    ],
  },
  {
    slug: "spain", code: "es", name: "Spain", nameSv: "Spanien", venues: "540+",
    topVenues: [
      { name: "IFEMA Madrid", city: "Madrid", capacity: "8,000", type: "Konferens" },
      { name: "Fira Barcelona", city: "Barcelona", capacity: "6,000", type: "Konferens" },
      { name: "W Barcelona", city: "Barcelona", capacity: "1,000", type: "Hotell" },
      { name: "Hotel Ritz Madrid", city: "Madrid", capacity: "600", type: "Hotell" },
      { name: "Palau de Congressos", city: "Barcelona", capacity: "3,000", type: "Konferens" },
      { name: "Real Alcázar", city: "Sevilla", capacity: "500", type: "Unik Venue" },
      { name: "Kursaal Congress Centre", city: "San Sebastián", capacity: "1,800", type: "Konferens" },
      { name: "Hotel Arts Barcelona", city: "Barcelona", capacity: "800", type: "Hotell" },
      { name: "Palacio de Cibeles", city: "Madrid", capacity: "700", type: "Event" },
      { name: "Parador de Granada", city: "Granada", capacity: "300", type: "Unik Venue" },
    ],
  },
  {
    slug: "italy", code: "it", name: "Italy", nameSv: "Italien", venues: "680+",
    topVenues: [
      { name: "MiCo Milano", city: "Milano", capacity: "8,000", type: "Konferens" },
      { name: "Palazzo dei Congressi", city: "Rom", capacity: "3,000", type: "Konferens" },
      { name: "Hotel Danieli", city: "Venedig", capacity: "400", type: "Hotell" },
      { name: "Villa d'Este", city: "Como", capacity: "500", type: "Resort" },
      { name: "Fiera di Bologna", city: "Bologna", capacity: "5,000", type: "Konferens" },
      { name: "The St. Regis Rome", city: "Rom", capacity: "600", type: "Hotell" },
      { name: "Palazzo Brancaccio", city: "Rom", capacity: "1,000", type: "Event" },
      { name: "Belmond Hotel Cipriani", city: "Venedig", capacity: "300", type: "Hotell" },
      { name: "Firenze Fiera", city: "Florens", capacity: "2,000", type: "Konferens" },
      { name: "Teatro alla Scala", city: "Milano", capacity: "2,000", type: "Unik Venue" },
    ],
  },
  {
    slug: "norway", code: "no", name: "Norway", nameSv: "Norge", venues: "210+",
    topVenues: [
      { name: "Oslo Spektrum", city: "Oslo", capacity: "2,000", type: "Event" },
      { name: "The Thief", city: "Oslo", capacity: "400", type: "Hotell" },
      { name: "Grieghallen", city: "Bergen", capacity: "1,500", type: "Konferens" },
      { name: "Radisson Blu Plaza", city: "Oslo", capacity: "800", type: "Hotell & Konferens" },
      { name: "Clarion Hotel The Hub", city: "Oslo", capacity: "1,000", type: "Hotell & Konferens" },
      { name: "Stavanger Forum", city: "Stavanger", capacity: "1,200", type: "Konferens" },
      { name: "Britannia Hotel", city: "Trondheim", capacity: "500", type: "Hotell" },
      { name: "Sommarøy Arctic Hotel", city: "Tromsø", capacity: "200", type: "Unik Venue" },
      { name: "Bergen Congress Centre", city: "Bergen", capacity: "1,000", type: "Konferens" },
      { name: "Holmenkollen Park Hotel", city: "Oslo", capacity: "600", type: "Hotell & Event" },
    ],
  },
  {
    slug: "denmark", code: "dk", name: "Denmark", nameSv: "Danmark", venues: "280+",
    topVenues: [
      { name: "Bella Center", city: "Köpenhamn", capacity: "5,000", type: "Konferens" },
      { name: "Tivoli Hotel & Congress Center", city: "Köpenhamn", capacity: "2,000", type: "Hotell & Konferens" },
      { name: "Hotel d'Angleterre", city: "Köpenhamn", capacity: "500", type: "Hotell" },
      { name: "Copenhagen Marriott", city: "Köpenhamn", capacity: "800", type: "Hotell" },
      { name: "Aarhus Congress Centre", city: "Aarhus", capacity: "1,500", type: "Konferens" },
      { name: "Odeon Odense", city: "Odense", capacity: "1,200", type: "Konferens" },
      { name: "Nimb Hotel", city: "Köpenhamn", capacity: "300", type: "Hotell" },
      { name: "Scandic Falkoner", city: "Köpenhamn", capacity: "1,000", type: "Konferens" },
      { name: "Aalborg Congress & Culture Centre", city: "Aalborg", capacity: "1,000", type: "Konferens" },
      { name: "Den Gamle By", city: "Aarhus", capacity: "400", type: "Unik Venue" },
    ],
  },
  {
    slug: "finland", code: "fi", name: "Finland", nameSv: "Finland", venues: "190+",
    topVenues: [
      { name: "Helsinki Expo and Convention Centre", city: "Helsingfors", capacity: "3,000", type: "Konferens" },
      { name: "Finlandia Hall", city: "Helsingfors", capacity: "1,700", type: "Konferens" },
      { name: "Hotel Kämp", city: "Helsingfors", capacity: "500", type: "Hotell" },
      { name: "Tampere Exhibition and Sports Centre", city: "Tammerfors", capacity: "2,000", type: "Konferens" },
      { name: "Lapland Hotels Snow Village", city: "Kittilä", capacity: "150", type: "Unik Venue" },
      { name: "Clarion Hotel Helsinki", city: "Helsingfors", capacity: "800", type: "Hotell & Konferens" },
      { name: "Arctic TreeHouse Hotel", city: "Rovaniemi", capacity: "100", type: "Unik Venue" },
      { name: "Turku Castle", city: "Åbo", capacity: "600", type: "Unik Venue" },
      { name: "Scandic Park Helsinki", city: "Helsingfors", capacity: "600", type: "Hotell & Konferens" },
      { name: "Naantali Spa Hotel", city: "Nådendal", capacity: "400", type: "Resort" },
    ],
  },
  {
    slug: "netherlands", code: "nl", name: "Netherlands", nameSv: "Nederländerna", venues: "340+",
    topVenues: [
      { name: "RAI Amsterdam", city: "Amsterdam", capacity: "7,000", type: "Konferens" },
      { name: "Beurs van Berlage", city: "Amsterdam", capacity: "1,500", type: "Event" },
      { name: "Hotel Okura", city: "Amsterdam", capacity: "800", type: "Hotell" },
      { name: "Ahoy Rotterdam", city: "Rotterdam", capacity: "4,000", type: "Event" },
      { name: "Rijksmuseum", city: "Amsterdam", capacity: "600", type: "Unik Venue" },
      { name: "World Forum", city: "Den Haag", capacity: "2,000", type: "Konferens" },
      { name: "NH Grand Hotel Krasnapolsky", city: "Amsterdam", capacity: "700", type: "Hotell" },
      { name: "De Hallen", city: "Amsterdam", capacity: "1,000", type: "Event" },
      { name: "Van Nelle Fabriek", city: "Rotterdam", capacity: "1,500", type: "Unik Venue" },
      { name: "Jaarbeurs Utrecht", city: "Utrecht", capacity: "3,000", type: "Konferens" },
    ],
  },
];

// Quick lookup by slug
export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find(c => c.slug === slug);
}

// All slugs for static generation
export function getAllCountrySlugs(): string[] {
  return COUNTRIES.map(c => c.slug);
}
