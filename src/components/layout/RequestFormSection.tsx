"use client";

import { useTranslations } from 'next-intl';

import Image from "next/image";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, ExternalLink, Calendar, Loader2 } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";
import Link from "next/link";

export function RequestFormSection({ cms }: { cms?: {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  description?: string;
  button?: string;
  disclaimer?: string;
  inquiryLabel?: string;
  extendedTitle?: string;
  extendedDesc?: string;
  extendedLink?: string;
  meetingLabel?: string;
  meetingTitle?: string;
  meetingDesc?: string;
  meetingButton?: string;
  successMessage?: string;
} }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flexibility, setFlexibility] = useState('');
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const t = useTranslations('requestForm');

  // Controlled form state
  const [form, setForm] = useState({
    company: '', contact: '', email: '', phone: '',
    country: '', city: '', eventType: '', guests: '',
    dateFrom: '', dateTo: '', dateMonth: '',
    budget: '', responseTime: '', message: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const datePayload = {
      from: form.dateFrom,
      to: form.dateTo,
      flexibility: flexibility || 'Exact'
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'event-inquiry',
          company: form.company,
          contact: form.contact,
          email: form.email,
          phone: form.phone,
          country: form.country,
          city: form.city,
          eventType: form.eventType,
          guests: form.guests,
          date: datePayload,
          budget: form.budget,
          responseTime: form.responseTime,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      setForm({ company: '', contact: '', email: '', phone: '', country: '', city: '', eventType: '', guests: '', dateFrom: '', dateTo: '', dateMonth: '', budget: '', responseTime: '', message: '' });
      setFlexibility('');
    } catch (err: any) {
      setError(err.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full rounded-xl py-3.5 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-tiffany/30 focus:border-tiffany/50 transition-all font-sans ${
    isDark
      ? "bg-[#111] border border-white/[0.08] text-white placeholder-white/25"
      : "bg-white border border-black/[0.12] text-[#111] placeholder-[#94A3B8] shadow-sm"
  }`;
  const labelClass = "block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] mb-2";
  const requiredStar = <span className="text-tiffany ml-0.5">*</span>;

  return (
    <section id="request" className="relative w-full px-6 md:px-10 py-20 md:py-32 overflow-x-hidden overflow-y-visible" style={{ background: isDark ? "#0A0A0A" : "#EAEAED" }}>
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-[0.06]" style={{ background: "var(--color-purple)" }} />
      <div className="absolute top-20 left-2/3 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-[0.05]" style={{ background: "var(--color-tiffany)" }} />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-12 md:mb-16"
        >
          {/* Mono labels */}
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.inquiryLabel || t('label')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.badge || t('labelRight')}
            </span>
          </div>

          {/* Two-column: heading left, description right */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[1.05] pb-2">
              {cms?.headline || t('headline')}
              <br />
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple-light to-tiffany pb-2 inline-block">{cms?.headlineAccent || t('headlineAccent')}</span>
            </h2>
            <p className="font-display text-[clamp(1rem,2vw,1.3rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-sm md:text-right">
              {cms?.description || t('description')}
            </p>
          </div>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
          className="bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-2xl p-8 md:p-12 transition-colors duration-500"
          style={{ boxShadow: isDark ? "0 4px 60px rgba(0,0,0,0.3)" : "0 4px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)" }}
        >
          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 mb-10 pb-8 border-b border-[var(--border-default)]">
            {[
              { value: "24h", label: "Response time" },
              { value: "3", label: "Matched proposals" },
              { value: "Free", label: "Cost" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-display text-2xl md:text-3xl font-medium text-[var(--text-primary)] block">{stat.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)]">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Form fields — Row 1: Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div>
              <label className={labelClass}>{t('fields.company.label')}{requiredStar}</label>
              <input type="text" placeholder={t('fields.company.placeholder')} required className={inputClass} value={form.company} onChange={set('company')} />
            </div>
            <div>
              <label className={labelClass}>{t('fields.name.label')}{requiredStar}</label>
              <input type="text" placeholder={t('fields.name.placeholder')} required className={inputClass} value={form.contact} onChange={set('contact')} />
            </div>
            <div>
              <label className={labelClass}>{t('fields.email.label')}{requiredStar}</label>
              <input type="email" placeholder={t('fields.email.placeholder')} required className={inputClass} value={form.email} onChange={set('email')} />
            </div>
          </div>

          {/* Row 2: Phone + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div>
              <label className={labelClass}>{t('fields.phone.label')}{requiredStar}</label>
              <input type="tel" placeholder={t('fields.phone.placeholder')} required className={inputClass} value={form.phone} onChange={set('phone')} />
            </div>
            <div>
              <label className={labelClass}>{t('fields.location.label')}{requiredStar}</label>
              <input type="text" placeholder={t('fields.location.placeholder')} required className={inputClass} value={form.country} onChange={set('country')} />
            </div>
            <div>
              <label className={labelClass}>{t('fields.location.label')}</label>
              <input type="text" placeholder={t('fields.location.placeholder')} className={inputClass} value={form.city} onChange={set('city')} />
            </div>
          </div>

          {/* Row 3: Event details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div>
              <label className={labelClass}>{t('fields.eventType.label')}</label>
              <select className={inputClass} value={form.eventType} onChange={set('eventType')}>
                <option value="">{t('fields.eventType.placeholder')}</option>
                <option>Conference</option>
                <option>Corporate Event</option>
                <option>Team Building</option>
                <option>Product Launch</option>
                <option>Gala / Dinner</option>
                <option>Kick-off</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>{t('fields.guests.label')}{requiredStar}</label>
              <input
                type="number"
                placeholder="Enter exact number"
                min={1}
                required
                className={inputClass}
                value={form.guests}
                onChange={set('guests')}
              />
            </div>
            <div>
              <label className={labelClass}>{t('fields.date.label')}</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--text-dim)] mb-1">From / Från</span>
                  <input type="date" className={inputClass} value={form.dateFrom} onChange={set('dateFrom')} />
                </div>
                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--text-dim)] mb-1">To / Till</span>
                  <input type="date" className={inputClass} value={form.dateTo} onChange={set('dateTo')} />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
                  {t('fields.date.flexibility')}
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {['Exact', '± 1 day', '± 3 days', '± 1 week', 'Entire month'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFlexibility(opt === 'Exact' ? '' : opt)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        (opt === 'Exact' ? !flexibility : flexibility === opt)
                          ? 'bg-tiffany/10 border-tiffany/30 text-tiffany shadow-[0_0_12px_rgba(74,222,210,0.1)]'
                          : isDark
                            ? 'border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60'
                            : 'border-black/[0.08] text-black/35 hover:border-black/15 hover:text-black/55'
                      }`}
                    >
                      {opt === 'Exact' ? t('fields.date.exact') : opt === 'Entire month' ? t('fields.date.entireMonth') : opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div>
              <label className={labelClass}>{t('fields.budget.label')}</label>
              <input
                type="text"
                placeholder={t('fields.budget.placeholder')}
                className={inputClass}
                value={form.budget}
                onChange={set('budget')}
              />
            </div>
            <div>
              <label className={labelClass}>Response time</label>
              <select className={inputClass} value={form.responseTime} onChange={set('responseTime')}>
                <option value="">Select timeframe</option>
                <option>Within 24 hours</option>
                <option>Within 48 hours</option>
                <option>Within 72 hours</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className={labelClass}>{t('fields.message.label')}</label>
            <textarea rows={4} placeholder={t('fields.message.placeholder')} className={`${inputClass} resize-none`} value={form.message} onChange={set('message')} />
          </div>

          {/* Extended inquiry link */}
          <div className="mb-8 p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                <ExternalLink className="w-4 h-4 text-purple" />
              </div>
              <div>
                <p className="text-[14px] text-[var(--text-primary)] font-medium mb-1">
                  {cms?.extendedTitle || "Is your event larger or more complex?"}
                </p>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-2">
                  {cms?.extendedDesc || "Fill in our extended form to give us more detailed information — venue requirements, catering, activities, and more."}
                </p>
                <Link
                  href="/customize"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-purple hover:text-purple-light transition-colors duration-300"
                >
                  {cms?.extendedLink || "Customize your event →"}
                </Link>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Big submit button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={submitted || loading}
              className={`relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-[15px] font-semibold rounded-2xl transition-all duration-500 overflow-hidden group ${
                submitted
                  ? "!opacity-100 bg-tiffany text-[#0A0A0A] cursor-default"
                  : loading
                    ? "opacity-60 cursor-wait " + (isDark ? "text-[#0A0A0A] bg-white" : "text-white bg-[#111]")
                    : isDark
                      ? "text-[#0A0A0A] bg-white hover:bg-white/90"
                      : "text-white bg-[#111] hover:bg-[#222]"
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" />{t('submitting')}</>
                ) : submitted ? (
                  <><CheckCircle className="w-5 h-5" />{cms?.successMessage || t('success.description')}</>
                ) : (
                  <>
                    {cms?.button || t('submit')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
              {/* Shimmer */}
              <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </span>
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
              {cms?.disclaimer || t('disclaimer')}
            </span>
          </div>
        </motion.form>

        {/* Book Meeting Alternative with Malin */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          className="mt-6 md:mt-8 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-500"
          style={{ boxShadow: isDark ? "0 4px 40px rgba(0,0,0,0.15)" : "0 4px 40px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-[var(--border-default)]">
              {/* Real Malin picture */}
              <Image 
                src="/Images/Team/malin-color-real.webp" 
                alt="Malin Eriksson — EventPartner" 
                width={80} 
                height={80} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-purple mb-1">{cms?.meetingLabel || t('meetingSection.label')}</p>
              <h3 className="font-display text-lg md:text-xl font-medium text-[var(--text-primary)]">{cms?.meetingTitle || t('meetingSection.headline')}</h3>
              <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
                {cms?.meetingDesc || t('meetingSection.description')}
              </p>
            </div>
          </div>
          <a
            href="https://cal.com/eventpartner/15min"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full md:w-auto inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-medium transition-colors ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                : 'bg-black/5 hover:bg-black/10 text-[#111] border border-black/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {cms?.meetingButton || t('meetingSection.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
