/**
 * Seed script — populates Sanity with homepage content in EN + SV.
 *
 * Usage: npx tsx sanity/seed.ts
 *
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

const homepage = {
  _type: "homePage",
  _id: "homePage",

  /* ─── HERO ─── */
  heroBadge: {
    en: "36 Countries • 360,000+ Venues",
    sv: "36 länder • 360 000+ venues",
  },
  heroHeadline: {
    en: "The World's Largest Selection",
    sv: "Världens största urval",
  },
  heroHeadlineAccent: {
    en: "of Venues",
    sv: "av venues",
  },
  heroSubheadline: {
    en: "We match your brand with the right venue, the right format, and the right experience — seamlessly from inquiry to delivery.",
    sv: "Vi matchar ert varumärke med rätt venue, rätt format och rätt upplevelse — sömlöst från förfrågan till leverans.",
  },
  heroCta1: {
    en: "Send inquiry →",
    sv: "Skicka förfrågan →",
  },
  heroCta2: {
    en: "See how it works",
    sv: "Se hur det fungerar",
  },

  /* ─── SERVICES ─── */
  servicesLabel: {
    en: "EventPartner — Services",
    sv: "Eventpartner — Tjänster",
  },
  servicesHeadline: {
    en: "Everything you need. One partner.",
    sv: "Allt ni behöver. En partner.",
  },
  servicesDescription: {
    en: "From intimate board dinners to large-scale international conferences — we deliver the complete event experience.",
    sv: "Från intima styrelsemiddagar till storskaliga internationella konferenser — vi levererar hela eventupplevelsen.",
  },
  serviceCards: [
    {
      _key: "conferences",
      title: { en: "Conferences & Meetings", sv: "Konferenser & Möten" },
      desc: {
        en: "Boardrooms, summits, and multi-day conferences. 360,000+ venues across 36 countries.",
        sv: "Styrelsemöten, summits och flerdagarskonferenser. 360 000+ venues i 36 länder.",
      },
      icon: "calendar",
    },
    {
      _key: "venues",
      title: { en: "Venue Sourcing", sv: "Venue Sourcing" },
      desc: {
        en: "360,000+ venues in 36 countries. Always 3 proposals within 24h.",
        sv: "360 000+ venues i 36 länder. Alltid 3 förslag inom 24h.",
      },
      icon: "globe",
    },
    {
      _key: "dinners",
      title: { en: "Dinners & Galas", sv: "Middagar & Galor" },
      desc: {
        en: "Representational dinners at venues that make an impression.",
        sv: "Representationsmiddagar i venues som gör intryck.",
      },
      icon: "sparkles",
    },
    {
      _key: "entertainment",
      title: { en: "Entertainment & Activities", sv: "Underhållning & Aktiviteter" },
      desc: {
        en: "Speakers, team activities, and experiences that elevate your event.",
        sv: "Talare, teamaktiviteter och upplevelser som lyfter ert event.",
      },
      icon: "mic",
    },
  ],

  /* ─── CASE STORIES ─── */
  casesLabel: {
    en: "EventPartner — Case Studies",
    sv: "Eventpartner — Case Studies",
  },
  casesHeadline: {
    en: "Events that deliver.",
    sv: "Events som levererar.",
  },
  casesDescription: {
    en: "From concept to execution — we create events that matter. Here are some of our recent projects.",
    sv: "Från koncept till genomförande — vi skapar events som gör skillnad. Här är några av våra senaste projekt.",
  },

  /* ─── CTA ─── */
  ctaLabel: {
    en: "EventPartner — Next Step",
    sv: "Eventpartner — Nästa steg",
  },
  ctaLabelRight: {
    en: "Free consultation",
    sv: "Kostnadsfri rådgivning",
  },
  ctaHeadline: {
    en: "Create your next event.",
    sv: "Skapa ert nästa event.",
  },
  ctaSubheadline: {
    en: "Tell us what you're looking for — we'll handle the rest.",
    sv: "Berätta vad ni söker — vi sköter resten.",
  },
  ctaCard1Title: {
    en: "Talk to us",
    sv: "Prata med oss",
  },
  ctaCard1Desc: {
    en: "Get answers to your questions.",
    sv: "Få svar på era frågor.",
  },
  ctaCard2Title: {
    en: "Start your event",
    sv: "Starta ert event",
  },
  ctaCard2Headline: {
    en: "Customize your event.",
    sv: "Skräddarsy ert event.",
  },
  ctaCard2Sub: {
    en: "Your way.",
    sv: "Er väg.",
  },

  /* ─── NEWSLETTER ─── */
  newsletterHeadline: {
    en: "Stay updated with EventPartner",
    sv: "Håll dig uppdaterad med EventPartner",
  },
  newsletterDescription: {
    en: "News, inspiration venues, and event tips delivered straight to your inbox.",
    sv: "Nyheter, inspirations-venues och event-tips direkt i din inbox.",
  },
  newsletterPlaceholder: {
    en: "Your email",
    sv: "Din e-post",
  },
  newsletterButton: {
    en: "Subscribe →",
    sv: "Prenumerera →",
  },

  /* ─── ABOUT ─── */
  aboutLabel: {
    en: "EventPartner — About Us",
    sv: "Eventpartner — Om oss",
  },
  aboutQuote: {
    en: "We believe every event is an opportunity to build something lasting. Not just a conference — a catalyst for change.",
    sv: "Vi tror att varje event är en möjlighet att bygga något bestående. Inte bara en konferens — en katalysator för förändring.",
  },
  aboutBody: {
    en: "With 10+ years of experience and 2,000+ delivered events, EventPartner is the Nordic region's leading full-service event partner. We combine an unmatched venue network spanning 36 European countries with dedicated project management that handles everything from sourcing to delivery.",
    sv: "Med 10+ års erfarenhet och 2 000+ levererade event är EventPartner Nordens ledande fullservice-eventpartner. Vi kombinerar ett oöverträffat venue-nätverk som sträcker sig över 36 europeiska länder med dedikerad projektledning som hanterar allt från sourcing till leverans.",
  },
  aboutStats: [
    { _key: "venues", value: "360,000+", label: { en: "Venues worldwide", sv: "Venues världen över" } },
    { _key: "countries", value: "36", label: { en: "European countries", sv: "Europeiska länder" } },
    { _key: "events", value: "2,048+", label: { en: "Events delivered", sv: "Events levererade" } },
    { _key: "experience", value: "10+", label: { en: "Years of experience", sv: "Års erfarenhet" } },
    { _key: "satisfaction", value: "94%", label: { en: "Customer satisfaction", sv: "Nöjda kunder" } },
  ],

  /* ─── FAQ ─── */
  faqHeadline: {
    en: "Have questions?",
    sv: "Har du frågor?",
  },
  faqDescription: {
    en: "Everything you need to know about working with EventPartner — from pricing to delivery time.",
    sv: "Allt du behöver veta om att jobba med EventPartner — från kostnad till leveranstid.",
  },
  faqItems: [
    {
      _key: "cost",
      question: {
        en: "What does it cost to use EventPartner?",
        sv: "Vad kostar det att använda EventPartner?",
      },
      answer: {
        en: "Sending an inquiry and receiving venue proposals is completely free. We charge a service fee only when you book — and it's always transparent and agreed upon in advance. No hidden costs.",
        sv: "Att skicka en förfrågan och få venue-förslag är helt kostnadsfritt. Vi tar en serviceavgift först när ni bokar — och den är alltid transparent och överenskommen i förväg. Inga dolda kostnader.",
      },
    },
    {
      _key: "response",
      question: {
        en: "How quickly will I get a response?",
        sv: "Hur snabbt får jag svar på min förfrågan?",
      },
      answer: {
        en: "We always respond within 24 hours with tailored proposals matching your needs. For urgent matters, we can often deliver faster — contact us directly and we'll prioritize you.",
        sv: "Vi återkommer alltid inom 24 timmar med skräddarsydda förslag som matchar era behov. Vid brådskande ärenden kan vi ofta leverera snabbare — kontakta oss direkt så prioriterar vi er.",
      },
    },
    {
      _key: "countries",
      question: {
        en: "Which countries and cities do you cover?",
        sv: "Vilka länder och städer täcker ni?",
      },
      answer: {
        en: "We have venues in 36 European countries — from Iceland to Cyprus, from Portugal to Finland. Over 360,000 venues in total. Whether you need a conference hotel in Stockholm or a gala venue in Barcelona, we'll find the right one.",
        sv: "Vi har venues i 36 europeiska länder — från Island till Cypern, från Portugal till Finland. Totalt över 360,000 venues. Oavsett om ni behöver ett konferenshotell i Stockholm eller en gala-venue i Barcelona, vi hittar rätt.",
      },
    },
    {
      _key: "large",
      question: {
        en: "Can you handle really large events?",
        sv: "Kan ni hantera riktigt stora evenemang?",
      },
      answer: {
        en: "Absolutely. We handle everything from intimate board meetings with 10 people to large-scale conferences with thousands of attendees. Our project management and supplier network scales to your needs.",
        sv: "Absolut. Vi hanterar allt från intima styrelsemöten med 10 personer till storskaliga konferenser med tusentals deltagare. Vår projektledning och vårt nätverk av leverantörer skalas efter era behov.",
      },
    },
    {
      _key: "changes",
      question: {
        en: "What happens if I need to change or cancel?",
        sv: "Vad händer om jag behöver ändra eller avboka?",
      },
      answer: {
        en: "We handle all communication with venues and suppliers on your behalf, including changes and cancellations. Terms vary depending on venue and agreement, but we always ensure full transparency regarding your booking.",
        sv: "Vi hanterar all kommunikation med venues och leverantörer åt er, inklusive ändringar och avbokningar. Villkoren varierar beroende på venue och avtal, men vi ser alltid till att ni har full transparens kring er bokning.",
      },
    },
    {
      _key: "difference",
      question: {
        en: "How does EventPartner differ from booking directly?",
        sv: "Hur skiljer sig EventPartner från att boka direkt?",
      },
      answer: {
        en: "Three things: we save you time by handling all research and negotiation, we get better prices thanks to our volume, and we give you access to venues and packages not always publicly available. Plus you get a dedicated contact person throughout the entire process.",
        sv: "Tre saker: vi sparar er tid genom att sköta all research och förhandling, vi har bättre priser tack vare vår volym, och vi ger er tillgång till venues och paket som inte alltid är publikt tillgängliga. Plus att ni får en dedikerad kontaktperson genom hela processen.",
      },
    },
    {
      _key: "size",
      question: {
        en: "Do you only work with large companies?",
        sv: "Jobbar ni bara med stora företag?",
      },
      answer: {
        en: "No — we help companies of all sizes. From startups planning their first kick-off to global corporations with ongoing event needs. The process is the same: you tell us what you're looking for, we deliver.",
        sv: "Nej — vi hjälper företag i alla storlekar. Från startups som planerar sin första kick-off till globala koncerner med löpande eventbehov. Processen är densamma: ni berättar vad ni söker, vi levererar.",
      },
    },
  ],
  faqCtaText: {
    en: "Can't find the answer you're looking for?",
    sv: "Hittar du inte svaret du söker?",
  },
  faqCtaLink: {
    en: "Contact us directly →",
    sv: "Kontakta oss direkt →",
  },

  /* ─── NAVBAR ─── */
  navLinks: [
    { _key: "services", label: { en: "Services", sv: "Tjänster" }, href: "#services" },
    { _key: "customize", label: { en: "Customize", sv: "Skräddarsy" }, href: "#request" },
    { _key: "vip", label: { en: "Become VIP", sv: "Bli VIP" }, href: "/vip" },
    { _key: "shop", label: { en: "Shop", sv: "Webbshop" }, href: "#webshop" },
    { _key: "about", label: { en: "About", sv: "Om oss" }, href: "/om-oss" },
  ],
  navCta: { en: "Book Event →", sv: "Boka Event →" },

  /* ─── VIDEO ─── */
  videoLabel: { en: "EventPartner — Introduction", sv: "Eventpartner — Introduktion" },
  videoHeadline: { en: "We are your partner,", sv: "Vi är er partner," },
  videoHeadlineAccent: { en: "not a middleman.", sv: "inte en förmedlare." },
  videoDescription: {
    en: "See how we help the best companies find the right venues and create memorable events.",
    sv: "Se hur vi hjälper de bästa företagen att hitta rätt venues och skapa minnesvärda event.",
  },

  /* ─── SERVICES (extensions) ─── */
  servicesLabelRight: { en: "Full-service delivery\n36 countries", sv: "Fullservice leverans\n36 länder" },
  servicesStats: [
    { _key: "venues", value: "360,000+", label: { en: "Venues", sv: "Venues" } },
    { _key: "countries", value: "36", label: { en: "Countries", sv: "Länder" } },
    { _key: "response", value: "24h", label: { en: "Response time", sv: "Svarstid" } },
    { _key: "partners", value: "2,400+", label: { en: "Partners", sv: "Partners" } },
  ],
  servicesFullserviceTitle: { en: "Full-Service Delivery", sv: "Fullservice Leverans" },
  servicesFullserviceDesc: {
    en: "Venues, technology, catering, and accommodation — one contact, zero hassle.",
    sv: "Lokaler, teknik, catering och logi — en kontaktperson, noll krångel.",
  },

  /* ─── COUNTRY FLAGS ─── */
  flagsLabel: { en: "EventPartner — Network", sv: "Eventpartner — Nätverk" },
  flagsLabelRight: { en: "100% Europe", sv: "100% Europa" },
  flagsHeadline: { en: "36 countries. 360,000+ venues.", sv: "36 länder. 360 000+ venues." },
  flagsDescription: {
    en: "All of Europe — we have venues that match your needs regardless of destination.",
    sv: "Hela Europa — vi har venues som matchar era behov oavsett destination.",
  },

  /* ─── CASE STORIES (extensions) ─── */
  casesLabelRight: { en: "Selected deliveries", sv: "Utvalda leveranser" },
  caseCards: [
    {
      _key: "ericsson",
      client: "Ericsson",
      event: { en: "European Leadership Summit 2024", sv: "European Leadership Summit 2024" },
      description: {
        en: "Three-day conference for 400 leaders from 12 countries. Full-service from venue sourcing in Stockholm to AV technology and gala evening.",
        sv: "Tre dagars konferens för 400 ledare från 12 länder. Fullservice från venue-sourcing i Stockholm till AV-teknik och galakväll.",
      },
      guests: "400",
      location: { en: "Stockholm", sv: "Stockholm" },
      duration: { en: "3 days", sv: "3 dagar" },
    },
    {
      _key: "spotify",
      client: "Spotify",
      event: { en: "Global Kick-off 2024", sv: "Global Kick-off 2024" },
      description: {
        en: "Annual kick-off for 600+ employees. Team building, keynotes, and afterparty at a unique venue outside Barcelona.",
        sv: "Årlig kick-off för 600+ medarbetare. Teambuilding, keynotes och afterparty i unik venue utanför Barcelona.",
      },
      guests: "600+",
      location: { en: "Barcelona", sv: "Barcelona" },
      duration: { en: "2 days", sv: "2 dagar" },
    },
    {
      _key: "hm",
      client: "H&M",
      event: { en: "Sustainability Gala", sv: "Sustainability Gala" },
      description: {
        en: "Representational dinner and conference focused on sustainability. 250 invited guests at a historic venue in Copenhagen.",
        sv: "Representationsmiddag och konferens med fokus på hållbarhet. 250 inbjudna gäster i en historisk venue i Köpenhamn.",
      },
      guests: "250",
      location: { en: "Copenhagen", sv: "Köpenhamn" },
      duration: { en: "1 evening", sv: "1 kväll" },
    },
    {
      _key: "sandvik",
      client: "Sandvik",
      event: { en: "International Sales Conference", sv: "International Sales Conference" },
      description: {
        en: "Sales conference for 300 people in Milan. Hotel coordination, transfer service, conference program, and dinners.",
        sv: "Säljkonferens för 300 personer i Milano. Hotellkoordinering, transferservice, konferensprogram och middagar.",
      },
      guests: "300",
      location: { en: "Milan", sv: "Milano" },
      duration: { en: "4 days", sv: "4 dagar" },
    },
    {
      _key: "klarna",
      client: "Klarna",
      event: { en: "Product Launch & Press Event", sv: "Product Launch & Press Event" },
      description: {
        en: "Exclusive product launch for press and partners at a central London venue. Meticulously planned experience from A to Z.",
        sv: "Exklusiv produktlansering för press och partners i central London-venue. Detaljplanerad upplevelse från A till Ö.",
      },
      guests: "150",
      location: { en: "London", sv: "London" },
      duration: { en: "1 day", sv: "1 dag" },
    },
  ],
  casesCta: { en: "Read the story", sv: "Läs berättelsen" },

  /* ─── REQUEST FORM ─── */
  formBadge: { en: "Free inquiry", sv: "Kostnadsfri förfrågan" },
  formHeadline: { en: "Tell us what you need.", sv: "Berätta vad ni söker." },
  formHeadlineAccent: { en: "We'll handle the rest.", sv: "Vi gör resten." },
  formDescription: {
    en: "Fill in the form below and we'll get back to you with tailored proposals within 24 hours. Completely free.",
    sv: "Fyll i formuläret nedan så återkommer vi med skräddarsydda förslag inom 24 timmar. Helt kostnadsfritt.",
  },
  formButton: { en: "Send free inquiry", sv: "Skicka kostnadsfri förfrågan" },
  formDisclaimer: { en: "No obligations • Response within 24h", sv: "Inga förpliktelser • Svar inom 24h" },

  /* ─── FOOTER ─── */
  footerBrandDesc: {
    en: "Your complete partner for corporate events across Europe. 360,000+ venues, one platform.",
    sv: "Din kompletta partner för företagsevent i hela Europa. 360 000+ venues, en plattform.",
  },
  footerSocialLabel: { en: "Follow us:", sv: "Följ oss:" },
  footerNewsletterDesc: {
    en: "Sign up for our free newsletter — and get access to exclusive offers and discounts.",
    sv: "Signa upp till vårt kostnadsfria nyhetsbrev — och få tillgång till exklusiva erbjudanden och rabatter.",
  },
  footerCtaTitle: { en: "Send your inquiry today", sv: "Skicka in din förfrågan idag" },
  footerCtaDesc: {
    en: "Always a response within 24h with at least 3 proposals matching your needs.",
    sv: "Alltid svar inom max 24h med minst 3 offerter som passar era önskemål.",
  },
  footerColumns: [
    {
      _key: "company",
      title: { en: "Company", sv: "Företaget" },
      links: [
        { _key: "about", label: { en: "About us", sv: "Om oss" }, href: "/om-oss" },
        { _key: "leadership", label: { en: "Leadership", sv: "Ledning" }, href: "/ledning" },
        { _key: "careers", label: { en: "Careers", sv: "Karriär" }, href: "/karriar" },
        { _key: "press", label: { en: "Press", sv: "Press" }, href: "/press" },
      ],
    },
    {
      _key: "services",
      title: { en: "Services", sv: "Tjänster" },
      links: [
        { _key: "pricing", label: { en: "Pricing", sv: "Vad kostar det?" }, href: "/priser" },
        { _key: "vip", label: { en: "Become a VIP", sv: "Bli förmånskund" }, href: "/formanskund" },
        { _key: "demo", label: { en: "Book a demo", sv: "Boka en demo" }, href: "/demo" },
        { _key: "shop", label: { en: "Shop", sv: "Webbshop" }, href: "/webbshop" },
      ],
    },
    {
      _key: "support",
      title: { en: "Support", sv: "Support" },
      links: [
        { _key: "faq", label: { en: "FAQ", sv: "FAQ" }, href: "/faq" },
        { _key: "assistant", label: { en: "EventPartner Assistant", sv: "EventPartner Assistant" }, href: "/assistant" },
        { _key: "security", label: { en: "Security & Compliance", sv: "Säkerhet & Compliance" }, href: "/sakerhet" },
        { _key: "privacy", label: { en: "GDPR & Privacy", sv: "GDPR & Privacy" }, href: "/privacy" },
      ],
    },
    {
      _key: "venues",
      title: { en: "Popular Countries", sv: "Populära länder" },
      links: [
        { _key: "se", label: { en: "Sweden", sv: "Sverige" }, href: "/land/sweden" },
        { _key: "no", label: { en: "Norway", sv: "Norge" }, href: "/land/norway" },
        { _key: "dk", label: { en: "Denmark", sv: "Danmark" }, href: "/land/denmark" },
        { _key: "de", label: { en: "Germany", sv: "Tyskland" }, href: "/land/germany" },
        { _key: "gb", label: { en: "United Kingdom", sv: "Storbritannien" }, href: "/land/uk" },
        { _key: "all", label: { en: "All 36 countries →", sv: "Alla 36 länder →" }, href: "#coverage" },
      ],
    },
  ],

  /* ─── EXIT INTENT ─── */
  exitLabel: { en: "Before you go", sv: "Innan du går" },
  exitHeadline: { en: "Let us find your", sv: "Låt oss hitta er" },
  exitHeadlineAccent: { en: "perfect venue.", sv: "perfekta venue." },
  exitDescription: {
    en: "Leave your details and we'll contact you with tailored proposals — within 24 hours.",
    sv: "Lämna era uppgifter så kontaktar vi er med skräddarsydda förslag — inom 24 timmar.",
  },
  exitButton: { en: "Send inquiry →", sv: "Skicka förfrågan →" },
  exitPrivacy: {
    en: "We never share your information. You can unsubscribe at any time.",
    sv: "Vi delar aldrig era uppgifter. Ni kan avregistrera er när som helst.",
  },
  /* ─── ABOUT ─── */
  aboutLabel: { en: "EventPartner — About Us", sv: "EventPartner — Om oss" },
  aboutHeadline: { en: "People who", sv: "Människor som" },
  aboutHeadlineAccent: { en: "understand events.", sv: "förstår event." },
  aboutQuote: {
    en: "We believe every event is an opportunity to build something lasting. Not just a conference — a catalyst for change.",
    sv: "Vi tror att varje event är en möjlighet att bygga något bestående. Inte bara en konferens — en katalysator för förändring.",
  },
  aboutBody: {
    en: "EventPartner was founded on a simple idea: to make enterprise event planning as smooth as booking a hotel room. With a network spanning all of Europe and a team with deep experience in the event industry, we make it possible.",
    sv: "EventPartner grundades på en enkel idé: att göra företagseventplanering lika smidigt som att boka ett hotellrum. Med ett nätverk som spänner över hela Europa och ett team med djup erfarenhet inom eventbranschen, gör vi det möjligt.",
  },
  aboutBody2: {
    en: "We're based in the Mediterranean but work globally. Our team has backgrounds in event production, hospitality, and tech — and we combine it into a service that is fast, personal, and reliable.",
    sv: "Vi är baserade i Medelhavet men arbetar globalt. Vårt team har bakgrund inom eventproduktion, hospitality och tech — och vi kombinerar det till en tjänst som är snabb, personlig och pålitlig.",
  },
  aboutMotto: {
    en: "Every inquiry is treated as if it's the only one.",
    sv: "Varje förfrågan behandlas som om det vore den enda.",
  },
  aboutStats: [
    { _key: "s1", value: "360,000+", label: { en: "Venues worldwide", sv: "Venues världen över" } },
    { _key: "s2", value: "36", label: { en: "Countries", sv: "Länder" } },
    { _key: "s3", value: "2,048+", label: { en: "Events delivered", sv: "Levererade event" } },
    { _key: "s4", value: "10+", label: { en: "Years of experience", sv: "Års erfarenhet" } },
    { _key: "s5", value: "94%", label: { en: "Customer satisfaction", sv: "Kundnöjdhet" } },
  ],
  aboutTeamLabel: { en: "The Team", sv: "Teamet" },
  aboutTeamIntro: {
    en: "A small team with deep experience in event production, hospitality, and tech — treating every inquiry as their own.",
    sv: "Ett litet team med djup erfarenhet inom eventproduktion, hospitality och tech — som behandlar varje förfrågan som sin egen.",
  },
  aboutTeam: [
    { _key: "t1", name: "Pontus Bredal Hansen", role: { en: "Co-Founder & CEO", sv: "Medgrundare & VD" }, initials: "PH" },
    { _key: "t2", name: "Malin Berlin", role: { en: "Co-Founder & COO", sv: "Medgrundare & COO" }, initials: "MB" },
    { _key: "t3", name: "Joakim Ström", role: { en: "Head of Partnerships", sv: "Chef för partnerskap" }, initials: "JS" },
    { _key: "t4", name: "David Lindgren", role: { en: "Senior Event Manager", sv: "Senior eventansvarig" }, initials: "DL" },
  ],
};

async function seed() {
  console.log("🌱 Seeding homepage content...");
  await client.createOrReplace(homepage);
  console.log("✅ Homepage seeded with EN + SV content!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
