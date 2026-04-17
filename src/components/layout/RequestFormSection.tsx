"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";

export function RequestFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = `w-full rounded-xl py-3.5 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#81D8D0]/30 focus:border-[#81D8D0]/50 transition-all font-sans ${
    isDark
      ? "bg-[#111] border border-white/[0.08] text-white placeholder-white/25"
      : "bg-white border border-black/[0.08] text-[#111] placeholder-[#94A3B8]"
  }`;
  const labelClass = "block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] mb-2";

  return (
    <section id="request" className="relative w-full px-6 md:px-10 py-20 md:py-32 overflow-hidden" style={{ background: isDark ? "#0A0A0A" : "#F8F8FA" }}>
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none opacity-[0.06]" style={{ background: "#81D8D0" }} />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] mb-6">
            <Send className="w-3.5 h-3.5 text-[#81D8D0]" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--text-dim)]">
              Kostnadsfri förfrågan
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-5">
            Berätta vad ni söker.
            <br />
            <span className="italic font-light text-[var(--text-muted)]">Vi gör resten.</span>
          </h2>
          <p className="text-[15px] text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            Fyll i formuläret nedan så återkommer vi med kurerade venue-förslag inom 48 timmar. Helt kostnadsfritt.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-3xl p-8 md:p-12 transition-colors duration-500"
          style={{ boxShadow: isDark ? "0 4px 60px rgba(0,0,0,0.3)" : "0 4px 60px rgba(0,0,0,0.06)" }}
        >
          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 mb-10 pb-8 border-b border-[var(--border-default)]">
            {[
              { value: "48h", label: "Svarstid" },
              { value: "3st", label: "Kurerade förslag" },
              { value: "0 kr", label: "Kostnad" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-display text-2xl md:text-3xl font-medium text-[var(--text-primary)] block">{stat.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)]">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div>
              <label className={labelClass}>Företag</label>
              <input type="text" placeholder="Ert företagsnamn" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Kontaktperson</label>
              <input type="text" placeholder="Namn" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>E-post</label>
              <input type="email" placeholder="du@företag.se" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Region</label>
              <select className={inputClass}>
                <option value="">Välj region</option>
                <option>Skandinavien</option>
                <option>Västeuropa</option>
                <option>Sydeuropa</option>
                <option>Östeuropa</option>
                <option>Storbritannien</option>
                <option>Hela Europa</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Antal gäster</label>
              <select className={inputClass}>
                <option value="">Välj</option>
                <option>10–50</option>
                <option>50–150</option>
                <option>150–500</option>
                <option>500–1,000</option>
                <option>1,000+</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Eventtyp</label>
              <select className={inputClass}>
                <option value="">Välj typ</option>
                <option>Konferens</option>
                <option>Företagsevent</option>
                <option>Team Building</option>
                <option>Produktlansering</option>
                <option>Gala / Middag</option>
                <option>Övrigt</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className={labelClass}>Meddelande</label>
            <textarea rows={4} placeholder="Berätta om ert event — datum, storlek, specifika önskemål..." className={`${inputClass} resize-none`} />
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
                  <><CheckCircle className="w-5 h-5" />Tack! Vi hör av oss inom 48h.</>
                ) : (
                  <>
                    Skicka kostnadsfri förfrågan
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
              Inga förpliktelser • Svar inom 48h
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
