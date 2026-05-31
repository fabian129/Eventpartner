"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, UserCheck, Globe, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const ICON_MAP: Record<string, any> = { lock: Lock, server: Server, fileCheck: FileCheck, userCheck: UserCheck, eye: Eye, alertTriangle: AlertTriangle };

interface SecurityCMS {
  heroLabel?: string; heroLabelRight?: string; heroBadge?: string;
  heroHeadline?: string; heroHeadlineAccent?: string; heroSubtitle?: string;
  pillarsLabel?: string; pillarsHeadline?: string; pillarsHeadlineAccent?: string;
  pillarCards?: { title: string; description: string; icon?: string }[];
  complianceLabel?: string; complianceHeadline?: string; complianceHeadlineAccent?: string;
  complianceSections?: { category: string; items: string[] }[];
  rightsLabel?: string; rightsHeadline?: string; rightsHeadlineAccent?: string;
  rightsIntro?: string; rightsList?: { right: string; desc: string }[];
  dpoTitle?: string; dpoSubtitle?: string; dpoDescription?: string; dpoEmail?: string;
  ctaHeadline?: string; ctaDescription?: string;
}

export function SecurityPageContent({ cms }: { cms?: SecurityCMS }) {
  const t = useTranslations('securityPage');

  const defaultPillars = (t.raw('pillars') as { icon: string; title: string; description: string }[]).map(p => ({
    icon: ICON_MAP[p.icon || "lock"] || Lock,
    title: p.title,
    description: p.description,
  }));
  const pillars = cms?.pillarCards?.map(p => ({ icon: ICON_MAP[p.icon || "lock"] || Lock, title: p.title, description: p.description })) || defaultPillars;

  const defaultCompliance = t.raw('complianceSections') as { category: string; items: string[] }[];
  const compliance = cms?.complianceSections || defaultCompliance;

  const defaultRights = t.raw('rights') as { right: string; desc: string }[];
  const rights = cms?.rightsList || defaultRights;

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || t('heroLabel')}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || t('heroLabelRight')}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tiffany/10 border border-tiffany/20 mb-8">
            <Shield className="w-3.5 h-3.5 text-tiffany" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany">{cms?.heroBadge || t('heroBadge')}</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88]">
            {cms?.heroHeadline || t('heroHeadline')}<br /><span className="text-tiffany">{cms?.heroHeadlineAccent || t('heroHeadlineAccent')}</span>
          </h1>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {cms?.heroSubtitle || t('heroSubtitle')}
        </motion.p>
      </section>

      {/* Pillars */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.pillarsLabel || t('pillarsLabel')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">{cms?.pillarsHeadline || t('pillarsHeadline')}<br />{cms?.pillarsHeadlineAccent || t('pillarsHeadlineAccent')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }} className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] group hover:border-tiffany/20 hover:shadow-lg hover:shadow-tiffany/[0.03] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-tiffany/10 flex items-center justify-center mb-5"><p.icon className="w-5 h-5 text-tiffany" /></div>
              <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-2">{p.title}</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compliance */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.complianceLabel || t('complianceLabel')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">{cms?.complianceHeadline || t('complianceHeadline')}<br />{cms?.complianceHeadlineAccent || t('complianceHeadlineAccent')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compliance.map((section, i) => (
            <motion.div key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE }} className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany mb-6">{section.category}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-tiffany/60" /><span className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{item}</span></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Data Rights */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.rightsLabel || t('rightsLabel')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">{cms?.rightsHeadline || t('rightsHeadline')}<br />{cms?.rightsHeadlineAccent || t('rightsHeadlineAccent')}</h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mt-6">{cms?.rightsIntro || t('rightsIntro')}</p>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <div className="space-y-0 divide-y divide-[var(--border-default)]">
              {rights.map((r) => (
                <div key={r.right} className="py-5 first:pt-0 last:pb-0">
                  <h4 className="text-[16px] font-medium text-[var(--text-primary)] mb-1">{r.right}</h4>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">{r.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DPO */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="p-8 md:p-10 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-tiffany/15 flex items-center justify-center shrink-0"><Globe className="w-5 h-5 text-tiffany" /></div>
            <div>
              <h3 className="font-display text-xl font-medium text-white mb-1">{cms?.dpoTitle || t('dpoTitle')}</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">{cms?.dpoSubtitle || t('dpoSubtitle')}</p>
            </div>
          </div>
          <p className="text-[15px] text-white/50 leading-[1.7] mb-6 max-w-2xl">{cms?.dpoDescription || t('dpoDescription')}</p>
          <a href={`mailto:${cms?.dpoEmail || t('dpoEmail')}`} className="inline-flex items-center gap-2 text-tiffany text-sm font-medium hover:text-[#5EC4BA] transition-colors duration-300">{cms?.dpoEmail || t('dpoEmail')}<ArrowRight className="w-4 h-4" /></a>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href={`mailto:${cms?.dpoEmail || t('dpoEmail')}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">{cms?.ctaHeadline || t('ctaHeadline')}</p>
            <p className="text-[var(--text-secondary)] text-sm">{cms?.ctaDescription || t('ctaDescription')}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center group-hover:bg-tiffany group-hover:text-black text-tiffany transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
