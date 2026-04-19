"use client";

import { motion } from "framer-motion";

/**
 * Premium section transition — creates visual breathing room between sections.
 *
 * Variants:
 * - "glow"    → tiffany center glow that fades at edges
 * - "fade"    → subtle gradient darkness
 * - "line"    → thin animated line with expanding width on scroll
 * - "diamond" → tiffany diamond ◆ that fades-in + rotates
 * - "dots"    → three dots that stagger-reveal
 */
export function SectionTransition({
  variant = "glow",
}: {
  variant?: "glow" | "fade" | "line" | "diamond" | "dots";
}) {
  if (variant === "fade") {
    return (
      <div className="relative h-20 md:h-28 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className="relative py-10 md:py-14 w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-[1px] max-w-[600px] bg-gradient-to-r from-transparent via-[#6AD8D2]/30 to-transparent"
        />
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div className="relative py-12 md:py-16 w-full flex flex-col items-center justify-center overflow-hidden gap-3">
        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, rotate: 45, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-2.5 h-2.5 bg-[#6AD8D2]/40 rounded-[1px]"
        />
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-[1px] max-w-[120px] bg-gradient-to-r from-transparent via-[#6AD8D2]/20 to-transparent"
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="relative py-10 md:py-14 w-full flex items-center justify-center gap-3 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`rounded-full ${
              i === 1
                ? "w-2 h-2 bg-[#6AD8D2]/50"
                : "w-1.5 h-1.5 bg-[#6AD8D2]/25"
            }`}
          />
        ))}
      </div>
    );
  }

  // Default: glow
  return (
    <div className="relative py-10 md:py-14 w-full flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-[400px] h-[120px] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(129,216,208,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}
