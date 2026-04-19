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
  { name: "Pontus Bredal Hansen", role: "Co-Founder & CEO", initials: "PH" },
  { name: "Malin Berlin", role: "Co-Founder & COO", initials: "MB" },
  { name: "Joakim Ström", role: "Head of Partnerships", initials: "JS" },
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
              <span className="text-[#6AD8D2] text-xs">◆</span>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6">Teamet</p>

          <p className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] mb-14 max-w-3xl">
            Ett litet team med djup erfarenhet inom eventproduktion, hotell och tech — som behandlar varje förfrågan som sin egen.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
              >
                {/* Dark portrait square */}
                <div className="aspect-[4/5] rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-4">
                  <span className="text-2xl font-semibold text-white/20">{member.initials}</span>
                </div>
                {/* Plain text — name + role */}
                <h4 className="text-[16px] font-medium text-[var(--text-primary)] leading-tight mb-0.5">
                  {member.name}
                </h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {member.role}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
