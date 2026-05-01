"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * ServiceGallery — Expandable gallery for services
 * 
 * Same interaction pattern as VenueGallery (which user loved).
 * 6 vertical panels for service categories.
 * Hover → expand with image + description reveal.
 */

const SERVICES = [
  {
    title: "Konferens & möten",
    description: "Från styrelserum till storskaliga konferenser med hundratals deltagare.",
    tag: "Konferens",
    image: "/Images/interior-large-building-with-glass-ceiling.webp",
  },
  {
    title: "Aktiviteter",
    description: "Teambuilding, workshops och upplevelser som skapar bestående minnen.",
    tag: "Aktiviteter",
    image: "/Images/colorful-seoul-floating-island.webp",
  },
  {
    title: "Catering",
    description: "Från standing lunch till sju-rätters gala. Rätt leverantör för varje tillfälle.",
    tag: "Catering",
    image: "/Images/decorated-hall-wedding-is-ready-celebration.webp",
  },
  {
    title: "Talare",
    description: "Keynotes, moderatorer, artister och DJ:s för ert event.",
    tag: "Underhållning",
    image: "/Images/palace-culture-iasi-romania.webp",
  },
  {
    title: "Middagar",
    description: "Galor, jubileer & representationsmiddagar i venues som gör intryck.",
    tag: "Middagar",
    image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.webp",
  },
  {
    title: "Kick-off",
    description: "Starter som sätter tonen för hela året.",
    tag: "Kick-off",
    image: "/Images/hotel-lobby.webp",
  },
];

export function ServiceGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
          <p className="section-label mb-4">Tjänster</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05] max-w-lg">
            Vad vi hjälper till
            <br />
            <span className="italic font-light text-[var(--text-muted)]">med att boka.</span>
          </h2>
        </motion.div>

        {/* Expandable gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex gap-1.5 rounded-2xl overflow-hidden bg-[#111] p-1.5"
          style={{ height: "520px" }}
        >
          {SERVICES.map((service, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={service.title}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ flex: isActive ? 4 : 1 }}
              >
                {/* Fullbleed image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isActive ? "grayscale-0 brightness-[0.5] scale-105" : "grayscale brightness-[0.3]"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#6AD8D2] bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/[0.06]">
                    {service.tag}
                  </span>
                </div>

                {/* Content — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className={`font-display font-medium text-white tracking-tight leading-tight mb-1 transition-all duration-500 ${
                    isActive ? "text-xl opacity-100" : "text-sm opacity-60"
                  }`}>
                    {isActive ? service.title : service.title.split(" ")[0]}
                  </h3>

                  {/* Description — only on active */}
                  <div className={`transition-all duration-400 overflow-hidden ${
                    isActive ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}>
                    <p className="text-[13px] text-white/50 leading-relaxed max-w-[300px]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
