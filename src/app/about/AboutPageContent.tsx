"use client";

import { motion } from "framer-motion";
import { Globe, Heart, Shield, Zap, Users, MapPin, Calendar, Award, ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const ICON_MAP: Record<string, any> = { heart: Heart, zap: Zap, globe: Globe, shield: Shield };
const STAT_ICONS = [MapPin, Calendar, Users, Award];

const DEFAULT_TEAM = [
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

const DEFAULT_VALUES = [
  { icon: Heart, title: "Personal Service", description: "Every inquiry is handled by a real person, not a chatbot. We believe in relationships built on trust and genuine care." },
  { icon: Zap, title: "Speed & Reliability", description: "Proposals within 24 hours, always. We know that time-critical event planning doesn't wait for anyone." },
  { icon: Globe, title: "Pan-European Reach", description: "One partner across 36 countries. No more juggling local agencies — we handle everything from Stockholm to Barcelona." },
  { icon: Shield, title: "Transparency", description: "No hidden fees, clear pricing, and a comparison of at least 3 venue options for every single request." },
];

interface AboutCMS {
  heroLabel?: string; heroLabelRight?: string;
  heroHeadline?: string; heroHeadlineAccent?: string; heroHeadlineLine3?: string;
  heroSubtitle?: string;
  stats?: { value: string; label: string }[];
  storyLabel?: string; storyHeadline?: string; storyHeadlineAccent?: string;
  storyQuote?: string; storyBody1?: string; storyBody2?: string;
  valuesLabel?: string; valuesHeadline?: string; valuesHeadlineAccent?: string;
  valueCards?: { title: string; description: string; icon?: string }[];
  teamLabel?: string; teamIntro?: string;
  teamMembers?: { name: string; role: string; initials: string }[];
  ctaHeadline?: string; ctaDescription?: string;
}

export function AboutPageContent({ cms }: { cms?: AboutCMS }) {
  const stats = cms?.stats || DEFAULT_STATS;
  const values = cms?.valueCards?.map(v => ({ icon: ICON_MAP[v.icon || "heart"] || Heart, title: v.title, description: v.description })) || DEFAULT_VALUES;
  const team = cms?.teamMembers || DEFAULT_TEAM;

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || "About EventPartner"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || "Est. 2024"}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
          {cms?.heroHeadline || "People who"}<br />
          <span className="text-[#6AD8D2]">{cms?.heroHeadlineAccent || "understand"}</span><br />
          {cms?.heroHeadlineLine3 || "events."}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {cms?.heroSubtitle || "EventPartner was founded on one idea: to make enterprise event planning as seamless as booking a hotel room. With a network spanning 36 European countries and deep industry expertise, we make it possible — every day."}
        </motion.p>
      </section>

      {/* Stats */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => { const IC = STAT_ICONS[i] || MapPin; return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }} className="relative p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] group hover:border-[#6AD8D2]/30 transition-all duration-300">
              <IC className="w-4 h-4 text-[#6AD8D2] mb-4 opacity-60" />
              <span className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] block leading-none">{stat.value}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mt-2 block">{stat.label}</span>
            </motion.div>
          ); })}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">{cms?.storyLabel || "Our Story"}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">{cms?.storyHeadline || "From idea to"}<br />{cms?.storyHeadlineAccent || "industry leader."}</h2>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <p className="font-display text-[clamp(1.3rem,3vw,2rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] mb-8">&ldquo;{cms?.storyQuote || "We believe every event is an opportunity to build something lasting. Not just a conference — a memory. Not just a dinner — a relationship."}&rdquo;</p>
            <div className="space-y-6 border-t border-[var(--border-default)] pt-8">
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.storyBody1 || "Founded in the Mediterranean but operating across all of Europe, EventPartner connects enterprises with the perfect venue for any occasion. From intimate board dinners to 5,000-person corporate conferences, our team of seasoned event professionals curates tailored proposals — fast."}</p>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.storyBody2 || "Our backgrounds span event production, hospitality, and technology. We combined all three to create a service that is personal, reliable, and remarkably efficient. One inquiry, multiple options, zero hassle."}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">{cms?.valuesLabel || "What We Stand For"}</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">{cms?.valuesHeadline || "Built on principles,"}<br />{cms?.valuesHeadlineAccent || "not just promises."}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] group hover:border-[#6AD8D2]/20 hover:shadow-lg hover:shadow-[#6AD8D2]/[0.03] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#6AD8D2]/10 flex items-center justify-center mb-5"><v.icon className="w-5 h-5 text-[#6AD8D2]" /></div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{v.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7]">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">{cms?.teamLabel || "The Team"}</span>
          <p className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] mb-14 max-w-3xl">{cms?.teamIntro || "A small team with deep experience in event production, hospitality, and tech — treating every inquiry as their own."}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}>
                <div className="aspect-[4/5] rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-4 group hover:bg-[#222] transition-colors duration-300"><span className="text-2xl font-semibold text-white/20 group-hover:text-[#6AD8D2]/40 transition-colors duration-300">{member.initials}</span></div>
                <h4 className="text-[16px] font-medium text-[var(--text-primary)] leading-tight mb-0.5">{member.name}</h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">{member.role}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/#request" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">{cms?.ctaHeadline || "Ready to plan your next event?"}</p>
            <p className="text-[var(--text-secondary)] text-sm">{cms?.ctaDescription || "Send us your inquiry — always free, always personal, always within 24 hours."}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6AD8D2]/10 border border-[#6AD8D2]/20 flex items-center justify-center group-hover:bg-[#6AD8D2] group-hover:text-black text-[#6AD8D2] transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
