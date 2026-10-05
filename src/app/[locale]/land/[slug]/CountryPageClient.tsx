"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, Building2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TopVenuesGrid } from "@/components/layout/TopVenuesGrid";
import type { Country } from "@/data/countries";
import { useLocale } from "next-intl";

const EVENT_TYPES: { value: string; sv: string }[] = [
  { value: "Conference", sv: "Konferens" },
  { value: "Corporate Event", sv: "Företagsevent" },
  { value: "Kick-off", sv: "Kick-off" },
  { value: "Gala", sv: "Gala" },
  { value: "Dinner", sv: "Middag" },
  { value: "Christmas Dinner", sv: "Julbord" },
  { value: "Team building", sv: "Teambuilding" },
  { value: "Exhibition", sv: "Mässa" },
  { value: "Other", sv: "Annat" },
];

const COPY = {
  en: {
    allCountries: "All countries",
    venues: "venues",
    intro: (n: string) => `Submit your inquiry for events in ${n} — we'll get back to you with Fast Proposal Delivery and at least 3 curated proposals.`,
    formTitle: (n: string) => `Submit an inquiry for ${n}`,
    thanksTitle: "Thank you for your inquiry!",
    thanksText: "We'll get back to you with Fast Proposal Delivery and at least 3 curated proposals.",
    company: "Company", companyPh: "Your company name",
    contact: "Contact person", contactPh: "Name",
    email: "Email", emailPh: "you@company.com",
    phone: "Phone",
    guests: "Number of guests", select: "Select",
    eventType: "Event type", selectType: "Select type",
    city: "City / Region", cityPh: (c: string) => `e.g. ${c}`, capital: "Capital",
    describe: "Describe your event", describePh: "Tell us briefly about your event — date, purpose, special requirements...",
    error: "Something went wrong — please try again.",
    submitting: "Submitting…", submit: "Submit inquiry",
    ctaTitle: "Can't find the right venue?",
    ctaText: "Submit your inquiry and we'll match you with the perfect venue. Fast Proposal Delivery with at least 3 proposals.",
  },
  sv: {
    allCountries: "Alla länder",
    venues: "venues",
    intro: (n: string) => `Skicka er förfrågan för event i ${n} — vi återkommer snabbt med minst 3 handplockade förslag.`,
    formTitle: (n: string) => `Skicka en förfrågan för ${n}`,
    thanksTitle: "Tack för er förfrågan!",
    thanksText: "Vi återkommer snabbt med minst 3 handplockade förslag.",
    company: "Företag", companyPh: "Ert företagsnamn",
    contact: "Kontaktperson", contactPh: "Namn",
    email: "E-post", emailPh: "du@foretag.se",
    phone: "Telefon",
    guests: "Antal gäster", select: "Välj",
    eventType: "Typ av event", selectType: "Välj typ",
    city: "Stad / region", cityPh: (c: string) => `t.ex. ${c}`, capital: "Huvudstaden",
    describe: "Beskriv ert event", describePh: "Berätta kort om ert event — datum, syfte, särskilda önskemål...",
    error: "Något gick fel — försök igen.",
    submitting: "Skickar…", submit: "Skicka förfrågan",
    ctaTitle: "Hittar du inte rätt lokal?",
    ctaText: "Skicka er förfrågan så matchar vi er med rätt lokal. Snabba svar med minst 3 förslag.",
  },
} as const;

export function CountryPageClient({ country }: { country: Country }) {
  const locale = useLocale();
  const sv = locale === "sv";
  const t = COPY[sv ? "sv" : "en"];
  const name = sv ? country.nameSv || country.name : country.name;
  const venueCount = sv ? country.venues.replace(/,/g, " ") : country.venues;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    city: "",
    guests: "",
    eventType: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "event-inquiry",
          ...form,
          country: country.name,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      setForm({
        company: "",
        contact: "",
        email: "",
        phone: "",
        city: "",
        guests: "",
        eventType: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
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
                href={`/${locale}#globe-section`}
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[#81D8D0] transition-colors text-sm mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.allCountries}
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
                  alt={name}
                  width={160}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="section-label mb-1">{venueCount} {t.venues}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">
                  {name}
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-[var(--text-muted)] max-w-lg leading-relaxed"
            >
              {t.intro(name)}
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
                {t.formTitle(name)}
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 gap-4"
                >
                  <CheckCircle className="w-12 h-12 text-[#81D8D0]" />
                  <p className="font-display text-xl font-medium text-[var(--text-primary)]">{t.thanksTitle}</p>
                  <p className="text-sm text-[var(--text-muted)]">{t.thanksText}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass}>{t.company}</label>
                      <input type="text" placeholder={t.companyPh} className={inputClass} required
                        value={form.company} onChange={(e) => update("company", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>{t.contact}</label>
                      <input type="text" placeholder={t.contactPh} className={inputClass} required
                        value={form.contact} onChange={(e) => update("contact", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>{t.email}</label>
                      <input type="email" placeholder={t.emailPh} className={inputClass} required
                        value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass}>{t.phone}</label>
                      <input type="tel" placeholder="+46 ..." className={inputClass} required
                        value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>{t.guests}</label>
                      <select className={inputClass} required
                        value={form.guests} onChange={(e) => update("guests", e.target.value)}>
                        <option value="">{t.select}</option>
                        <option>1-50</option>
                        <option>50-100</option>
                        <option>100-300</option>
                        <option>300-1000</option>
                        <option>1000+</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{t.eventType}</label>
                      <select className={inputClass}
                        value={form.eventType} onChange={(e) => update("eventType", e.target.value)}>
                        <option value="">{t.selectType}</option>
                        {EVENT_TYPES.map((et) => (
                          <option key={et.value} value={et.value}>{sv ? et.sv : et.value}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{t.city}</label>
                    <input type="text" placeholder={t.cityPh(country.topVenues[0]?.city || t.capital)} className={inputClass}
                      value={form.city} onChange={(e) => update("city", e.target.value)} />
                  </div>

                  <div>
                    <label className={labelClass}>{t.describe}</label>
                    <textarea
                      rows={3}
                      placeholder={t.describePh}
                      className={`${inputClass} resize-none`}
                      value={form.message} onChange={(e) => update("message", e.target.value)}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{t.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-4 rounded-xl bg-[#111] text-white font-medium text-sm hover:bg-[#81D8D0] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? t.submitting : t.submit}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Top Venues Grid — uses actual country data */}
        <TopVenuesGrid venues={country.topVenues} countryName={name} countrySlug={country.slug} />

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
                {t.ctaTitle}
              </h2>
              <p className="text-[var(--text-muted)] text-sm mb-8 max-w-md mx-auto">
                {t.ctaText}
              </p>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#111] text-white font-medium text-sm hover:bg-[#81D8D0] hover:text-black transition-all duration-300"
              >
                {t.submit}
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
