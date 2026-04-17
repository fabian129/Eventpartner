"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COUNTRIES } from "@/data/countries";

// Build slug lookup from central data
const SLUG_MAP: Record<string, string> = {};
COUNTRIES.forEach(c => { SLUG_MAP[c.code] = c.slug; });

// Countries with venue counts — 36 European markets
const COUNTRIES_ROW_1 = [
  { code: "se", name: "Sweden", venues: "420+" }, { code: "ie", name: "Ireland", venues: "180+" }, { code: "gb", name: "UK", venues: "1,200+" }, { code: "is", name: "Iceland", venues: "45+" },
  { code: "pt", name: "Portugal", venues: "260+" }, { code: "es", name: "Spain", venues: "540+" }, { code: "fr", name: "France", venues: "760+" },
  { code: "be", name: "Belgium", venues: "180+" }, { code: "nl", name: "Netherlands", venues: "340+" }, { code: "lu", name: "Luxembourg", venues: "35+" },
  { code: "de", name: "Germany", venues: "890+" }, { code: "ch", name: "Switzerland", venues: "310+" }, { code: "at", name: "Austria", venues: "220+" },
  { code: "it", name: "Italy", venues: "680+" }, { code: "mt", name: "Malta", venues: "40+" }, { code: "dk", name: "Denmark", venues: "280+" },
  { code: "no", name: "Norway", venues: "210+" }, { code: "fi", name: "Finland", venues: "190+" }, { code: "ee", name: "Estonia", venues: "60+" },
];

const COUNTRIES_ROW_2 = [
  { code: "lv", name: "Latvia", venues: "55+" }, { code: "lt", name: "Lithuania", venues: "70+" }, { code: "pl", name: "Poland", venues: "350+" },
  { code: "cz", name: "Czechia", venues: "170+" }, { code: "sk", name: "Slovakia", venues: "95+" }, { code: "hu", name: "Hungary", venues: "140+" },
  { code: "si", name: "Slovenia", venues: "65+" }, { code: "hr", name: "Croatia", venues: "120+" }, { code: "ba", name: "Bosnia", venues: "45+" },
  { code: "rs", name: "Serbia", venues: "80+" }, { code: "me", name: "Montenegro", venues: "35+" }, { code: "mk", name: "N. Macedonia", venues: "30+" },
  { code: "al", name: "Albania", venues: "40+" }, { code: "ro", name: "Romania", venues: "160+" }, { code: "bg", name: "Bulgaria", venues: "90+" },
  { code: "gr", name: "Greece", venues: "190+" }, { code: "cy", name: "Cyprus", venues: "55+" },
];

type CountryItem = { code: string; name: string; venues: string };

function CountryRow({ countries, direction, speed }: { countries: CountryItem[]; direction: "left" | "right"; speed: number }) {
  const doubled = [...countries, ...countries];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }} />

      <div
        className="flex items-center gap-4 w-max"
        style={{
          animation: `${direction === "left" ? "scroll-left" : "scroll-right"} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((country, i) => {
          const slug = SLUG_MAP[country.code];
          const card = (
            <div className="flex items-center gap-4 px-6 py-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[#81D8D0]/40 hover:shadow-xl hover:shadow-[#81D8D0]/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              {/* Flag */}
              <div className="w-14 h-10 rounded-lg overflow-hidden border border-[var(--border-subtle)] shrink-0 shadow-sm">
                <Image
                  src={`https://flagcdn.com/w80/${country.code}.png`}
                  alt={country.name}
                  width={80}
                  height={56}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              {/* Info */}
              <div className="flex flex-col min-w-0">
                <span className="text-[16px] font-semibold text-[var(--text-primary)] leading-tight truncate">
                  {country.name}
                </span>
                <span className="font-mono text-[11px] text-[#81D8D0] tracking-wide">
                  {country.venues} venues
                </span>
              </div>
            </div>
          );

          return slug ? (
            <Link key={`${country.code}-${i}`} href={`/land/${slug}`} className="shrink-0 group cursor-pointer">
              {card}
            </Link>
          ) : (
            <div key={`${country.code}-${i}`} className="shrink-0 group cursor-pointer">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CountryFlagsSection() {
  return (
    <section id="coverage" className="relative w-full bg-[var(--bg-primary)] py-20 md:py-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16 px-6"
      >
        <p className="section-label mb-4">Global Coverage</p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05] mb-4">
          36 länder. 360,000+ venues.
          <br />
          <span className="italic font-light text-[var(--text-muted)]">En förfrågan.</span>
        </h2>
        <p className="text-base text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
          Hela Europa — vi har venues som matchar era behov oavsett destination.
        </p>
      </motion.div>

      {/* Country cards ticker — large, interactive */}
      <div className="flex flex-col gap-5">
        <CountryRow countries={COUNTRIES_ROW_1} direction="left" speed={80} />
        <CountryRow countries={COUNTRIES_ROW_2} direction="right" speed={85} />
      </div>

      {/* Stats bar — animated counters */}
      <StatsBar />
    </section>
  );
}

function StatsBar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="flex items-center justify-center gap-8 md:gap-16 mt-12 md:mt-16 px-6"
    >
      <StatCounter value={36} suffix="" label="Länder" active={isInView} />
      <StatCounter value={360} suffix="K+" label="Venues" active={isInView} delay={0.15} />
      <div className="text-center">
        <span className="font-display text-2xl md:text-3xl font-medium text-[var(--text-primary)] block">100%</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)]">Europa</span>
      </div>
      <div className="text-center">
        <span className="font-display text-2xl md:text-3xl font-medium text-[var(--text-primary)] block">24/7</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)]">Support</span>
      </div>
    </motion.div>
  );
}

function StatCounter({ value, suffix, label, active, delay = 0 }: { value: number; suffix: string; label: string; active: boolean; delay?: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => {
      const duration = 2000;
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [active, value, delay]);

  return (
    <div className="text-center">
      <span className="font-display text-2xl md:text-3xl font-medium text-[var(--text-primary)] block tabular-nums">
        {count}{suffix}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)]">{label}</span>
    </div>
  );
}

