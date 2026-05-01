"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CinematicQuoteBreak — CTA on same dark surface as CaseStories.
 * No fullbleed image. Clean dark bg (#0A0A0A) continuation.
 * Headline + two CTA cards.
 */
interface CtaCMS {
  label?: string;
  labelRight?: string;
  headline?: string;
  subheadline?: string;
  card1Title?: string;
  card1Desc?: string;
  card2Title?: string;
  card2Headline?: string;
  card2Sub?: string;
}

export function CinematicQuoteBreak({ cms }: { cms?: CtaCMS }) {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{
        // No background — inherits from page-root via DarkZone
        "--text-primary": "#FFFFFF",
        "--text-secondary": "rgba(255,255,255,0.7)",
        "--text-muted": "rgba(255,255,255,0.4)",
        "--text-dim": "rgba(255,255,255,0.25)",
        "--border-default": "rgba(255,255,255,0.08)",
      } as React.CSSProperties}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Mono labels */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex justify-between items-start mb-8"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
            {cms?.label || "EventPartner — Next Step"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
            {cms?.labelRight || "Free consultation"}
          </span>
        </motion.div>

        {/* Big headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium tracking-tight text-white leading-[0.95] mb-4"
        >
          {cms?.headline || "Create your next event."}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="font-display text-[clamp(1rem,2vw,1.3rem)] font-normal text-white/35 max-w-lg leading-relaxed mb-14"
        >
          {cms?.subheadline || "Tell us what you're looking for — we'll handle the rest."}
        </motion.p>

        {/* Two CTA cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <div className="max-w-[800px] grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3 md:gap-4">
            {/* Left: glass card */}
            <Link
              href="#request"
              className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 min-h-[130px]"
            >
              <span className="text-[13px] font-semibold text-white/70">
                {cms?.card1Title || "Talk to us"}
              </span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[15px] md:text-[17px] text-white/40 leading-snug max-w-[200px]">
                  {cms?.card1Desc || "Get answers to your questions."}
                </p>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
              </div>
            </Link>

            {/* Right: tiffany accent */}
            <Link
              href="/skraddarsy"
              className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-tiffany hover:bg-[#74CCC4] transition-all duration-300 min-h-[130px] shadow-[0_8px_32px_rgba(106,216,210,0.15)]"
            >
              <span className="text-[13px] font-semibold text-[#0A0A0A]/50">
                {cms?.card2Title || "Start your event"}
              </span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[18px] md:text-[22px] text-[#0A0A0A] font-medium leading-snug max-w-[280px]">
                  {cms?.card2Headline || "Customize your event."}
                  <br />
                  <span className="text-[#0A0A0A]/50">{cms?.card2Sub || "Your way."}</span>
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
