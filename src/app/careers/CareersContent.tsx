"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Globe, Users, Send } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface CareersCMS {
  heroLabel?: string; heroLabelRight?: string;
  headline?: string; description?: string;
  perks?: { title: string; desc: string; icon?: string }[];
  openApplicationTitle?: string; openApplicationDesc?: string;
  formHeadline?: string;
  successTitle?: string; successDesc?: string;
  ctaHeadline?: string; ctaDescription?: string;
}

const ICON_MAP: Record<string, any> = { globe: Globe, users: Users, briefcase: Briefcase };

const DEFAULT_PERKS = [
  { icon: "globe", title: "Remote-Friendly", desc: "Work from anywhere in Europe with flexible hours." },
  { icon: "users", title: "Small Team Impact", desc: "Your work matters — every team member shapes the product." },
  { icon: "briefcase", title: "Growth Industry", desc: "Be part of the fastest-growing event platform in Europe." },
];

export function CareersContent({ cms }: { cms?: CareersCMS }) {
  const [submitted, setSubmitted] = useState(false);

  const headline = cms?.headline || "Join the team";
  const description = cms?.description || "We're always looking for passionate people to join us on our mission to revolutionize event experiences globally.";
  const openAppTitle = cms?.openApplicationTitle || "Open Application";
  const openAppDesc = cms?.openApplicationDesc || "Can't find a role that fits? Send us an open application and we'll keep you in mind.";
  const perks = cms?.perks || DEFAULT_PERKS;

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-left pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || "Careers"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || "We\u0027re hiring"}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
          {headline}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {description}
        </motion.p>
      </section>

      {/* Perks */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map((p, i) => {
            const IconComp = ICON_MAP[p.icon || "globe"] || Globe;
            return (
              <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-tiffany/10 flex items-center justify-center mb-5"><IconComp className="w-5 h-5 text-tiffany" /></div>
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{p.title}</h3>
                <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7]">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Application Form */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{openAppTitle}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">{cms?.formHeadline || "Show us what\nyou\u0027ve got."}</h2>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.8] mt-6">{openAppDesc}</p>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-tiffany/10 text-tiffany rounded-full flex items-center justify-center mb-6 text-2xl">✓</div>
                  <h3 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">{cms?.successTitle || "Application Received"}</h3>
                  <p className="text-[var(--text-secondary)]">{cms?.successDesc || "Thank you for your interest. We\u0027ll be in touch soon."}</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name</label><input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" placeholder="John Doe" /></div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label><input type="email" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" placeholder="john@example.com" /></div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">LinkedIn Profile URL</label><input type="url" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" placeholder="https://linkedin.com/in/johndoe" /></div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Cover Letter / Message</label><textarea rows={4} required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors resize-none" placeholder="Tell us why you'd be a great fit..." /></div>
                  <button type="submit" className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all flex items-center justify-center gap-2"><Send className="w-4 h-4" />Submit Application</button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/leadership" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">{cms?.ctaHeadline || "Meet the team"}</p>
            <p className="text-[var(--text-secondary)] text-sm">{cms?.ctaDescription || "Learn about the people you\u0027d be working with."}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center group-hover:bg-tiffany group-hover:text-black text-tiffany transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
