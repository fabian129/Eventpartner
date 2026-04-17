"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Smartphone, Building2, Users, BarChart3 } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";

export function ServicesSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardBg = isDark ? "#161616" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const iconBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(129,216,208,0.08)";
  const iconBorder = isDark ? "rgba(255,255,255,0.05)" : "rgba(129,216,208,0.15)";

  return (
    <section id="services" className="relative w-full bg-[var(--bg-primary)] px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4 md:p-6">
        {/* Hero Card — fullbleed image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden border border-[var(--border-default)] rounded-xl mb-4 md:mb-6"
          style={{ height: "clamp(400px, 55vh, 700px)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1920&auto=format&fit=crop"
            alt="Premium venue"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,15,1) 5%, rgba(15,15,15,0.6) 50%, rgba(15,15,15,0.3) 100%)" }} />

          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-end">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#81D8D0]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80">Premium Events</span>
              </div>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }} className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-white tracking-tight max-w-[600px]">
              Vi gör allt
              <br />
              <span className="italic font-light text-white/60">åt er.</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-6 max-w-[500px] text-sm text-white/50 leading-relaxed tracking-wide">
              Från venue-scouting till fullskalig leverans. Vi skapar event som bygger ert varumärke och överträffar förväntningar.
            </motion.p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Venue-matchning", desc: "Algoritmisk matchning baserat på era krav och preferenser.", delay: 0 },
                { icon: Smartphone, title: "Projektledning", desc: "Full koordinering från koncept till genomförande.", delay: 0.1 },
              ].map(({ icon: Icon, title, desc, delay }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay, duration: 0.5 }}
                  className="rounded-xl p-6 flex flex-col justify-between min-h-[180px] group transition-all duration-300 hover:border-[#81D8D0]/20"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isDark ? "none" : "0 2px 20px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-lg" style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>
                      <Icon className={`w-5 h-5 ${isDark ? "text-white" : "text-[#81D8D0]"}`} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] text-[var(--text-dim)] group-hover:text-[#81D8D0]/50 transition-colors">→</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[var(--text-primary)] mb-1">{title}</h3>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Wide card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-xl p-6 flex items-center justify-between gap-6 flex-grow group transition-all duration-300 hover:border-[#81D8D0]/20"
              style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isDark ? "none" : "0 2px 20px rgba(0,0,0,0.03)" }}
            >
              <div className="flex flex-col gap-2 max-w-[360px]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg" style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>
                    <Building2 className={`w-5 h-5 ${isDark ? "text-white" : "text-[#81D8D0]"}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-medium text-[var(--text-primary)]">Digital Dashboard</h3>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Realtidsöversikt av alla era bokningar, förfrågningar och venues.</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl font-medium text-[var(--text-primary)]">98%</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)]">Uptime</span>
              </div>
            </motion.div>
          </div>

          {/* Tall card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="md:col-span-5 rounded-xl p-6 md:p-8 flex flex-col justify-between min-h-[380px] relative overflow-hidden group transition-all duration-300 hover:border-[#81D8D0]/20"
            style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: isDark ? "none" : "0 2px 20px rgba(0,0,0,0.03)" }}
          >
            {/* Subtle B&W background image peek */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/Images/hotel-lobby.jpg"
                alt=""
                fill
                className="object-cover grayscale brightness-[0.4] opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${cardBg} 20%, transparent 70%, ${cardBg} 100%)` }} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2.5 rounded-lg" style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>
                  <Users className={`w-5 h-5 ${isDark ? "text-white" : "text-[#81D8D0]"}`} strokeWidth={1.5} />
                </div>
                <div className="p-2.5 rounded-lg" style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>
                  <BarChart3 className={`w-5 h-5 ${isDark ? "text-white" : "text-[#81D8D0]"}`} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.1] mb-3">
                Dedicated<br />Account Team
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed max-w-[280px]">
                Varje kund får en dedikerad kontaktperson som känner er verksamhet. Ingen generisk kundtjänst.
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <div className="flex justify-between text-[10px] text-[var(--text-dim)] mb-2 font-mono uppercase tracking-wide">
                <span>Satisfaction</span><span>97%</span>
              </div>
              <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: "97%" }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }} className="h-full rounded-full" style={{ background: "linear-gradient(to right, #81D8D0, #6B3FA0)" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
