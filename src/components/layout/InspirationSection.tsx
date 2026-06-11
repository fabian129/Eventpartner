"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mic2, Utensils, Users, Lightbulb, PartyPopper, Presentation } from "lucide-react";

/**
 * InspirationSection — "Vad vi hjälper till med att boka"
 * 
 * Design: Executive glassmorphic panel. Dark elevated section that
 * creates a visual "stop" moment. Rich detail cards with icons,
 * descriptions and subtle imagery — not just image cards.
 * 
 * Moodboard v6: "Tech möter Hospitality" / "Stripe-inspirerad renhet"
 */

const SERVICES = [
  {
    icon: Presentation,
    title: "Konferens & möten",
    description: "Från intima styrelsemöten till storskaliga konferenser med hundratals deltagare. Vi matchar format, teknik och venue.",
    stat: "2,400+",
    statLabel: "konferensvenues",
    image: "/Images/interior-large-building-with-glass-ceiling.webp",
  },
  {
    icon: Lightbulb,
    title: "Aktiviteter",
    description: "Teambuilding, workshops och upplevelser som skapar bestående minnen. Skräddarsytt efter era mål.",
    stat: "180+",
    statLabel: "aktivitetspartners",
    image: "/Images/colorful-seoul-floating-island.webp",
  },
  {
    icon: Utensils,
    title: "Catering",
    description: "Från standing lunch till sju-rätters gala. Vi kopplar er med rätt cateringleverantör för varje tillfälle.",
    stat: "340+",
    statLabel: "cateringpartners",
    image: "/Images/decorated-hall-wedding-is-ready-celebration.webp",
  },
  {
    icon: Mic2,
    title: "Talare & underhållning",
    description: "Keynote-speakers, moderatorer, artister och DJ:s. Vi bokar rätt profil för ert event och budget.",
    stat: "500+",
    statLabel: "profiler",
    image: "/Images/palace-culture-iasi-romania.webp",
  },
  {
    icon: PartyPopper,
    title: "Middagar & galor",
    description: "Representationsmiddagar, jubileer och galor i venues som gör intryck. Helhetskoordinering från meny till platsplanering.",
    stat: "100%",
    statLabel: "skräddarsytt",
    image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.webp",
  },
  {
    icon: Users,
    title: "Kick-off",
    description: "Starter som sätter tonen för hela året. Vi bygger upplevelser som inspirerar team och driver kultur framåt.",
    stat: "48h",
    statLabel: "snitt svarstid",
    image: "/Images/hotel-lobby.webp",
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl hover:bg-white/[0.07] hover:border-tiffany/20 transition-all duration-500"
    >
      {/* Subtle image accent — top strip */}
      <div className="relative h-[120px] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover grayscale brightness-[0.3] group-hover:grayscale-0 group-hover:brightness-[0.45] transition-all duration-[1.2s] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0e12]" />
        
        {/* Stat overlay */}
        <div className="absolute bottom-3 right-4 text-right">
          <span className="font-display text-xl font-medium text-white/80 block leading-none">{service.stat}</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">{service.statLabel}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-tiffany/10 border border-tiffany/15 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-tiffany" />
          </div>
          <h3 className="font-display text-base font-medium text-white tracking-tight">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[13px] text-white/40 leading-relaxed font-sans">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export function InspirationSection() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "#0c0e12" }}>
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse closest-side, rgba(106,216,210,0.04), transparent)" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header — big, authoritative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 md:mb-8 max-w-2xl"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tiffany mb-4">
            Fullservice-partner
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]">
            Allt ni behöver.
            <br />
            <span className="italic font-light text-white/40">En förfrågan.</span>
          </h2>
        </motion.div>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base text-white/30 max-w-lg leading-relaxed mb-14 md:mb-20 font-sans"
        >
          Från venue-scouting till fullskalig leverans. Vi skapar event som bygger ert varumärke och överträffar förväntningar — oavsett storlek eller komplexitet.
        </motion.p>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom detail line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-14 md:mt-20 flex items-center justify-between border-t border-white/[0.06] pt-8"
        >
          <p className="text-[13px] text-white/25 font-sans max-w-md">
            Varje förfrågan hanteras av ett dedikerat team. Ni får alltid minst 3 kurerade förslag — inom 24 timmar.
          </p>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <span className="font-display text-2xl font-medium text-white block leading-none">3st</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25">kurerade förslag</span>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.06]" />
            <div className="text-right">
              <span className="font-display text-2xl font-medium text-white block leading-none">24h</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25">max svarstid</span>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.06]" />
            <div className="text-right">
              <span className="font-display text-2xl font-medium text-white block leading-none">0 kr</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25">kostnad</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
