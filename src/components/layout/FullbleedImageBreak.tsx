"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FullbleedImageBreak — Dark editorial section with faded image.
 *
 * Dark background. Bold text left, venue image right that
 * dissolves into the dark canvas via CSS mask-image.
 * Glassmorphic floating stats cards over the image.
 * This is the "Stripe blue section" moment that breaks the white flow.
 */

const STATS = [
  { value: 360000, suffix: "+", label: "Venues", delay: 0 },
  { value: 36, suffix: "", label: "Länder", delay: 0.2 },
  { value: 500, suffix: "+", label: "Events", delay: 0.4 },
];

export function FullbleedImageBreak() {
  return (
    <section className="relative w-full bg-[#0A0A0A] overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)",
        }}
      />

      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 right-0 w-[60%] h-[80%] -translate-y-1/2 bg-[#81D8D0]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[600px] md:min-h-[700px]">

        {/* Left: Editorial text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, x: -25, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#81D8D0] shadow-[0_0_8px_rgba(129,216,208,0.5)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Varför EventPartner
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.05] mb-6">
              Vi levererar
              <br />
              <span className="italic font-light text-white/50">minnen.</span>
            </h2>

            <p className="text-[15px] text-white/40 leading-relaxed max-w-md mb-12">
              Med 500+ framgångsrikt levererade events vet vi vad som krävs.
              Från den första idén till sista gästen som lämnar — vi äger hela processen.
            </p>

            {/* Stats row with count-up */}
            <div className="flex items-center gap-8 md:gap-12">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
                >
                  <div className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
                    <CountUp value={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
              className="mt-10"
            >
              <a
                href="#about"
                className="group inline-flex items-center gap-3 text-[14px] font-medium text-white/50 hover:text-[#81D8D0] transition-colors duration-300"
              >
                <span className="h-[1px] w-8 bg-white/20 group-hover:w-12 group-hover:bg-[#81D8D0] transition-all duration-300" />
                Läs mer om oss
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Image that fades into dark canvas */}
        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="/Images/venue-dark-modern.jpg"
              alt="Modern event venue"
              fill
              className="object-cover"
              sizes="50vw"
              style={{
                maskImage: "linear-gradient(to left, black 30%, transparent 95%)",
                WebkitMaskImage: "linear-gradient(to left, black 30%, transparent 95%)",
              }}
            />
          </motion.div>

          {/* Glassmorphic floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="absolute bottom-16 right-12 z-20"
          >
            <div className="px-6 py-4 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#81D8D0] shadow-[0_0_6px_rgba(129,216,208,0.5)] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  Studio Status
                </span>
              </div>
              <p className="text-[13px] text-white/80 font-medium">
                Accepting Projects
              </p>
              <p className="text-[11px] text-white/40 font-mono tracking-wider mt-1">
                Q2 2026 BOOKING
              </p>
            </div>
          </motion.div>

          {/* Second floating label */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className="absolute top-20 right-16 z-20"
          >
            <div className="px-4 py-2.5 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#81D8D0]/60">
                Featured Case
              </span>
              <p className="text-[12px] text-white/70 font-medium mt-0.5">
                01
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#81D8D0]/20 to-transparent" />
    </section>
  );
}
