"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    question: "Vad kostar det att använda EventPartner?",
    answer: "Att skicka en förfrågan och få venue-förslag är helt kostnadsfritt. Vi tar en serviceavgift först när ni bokar — och den är alltid transparent och överenskommen i förväg. Inga dolda kostnader.",
  },
  {
    question: "Hur snabbt får jag svar på min förfrågan?",
    answer: "Vi återkommer alltid inom 24 timmar med skräddarsydda förslag som matchar era behov. Vid brådskande ärenden kan vi ofta leverera snabbare — kontakta oss direkt så prioriterar vi er.",
  },
  {
    question: "Vilka länder och städer täcker ni?",
    answer: "Vi har venues i 36 europeiska länder — från Island till Cypern, från Portugal till Finland. Totalt över 360,000 venues. Oavsett om ni behöver ett konferenshotell i Stockholm eller en gala-venue i Barcelona, vi hittar rätt.",
  },
  {
    question: "Kan ni hantera riktigt stora evenemang?",
    answer: "Absolut. Vi hanterar allt från intima styrelsemöten med 10 personer till storskaliga konferenser med tusentals deltagare. Vår projektledning och vårt nätverk av leverantörer skalas efter era behov.",
  },
  {
    question: "Vad händer om jag behöver ändra eller avboka?",
    answer: "Vi hanterar all kommunikation med venues och leverantörer åt er, inklusive ändringar och avbokningar. Villkoren varierar beroende på venue och avtal, men vi ser alltid till att ni har full transparens kring er bokning.",
  },
  {
    question: "Hur skiljer sig EventPartner från att boka direkt?",
    answer: "Tre saker: vi sparar er tid genom att sköta all research och förhandling, vi har bättre priser tack vare vår volym, och vi ger er tillgång till venues och paket som inte alltid är publikt tillgängliga. Plus att ni får en dedikerad kontaktperson genom hela processen.",
  },
  {
    question: "Jobbar ni bara med stora företag?",
    answer: "Nej — vi hjälper företag i alla storlekar. Från startups som planerar sin första kick-off till globala koncerner med löpande eventbehov. Processen är densamma: ni berättar vad ni söker, vi levererar.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="faq" className="relative w-full py-24 md:py-32 overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        {/* Header — cinematic blur entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
            <span className="text-[#81D8D0] text-xs">◆</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Vanliga frågor</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Har du frågor?
            <br />
            <span className="italic font-light text-[var(--text-muted)]">Vi har svar.</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion — staggered with growing line */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-300 ${
                    isOpen
                      ? isDark
                        ? "border-[#81D8D0]/20 bg-[#81D8D0]/[0.03]"
                        : "border-[#81D8D0]/25 bg-[#81D8D0]/[0.03]"
                      : isDark
                        ? "border-white/[0.06] bg-[#111]/50 hover:border-white/[0.1]"
                        : "border-black/[0.06] bg-white hover:border-black/[0.1]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Number accent */}
                      <span className={`font-mono text-[10px] font-semibold tracking-wider transition-colors duration-300 ${
                        isOpen ? "text-[#81D8D0]" : "text-[var(--text-dim)]"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-[15px] font-medium transition-colors duration-300 ${
                        isOpen ? "text-[#81D8D0]" : "text-[var(--text-primary)]"
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
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="text-center mt-12"
        >
          <p className="text-[14px] text-[var(--text-muted)] mb-3">
            Hittar du inte svaret du söker?
          </p>
          <a
            href="#request"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#81D8D0] hover:text-[#A3E4DE] transition-colors duration-300"
          >
            Kontakta oss direkt →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
