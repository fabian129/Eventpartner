"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, CalendarCheck, Users, Globe, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceShowcase() {
  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header — like page 41 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Allt ni behöver.<br />
            <span className="italic text-[#6AD8D2]" style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif" }}>En partner.</span>
          </h2>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-[#6AD8D2]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-[var(--text-muted)]">4.9 (2,048 events levererade)</span>
              <div className="flex -space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border-[3px] border-[var(--bg-primary)] overflow-hidden -rotate-3 shadow-sm">
                  <Image src="/Images/conference-evening.jpg" alt="" width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border-[3px] border-[var(--bg-primary)] overflow-hidden rotate-2 shadow-sm">
                  <Image src="/Images/hotel-lobby.jpg" alt="" width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border-[3px] border-[var(--bg-primary)] overflow-hidden -rotate-2 shadow-sm">
                  <Image src="/Images/decorated-hall-wedding-is-ready-celebration.jpg" alt="" width={80} height={80} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid — 12 column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* LEFT — Large image card (6 col, tall) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-6 relative h-[500px] md:h-[650px] rounded-[2rem] overflow-hidden group"
          >
            <Image
              src="/Images/conference-evening.jpg"
              alt="Premium conference venue"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Overlay card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white rounded-2xl p-7 md:p-8 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle className="w-5 h-5 text-[var(--text-primary)]" />
                <span className="text-base font-normal text-[var(--text-primary)]">Garanterat</span>
              </div>
              <p className="text-2xl md:text-3xl text-[var(--text-primary)] italic tracking-tight mb-3" style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif" }}>
                Rätt venue, varje gång.
              </p>
              <p className="text-sm font-light text-[var(--text-muted)] leading-relaxed">
                360,000+ venues i 36 länder. Alltid svar inom 24h med minst 3 kurerade förslag.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Two stacked cards (6 col) */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8">

            {/* Top right — Light card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="bg-[#F3F1ED] rounded-[2rem] relative overflow-hidden flex flex-col sm:flex-row min-h-[300px] p-8 md:p-10 group"
            >
              <div className="w-full sm:w-2/3 flex flex-col relative z-10 justify-center">
                <CalendarCheck className="w-7 h-7 text-[var(--text-primary)] mb-6 stroke-[1.5]" />
                <h3 className="text-2xl md:text-4xl font-light tracking-tight text-[var(--text-primary)] mb-1">Fullservice</h3>
                <p className="text-2xl md:text-4xl italic tracking-tight text-[var(--text-muted)]" style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif" }}>
                  Eventleverans
                </p>
                <p className="text-sm font-light text-[var(--text-muted)] leading-relaxed max-w-[280px] mt-5">
                  Konferenslokaler, teknik, catering och logi — allt samordnat under ett tak. En kontaktperson, noll krångel.
                </p>
              </div>
              {/* Image peek */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 min-w-[200px] flex items-end justify-end opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out">
                <Image
                  src="/Images/hotel-lobby.jpg"
                  alt="Venue interior"
                  width={400}
                  height={600}
                  className="h-[140%] w-auto object-cover object-left translate-x-8 translate-y-12 mix-blend-darken"
                />
              </div>
            </motion.div>

            {/* Bottom right — Dark/accent card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="bg-[#2A2438] rounded-[2rem] relative overflow-hidden flex min-h-[300px] text-white p-8 md:p-10"
            >
              {/* Ambient glow */}
              <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#6AD8D2]/15 blur-[80px] pointer-events-none" />

              <div className="w-full flex justify-end">
                <div className="w-full sm:w-2/3 flex flex-col relative z-10 justify-center pl-0 sm:pl-0">
                  <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-1">Global</h3>
                  <p className="text-2xl md:text-4xl italic tracking-tight text-white/80 mb-8" style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif" }}>
                    Räckvidd
                  </p>

                  <div className="space-y-5">
                    <div className="flex items-center gap-3.5">
                      <Globe className="w-5 h-5 text-white/50 stroke-[1.5]" />
                      <span className="text-sm font-light text-white/90">36 länder, ett nätverk</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <MapPin className="w-5 h-5 text-white/50 stroke-[1.5]" />
                      <span className="text-sm font-light text-white/90">360,000+ kurerade venues</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <Users className="w-5 h-5 text-white/50 stroke-[1.5]" />
                      <span className="text-sm font-light text-white/90">Från 10 till 10,000 gäster</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-12 md:mt-16"
        >
          <Link
            href="#request"
            className="group flex items-center justify-between p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/20 transition-all duration-300"
          >
            <div>
              <p className="text-[15px] font-medium text-[var(--text-primary)]">Skicka in din förfrågan</p>
              <p className="text-[13px] text-[var(--text-muted)] mt-0.5">Vi matchar er med rätt venue inom 24h.</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-default)] group-hover:bg-[#6AD8D2]/10 group-hover:border-[#6AD8D2]/20 flex items-center justify-center transition-all duration-300 ml-6">
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#6AD8D2] transition-colors" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
