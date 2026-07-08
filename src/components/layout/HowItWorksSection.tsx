"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Animated visual scenes — LARGER, with hover states ─── */

function ChatIcon() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-8 rounded-xl border border-white/10 bg-white/[0.04] relative group-hover:border-[#ffffff]/30 group-hover:bg-[#ffffff]/[0.06] transition-all duration-500">
          <div className="absolute bottom-[-5px] left-3 w-3 h-3 border-l border-b border-white/10 group-hover:border-[#ffffff]/30 bg-[#1A1A2E] group-hover:bg-[#1a2028] rotate-[-45deg] transition-colors duration-500" />
          <div className="flex gap-1 items-center justify-center h-full px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ffffff] animate-[pulse_1.5s_ease-in-out_infinite] transition-colors duration-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-[#ffffff] animate-[pulse_1.5s_ease-in-out_0.2s_infinite] transition-colors duration-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#ffffff] animate-[pulse_1.5s_ease-in-out_0.4s_infinite] transition-colors duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LightbulbIcon() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-5 rounded-full bg-[#ffffff]/0 group-hover:bg-[#ffffff]/[0.06] transition-all duration-700" />
        <div className="w-10 h-12 relative">
          <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#ffffff]/30 bg-white/[0.03] group-hover:bg-[#ffffff]/[0.06] flex items-center justify-center transition-all duration-500">
            <div className="w-3 h-5 border-l border-r border-white/15 group-hover:border-[#ffffff]/40 transition-colors duration-500" />
          </div>
          <div className="w-4 h-2 mx-auto border-x border-b border-white/10 group-hover:border-[#ffffff]/20 rounded-b-sm transition-colors duration-500" />
        </div>
        <div className="absolute top-2 -left-4 w-3 h-[1px] bg-white/10 group-hover:bg-[#ffffff]/30 group-hover:w-4 animate-[pulse_2s_ease-in-out_0.5s_infinite] transition-all duration-500" />
        <div className="absolute top-2 -right-4 w-3 h-[1px] bg-white/10 group-hover:bg-[#ffffff]/30 group-hover:w-4 animate-[pulse_2s_ease-in-out_1s_infinite] transition-all duration-500" />
      </div>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-9 h-11 rounded-md border border-white/10 bg-white/[0.03] group-hover:border-[#ffffff]/30 group-hover:bg-[#ffffff]/[0.06] transition-all duration-500 relative">
          <div className="w-4 h-2.5 rounded-b-sm bg-white/15 group-hover:bg-[#ffffff]/30 absolute top-0 left-1/2 -translate-x-1/2 border-x border-b border-white/10 transition-all duration-500" />
          <div className="flex flex-col gap-1.5 pt-5 px-2">
            <div className="w-full h-[1px] bg-white/15 group-hover:bg-[#ffffff]/40 transition-colors duration-500" />
            <div className="w-4/5 h-[1px] bg-white/15 group-hover:bg-[#ffffff]/40 transition-colors duration-500" />
            <div className="w-3/5 h-[1px] bg-white/15 group-hover:bg-[#ffffff]/40 transition-colors duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RocketIcon() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-7 h-11 relative rotate-[45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
          <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#ffffff]/30 bg-white/[0.04] group-hover:bg-[#ffffff]/[0.06] transition-all duration-500" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-red-500/10 group-hover:bg-red-500/20 border-x border-b border-white/10 group-hover:border-[#ffffff]/20 rounded-b-full rotate-[180deg] transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}

function ChartIcon() {
  return (
    <div className="relative w-full h-full flex items-end justify-center gap-1 pb-5">
      {[25, 40, 60, 35, 75].map((h, i) => (
        <div
          key={i}
          className="w-2.5 rounded-t-sm transition-all duration-500"
          style={{
            height: `${h * 0.6}px`,
            background: i === 4 ? "rgba(129,216,208,0.5)" : `rgba(255,255,255,${0.04 + i * 0.02})`,
            border: `1px solid ${i === 4 ? "rgba(129,216,208,0.3)" : "rgba(255,255,255,0.06)"}`,
            animation: `barPulse ${2 + i * 0.3}s ease-in-out ${i * 0.15}s infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes barPulse {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.8); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main ─── */

export function HowItWorksSection() {
  const locale = useLocale();
  const sv = locale === 'sv';

  const STEPS = [
    { number: "01", title: sv ? "Konsultation" : "Consultation", description: sv ? "Ni berättar — vi lyssnar och förstår era behov." : "You tell us — we listen and understand your needs.", visual: ChatIcon },
    { number: "02", title: sv ? "Koncept" : "Concept", description: sv ? "Vi tar fram skräddarsydda venue-förslag." : "We create tailored venue proposals.", visual: LightbulbIcon },
    { number: "03", title: sv ? "Planering" : "Planning", description: sv ? "Logistik, leverantörer, schema — allt samordnat." : "Logistics, suppliers, schedule — all coordinated.", visual: ClipboardIcon },
    { number: "04", title: sv ? "Genomförande" : "Execution", description: sv ? "Vi koordinerar on-site. Ni fokuserar på gästerna." : "We coordinate on-site. You focus on the guests.", visual: RocketIcon },
    { number: "05", title: sv ? "Uppföljning" : "Follow-up", description: sv ? "Feedback och insikter för nästa event." : "Feedback and insights for the next event.", visual: ChartIcon },
  ];

  return (
    <section id="how-it-works" className="relative w-full py-28 md:py-36 overflow-x-hidden overflow-y-visible" style={{ background: "#0e0e14" }}>
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" style={{ background: "radial-gradient(circle closest-side, rgba(120,81,169,0.06), transparent)" }} />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6">
            <span className="text-[#ffffff] text-xs">◆</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{sv ? "Processen" : "The Process"}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.8rem] font-medium tracking-tight text-white leading-[1.05]">
            {sv ? "Hur det fungerar." : "How it works."}
          </h2>
          <p className="mt-5 text-[15px] text-white/35 max-w-md mx-auto leading-relaxed">
            {sv ? "Fem steg. En kontaktperson. Noll krångel." : "Five steps. One contact person. Zero hassle."}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — z-0 so it's behind boxes */}
          <motion.div
            className="hidden lg:block absolute top-[80px] left-[10%] right-[10%] h-px origin-left z-[-1]"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.12) 85%, transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
          />

          {/* Light beam — z-[1] */}
          <div
            className="hidden lg:block absolute top-[78px] h-[5px] w-24 rounded-full pointer-events-none z-[-1]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              animation: "beamTravel 5s ease-in-out infinite",
            }}
          />

          {/* Arrow dots on the line — between each step */}
          <div className="hidden lg:flex absolute top-[75px] left-[10%] right-[10%] justify-around px-[10%] z-0">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-[10px] h-[10px] rounded-full border border-white/20 bg-white/5"
                style={{
                  animation: `dotFill 5s ease-in-out ${0.8 + i * 1}s infinite`,
                }}
              />
            ))}
          </div>

          <div className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((step, i) => {
              const Visual = step.visual;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
                  className="relative flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Step node — solid bg, z-10 so line goes behind */}
                  <div className="relative z-10 w-[150px] h-[150px] md:w-[160px] md:h-[160px] rounded-2xl flex flex-col items-center justify-center mb-6 bg-[#161622] border border-white/[0.08] group-hover:border-purple/40 group-hover:bg-[#1a1a2e] group-hover:shadow-[0_0_40px_rgba(120,81,169,0.12)] transition-all duration-500">
                    <span className="absolute top-2.5 left-1/2 -translate-x-1/2 font-mono text-[9px] font-semibold text-white/60 group-hover:text-white tracking-[0.15em] transition-colors duration-500">
                      {step.number}
                    </span>
                    <Visual />
                  </div>

                  <h3 className="font-display text-[18px] md:text-[22px] font-medium text-white tracking-tight mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-white/60 leading-relaxed max-w-[210px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-24 md:mt-28 max-w-2xl mx-auto"
        >
          <Link
            href="#request"
            className="group flex items-center justify-between p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
          >
            <div>
              <p className="text-[15px] font-semibold text-white">
                {sv ? "Skicka in din förfrågan idag" : "Submit your inquiry today"}
              </p>
              <p className="text-[13px] text-white/35 mt-0.5">
                {sv
                  ? "Alltid 3 skräddarsydda förslag som matchar era behov, från 48 timmar efter att vi mottagit er förfrågan."
                  : "Always 3 tailored proposals matching your needs, from 48 hours after we receive your inquiry."}
              </p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple/20 border border-purple/20 group-hover:bg-purple/30 group-hover:border-purple/40 flex items-center justify-center transition-all duration-300 ml-6">
              <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </div>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes beamTravel {
          0% { left: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(90% - 5rem); opacity: 0; }
        }
        @keyframes dotFill {
          0%, 100% { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); }
          20%, 40% { background: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.6); box-shadow: 0 0 8px rgba(255,255,255,0.3); }
        }
      `}</style>
    </section>
  );
}
