"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Heart, Shield, Zap, Users, MapPin, Calendar, Award, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const ICON_MAP: Record<string, any> = { heart: Heart, zap: Zap, globe: Globe, shield: Shield };
const STAT_ICONS = [MapPin, Calendar, Users, Award];

// Team data comes from shared teamMembers.ts — single source of truth

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

  ctaHeadline?: string; ctaDescription?: string;
  teamRoles?: { name: string; role: string }[];
}

export function AboutPageContent({ cms }: { cms?: AboutCMS }) {
  const t = useTranslations('aboutPage');

  const defaultStats = t.raw('stats') as { value: string; label: string }[];
  const stats = cms?.stats || defaultStats;

  const defaultValues = (t.raw('values') as { icon: string; title: string; description: string }[]).map(v => ({
    icon: ICON_MAP[v.icon || "heart"] || Heart,
    title: v.title,
    description: v.description,
  }));
  const values = cms?.valueCards?.map(v => ({ icon: ICON_MAP[v.icon || "heart"] || Heart, title: v.title, description: v.description })) || defaultValues;

  // Per client request (Malin 2026-06-10): no individual portraits on About —
  // the team lives on /leadership; About shows one group photo instead.
  // TODO: set to "/Images/Team/group.webp" once the group photo from Malin's
  // mail is downloaded (attachment 3ffbf9c0-...png). Until then the section is hidden.
  const TEAM_GROUP_IMAGE: string | null = null;

  const tc = useTranslations('common');

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || t('heroLabel')}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || t('heroLabelRight')}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
          {cms?.heroHeadline || t('heroHeadline')}<br />
          <span className="text-tiffany">{cms?.heroHeadlineAccent || t('heroHeadlineAccent')}</span><br />
          {cms?.heroHeadlineLine3 || t('heroHeadlineLine3')}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {cms?.heroSubtitle || t('heroSubtitle')}
        </motion.p>
      </section>

      {/* Stats */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => { const IC = STAT_ICONS[i] || MapPin; return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }} className="relative p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] group hover:border-tiffany/30 transition-all duration-300">
              <IC className="w-4 h-4 text-tiffany mb-4 opacity-60" />
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
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.storyLabel || t('storyLabel')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">{cms?.storyHeadline || t('storyHeadline')}<br />{cms?.storyHeadlineAccent || t('storyHeadlineAccent')}</h2>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <p className="font-display text-[clamp(1.3rem,3vw,2rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] mb-8">&ldquo;{cms?.storyQuote || t('storyQuote')}&rdquo;</p>
            <div className="space-y-6 border-t border-[var(--border-default)] pt-8">
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.storyBody1 || t('storyBody1')}</p>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.storyBody2 || t('storyBody2')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.valuesLabel || t('valuesLabel')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">{cms?.valuesHeadline || t('valuesHeadline')}<br />{cms?.valuesHeadlineAccent || t('valuesHeadlineAccent')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="relative p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] group hover:border-tiffany/20 hover:shadow-lg hover:shadow-tiffany/[0.03] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-tiffany/10 flex items-center justify-center mb-5"><v.icon className="w-5 h-5 text-tiffany" /></div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{v.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7]">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team — one group photo (individual portraits live on /leadership) */}
      {TEAM_GROUP_IMAGE && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.teamLabel || t('teamLabel')}</span>
            <p className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] mb-14 max-w-3xl">{cms?.teamIntro || t('teamIntro')}</p>
            <div className="aspect-[16/9] rounded-2xl bg-[#1a1a1a] relative overflow-hidden group">
              <Image
                src={TEAM_GROUP_IMAGE}
                alt="The EventPartner team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/#request" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
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
