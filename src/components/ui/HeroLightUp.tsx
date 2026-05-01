"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

function interpolateColor(t: number): string {
  // t=0 -> dark (#111 or rgb(17,17,17))
  // t=1 -> light (#F4F4F4 or rgb(244,244,244))
  const clamped = Math.max(0, Math.min(1, t));
  const v = Math.round(17 + (244 - 17) * clamped);
  return `rgb(${v},${v},${v})`;
}

export function HeroLightUpZone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this transition zone
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start tracking when the top of this zone hits the bottom of the viewport
    // End tracking when the top of this zone hits the top of the viewport
    offset: ["start end", "start start"],
  });

  const updateColor = (v: number) => {
    const root = document.getElementById("page-root");
    if (!root) return;
    root.style.backgroundColor = interpolateColor(v);
  };

  useMotionValueEvent(scrollYProgress, "change", updateColor);

  useEffect(() => {
    // Initial color set on mount based on current scroll position
    updateColor(scrollYProgress.get());
  }, [scrollYProgress]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
