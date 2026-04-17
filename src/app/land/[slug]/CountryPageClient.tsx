"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, Building2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VenueGallery } from "@/components/layout/VenueGallery";
import type { Country } from "@/data/countries";

export function CountryPageClient({ country }: { country: Country }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = "w-full rounded-xl py-3.5 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#81D8D0]/30 focus:border-[#81D8D0]/50 transition-all font-sans bg-white border border-black/[0.08] text-[#111] placeholder-[#94A3B8]";
  const labelClass = "block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] mb-2";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-primary)]">
        
        {/* Hero */}
        <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10 overflow-hidden">
          {/* Flag background */}
          <div className="absolute top-20 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[400px] opacity-[0.04] pointer-events-none">
            <Image
              src={`https://flagcdn.com/w640/${country.code}.png`}
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="max-w-[1100px] mx-auto relative z-10">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/#coverage"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[#81D8D0] transition-colors text-sm mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Alla länder
              </Link>
            </motion.div>

            {/* Flag + Country name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-5 mb-6"
            >
              <div className="w-16 h-12 rounded-xl overflow-hidden border border-[var(--border-default)] shadow-sm">
                <Image
                  src={`https://flagcdn.com/w160/${country.code}.png`}
                  alt={country.nameSv}
                  width={160}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="section-label mb-1">{country.venues} venues</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">
                  {country.nameSv}
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-[var(--text-muted)] max-w-lg leading-relaxed"
            >
              Skicka in din förfrågan för event i {country.nameSv} — vi återkommer inom 24h med minst 3 kurerade förslag.
            </motion.p>
          </div>
        </section>

        {/* Request Form */}
        <section className="w-full px-6 md:px-10 pb-16 md:pb-24">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8 md:p-10 shadow-sm"
            >
              <h2 className="font-display text-xl md:text-2xl font-medium tracking-tight text-[var(--text-primary)] mb-6">
                Skicka en förfrågan för {country.nameSv}
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 gap-4"
                >
                  <CheckCircle className="w-12 h-12 text-[#81D8D0]" />
                  <p className="font-display text-xl font-medium text-[var(--text-primary)]">Tack för din förfrågan!</p>
                  <p className="text-sm text-[var(--text-muted)]">Vi återkommer inom 24 timmar med minst 3 kurerade förslag.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass}>Företag</label>
                      <input type="text" placeholder="Ert företagsnamn" className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClass}>Kontaktperson</label>
                      <input type="text" placeholder="Namn" className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClass}>E-post</label>
                      <input type="email" placeholder="du@företag.se" className={inputClass} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass}>Stad / Region</label>
                      <input type="text" placeholder={`T.ex. ${country.topVenues[0]?.city || "Huvudstad"}`} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Antal gäster</label>
                      <select className={inputClass}>
                        <option value="">Välj</option>
                        <option>10-50</option>
                        <option>50-100</option>
                        <option>100-300</option>
                        <option>300-1000</option>
                        <option>1000+</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Eventtyp</label>
                      <select className={inputClass}>
                        <option value="">Välj typ</option>
                        <option>Konferens</option>
                        <option>Kick-off</option>
                        <option>Middag</option>
                        <option>Teambuilding</option>
                        <option>Mässa</option>
                        <option>Annat</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Beskriv ert event</label>
                    <textarea
                      rows={3}
                      placeholder="Berätta kort om ert event — datum, syfte, speciella önskemål..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-4 rounded-xl bg-[#111] text-white font-medium text-sm hover:bg-[#81D8D0] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Skicka förfrågan
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Venue Gallery — Interactive expandable panels */}
        <VenueGallery venues={country.topVenues} countryName={country.nameSv} />

        {/* Bottom CTA */}
        <section className="w-full px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-16 px-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]"
            >
              <Building2 className="w-8 h-8 text-[#81D8D0] mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-medium text-[var(--text-primary)] mb-3">
                Hittar du inte rätt venue?
              </h2>
              <p className="text-[var(--text-muted)] text-sm mb-8 max-w-md mx-auto">
                Skicka in din förfrågan så matchar vi er med rätt anläggning. 
                Alltid svar inom 24h med minst 3 offerter.
              </p>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#111] text-white font-medium text-sm hover:bg-[#81D8D0] hover:text-black transition-all duration-300"
              >
                Skicka förfrågan
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
