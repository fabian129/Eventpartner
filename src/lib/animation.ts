/**
 * GSAP Animation Utilities — EventPartner
 * Centralized scroll-trigger and animation configuration.
 * 
 * Usage:
 *   import { registerGSAP, EASE_LUXURY, DURATION_ENTRANCE } from '@/lib/animation';
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins (safe for SSR)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// === CONSTANTS ===
export const EASE_LUXURY = "power3.out";
export const EASE_SMOOTH = "power2.out";
export const DURATION_ENTRANCE = 0.9;
export const DURATION_EXIT = 0.6;
export const STAGGER_DEFAULT = 0.08;
export const STAGGER_FAST = 0.04;

// === UTILITIES ===

/**
 * Batch entrance animation for multiple elements.
 * Uses a single ScrollTrigger instead of per-element observers.
 */
export function batchEntrance(
  elements: string | Element[],
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    trigger?: string | Element;
    start?: string;
  }
) {
  const {
    y = 30,
    duration = DURATION_ENTRANCE,
    stagger = STAGGER_DEFAULT,
    trigger,
    start = "top 85%",
  } = options || {};

  return gsap.from(elements, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: EASE_LUXURY,
    scrollTrigger: {
      trigger: trigger || (typeof elements === "string" ? elements : elements[0]),
      start,
      toggleActions: "play none none none",
    },
  });
}

/**
 * Scroll-scrubbed opacity + scale for section wrappers.
 * Replaces Framer Motion useScroll + useTransform.
 */
export function scrollFade(
  element: string | Element,
  options?: {
    fadeIn?: boolean;
    fadeOut?: boolean;
    entranceY?: number;
    exitScale?: number;
  }
) {
  const {
    fadeIn = true,
    fadeOut = true,
    entranceY = 30,
    exitScale = 0.98,
  } = options || {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  if (fadeIn) {
    tl.fromTo(
      element,
      { opacity: 0, y: entranceY, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.15 }
    );
  }

  // Hold steady state
  tl.to(element, { duration: 0.65 });

  if (fadeOut) {
    tl.to(element, {
      opacity: 0.3,
      y: -15,
      scale: exitScale,
      duration: 0.2,
    });
  }

  return tl;
}

// Re-export for convenience
export { gsap, ScrollTrigger };
