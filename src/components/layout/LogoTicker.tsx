"use client";

/**
 * LogoTicker — Static client/partner logo banner.
 * Large text logos, no scrolling animation.
 * Centered grid layout with generous spacing.
 */

const DEFAULT_LOGOS = [
  "Volvo", "Ericsson", "H&M", "Spotify", "IKEA",
  "Sandvik", "Atlas Copco", "SEB", "Klarna", "Telia",
];

interface LogoTickerCMS {
  label?: string;
  logos?: string[];
}

export function LogoTicker({ cms }: { cms?: LogoTickerCMS } = {}) {
  const logos = cms?.logos?.length ? cms.logos : DEFAULT_LOGOS;

  return (
    <section className="relative w-full mt-2 pt-8 pb-24 md:pb-32 border-y border-[var(--border-default)] bg-[var(--bg-primary)]">
      {/* Label */}
      <div className="text-center mb-8">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
          {cms?.label || "Trusted by leading companies"}
        </span>
      </div>

      {/* Static logo grid */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 lg:gap-x-16 gap-y-6">
          {logos.map((name) => (
            <span
              key={name}
              className="text-[17px] md:text-[19px] font-semibold text-[var(--text-dim)] tracking-wide opacity-30 hover:opacity-60 transition-opacity duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
