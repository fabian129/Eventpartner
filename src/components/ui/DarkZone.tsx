"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * DarkZone — Scroll-linked page-root background interpolation.
 *
 * All sections use transparent backgrounds.
 * page-root bg is the ONLY color source.
 *
 * Props:
 * - exitToLight (default: true) — fade back to light on exit.
 *   Set to false for footer zones where the page stays dark.
 */

function interpolateColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const v = Math.round(244 + (10 - 244) * clamped);
  return `rgb(${v},${v},${v})`;
}

interface DarkZoneProps {
  children: ReactNode;
  /** If false, stays dark after entry (for footer zones) */
  exitToLight?: boolean;
}

export function DarkZone({ children, exitToLight = true }: DarkZoneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const root = document.getElementById("page-root");
    if (!root) return;

    let t: number;

    if (exitToLight) {
      // Entry: 0.13→0.25 = light→dark (12% range, starts later)
      // Steady: 0.25→0.80 = fully dark
      // Exit: 0.80→0.90 = dark→light (10% range)
      if (v <= 0.13) {
        t = 0;
      } else if (v < 0.25) {
        t = (v - 0.13) / 0.12;
      } else if (v < 0.80) {
        t = 1;
      } else if (v < 0.90) {
        t = Math.max(0, 1 - (v - 0.80) / 0.10);
      } else {
        t = 0;
      }
    } else {
      // Entry-only: 0.13→0.25 = light→dark (12% range, starts later), stays dark forever
      if (v <= 0.13) {
        t = 0;
      } else if (v < 0.25) {
        t = (v - 0.13) / 0.12;
      } else {
        t = 1;
      }
    }

    root.style.backgroundColor = interpolateColor(t);
  });

  return (
    <div ref={ref}>
      {/* Top spacer — breathing room for the fade-in */}
      <div className="h-[20vh]" />
      {children}
    </div>
  );
}
