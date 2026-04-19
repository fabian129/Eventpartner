"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CinematicQuoteBreak() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] max-h-[950px] overflow-hidden">
      {/* Fullbleed image */}
      <Image
        src="/Images/conference-evening.jpg"
        alt="Conference event venue"
        fill
        className="object-cover grayscale"
        sizes="100vw"
        priority
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-[1]" />

      {/* Content on image */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Top left: floating badge */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="absolute top-8 left-8 md:top-12 md:left-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.1]">
            <Sparkles className="w-3 h-3 text-[#81D8D0]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
              Skräddarsy ditt event
            </span>
          </div>
        </motion.div>

        {/* Top right: floating stat */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="absolute top-8 right-8 md:top-12 md:right-12 hidden md:block"
        >
          <div className="px-4 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#81D8D0] animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">
                Live
              </span>
            </div>
            <span className="text-[13px] font-medium text-white/80">
              360,000+ venues
            </span>
          </div>
        </motion.div>

        {/* Center: headline + subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#81D8D0]/80">
              EventPartner
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="font-display text-5xl md:text-6xl lg:text-[5.5rem] italic font-light tracking-tight text-white text-center leading-[1.05]"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
          >
            Skapa ert nästa event.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-5 text-[14px] text-white/40 text-center max-w-md"
          >
            Berätta vad ni söker — vi sköter resten.
          </motion.p>
        </div>

        {/* Bottom: two CTA cards on image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="px-6 md:px-10 pb-8 md:pb-10"
        >
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3 md:gap-4">
            {/* Left: glassmorphic */}
            <Link
              href="#request"
              className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] hover:bg-white/[0.12] transition-all duration-300 min-h-[130px]"
            >
              <span className="text-[13px] font-semibold text-white/80">
                Prata med oss
              </span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[15px] md:text-[17px] text-white/50 leading-snug max-w-[200px]">
                  Få svar på era frågor.
                </p>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
              </div>
            </Link>

            {/* Right: tiffany accent */}
            <Link
              href="/skraddarsy"
              className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-[#81D8D0] hover:bg-[#74CCC4] transition-all duration-300 min-h-[130px] shadow-[0_8px_32px_rgba(129,216,208,0.2)]"
            >
              <span className="text-[13px] font-semibold text-[#0A0A0A]/50">
                Starta ert event
              </span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[18px] md:text-[22px] text-[#0A0A0A] font-medium leading-snug max-w-[280px]">
                  Skräddarsy ert event.
                  <br />
                  <span className="text-[#0A0A0A]/50">Er väg.</span>
                </p>
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A]/10 flex items-center justify-center group-hover:bg-[#0A0A0A]/15 transition-colors flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-[#0A0A0A] group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
