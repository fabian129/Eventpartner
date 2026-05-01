// Country data — 29 countries with real venue data from Pontus
// Auto-generated from .docx files on 2026-05-01
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
    slug: "belgium", code: "be", name: "Belgium", nameSv: "Belgien", venues: "75+",
    topVenues: [
      { name: "SQUARE Brussels Meeting Centre", city: "Brussels", capacity: "2 200", type: "Conference center" },
      { name: "Flanders Expo", city: "Ghent", capacity: "19 000+", type: "Event Venue" },
      { name: "Brussels Expo", city: "Brussels", capacity: "15 000", type: "Convention center" },
      { name: "Skyhall", city: "Brussels/Zaventem", capacity: "1 200–2 000", type: "Event venue" },
      { name: "The EGG Brussel", city: "Brussels", capacity: "5 000", type: "Conference center" },
    ],
  },
  {
    slug: "bosnia-herzegovina", code: "ba", name: "Bosnia and Herzegovina", nameSv: "Bosnien och Hercegovina", venues: "75+",
    topVenues: [
      { name: "Sarajevo Fair & Congress Center (Skenderija)", city: "Sarajevo", capacity: "10 000+", type: "Event Venue" },
      { name: "Hills Hotel Sarajevo Congress Centre", city: "Sarajevo", capacity: "3 500", type: "Event Venue" },
      { name: "Hotel Europe Congress Centre", city: "Sarajevo", capacity: "1 500", type: "Event Venue" },
      { name: "Mostar Fair (Mostarski Sajam)", city: "Mostar", capacity: "5 000+", type: "Event Venue" },
      { name: "Swissôtel Sarajevo Conference Centre", city: "Sarajevo", capacity: "1 000", type: "Event Venue" },
    ],
  },
  {
    slug: "croatia", code: "hr", name: "Croatia", nameSv: "Kroatien", venues: "75+",
    topVenues: [
      { name: "Zagreb Fair Congress Center", city: "Zagreb", capacity: "20 000+", type: "Event Venue" },
      { name: "Dubrovnik Valamar Lacroma Conference Centre", city: "Dubrovnik", capacity: "1 200", type: "Event Venue" },
      { name: "Spaladium Arena & Conference Centre", city: "Split", capacity: "12 000", type: "Event Venue" },
      { name: "Amadria Park Convention Centre Šibenik", city: "Šibenik", capacity: "4 000", type: "Event Venue" },
      { name: "Westin Zagreb Conference Center", city: "Zagreb", capacity: "1 500", type: "Event Venue" },
    ],
  },
  {
    slug: "czech-republic", code: "cz", name: "Czech Republic", nameSv: "Tjeckien", venues: "75+",
    topVenues: [
      { name: "O2 universum Prague", city: "Prague", capacity: "10 000", type: "Event Venue" },
      { name: "PVA EXPO PRAHA", city: "Prague", capacity: "5 000", type: "Event Venue" },
      { name: "Prague Congress Centre (PCC)", city: "Prague", capacity: "9 300", type: "Event Venue" },
      { name: "Clarion Congress Hotel Prague", city: "Prague", capacity: "3 000", type: "Event Venue" },
      { name: "Brno Exhibition Centre", city: "Brno", capacity: "4 000", type: "Event Venue" },
    ],
  },
  {
    slug: "estonia", code: "ee", name: "Estonia", nameSv: "Estland", venues: "75+",
    topVenues: [
      { name: "Tallinn Creative Hub (Kultuurikatel)", city: "Tallinn", capacity: "6 000", type: "Event Venue" },
      { name: "Eesti Näituste Fair Centre", city: "Tallinn", capacity: "10 000+", type: "Event Venue" },
      { name: "Hilton Tallinn Park Conference Centre", city: "Tallinn", capacity: "1 800", type: "Event Venue" },
      { name: "Swissôtel Tallinn Conference Centre", city: "Tallinn", capacity: "1 000", type: "Event Venue" },
      { name: "Tartu National Museum Conference Centre", city: "Tartu", capacity: "1 500", type: "Event Venue" },
    ],
  },
  {
    slug: "france", code: "fr", name: "France", nameSv: "Frankrike", venues: "75+",
    topVenues: [
      { name: "Paris Expo Porte de Versailles", city: "Paris", capacity: "200 000+", type: "Event Venue" },
      { name: "Palais des Congrès de Paris", city: "Paris", capacity: "3 700", type: "Event Venue" },
      { name: "Cannes Palais des Festivals et des Congrès", city: "Cannes", capacity: "35 000", type: "Event Venue" },
      { name: "Lyon Convention Centre (Cité Internationale)", city: "Lyon", capacity: "19 000", type: "Event Venue" },
      { name: "Marseille Chanot Exhibition and Convention Centre", city: "Marseille", capacity: "30 000+", type: "Event Venue" },
    ],
  },
  {
    slug: "greece", code: "gr", name: "Greece", nameSv: "Grekland", venues: "75+",
    topVenues: [
      { name: "Metropolitan Expo Athens", city: "Athens", capacity: "50 000+", type: "Event Venue" },
      { name: "Megaron Athens International Conference Centre", city: "Athens", capacity: "6 000", type: "Event Venue" },
      { name: "Thessaloniki International Exhibition & Congress Center (TIF-HELEXPO)", city: "Thessaloniki", capacity: "20 000+", type: "Event Venue" },
      { name: "Stavros Niarchos Foundation Cultural Center (SNFCC)", city: "Athens", capacity: "5 000", type: "Event Venue" },
      { name: "Creta Maris Convention Center", city: "Kreta", capacity: "5 500", type: "Event Venue" },
    ],
  },
  {
    slug: "hungary", code: "hu", name: "Hungary", nameSv: "Ungern", venues: "75+",
    topVenues: [
      { name: "Hungexpo Budapest Congress and Exhibition Center", city: "Budapest", capacity: "36 000+", type: "Event Venue" },
      { name: "Budapest Congress Center", city: "Budapest", capacity: "3 000", type: "Event Venue" },
      { name: "Bálna Budapest", city: "Budapest", capacity: "3 000+", type: "Event Venue" },
      { name: "Groupama Arena Conference & Event Center", city: "Budapest", capacity: "5 000", type: "Event Venue" },
      { name: "Corinthia Budapest Conference Center", city: "Budapest", capacity: "2 200", type: "Event Venue" },
    ],
  },
  {
    slug: "iceland", code: "is", name: "Iceland", nameSv: "Island", venues: "75+",
    topVenues: [
      { name: "Harpa Concert Hall & Conference Centre", city: "Reykjavik", capacity: "3 500+", type: "Event Venue" },
      { name: "Hilton Reykjavik Nordica Conference Centre", city: "Reykjavik", capacity: "2 000", type: "Event Venue" },
      { name: "Laugardalshöll Arena & Conference Centre", city: "Reykjavik", capacity: "5 500", type: "Event Venue" },
      { name: "Reykjavík Natura Conference Centre", city: "Reykjavik", capacity: "1 000", type: "Event Venue" },
      { name: "Hof Cultural and Conference Centre", city: "Akureyri", capacity: "1 500", type: "Event Venue" },
    ],
  },
  {
    slug: "ireland", code: "ie", name: "Ireland", nameSv: "Irland", venues: "75+",
    topVenues: [
      { name: "Convention Centre Dublin", city: "Dublin", capacity: "8 000", type: "Event Venue" },
      { name: "RDS Dublin (Royal Dublin Society)", city: "Dublin", capacity: "15 000+", type: "Event Venue" },
      { name: "Croke Park Conference Centre", city: "Dublin", capacity: "2 000", type: "Event Venue" },
      { name: "Killarney Convention Centre", city: "Killarney", capacity: "2 500", type: "Event Venue" },
      { name: "INEC Killarney", city: "Killarney", capacity: "4 000", type: "Event Venue" },
    ],
  },
  {
    slug: "italy", code: "it", name: "Italy", nameSv: "Italien", venues: "75+",
    topVenues: [
      { name: "Fiera Milano", city: "Milano", capacity: "100 000+", type: "Event Venue" },
      { name: "Rome Convention Center La Nuvola", city: "Rome", capacity: "8 000", type: "Event Venue" },
      { name: "BolognaFiere", city: "Bologna", capacity: "50 000+", type: "Event Venue" },
      { name: "Rimini Palacongressi", city: "Rimini", capacity: "9 000", type: "Event Venue" },
      { name: "Fortezza da Basso", city: "Florence", capacity: "20 000", type: "Event Venue" },
    ],
  },
  {
    slug: "latvia", code: "lv", name: "Latvia", nameSv: "Lettland", venues: "75+",
    topVenues: [
      { name: "Kipsala International Exhibition Centre", city: "Riga", capacity: "15 000+", type: "Event Venue" },
      { name: "ATTA Centre Riga", city: "Riga", capacity: "5 500", type: "Event Venue" },
      { name: "Radisson Blu Latvija Conference Centre", city: "Riga", capacity: "2 500", type: "Event Venue" },
      { name: "Hanzas Perons", city: "Riga", capacity: "2 000", type: "Event Venue" },
      { name: "Jurmala Conference Centre", city: "Jūrmala", capacity: "1 000", type: "Event Venue" },
    ],
  },
  {
    slug: "lithuania", code: "lt", name: "Lithuania", nameSv: "Litauen", venues: "75+",
    topVenues: [
      { name: "Litexpo – Lithuanian Exhibition and Congress Centre", city: "Vilnius", capacity: "15 000+", type: "Event Venue" },
      { name: "LITEXPO Congress Centre", city: "Vilnius", capacity: "5 000", type: "Event Venue" },
      { name: "Radisson Blu Hotel Lietuva Conference Centre", city: "Vilnius", capacity: "1 200", type: "Event Venue" },
      { name: "Žalgiris Arena Conference Centre", city: "Kaunas", capacity: "15 000", type: "Event Venue" },
      { name: "Vilnius Grand Resort Conference Centre", city: "Vilnius", capacity: "1 000", type: "Event Venue" },
    ],
  },
  {
    slug: "luxembourg", code: "lu", name: "Luxembourg", nameSv: "Luxemburg", venues: "75+",
    topVenues: [
      { name: "Luxexpo The Box", city: "Luxemburg City", capacity: "20 000+", type: "Event Venue" },
      { name: "European Convention Center Luxembourg (ECCL)", city: "Luxemburg City", capacity: "2 500", type: "Event Venue" },
      { name: "Neumünster Abbey Conference Centre", city: "Luxemburg City", capacity: "1 000", type: "Event Venue" },
      { name: "Cercle Cité Conference Centre", city: "Luxemburg City", capacity: "1 500", type: "Event Venue" },
      { name: "Luxembourg Chamber of Commerce Conference Center", city: "Luxemburg City", capacity: "800", type: "Event Venue" },
    ],
  },
  {
    slug: "malta", code: "mt", name: "Malta", nameSv: "Malta", venues: "75+",
    topVenues: [
      { name: "Malta Fairs & Conventions Centre (MFCC)", city: "Ta’ Qali", capacity: "10 000+", type: "Event Venue" },
      { name: "Mediterranean Conference Centre", city: "Valletta", capacity: "1 400", type: "Event Venue" },
      { name: "InterContinental Malta Conference Centre", city: "St. Julian’s", capacity: "1 700", type: "Event Venue" },
      { name: "Hilton Malta Conference Centre", city: "St. Julian’s", capacity: "1 500", type: "Event Venue" },
      { name: "Radisson Blu Golden Sands Conference Centre", city: "Mellieħa", capacity: "1 000", type: "Event Venue" },
    ],
  },
  {
    slug: "montenegro", code: "me", name: "Montenegro", nameSv: "Montenegro", venues: "75+",
    topVenues: [
      { name: "Porto Montenegro Conference & Event Centre", city: "Tivat", capacity: "3 000+", type: "Event Venue" },
      { name: "Hilton Podgorica Conference Centre", city: "Podgorica", capacity: "1 500", type: "Event Venue" },
      { name: "Splendid Conference & Spa Resort", city: "Budva", capacity: "2 000", type: "Event Venue" },
      { name: "Hotel Mediteran Conference Centre", city: "Bečići", capacity: "1 000+", type: "Event Venue" },
      { name: "Regent Porto Montenegro Conference Venue", city: "Tivat", capacity: "800", type: "Event Venue" },
    ],
  },
  {
    slug: "netherlands", code: "nl", name: "Netherlands", nameSv: "Nederländerna", venues: "75+",
    topVenues: [
      { name: "RAI Amsterdam", city: "Amsterdam", capacity: "50 000+", type: "Event Venue" },
      { name: "Jaarbeurs Utrecht", city: "Utrecht", capacity: "30 000+", type: "Event Venue" },
      { name: "Rotterdam Ahoy", city: "Rotterdam", capacity: "20 000+", type: "Event Venue" },
      { name: "World Forum The Hague", city: "Haag", capacity: "5 000", type: "Event Venue" },
      { name: "MECC Maastricht", city: "Maastricht", capacity: "10 000+", type: "Event Venue" },
    ],
  },
  {
    slug: "north-macedonia", code: "mk", name: "North Macedonia", nameSv: "Nordmakedonien", venues: "75+",
    topVenues: [
      { name: "Boris Trajkovski Sports Center & Congress Hall", city: "Skopje", capacity: "10 000+", type: "Event Venue" },
      { name: "Aleksandar Palace Congress Center", city: "Skopje", capacity: "1 500", type: "Event Venue" },
      { name: "Skopje Fair / Skopje Event Center", city: "Skopje", capacity: "5 000+", type: "Event Venue" },
      { name: "DoubleTree by Hilton Skopje Conference Centre", city: "Skopje", capacity: "1 000", type: "Event Venue" },
      { name: "Ohrid Congress & Event Centre", city: "Ohrid", capacity: "1 200", type: "Event Venue" },
    ],
  },
  {
    slug: "norway", code: "no", name: "Norway", nameSv: "Norge", venues: "75+",
    topVenues: [
      { name: "Oslofjord Convention Center", city: "Melsomvik", capacity: "9 000+", type: "Event Venue" },
      { name: "NOVA Spektrum", city: "Lillestrøm", capacity: "20 000+", type: "Event Venue" },
      { name: "The Qube Conference Centre", city: "Gardermoen/Oslo Airport", capacity: "8 000", type: "Event Venue" },
      { name: "Grieghallen Conference Centre", city: "Bergen", capacity: "3 500", type: "Event Venue" },
      { name: "Trondheim Spektrum", city: "Trondheim", capacity: "8 500", type: "Event Venue" },
    ],
  },
  {
    slug: "poland", code: "pl", name: "Poland", nameSv: "Polen", venues: "75+",
    topVenues: [
      { name: "Katowice International Conference Centre", city: "Katowice", capacity: "15 000", type: "Event Venue" },
      { name: "Expo (EXPO Kraków)", city: "Kraków", capacity: "5 000–7 000", type: "Convention center" },
      { name: "Poznań International Fair", city: "Poznań", capacity: "mycket stor — över 150 000 m² eventyta", type: "Exhibition and trade center" },
      { name: "WARSAW EXPO XXI", city: "Warsaw", capacity: "10 000+ beroende på setup", type: "Conference center" },
      { name: "ICE Kraków Congress Centre", city: "Kraków", capacity: "3 200–4 000", type: "Convention center" },
    ],
  },
  {
    slug: "portugal", code: "pt", name: "Portugal", nameSv: "Portugal", venues: "75+",
    topVenues: [
      { name: "FIL – Feira Internacional de Lisboa", city: "Lisbon", capacity: "20 000+", type: "Event Venue" },
      { name: "Lisbon Congress Centre (CCL)", city: "Lisbon", capacity: "8 000", type: "Event Venue" },
      { name: "Altice Forum Braga", city: "Braga", capacity: "12 000", type: "Event Venue" },
      { name: "Super Bock Arena & Congress Centre", city: "Porto", capacity: "8 000", type: "Event Venue" },
      { name: "Centro de Congressos do Estoril", city: "Estoril", capacity: "1 500", type: "Event Venue" },
    ],
  },
  {
    slug: "romania", code: "ro", name: "Romania", nameSv: "Rumänien", venues: "75+",
    topVenues: [
      { name: "Romexpo Exhibition & Convention Center", city: "Bucharest", capacity: "40 000+", type: "Event Venue" },
      { name: "Palace of the Parliament Conference Center", city: "Bucharest", capacity: "5 000+", type: "Event Venue" },
      { name: "BT Arena Conference & Event Centre", city: "Cluj-Napoca", capacity: "10 000", type: "Event Venue" },
      { name: "Radisson Blu Bucharest Conference Centre", city: "Bucharest", capacity: "1 800", type: "Event Venue" },
      { name: "Iulius Congress Hall", city: "Timișoara", capacity: "2 000", type: "Event Venue" },
    ],
  },
  {
    slug: "serbia", code: "rs", name: "Serbia", nameSv: "Serbien", venues: "75+",
    topVenues: [
      { name: "Sava Center", city: "Belgrad", capacity: "7 000+", type: "Event Venue" },
      { name: "Belgrade Fair", city: "Belgrad", capacity: "30 000+", type: "Event Venue" },
      { name: "Crowne Plaza Belgrade Conference Centre", city: "Belgrad", capacity: "4 000", type: "Event Venue" },
      { name: "Kombank Arena / Stark Arena Event Center", city: "Belgrad", capacity: "20 000", type: "Event Venue" },
      { name: "Metropol Palace Conference Centre", city: "Belgrad", capacity: "1 500", type: "Event Venue" },
    ],
  },
  {
    slug: "slovakia", code: "sk", name: "Slovakia", nameSv: "Slovakien", venues: "75+",
    topVenues: [
      { name: "Incheba Expo Bratislava", city: "Bratislava", capacity: "15 000+", type: "Event Venue" },
      { name: "x-bionic sphere", city: "Šamorín", capacity: "10 000", type: "Event Venue" },
      { name: "DoubleTree by Hilton Bratislava Conference Centre", city: "Bratislava", capacity: "2 500", type: "Event Venue" },
      { name: "Bratislava Castle Conference Venue", city: "Bratislava", capacity: "1 000+", type: "Event Venue" },
      { name: "Crowne Plaza Bratislava Conference Center", city: "Bratislava", capacity: "1 200", type: "Event Venue" },
    ],
  },
  {
    slug: "slovenia", code: "si", name: "Slovenia", nameSv: "Slovenien", venues: "75+",
    topVenues: [
      { name: "Ljubljana Exhibition and Convention Centre (GR – Gospodarsko Razstavišče)", city: "Ljubljana", capacity: "12 000+", type: "Event Venue" },
      { name: "Cankarjev dom", city: "Ljubljana", capacity: "2 000+", type: "Event Venue" },
      { name: "Hotel Slovenija Congress Centre", city: "Portorož", capacity: "1 100", type: "Event Venue" },
      { name: "Bled Convention Centre", city: "Bled", capacity: "500–1 000", type: "Event Venue" },
      { name: "Stožice Arena & Event Center", city: "Ljubljana", capacity: "14 000", type: "Event Venue" },
    ],
  },
  {
    slug: "spain", code: "es", name: "Spain", nameSv: "Spanien", venues: "75+",
    topVenues: [
      { name: "IFEMA Madrid", city: "Madrid", capacity: "100 000+", type: "Event Venue" },
      { name: "Fira Barcelona", city: "Barcelona", capacity: "120 000+", type: "Event Venue" },
      { name: "Palacio Municipal IFEMA Madrid", city: "Madrid", capacity: "3 000", type: "Event Venue" },
      { name: "Palacio de Congresos de Valencia", city: "Valencia", capacity: "2 300", type: "Event Venue" },
      { name: "Málaga Trade Fair and Congress Center (FYCMA)", city: "Málaga", capacity: "6 000+", type: "Event Venue" },
    ],
  },
  {
    slug: "sweden", code: "se", name: "Sweden", nameSv: "Sverige", venues: "75+",
    topVenues: [
      { name: "Stockholmsmässan", city: "Stockholm", capacity: "30 000+", type: "Event Venue" },
      { name: "Svenska Mässan Gothia Towers", city: "Gothenburg", capacity: "18 000+", type: "Event Venue" },
      { name: "Stockholm Waterfront Congress Centre", city: "Stockholm", capacity: "3 000", type: "Event Venue" },
      { name: "Malmömässan", city: "Malmö", capacity: "10 000+", type: "Event Venue" },
      { name: "Scandinavian XPO", city: "Stockholm/Arlanda", capacity: "8 000", type: "Event Venue" },
    ],
  },
  {
    slug: "switzerland", code: "ch", name: "Switzerland", nameSv: "Schweiz", venues: "75+",
    topVenues: [
      { name: "Palexpo Geneva", city: "Geneva", capacity: "50 000+", type: "Event Venue" },
      { name: "Messe Zürich", city: "Zurich", capacity: "20 000+", type: "Event Venue" },
      { name: "SwissTech Convention Center", city: "Lausanne", capacity: "3 000", type: "Event Venue" },
      { name: "Congress Center Basel", city: "Basel", capacity: "5 000", type: "Event Venue" },
      { name: "KKL Luzern (Culture and Convention Centre Lucerne)", city: "Luzern", capacity: "2 500", type: "Event Venue" },
    ],
  },
  {
    slug: "uk", code: "gb", name: "United Kingdom", nameSv: "Storbritannien", venues: "75+",
    topVenues: [
      { name: "ExCeL London", city: "London", capacity: "68 000+", type: "Event Venue" },
      { name: "ICC Birmingham", city: "Birmingham", capacity: "10 000", type: "Event Venue" },
      { name: "Manchester Central Convention Complex", city: "Manchester", capacity: "10 000+", type: "Event Venue" },
      { name: "SEC Glasgow (Scottish Event Campus)", city: "Glasgow", capacity: "13 000+", type: "Event Venue" },
      { name: "QEII Centre London", city: "London", capacity: "2 500", type: "Event Venue" },
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
