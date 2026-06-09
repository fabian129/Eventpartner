"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function VenueGallery(_props?: { venues?: any[]; countryName?: string }) {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Header — blur entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Venues som<br />
            <span className="text-purple">imponerar.</span>
          </h2>
        </motion.div>

        {/* Card 1 — Large hero card with scale reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative h-[500px] md:h-[620px] overflow-hidden group mb-5"
        >
          <Image
            src="/Images/hotel-lobby.webp"
            alt="Premium hotel lobby"
            fill
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />
          {/* Dark gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
            <div className="flex items-end justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              >
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-white/60 mb-3">
                  340,000+ venues
                </p>
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-white leading-tight">
                  Från intima middagar till<br className="hidden md:block" />
                  storslagna konferenser.
                </h3>
              </motion.div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <p className="text-3xl font-medium text-white tracking-tight">175</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Länder</p>
                </div>
                <div className="w-[1px] h-10 bg-white/20" />
                <div className="text-right">
                  <p className="text-3xl font-medium text-white tracking-tight">24h</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Svar</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two cards side by side — staggered scale reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="relative h-[360px] md:h-[420px] overflow-hidden group"
          >
            <Image
              src="/Images/decorated-hall-wedding-is-ready-celebration.webp"
              alt="Decorated event hall"
              fill
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 md:p-8 z-10">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-white/50 mb-2">Gala & Middag</p>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                Upplevelser som<br />stannar kvar.
              </h3>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="relative h-[360px] md:h-[420px] overflow-hidden group"
          >
            <Image
              src="/Images/interior-large-building-with-glass-ceiling.webp"
              alt="Grand glass ceiling interior"
              fill
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 md:p-8 z-10">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-white/50 mb-2">Konferens & Summit</p>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                Lokaler som matchar<br />er ambition.
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Card 4 — Wide bottom card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="relative h-[320px] md:h-[400px] overflow-hidden group"
        >
          <Image
            src="/Images/palace-culture-iasi-romania.webp"
            alt="Palace venue"
            fill
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-white/50 mb-2">Internationellt</p>
              <h3 className="text-xl md:text-3xl font-medium tracking-tight text-white">
                Europa, Asien, Mellanöstern — vi har er täckta.
              </h3>
            </div>
            <a
              href="#request"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 group/btn"
            >
              Hitta er venue
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
