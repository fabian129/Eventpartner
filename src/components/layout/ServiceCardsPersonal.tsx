"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ServiceCardsPersonal — Lifestyle image grid with text overlay.
 *
 * Inspired by warm, personal product pages (Alveos-style).
 * Large rounded cards with fullbleed venue/event photography.
 * Title + description overlaid at the bottom with a soft gradient.
 * Mix of card sizes for visual rhythm.
 */

const SERVICES = [
  {
    title: "Konferens & Möten",
    description: "Från intima styrelsemöten till storskaliga konferenser. Vi matchar format, teknik och venue — perfekt, varje gång.",
    image: "/Images/interior-large-building-with-glass-ceiling.jpg",
    span: "md:col-span-7",
  },
  {
    title: "Kick-off & Teambuilding",
    description: "Upplevelser som sätter tonen för hela året. Vi bygger events som inspirerar team och driver kultur framåt.",
    image: "/Images/colorful-seoul-floating-island.jpg",
    span: "md:col-span-5",
  },
  {
    title: "Middagar & Galor",
    description: "Representationsmiddagar och galor i venues som gör intryck. Helhetskoordinering från meny till platsplanering.",
    image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.jpg",
    span: "md:col-span-4",
  },
  {
    title: "Venue Sourcing",
    description: "360,000+ venues i 36 länder. Vi hittar rätt lokal baserat på era krav — alltid minst 3 förslag inom 24 timmar.",
    image: "/Images/hotel-lobby.jpg",
    span: "md:col-span-4",
  },
  {
    title: "Fullservice Leverans",
    description: "Lokaler, teknik, catering och logi samordnat under ett tak. En kontaktperson, noll krångel.",
    image: "/Images/palace-culture-iasi-romania.jpg",
    span: "md:col-span-4",
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className={`${service.span} relative group cursor-pointer overflow-hidden rounded-2xl`}
      style={{ height: "clamp(320px, 42vh, 480px)" }}
    >
      {/* Fullbleed image */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient overlay — warm, from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

      {/* Content — bottom aligned */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 z-10">
        <h3 className="font-display text-xl md:text-2xl font-medium text-white tracking-tight leading-tight mb-2 group-hover:translate-y-[-2px] transition-transform duration-500">
          {service.title}
        </h3>
        <p className="text-[13px] md:text-[14px] text-white/60 leading-relaxed max-w-[360px] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-out">
          {service.description}
        </p>
      </div>

      {/* Subtle shine on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
    </motion.div>
  );
}

export function ServiceCardsPersonal() {
  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

        {/* Editorial asymmetric header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-20"
        >
          {/* Left — label + heading */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
              <span className="text-[#6AD8D2] text-xs">◆</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Våra tjänster</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05]">
              Vad vi
              <br />
              <span className="italic font-light text-[var(--text-muted)]">gör.</span>
            </h2>
          </div>

          {/* Right — description + micro metadata */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-6">
              Från venue-scouting till fullskalig leverans. Vi skapar event som bygger ert varumärke — oavsett storlek eller komplexitet.
            </p>
            <div className="flex gap-8 border-t border-[var(--border-default)] pt-4">
              {[
                { value: "360,000+", label: "Venues" },
                { value: "36", label: "Länder" },
                { value: "24h", label: "Svarstid" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-[18px] font-medium text-[var(--text-primary)] block leading-none">{stat.value}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mt-1 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {SERVICES.slice(0, 2).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
          {SERVICES.slice(2).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

