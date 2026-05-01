"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, Globe, Shield, MessageCircle, ArrowRight, Send } from "lucide-react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface HelpCMS {
  heroLabel?: string; heroLabelRight?: string;
  heroHeadline?: string; heroHeadlineAccent?: string; heroSubtitle?: string;
  contactEmail?: string; contactPhone?: string;
  ctaHeadline?: string; ctaDescription?: string;
}

const CHANNELS = [
  { icon: Mail, title: "Email Support", desc: "Detailed message — response within 24h.", action: "support@eventpartner.com", href: "mailto:support@eventpartner.com" },
  { icon: Phone, title: "Phone Support", desc: "Speak directly with our team.", action: "+46 8 123 456 78", href: "tel:+468123456" },
  { icon: MessageCircle, title: "Live Chat", desc: "Real-time help for quick questions.", action: "Coming soon", href: "#" },
];

const INFO = [
  { icon: Clock, value: "< 24h", label: "Average response" },
  { icon: Globe, value: "36", label: "Countries covered" },
  { icon: Shield, value: "Mon–Fri", label: "09:00–18:00 CET" },
];

export function HelpCenterContent({ cms }: { cms?: HelpCMS }) {
  const [sent, setSent] = useState(false);

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-left pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || "Help Center"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || "Support"}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
          {cms?.heroHeadline || "We're here"}<br /><span className="text-[#6AD8D2]">{cms?.heroHeadlineAccent || "to help."}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {cms?.heroSubtitle || "Need assistance with your event or have a question about our services? Our dedicated support team is always ready to help."}
        </motion.p>
      </section>

      {/* Stats */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INFO.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/30 transition-all duration-300">
              <c.icon className="w-4 h-4 text-[#6AD8D2] mb-4 opacity-60" />
              <span className="font-display text-3xl font-semibold text-[var(--text-primary)] block leading-none">{c.value}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mt-2 block">{c.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Channels */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">Get in Touch</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">Choose your preferred<br />way to reach us.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHANNELS.map((ch, i) => (
            <motion.a key={ch.title} href={ch.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="group p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/20 hover:shadow-lg hover:shadow-[#6AD8D2]/[0.03] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#6AD8D2]/10 flex items-center justify-center mb-6"><ch.icon className="w-5 h-5 text-[#6AD8D2]" /></div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{ch.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-4">{ch.desc}</p>
              <p className="font-mono text-[13px] text-[#6AD8D2] font-medium">{ch.action}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">Send a Message</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">Tell us what<br />you need.</h2>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.8] mt-6">Fill out the form and our team will get back to you within one business day.</p>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-8 lg:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-[#6AD8D2]/10 text-[#6AD8D2] rounded-full flex items-center justify-center mb-6">✓</div>
                  <h3 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">Message Sent</h3>
                  <p className="text-[var(--text-secondary)]">We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Name</label><input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors" /></div>
                    <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label><input type="email" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Subject</label><select className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors"><option value="">Select a topic...</option><option>Venue Booking</option><option>VIP Programme</option><option>Billing</option><option>Other</option></select></div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label><textarea rows={4} required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors resize-none" placeholder="Tell us how we can help..." /></div>
                  <button type="submit" className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all flex items-center justify-center gap-2"><Send className="w-4 h-4" />Send Message</button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/faq" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">{cms?.ctaHeadline || "Check our FAQ first?"}</p>
            <p className="text-[var(--text-secondary)] text-sm">{cms?.ctaDescription || "Many common questions are already answered."}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6AD8D2]/10 border border-[#6AD8D2]/20 flex items-center justify-center group-hover:bg-[#6AD8D2] group-hover:text-black text-[#6AD8D2] transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
