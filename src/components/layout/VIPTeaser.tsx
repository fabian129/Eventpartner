"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── What's included in the VIP programme ── */
const INCLUSIONS = [
  "Priority access to Europe's most exclusive venues",
  "Dedicated senior account manager",
  "Preferred rates across 36 countries",
  "Complimentary site inspections",
  "24/7 concierge support during events",
  "Quarterly strategy sessions",
  "Early access to new destinations",
  "Custom branding packages included",
];

export function VIPTeaser() {
  return (
    <section className="relative w-full py-28 md:py-40 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1000px] mx-auto relative z-10">

        {/* ── Editorial header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-20"
        >
          {/* Thin gold rule */}
          <div className="w-12 h-px bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] mb-8" />

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] mb-6">
            By invitation only
          </p>

          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-white leading-[1.05] tracking-tight max-w-[700px]">
            A different standard{" "}
            <span className="text-white/30">for companies that refuse to compromise.</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20">

          {/* Left: editorial copy */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-[16px] md:text-[17px] text-white/50 leading-[1.9] mb-8">
              The EventPartner VIP Programme is reserved for organisations that 
              expect precision, discretion, and flawless execution. Every detail — 
              from venue selection to on-site coordination — is handled by your 
              dedicated senior team.
            </p>
            <p className="text-[15px] text-white/30 leading-[1.9]">
              Membership is by application only. We maintain a deliberately 
              limited roster to ensure each client receives the attention their 
              events demand.
            </p>
          </motion.div>

          {/* Right: inclusions list */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-6">
              What&apos;s included
            </p>
            <ul className="space-y-0">
              {INCLUSIONS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="flex items-start gap-4 py-3.5 border-b border-white/[0.04] last:border-0"
                >
                  <span className="text-[#c9a96e] text-[11px] font-mono mt-0.5 shrink-0 w-4 text-right opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] text-white/55 leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── CTA: Application ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <Link href="/vip">
            <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] font-display text-[14px] font-medium hover:bg-[#c9a96e]/[0.06] hover:border-[#c9a96e]/50 transition-all duration-400">
              Apply for Membership
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          <span className="text-[12px] text-white/15 font-mono tracking-wide">
            Limited availability · Reviewed within 48h
          </span>
        </motion.div>

      </div>
    </section>
  );
}
