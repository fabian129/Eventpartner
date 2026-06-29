"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

/**
 * LogoTicker — Trusted-by partner logos.
 * Real SVG brand logos in monochrome, with infinite scroll marquee.
 */

interface LogoTickerCMS {
  label?: string;
}

/* Logo entries — ONLY verified Video Plus Print reference customers
   (cross-checked against videoplusprint.com 2026-06-11, per client request P34).
   Swap text entries for real logo files when Pontus's approved files land. */
const LOGOS = [
  { name: "Volvo", src: "/Images/logos/partners/volvo.svg" },
  { name: "Samsung", src: "/Images/logos/partners/samsung.svg" },
  { name: "Google", src: "/Images/logos/partners/google.svg" },
  { name: "PwC", text: "PwC", font: "'Georgia', serif", weight: "700" },
  { name: "LEGO", text: "LEGO", font: "'Arial Black', sans-serif", weight: "900" },
  { name: "Microsoft", text: "Microsoft", font: "'Segoe UI', sans-serif", weight: "600" },
  { name: "BMW", src: "/Images/logos/partners/bmw.svg" },
  { name: "Disney", text: "Disney", font: "'Georgia', serif", weight: "400" },
  { name: "Porsche", src: "/Images/logos/partners/porsche.svg" },
  { name: "Volkswagen", src: "/Images/logos/partners/volkswagen.svg" },
  { name: "Unilever", src: "/Images/logos/partners/unilever.svg" },
  { name: "BBC", text: "BBC", font: "'Arial', sans-serif", weight: "900" },
];

function LogoItem({ logo }: { logo: typeof LOGOS[number] }) {
  if (logo.src) {
    return (
      <Image
        src={logo.src}
        alt={logo.name}
        width={160}
        height={48}
        className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-500 cursor-pointer grayscale hover:grayscale-0"
      />
    );
  }

  return (
    <span
      className="text-[18px] md:text-[22px] whitespace-nowrap opacity-50 hover:opacity-90 transition-opacity duration-500 select-none cursor-pointer"
      style={{ fontFamily: logo.font, fontWeight: logo.weight, color: "#1A1A1A", letterSpacing: "0.08em" }}
    >{logo.text}</span>
  );
}

export function LogoTicker({ cms }: { cms?: LogoTickerCMS } = {}) {
  const sv = useLocale() === 'sv';
  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden" style={{ background: "#EAEAED" }}>
      {/* Label */}
      <div className="text-center mb-8">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/30">
          {cms?.label || (sv ? "Betrodda av ledande företag" : "Trusted by leading companies")}
        </span>
      </div>

      {/* Marquee container */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #EAEAED, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #EAEAED, transparent)" }} />

        {/* Scrolling track */}
        <div className="flex animate-[marquee_14s_linear_infinite] hover:[animation-play-state:paused]" style={{ willChange: 'transform' }}>
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center shrink-0 px-8 md:px-12 cursor-default"
              title={logo.name}
            >
              <LogoItem logo={logo} />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
