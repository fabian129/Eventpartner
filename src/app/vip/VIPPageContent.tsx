"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Crown, Star, Shield, Users, Clock, Gift, ArrowRight, Check, Sparkles, Play } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const DEFAULT_STATS = [
  { value: "12h", label: "Response time" },
  { value: "10%", label: "Max discount" },
  { value: "36", label: "Countries" },
  { value: "1:1", label: "Dedicated manager" },
];

const DEFAULT_TIERS = [
  { name: "VIP Silver", badge: "Most Popular", price: "Free", priceSub: "Volume-based qualification", features: ["Dedicated account manager", "Priority response within 12h", "5% discount on all bookings", "Access to VIP-only venues", "Quarterly event trend reports"], cta: "Apply Now", highlight: false },
  { name: "VIP Gold", badge: "Enterprise", price: "By Invitation", priceSub: "10+ events per year", features: ["Everything in Silver", "Personal event concierge", "10% discount on all bookings", "Complimentary site inspections", "Custom contract & billing terms", "Exclusive event portfolio reviews", "Priority cancellation flexibility"], cta: "Request Invitation", highlight: true },
];

const DEFAULT_STEPS = [
  { step: "01", title: "Apply", desc: "Fill in your company details and event volume through the form below. Takes less than 2 minutes." },
  { step: "02", title: "Qualify", desc: "Our team reviews your profile and matches you with the right VIP tier based on your needs and volume." },
  { step: "03", title: "Enjoy", desc: "Start receiving priority service, exclusive pricing, and a dedicated account manager from day one." },
];

const DEFAULT_MINI_STATS = [
  { value: "< 12h", label: "Response time" },
  { value: "Up to 10%", label: "Discounts" },
  { value: "1:1", label: "Account manager" },
  { value: "Custom", label: "Contract terms" },
];

type WordSegment = { text: string; accent?: boolean; italic?: boolean };
const MANIFESTO: WordSegment[] = [
  { text: "We" }, { text: "connect" }, { text: "ambitious" }, { text: "companies" }, { text: "with" },
  { text: "extraordinary", accent: true, italic: true }, { text: "venues" }, { text: "—" },
  { text: "rejecting" }, { text: "the" }, { text: "ordinary," }, { text: "prioritising" },
  { text: "precision," }, { text: "and" }, { text: "delivering" }, { text: "events" },
  { text: "that" }, { text: "genuinely", accent: true, italic: true }, { text: "elevate." },
];

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};

