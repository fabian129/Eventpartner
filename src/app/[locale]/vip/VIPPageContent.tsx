"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Crown, Star, Shield, Users, Clock, Gift, ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

type WordSegment = { text: string; accent?: boolean; italic?: boolean };

const ACCENT_WORDS = ["extraordinary", "genuinely"];

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};

function ManifestoReveal({ text }: { text?: string }) {
  const t = useTranslations('vipPage');
  const defaultText = t('heroIntroText');
  const words = (text || defaultText).split(" ").map((w) => ({
    text: w,
    accent: ACCENT_WORDS.some((a) => w.toLowerCase().startsWith(a)),
    italic: ACCENT_WORDS.some((a) => w.toLowerCase().startsWith(a)),
  }));
  return (
    <motion.p initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } } }} className="font-display text-[clamp(1.6rem,3.8vw,2.8rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] text-center max-w-4xl mx-auto">
      {words.map((w, i) => (
        <motion.span key={i} variants={wordVariants} className={`inline-block mr-[0.3em] ${w.accent ? "text-purple" : ""} ${w.italic ? "italic font-light" : ""}`}>{w.text}</motion.span>
      ))}
    </motion.p>
  );
}

interface VIPCMS {
  heroLabel?: string; heroLabelRight?: string;
  heroHeadline?: string; heroHeadlineAccent?: string;
  heroStats?: { value: string; label: string }[];
  heroAnchorText?: string;
  heroIntroText?: string;
  videoLabel?: string; videoText?: string;
  manifestoLabel?: string; manifestoHeadline?: string; manifestoHeadlineAccent?: string;
  manifestoQuote?: string; manifestoBody1?: string; manifestoBody2?: string;
  manifestoMotto?: string; manifestoStats?: { value: string; label: string }[];
  tiersLabel?: string; tiersLabelRight?: string;
  tiersHeadline?: string; tiersDescription?: string;
  tierCards?: { name: string; badge: string; price: string; priceSub: string; features: string[]; cta: string; highlight: boolean }[];
  stepsLabel?: string; stepsLabelRight?: string; stepsHeadline?: string;
  steps?: { step: string; title: string; desc: string }[];
  ctaCard1Title?: string; ctaCard1Desc?: string;
  ctaCard2Title?: string; ctaCard2Headline?: string; ctaCard2Sub?: string;
}

