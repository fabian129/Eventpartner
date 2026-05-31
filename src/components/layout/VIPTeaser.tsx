"use client";

import { motion } from "framer-motion";
import { ArrowRight, Crown, UserCheck, Globe, Eye, Headphones, BarChart3, Compass, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── What's included in the VIP programme ── */
const DEFAULT_INCLUSIONS = [
  { icon: Crown, text: "Priority access to Europe's most exclusive venues" },
  { icon: UserCheck, text: "Dedicated senior account manager" },
  { icon: Globe, text: "Preferred rates across 175 countries" },
  { icon: Eye, text: "Complimentary site inspections" },
  { icon: Headphones, text: "24/7 concierge support during events" },
  { icon: BarChart3, text: "Quarterly strategy sessions" },
  { icon: Compass, text: "Early access to new destinations" },
  { icon: Palette, text: "Custom branding packages included" },
];

const ICON_MAP: Record<string, any> = {
  crown: Crown, userCheck: UserCheck, globe: Globe, eye: Eye,
  headphones: Headphones, chart: BarChart3, compass: Compass, palette: Palette,
};

interface VIPTeaserCMS {
  label?: string;
  headline?: string;
  headlineMuted?: string;
  body1?: string;
  body2?: string;
  inclusions?: { text: string; icon?: string }[];
  ctaText?: string;
  ctaSub?: string;
}

export function VIPTeaser({ cms }: { cms?: VIPTeaserCMS } = {}) {
  const t = useTranslations('vipTeaser');
  const inclusions = cms?.inclusions?.length
    ? cms.inclusions.map((item) => ({
        icon: ICON_MAP[item.icon || "crown"] || Crown,
        text: item.text,
      }))
    : DEFAULT_INCLUSIONS;
  return (
    <section className="relative w-full py-28 md:py-40 px-6 md:px-10 overflow-hidden">

      {/* ── Bento Background — sides only, slow drift, seamless fade ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">

        {/* LEFT bento column — fades toward center + top/bottom */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[28%] opacity-[0.18] hidden lg:block"
          style={{
            animation: "bentoDriftUp 45s linear infinite",
            maskImage: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
          }}
        >
          <div className="flex flex-col gap-3 p-4">
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <Image src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
          </div>
        </div>

        {/* RIGHT bento column — fades toward center + top/bottom */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[28%] opacity-[0.18] hidden lg:block"
          style={{
            animation: "bentoDriftDown 50s linear infinite",
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
          }}
        >
          <div className="flex flex-col gap-3 p-4">
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <Image src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <Image src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&q=95" alt="" fill className="object-cover grayscale" sizes="28vw" />
            </div>
          </div>
        </div>

        {/* Drift keyframes */}
        <style jsx>{`
          @keyframes bentoDriftUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-15%); }
          }
          @keyframes bentoDriftDown {
            0% { transform: translateY(-15%); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">

        {/* ── Editorial header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-20"
        >
          {/* Thin purple rule */}
          <div className="w-12 h-px bg-gradient-to-r from-[#7851A9] to-[#6AD8D2] mb-8" />

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9370C4] mb-6">
            {cms?.label || t('label')}
          </p>

          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-white leading-[1.05] tracking-tight max-w-[700px]">
            {cms?.headline || t('headline')}{" "}
            <span className="text-white/30">{cms?.headlineMuted || t('headlineMuted')}</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20">

          {/* Left: editorial copy */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-[16px] md:text-[17px] text-white/50 leading-[1.9] mb-8">
              {cms?.body1 || t('body1')}
            </p>
            <p className="text-[15px] text-white/30 leading-[1.9]">
              {cms?.body2 || t('body2')}
            </p>
          </motion.div>

          {/* Right: inclusions grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-6">
              {t('inclusionsLabel')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inclusions.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                    className="group relative flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-400"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#7851A9]/20 to-[#6AD8D2]/10 flex items-center justify-center group-hover:from-[#7851A9]/30 group-hover:to-[#6AD8D2]/20 transition-all duration-400">
                      <Icon className="w-4 h-4 text-[#9370C4] group-hover:text-[#6AD8D2] transition-colors duration-400" />
                    </div>
                    <span className="text-[13px] text-white/55 leading-relaxed pt-1.5 group-hover:text-white/75 transition-colors duration-400">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── CTA: Application ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <Link href="/vip">
            <span className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-display text-[14px] font-medium text-white/90 hover:text-white transition-all duration-500 cursor-pointer"
              style={{ boxShadow: "0 0 20px rgba(120,81,169,0.15), 0 0 40px rgba(106,216,210,0.08)" }}
            >
              {/* Gradient border */}
              <span className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#7851A9] via-[#9370C4] to-[#6AD8D2] group-hover:p-[1.5px] transition-all duration-500" style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
              {/* Hover glow intensify */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 0 30px rgba(120,81,169,0.3), 0 0 60px rgba(106,216,210,0.15)" }} />
              <span className="relative z-10">{cms?.ctaText || t('ctaText')}</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
          <span className="text-[12px] text-white/15 font-mono tracking-wide">
            {cms?.ctaSub || t('ctaSub')}
          </span>
        </motion.div>

      </div>
    </section>
  );
}
