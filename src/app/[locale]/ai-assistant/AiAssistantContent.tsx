"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, CheckCircle2, ArrowRight, Brain, Target, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AiAssistantContent() {
  const t = useTranslations('aiAssistant');

  const roiIssues = t.raw('roiIssues') as string[];
  const botFeatures = t.raw('botFeatures') as string[];

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* Hero Section */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-32">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">{t('heroLabel')}</span>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight text-[var(--text-primary)] leading-[1.05] mb-8">
          {t('heroHeadline')} <br />
          <span className="text-tiffany">{t('heroHeadlineAccent')}</span>
        </motion.h1>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,1.5vw,1.125rem)] text-[var(--text-secondary)] leading-[1.7] max-w-3xl space-y-6">
          <p className="font-medium text-[var(--text-primary)] text-xl">{t('heroIntro1')}</p>
          <p>{t('heroIntro2')}</p>
          <p>{t('heroIntro3')}</p>
        </motion.div>
      </section>

      {/* ROI Section */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: EASE }} className="relative overflow-hidden rounded-3xl bg-[var(--bg-card)] border border-[var(--border-default)] p-8 md:p-16">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6">
                {t('roiTitle')}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                {t('roiDescription')}
              </p>
              <p className="text-[var(--text-primary)] font-medium mb-6">
                {t('roiListIntro')}
              </p>
              <ul className="space-y-4">
                {roiIssues.map((issue, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1 flex-shrink-0">✕</span>
                    <span className="text-[var(--text-secondary)]">{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-xl md:text-2xl font-medium text-[var(--text-primary)] mb-6 leading-relaxed">
                  "{t('roiQuote')}"
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {t('roiStat')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bot Feature List */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: EASE }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/[0.06] p-8 md:p-16">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tiffany/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center mb-8">
                <Bot className="w-6 h-6 text-tiffany" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                {t('botTitle')}
              </h2>
              <div className="flex items-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 mb-8 inline-flex">
                <Sparkles className="w-4 h-4 text-tiffany animate-pulse" />
                <span className="text-white/70 text-sm font-mono uppercase tracking-wider">{t('botStatus')}</span>
              </div>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                {t('botSummary')}
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <ul className="space-y-5">
                {botFeatures.map((feature, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + (i * 0.1) }} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
                    <CheckCircle2 className="w-6 h-6 text-tiffany shrink-0 mt-0.5" />
                    <span className="text-white/80 text-lg">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Founders / Sales Experience */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center mx-auto mb-8">
            <Users className="w-6 h-6 text-[var(--text-secondary)]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-8">
            {t('foundersTitle')}
          </h2>
          <div className="text-[1.125rem] text-[var(--text-secondary)] leading-[1.8] space-y-6">
            <p>{t('foundersP1')}</p>
            <p className="text-[var(--text-primary)] font-medium text-xl">{t('foundersP2')}</p>
            <p>{t('foundersP3')}</p>
            <p>{t('foundersP4')}</p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="relative overflow-hidden rounded-3xl bg-tiffany p-10 md:p-16 text-black text-center">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 relative z-10">
            {t('ctaHeadline')}
          </h2>
          <p className="text-black/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
            {t('ctaSub')}
          </p>
          <div className="text-black/90 font-medium text-lg max-w-3xl mx-auto mb-12 space-y-4 relative z-10">
            <p>{t('ctaP1')}</p>
            <p>{t('ctaP2')}</p>
          </div>
          
          <a href="https://cal.eu/pontus-eventpartner" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-black/80 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20">
            {t('ctaButton')}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
