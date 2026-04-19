"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ServiceCardsPersonal — Moodboard-style presentation cards.
 *
 * Dark cards with mono labels, structured content,
 * tiffany accents, small images. Mix of card types
 * for visual variety in bento layout.
 */

const SERVICES = [
  {
    title: "Konferens & Möten",
    description: "Från intima styrelsemöten till storskaliga konferenser. Vi matchar format, teknik och venue.",
    image: "/Images/interior-large-building-with-glass-ceiling.jpg",
    label: "01 — Kärntjänst",
    stat: { value: "2,048+", unit: "events levererade" },
    span: "md:col-span-7",
    variant: "image" as const,
  },
  {
    title: "Kick-off & Teambuilding",
    description: "Upplevelser som sätter tonen för hela året. Vi bygger events som inspirerar team och driver kultur framåt.",
    image: "/Images/colorful-seoul-floating-island.jpg",
    label: "02 — Upplevelser",
    stat: { value: "94%", unit: "nöjda kunder" },
    span: "md:col-span-5",
    variant: "stat" as const,
  },
  {
    title: "Middagar & Galor",
    description: "Representationsmiddagar och galor i venues som gör intryck. Helhetskoordinering från meny till platsplanering.",
    image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.jpg",
    label: "03 — Premium",
    stat: { value: "36", unit: "länder" },
    span: "md:col-span-4",
    variant: "image" as const,
  },
  {
    title: "Venue Sourcing",
    description: "360,000+ venues i 36 länder. Vi hittar rätt lokal baserat på era krav — alltid minst 3 förslag inom 24 timmar.",
    image: "/Images/hotel-lobby.jpg",
    label: "04 — Plattform",
    stat: { value: "360,000+", unit: "venues" },
    span: "md:col-span-4",
    variant: "stat" as const,
  },
  {
    title: "Fullservice Leverans",
    description: "Lokaler, teknik, catering och logi samordnat under ett tak. En kontaktperson, noll krångel.",
    image: "/Images/palace-culture-iasi-romania.jpg",
    label: "05 — Leverans",
    stat: { value: "24h", unit: "svarstid" },
    span: "md:col-span-4",
    variant: "cta" as const,
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className={`${service.span} relative group cursor-pointer overflow-hidden rounded-2xl bg-[#0F0F0F] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500`}
      style={{ minHeight: "clamp(340px, 44vh, 500px)" }}
    >
      {/* Mono label top bar */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
          {service.label}
        </span>
        <span className="text-[#6AD8D2] text-[8px]">◆</span>
      </div>

      {service.variant === "image" ? (
        /* Image variant — image top half, content bottom */
        <>
          <div className="relative mx-5 rounded-xl overflow-hidden" style={{ height: "55%" }}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05] grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="px-6 pt-5 pb-6">
            <h3 className="font-display text-[20px] font-medium text-white tracking-tight leading-tight mb-2">
              {service.title}
            </h3>
            <p className="text-[13px] text-white/40 leading-relaxed">
              {service.description}
            </p>
          </div>
        </>
      ) : service.variant === "stat" ? (
        /* Stat variant — big number, then content */
        <div className="flex flex-col justify-between h-full px-6 pb-6">
          <div className="mt-4">
            <span className="font-display text-[clamp(3rem,5vw,4.5rem)] font-medium text-white/90 leading-none block">
              {service.stat.value}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6AD8D2]/60 mt-2 block">
              {service.stat.unit}
            </span>
          </div>
          <div className="mt-auto pt-8 border-t border-white/[0.06]">
            <h3 className="font-display text-[18px] font-medium text-white tracking-tight leading-tight mb-2">
              {service.title}
            </h3>
            <p className="text-[13px] text-white/35 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      ) : (
        /* CTA variant — content + action button */
        <div className="flex flex-col justify-between h-full px-6 pb-6">
          <div className="mt-4">
            <h3 className="font-display text-[22px] font-medium text-white tracking-tight leading-tight mb-3">
              {service.title}
            </h3>
            <p className="text-[14px] text-white/40 leading-relaxed mb-6">
              {service.description}
            </p>
            <div className="flex gap-4 text-[13px]">
              <span className="text-white/50">✓ En kontaktperson</span>
              <span className="text-white/50">✓ Transparent pris</span>
            </div>
          </div>
          <div className="mt-auto pt-6">
            <a
              href="#request"
              className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] font-medium text-white hover:bg-[#6AD8D2] hover:text-[#0A0A0A] hover:border-[#6AD8D2] transition-all duration-300"
            >
              Kom igång →
            </a>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6AD8D2]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/25">Ready</span>
            </div>
          </div>
        </div>
      )}

      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-[#6AD8D2]/[0.02] via-transparent to-transparent" />
    </motion.div>
  );
}

export function ServiceCardsPersonal() {
  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

        {/* Moodboard-style editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          {/* Small mono label — top right like moodboard */}
          <div className="flex justify-between items-start mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              Eventpartner — Tjänster
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)] text-right">
              Fullservice leverans
              <br />
              36 länder
            </span>
          </div>

          {/* Big heading — anchor, no pill */}
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-8">
            Vad vi gör.
          </h2>

          {/* Description — larger, bolder, its own level */}
          <p className="font-display text-[clamp(1.1rem,2.2vw,1.6rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-2xl mb-14">
            Från venue-scouting till fullskalig leverans. Vi skapar event som bygger ert varumärke — oavsett storlek eller komplexitet.
          </p>

          {/* Metrics row — spread like moodboard bottom */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--border-default)] pt-6">
            {[
              { label: "Venues", value: "360,000+" },
              { label: "Länder", value: "36" },
              { label: "Svarstid", value: "24h" },
              { label: "Leveranspartners", value: "2,400+" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] block mb-1">{stat.label}</span>
                <span className="font-display text-[17px] font-medium text-[var(--text-primary)]">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Cards grid — FULLBLEED, outside container */}
      <div className="px-3 md:px-4">
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

