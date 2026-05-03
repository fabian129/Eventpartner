/**
 * Seed script — Creates the 6 missing CMS page documents in Sanity.
 * Populates them with the current hardcoded fallback text so
 * Malin & Pontus can start editing immediately in Studio.
 *
 * Run: node scripts/seed-missing-pages.mjs
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fikqs32e",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const LS = (en, sv) => ({ _type: "localizedString", en, sv: sv || en });
const LT = (en, sv) => ({ _type: "localizedText", en, sv: sv || en });

const DOCUMENTS = [
  // ────────────────────────────────────────
  // 1. Leadership Page
  // ────────────────────────────────────────
  {
    _type: "leadershipPage",
    _id: "leadershipPage",
    headline: LS("The team behind EventPartner.", "Teamet bakom EventPartner."),
    description: LT(
      "With decades of combined experience in events, hospitality, and technology — we are committed to making your next event unforgettable.",
      "Med decenniers samlad erfarenhet inom event, hospitality och teknik — vi är engagerade i att göra ert nästa event oförglömligt."
    ),
    sectionLabel: LS("Our Team", "Vårt Team"),
    sectionLabelRight: LS("EventPartner", "EventPartner"),
    ctaHeadline: LS("Want to work with us?", "Vill du arbeta med oss?"),
    ctaDescription: LT(
      "Send us your event inquiry — always free, always personal.",
      "Skicka oss er eventförfrågan — alltid gratis, alltid personligt."
    ),
  },

  // ────────────────────────────────────────
  // 2. Careers Page
  // ────────────────────────────────────────
  {
    _type: "careersPage",
    _id: "careersPage",
    heroLabel: LS("Careers", "Karriär"),
    heroLabelRight: LS("Join Us", "Bli en del av oss"),
    headline: LS("Build the future of events.", "Bygg framtidens event."),
    description: LT(
      "We're always looking for talented people who share our passion for creating extraordinary experiences. Join our team across Europe.",
      "Vi letar alltid efter talangfulla personer som delar vår passion för att skapa extraordinära upplevelser. Gå med i vårt team över hela Europa."
    ),
    perks: [
      {
        _type: "object",
        _key: "perk1",
        title: LS("Global Team", "Globalt Team"),
        desc: LT("Work with colleagues across 29 European countries.", "Arbeta med kollegor i 29 europeiska länder."),
        icon: "globe",
      },
      {
        _type: "object",
        _key: "perk2",
        title: LS("Remote First", "Remote First"),
        desc: LT("Flexible work arrangements that fit your lifestyle.", "Flexibla arbetsarrangemang som passar din livsstil."),
        icon: "users",
      },
      {
        _type: "object",
        _key: "perk3",
        title: LS("Growth", "Utveckling"),
        desc: LT("Continuous learning and development opportunities.", "Kontinuerliga möjligheter till lärande och utveckling."),
        icon: "briefcase",
      },
    ],
    openApplicationTitle: LS("Open Application", "Spontanansökan"),
    openApplicationDesc: LT(
      "Don't see a perfect match? Send us an open application — we're always interested in exceptional talent.",
      "Hittar du inte en perfekt match? Skicka en spontanansökan — vi är alltid intresserade av exceptionell talang."
    ),
    formHeadline: LS("Apply Now", "Ansök Nu"),
    successTitle: LS("Application Received", "Ansökan Mottagen"),
    successDesc: LT(
      "Thank you for your interest! We'll review your application and get back to you within 5 business days.",
      "Tack för ditt intresse! Vi granskar din ansökan och återkommer inom 5 arbetsdagar."
    ),
    ctaHeadline: LS("Not looking for a job?", "Letar du inte efter jobb?"),
    ctaDescription: LT(
      "We'd love to hear from you about your next event instead.",
      "Vi vill gärna höra om ert nästa event istället."
    ),
  },

  // ────────────────────────────────────────
  // 3. FAQ Page
  // ────────────────────────────────────────
  {
    _type: "faqPage",
    _id: "faqPage",
    headline: LS("Frequently Asked Questions", "Vanliga Frågor"),
    description: LT(
      "Everything you need to know about EventPartner and our services.",
      "Allt du behöver veta om EventPartner och våra tjänster."
    ),
    faqs: [
      {
        _type: "object",
        _key: "faq1",
        question: LS("What countries do you cover?", "Vilka länder täcker ni?"),
        answer: LT(
          "We currently operate across 36 European countries with access to over 360,000 venues.",
          "Vi verkar för närvarande i 36 europeiska länder med tillgång till över 360 000 venues."
        ),
      },
      {
        _type: "object",
        _key: "faq2",
        question: LS("How does the booking process work?", "Hur fungerar bokningsprocessen?"),
        answer: LT(
          "Simply fill in our inquiry form with your event details, and we'll match you with 3 tailored venue proposals within 24 hours — completely free.",
          "Fyll i vår förfrågan med era eventdetaljer, och vi matchar er med 3 skräddarsydda venueförslag inom 24 timmar — helt gratis."
        ),
      },
      {
        _type: "object",
        _key: "faq3",
        question: LS("Is the service free?", "Är tjänsten gratis?"),
        answer: LT(
          "Yes, our venue matching service is completely free for event organizers. We earn our commission from the venues.",
          "Ja, vår venue-matchningstjänst är helt gratis för eventarrangörer. Vi tjänar vår provision från venuesna."
        ),
      },
      {
        _type: "object",
        _key: "faq4",
        question: LS("What types of events do you handle?", "Vilka typer av event hanterar ni?"),
        answer: LT(
          "From intimate board dinners to large-scale international conferences, product launches, team building, galas, and kick-offs — we handle all types of corporate events.",
          "Från intima styrelsemiddagar till storskaliga internationella konferenser, produktlanseringar, teambuilding, galor och kick-offs — vi hanterar alla typer av företagsevent."
        ),
      },
    ],
  },

  // ────────────────────────────────────────
  // 4. Help Center Page
  // ────────────────────────────────────────
  {
    _type: "helpCenterPage",
    _id: "helpCenterPage",
    heroLabel: LS("Help Center", "Hjälpcenter"),
    heroLabelRight: LS("Support", "Support"),
    heroHeadline: LS("We're here", "Vi finns här"),
    heroHeadlineAccent: LS("to help.", "för att hjälpa."),
    heroSubtitle: LT(
      "Need assistance with your event or have a question about our services? Our dedicated support team is always ready to help.",
      "Behöver du hjälp med ditt event eller har en fråga om våra tjänster? Vårt dedikerade supportteam är alltid redo att hjälpa."
    ),
    stats: [
      { _type: "object", _key: "stat1", icon: "clock", value: "< 24h", label: LS("Average response", "Genomsnittlig svarstid") },
      { _type: "object", _key: "stat2", icon: "globe", value: "36", label: LS("Countries covered", "Länder täckta") },
      { _type: "object", _key: "stat3", icon: "shield", value: "Mon–Fri", label: LS("09:00–18:00 CET", "09:00–18:00 CET") },
    ],
    channelsLabel: LS("Get in Touch", "Kontakta Oss"),
    channelsHeadline: LS("Choose your preferred way to reach us.", "Välj ditt föredragna sätt att kontakta oss."),
    channels: [
      { _type: "object", _key: "ch1", icon: "mail", title: LS("Email Support", "E-postsupport"), desc: LT("Detailed message — response within 24h.", "Detaljerat meddelande — svar inom 24h."), action: "support@eventpartner.com", href: "mailto:support@eventpartner.com" },
      { _type: "object", _key: "ch2", icon: "phone", title: LS("Phone Support", "Telefonsupport"), desc: LT("Speak directly with our team.", "Prata direkt med vårt team."), action: "+46 8 123 456 78", href: "tel:+468123456" },
      { _type: "object", _key: "ch3", icon: "chat", title: LS("Live Chat", "Livechatt"), desc: LT("Real-time help for quick questions.", "Realtidshjälp för snabba frågor."), action: "Coming soon", href: "#" },
    ],
    formLabel: LS("Send a Message", "Skicka ett Meddelande"),
    formHeadline: LS("Tell us what you need.", "Berätta vad ni behöver."),
    formDescription: LT(
      "Fill out the form and our team will get back to you within one business day.",
      "Fyll i formuläret så återkommer vårt team inom en arbetsdag."
    ),
    contactEmail: "support@eventpartner.com",
    contactPhone: "+46 8 123 456 78",
    ctaHeadline: LS("Check our FAQ first?", "Kolla vår FAQ först?"),
    ctaDescription: LT(
      "Many common questions are already answered.",
      "Många vanliga frågor är redan besvarade."
    ),
  },

  // ────────────────────────────────────────
  // 5. AI Assistant Page
  // ────────────────────────────────────────
  {
    _type: "aiAssistantPage",
    _id: "aiAssistantPage",
    heroLabel: LS("AI Assistant", "AI-Assistent"),
    heroLabelRight: LS("Innovation Lab", "Innovationslabb"),
    heroHeadline: LS("Meet your event", "Möt er event"),
    heroHeadlineAccent: LS("AI assistant.", "AI-assistent."),
    heroSubtitle: LT(
      "Our AI-powered assistant is being trained to help you find the perfect venue, plan logistics, and optimize your event experience.",
      "Vår AI-drivna assistent tränas för att hjälpa er hitta den perfekta venuen, planera logistik och optimera er eventupplevelse."
    ),
    botTitle: LS("EventPartner AI", "EventPartner AI"),
    botDescription: LT(
      "Powered by advanced language models trained on our venue database of 360,000+ locations across 36 countries.",
      "Drivs av avancerade språkmodeller tränade på vår venue-databas med 360 000+ platser i 36 länder."
    ),
    botStatus: LS("Training in progress...", "Träning pågår..."),
    botLaunchDate: LS("Expected launch Q3 2026", "Förväntad lansering Q3 2026"),
    featuresLabel: LS("Capabilities", "Funktioner"),
    featuresHeadline: LS("What it will do.", "Vad den kommer göra."),
    features: [
      { _type: "object", _key: "feat1", title: LS("Smart Venue Matching", "Smart Venue-matchning"), desc: LT("AI-powered recommendations based on your event requirements.", "AI-drivna rekommendationer baserat på era eventkrav."), icon: "zap" },
      { _type: "object", _key: "feat2", title: LS("Instant Proposals", "Omedelbara Förslag"), desc: LT("Get venue proposals in seconds instead of hours.", "Få venueförslag på sekunder istället för timmar."), icon: "globe" },
      { _type: "object", _key: "feat3", title: LS("Budget Optimization", "Budgetoptimering"), desc: LT("AI analyzes pricing patterns to maximize your event budget.", "AI analyserar prismönster för att maximera er eventbudget."), icon: "shield" },
    ],
    ctaHeadline: LS("Can't wait for AI?", "Kan inte vänta på AI?"),
    ctaDescription: LT(
      "Our human team is just as fast. Send us your inquiry today.",
      "Vårt mänskliga team är precis lika snabbt. Skicka er förfrågan idag."
    ),
  },

  // ────────────────────────────────────────
  // 6. Webshop Page
  // ────────────────────────────────────────
  {
    _type: "webshopPage",
    _id: "webshopPage",
    headline: LS("Merchandise & Video Brochures", "Merchandise & Videobroschyrer"),
    description: LT(
      "Explore our curated selection of event merchandise and request a quote for our premium Video Plus Print brochures.",
      "Utforska vårt utvalda sortiment av eventmerchandise och begär en offert för våra premium Video Plus Print-broschyrer."
    ),
    merchTitle: LS("Event Merchandise", "Eventmerchandise"),
    merchPendingMessage: LT(
      "Our event merchandise catalog is being prepared. Check back soon for branded products and conference essentials.",
      "Vår eventmerchandise-katalog förbereds. Kom tillbaka snart för märkesprodukter och konferenstillbehör."
    ),
    quoteTitle: LS("Video Plus Print Quote", "Video Plus Print Offert"),
    quoteButton: LS("Request Quote", "Begär Offert"),
  },
];

async function seed() {
  console.log("\n🌱 Seeding 6 missing Sanity documents...\n");

  for (const doc of DOCUMENTS) {
    try {
      // Check if document already exists
      const existing = await client.getDocument(doc._id);
      if (existing) {
        console.log(`⏭️  ${doc._type} — already exists, skipping`);
        continue;
      }

      await client.createOrReplace(doc);
      console.log(`✅ ${doc._type} — created successfully`);
    } catch (err) {
      console.error(`❌ ${doc._type} — failed:`, err.message);
    }
  }

  console.log("\n🎉 Done! All pages are now editable in Sanity Studio.\n");
}

seed();
