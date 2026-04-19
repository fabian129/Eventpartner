"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, ExternalLink } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";
import Link from "next/link";

export function RequestFormSection({ cms }: { cms?: {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  description?: string;
  button?: string;
  disclaimer?: string;
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

  const inputClass = `w-full rounded-xl py-3.5 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#6AD8D2]/30 focus:border-[#6AD8D2]/50 transition-all font-sans ${
    isDark
      ? "bg-[#111] border border-white/[0.08] text-white placeholder-white/25"
      : "bg-white border border-black/[0.12] text-[#111] placeholder-[#94A3B8] shadow-sm"
  }`;
  const labelClass = "block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] mb-2";
  const requiredStar = <span className="text-[#6AD8D2] ml-0.5">*</span>;

  return (
    <section id="request" className="relative w-full px-6 md:px-10 py-20 md:py-32 overflow-hidden" style={{ background: isDark ? "#0A0A0A" : "#EAEAED" }}>
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none opacity-[0.06]" style={{ background: "#6AD8D2" }} />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] mb-6">
            <Send className="w-3.5 h-3.5 text-[#6AD8D2]" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.badge || "Free inquiry"}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-5">
            {cms?.headline || "Tell us what you need."}
            <br />
            <span className="italic font-light text-[var(--text-muted)]">{cms?.headlineAccent || "We'll handle the rest."}</span>
          </h2>
          <p className="text-[15px] text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            {cms?.description || "Fill in the form below and we'll get back to you with tailored proposals within 24 hours. Completely free."}
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
          className="bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-3xl p-8 md:p-12 transition-colors duration-500"
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
              <div className="w-8 h-8 rounded-lg bg-[#7851A9]/10 border border-[#7851A9]/20 flex items-center justify-center shrink-0 mt-0.5">
                <ExternalLink className="w-4 h-4 text-[#7851A9]" />
              </div>
              <div>
                <p className="text-[14px] text-[var(--text-primary)] font-medium mb-1">
                  Is your event larger or more complex?
                </p>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-2">
                  Fill in our extended form to give us more detailed information — venue requirements, catering, activities, and more.
                </p>
                <Link
                  href="/skraddarsy"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6AD8D2] hover:text-[#A3E4DE] transition-colors duration-300"
                >
                  Customize your event →
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
                  <><CheckCircle className="w-5 h-5" />Thank you! We'll get back to you within 24h.</>
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
      </div>
    </section>
  );
}
