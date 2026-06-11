"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useLocale } from "next-intl";
import { BOOKING_LINKS } from "@/lib/bookingLinks";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────
   INLINE COPY — Swedish + English
   ───────────────────────────────────────────── */

const COPY = {
  sv: {
    heroLabel: "EventPartner AI – Event Assistant",
    heroHeadline: "Få rätt personer till ditt event",
    heroHeadlineAccent: "– automagiskt",
    heroIntro:
      "Att arrangera ett event är enkelt jämfört med att få rätt personer att faktiskt närvara. Oavsett om du arrangerar en kunddag, konferens, partnerträff, frukostseminarium eller intern kickoff avgör deltagarna i slutändan eventets värde. Fel publik innebär ofta en kostnad. Rätt publik kan däremot skapa nya affärer, stärka relationer och generera avkastning långt över investeringen. Därför erbjuder EventPartner en AI-driven Event Assistant som hjälper dig att identifiera, bjuda in och kommunicera med rätt personer före, under och efter eventet.",

    roiSectionLabel: "ROI & Deltagarrekrytering",
    roiTitle: "ROI börjar långt innan eventdagen",
    roiDescription:
      "Många företag lägger stora resurser på lokal, mat, innehåll och logistik – men betydligt mindre på själva deltagarrekryteringen. Resultatet blir ofta att:",
    roiIssues: [
      "Fel personer tackar ja",
      "Nyckelbeslutsfattare uteblir",
      "Inbjudningar glöms bort",
      "Uppföljningen blir bristfällig",
      "Eventet får lägre affärsvärde än det borde",
    ],
    roiQuote:
      "Det spelar ingen roll hur bra eventet är om rätt personer inte är där.",
    roiStat:
      "Enligt flera branschundersökningar uppger över 70 % av B2B-marknadsförare att event är en av deras mest effektiva kanaler för att generera affärer. Samtidigt är deltagarrekrytering och uppföljning två av de största utmaningarna för att skapa faktisk ROI.",
    roiStatHighlight: "70 %",
    roiStatHighlightLabel: "av B2B-marknadsförare",
    roiStatHighlightSub:
      "anger event som en av sina mest effektiva kanaler för affärsgenerering",

    botSectionLabel: "AI-assistenten",
    botTitle: "En virtuell eventassistent som arbetar dygnet runt",
    botIntro: "Vår AI Event Assistant hjälper dig att:",
    botFeatures: [
      "Identifiera relevanta beslutsfattare och målgrupper",
      "Bjuda in deltagare via LinkedIn och e-post",
      "Följa upp automatiskt före eventet",
      "Besvara vanliga frågor från deltagare",
      "Skicka påminnelser vid rätt tidpunkt",
      "Hantera intern kommunikation kring eventet",
      "Säkerställa högre närvaro och bättre deltagarkvalitet",
      "Fortsätta dialogen efter eventet",
    ],
    botSummary:
      "All kommunikation sker professionellt, personligt och skalbart – utan att du behöver lägga timmar på manuellt arbete.",

    foundersSectionLabel: "Grundarteamet",
    foundersTitle: "Byggt av människor som kan försäljning",
    foundersBody:
      "EventPartners grundare har tillsammans över 30 års erfarenhet av B2B-försäljning, marknadsföring och affärsutveckling. Vi vet att ett event inte bara handlar om att fylla en lokal. Det handlar om att skapa affärsvärde. Det handlar om att få rätt personer på rätt plats vid rätt tidpunkt. Och det handlar om att säkerställa att varje investerad krona faktiskt bidrar till företagets mål.",

    ctaSectionLabel: "Kom igång",
    ctaTitle: "Fokusera på eventet – vi hjälper dig fylla det",
    ctaBody:
      "Med vår AI Event Assistant kan du fokusera på det som verkligen spelar roll: Att skapa ett fantastiskt event. Samtidigt arbetar vår assistent i bakgrunden med att identifiera, kontakta, följa upp och engagera rätt deltagare. Resultatet blir högre närvaro, bättre möten, fler affärsmöjligheter och ett betydligt starkare ROI från varje event du arrangerar.",
    ctaClose:
      "Vi ser fram emot att introducera ert företag till EP-assistant, och framtidens sätt att öka intäkterna från era event redan idag!",
    ctaButton: "Boka ett 15-minuters samtal",
  },
  en: {
    heroLabel: "EventPartner AI – Event Assistant",
    heroHeadline: "Get the right people to your event",
    heroHeadlineAccent: "– automatically",
    heroIntro:
      "Organising an event is straightforward compared to getting the right people to actually attend. Whether you are running a customer day, conference, partner meeting, breakfast seminar or internal kick-off, it is ultimately the attendees who determine the event's value. The wrong audience is a cost. The right audience can generate new business, strengthen relationships and deliver returns that far exceed the investment. That is why EventPartner offers an AI-powered Event Assistant that helps you identify, invite and communicate with the right people before, during and after the event.",

    roiSectionLabel: "ROI & Attendee Acquisition",
    roiTitle: "ROI starts long before event day",
    roiDescription:
      "Many companies invest heavily in venues, catering, content and logistics — but put far less effort into actual attendee recruitment. The result is often that:",
    roiIssues: [
      "The wrong people say yes",
      "Key decision-makers do not show up",
      "Invitations are forgotten",
      "Follow-up is insufficient",
      "The event delivers less business value than it should",
    ],
    roiQuote:
      "It does not matter how great the event is if the right people are not there.",
    roiStat:
      "According to multiple industry surveys, more than 70% of B2B marketers say events are one of their most effective channels for generating business. At the same time, attendee recruitment and follow-up are two of the biggest challenges when it comes to creating real ROI.",
    roiStatHighlight: "70%",
    roiStatHighlightLabel: "of B2B marketers",
    roiStatHighlightSub:
      "cite events as one of their most effective business-generating channels",

    botSectionLabel: "The AI Assistant",
    botTitle: "A virtual event assistant that works around the clock",
    botIntro: "Our AI Event Assistant helps you:",
    botFeatures: [
      "Identify relevant decision-makers and target audiences",
      "Invite attendees via LinkedIn and email",
      "Follow up automatically before the event",
      "Answer common questions from attendees",
      "Send reminders at exactly the right time",
      "Handle internal communication around the event",
      "Ensure higher attendance and better attendee quality",
      "Continue the dialogue after the event",
    ],
    botSummary:
      "All communication is handled professionally, personally and at scale — without you having to spend hours on manual work.",

    foundersSectionLabel: "The Founding Team",
    foundersTitle: "Built by people who know sales",
    foundersBody:
      "The founders of EventPartner collectively bring over 30 years of experience in B2B sales, marketing and business development. We know that an event is not just about filling a room. It is about creating business value. It is about getting the right people in the right place at the right time. And it is about ensuring that every invested krona actually contributes to the company's goals.",

    ctaSectionLabel: "Get Started",
    ctaTitle: "Focus on the event — we'll help you fill it",
    ctaBody:
      "With our AI Event Assistant you can focus on what truly matters: creating a fantastic event. Meanwhile, our assistant works in the background identifying, contacting, following up and engaging the right attendees. The result is higher attendance, better meetings, more business opportunities and a significantly stronger ROI from every event you run.",
    ctaClose:
      "We look forward to introducing your company to EP-assistant — and the future of increasing revenue from your events, starting today.",
    ctaButton: "Book a 15-min call",
  },
};

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export function AiAssistantContent() {
  const locale = useLocale();
  const c = locale === "sv" ? COPY.sv : COPY.en;

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex justify-between items-center mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">
            {c.heroLabel}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight text-[var(--text-primary)] leading-[1.05] mb-8"
        >
          {c.heroHeadline}
          <br />
          <span className="text-tiffany">{c.heroHeadlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-[clamp(1rem,1.5vw,1.125rem)] text-[var(--text-secondary)] leading-[1.8] max-w-3xl"
        >
          {c.heroIntro}
        </motion.p>
      </section>

      {/* ── ROI Section ──────────────────────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-3xl bg-[var(--bg-card)] border border-[var(--border-default)] p-8 md:p-16"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

          {/* Section label */}
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-8">
            {c.roiSectionLabel}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left — issues */}
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6">
                {c.roiTitle}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                {c.roiDescription}
              </p>
              <ul className="space-y-4">
                {c.roiIssues.map((issue, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="flex items-start gap-3"
                  >
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--text-secondary)]">{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right — stat card + quote */}
            <div className="flex flex-col gap-6 justify-center">
              {/* 70 % highlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="p-8 rounded-2xl bg-tiffany/[0.07] border border-tiffany/20 text-center"
              >
                <span className="font-display text-[4rem] font-bold text-tiffany leading-none block mb-2">
                  {c.roiStatHighlight}
                </span>
                <span className="font-medium text-[var(--text-primary)] block mb-1">
                  {c.roiStatHighlightLabel}
                </span>
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {c.roiStatHighlightSub}
                </span>
              </motion.div>

              {/* Quote */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-xl md:text-2xl font-medium text-[var(--text-primary)] mb-6 leading-relaxed">
                  &ldquo;{c.roiQuote}&rdquo;
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  {c.roiStat}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Bot Feature List ──────────────────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/[0.06] p-8 md:p-16"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tiffany/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — title / intro */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-8">
                {c.botSectionLabel}
              </span>
              <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center mb-8">
                <Bot className="w-6 h-6 text-tiffany" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                {c.botTitle}
              </h2>
              <div className="flex items-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 mb-8 inline-flex">
                <Sparkles className="w-4 h-4 text-tiffany animate-pulse" />
                <span className="text-white/70 text-sm font-mono uppercase tracking-wider">
                  AI-powered
                </span>
              </div>
              <p className="text-white/70 text-lg mb-4 leading-relaxed font-medium">
                {c.botIntro}
              </p>
              <p className="text-white/50 leading-relaxed">
                {c.botSummary}
              </p>
            </div>

            {/* Right — feature checklist */}
            <div className="flex flex-col justify-center">
              <ul className="space-y-5">
                {c.botFeatures.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]"
                  >
                    <CheckCircle2 className="w-6 h-6 text-tiffany shrink-0 mt-0.5" />
                    <span className="text-white/80 text-lg">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Founders / Sales experience ───────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-8">
            {c.foundersSectionLabel}
          </span>
          <div className="w-16 h-16 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center mx-auto mb-8">
            <Users className="w-6 h-6 text-[var(--text-secondary)]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-8">
            {c.foundersTitle}
          </h2>
          <p className="text-[1.125rem] text-[var(--text-secondary)] leading-[1.8]">
            {c.foundersBody}
          </p>
        </motion.div>
      </section>

      {/* ── CTA Section ────────────────────────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-3xl bg-tiffany p-10 md:p-16 text-black text-center"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/60 block mb-6 relative z-10">
            {c.ctaSectionLabel}
          </span>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 relative z-10">
            {c.ctaTitle}
          </h2>

          <div className="text-black/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 relative z-10 leading-relaxed space-y-4">
            <p>{c.ctaBody}</p>
            <p className="font-medium text-black/90">{c.ctaClose}</p>
          </div>

          <a
            href={BOOKING_LINKS.aiAssistant}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-black/80 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20"
          >
            {c.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
