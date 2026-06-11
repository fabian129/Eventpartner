"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

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
  card2Title?: string;
  card2Headline?: string;
  card2Sub?: string;
}

export function CinematicQuoteBreak({ cms }: { cms?: CtaCMS }) {
  const t = useTranslations('cinematicQuote');
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
            {cms?.label || t('label')}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
            {cms?.labelRight || t('labelRight')}
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
          {cms?.headline || t('headline')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="font-display text-[clamp(1rem,2vw,1.3rem)] font-normal text-white/35 max-w-lg leading-relaxed mb-14"
        >
          {cms?.subheadline || t('subheadline')}
        </motion.p>

        {/* Two CTA cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <div className="max-w-[800px] grid grid-cols-1 gap-3 md:gap-4">
            {/* Tiffany accent card */}
            <Link
              href="/skraddarsy"
              className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-tiffany hover:bg-[#74CCC4] transition-all duration-300 min-h-[130px] shadow-[0_8px_32px_rgba(106,216,210,0.15)]"
            >
              <span className="text-[13px] font-semibold text-[#0A0A0A]/50">
                {cms?.card2Title || t('card2Title')}
              </span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[18px] md:text-[22px] text-[#0A0A0A] font-medium leading-snug max-w-[280px]">
                  {cms?.card2Headline || t('card2Headline')}
                  <br />
                  <span className="text-[#0A0A0A]/50">{cms?.card2Sub || t('card2Sub')}</span>
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
