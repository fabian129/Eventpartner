"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Animated visual scenes — one per service ─── */
/* All animations run continuously so each row feels alive */

function PinPulse() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Radiating rings — visible pulse */}
      <div
        className="absolute w-14 h-14 rounded-full border-2 border-tiffany/30"
        style={{ animation: 'pingA 2.5s ease-out infinite' }}
      />
      <div
        className="absolute w-9 h-9 rounded-full border border-tiffany/20"
        style={{ animation: 'pingA 2.5s ease-out 0.6s infinite' }}
      />
      {/* Center pin — breathing */}
      <div className="relative z-10 flex flex-col items-center" style={{ animation: 'pinBob 2s ease-in-out infinite' }}>
        <div className="w-5 h-5 rounded-full bg-tiffany/40 group-hover:bg-tiffany/60 border-2 border-tiffany/50 group-hover:border-tiffany/80 transition-all duration-500 shadow-[0_0_16px_rgba(129,216,208,0.25)]" />
        <div className="w-[2px] h-3.5 bg-tiffany/30 group-hover:bg-tiffany/50 transition-colors duration-500 rounded-full" />
      </div>
      <style jsx>{`
        @keyframes pingA {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes pinBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

function LayersStack() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-14 h-12">
        {/* Three layers — sliding back and forth */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-0 h-[3px] rounded-full transition-all duration-500"
            style={{
              top: `${i * 14 + 2}px`,
              width: `${100 - i * 18}%`,
              background: i === 0 ? 'rgba(129,216,208,0.4)' : `rgba(148,163,184, ${0.25 + i * 0.08})`,
              animation: `layerSlide ${2.2 + i * 0.5}s ease-in-out ${i * 0.25}s infinite alternate`,
            }}
          />
        ))}
        {/* Floating node — orbiting */}
        <div
          className="absolute w-3 h-3 rounded-full bg-tiffany/40 group-hover:bg-tiffany/65 border border-tiffany/50 transition-all duration-500 shadow-[0_0_8px_rgba(129,216,208,0.2)]"
          style={{ top: '0', right: '0', animation: 'nodeWander 3s ease-in-out infinite' }}
        />
      </div>
      <style jsx>{`
        @keyframes layerSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(8px); }
        }
        @keyframes nodeWander {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(5px, -4px); }
          66% { transform: translate(-2px, -6px); }
        }
      `}</style>
    </div>
  );
}

function GridConnect() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-2.5">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-all duration-500"
            style={{
              background: [2, 4, 6].includes(i) ? 'rgba(129,216,208,0.45)' : 'rgba(148,163,184,0.25)',
              animation: `gridDot 2s ease-in-out ${i * 0.12}s infinite`,
            }}
          />
        ))}
      </div>
      {/* Connecting lines — animated */}
      <div
        className="absolute w-7 h-[2px] bg-tiffany/25 group-hover:bg-tiffany/45 rounded-full transition-colors duration-500 rotate-45"
        style={{ animation: 'lineGlow 2.5s ease-in-out infinite' }}
      />
      <div
        className="absolute w-5 h-[2px] bg-tiffany/15 group-hover:bg-tiffany/35 rounded-full transition-colors duration-500 -rotate-[30deg]"
        style={{ animation: 'lineGlow 2.5s ease-in-out 0.8s infinite' }}
      />
      <style jsx>{`
        @keyframes gridDot {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.9; }
        }
        @keyframes lineGlow {
          0%, 100% { opacity: 0.2; transform: rotate(45deg) scaleX(1); }
          50% { opacity: 0.6; transform: rotate(45deg) scaleX(1.2); }
        }
      `}</style>
    </div>
  );
}

function BarsRise() {
  return (
    <div className="relative w-full h-full flex items-end justify-center gap-1.5 pb-2">
      {[28, 42, 60, 35, 72].map((h, i) => (
        <div
          key={i}
          className="w-2.5 rounded-t transition-all duration-500"
          style={{
            height: `${h * 0.55}px`,
            background: i === 4 ? 'rgba(129,216,208,0.45)' : i === 2 ? 'rgba(129,216,208,0.25)' : `rgba(148,163,184,${0.15 + i * 0.04})`,
            animation: `barBounce ${1.8 + i * 0.25}s ease-in-out ${i * 0.15}s infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes barBounce {
          0% { transform: scaleY(0.6); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

function OrbitsGlow() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer orbit ring — spinning */}
      <div
        className="absolute w-14 h-14 rounded-full border border-[rgba(148,163,184,0.2)] group-hover:border-purple/25 transition-colors duration-500"
        style={{ animation: 'ringRotate 6s linear infinite' }}
      />
      {/* Inner orbit ring */}
      <div
        className="absolute w-8 h-8 rounded-full border border-dashed border-[rgba(148,163,184,0.12)]"
        style={{ animation: 'ringRotate 4s linear infinite reverse' }}
      />
      {/* Orbiting dot — clearly visible */}
      <div
        className="absolute w-2.5 h-2.5 rounded-full bg-tiffany/50 group-hover:bg-tiffany/75 shadow-[0_0_8px_rgba(129,216,208,0.3)] transition-colors duration-500"
        style={{ animation: 'orbitMove 3.5s linear infinite' }}
      />
      {/* Second smaller orbiting dot */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-purple/30 group-hover:bg-purple/50 transition-colors duration-500"
        style={{ animation: 'orbitMove 5s linear infinite reverse' }}
      />
      {/* Center — pulsing */}
      <div
        className="w-3.5 h-3.5 rounded-full bg-[rgba(148,163,184,0.25)] group-hover:bg-purple/35 transition-all duration-500"
        style={{ animation: 'centerPulse 2s ease-in-out infinite' }}
      />
      <style jsx>{`
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitMove {
          from { transform: rotate(0deg) translateX(22px); }
          to { transform: rotate(360deg) translateX(22px); }
        }
        @keyframes centerPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.25); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

/* ─── Service Data ─── */

const SERVICES = [
  {
    number: "01",
    title: "Venue Sourcing",
    description: "360,000+ venues i 36 länder. Vi hittar rätt lokal baserat på era krav — alltid minst 3 kurerade förslag inom 24 timmar.",
    visual: PinPulse,
  },
  {
    number: "02",
    title: "Fullservice Eventleverans",
    description: "Konferenslokaler, teknik, catering och logi — allt samordnat under ett tak. En kontaktperson, noll krångel.",
    visual: LayersStack,
  },
  {
    number: "03",
    title: "Konferens & Möten",
    description: "Från intima styrelsemöten till storskaliga konferenser med hundratals deltagare. Vi matchar format, teknik och venue.",
    visual: GridConnect,
  },
  {
    number: "04",
    title: "Kick-off & Teambuilding",
    description: "Starter som sätter tonen för hela året. Vi bygger upplevelser som inspirerar team och driver kultur framåt.",
    visual: BarsRise,
  },
  {
    number: "05",
    title: "Middagar & Galor",
    description: "Representationsmiddagar, jubileer och galor i venues som gör intryck. Helhetskoordinering från meny till platsplanering.",
    visual: OrbitsGlow,
  },
];

/* ─── Main Component ─── */

export function ServiceListClean() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
            <span className="text-tiffany text-xs">◆</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Alternativ vy — Clean lista</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Våra tjänster.
          </h2>
        </motion.div>

        {/* Service list */}
        <div className="border-t border-[var(--border-default)]">
          {SERVICES.map((service, i) => {
            const Visual = service.visual;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="group border-b border-[var(--border-default)] py-8 md:py-10 flex items-center gap-6 md:gap-10 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors duration-300 px-2 md:px-4 -mx-2 md:-mx-4 rounded-lg"
              >
                {/* Number */}
                <span className="font-mono text-[11px] text-[var(--text-muted)] group-hover:text-purple transition-colors duration-300 w-8 shrink-0">
                  {service.number}
                </span>

                {/* Title + Description */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl md:text-2xl font-medium text-[var(--text-primary)] tracking-tight group-hover:text-purple transition-colors duration-300 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] leading-relaxed max-w-xl opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                    {service.description}
                  </p>
                </div>

                {/* Animated visual */}
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 relative">
                  <Visual />
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-purple group-hover:translate-x-1 transition-all duration-300 shrink-0 hidden md:block" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-12 md:mt-16"
        >
          <Link
            href="#request"
            className="group flex items-center justify-between p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-purple/20 transition-all duration-300"
          >
            <div>
              <p className="text-[15px] font-medium text-[var(--text-primary)]">Skicka in din förfrågan</p>
              <p className="text-[13px] text-[var(--text-muted)] mt-0.5">Vi matchar er med rätt venue inom 24h.</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-default)] group-hover:bg-purple/10 group-hover:border-purple/20 flex items-center justify-center transition-all duration-300 ml-6">
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-purple transition-colors" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
