// Middle East — 9 countries
import type { Country } from './types';

export const MIDDLE_EAST: Country[] = [
  {
    slug: "bahrain", code: "bh", name: "Bahrain", nameSv: "Bahrain", venues: "100+",
    topVenues: [
      { name: "Bahrain International Exhibition & Convention Centre", city: "Manama", capacity: "10 000+", type: "Convention center" },
      { name: "Gulf Hotel Convention Centre", city: "Manama", capacity: "2 000", type: "Hotel & Conference" },
      { name: "The Ritz-Carlton Bahrain Conference Centre", city: "Manama", capacity: "1 500", type: "Hotel & Conference" },
      { name: "ART Rotana Conference Centre", city: "Amwaj Islands", capacity: "1 200", type: "Hotel & Conference" },
      { name: "Crowne Plaza Bahrain Conference Centre", city: "Manama", capacity: "800", type: "Hotel & Conference" },
    ],
  },
  {
    slug: "israel", code: "il", name: "Israel", nameSv: "Israel", venues: "200+",
    topVenues: [
      { name: "Tel Aviv Convention Center – Expo Tel Aviv", city: "Tel Aviv", capacity: "20 000+", type: "Convention center" },
      { name: "Jerusalem International Convention Center (ICC)", city: "Jerusalem", capacity: "10 000", type: "Convention center" },
      { name: "David InterContinental Conference Centre", city: "Tel Aviv", capacity: "2 500", type: "Hotel & Conference" },
      { name: "Hilton Tel Aviv Conference Centre", city: "Tel Aviv", capacity: "2 000", type: "Hotel & Conference" },
      { name: "Haifa Convention Center", city: "Haifa", capacity: "3 000", type: "Convention center" },
    ],
  },
  {
    slug: "jordan", code: "jo", name: "Jordan", nameSv: "Jordanien", venues: "100+",
    topVenues: [
      { name: "King Hussein Bin Talal Convention Centre", city: "Dead Sea", capacity: "5 000", type: "Convention center" },
      { name: "Amman International Conference Centre", city: "Amman", capacity: "3 000", type: "Convention center" },
      { name: "Le Royal Amman Conference Centre", city: "Amman", capacity: "2 000", type: "Hotel & Conference" },
      { name: "Kempinski Hotel Amman Conference Centre", city: "Amman", capacity: "1 500", type: "Hotel & Conference" },
      { name: "InterContinental Jordan Conference Centre", city: "Amman", capacity: "1 000", type: "Hotel & Conference" },
    ],
  },
  {
    slug: "kuwait", code: "kw", name: "Kuwait", nameSv: "Kuwait", venues: "100+",
    topVenues: [
      { name: "Kuwait International Fair Ground", city: "Mishref", capacity: "20 000+", type: "Exhibition center" },
      { name: "Arraya Ballroom Convention Centre", city: "Kuwait City", capacity: "3 000", type: "Convention center" },
      { name: "Jumeirah Messilah Beach Conference Centre", city: "Kuwait City", capacity: "2 000", type: "Hotel & Conference" },
      { name: "Four Seasons Kuwait Conference Centre", city: "Kuwait City", capacity: "1 500", type: "Hotel & Conference" },
      { name: "Hilton Kuwait Resort Conference Centre", city: "Mangaf", capacity: "1 000", type: "Hotel & Conference" },
    ],
  },
  {
    slug: "lebanon", code: "lb", name: "Lebanon", nameSv: "Libanon", venues: "100+",
    topVenues: [
      { name: "Forum de Beyrouth", city: "Beirut", capacity: "5 000", type: "Convention center" },
      { name: "BIEL – Beirut International Exhibition Centre", city: "Beirut", capacity: "20 000+", type: "Exhibition center" },
      { name: "Hilton Beirut Conference Centre", city: "Beirut", capacity: "1 500", type: "Hotel & Conference" },
      { name: "Phoenicia Hotel Conference Centre", city: "Beirut", capacity: "1 200", type: "Hotel & Conference" },
      { name: "Le Royal Hotels & Resorts Conference", city: "Dbayeh", capacity: "2 000", type: "Hotel & Conference" },
    ],
  },
  {
    slug: "oman", code: "om", name: "Oman", nameSv: "Oman", venues: "100+",
    topVenues: [
      { name: "Oman Convention & Exhibition Centre", city: "Muscat", capacity: "20 000+", type: "Convention center" },
      { name: "Al Bustan Palace Ritz-Carlton Conference", city: "Muscat", capacity: "2 500", type: "Hotel & Conference" },
      { name: "JW Marriott Muscat Conference Centre", city: "Muscat", capacity: "1 500", type: "Hotel & Conference" },
      { name: "Grand Hyatt Muscat Conference Centre", city: "Muscat", capacity: "1 200", type: "Hotel & Conference" },
      { name: "Kempinski Hotel Muscat Conference Centre", city: "Muscat", capacity: "1 000", type: "Hotel & Conference" },
    ],
  },
  {
    slug: "qatar", code: "qa", name: "Qatar", nameSv: "Qatar", venues: "200+",
    topVenues: [
      { name: "Qatar National Convention Centre", city: "Doha", capacity: "40 000+", type: "Convention center" },
      { name: "Doha Exhibition and Convention Center", city: "Doha", capacity: "30 000+", type: "Exhibition center" },
      { name: "Sheraton Grand Doha Conference Centre", city: "Doha", capacity: "2 000", type: "Hotel & Conference" },
      { name: "St. Regis Doha Conference Centre", city: "Doha", capacity: "1 500", type: "Hotel & Conference" },
      { name: "Marriott Marquis City Center Doha Conference", city: "Doha", capacity: "2 500", type: "Hotel & Conference" },
    ],
  },
  {
    slug: "saudi-arabia", code: "sa", name: "Saudi Arabia", nameSv: "Saudiarabien", venues: "200+",
    topVenues: [
      { name: "Riyadh International Convention & Exhibition Center", city: "Riyadh", capacity: "50 000+", type: "Convention center" },
      { name: "Jeddah Centre for Forums & Events", city: "Jeddah", capacity: "10 000", type: "Convention center" },
      { name: "KAFD Conference Centre", city: "Riyadh", capacity: "5 000", type: "Convention center" },
      { name: "Dhahran Expo", city: "Dhahran", capacity: "15 000+", type: "Exhibition center" },
      { name: "Four Seasons Riyadh Conference Centre", city: "Riyadh", capacity: "2 000", type: "Hotel & Conference" },
    ],
  },
  {
    slug: "turkey", code: "tr", name: "Turkey", nameSv: "Turkiet", venues: "200+",
    topVenues: [
      { name: "Istanbul Congress Center (ICC)", city: "Istanbul", capacity: "10 000", type: "Convention center" },
      { name: "Istanbul Expo Center (IFM)", city: "Istanbul", capacity: "60 000+", type: "Exhibition center" },
      { name: "Antalya Expo Center", city: "Antalya", capacity: "15 000+", type: "Exhibition center" },
      { name: "ATO Congresium", city: "Ankara", capacity: "4 000", type: "Convention center" },
      { name: "Hilton Istanbul Bomonti Conference Centre", city: "Istanbul", capacity: "3 000", type: "Hotel & Conference" },
    ],
  },
];
