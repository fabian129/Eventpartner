"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { ChevronDown, MessageCircle, ArrowRight, HelpCircle, Search } from "lucide-react";
import { useSmoothScroll } from "@/components/utils/SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;



interface FaqCMS {
  heroLabel?: string;
  heroLabelRight?: string;
  heroHeadline?: string;
  heroHeadlineAccent?: string;
  heroSubtitle?: string;
  faqs?: { question: string; answer: string }[];
  ctaHeadline?: string;
  ctaDescription?: string;
}

function AccordionItem({ faq, index, isOpen, onToggle }: { faq: { question: string; answer: string }; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE }}
      className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl hover:border-tiffany/20 transition-colors duration-300 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 p-6 md:p-8 text-left group"
      >
        <div className="flex items-start gap-4 min-w-0">
          <span className="font-mono text-[10px] text-tiffany mt-1.5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[17px] md:text-lg font-medium text-[var(--text-primary)] leading-snug">
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="shrink-0 w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center group-hover:border-tiffany/30 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 ml-0 md:ml-[52px]">
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.8]">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqPageContent({ cms }: { cms?: FaqCMS }) {
  const sv = useLocale() === 'sv';
  const DEFAULT_FAQS = [
    {
      question: sv ? "Hur fungerar EventPartner?" : "How does EventPartner work?",
      answer: sv ? "Skicka in era önskemål via vårt formulär. Vår genomsnittliga svarstid är 23h, men vi återkommer alltid från 48 timmar med skräddarsydda förslag." : "Simply submit your event requirements through our request form. Our average response rate is 23h, but we always get back to you from 48 hours with tailored proposals."
    },
    {
      question: sv ? "Vilka länder täcker ni?" : "Which countries do you cover?",
      answer: sv ? "Vi arbetar i 175 länder med tillgång till 340 000+ lokaler. Från Skandinavien till Medelhavet kan vi hitta den perfekta lokalen för ert event var som helst i världen." : "We operate across 175 countries with access to 340,000+ venues. From Scandinavia to the Mediterranean, we can source the perfect venue for your event anywhere around the globe."
    },
    {
      question: sv ? "Kostar det något att använda EventPartners tjänst?" : "Is there a cost to use EventPartner's service?",
      answer: sv ? "Vår tjänst för lokalsökning och förslag är helt kostnadsfri för eventplanerare. Vi får vår provision från lokalsidan, vilket innebär att ni får expertvägledning och flera alternativ utan extra kostnad." : "Our venue sourcing and proposal service is completely free for event planners. We earn our commission from the venue side, which means you get expert guidance and multiple options at no additional cost."
    },
    {
      question: sv ? "Hur snabbt kan jag få lokalförslag?" : "How quickly can I get venue proposals?",
      answer: sv ? "Vår genomsnittliga svarstid är 23h, men vi återkommer alltid från 48 timmar. Vid brådskande ärenden kan vi ofta leverera förslag ännu snabbare — kontakta oss direkt så prioriterar vi er." : "Our average response rate is 23h, but we always respond from 48 hours. For urgent requests, we can often deliver proposals even faster — contact us directly and we'll prioritize you."
    },
    {
      question: sv ? "Vilka typer av evenemang hanterar ni?" : "What types of events do you handle?",
      answer: sv ? "Vi hanterar allt från intima styrelsemiddagar (10 gäster) till storskaliga företagskonferenser (tusentals deltagare). Vår expertis täcker konferenser, teambuilding-events, produktlanseringar, galor, incitamentsresor och mer." : "We handle everything from intimate board dinners (10 guests) to large-scale corporate conferences (thousands of attendees). Our expertise covers conferences, team-building events, product launches, galas, incentive trips, and more."
    },
    {
      question: sv ? "Kan jag besöka lokaler innan jag bokar?" : "Can I visit venues before booking?",
      answer: sv ? "Absolut. Vi arrangerar platsbesök och virtuella turer för utvalda lokaler. Våra lokala kontakter kan underlätta visningar, och vi tillhandahåller detaljerade fotogallerier och 360°-vyer för att hjälpa er att fatta ett välgrundat beslut." : "Absolutely. We arrange site visits and virtual tours for shortlisted venues. Our local contacts can facilitate walkthroughs, and we provide detailed photo galleries and 360° views to help you make an informed decision."
    },
    {
      question: sv ? "Vad är VIP-programmet?" : "What is the VIP Programme?",
      answer: sv ? "Vårt VIP-program erbjuder prioriterad service, exklusiva priser, dedikerad account management och tillgång till premiumlokaler som inte är tillgängliga via standardkanaler. Det är utformat för företag som anordnar frekventa events och vill ha ett långsiktigt partnerskap." : "Our VIP Programme offers priority service, exclusive pricing, dedicated account management, and access to premium venues not available through standard channels. It's designed for companies that host frequent events and want a long-term partnership."
    },
    {
      question: sv ? "Hur blir jag VIP-medlem?" : "How do I become a VIP member?",
      answer: sv ? "VIP-medlemskap är tillgängligt via ansökan. Besök vår VIP-sida för att lära dig mer om programmet och dess fördelar, eller kontakta vårt team direkt för att diskutera er eventvolym och behov." : "VIP membership is available by application. Visit our VIP page to learn more about the programme and its benefits, or contact our team directly to discuss your event volume and needs."
    },
  ];
  const rawFaqs = cms?.faqs || DEFAULT_FAQS;
  const faqs = rawFaqs.map(faq => ({
    ...faq,
    answer: faq.answer
      .replace(/within 24 hours/gi, "from 48 hours")
      .replace(/inom 24 timmar/gi, "från 48 timmar")
      .replace(/24h/gi, "48h")
      .replace(/24 timmar/gi, "48 timmar")
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const lenis = useSmoothScroll();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex justify-between items-center mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            {cms?.heroLabel || (sv ? "Vanliga frågor" : "Frequently Asked Questions")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            {cms?.heroLabelRight || "Support"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[1.0] mb-10"
        >
          {cms?.heroHeadline || (sv ? "Har du" : "Got")}<br />
          <span className="text-tiffany">{cms?.heroHeadlineAccent || (sv ? "frågor?" : "questions?")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl"
        >
          {cms?.heroSubtitle || (sv ? "Allt du behöver veta om att jobba med EventPartner. Hittar du inte svaret? Vårt team är aldrig längre än ett meddelande bort." : "Everything you need to know about working with EventPartner. Can't find your answer? Our team is always just a message away.")}
        </motion.p>
      </section>

      {/* Search */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="relative max-w-xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={sv ? "Sök bland frågorna..." : "Search questions..."}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl pl-12 pr-4 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-tiffany/40 transition-colors"
          />
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <HelpCircle className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
              <p className="text-[var(--text-secondary)] text-lg">{sv ? "Inga matchande frågor hittades." : "No matching questions found."}</p>
              <p className="text-[var(--text-muted)] text-sm mt-1">{sv ? "Prova en annan sökning eller kontakta vårt team direkt." : "Try a different search or contact our team directly."}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <a
            href="/help"
            className="group flex items-center justify-between p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-tiffany/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-tiffany" />
              </div>
              <div>
                <p className="text-lg font-display font-medium text-[var(--text-primary)] mb-0.5">
                  {sv ? "Kontakta supporten" : "Contact Support"}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {sv ? "Hör av dig till vårt team för personlig hjälp." : "Reach out to our team for personalized help."}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center group-hover:bg-tiffany group-hover:text-black text-[var(--text-muted)] transition-all duration-300 shrink-0 ml-4">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
          <a
            href="/vip"
            className="group flex items-center justify-between p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-purple/30 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-purple" />
              </div>
              <div>
                <p className="text-lg font-display font-medium text-[var(--text-primary)] mb-0.5">
                  {sv ? "VIP-programmet" : "VIP Programme"}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {sv ? "Prioriterad support med dedikerad kontaktperson." : "Priority support with dedicated account management."}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center group-hover:bg-purple group-hover:text-white text-[var(--text-muted)] transition-all duration-300 shrink-0 ml-4">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a
          href="/help"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300"
        >
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">
              {cms?.ctaHeadline || (sv ? "Har du fler frågor?" : "Still have questions?")}
            </p>
            <p className="text-[var(--text-secondary)] text-sm">
              {cms?.ctaDescription || (sv ? "Skicka din fråga så återkommer vi inom 23 timmar." : "Send us your inquiry and we'll get back to you within 23 hours.")}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center group-hover:bg-tiffany group-hover:text-black text-tiffany transition-all duration-300 shrink-0 ml-6">
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.a>
      </section>
    </main>
  );
}
