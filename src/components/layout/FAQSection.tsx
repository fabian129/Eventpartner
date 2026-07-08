"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";
import { DotGrid } from "@/components/ui/DotGrid";

const EASE = [0.16, 1, 0.3, 1] as const;



interface FaqCMS {
  label?: string;
  labelRight?: string;
  headline?: string;
  description?: string;
  items?: { question: string; answer: string }[];
  ctaText?: string;
  ctaLink?: string;
}

export function FAQSection({ cms }: { cms?: FaqCMS }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const t = useTranslations('faq');
  const sv = useLocale() === 'sv';

  const DEFAULT_FAQS = [
    {
      question: sv ? "Vad kostar det att använda EventPartner?" : "What does it cost to use EventPartner?",
      answer: sv ? "Att skicka en förfrågan och ta emot lokalförslag är helt gratis. Vår tjänst finansieras av lokalerna, vilket innebär att det inte finns några dolda kostnader eller avgifter för er." : "Sending an inquiry and receiving venue proposals is completely free. Our service is funded by the venues, meaning there are no hidden costs or fees for you.",
    },
    {
      question: sv ? "Hur snabbt får jag svar?" : "How quickly will I get a response?",
      answer: sv ? "Vår genomsnittliga svarstid är 23h, men vi återkommer alltid från 48 timmar. För brådskande ärenden kan vi ofta leverera förslag ännu snabbare — kontakta oss direkt så prioriterar vi er." : "Our average response rate is 23h, but we always respond from 48 hours. For urgent matters, we can often deliver proposals even faster — contact us directly and we'll prioritize you.",
    },
    {
      question: sv ? "Vilka länder och städer täcker ni?" : "Which countries and cities do you cover?",
      answer: sv ? "Vi har lokaler i 175 länder — från Island till Cypern, från Portugal till Finland. Totalt över 340 000 venues. Oavsett om ni behöver ett konferenshotell i Stockholm eller en galalokal i Barcelona, hittar vi rätt." : "We have venues in 175 countries — from Iceland to Cyprus, from Portugal to Finland. Over 340,000 venues in total. Whether you need a conference hotel in Stockholm or a gala venue in Barcelona, we'll find the right one.",
    },
    {
      question: sv ? "Kan ni hantera riktigt stora event?" : "Can you handle really large events?",
      answer: sv ? "Absolut. Vi hanterar allt från styrelsemöten med 10 personer till stora internationella konferenser med tusentals deltagare. Vår projektledning och nätverk av leverantörer skalar efter era behov." : "Absolutely. We handle everything from intimate board meetings with 10 people to large-scale conferences with thousands of attendees. Our project management and supplier network scales to your needs.",
    },
    {
      question: sv ? "Vad händer om jag behöver ändra eller avboka?" : "What happens if I need to change or cancel?",
      answer: sv ? "Vi hanterar all kommunikation med lokaler och leverantörer åt er, inklusive ändringar och avbokningar. Villkoren varierar beroende på lokal och avtal, men vi säkerställer alltid full transparens gällande bokningen." : "We handle all communication with venues and suppliers on your behalf, including changes and cancellations. Terms vary depending on venue and agreement, but we always ensure full transparency regarding your booking.",
    },
    {
      question: sv ? "Hur skiljer sig EventPartner från att boka direkt?" : "How does EventPartner differ from booking directly?",
      answer: sv ? "Tre saker: vi sparar er tid genom att sköta all research och förhandling, vi får bättre priser tack vare vår volym, och vi ger er tillgång till lokaler och paket som inte alltid är publika. Dessutom får ni en dedikerad kontaktperson under hela processen." : "Three things: we save you time by handling all research and negotiation, we get better prices thanks to our volume, and we give you access to venues and packages not always publicly available. Plus you get a dedicated contact person throughout the entire process.",
    },
    {
      question: sv ? "Jobbar ni bara med stora företag?" : "Do you only work with large companies?",
      answer: sv ? "Nej — vi hjälper företag i alla storlekar. Från startups som planerar sin första kickoff till globala koncerner med löpande eventbehov. Processen är densamma: ni berättar vad ni söker, vi levererar." : "No — we help companies of all sizes. From startups planning their first kick-off to global corporations with ongoing event needs. The process is the same: you tell us what you're looking for, we deliver.",
    },
  ];

  const rawFaqs = cms?.items?.length ? cms.items : DEFAULT_FAQS;
  const faqs = rawFaqs.map(faq => ({
    ...faq,
    answer: faq.answer
      .replace(/within 24 hours/gi, "from 48 hours")
      .replace(/inom 24 timmar/gi, "från 48 timmar")
      .replace(/24h/gi, "48h")
      .replace(/24 timmar/gi, "48 timmar")
  }));

  return (
    <section id="faq" className="relative w-full py-24 md:py-32">
      <DotGrid bleedBottom={100} mirror />
      <div className="relative z-[1] max-w-[900px] mx-auto px-6 md:px-10">
        {/* Moodboard editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-14 md:mb-16"
        >
          {/* Mono labels */}
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.label || t('label')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.labelRight || `${faqs.length} ${sv ? "frågor" : "questions"}`}
            </span>
          </div>

          {/* Big heading */}
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">
            {cms?.headline || t('fallbackTitle')}
          </h2>

          {/* Description */}
          <p className="font-display text-[clamp(1rem,2vw,1.3rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-xl">
            {cms?.description || t('fallbackDescription')}
          </p>
        </motion.div>

        {/* FAQ Accordion — staggered with growing line */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-300 ${
                    isOpen
                      ? isDark
                        ? "border-tiffany/20 bg-tiffany/[0.03]"
                        : "border-tiffany/25 bg-tiffany/[0.03]"
                      : isDark
                        ? "border-white/[0.06] bg-[#111]/50 hover:border-white/[0.1]"
                        : "border-black/[0.06] bg-white hover:border-black/[0.1]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Number accent */}
                      <span className={`font-mono text-[10px] font-semibold tracking-wider transition-colors duration-300 ${
                        isOpen ? "text-tiffany" : "text-[var(--text-dim)]"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-[15px] font-medium transition-colors duration-300 ${
                        isOpen ? "text-tiffany" : "text-[var(--text-primary)]"
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`} />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-[14px] text-[var(--text-muted)] leading-relaxed pt-4 pl-9 pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="text-center mt-12"
        >
          <p className="text-[14px] text-[var(--text-muted)] mb-3">
            {cms?.ctaText || "Can't find the answer you're looking for?"}
          </p>
          <a
            href="mailto:support@eventpartner.io"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-tiffany hover:text-[#A3E4DE] transition-colors duration-300"
          >
            {cms?.ctaLink || "Contact us directly →"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
