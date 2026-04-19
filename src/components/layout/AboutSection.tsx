"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Award } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * AboutSection — Editorial manifesto layout.
 *
 * Big typographic "EVENTPARTNER" masthead top-left.
 * Asymmetric columns with manifesto-style large text.
 * Stats woven into the narrative. Team grid below.
 */

const TEAM = [
  { name: "Malin Eriksson", role: "Co-Founder & CEO", initials: "ME" },
  { name: "Johan Andersson", role: "Co-Founder & COO", initials: "JA" },
  { name: "Emma Karlsson", role: "Head of Partnerships", initials: "EK" },
  { name: "David Lindgren", role: "Senior Event Manager", initials: "DL" },
];

const STATS = [
  { value: "36", label: "Länder" },
  { value: "2,048+", label: "Events levererade" },
  { value: "10+", label: "Års erfarenhet" },
  { value: "94%", label: "Nöjda kunder" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-28 md:py-40 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* ─── Masthead: EVENTPARTNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-20 md:mb-28"
        >
          <span className="font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.85] block">
            Event
            <br />
            Partner
          </span>
        </motion.div>

        {/* ─── Manifesto — Asymmetric editorial layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 md:mb-32">

          {/* Left column — narrow, label + pull quote */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-8">
              <span className="text-[#81D8D0] text-xs">◆</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Om oss</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Människor som
              <br />
              <span className="italic font-light text-[var(--text-muted)]">förstår events.</span>
            </h2>

            {/* Mini stats — woven into the sidebar */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
                >
                  <span className="font-display text-2xl font-medium text-[var(--text-primary)] block leading-none">{stat.value}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mt-1 block">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column — wide, manifesto text in large format */}
          <motion.div
            className="lg:col-span-7 lg:col-start-6"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            {/* Large manifesto statement */}
            <p className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.25] mb-10">
              Vi tror att varje event är en möjlighet att bygga något bestående. Inte bara en konferens — ett minne. Inte bara en middag — en relation.
            </p>

            {/* Smaller editorial copy */}
            <div className="space-y-6 border-t border-[var(--border-default)] pt-10">
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">
                EventPartner grundades med en enkel idé: att göra enterprise-eventplanering lika smidigt som att boka ett hotellrum. Med ett nätverk som spänner över hela Europa och ett team med djup erfarenhet inom eventbranschen, gör vi det möjligt.
              </p>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">
                Vi sitter i Medelhavet men arbetar globalt. Vårt team har bakgrund inom eventproduktion, hotellbranschen och tech — och vi kombinerar det till en service som är snabb, personlig och pålitlig.
              </p>
              <p className="text-[20px] font-display font-medium text-[var(--text-primary)] leading-[1.4] mt-8 italic">
                &ldquo;Varje förfrågan behandlas som om det är den enda.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* ─── Team ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex items-center gap-4 mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#81D8D0]">Teamet</p>
            <div className="flex-1 h-[1px] bg-[var(--border-default)]" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
                className="group"
              >
                <div className="p-5 md:p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[#81D8D0]/15 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center text-base font-semibold text-[var(--text-muted)] group-hover:bg-[#81D8D0]/10 group-hover:text-[#81D8D0] group-hover:border-[#81D8D0]/20 transition-all duration-300 mb-4">
                    {member.initials}
                  </div>
                  <h4 className="text-[15px] font-medium text-[var(--text-primary)] leading-tight mb-1">
                    {member.name}
                  </h4>
                  <span className="text-[12px] text-[var(--text-muted)]">
                    {member.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
