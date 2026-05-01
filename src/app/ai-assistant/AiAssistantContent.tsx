"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, Clock, Shield, ArrowRight, Zap, Globe, MessageSquare } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface AiCMS {
  heroLabel?: string; heroLabelRight?: string;
  heroHeadline?: string; heroHeadlineAccent?: string; heroSubtitle?: string;
  botTitle?: string; botDescription?: string;
  ctaHeadline?: string; ctaDescription?: string;
}

const FEATURES = [
  { icon: Zap, title: "Instant Responses", desc: "Get venue suggestions, pricing estimates, and availability checks in seconds — no waiting for business hours." },
  { icon: Globe, title: "36-Country Knowledge", desc: "Our AI has been trained on venue data across all 36 European markets we operate in." },
  { icon: Shield, title: "Privacy-First", desc: "Your conversations are encrypted and never shared. We take data protection seriously." },
  { icon: MessageSquare, title: "Natural Conversation", desc: "Ask questions in plain language — our assistant understands context and follow-ups." },
];

export function AiAssistantContent({ cms }: { cms?: AiCMS }) {
  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || "AI Assistant"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || "Beta"}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
          {cms?.heroHeadline || "Your intelligent"}<br /><span className="text-tiffany">{cms?.heroHeadlineAccent || "event partner."}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {cms?.heroSubtitle || "Our AI assistant helps you explore venues, get instant answers, and streamline your event planning process — available 24/7 across all 36 European markets."}
        </motion.p>
      </section>

      {/* Bot Preview Card */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/[0.06] p-10 md:p-16">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tiffany/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative flex flex-col items-center text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }} className="w-24 h-24 rounded-2xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center mb-8">
              <Bot className="w-12 h-12 text-tiffany" />
            </motion.div>

            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              {cms?.botTitle || "EP Assistant"}
            </h2>
            <p className="text-white/60 text-lg max-w-lg mb-8">
              {cms?.botDescription || "Our AI assistant is being trained on thousands of venues and events. It will be available soon to help you plan your next event."}
            </p>

            {/* Typing animation placeholder */}
            <div className="flex items-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-2xl px-6 py-4 mb-6">
              <Sparkles className="w-5 h-5 text-tiffany animate-pulse" />
              <span className="text-white/50 text-sm font-mono">Training in progress...</span>
              <div className="flex gap-1 ml-2">
                <span className="w-1.5 h-1.5 bg-tiffany rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="w-1.5 h-1.5 bg-tiffany rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-1.5 h-1.5 bg-tiffany rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">Expected launch Q3 2025</span>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">Capabilities</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">What the assistant<br />will do for you.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/20 hover:shadow-lg hover:shadow-tiffany/[0.03] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-tiffany/10 flex items-center justify-center mb-5"><f.icon className="w-5 h-5 text-tiffany" /></div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{f.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/#request" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">{cms?.ctaHeadline || "Can't wait for the AI?"}</p>
            <p className="text-[var(--text-secondary)] text-sm">{cms?.ctaDescription || "Our human team responds within 24 hours — send us your event request now."}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center group-hover:bg-tiffany group-hover:text-black text-tiffany transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
