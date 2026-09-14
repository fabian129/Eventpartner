"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ArrowRight, Building2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const HELIO_LOCATIONS = [
  "Helio Sundbyberg",
  "Helio Slussen",
  "Helio Slottsbacken",
  "Helio Hornstull",
  "Helio Frösundavik",
  "Helio GT30 Grev Ture",
  "Helio Stockholm City",
];

export function HelioPartnerSection() {
  const sv = useLocale() === "sv";

  return (
    <section
      id="preferred-partner"
      className="relative w-full py-20 md:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-3xl overflow-hidden group border border-white/[0.08] bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
        >
          {/* Foreground Content */}
          <div className="relative z-10 px-8 sm:px-12 md:px-14 pt-8 sm:pt-10 md:pt-12 pb-7 sm:pb-9 md:pb-10 flex flex-col gap-7 md:gap-8">
            {/* Top row: Eyebrow badge left, Subtle icon right */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03]">
                <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 font-medium">
                  Preferred partner
                </span>
              </div>

              {/* Reference micro-icon (matching the service cards 01/02/03/04 top-right icon) */}
              <div className="text-white/60 group-hover:text-white/90 transition-colors duration-500 pr-1">
                <Building2 className="w-5 h-5 stroke-[1.5]" />
              </div>
            </div>

            {/* HELIO Logo mark from photo */}
            <div>
              <Image
                src="/Images/logos/partners/helio-logo-v7.png"
                alt="HELIO"
                width={421}
                height={130}
                priority
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </div>

            {/* Main discount headline */}
            <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium tracking-tight text-white leading-[1.15] max-w-4xl">
              {sv ? (
                <>
                  Alltid minst <span className="text-[#D03834] font-semibold">10% rabatt</span> på konferens, event & möten hos Helios 7 anläggningar via EventPartner.
                </>
              ) : (
                <>
                  Always at least <span className="text-[#D03834] font-semibold">10% discount</span> on conferences, events & meetings across Helio&apos;s 7 venues via EventPartner.
                </>
              )}
            </h3>

            {/* Bottom row: Locations left, Action rectangle right */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-6 md:pt-7 border-t border-white/[0.08]">
              {/* Locations chips */}
              <div className="flex flex-wrap items-center gap-2 max-w-2xl">
                {HELIO_LOCATIONS.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border border-white/[0.08] bg-white/[0.03] text-white/85"
                  >
                    <Building2 className="w-3.5 h-3.5 text-white/60 stroke-[1.5] flex-shrink-0" />
                    {loc}
                  </span>
                ))}
              </div>

              {/* Action rectangle: Centered in its corner, shifted down 'un dedo' */}
              <div className="flex-shrink-0 flex items-center translate-y-3">
                <a
                  href="#request"
                  className="group inline-flex items-center gap-3.5 px-5 py-3.5 rounded-xl border border-white/20 hover:border-[#ED3A33] active:border-[#ED3A33] bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] hover:from-white/[0.15] hover:to-white/[0.04] backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_0_24px_rgba(237,58,51,0.35),inset_0_1px_1px_0_rgba(237,58,51,0.3)] active:scale-[0.98] transition-all duration-300"
                >
                  <div className="inline-flex items-center">
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-semibold text-[#FF4D4D] [text-shadow:0_0_10px_rgba(237,58,51,0.45)] group-hover:text-[#FF6666] group-hover:[text-shadow:0_0_16px_rgba(237,58,51,0.7)] transition-all duration-300">
                      {sv ? "Garanterad rabatt" : "Guaranteed discount"}
                    </span>
                    <span className="text-white/40 text-[10px] select-none mx-2 opacity-50 group-hover:text-white/70 transition-colors">•</span>
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-medium text-white group-hover:text-white transition-colors">
                      {sv ? "Boka med partneravtal" : "Book with partner agreement"}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#ED3A33] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(237,58,51,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(237,58,51,0.7)] transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
