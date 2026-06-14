"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, Globe, Shield, MessageCircle, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

interface HelpCMS {
  heroLabel?: string; heroLabelRight?: string;
  heroHeadline?: string; heroHeadlineAccent?: string; heroSubtitle?: string;
  stats?: { value: string; label: string; icon?: string }[];
  channelsLabel?: string; channelsHeadline?: string;
  channels?: { title: string; desc: string; action: string; href: string; icon?: string }[];
  formLabel?: string; formHeadline?: string; formDescription?: string;
  contactEmail?: string; contactPhone?: string;
  ctaHeadline?: string; ctaDescription?: string;
  meetingLabel?: string; meetingTitle?: string; meetingDesc?: string; meetingButton?: string;
}

const ICON_MAP: Record<string, any> = { mail: Mail, phone: Phone, chat: MessageCircle, clock: Clock, globe: Globe, shield: Shield };

export function HelpCenterContent({ cms }: { cms?: HelpCMS }) {
  const t = useTranslations('helpPage');
  const sv = useLocale() === 'sv';
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "support-inquiry",
          ...form
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message.");
      }

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit support request.");
    } finally {
      setLoading(false);
    }
  };

  const defaultStats = [
    { icon: "clock", value: t('stats.response'), label: t('stats.responseLabel') },
    { icon: "globe", value: t('stats.countries'), label: t('stats.countriesLabel') },
    { icon: "shield", value: t('stats.hours'), label: t('stats.hoursLabel') },
  ];
  const stats = cms?.stats || defaultStats;

  const defaultChannels = [
    { icon: "mail", title: t('channels.emailTitle'), desc: t('channels.emailDesc'), action: "support@eventpartner.io", href: "mailto:support@eventpartner.io" },
  ];
  // Phone + live chat hidden until the AI receptionist is live (client request).
  const channels = (cms?.channels || defaultChannels).filter(
    (c) => c.icon !== "phone" && c.icon !== "chat"
  );

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-left pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || t('heroLabel')}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || t('heroLabelRight')}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
          {cms?.heroHeadline || t('heroHeadline')}<br /><span className="text-tiffany">{cms?.heroHeadlineAccent || t('heroHeadlineAccent')}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {cms?.heroSubtitle || t('heroSubtitle')}
        </motion.p>
      </section>

      {/* Stats */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((c, i) => {
            const IconComp = ICON_MAP[c.icon || "clock"] || Clock;
            return (
              <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
                <IconComp className="w-4 h-4 text-tiffany mb-4 opacity-60" />
                <span className="font-display text-3xl font-semibold text-[var(--text-primary)] block leading-none">{c.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mt-2 block">{c.label}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Channels */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.channelsLabel || t('channels.label')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">{cms?.channelsHeadline || t('channels.headline')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((ch, i) => {
            const IconComp = ICON_MAP[ch.icon || "mail"] || Mail;
            return (
              <motion.a key={ch.title} href={ch.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="group p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/20 hover:shadow-lg hover:shadow-tiffany/[0.03] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-tiffany/10 flex items-center justify-center mb-6"><IconComp className="w-5 h-5 text-tiffany" /></div>
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{ch.title}</h3>
                <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-4">{ch.desc}</p>
                <p className="font-mono text-[13px] text-tiffany font-medium">{ch.action}</p>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{cms?.formLabel || t('form.label')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">{cms?.formHeadline || t('form.headline')}</h2>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.8] mt-6">{cms?.formDescription || t('form.description')}</p>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-8 lg:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-tiffany/10 text-tiffany rounded-full flex items-center justify-center mb-6">✓</div>
                  <h3 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">{t('form.successTitle')}</h3>
                  <p className="text-[var(--text-secondary)]">{t('form.successDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('form.name')}</label><input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" value={form.name} onChange={set('name')} /></div>
                    <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('form.email')}</label><input type="email" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" value={form.email} onChange={set('email')} /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('form.subject')}</label>
                    <select required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" value={form.subject} onChange={set('subject')}>
                      <option value="">{t('form.subjectSelect')}</option>
                      <option value="Venue Booking">{t('form.subjectBooking')}</option>
                      <option value="VIP Programme">{t('form.subjectVIP')}</option>
                      <option value="Billing">{t('form.subjectBilling')}</option>
                      <option value="Other">{t('form.subjectOther')}</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('form.message')}</label><textarea rows={4} required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors resize-none" placeholder={t('form.messagePlaceholder')} value={form.message} onChange={set('message')} /></div>
                  
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t('form.sending')}</>
                    ) : (
                      <><Send className="w-4 h-4" />{t('form.send')}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Email Card */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7, ease: EASE }} 
          className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-5 w-full">
            <div className="w-12 h-12 rounded-xl bg-tiffany/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-tiffany" />
            </div>
            <div>
              <p className="text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed">
                {sv ? (
                  <>
                    Maila oss på{" "}
                    <a href="mailto:support@eventpartner.io" className="text-tiffany hover:underline font-medium">
                      support@eventpartner.io
                    </a>
                  </>
                ) : (
                  <>
                    Email us at{" "}
                    <a href="mailto:support@eventpartner.io" className="text-tiffany hover:underline font-medium">
                      support@eventpartner.io
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/faq" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
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
