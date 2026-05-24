"use client";

import Image from "next/image";

/**
 * LogoTicker — Trusted-by partner logos.
 * Real SVG brand logos in monochrome, with infinite scroll marquee.
 */

interface LogoTickerCMS {
  label?: string;
}

/* Logo entries — mix of real SVG files and text fallbacks */
const LOGOS = [
  { name: "Volvo", src: "/Images/logos/partners/volvo.svg" },
  { name: "Samsung", src: "/Images/logos/partners/samsung.svg" },
  { name: "Ericsson", src: "/Images/logos/partners/ericsson.svg" },
  { name: "PwC", text: "PwC", font: "'Georgia', serif", weight: "700" },
  { name: "H&M", text: "H&M", font: "'Didot', 'Times New Roman', serif", weight: "700" },
  { name: "LEGO", text: "LEGO", font: "'Arial Black', sans-serif", weight: "900" },
  { name: "Spotify", src: "/Images/logos/partners/spotify.svg" },
  { name: "BMW", src: "/Images/logos/partners/bmw.svg" },
  { name: "IKEA", src: "/Images/logos/partners/ikea.svg" },
  { name: "Sandvik", text: "SANDVIK", font: "'Helvetica Neue', sans-serif", weight: "700" },
  { name: "Atlas Copco", text: "Atlas Copco", font: "'Helvetica Neue', sans-serif", weight: "700" },
  { name: "SEB", text: "SEB", font: "'Arial Black', sans-serif", weight: "900" },
  { name: "Klarna", src: "/Images/logos/partners/klarna.svg" },
  { name: "Telia", text: "Telia", font: "'Helvetica Neue', sans-serif", weight: "700" },
];

function LogoItem({ logo }: { logo: typeof LOGOS[number] }) {
  if (logo.src) {
    return (
      <Image
        src={logo.src}
        alt={logo.name}
        width={160}
        height={48}
        className="h-8 md:h-10 w-auto object-contain grayscale opacity-25 hover:grayscale-0 hover:opacity-60 transition-all duration-500"
      />
    );
  }

  return (
    <span
      className="text-[18px] md:text-[22px] whitespace-nowrap opacity-20 hover:opacity-50 transition-opacity duration-500 select-none"
      style={{ fontFamily: logo.font, fontWeight: logo.weight, color: "#000", letterSpacing: "0.08em" }}
    >{logo.text}</span>
  );
}

export function LogoTicker({ cms }: { cms?: LogoTickerCMS } = {}) {
  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden" style={{ background: "#EAEAED" }}>
      {/* Label */}
      <div className="text-center mb-8">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/30">
          {cms?.label || "Trusted by leading companies"}
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
        <div className="flex animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]" style={{ willChange: 'transform' }}>
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
