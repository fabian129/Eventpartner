"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const EVENT_TYPES = [
  "Conference", "Corporate Event", "Team Building", "Product Launch",
  "Gala / Dinner", "Kick-off", "Exhibition", "Incentive Travel",
  "Wedding", "Festival", "Other",
];

const BUDGET_OPTIONS = [
  "Not specified", "Under €5,000", "€5,000 – €15,000",
  "€15,000 – €50,000", "€50,000 – €100,000", "Over €100,000",
];

const VENUE_TYPES = [
  "Hotel / Resort", "Conference Center", "Restaurant", "Outdoor / Garden",
  "Castle / Manor", "Rooftop", "Beach Club", "Unique / Unconventional", "No preference",
];

const CATERING_OPTIONS = [
  "Sit-down dinner", "Buffet", "Cocktail / Finger food", "Food trucks",
  "Wine tasting", "Breakfast / Brunch", "No catering needed", "Other",
];

const ACTIVITY_OPTIONS = [
  "Live music / DJ", "Keynote speakers", "Team activities", "Workshops",
  "Entertainment / Show", "Photo / Video", "Decorations / Styling",
  "Transport / Logistics", "AV / Tech setup", "Other",
];

interface CustomizeCMS {
  heroLabel?: string;
  heroLabelRight?: string;
  heroHeadline?: string;
  heroHeadlineAccent?: string;
  heroDescription?: string;
  submitButton?: string;
  successMessage?: string;
  disclaimer?: string;
  backLink?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  eventTitle?: string;
  eventSubtitle?: string;
  venueTitle?: string;
  venueSubtitle?: string;
  cateringTitle?: string;
  cateringSubtitle?: string;
  activitiesTitle?: string;
  activitiesSubtitle?: string;
  anythingElseTitle?: string;
  anythingElseSubtitle?: string;
}

