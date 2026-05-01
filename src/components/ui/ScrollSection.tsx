"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animation";

/**
 * ScrollSection — GSAP ScrollTrigger-powered cinematic entrance/exit.
 *
 * Replaces previous Framer Motion implementation.
 * Uses a SINGLE ScrollTrigger per section (batched) instead of
 * multiple useTransform hooks, eliminating layout thrashing.
 *
 * GPU-accelerated: only transform + opacity.
 */

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
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
  entranceY = 30,
  exitOpacity = 0.3,
  exitY = -15,
  exitScale = 0.98,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    // Set initial state for entrance
    if (fadeIn) {
      gsap.set(el, { opacity: 0, y: entranceY, scale: 0.98 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",     // section top hits viewport bottom
        end: "bottom top",       // section bottom hits viewport top
        scrub: 0.8,              // smooth scroll-linked scrub
      },
    });

    // Entrance: 0% → 15% of scroll range
    if (fadeIn) {
      tl.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.15,
        ease: "power3.out",
      });
    }

    // Steady state: 15% → 80%
    tl.to(el, { duration: 0.65 });

    // Exit: 80% → 100%
    if (fadeOut) {
      tl.to(el, {
        opacity: exitOpacity,
        y: exitY,
        scale: exitScale,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [fadeIn, fadeOut, entranceY, exitOpacity, exitY, exitScale]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}
