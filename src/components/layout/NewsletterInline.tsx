"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * NewsletterInline — Compact inline newsletter signup.
 * Can be placed between sections for additional touchpoints.
 * Single row: text + email input + button.
 */

export function NewsletterInline() {
  return (
    <section className="w-full py-12 md:py-16 bg-[var(--bg-primary)]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-[900px] mx-auto px-6 md:px-10"
      >
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 p-6 md:p-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]">
          <div className="flex-1 min-w-0">
            <p className="font-display text-[16px] md:text-[18px] font-medium text-[var(--text-primary)] leading-tight">
              Håll dig uppdaterad med EventPartner
            </p>
            <p className="text-[13px] text-[var(--text-muted)] mt-1">
              Nyheter, inspirations-venues och event-tips direkt i din inbox.
            </p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Din e-post"
              className="flex-1 md:w-[220px] px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-default)] text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[#6AD8D2]/30 transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#6AD8D2] text-[#0A0A0A] text-[13px] font-medium hover:bg-[#5EC4BA] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              Prenumerera <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
