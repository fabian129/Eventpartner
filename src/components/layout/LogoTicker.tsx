"use client";

/**
 * LogoTicker — Infinite scrolling client/partner logo banner.
 * Placed right after Hero for social proof.
 * CSS-only animation for performance.
 */

const LOGOS = [
  "Volvo", "Ericsson", "H&M", "Spotify", "IKEA",
  "Sandvik", "Atlas Copco", "SEB", "Handelsbanken", "Telia",
  "ABB", "Scania", "Klarna", "Northvolt", "Vattenfall",
];

export function LogoTicker() {
  return (
    <section className="relative w-full mt-8 py-8 md:py-10 overflow-hidden border-y border-[var(--border-default)] bg-[var(--bg-primary)]">
      {/* Label */}
      <div className="text-center mb-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
          Betrodda av ledande företag
        </span>
      </div>

      {/* Scrolling track */}
      <div className="relative flex overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10" />

        {/* Double track for seamless loop */}
        <div className="flex animate-[tickerScroll_30s_linear_infinite] gap-12 md:gap-16">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <span className="text-[14px] md:text-[15px] font-medium text-[var(--text-dim)] tracking-wide whitespace-nowrap opacity-40 hover:opacity-70 transition-opacity duration-300">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
