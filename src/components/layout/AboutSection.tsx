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

const DEFAULT_STATS = [
  { value: "36", label: "Countries" },
  { value: "2,048+", label: "Events delivered" },
  { value: "2,400+", label: "Venue partners" },
  { value: "94%", label: "Customer satisfaction" },
];

interface AboutCMS {
  label?: string;
  labelRight?: string;
  headline?: string;
  headlineAccent?: string;
  quote?: string;
  body?: string;
  body2?: string;
  motto?: string;
  stats?: { value: string; label: string }[];
  teamLabel?: string;
  teamIntro?: string;
  team?: { name: string; role: string; initials: string }[];
}

export function AboutSection({ cms }: { cms?: AboutCMS }) {
  const stats = cms?.stats?.length ? cms.stats : DEFAULT_STATS;
  return (
    <section id="about" className="relative w-full py-28 md:py-40 overflow-hidden">
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
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
                {cms?.label || "EventPartner — About Us"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
                Pan-European network
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">
              {cms?.headline || "People who"}
              <br />
              {cms?.headlineAccent || "understand events."}
            </h2>

            {/* Mini stats — woven into the sidebar */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat, i) => (
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
              {cms?.quote || "We believe every event is an opportunity to build something lasting. Not just a conference — a memory. Not just a dinner — a relationship."}
            </p>

            {/* Smaller editorial copy */}
            <div className="space-y-6 border-t border-[var(--border-default)] pt-10">
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">
                {cms?.body || "EventPartner was founded on a simple idea: to make enterprise event planning as smooth as booking a hotel room. With a network spanning all of Europe and a team with deep experience in the event industry, we make it possible."}
              </p>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">
                {cms?.body2 || "We're based in the Mediterranean but work globally. Our team has backgrounds in event production, hospitality, and tech — and we combine it into a service that is fast, personal, and reliable."}
              </p>
              <p className="text-[20px] font-display font-medium text-[var(--text-primary)] leading-[1.4] mt-8 italic">
                &ldquo;{cms?.motto || "Every inquiry is treated as if it's the only one."}&rdquo;
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
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6">{cms?.teamLabel || "The Team"}</p>

          <p className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] mb-14 max-w-3xl">
            {cms?.teamIntro || "A small team with deep experience in event production, hospitality, and tech — treating every inquiry as their own."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {(cms?.team || TEAM).map((member, i) => (
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
