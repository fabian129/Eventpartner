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
    en: "175 Countries • 300,000+ Venues",
    sv: "175 länder • 300 000+ venues",
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
    en: "From intimate board dinners to large-scale international conferences — One partner for all services connected to your event.",
    sv: "Från intima styrelsemiddagar till storskaliga internationella konferenser — En partner för alla tjänster kopplade till ert event.",
  },
  serviceCards: [
    {
      _key: "conferences",
      title: { en: "Conferences & Meetings", sv: "Konferenser & Möten" },
      desc: {
        en: "Boardrooms, summits, and multi-day conferences. 300,000+ venues across 175 countries.",
        sv: "Styrelsemöten, summits och flerdagarskonferenser. 300 000+ venues i 175 länder.",
      },
      icon: "calendar",
    },
    {
      _key: "venues",
      title: { en: "Venue Sourcing", sv: "Venue Sourcing" },
      desc: {
        en: "300,000+ venues in 175 countries. Always 3 proposals within 24h.",
        sv: "300 000+ venues i 175 länder. Alltid 3 förslag inom 24h.",
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
    en: "With 10+ years of experience and 2,000+ delivered events, EventPartner is the Nordic region's leading full-service event partner. We combine an unmatched venue network spanning 175 countries with dedicated project management that handles everything from sourcing to delivery.",
    sv: "Med 10+ års erfarenhet och 2 000+ levererade event är EventPartner Nordens ledande fullservice-eventpartner. Vi kombinerar ett oöverträffat venue-nätverk som sträcker sig över 175 länder med dedikerad projektledning som hanterar allt från sourcing till leverans.",
  },
  aboutStats: [
    { _key: "venues", value: "300,000+", label: { en: "Venues worldwide", sv: "Venues världen över" } },
    { _key: "countries", value: "175", label: { en: "the globean countries", sv: "the globeiska länder" } },
    { _key: "events", value: "2,048+", label: { en: "Events delivered", sv: "Events levererade" } },
    { _key: "experience", value: "10+", label: { en: "Years of experience", sv: "Års erfarenhet" } },
    { _key: "satisfaction", value: "100%", label: { en: "Customized solutions", sv: "Skräddarsydda lösningar" } },
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
        en: "Sending an inquiry and receiving venue proposals is completely free. Our service is funded by the venues, meaning there are no hidden costs or fees for you.",
        sv: "Att skicka en förfrågan och få venue-förslag är helt kostnadsfritt. Vår tjänst finansieras av lokalerna, vilket innebär att det inte tillkommer några dolda avgifter eller kostnader för er.",
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
        en: "We have venues in 175 countries — from Iceland to Cyprus, from Portugal to Finland. Over 300,000 venues in total. Whether you need a conference hotel in Stockholm or a gala venue in Barcelona, we'll find the right one.",
        sv: "Vi har venues i 175 länder — från Island till Cypern, från Portugal till Finland. Totalt över 300,000 venues. Oavsett om ni behöver ett konferenshotell i Stockholm eller en gala-venue i Barcelona, vi hittar rätt.",
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
    { _key: "about", label: { en: "About", sv: "Om oss" }, href: "/about" },
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
  servicesLabelRight: { en: "Full-service delivery\n175 countries", sv: "Fullservice leverans\n175 länder" },
  servicesStats: [
    { _key: "venues", value: "300,000+", label: { en: "Venues", sv: "Venues" } },
    { _key: "countries", value: "175", label: { en: "Countries", sv: "Länder" } },
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
  flagsLabelRight: { en: "Global coverage", sv: "Global täckning" },
  flagsHeadline: { en: "175 countries. 300,000+ venues.", sv: "175 länder. 300 000+ venues." },
  flagsDescription: {
    en: "All of the globe and beyond — we have venues that match your needs regardless of destination.",
    sv: "Hela världen och resten av världen — vi har venues som matchar era behov oavsett destination.",
  },

  /* ─── CASE STORIES (extensions) ─── */
  casesLabelRight: { en: "Selected deliveries", sv: "Utvalda leveranser" },
  caseCards: [
    {
      _key: "ericsson",
      client: "Ericsson",
      event: { en: "the globean Leadership Summit 2024", sv: "the globean Leadership Summit 2024" },
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
  formHeadline: { en: "Find inspiration for your next event", sv: "Hitta inspiration för ert nästa event" },
  formHeadlineAccent: { en: "", sv: "" },
  formDescription: {
    en: "Explore top venues across 175 countries and discover destinations, hotels, resorts, and meeting spaces from around the world. When you're ready, our team will help source the perfect venue for your event.",
    sv: "Utforska topp-venues i 175 länder och upptäck destinationer, hotell, resorts och mötesplatser över hela världen. När ni är redo hjälper vårt team er att hitta den perfekta platsen för ert event.",
  },
  formButton: { en: "Send free inquiry", sv: "Skicka kostnadsfri förfrågan" },
  formDisclaimer: { en: "No obligations • Response within 24h", sv: "Inga förpliktelser • Svar inom 24h" },

  /* ─── FOOTER ─── */
  footerBrandDesc: {
    en: "Your complete partner for corporate events across the globe. 300,000+ venues, one platform.",
    sv: "Din kompletta partner för företagsevent i hela världen. 300 000+ venues, en plattform.",
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
        { _key: "about", label: { en: "About us", sv: "Om oss" }, href: "/about" },
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
        { _key: "vip", label: { en: "Become a VIP", sv: "Bli förmånskund" }, href: "/vip" },
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
        { _key: "security", label: { en: "Security & Compliance", sv: "Säkerhet & Compliance" }, href: "/security" },
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
        { _key: "all", label: { en: "All 175 countries →", sv: "Alla 175 länder →" }, href: "#coverage" },
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
    en: "EventPartner was founded on a simple idea: to make enterprise event planning as smooth as booking a hotel room. With a network spanning all of the globe and a team with deep experience in the event industry, we make it possible.",
    sv: "EventPartner grundades på en enkel idé: att göra företagseventplanering lika smidigt som att boka ett hotellrum. Med ett nätverk som spänner över hela världen och ett team med djup erfarenhet inom eventbranschen, gör vi det möjligt.",
  },
  aboutBody2: {
    en: "We're based in the Mediterranean and Scandinavia but work globally. Our team has backgrounds in event production, hospitality, and tech — and we combine it into a service that is fast, personal, and reliable.",
    sv: "Vi är baserade i Medelhavet och Skandinavien men arbetar globalt. Vårt team har bakgrund inom eventproduktion, hospitality och tech — och vi kombinerar det till en tjänst som är snabb, personlig och pålitlig.",
  },
  aboutMotto: {
    en: "Every inquiry is treated as if it's the only one.",
    sv: "Varje förfrågan behandlas som om det vore den enda.",
  },
  aboutStats: [
    { _key: "s1", value: "300,000+", label: { en: "Venues worldwide", sv: "Venues världen över" } },
    { _key: "s2", value: "175", label: { en: "Countries", sv: "Länder" } },
    { _key: "s3", value: "2,048+", label: { en: "Events delivered", sv: "Levererade event" } },
    { _key: "s4", value: "10+", label: { en: "Years of experience", sv: "Års erfarenhet" } },
    { _key: "s5", value: "100%", label: { en: "Customized solutions", sv: "Skräddarsydda lösningar" } },
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

const aboutPageData = {
  _type: "aboutPage",
  _id: "aboutPage",
  heroLabel: { en: "About EventPartner", sv: "Om EventPartner" },
  heroLabelRight: { en: "Est. 2024", sv: "Grundat 2024" },
  heroHeadline: { en: "People who", sv: "Människor som" },
  heroHeadlineAccent: { en: "understand", sv: "förstår" },
  heroHeadlineLine3: { en: "events.", sv: "event." },
  heroSubtitle: {
    en: "EventPartner was founded on one idea: to make enterprise event planning as seamless as booking a hotel room. With a network spanning 175 countries and deep industry expertise, we make it possible — every day.",
    sv: "EventPartner grundades på en idé: att göra företagseventplanering lika smidigt som att boka ett hotellrum. Med ett nätverk som spänner över 175 länder och djup branschexpertis gör vi det möjligt — varje dag.",
  },
  stats: [
    { _key: "s1", value: "175", label: { en: "Countries", sv: "Länder" } },
    { _key: "s2", value: "2,048+", label: { en: "Events delivered", sv: "Levererade event" } },
    { _key: "s3", value: "300,000+", label: { en: "Venue partners", sv: "Venue-partners" } },
    { _key: "s4", value: "100%", label: { en: "Customized solutions", sv: "Skräddarsydda lösningar" } },
  ],
  storyLabel: { en: "Our Story", sv: "Vår historia" },
  storyHeadline: { en: "From idea to", sv: "Från idé till" },
  storyHeadlineAccent: { en: "industry leader.", sv: "branschledare." },
  storyQuote: {
    en: "We believe every event is an opportunity to build something lasting. Not just a conference — a memory. Not just a dinner — a relationship.",
    sv: "Vi tror att varje event är en möjlighet att bygga något bestående. Inte bara en konferens — ett minne. Inte bara en middag — en relation.",
  },
  storyBody1: {
    en: "Founded in the Mediterranean and Scandinavia, but operating across all of the globe, EventPartner connects enterprises with the perfect venue for any occasion. From intimate board dinners to 5,000-person corporate conferences, our team of seasoned event professionals curates tailored proposals — fast.",
    sv: "Grundat i Medelhavet och Skandinavien, men verksamt i hela världen, kopplar EventPartner samman företag med den perfekta venue:n för varje tillfälle. Från intima styrelsemiddagar till företagskonferenser med 5 000 deltagare, tar vårt erfarna team fram skräddarsydda förslag — snabbt.",
  },
  storyBody2: {
    en: "Our backgrounds span event production, hospitality, and technology. We combined all three to create a service that is personal, reliable, and remarkably efficient. One inquiry, multiple options, zero hassle.",
    sv: "Vår bakgrund spänner över eventproduktion, hospitality och teknik. Vi kombinerade alla tre för att skapa en tjänst som är personlig, pålitlig och remarkabelt effektiv. En förfrågan, flera alternativ, noll krångel.",
  },
  valuesLabel: { en: "What We Stand For", sv: "Vad vi står för" },
  valuesHeadline: { en: "Built on principles,", sv: "Byggt på principer," },
  valuesHeadlineAccent: { en: "not just promises.", sv: "inte bara löften." },
  valueCards: [
    { _key: "v1", title: { en: "Personal Service", sv: "Personlig service" }, description: { en: "Every inquiry is handled by a real person, not a chatbot. We believe in relationships built on trust and genuine care.", sv: "Varje förfrågan hanteras av en riktig person, inte en chatbot. Vi tror på relationer byggda på förtroende och genuin omsorg." }, icon: "heart" },
    { _key: "v2", title: { en: "Speed & Reliability", sv: "Snabbhet & pålitlighet" }, description: { en: "Proposals within 24 hours, always. We know that time-critical event planning doesn't wait for anyone.", sv: "Förslag inom 24 timmar, alltid. Vi vet att tidskritisk eventplanering inte väntar på någon." }, icon: "zap" },
    { _key: "v3", title: { en: "Pan-the globean Reach", sv: "Global räckvidd" }, description: { en: "One partner across 175 countries. No more juggling local agencies — we handle everything from Stockholm to Barcelona.", sv: "En partner i 175 länder. Sluta jonglera lokala byråer — vi hanterar allt från Stockholm till Barcelona." }, icon: "globe" },
    { _key: "v4", title: { en: "Transparency", sv: "Transparens" }, description: { en: "No hidden fees, clear pricing, and a comparison of at least 3 venue options for every single request.", sv: "Inga dolda avgifter, tydlig prissättning och jämförelse av minst 3 venue-alternativ för varje förfrågan." }, icon: "shield" },
  ],
  teamLabel: { en: "The Team", sv: "Teamet" },
  teamIntro: {
    en: "A small team with deep experience in event production, hospitality, and tech — treating every inquiry as their own.",
    sv: "Ett litet team med djup erfarenhet inom eventproduktion, hospitality och teknik — som behandlar varje förfrågan som sin egen.",
  },
  teamMembers: [
    { _key: "t1", name: "Pontus Bredal Hansen", role: { en: "Co-Founder & CEO", sv: "Medgrundare & VD" }, initials: "PH" },
    { _key: "t2", name: "Malin Berlin", role: { en: "Co-Founder & COO", sv: "Medgrundare & COO" }, initials: "MB" },
    { _key: "t3", name: "Joakim Ström", role: { en: "Head of Partnerships", sv: "Chef för partnerskap" }, initials: "JS" },
    { _key: "t4", name: "David Lindgren", role: { en: "Senior Event Manager", sv: "Senior eventansvarig" }, initials: "DL" },
  ],
  ctaHeadline: { en: "Ready to plan your next event?", sv: "Redo att planera ert nästa event?" },
  ctaDescription: { en: "Send us your inquiry — always free, always personal, always within 24 hours.", sv: "Skicka er förfrågan — alltid gratis, alltid personligt, alltid inom 24 timmar." },
};

const securityPageData = {
  _type: "securityPage",
  _id: "securityPage",
  heroLabel: { en: "Security & Compliance", sv: "Säkerhet & Compliance" },
  heroLabelRight: { en: "GDPR · EU Data", sv: "GDPR · EU-data" },
  heroBadge: { en: "Enterprise-Grade Security", sv: "Säkerhet i företagsklass" },
  heroHeadline: { en: "Your data", sv: "Er data" },
  heroHeadlineAccent: { en: "is sacred.", sv: "är helig." },
  heroSubtitle: {
    en: "We handle event data for some of the globe's largest organizations. That trust is earned through rigorous security practices, full GDPR compliance, and absolute transparency about how we protect your information.",
    sv: "Vi hanterar eventdata för några av världens största organisationer. Det förtroendet förtjänas genom rigorösa säkerhetsrutiner, full GDPR-efterlevnad och absolut transparens kring hur vi skyddar er information.",
  },
  pillarsLabel: { en: "Security Foundations", sv: "Säkerhetsgrund" },
  pillarsHeadline: { en: "Built on six", sv: "Byggt på sex" },
  pillarsHeadlineAccent: { en: "security pillars.", sv: "säkerhetspelare." },
  pillarCards: [
    { _key: "p1", title: { en: "Data Encryption", sv: "Datakryptering" }, description: { en: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256).", sv: "All data krypteras under överföring (TLS 1.3) och i vila (AES-256)." }, icon: "lock" },
    { _key: "p2", title: { en: "EU-Based Infrastructure", sv: "EU-baserad infrastruktur" }, description: { en: "All data is hosted on EU-based servers.", sv: "All data lagras på EU-baserade servrar." }, icon: "server" },
    { _key: "p3", title: { en: "GDPR Compliant", sv: "GDPR-kompatibel" }, description: { en: "EventPartner is fully GDPR compliant.", sv: "EventPartner är fullt GDPR-kompatibelt." }, icon: "fileCheck" },
    { _key: "p4", title: { en: "Access Control", sv: "Åtkomstkontroll" }, description: { en: "Role-based access control (RBAC) ensures only authorized personnel can access sensitive information.", sv: "Rollbaserad åtkomstkontroll (RBAC) säkerställer att enbart behörig personal har tillgång till känslig information." }, icon: "userCheck" },
    { _key: "p5", title: { en: "Transparency", sv: "Transparens" }, description: { en: "We publish a clear privacy policy and maintain open communication.", sv: "Vi publicerar en tydlig integritetspolicy och upprätthåller öppen kommunikation." }, icon: "eye" },
    { _key: "p6", title: { en: "Incident Response", sv: "Incidenthantering" }, description: { en: "We maintain a documented incident response plan with 72-hour notification.", sv: "Vi har en dokumenterad incidenthanteringsplan med 72-timmars notifiering." }, icon: "alertTriangle" },
  ],
  dpoEmail: "privacy@eventpartner.io",
  dpoTitle: { en: "Data Protection Officer", sv: "Dataskyddsombud" },
  dpoSubtitle: { en: "For questions about data processing", sv: "För frågor om databehandling" },
  dpoDescription: {
    en: "If you have any questions about how we process your data, wish to exercise your rights, or want to report a data protection concern, please contact our Data Protection Officer.",
    sv: "Om ni har frågor om hur vi behandlar era uppgifter, vill utöva era rättigheter eller vill rapportera ett dataskyddsärende, kontakta vårt dataskyddsombud.",
  },
  ctaHeadline: { en: "Questions about security?", sv: "Frågor om säkerhet?" },
  ctaDescription: { en: "We're happy to discuss our security practices in detail. Get in touch with our team.", sv: "Vi diskuterar gärna våra säkerhetsrutiner i detalj. Kontakta vårt team." },
};

const vipPageData = {
  _type: "vipPage",
  _id: "vipPage",
  heroLabel: { en: "EventPartner — VIP Programme", sv: "EventPartner — VIP-program" },
  heroLabelRight: { en: "Exclusive access · 3:12", sv: "Exklusiv tillgång · 3:12" },
  heroHeadline: { en: "Your partner,", sv: "Er partner," },
  heroHeadlineAccent: { en: "not a vendor.", sv: "inte en leverantör." },
  heroStats: [
    { _key: "s1", value: "12h", label: { en: "Response time", sv: "Svarstid" } },
    { _key: "s2", value: "10%", label: { en: "Max discount", sv: "Max rabatt" } },
    { _key: "s3", value: "175", label: { en: "Countries", sv: "Länder" } },
    { _key: "s4", value: "1:1", label: { en: "Dedicated manager", sv: "Dedikerad kontakt" } },
  ],
  heroAnchorText: { en: "Welcome to the VIP Programme ↓", sv: "Välkommen till VIP-programmet ↓" },
  manifestoLabel: { en: "EventPartner — VIP Benefits", sv: "EventPartner — VIP-förmåner" },
  manifestoHeadline: { en: "Everything you need.", sv: "Allt ni behöver." },
  manifestoHeadlineAccent: { en: "Nothing you don't.", sv: "Inget ni inte behöver." },
  manifestoQuote: {
    en: "We don't treat every client the same — we treat every client as if they're the only one.",
    sv: "Vi behandlar inte varje kund lika — vi behandlar varje kund som om de vore den enda.",
  },
  manifestoBody1: {
    en: "Our VIP programme gives your team direct access to a dedicated account manager who understands your brand, your standards, and your history.",
    sv: "Vårt VIP-program ger ert team direkt tillgång till en dedikerad kontaktperson som förstår ert varumärke, era standarder och er historik.",
  },
  manifestoBody2: {
    en: "Whether you're planning 5 events per year or 50, VIP clients receive custom contract terms, exclusive venue access, and strategic support.",
    sv: "Oavsett om ni planerar 5 event per år eller 50, får VIP-kunder skräddarsydda avtalsvillkor, exklusiv venue-tillgång och strategiskt stöd.",
  },
  manifestoMotto: { en: "Priority is not a perk — it's the standard.", sv: "Prioritet är inte en förmån — det är standarden." },
  manifestoStats: [
    { _key: "ms1", value: "< 12h", label: { en: "Response time", sv: "Svarstid" } },
    { _key: "ms2", value: "Up to 10%", label: { en: "Discounts", sv: "Rabatter" } },
    { _key: "ms3", value: "1:1", label: { en: "Account manager", sv: "Kontaktperson" } },
    { _key: "ms4", value: "Custom", label: { en: "Contract terms", sv: "Avtalsvillkor" } },
  ],
  tiersLabel: { en: "EventPartner — Membership tiers", sv: "EventPartner — Medlemsnivåer" },
  tiersLabelRight: { en: "Two levels", sv: "Två nivåer" },
  tiersHeadline: { en: "Choose your level.", sv: "Välj er nivå." },
  tiersDescription: { en: "Two tiers, designed around your needs. Both include dedicated support — Gold adds enterprise-grade flexibility.", sv: "Två nivåer, utformade efter era behov. Båda inkluderar dedikerat stöd — Gold lägger till flexibilitet i företagsklass." },
  tierCards: [
    { _key: "silver", name: { en: "VIP Silver", sv: "VIP Silver" }, badge: { en: "Most Popular", sv: "Mest populär" }, price: { en: "Free", sv: "Gratis" }, priceSub: { en: "Volume-based qualification", sv: "Volymbaserad kvalificering" }, features: [{ en: "Dedicated account manager", sv: "Dedikerad kontaktperson" }, { en: "Priority response within 12h", sv: "Prioriterat svar inom 12h" }, { en: "5% discount on all bookings", sv: "5% rabatt på alla bokningar" }, { en: "Access to VIP-only venues", sv: "Tillgång till VIP-exklusiva venues" }, { en: "Quarterly event trend reports", sv: "Kvartalsvisa eventrapporter" }], cta: { en: "Apply Now", sv: "Ansök nu" }, highlight: false },
    { _key: "gold", name: { en: "VIP Gold", sv: "VIP Gold" }, badge: { en: "Enterprise", sv: "Enterprise" }, price: { en: "By Invitation", sv: "Via inbjudan" }, priceSub: { en: "10+ events per year", sv: "10+ event per år" }, features: [{ en: "Everything in Silver", sv: "Allt i Silver" }, { en: "10% discount on all bookings", sv: "10% rabatt på alla bokningar" }, { en: "Always 33% extra discount on everything in our webshop", sv: "Alltid 33 % extra rabatt på allt i vår webbshop" }, { en: "Annual comprehensive reporting & ESG / sustainability data", sv: "Årlig omfattande rapportering samt ESG- & hållbarhetsdata" }, { en: "Aligned with enterprise requirements (CSRD, NIS2 governance)", sv: "Anpassat för enterprise-krav (CSRD, NIS2-governance)" }, { en: "Advanced spend control & travel management integration", sv: "Avancerad kostnadskontroll & travel management" }, { en: "Custom contract & billing terms", sv: "Skräddarsydda avtals- & faktureringsvillkor" }], cta: { en: "Request Invitation", sv: "Begär inbjudan" }, highlight: true },
  ],
  stepsLabel: { en: "EventPartner — How to join", sv: "EventPartner — Så går du med" },
  stepsLabelRight: { en: "3 steps", sv: "3 steg" },
  stepsHeadline: { en: "Three simple steps.", sv: "Tre enkla steg." },
  steps: [
    { _key: "st1", step: "01", title: { en: "Apply", sv: "Ansök" }, description: { en: "Fill in your company details and event volume through the form below. Takes less than 2 minutes.", sv: "Fyll i era företagsuppgifter och eventvolym via formuläret nedan. Tar mindre än 2 minuter." } },
    { _key: "st2", step: "02", title: { en: "Qualify", sv: "Kvalificera" }, description: { en: "Our team reviews your profile and matches you with the right VIP tier based on your needs and volume.", sv: "Vårt team granskar er profil och matchar er med rätt VIP-nivå baserat på era behov och volym." } },
    { _key: "st3", step: "03", title: { en: "Enjoy", sv: "Njut" }, description: { en: "Start receiving priority service, exclusive pricing, and a dedicated account manager from day one.", sv: "Börja ta emot prioriterad service, exklusiva priser och en dedikerad kontaktperson från dag ett." } },
  ],
  ctaCard1Title: { en: "Talk to us", sv: "Prata med oss" },
  ctaCard1Desc: { en: "Get answers to your VIP questions.", sv: "Få svar på era VIP-frågor." },
  ctaCard2Title: { en: "Apply for VIP", sv: "Ansök om VIP" },
  ctaCard2Headline: { en: "Apply for your VIP membership.", sv: "Ansök om ditt VIP-medlemskap." },
  ctaCard2Sub: { en: "today.", sv: "idag." },
};

async function seed() {
  console.log("🌱 Seeding all page content...");
  await client.createOrReplace(homepage);
  console.log("  ✅ Homepage seeded");
  await client.createOrReplace(aboutPageData);
  console.log("  ✅ About page seeded");
  await client.createOrReplace(securityPageData);
  console.log("  ✅ Security page seeded");
  await client.createOrReplace(vipPageData);
  console.log("  ✅ VIP page seeded");
  console.log("🎉 All pages seeded with EN + SV content!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
