"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, UserCheck, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { SecurityTicker } from "@/components/layout/SecurityTicker";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Client-approved bilingual copy ───────────────────────────────────────────
const COPY = {
  heroLabel:    { en: "SECURITY & PRIVACY",        sv: "SÄKERHET & INTEGRITET" },
  heroLabelRight: { en: "EVENTPARTNER",            sv: "EVENTPARTNER" },
  heroBadge:    { en: "DATA PROTECTION",           sv: "DATASKYDD" },
  heroHeadline: { en: "SECURITY &",                sv: "SÄKERHET &" },
  heroAccent:   { en: "PRIVACY",                   sv: "INTEGRITET" },
  heroSubtitle: {
    en: "We work with event organizers, venues and corporate clients across Europe. Protecting your information and respecting your privacy is a fundamental part of how we operate. We are committed to handling personal data responsibly, complying with applicable data protection laws, and continuously improving our security practices as we grow.",
    sv: "Vi arbetar med eventarrangörer, konferensanläggningar och företag över hela Europa. Att skydda din information och respektera din integritet är en grundläggande del av hur vi arbetar. Vi är engagerade i att hantera personuppgifter ansvarsfullt, följa gällande dataskyddslagstiftning och kontinuerligt utveckla våra säkerhetsrutiner i takt med att vi växer.",
  },

  pillarsLabel:    { en: "SECURITY FOUNDATIONS",             sv: "GRUNDEN I VÅRT SÄKERHETSARBETE" },
  pillarsHeadline: { en: "Built on responsible",             sv: "Ansvarsfull" },
  pillarsAccent:   { en: "data handling.",                   sv: "hantering av data." },

  pillars: [
    {
      icon: FileCheck,
      title:       { en: "GDPR Compliance",         sv: "GDPR-efterlevnad" },
      description: {
        en: "We process personal data in accordance with the General Data Protection Regulation (GDPR).",
        sv: "Vi behandlar personuppgifter i enlighet med Dataskyddsförordningen (GDPR).",
      },
    },
    {
      icon: Globe,
      title:       { en: "EU-Based Operations",     sv: "Verksamhet inom EU" },
      description: {
        en: "EventPartner is based in the European Union and operates under European data protection requirements.",
        sv: "EventPartner är baserat inom Europeiska unionen och följer europeiska krav på dataskydd och integritet.",
      },
    },
    {
      icon: UserCheck,
      title:       { en: "Access Management",       sv: "Åtkomsthantering" },
      description: {
        en: "Access to customer information is limited to authorized personnel who require it to perform their work.",
        sv: "Tillgång till kundinformation är begränsad till behöriga medarbetare som behöver informationen för att kunna utföra sitt arbete.",
      },
    },
    {
      icon: Lock,
      title:       { en: "Data Minimization",       sv: "Dataminimering" },
      description: {
        en: "We only collect and process information necessary to provide our services.",
        sv: "Vi samlar endast in och behandlar den information som är nödvändig för att kunna leverera våra tjänster.",
      },
    },
    {
      icon: Eye,
      title:       { en: "Transparency",            sv: "Transparens" },
      description: {
        en: "We believe in clear communication about what data we collect, why we collect it, and how it is used.",
        sv: "Vi tror på tydlig kommunikation kring vilken information vi samlar in, varför vi samlar in den och hur den används.",
      },
    },
    {
      icon: Server,
      title:       { en: "Continuous Improvement",  sv: "Kontinuerlig utveckling" },
      description: {
        en: "Our security and privacy practices are continuously reviewed and developed as the platform evolves.",
        sv: "Våra rutiner för säkerhet och integritet granskas och utvecklas löpande i takt med att plattformen växer.",
      },
    },
  ],

  complianceLabel:    { en: "COMPLIANCE & GOVERNANCE",                      sv: "REGELEFTERLEVNAD & STYRNING" },
  complianceHeadline: { en: "Working towards",                              sv: "Vi arbetar enligt" },
  complianceAccent:   { en: "industry best practices.",                     sv: "etablerade säkerhetsprinciper." },
  complianceIntro:    {
    en: "EventPartner is committed to operating in line with recognized information security principles and best practices. Our focus includes:",
    sv: "EventPartner strävar efter att bedriva verksamheten enligt erkända principer och best practice inom informationssäkerhet. Vårt fokus omfattar:",
  },
  complianceBullets: {
    en: [
      "GDPR compliance",
      "Privacy by design",
      "Secure handling of customer information",
      "Ongoing review of internal processes",
      "Continuous improvement aligned with internationally recognized security frameworks, including ISO 27001 principles",
    ],
    sv: [
      "Efterlevnad av GDPR",
      "Privacy by Design",
      "Säker hantering av kundinformation",
      "Löpande översyn av interna processer",
      "Kontinuerlig utveckling i linje med internationellt erkända säkerhetsramverk, inklusive principerna bakom ISO 27001",
    ],
  },

  rightsLabel:    { en: "YOUR RIGHTS",                           sv: "DINA RÄTTIGHETER" },
  rightsHeadline: { en: "You remain",                            sv: "Du har kontroll" },
  rightsAccent:   { en: "in control.",                           sv: "över dina personuppgifter." },
  rightsIntro:    {
    en: "Under GDPR, you have important rights regarding your personal data. These include the right to:",
    sv: "Enligt GDPR har du ett antal rättigheter avseende dina personuppgifter. Dessa inkluderar rätten att:",
  },
  rights: [
    {
      right: { en: "Access Your Data",        sv: "Få tillgång till dina uppgifter" },
      desc:  { en: "Request information about what personal data we hold.", sv: "Begära information om vilka personuppgifter vi behandlar om dig." },
    },
    {
      right: { en: "Correct Your Data",       sv: "Rätta uppgifter" },
      desc:  { en: "Request updates or corrections to inaccurate information.", sv: "Begära att felaktig eller ofullständig information korrigeras." },
    },
    {
      right: { en: "Delete Your Data",        sv: "Få uppgifter raderade" },
      desc:  { en: "Request deletion of personal data where applicable under law.", sv: "Begära att personuppgifter raderas när det är tillämpligt enligt lag." },
    },
    {
      right: { en: "Data Portability",        sv: "Dataportabilitet" },
      desc:  { en: "Request a copy of your personal data in a commonly used format.", sv: "Begära en kopia av dina personuppgifter i ett vanligt förekommande och maskinläsbart format." },
    },
    {
      right: { en: "Object to Processing",    sv: "Invända mot behandling" },
      desc:  { en: "Object to certain types of data processing, including direct marketing.", sv: "Invända mot vissa typer av personuppgiftsbehandling, inklusive direktmarknadsföring." },
    },
    {
      right: { en: "Restrict Processing",     sv: "Begränsa behandling" },
      desc:  { en: "Request limitations on how personal data is processed in certain situations.", sv: "Begära att behandlingen av personuppgifter begränsas i vissa situationer." },
    },
  ],

  contactLabel:    { en: "CONTACT",                              sv: "KONTAKT" },
  contactHeadline: {
    en: "Questions about privacy",
    sv: "Har du frågor om",
  },
  contactAccent: {
    en: "or data protection?",
    sv: "integritet eller dataskydd?",
  },
  contactDescription: {
    en: "If you have questions regarding personal data, privacy, or wish to exercise your GDPR rights, please contact us.",
    sv: "Om du har frågor om personuppgifter, integritet eller vill utöva dina rättigheter enligt GDPR är du välkommen att kontakta oss.",
  },
  contactEmail: "privacy@eventpartner.io",

  badges: [
    "Designed with GDPR principles",
    "Security framework aligned with ISO 27001",
    "Following SOC 2 best practices",
    "Enterprise-grade security",
  ],

  finePrint: {
    en: "Security and privacy practices are internally implemented and continuously improved based on industry frameworks.",
    sv: "Säkerhets- och integritetsrutiner implementeras internt och förbättras kontinuerligt baserat på branschramverk.",
  },
};