export function CustomizeFormContent({ cms }: { cms?: CustomizeCMS }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleActivity = (a: string) =>
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    "w-full rounded-xl py-3.5 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#6AD8D2]/30 focus:border-[#6AD8D2]/50 transition-all font-sans bg-white border border-black/[0.12] text-[#111] placeholder-[#94A3B8] shadow-sm";
  const labelClass =
    "block font-mono text-[9px] uppercase tracking-[0.12em] text-[#888] mb-2";
  const star = <span className="text-[#6AD8D2] ml-0.5">*</span>;

  return (
    <section className="relative w-full px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" style={{ background: "#EAEAED" }}>
      {/* Glows */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-[0.06]" style={{ background: "#8B5CF6" }} />
      <div className="absolute top-20 left-2/3 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-[0.05]" style={{ background: "#6AD8D2" }} />

      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
          <Link href="/" className="text-[12px] font-mono text-[#888] hover:text-[#555] transition-colors">
            {cms?.backLink || "← Back to home"}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-12 md:mb-16"
        >
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#888]">
              {cms?.heroLabel || "EventPartner — Customize"}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#888]">
              {cms?.heroLabelRight || "Extended form"}
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-medium tracking-tight text-[#111] leading-[1.05] mb-4">
            {cms?.heroHeadline || "Customize your event."}
            <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#6AD8D2]">
              {cms?.heroHeadlineAccent || "Every detail matters."}
            </span>
          </h1>
          <p className="font-display text-[clamp(1rem,2vw,1.2rem)] font-normal text-[#666] leading-[1.5] max-w-lg">
            {cms?.heroDescription || "The more you tell us, the better we can match you with the perfect venues and services. All fields marked with * are required."}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
          className="bg-white border border-black/[0.08] rounded-2xl p-8 md:p-12"
          style={{ boxShadow: "0 4px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)" }}
        >
          {/* ─── Section 1: Contact ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.contactTitle || "Contact information"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.contactSubtitle || "Who should we reach out to?"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              <div><label className={labelClass}>Company{star}</label><input type="text" placeholder="Your company name" required className={inputClass} /></div>
              <div><label className={labelClass}>Contact person{star}</label><input type="text" placeholder="Full name" required className={inputClass} /></div>
              <div><label className={labelClass}>Email{star}</label><input type="email" placeholder="you@company.com" required className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div><label className={labelClass}>Phone{star}</label><input type="tel" placeholder="+46 70 123 45 67" required className={inputClass} /></div>
              <div><label className={labelClass}>Country{star}</label><input type="text" placeholder="E.g. Sweden, Spain, UK" required className={inputClass} /></div>
              <div><label className={labelClass}>City</label><input type="text" placeholder="E.g. Stockholm, Barcelona" className={inputClass} /></div>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 2: Event basics ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.eventTitle || "Event details"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.eventSubtitle || "Tell us about the event itself."}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              <div><label className={labelClass}>Event name</label><input type="text" placeholder="E.g. Annual Sales Kick-off 2026" className={inputClass} /></div>
              <div>
                <label className={labelClass}>Event type{star}</label>
                <select required className={inputClass}>
                  <option value="">Select type</option>
                  {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className={labelClass}>Number of guests{star}</label><input type="number" placeholder="Enter exact number" min={1} required className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div><label className={labelClass}>Start date{star}</label><input type="date" required className={inputClass} /></div>
              <div><label className={labelClass}>End date</label><input type="date" className={inputClass} /></div>
              <div>
                <label className={labelClass}>Budget (approximate)</label>
                <select className={inputClass}>
                  {BUDGET_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 3: Venue ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.venueTitle || "Venue preferences"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.venueSubtitle || "What kind of space are you looking for?"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>Venue type</label>
                <select className={inputClass}>
                  <option value="">Select preference</option>
                  {VENUE_TYPES.map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div><label className={labelClass}>Preferred location / area</label><input type="text" placeholder="E.g. Central Stockholm, Costa del Sol" className={inputClass} /></div>
            </div>
            <div>
              <label className={labelClass}>Special venue requirements</label>
              <textarea rows={3} placeholder="E.g. wheelchair accessible, outdoor space, sea view, breakout rooms..." className={`${inputClass} resize-none`} />
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 4: Catering ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.cateringTitle || "Catering"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.cateringSubtitle || "What food & drink experience do you want?"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>Catering style</label>
                <select className={inputClass}>
                  <option value="">Select style</option>
                  {CATERING_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className={labelClass}>Dietary requirements</label><input type="text" placeholder="E.g. vegan options, halal, gluten-free" className={inputClass} /></div>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 5: Activities & services ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.activitiesTitle || "Activities & services"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.activitiesSubtitle || "Select everything you're interested in."}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {ACTIVITY_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleActivity(a)}
                  className={`px-4 py-2.5 rounded-xl text-[13px] font-medium border transition-all duration-200 ${
                    selectedActivities.includes(a)
                      ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#8B5CF6]"
                      : "bg-white border-black/[0.1] text-[#666] hover:border-black/[0.2] hover:text-[#333]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div>
              <label className={labelClass}>Additional details about activities</label>
              <textarea rows={3} placeholder="Describe any specific activities, entertainment or services you have in mind..." className={`${inputClass} resize-none`} />
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 6: Message ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.anythingElseTitle || "Anything else?"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.anythingElseSubtitle || "Tell us everything we should know to make your event perfect."}</p>
            <textarea rows={5} placeholder="Special requests, theme ideas, inspiration, past experiences — anything helps..." className={`${inputClass} resize-none`} />
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={submitted}
              className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-[15px] font-semibold rounded-2xl transition-all duration-500 disabled:opacity-60 overflow-hidden group text-white bg-[#111] hover:bg-[#222]"
            >
              <span className="relative z-10 flex items-center gap-3">
                {submitted ? (
                  <><CheckCircle className="w-5 h-5" />{cms?.successMessage || "Thank you! We'll get back to you within 24h."}</>
                ) : (
                  <>{cms?.submitButton || "Send detailed inquiry"}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" /></>
                )}
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </span>
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#888]">
              {cms?.disclaimer || "No obligations • Response within 24h • Completely free"}
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