export function VIPPageContent({ cms }: { cms?: VIPCMS }) {
  const t = useTranslations('vipPage');

  const defaultHeroStats = t.raw('heroStats') as { value: string; label: string }[];
  const heroStats = cms?.heroStats || defaultHeroStats;

  const defaultSteps = t.raw('steps') as { step: string; title: string; desc: string }[];
  const steps = cms?.steps || defaultSteps;

  const defaultMiniStats = t.raw('manifestoStats') as { value: string; label: string }[];
  const miniStats = cms?.manifestoStats || defaultMiniStats;

  const defaultFeatures = t.raw('tierCardFeatures') as string[];

  return (
    <main className="relative w-full pt-32 md:pt-44 overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Hero + Video */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20 md:pb-32">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="flex justify-between items-start mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || t('heroLabel')}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)] text-right">{cms?.heroLabelRight || t('heroLabelRight')}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: EASE }} className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-medium tracking-[-0.04em] text-[var(--text-primary)] leading-[0.92] mb-16 md:mb-20">
          {cms?.heroHeadline || t('heroHeadline')}{" "}
          <span className="italic font-light" style={{ background: "linear-gradient(135deg, #7851A9 0%, #9370C4 50%, #6AD8D2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{cms?.heroHeadlineAccent || t('heroHeadlineAccent')}</span>
        </motion.h1>

        <ManifestoReveal text={cms?.heroIntroText} />

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, duration: 0.8, ease: EASE }} className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--border-default)] pt-5 mt-16 md:mt-20 mb-20 md:mb-28">
          {heroStats.map((s) => (
            <div key={s.label}>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] block mb-1">{s.label}</span>
              <span className="font-display text-[17px] font-medium text-[var(--text-primary)]">{s.value}</span>
            </div>
          ))}
        </motion.div>


      </section>

      {/* Manifesto */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <div className="flex justify-between items-start mb-8"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.manifestoLabel || t('manifestoLabel')}</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">{cms?.manifestoHeadline || t('manifestoHeadline')}<br />{cms?.manifestoHeadlineAccent || t('manifestoHeadlineAccent')}</h2>
            <div className="grid grid-cols-2 gap-4 mt-10">
              {miniStats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}>
                  <span className="font-display text-2xl font-medium text-[var(--text-primary)] block leading-none">{stat.value}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mt-1 block">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <p className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.25] mb-10">&ldquo;{cms?.manifestoQuote || t('manifestoQuote')}&rdquo;</p>
            <div className="space-y-6 border-t border-[var(--border-default)] pt-10">
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.manifestoBody1 || t('manifestoBody1')}</p>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.manifestoBody2 || t('manifestoBody2')}</p>
              <p className="text-[20px] font-display font-medium text-[var(--text-primary)] leading-[1.4] mt-8 italic">&ldquo;{cms?.manifestoMotto || t('manifestoMotto')}&rdquo;</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tiers — Single VIP Card */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="mb-14">
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.tiersLabel || t('tiersLabel')}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)] text-right">{cms?.tiersLabelRight || t('tiersLabelRight')}</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">{cms?.tiersHeadline || t('tiersHeadline')}</h2>
          <p className="font-display text-[clamp(1.1rem,2.2vw,1.5rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-2xl">{cms?.tiersDescription || t('tiersDescription')}</p>
        </motion.div>

        {/* Dark wrapper — same style as original */}
        <div className="bg-[#111111] rounded-2xl p-2 md:p-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#111] transition-shadow duration-700 hover:shadow-[0_0_60px_-12px_rgba(120,81,169,0.15)]"
            style={{ minHeight: "420px" }}
          >
            {/* Corner number */}
            <span className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.12em] text-white/20 font-medium">01</span>

            {/* Badge */}
            <div className="absolute top-5 right-6">
              <span className="inline-block font-mono text-[9px] uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-purple/15 text-purple-light border border-purple/15">{t('tierCardBadge')}</span>
            </div>

            <div className="pt-14 pb-10 px-8 md:px-10 lg:px-12">
              {/* Title + Price */}
              <h3 className="font-display text-[28px] md:text-[32px] font-medium text-white tracking-tight leading-[1.05] mb-2">{t('tierCardTitle')}</h3>
              <div className="mb-8">
                <span className="font-display text-lg font-medium text-purple">{t('tierCardPrice')}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.1em] mt-1 text-white/25">{t('tierCardPriceSub')}</span>
              </div>

              {/* Features — two columns */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 mb-10">
                {defaultFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-purple/60" />
                    <span className="text-[13px] leading-relaxed text-white/45">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="/#request" className="inline-flex items-center gap-2 text-[13px] font-medium text-purple hover:text-purple-light transition-all duration-300">
                {t('tierCardCta')} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Subtle border — purple tint on hover */}
            <div className="absolute inset-0 border border-white/[0.04] group-hover:border-purple/[0.1] transition-colors duration-700 pointer-events-none rounded-xl" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="mb-14">
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.stepsLabel || t('stepsLabel')}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.stepsLabelRight || t('stepsLabelRight')}</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">{cms?.stepsHeadline || t('stepsHeadline')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[var(--border-default)] pt-10">
          {steps.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE }}>
              <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--text-muted)] block mb-4">{s.step}</span>
              <h3 className="font-display text-xl font-medium text-[var(--text-primary)] mb-3 tracking-tight">{s.title}</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
          <div className="max-w-[800px] grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3 md:gap-4">
            <Link href="/#request" className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--text-muted)] transition-all duration-300 min-h-[130px]">
              <span className="text-[13px] font-semibold text-[var(--text-secondary)]">{cms?.ctaCard1Title || t('ctaCard1Title')}</span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[15px] md:text-[17px] text-[var(--text-muted)] leading-snug max-w-[200px]">{cms?.ctaCard1Desc || t('ctaCard1Desc')}</p>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
              </div>
            </Link>
            <Link href="/#request" className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-purple hover:bg-[#6A47A0] transition-all duration-300 min-h-[130px] shadow-[0_8px_32px_rgba(120,81,169,0.15)]">
              <span className="text-[13px] font-semibold text-white/50">{cms?.ctaCard2Title || t('ctaCard2Title')}</span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[18px] md:text-[22px] text-white font-medium leading-snug max-w-[280px]">{cms?.ctaCard2Headline || t('ctaCard2Headline')}<br /><span className="text-white/50">{cms?.ctaCard2Sub || t('ctaCard2Sub')}</span></p>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors flex-shrink-0"><ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" /></div>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
