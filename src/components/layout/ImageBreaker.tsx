"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROW1 = [
  { src: "/Images/hotel-lobby.jpg", alt: "Grand venue lobby", label: "Venue", span: "col-span-2" },
  { src: "/Images/conference-evening.jpg", alt: "Conference", label: "Konferens", span: "col-span-1" },
];

const ROW2 = [
  { src: "/Images/decorated-hall-wedding-is-ready-celebration.jpg", alt: "Gala dinner", label: "Gala" },
  { src: "/Images/interior-large-building-with-glass-ceiling.jpg", alt: "Modern venue", label: "Modern" },
  { src: "/Images/venue-dark-modern.jpg", alt: "Presentation", label: "Presentation" },
  { src: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.jpg", alt: "Intimate dinner", label: "Intim" },
];

export function ImageBreaker() {
  return (
    <section className="relative w-full px-6 md:px-10 pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-[var(--bg-primary)]">
      {/* Row 1: 2 + 1 */}
      <div className="grid grid-cols-3 gap-[3px] h-[32vh] md:h-[48vh] min-h-[250px] mb-[3px]">
        {ROW1.map((img, i) => (
          <motion.div
            key={img.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            className={`relative group overflow-hidden ${img.span}`}
            style={{
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.15), inset 0 0 8px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
              sizes={i === 0 ? "66vw" : "34vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-[1]" />
            <div className="absolute bottom-4 left-5 md:bottom-5 md:left-6 z-10">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                {img.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 2: 4 equal */}
      <div className="grid grid-cols-4 gap-[3px] h-[24vh] md:h-[34vh] min-h-[180px]">
        {ROW2.map((img, i) => (
          <motion.div
            key={img.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: EASE }}
            className="relative group overflow-hidden"
            style={{
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.15), inset 0 0 8px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-[1]" />
            <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 z-10">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
                {img.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
