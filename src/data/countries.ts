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
      { name: "Stockholmsmässan", city: "Stockholm", capacity: "3,000", type: "Conference" },
      { name: "Münchenbryggeriet", city: "Stockholm", capacity: "1,200", type: "Event" },
      { name: "Gothia Towers", city: "Gothenburg", capacity: "2,500", type: "Hotel & Conference" },
      { name: "Grand Hôtel", city: "Stockholm", capacity: "800", type: "Hotel" },
      { name: "Nalen", city: "Stockholm", capacity: "600", type: "Event & Entertainment" },
      { name: "Clarion Hotel Post", city: "Gothenburg", capacity: "1,000", type: "Hotel & Conference" },
      { name: "Malmö Live", city: "Malmö", capacity: "1,500", type: "Conference" },
      { name: "Berns", city: "Stockholm", capacity: "450", type: "Event & Dinner" },
      { name: "Hilton Stockholm Slussen", city: "Stockholm", capacity: "700", type: "Hotel" },
      { name: "Elite Hotel Marina Tower", city: "Stockholm", capacity: "500", type: "Hotel & Conference" },
      { name: "Scandic Continental", city: "Stockholm", capacity: "600", type: "Hotel & Conference" },
      { name: "Uppsala Konsert & Kongress", city: "Uppsala", capacity: "1,200", type: "Conference" },
    ],
  },
  {
    slug: "ireland", code: "ie", name: "Ireland", nameSv: "Irland", venues: "180+",
    topVenues: [
      { name: "Convention Centre Dublin", city: "Dublin", capacity: "8,000", type: "Conference" },
      { name: "Croke Park", city: "Dublin", capacity: "2,000", type: "Event" },
      { name: "The Shelbourne", city: "Dublin", capacity: "500", type: "Hotel" },
      { name: "Powerscourt Hotel", city: "Wicklow", capacity: "800", type: "Resort" },
      { name: "Citywest Hotel", city: "Dublin", capacity: "1,500", type: "Conference" },
      { name: "Killarney Convention Centre", city: "Kerry", capacity: "2,000", type: "Conference" },
      { name: "The K Club", city: "Kildare", capacity: "600", type: "Resort & Event" },
      { name: "Adare Manor", city: "Limerick", capacity: "400", type: "Hotel" },
      { name: "Cork International Hotel", city: "Cork", capacity: "700", type: "Conference" },
      { name: "Galway Bay Hotel", city: "Galway", capacity: "500", type: "Hotel & Event" },
    ],
  },
  {
    slug: "uk", code: "gb", name: "United Kingdom", nameSv: "Storbritannien", venues: "1,200+",
    topVenues: [
      { name: "ExCeL London", city: "London", capacity: "10,000", type: "Conference" },
      { name: "The O2", city: "London", capacity: "5,000", type: "Event" },
      { name: "Manchester Central", city: "Manchester", capacity: "3,000", type: "Conference" },
      { name: "The Savoy", city: "London", capacity: "800", type: "Hotel" },
      { name: "ICC Birmingham", city: "Birmingham", capacity: "3,000", type: "Conference" },
      { name: "EICC Edinburgh", city: "Edinburgh", capacity: "2,000", type: "Conference" },
      { name: "The Shard", city: "London", capacity: "400", type: "Event & Dinner" },
      { name: "Claridge's", city: "London", capacity: "500", type: "Hotel" },
      { name: "SEC Glasgow", city: "Glasgow", capacity: "3,000", type: "Conference" },
      { name: "Natural History Museum", city: "London", capacity: "1,200", type: "Unique Venue" },
      { name: "Battersea Power Station", city: "London", capacity: "2,000", type: "Event" },
      { name: "One Great George Street", city: "London", capacity: "600", type: "Conference" },
    ],
  },
  {
    slug: "iceland", code: "is", name: "Iceland", nameSv: "Island", venues: "45+",
    topVenues: [
      { name: "Harpa Concert Hall", city: "Reykjavik", capacity: "1,800", type: "Conference" },
      { name: "Hilton Reykjavik Nordica", city: "Reykjavik", capacity: "500", type: "Hotel" },
      { name: "Grand Hotel Reykjavik", city: "Reykjavik", capacity: "400", type: "Hotel & Conference" },
      { name: "Silfurberg Conference Centre", city: "Reykjavik", capacity: "600", type: "Conference" },
      { name: "Blue Lagoon Retreat", city: "Grindavík", capacity: "200", type: "Unique Venue" },
      { name: "Fosshótel Glacier Lagoon", city: "Vatnajökull", capacity: "150", type: "Event" },
      { name: "Ion Adventure Hotel", city: "Selfoss", capacity: "120", type: "Event" },
      { name: "Canopy by Hilton", city: "Reykjavik", capacity: "300", type: "Hotel" },
      { name: "The Retreat at Blue Lagoon", city: "Grindavík", capacity: "100", type: "Unique Venue" },
      { name: "Perlan", city: "Reykjavik", capacity: "500", type: "Event & Museum" },
    ],
  },
  {
    slug: "germany", code: "de", name: "Germany", nameSv: "Tyskland", venues: "890+",
    topVenues: [
      { name: "Messe Berlin", city: "Berlin", capacity: "10,000", type: "Conference" },
      { name: "ICM München", city: "Munich", capacity: "6,000", type: "Conference" },
      { name: "Elbphilharmonie", city: "Hamburg", capacity: "2,100", type: "Unique Venue" },
      { name: "Hotel Adlon Kempinski", city: "Berlin", capacity: "1,000", type: "Hotel" },
      { name: "Congress Center Hamburg", city: "Hamburg", capacity: "3,500", type: "Conference" },
      { name: "Koelnmesse", city: "Cologne", capacity: "5,000", type: "Conference" },
      { name: "Bayerischer Hof", city: "Munich", capacity: "800", type: "Hotel" },
      { name: "Estrel Berlin", city: "Berlin", capacity: "4,000", type: "Hotel & Conference" },
      { name: "Alte Oper", city: "Frankfurt", capacity: "2,500", type: "Event" },
      { name: "The Westin Grand Berlin", city: "Berlin", capacity: "600", type: "Hotel" },
      { name: "Rheinterrasse", city: "Düsseldorf", capacity: "1,500", type: "Event" },
      { name: "Hauptstadtrepräsentanz", city: "Berlin", capacity: "700", type: "Event" },
    ],
  },
  {
    slug: "france", code: "fr", name: "France", nameSv: "Frankrike", venues: "760+",
    topVenues: [
      { name: "Palais des Congrès", city: "Paris", capacity: "3,700", type: "Conference" },
      { name: "Le Grand Palais", city: "Paris", capacity: "5,000", type: "Event" },
      { name: "The Ritz Paris", city: "Paris", capacity: "600", type: "Hotel" },
      { name: "Château de Versailles", city: "Versailles", capacity: "2,000", type: "Unique Venue" },
      { name: "Palais Brongniart", city: "Paris", capacity: "1,200", type: "Event" },
      { name: "Centre de Congrès Lyon", city: "Lyon", capacity: "3,000", type: "Conference" },
      { name: "Hôtel Plaza Athénée", city: "Paris", capacity: "500", type: "Hotel" },
      { name: "Nice Acropolis", city: "Nice", capacity: "2,500", type: "Conference" },
      { name: "Carreau du Temple", city: "Paris", capacity: "800", type: "Event" },
      { name: "InterContinental Marseille", city: "Marseille", capacity: "600", type: "Hotel" },
    ],
  },
  {
    slug: "spain", code: "es", name: "Spain", nameSv: "Spanien", venues: "540+",
    topVenues: [
      { name: "IFEMA Madrid", city: "Madrid", capacity: "8,000", type: "Conference" },
      { name: "Fira Barcelona", city: "Barcelona", capacity: "6,000", type: "Conference" },
      { name: "W Barcelona", city: "Barcelona", capacity: "1,000", type: "Hotel" },
      { name: "Hotel Ritz Madrid", city: "Madrid", capacity: "600", type: "Hotel" },
      { name: "Palau de Congressos", city: "Barcelona", capacity: "3,000", type: "Conference" },
      { name: "Real Alcázar", city: "Seville", capacity: "500", type: "Unique Venue" },
      { name: "Kursaal Congress Centre", city: "San Sebastián", capacity: "1,800", type: "Conference" },
      { name: "Hotel Arts Barcelona", city: "Barcelona", capacity: "800", type: "Hotel" },
      { name: "Palacio de Cibeles", city: "Madrid", capacity: "700", type: "Event" },
      { name: "Parador de Granada", city: "Granada", capacity: "300", type: "Unique Venue" },
    ],
  },
  {
    slug: "italy", code: "it", name: "Italy", nameSv: "Italien", venues: "680+",
    topVenues: [
      { name: "MiCo Milano", city: "Milan", capacity: "8,000", type: "Conference" },
      { name: "Palazzo dei Congressi", city: "Rome", capacity: "3,000", type: "Conference" },
      { name: "Hotel Danieli", city: "Venice", capacity: "400", type: "Hotel" },
      { name: "Villa d'Este", city: "Como", capacity: "500", type: "Resort" },
      { name: "Fiera di Bologna", city: "Bologna", capacity: "5,000", type: "Conference" },
      { name: "The St. Regis Rome", city: "Rome", capacity: "600", type: "Hotel" },
      { name: "Palazzo Brancaccio", city: "Rome", capacity: "1,000", type: "Event" },
      { name: "Belmond Hotel Cipriani", city: "Venice", capacity: "300", type: "Hotel" },
      { name: "Firenze Fiera", city: "Florence", capacity: "2,000", type: "Conference" },
      { name: "Teatro alla Scala", city: "Milan", capacity: "2,000", type: "Unique Venue" },
    ],
  },
  {
    slug: "norway", code: "no", name: "Norway", nameSv: "Norge", venues: "210+",
    topVenues: [
      { name: "Oslo Spektrum", city: "Oslo", capacity: "2,000", type: "Event" },
      { name: "The Thief", city: "Oslo", capacity: "400", type: "Hotel" },
      { name: "Grieghallen", city: "Bergen", capacity: "1,500", type: "Conference" },
      { name: "Radisson Blu Plaza", city: "Oslo", capacity: "800", type: "Hotel & Conference" },
      { name: "Clarion Hotel The Hub", city: "Oslo", capacity: "1,000", type: "Hotel & Conference" },
      { name: "Stavanger Forum", city: "Stavanger", capacity: "1,200", type: "Conference" },
      { name: "Britannia Hotel", city: "Trondheim", capacity: "500", type: "Hotel" },
      { name: "Sommarøy Arctic Hotel", city: "Tromsø", capacity: "200", type: "Unique Venue" },
      { name: "Bergen Congress Centre", city: "Bergen", capacity: "1,000", type: "Conference" },
      { name: "Holmenkollen Park Hotel", city: "Oslo", capacity: "600", type: "Hotel & Event" },
    ],
  },
  {
    slug: "denmark", code: "dk", name: "Denmark", nameSv: "Danmark", venues: "280+",
    topVenues: [
      { name: "Bella Center", city: "Copenhagen", capacity: "5,000", type: "Conference" },
      { name: "Tivoli Hotel & Congress Center", city: "Copenhagen", capacity: "2,000", type: "Hotel & Conference" },
      { name: "Hotel d'Angleterre", city: "Copenhagen", capacity: "500", type: "Hotel" },
      { name: "Copenhagen Marriott", city: "Copenhagen", capacity: "800", type: "Hotel" },
      { name: "Aarhus Congress Centre", city: "Aarhus", capacity: "1,500", type: "Conference" },
      { name: "Odeon Odense", city: "Odense", capacity: "1,200", type: "Conference" },
      { name: "Nimb Hotel", city: "Copenhagen", capacity: "300", type: "Hotel" },
      { name: "Scandic Falkoner", city: "Copenhagen", capacity: "1,000", type: "Conference" },
      { name: "Aalborg Congress & Culture Centre", city: "Aalborg", capacity: "1,000", type: "Conference" },
      { name: "Den Gamle By", city: "Aarhus", capacity: "400", type: "Unique Venue" },
    ],
  },
  {
    slug: "finland", code: "fi", name: "Finland", nameSv: "Finland", venues: "190+",
    topVenues: [
      { name: "Helsinki Expo and Convention Centre", city: "Helsinki", capacity: "3,000", type: "Conference" },
      { name: "Finlandia Hall", city: "Helsinki", capacity: "1,700", type: "Conference" },
      { name: "Hotel Kämp", city: "Helsinki", capacity: "500", type: "Hotel" },
      { name: "Tampere Exhibition and Sports Centre", city: "Tampere", capacity: "2,000", type: "Conference" },
      { name: "Lapland Hotels Snow Village", city: "Kittilä", capacity: "150", type: "Unique Venue" },
      { name: "Clarion Hotel Helsinki", city: "Helsinki", capacity: "800", type: "Hotel & Conference" },
      { name: "Arctic TreeHouse Hotel", city: "Rovaniemi", capacity: "100", type: "Unique Venue" },
      { name: "Turku Castle", city: "Turku", capacity: "600", type: "Unique Venue" },
      { name: "Scandic Park Helsinki", city: "Helsinki", capacity: "600", type: "Hotel & Conference" },
      { name: "Naantali Spa Hotel", city: "Naantali", capacity: "400", type: "Resort" },
    ],
  },
  {
    slug: "netherlands", code: "nl", name: "Netherlands", nameSv: "Nederländerna", venues: "340+",
    topVenues: [
      { name: "RAI Amsterdam", city: "Amsterdam", capacity: "7,000", type: "Conference" },
      { name: "Beurs van Berlage", city: "Amsterdam", capacity: "1,500", type: "Event" },
      { name: "Hotel Okura", city: "Amsterdam", capacity: "800", type: "Hotel" },
      { name: "Ahoy Rotterdam", city: "Rotterdam", capacity: "4,000", type: "Event" },
      { name: "Rijksmuseum", city: "Amsterdam", capacity: "600", type: "Unique Venue" },
      { name: "World Forum", city: "The Hague", capacity: "2,000", type: "Conference" },
      { name: "NH Grand Hotel Krasnapolsky", city: "Amsterdam", capacity: "700", type: "Hotel" },
      { name: "De Hallen", city: "Amsterdam", capacity: "1,000", type: "Event" },
      { name: "Van Nelle Fabriek", city: "Rotterdam", capacity: "1,500", type: "Unique Venue" },
      { name: "Jaarbeurs Utrecht", city: "Utrecht", capacity: "3,000", type: "Conference" },
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
