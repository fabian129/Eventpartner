"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollSection — Scroll-linked cinematic entrance/exit wrapper.
 *
 * Wraps any section and applies scroll-driven opacity, scale, y-shift
 * and blur so that content "paints in" when entering the viewport
 * and gently fades out when leaving.
 *
 * Creates a "focus window" effect — only the current section is 100% visible.
 *
 * Usage:
 *   <ScrollSection>
 *     <MySection />
 *   </ScrollSection>
 *
 * Props:
 *   fadeIn  — entrance animation (default: true)
 *   fadeOut — exit animation (default: true)
 *   entranceBlur — blur on entrance in px (default: 6)
 *   entranceY — y-offset on entrance in px (default: 30)
 *   exitOpacity — minimum opacity on exit (default: 0.3)
 *   exitY — y-shift on exit in px (default: -15)
 *   exitScale — scale on exit (default: 0.98)
 *
 * The scroll offset maps: 0 = section top hits viewport bottom,
 *                          1 = section bottom hits viewport top.
 * Entrance triggers during 0→0.15, exit during 0.8→1.
 */

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
  entranceBlur?: number;
  entranceY?: number;
  exitOpacity?: number;
  exitY?: number;
  exitScale?: number;
}

export function ScrollSection({
  children,
  className = "",
  fadeIn = true,
  fadeOut = true,
  entranceBlur = 6,
  entranceY = 30,
  exitOpacity = 0.3,
  exitY = -15,
  exitScale = 0.98,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // --- Entrance: scrollYProgress 0 → 0.15 ---
  // --- Steady:   scrollYProgress 0.15 → 0.8 ---
  // --- Exit:     scrollYProgress 0.8 → 1 ---

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [
      fadeIn ? 0 : 1,
      1,
      1,
      fadeOut ? exitOpacity : 1,
    ]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [
      fadeIn ? 0.98 : 1,
      1,
      1,
      fadeOut ? exitScale : 1,
    ]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [
      fadeIn ? entranceY : 0,
      0,
      0,
      fadeOut ? exitY : 0,
    ]
  );

  // Blur removed — filter: blur() is not GPU-accelerated and triggers
  // expensive repaints. opacity + scale + y provide sufficient entrance effect.

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        y,
        willChange: "transform, opacity",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