type LangKey = "en" | "sv";

export function SecurityPageContent() {
  const locale = useLocale();
  const sv = locale === "sv";
  const l: LangKey = sv ? "sv" : "en";

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex justify-between items-center mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            {COPY.heroLabel[l]}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            {COPY.heroLabelRight[l]}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tiffany/10 border border-tiffany/20 mb-8">
            <Shield className="w-3.5 h-3.5 text-tiffany" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany">
              {COPY.heroBadge[l]}
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88]">
            {COPY.heroHeadline[l]}<br />
            <span className="text-tiffany">{COPY.heroAccent[l]}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl"
        >
          {COPY.heroSubtitle[l]}
        </motion.p>
      </section>

      {/* ── Scrolling Ticker ─────────────────────────────────────────────── */}
      <SecurityTicker />

      {/* ── Security Foundations ─────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">
            {COPY.pillarsLabel[l]}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">
            {COPY.pillarsHeadline[l]}<br />{COPY.pillarsAccent[l]}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COPY.pillars.map((p, i) => (
            <motion.div
              key={p.title.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
              className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] group hover:border-tiffany/20 hover:shadow-lg hover:shadow-tiffany/[0.03] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-tiffany/10 flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-tiffany" />
              </div>
              <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-2">{p.title[l]}</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]">{p.description[l]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Compliance & Governance ──────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">
            {COPY.complianceLabel[l]}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">
            {COPY.complianceHeadline[l]}<br />{COPY.complianceAccent[l]}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
        >
          <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-6">
            {COPY.complianceIntro[l]}
          </p>
          <ul className="space-y-3">
            {COPY.complianceBullets[l].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-tiffany/60" />
                <span className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Your Rights ──────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">
              {COPY.rightsLabel[l]}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">
              {COPY.rightsHeadline[l]}<br />{COPY.rightsAccent[l]}
            </h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mt-6">
              {COPY.rightsIntro[l]}
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-7 lg:col-start-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            <div className="space-y-0 divide-y divide-[var(--border-default)]">
              {COPY.rights.map((r) => (
                <div key={r.right.en} className="py-5 first:pt-0 last:pb-0">
                  <h4 className="text-[16px] font-medium text-[var(--text-primary)] mb-1">{r.right[l]}</h4>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">{r.desc[l]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact / Privacy questions ──────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="p-8 md:p-10 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-tiffany/15 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-tiffany" />
            </div>
            <div>
              <h3 className="font-display text-xl font-medium text-white mb-1">
                {COPY.contactHeadline[l]}{" "}{COPY.contactAccent[l]}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                {COPY.contactLabel[l]}
              </p>
            </div>
          </div>
          <p className="text-[15px] text-white/50 leading-[1.7] mb-6 max-w-2xl">
            {COPY.contactDescription[l]}
          </p>
          <a
            href={`mailto:${COPY.contactEmail}`}
            className="inline-flex items-center gap-2 text-tiffany text-sm font-medium hover:text-[#5EC4BA] transition-colors duration-300"
          >
            {COPY.contactEmail}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* ── Fine print ───────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10">
        <p className="text-[11px] text-[var(--text-muted)] text-center mt-12 opacity-55 max-w-xl mx-auto leading-relaxed font-sans">
          {COPY.finePrint[l]}
        </p>
      </section>
    </main>
  );
}
