"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    quote: "EventPartner hanterade hela vår europakonferens med 400 deltagare. Från venue-sourcing till on-site koordinering — felfritt. Vi hade aldrig klarat det själva på den tidsramen.",
    name: "Anna Lindström",
    title: "Head of Events",
    company: "Nordic Enterprise Group",
  },
  {
    quote: "Vi testade tre andra plattformar innan vi hittade EventPartner. Skillnaden? De lyssnar faktiskt. Förslagen var träffsäkra redan första gången och vi sparade veckor i planeringstid.",
    name: "Marcus Weber",
    title: "Director of Operations",
    company: "TechScale GmbH",
  },
  {
    quote: "Att boka venues i fem olika länder för vår kick-off-turné lät som en mardröm. EventPartner gjorde det till en sömlös process. En kontaktperson, allt hanterat.",
    name: "Sofia Bergman",
    title: "VP People & Culture",
    company: "Scandinavian Brands AB",
  },
];

export function TestimonialsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section header — cinematic blur entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-14 md:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
            <span className="text-[#81D8D0] text-xs">◆</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Vad våra kunder säger</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Resultat som
            <br />
            <span className="italic font-light text-[var(--text-muted)]">talar för sig.</span>
          </h2>
        </motion.div>

        {/* Testimonial cards — staggered blur reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="group"
            >
              <div className={`h-full flex flex-col p-7 md:p-8 rounded-2xl border transition-all duration-400 ${
                isDark
                  ? "border-white/[0.06] bg-[#111]/50 hover:border-[#81D8D0]/15"
                  : "border-black/[0.06] bg-white hover:border-[#81D8D0]/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)]"
              }`}>
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-[#81D8D0]/8 border border-[#81D8D0]/15 flex items-center justify-center mb-5">
                  <Quote className="w-4 h-4 text-[#81D8D0]" />
                </div>

                {/* Quote text */}
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-[var(--border-default)] pt-5">
                  <div className="flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                      isDark
                        ? "bg-white/[0.06] text-white/40"
                        : "bg-black/[0.04] text-black/30"
                    }`}>
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <span className="block text-[14px] font-medium text-[var(--text-primary)] leading-tight">
                        {testimonial.name}
                      </span>
                      <span className="block text-[12px] text-[var(--text-muted)] leading-tight mt-0.5">
                        {testimonial.title}, {testimonial.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
