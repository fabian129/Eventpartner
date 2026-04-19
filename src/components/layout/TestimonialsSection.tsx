"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * TestimonialsSection — Cinematic fullbleed with sideways-scrolling cards.
 *
 * Dark venue image as background. Two rows of glassmorphic testimonial
 * cards scrolling in opposite directions (infinite marquee).
 * Creates a "wall of praise" moment.
 */

const TESTIMONIALS_ROW_1 = [
  {
    quote: "EventPartner hanterade hela vår europakonferens med 400 deltagare. Från venue-sourcing till on-site koordinering — felfritt.",
    name: "Anna Lindström",
    title: "Head of Events",
    company: "Nordic Enterprise Group",
  },
  {
    quote: "Vi testade tre andra plattformar innan vi hittade EventPartner. Skillnaden? De lyssnar faktiskt. Förslagen var träffsäkra redan första gången.",
    name: "Marcus Weber",
    title: "Director of Operations",
    company: "TechScale GmbH",
  },
  {
    quote: "Att boka venues i fem olika länder för vår kick-off-turné lät som en mardröm. EventPartner gjorde det till en sömlös process.",
    name: "Sofia Bergman",
    title: "VP People & Culture",
    company: "Scandinavian Brands AB",
  },
  {
    quote: "Professionellt, snabbt och med en känsla för detaljer som vi aldrig upplevt förut. EventPartner satte en ny standard för oss.",
    name: "Erik Johansson",
    title: "CEO",
    company: "Momentum Nordic",
  },
];

const TESTIMONIALS_ROW_2 = [
  {
    quote: "Vår årliga gala med 600 gäster planerades på fyra veckor. EventPartner levererade perfekt — från venue till underhållning.",
    name: "Lena Eriksson",
    title: "Marketing Director",
    company: "Forte Group",
  },
  {
    quote: "De förstod direkt vad vi ville ha. Tre förslag inom 24 timmar, alla relevanta. Vi valde det första.",
    name: "Johan Andersson",
    title: "Head of Procurement",
    company: "Nexus Industries",
  },
  {
    quote: "Vi har kört 12 event med EventPartner senaste året. Alla utan problem. Det är en trygghet att veta att det bara fungerar.",
    name: "Maria Karlsson",
    title: "Operations Manager",
    company: "Axiom Consulting",
  },
  {
    quote: "Kickoffen i Barcelona blev årets höjdpunkt. EventPartner hittade en venue vi aldrig hade hittat själva. Magiskt.",
    name: "Daniel Ström",
    title: "Chief People Officer",
    company: "Zenith Digital",
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS_ROW_1[0] }) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[420px] p-7 md:p-8 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.10] hover:bg-white/[0.10] hover:border-white/[0.15] transition-all duration-500 group">
      {/* Quote icon */}
      <div className="w-9 h-9 rounded-xl bg-[#81D8D0]/10 border border-[#81D8D0]/20 flex items-center justify-center mb-5">
        <Quote className="w-3.5 h-3.5 text-[#81D8D0]" />
      </div>

      {/* Quote text */}
      <p className="text-[14px] text-white/70 leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-white/[0.06] pt-5">
        <div className="w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center text-[12px] font-semibold text-white/50">
          {testimonial.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <span className="block text-[13px] font-medium text-white/90 leading-tight">
            {testimonial.name}
          </span>
          <span className="block text-[11px] text-white/40 leading-tight mt-0.5">
            {testimonial.title}, {testimonial.company}
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ testimonials, direction = "left", speed = 35 }: {
  testimonials: typeof TESTIMONIALS_ROW_1;
  direction?: "left" | "right";
  speed?: number;
}) {
  // Double the items for seamless loop
  const items = [...testimonials, ...testimonials];
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div className="flex overflow-hidden py-2">
      <div
        className="flex gap-5 will-change-transform"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-28 md:py-36 overflow-hidden">
      {/* Fullbleed background image */}
      <Image
        src="/Images/conference-evening.jpg"
        alt="Event atmosphere"
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-[1]" />

      {/* Subtle gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-[2]" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#81D8D0]/[0.04] blur-[150px] pointer-events-none z-[2]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-14 md:mb-18 px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] mb-6">
            <span className="text-[#81D8D0] text-xs">◆</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Vad våra kunder säger</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.05]">
            Resultat som
            <br />
            <span className="italic font-light text-white/40">talar för sig.</span>
          </h2>
        </motion.div>

        {/* Scrolling testimonials — two rows, opposite directions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="space-y-5"
        >
          <MarqueeRow testimonials={TESTIMONIALS_ROW_1} direction="left" speed={40} />
          <MarqueeRow testimonials={TESTIMONIALS_ROW_2} direction="right" speed={45} />
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="mt-14 md:mt-20 flex items-center justify-center gap-10 md:gap-16 px-6"
        >
          {[
            { value: "4.9", label: "Snittbetyg" },
            { value: "2,048+", label: "Events levererade" },
            { value: "97%", label: "Rekommenderar oss" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-2xl md:text-3xl font-medium text-white block leading-none">{stat.value}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30 mt-1.5 block">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
