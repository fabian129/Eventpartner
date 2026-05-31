"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * ServiceBento — Elevated card shell with asymmetric bento grid inside.
 * 
 * Combines: Infrastructure showcase "plate" (gradient border, shadow)
 * with richly styled bento cards of varying sizes.
 * Custom cursor becomes "Boka nu" pill on hover.
 */

const SERVICES = [
  {
    title: "Konferens & möten",
    description: "Från styrelserum till storskaliga konferenser",
    stat: "2,400+",
    statLabel: "venues",
    image: "/Images/interior-large-building-with-glass-ceiling.webp",
    span: "md:col-span-4 md:row-span-2", // Tall left
  },
  {
    title: "Aktiviteter",
    description: "Teambuilding & upplevelser",
    stat: "180+",
    statLabel: "partners",
    image: "/Images/colorful-seoul-floating-island.webp",
    span: "md:col-span-4", // Top middle
  },
  {
    title: "Catering",
    description: "Standing lunch till galamiddag",
    stat: "340+",
    statLabel: "leverantörer",
    image: "/Images/decorated-hall-wedding-is-ready-celebration.webp",
    span: "md:col-span-4", // Top right
  },
  {
    title: "Talare & underhållning",
    description: "Keynotes, artister & moderatorer",
    stat: "500+",
    statLabel: "profiler",
    image: "/Images/palace-culture-iasi-romania.webp",
    span: "md:col-span-4", // Bottom middle
  },
  {
    title: "Middagar & galor",
    description: "Venues som gör intryck",
    stat: "100%",
    statLabel: "skräddarsytt",
    image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.webp",
    span: "md:col-span-4", // Bottom right
  },
  {
    title: "Kick-off",
    description: "Sätter tonen för hela året",
    stat: "48h",
    statLabel: "svarstid",
    image: "/Images/hotel-lobby.webp",
    span: "md:col-span-12", // Full-width bottom banner
  },
];

function BentoCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const cursor = cursorRef.current;
    if (!card || !cursor) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      cursor.style.left = `${e.clientX - rect.left}px`;
      cursor.style.top = `${e.clientY - rect.top}px`;
    };

    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);

  // Determine height based on span
  const isFullWidth = service.span.includes("col-span-12");
  const isTall = service.span.includes("row-span-2");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className={`${service.span} relative rounded-2xl overflow-hidden group cursor-none ${
        isFullWidth ? "h-[160px]" : isTall ? "h-[340px] md:h-full" : "h-[200px] md:h-[220px]"
      }`}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <div className="bg-tiffany text-[#0a0a0a] text-[10px] font-semibold uppercase tracking-[0.1em] px-4 py-2 rounded-full whitespace-nowrap shadow-lg shadow-tiffany/20">
          Boka nu →
        </div>
      </div>

      {/* Image */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover grayscale brightness-[0.35] group-hover:grayscale-0 group-hover:brightness-[0.45] transition-all duration-[1s] ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15 group-hover:from-black/60 transition-all duration-500" />

      {/* Stat — top right */}
      <div className="absolute top-4 right-5 z-10 text-right opacity-0 group-hover:opacity-100 transition-all duration-400 delay-100">
        <span className="font-display text-xl font-medium text-white block leading-none">{service.stat}</span>
        <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/40">{service.statLabel}</span>
      </div>

      {/* Content — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-display text-base md:text-lg font-medium text-white tracking-tight leading-tight">
          {service.title}
        </h3>
        <p className="text-[12px] text-white/0 group-hover:text-white/50 transition-all duration-500 delay-75 mt-1 max-w-[250px]">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ServiceBento() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <p className="section-label mb-4">Fullservice-partner</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05] max-w-lg">
            Allt ni behöver.
            <br />
            <span className="italic font-light text-[var(--text-muted)]">En förfrågan.</span>
          </h2>
        </motion.div>

        {/* Elevated card shell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Gradient border */}
          <div className="p-[1px] rounded-[1.25rem] bg-gradient-to-b from-[var(--border-default)] via-[var(--border-default)]/20 to-transparent">
            {/* Inner elevated card */}
            <div className="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 shadow-[0_2.8px_2.2px_rgba(0,0,0,0.02),0_6.7px_5.3px_rgba(0,0,0,0.028),0_12.5px_10px_rgba(0,0,0,0.035),0_22.3px_17.9px_rgba(0,0,0,0.042),0_41.8px_33.4px_rgba(0,0,0,0.05),0_100px_80px_rgba(0,0,0,0.07)]">
              
              {/* Bento grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-2.5 auto-rows-auto">
                {/* Row 1: Large left (4 cols, 2 rows) + 2 right stacked */}
                <BentoCard service={SERVICES[0]} index={0} />
                <BentoCard service={SERVICES[1]} index={1} />
                <BentoCard service={SERVICES[2]} index={2} />
                
                {/* Row 2: Bottom of tall left + 2 more */}
                <BentoCard service={SERVICES[3]} index={3} />
                <BentoCard service={SERVICES[4]} index={4} />

                {/* Row 3: Full-width banner */}
                <BentoCard service={SERVICES[5]} index={5} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center text-[13px] text-[var(--text-dim)] font-sans"
        >
          Varje förfrågan hanteras av ett dedikerat team — ni får minst 3 kurerade förslag inom 24 timmar.
        </motion.p>
      </div>
    </section>
  );
}