function ManifestoReveal() {
  return (
    <motion.p initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } } }} className="font-display text-[clamp(1.6rem,3.8vw,2.8rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.3] text-center max-w-4xl mx-auto">
      {MANIFESTO.map((w, i) => (
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
  const heroStats = cms?.heroStats || DEFAULT_STATS;
  const tiers = cms?.tierCards || DEFAULT_TIERS;
  const steps = cms?.steps || DEFAULT_STEPS;
  const miniStats = cms?.manifestoStats || DEFAULT_MINI_STATS;

  return (
    <main className="relative w-full pt-32 md:pt-44 overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Hero + Video */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20 md:pb-32">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="flex justify-between items-start mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || "EventPartner — VIP Programme"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)] text-right">{cms?.heroLabelRight || "Exclusive access · 3:12"}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: EASE }} className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-medium tracking-[-0.04em] text-[var(--text-primary)] leading-[0.92] mb-16 md:mb-20">
          {cms?.heroHeadline || "Your partner,"}{" "}
          <span className="italic font-light" style={{ background: "linear-gradient(135deg, #7851A9 0%, #9370C4 50%, #6AD8D2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{cms?.heroHeadlineAccent || "not a vendor."}</span>
        </motion.h1>

        <ManifestoReveal />

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, duration: 0.8, ease: EASE }} className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--border-default)] pt-5 mt-16 md:mt-20 mb-20 md:mb-28">
          {heroStats.map((s) => (
            <div key={s.label}>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] block mb-1">{s.label}</span>
              <span className="font-display text-[17px] font-medium text-[var(--text-primary)]">{s.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.9, ease: EASE }} className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-medium tracking-tight text-center mb-12 md:mb-16" style={{ background: "linear-gradient(135deg, #7851A9 0%, #9370C4 50%, #6AD8D2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {cms?.heroAnchorText || "Welcome to the VIP Programme ↓"}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 50, scale: 0.93 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 2.6, duration: 1.2, ease: EASE }} className="relative w-full rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: "16 / 9", boxShadow: "0 30px 80px -20px rgba(0,0,0,0.12)" }}>
          <Image src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop" alt="VIP event experience" fill className="object-cover grayscale brightness-[0.75] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 animate-ping" style={{ animationDuration: "2.5s" }} />
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-purple/25 group-hover:border-purple/40"><Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" fillOpacity={0.9} /></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 z-10 flex justify-between items-end">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1">EventPartner — VIP Programme</p><p className="text-sm text-white/80 font-medium">Discover the VIP experience</p></div>
            <p className="font-mono text-[11px] text-white/40">3:12</p>
          </div>
        </motion.div>
      </section>

      {/* Manifesto */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <div className="flex justify-between items-start mb-8"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.manifestoLabel || "EventPartner — VIP Benefits"}</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">{cms?.manifestoHeadline || "Everything you need."}<br />{cms?.manifestoHeadlineAccent || "Nothing you don\u0027t."}</h2>
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
            <p className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal tracking-tight text-[var(--text-primary)] leading-[1.25] mb-10">&ldquo;{cms?.manifestoQuote || "We don\u0027t treat every client the same — we treat every client as if they\u0027re the only one."}&rdquo;</p>
            <div className="space-y-6 border-t border-[var(--border-default)] pt-10">
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.manifestoBody1 || "Our VIP programme gives your team direct access to a dedicated account manager who understands your brand, your standards, and your history. Every inquiry is prioritised, every proposal is tailored, and every detail is handled with care."}</p>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8]">{cms?.manifestoBody2 || "Whether you\u0027re planning 5 events per year or 50, VIP clients receive custom contract terms, exclusive venue access, and strategic support to optimise your entire event portfolio."}</p>
              <p className="text-[20px] font-display font-medium text-[var(--text-primary)] leading-[1.4] mt-8 italic">&ldquo;{cms?.manifestoMotto || "Priority is not a perk — it\u0027s the standard."}&rdquo;</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="mb-14">
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.tiersLabel || "EventPartner — Membership tiers"}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)] text-right">{cms?.tiersLabelRight || "Two levels"}</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">{cms?.tiersHeadline || "Choose your level."}</h2>
          <p className="font-display text-[clamp(1.1rem,2.2vw,1.5rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-2xl">{cms?.tiersDescription || "Two tiers, designed around your needs. Both include dedicated support — Gold adds enterprise-grade flexibility."}</p>
        </motion.div>
        <div className="bg-[#111111] rounded-2xl p-2 md:p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tiers.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }} className={`relative group overflow-hidden rounded-xl p-8 md:p-10 ${tier.highlight ? "bg-gradient-to-br from-[#1a1a1a] to-[#111]" : "bg-[#161616]"}`} style={{ minHeight: "480px" }}>
                <span className="absolute top-4 left-5 font-mono text-[11px] tracking-[0.12em] text-white/20 font-medium">{String(i + 1).padStart(2, "0")}</span>
                {tier.badge && (<div className="absolute top-4 right-5"><span className={`inline-block font-mono text-[9px] uppercase tracking-[0.12em] px-3 py-1 rounded-full ${tier.highlight ? "bg-purple/15 text-purple-light border border-purple/15" : "bg-white/[0.04] text-white/30 border border-white/[0.06]"}`}>{tier.badge}</span></div>)}
                <div className="mt-12">
                  <h3 className="font-display text-[28px] md:text-[32px] font-medium text-white tracking-tight leading-[1.05] mb-2">{tier.name}</h3>
                  <div className="mb-8">
                    <span className={`font-display text-lg font-medium ${tier.highlight ? "text-purple" : "text-tiffany"}`}>{tier.price}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.1em] mt-1 text-white/25">{tier.priceSub}</span>
                  </div>
                  <ul className="space-y-3 mb-10">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3"><Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? "text-purple/60" : "text-tiffany/50"}`} /><span className="text-[13px] leading-relaxed text-white/45">{f}</span></li>
                    ))}
                  </ul>
                  <a href="/#request" className={`inline-flex items-center gap-2 text-[13px] font-medium transition-all duration-300 ${tier.highlight ? "text-purple hover:text-purple-light" : "text-tiffany hover:text-[#5EC4BA]"}`}>{tier.cta}<ArrowRight className="w-3.5 h-3.5" /></a>
                </div>
                <div className="absolute inset-0 border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500 pointer-events-none rounded-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} className="mb-14">
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.stepsLabel || "EventPartner — How to join"}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.stepsLabelRight || "3 steps"}</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">{cms?.stepsHeadline || "Three simple steps."}</h2>
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
              <span className="text-[13px] font-semibold text-[var(--text-secondary)]">{cms?.ctaCard1Title || "Talk to us"}</span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[15px] md:text-[17px] text-[var(--text-muted)] leading-snug max-w-[200px]">{cms?.ctaCard1Desc || "Get answers to your VIP questions."}</p>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
              </div>
            </Link>
            <Link href="/#request" className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-purple hover:bg-[#6A47A0] transition-all duration-300 min-h-[130px] shadow-[0_8px_32px_rgba(120,81,169,0.15)]">
              <span className="text-[13px] font-semibold text-white/50">{cms?.ctaCard2Title || "Apply for VIP"}</span>
              <div className="flex items-end justify-between mt-4">
                <p className="text-[18px] md:text-[22px] text-white font-medium leading-snug max-w-[280px]">{cms?.ctaCard2Headline || "Start your VIP journey."}<br /><span className="text-white/50">{cms?.ctaCard2Sub || "Today."}</span></p>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors flex-shrink-0"><ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" /></div>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
