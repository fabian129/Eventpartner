"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/**
 * SectionReveal — Cinematic entrance animation wrapper.
 *
 * Wraps any section content and provides:
 * - Blur → sharp reveal
 * - Opacity 0 → 1
 * - Y/X slide
 * - Staggered children
 *
 * Usage:
 *   <SectionReveal>
 *     <SectionReveal.Item>Header</SectionReveal.Item>
 *     <SectionReveal.Item>Content</SectionReveal.Item>
 *   </SectionReveal>
 *
 * Or simple mode (auto-stagger all direct children):
 *   <SectionReveal stagger>{children}</SectionReveal>
 */

const EASE_DECEL: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  blur?: boolean;
  duration?: number;
  staggerDelay?: number;
  threshold?: number;
  as?: "div" | "section" | "header" | "article";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { staggerDelay: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delay,
    },
  }),
};

function getItemVariants(
  direction: "up" | "left" | "right" | "none",
  blur: boolean,
  duration: number
): Variants {
  // Build animation states
  const hidden: { opacity: number; y?: number; x?: number; filter?: string } = { opacity: 0 };
  const visible: { opacity: number; y?: number; x?: number; filter?: string; transition: { duration: number; ease: readonly [number, number, number, number] } } = {
    opacity: 1,
    transition: { duration, ease: EASE_DECEL },
  };

  if (direction === "up") {
    hidden.y = 30;
    visible.y = 0;
  } else if (direction === "left") {
    hidden.x = 40;
    visible.x = 0;
  } else if (direction === "right") {
    hidden.x = -40;
    visible.x = 0;
  }

  if (blur) {
    hidden.filter = "blur(8px)";
    visible.filter = "blur(0px)";
  }

  return { hidden, visible };
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = true,
  duration = 0.9,
  staggerDelay = 0.1,
  threshold = 0.15,
  as = "div",
}: SectionRevealProps) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      custom={{ staggerDelay, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

/** Animated child item — use inside SectionReveal */
function SectionRevealItem({
  children,
  className = "",
  direction = "up",
  blur = true,
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  blur?: boolean;
  duration?: number;
}) {
  const variants = getItemVariants(direction, blur, duration);

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

SectionReveal.Item = SectionRevealItem;
