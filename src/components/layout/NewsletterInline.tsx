"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * NewsletterInline — Compact inline newsletter signup.
 * Can be placed between sections for additional touchpoints.
 * Single row: text + email input + button.
 */

interface NewsletterCMS {
  headline?: string;
  description?: string;
  placeholder?: string;
  button?: string;
}

export function NewsletterInline({ cms }: { cms?: NewsletterCMS }) {
  return (
    <section
      className="w-full py-12 md:py-16"
      style={{
        // No background — inherits from page-root via DarkZone
        "--bg-primary": "transparent",
        "--bg-card": "rgba(255,255,255,0.04)",
        "--text-primary": "#FFFFFF",
        "--text-muted": "rgba(255,255,255,0.4)",
        "--text-dim": "rgba(255,255,255,0.25)",
        "--border-default": "rgba(255,255,255,0.08)",
      } as React.CSSProperties}
    >
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
              {cms?.headline || "Stay updated with EventPartner"}
            </p>
            <p className="text-[13px] text-[var(--text-muted)] mt-1">
              {cms?.description || "News, inspiration venues, and event tips delivered straight to your inbox."}
            </p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={cms?.placeholder || "Your email"}
              className="flex-1 md:w-[220px] px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-default)] text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-tiffany/30 transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-tiffany text-[#0A0A0A] text-[13px] font-medium hover:bg-[#5EC4BA] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              {cms?.button || "Subscribe"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
