"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, ExternalLink, Calendar } from "lucide-react";
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = `w-full rounded-xl py-3.5 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-tiffany/30 focus:border-tiffany/50 transition-all font-sans ${
    isDark
      ? "bg-[#111] border border-white/[0.08] text-white placeholder-white/25"
      : "bg-white border border-black/[0.12] text-[#111] placeholder-[#94A3B8] shadow-sm"
  }`;
  const labelClass = "block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] mb-2";
  const requiredStar = <span className="text-tiffany ml-0.5">*</span>;

  return (
    <section id="request" className="relative w-full px-6 md:px-10 py-20 md:py-32 overflow-hidden" style={{ background: isDark ? "#0A0A0A" : "#EAEAED" }}>
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
              {cms?.inquiryLabel || "EventPartner — Inquiry"}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.badge || "Free • 24h response"}
            </span>
          </div>

          {/* Two-column: heading left, description right */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">
              {cms?.headline || "Tell us what you need."}
              <br />
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple-light to-tiffany">{cms?.headlineAccent || "We'll handle the rest."}</span>
            </h2>
            <p className="font-display text-[clamp(1rem,2vw,1.3rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-sm md:text-right">
              {cms?.description || "Fill in the form and we'll deliver tailored proposals within 24 hours. Completely free."}
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
              <label className={labelClass}>Company{requiredStar}</label>
              <input type="text" placeholder="Your company name" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact person{requiredStar}</label>
              <input type="text" placeholder="Name" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email{requiredStar}</label>
              <input type="email" placeholder="you@company.com" required className={inputClass} />
            </div>
          </div>

          {/* Row 2: Phone + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div>
              <label className={labelClass}>Phone{requiredStar}</label>
              <input type="tel" placeholder="+46 70 123 45 67" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Country{requiredStar}</label>
              <input type="text" placeholder="E.g. Sweden, Spain, UK" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input type="text" placeholder="E.g. Stockholm, Barcelona" className={inputClass} />
            </div>
          </div>

          {/* Row 3: Event details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div>
              <label className={labelClass}>Event type</label>
              <select className={inputClass}>
                <option value="">Select type</option>
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
              <label className={labelClass}>Number of guests{requiredStar}</label>
              <input
                type="number"
                placeholder="Enter exact number"
                min={1}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="text"
                placeholder="E.g. June 15-17, 2026 or Flexible"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 4: Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div>
              <label className={labelClass}>Budget (approximate)</label>
              <select className={inputClass}>
                <option value="">Not specified</option>
                <option>Under €5,000</option>
                <option>€5,000 – €15,000</option>
                <option>€15,000 – €50,000</option>
                <option>€50,000 – €100,000</option>
                <option>Over €100,000</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className={labelClass}>Message</label>
            <textarea rows={4} placeholder="Tell us about your event — specific wishes, requirements, or anything else we should know..." className={`${inputClass} resize-none`} />
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
                  href="/skraddarsy"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-purple hover:text-purple-light transition-colors duration-300"
                >
                  {cms?.extendedLink || "Customize your event →"}
                </Link>
              </div>
            </div>
          </div>

          {/* Big submit button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={submitted}
              className={`relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-[15px] font-semibold rounded-2xl transition-all duration-500 disabled:opacity-60 overflow-hidden group ${
                isDark
                  ? "text-[#0A0A0A] bg-white hover:bg-white/90"
                  : "text-white bg-[#111] hover:bg-[#222]"
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {submitted ? (
                  <><CheckCircle className="w-5 h-5" />{cms?.successMessage || "Thank you! We'll get back to you within 24h."}</>
                ) : (
                  <>
                    {cms?.button || "Send free inquiry"}
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
              {cms?.disclaimer || "No obligations • Response within 24h"}
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
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-purple mb-1">{cms?.meetingLabel || "Direct contact"}</p>
              <h3 className="font-display text-lg md:text-xl font-medium text-[var(--text-primary)]">{cms?.meetingTitle || "Prefer a quick chat?"}</h3>
              <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
                {cms?.meetingDesc || "Book a 15-min discovery call directly with Malin."}
              </p>
            </div>
          </div>
          <a
            href="#book"
            onClick={(e) => { e.preventDefault(); console.log("Open calendar modal"); }}
            className={`w-full md:w-auto inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-medium transition-colors ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                : 'bg-black/5 hover:bg-black/10 text-[#111] border border-black/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {cms?.meetingButton || "Book meeting"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
