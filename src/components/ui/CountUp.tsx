"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * CountUp — Scroll-triggered animated number counter.
 *
 * When the element scrolls into view, the number animates
 * from 0 to the target value. Only fires once.
 *
 * Usage:
 *   <CountUp value={360000} suffix="+" duration={2} />
 */

interface CountUpProps {
  value: number;
  duration?: number;  // seconds
  suffix?: string;
  prefix?: string;
  separator?: string; // thousands separator
  className?: string;
}

export function CountUp({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  separator = ",",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const endValue = value;

    function animate(currentTime: number) {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * endValue);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatted = displayValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
