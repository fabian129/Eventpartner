"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

import { useLocale } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

const EVENT_TYPES = [
  "Conference", "Corporate Event", "Team Building", "Product Launch",
  "Gala / Dinner", "Kick-off", "Exhibition", "Incentive Travel",
  "Wedding", "Festival", "Other",
];

const EVENT_TYPES_SV = [
  "Konferens", "Företagsevent", "Teambuilding", "Produktlansering",
  "Gala / Middag", "Kickoff", "Mässa", "Incentiveresa",
  "Bröllop", "Festival", "Annat",
];

const BUDGET_OPTIONS = [
  "Not specified", "Under €5,000", "€5,000 – €15,000",
  "€15,000 – €50,000", "€50,000 – €100,000", "Over €100,000",
];

const VENUE_TYPES = [
  "Hotel / Resort", "Conference Center", "Restaurant", "Outdoor / Garden",
  "Castle / Manor", "Rooftop", "Beach Club", "Unique / Unconventional", "No preference",
];

const VENUE_TYPES_SV = [
  "Hotell / Resort", "Konferensanläggning", "Restaurang", "Utomhus / Trädgård",
  "Slott / Herrgård", "Takterrass", "Beach club", "Unikt / Okonventionellt", "Ingen preferens",
];

const CATERING_OPTIONS = [
  "Sit-down dinner", "Buffet", "Cocktail / Finger food", "Food trucks",
  "Wine tasting", "Breakfast / Brunch", "No catering needed", "Other",
];

const CATERING_OPTIONS_SV = [
  "Sittande middag", "Buffé", "Cocktail / Plockmat", "Food trucks",
  "Vinprovning", "Frukost / Brunch", "Ingen catering behövs", "Annat",
];

const ACTIVITY_OPTIONS = [
  "Live music / DJ", "Keynote speakers", "Team activities", "Workshops",
  "Entertainment / Show", "Photo / Video", "Decorations / Styling",
  "Transport / Logistics", "AV / Tech setup", "Other",
];

const ACTIVITY_OPTIONS_SV = [
  "Livemusik / DJ", "Talare / Keynotes", "Teamaktiviteter", "Workshops",
  "Underhållning / Show", "Foto / Video", "Dekor / Styling",
  "Transport / Logistik", "AV / Teknik", "Annat",
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
  const locale = useLocale();
  const sv = locale === 'sv';
  const eventTypes = sv ? EVENT_TYPES_SV : EVENT_TYPES;
  const venueTypes = sv ? VENUE_TYPES_SV : VENUE_TYPES;
  const cateringOptions = sv ? CATERING_OPTIONS_SV : CATERING_OPTIONS;
  const activityOptions = sv ? ACTIVITY_OPTIONS_SV : ACTIVITY_OPTIONS;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [form, setForm] = useState({
    company: "", contact: "", email: "", phone: "", country: "", city: "",
    eventName: "", eventType: "", guests: "", startDate: "", endDate: "", budget: "",
    venueType: "", preferredLocation: "", requirements: "",
    cateringStyle: "", dietary: "", activitiesDetails: "", message: "",
    singleRooms: "", doubleRooms: ""
  });

  const toggleActivity = (a: string) =>
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

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
          type: "detailed-inquiry",
          ...form,
          activities: selectedActivities
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmitted(true);
      setForm({
        company: "", contact: "", email: "", phone: "", country: "", city: "",
        eventName: "", eventType: "", guests: "", startDate: "", endDate: "", budget: "",
        venueType: "", preferredLocation: "", requirements: "",
        cateringStyle: "", dietary: "", activitiesDetails: "", message: "",
        singleRooms: "", doubleRooms: ""
      });
      setSelectedActivities([]);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
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
            {cms?.backLink || (sv ? "← Tillbaka till startsidan" : "← Back to home")}
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
              {cms?.heroLabel || (sv ? "EventPartner — Skräddarsy" : "EventPartner — Customize")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#888]">
              {cms?.heroLabelRight || (sv ? "Utökat formulär" : "Extended form")}
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-medium tracking-tight text-[#111] leading-[1.05] mb-4">
            {cms?.heroHeadline || (sv ? "Skräddarsy ert event." : "Customize your event.")}
            <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#6AD8D2]">
              {cms?.heroHeadlineAccent || (sv ? "Varje detalj räknas." : "Every detail matters.")}
            </span>
          </h1>
          <p className="font-display text-[clamp(1rem,2vw,1.2rem)] font-normal text-[#666] leading-[1.5] max-w-lg">
            {cms?.heroDescription || (sv ? "Ju mer ni berättar, desto bättre kan vi matcha er med rätt lokaler och tjänster. Alla fält markerade med * är obligatoriska." : "The more you tell us, the better we can match you with the perfect venues and services. All fields marked with * are required.")}
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
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.contactTitle || (sv ? "Kontaktuppgifter" : "Contact information")}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.contactSubtitle || (sv ? "Vem ska vi kontakta?" : "Who should we reach out to?")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              <div><label className={labelClass}>{sv ? "Företag" : "Company"}{star}</label><input type="text" placeholder={sv ? "Ert företagsnamn" : "Your company name"} required className={inputClass} value={form.company} onChange={set('company')} /></div>
              <div><label className={labelClass}>{sv ? "Kontaktperson" : "Contact person"}{star}</label><input type="text" placeholder={sv ? "För- och efternamn" : "Full name"} required className={inputClass} value={form.contact} onChange={set('contact')} /></div>
              <div><label className={labelClass}>{sv ? "E-post" : "Email"}{star}</label><input type="email" placeholder={sv ? "du@foretag.se" : "you@company.com"} required className={inputClass} value={form.email} onChange={set('email')} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div><label className={labelClass}>{sv ? "Telefon" : "Phone"}{star}</label><input type="tel" placeholder="+46 70 123 45 67" required className={inputClass} value={form.phone} onChange={set('phone')} /></div>
              <div><label className={labelClass}>{sv ? "Land" : "Country"}{star}</label><input type="text" placeholder={sv ? "t.ex. Sverige, Spanien, UK" : "E.g. Sweden, Spain, UK"} required className={inputClass} value={form.country} onChange={set('country')} /></div>
              <div><label className={labelClass}>{sv ? "Stad" : "City"}</label><input type="text" placeholder={sv ? "t.ex. Stockholm, Barcelona" : "E.g. Stockholm, Barcelona"} className={inputClass} value={form.city} onChange={set('city')} /></div>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 2: Event basics ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.eventTitle || (sv ? "Eventdetaljer" : "Event details")}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.eventSubtitle || (sv ? "Berätta om själva eventet." : "Tell us about the event itself.")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              <div><label className={labelClass}>{sv ? "Eventnamn" : "Event name"}</label><input type="text" placeholder={sv ? "t.ex. Årlig kickoff 2026" : "E.g. Annual Sales Kick-off 2026"} className={inputClass} value={form.eventName} onChange={set('eventName')} /></div>
              <div>
                <label className={labelClass}>{sv ? "Eventtyp" : "Event type"}{star}</label>
                <select required className={inputClass} value={form.eventType} onChange={set('eventType')}>
                  <option value="">{sv ? "Välj typ" : "Select type"}</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><label className={labelClass}>{sv ? "Antal gäster" : "Number of guests"}{star}</label><input type="number" placeholder={sv ? "Ange exakt antal" : "Enter exact number"} min={1} required className={inputClass} value={form.guests} onChange={set('guests')} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div><label className={labelClass}>{sv ? "Startdatum" : "Start date"}{star}</label><input type="date" min={new Date().toISOString().split('T')[0]} required className={inputClass} value={form.startDate} onChange={set('startDate')} /></div>
              <div><label className={labelClass}>{sv ? "Slutdatum" : "End date"}</label><input type="date" min={new Date().toISOString().split('T')[0]} className={inputClass} value={form.endDate} onChange={set('endDate')} /></div>
              <div>
                <label className={labelClass}>{sv ? "Budget (ungefärlig)" : "Budget (approximate)"}</label>
                <input type="text" placeholder={sv ? "t.ex. 200 000 kr" : "E.g. €20,000"} className={inputClass} value={form.budget} onChange={set('budget')} />
              </div>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 3: Venue ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.venueTitle || (sv ? "Lokalönskemål" : "Venue preferences")}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.venueSubtitle || (sv ? "Vilken typ av lokal söker ni?" : "What kind of space are you looking for?")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>{sv ? "Typ av lokal" : "Venue type"}</label>
                <select className={inputClass} value={form.venueType} onChange={set('venueType')}>
                  <option value="">{sv ? "Välj önskemål" : "Select preference"}</option>
                  {venueTypes.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div><label className={labelClass}>{sv ? "Önskad plats / område" : "Preferred location / area"}</label><input type="text" placeholder={sv ? "t.ex. centrala Stockholm, Costa del Sol" : "E.g. Central Stockholm, Costa del Sol"} className={inputClass} value={form.preferredLocation} onChange={set('preferredLocation')} /></div>
            </div>
            <div>
              <label className={labelClass}>{sv ? "Särskilda lokalkrav" : "Special venue requirements"}</label>
              <textarea rows={3} placeholder={sv ? "t.ex. rullstolsanpassat, utomhusyta, havsutsikt, grupprum..." : "E.g. wheelchair accessible, outdoor space, sea view, breakout rooms..."} className={`${inputClass} resize-none`} value={form.requirements} onChange={set('requirements')} />
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 3.5: Accommodation ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{sv ? "Boende & Övernattning" : "Accommodation"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{sv ? "Behöver ni boka hotellrum eller boende för era gäster?" : "Do you need to book hotel rooms or lodging for your guests?"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{sv ? "Enkelrum (antal)" : "Single rooms (quantity)"}</label>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  className={inputClass}
                  value={form.singleRooms}
                  onChange={set('singleRooms')}
                />
              </div>
              <div>
                <label className={labelClass}>{sv ? "Dubbelrum (antal)" : "Double rooms (quantity)"}</label>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  className={inputClass}
                  value={form.doubleRooms}
                  onChange={set('doubleRooms')}
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 4: Catering ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.cateringTitle || "Catering"}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.cateringSubtitle || (sv ? "Vilken mat- & dryckesupplevelse vill ni ha?" : "What food & drink experience do you want?")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>{sv ? "Cateringstil" : "Catering style"}</label>
                <select className={inputClass} value={form.cateringStyle} onChange={set('cateringStyle')}>
                  <option value="">{sv ? "Välj stil" : "Select style"}</option>
                  {cateringOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className={labelClass}>{sv ? "Kostbehov" : "Dietary requirements"}</label><input type="text" placeholder={sv ? "t.ex. veganskt, halal, glutenfritt" : "E.g. vegan options, halal, gluten-free"} className={inputClass} value={form.dietary} onChange={set('dietary')} /></div>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 5: Activities & services ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.activitiesTitle || (sv ? "Aktiviteter & tjänster" : "Activities & services")}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.activitiesSubtitle || (sv ? "Välj allt ni är intresserade av." : "Select everything you're interested in.")}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {activityOptions.map((a) => (
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
              <label className={labelClass}>{sv ? "Mer om aktiviteterna" : "Additional details about activities"}</label>
              <textarea rows={3} placeholder={sv ? "Beskriv aktiviteter, underhållning eller tjänster ni har i åtanke..." : "Describe any specific activities, entertainment or services you have in mind..."} className={`${inputClass} resize-none`} value={form.activitiesDetails} onChange={set('activitiesDetails')} />
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-10" />

          {/* ─── Section 6: Message ─── */}
          <div className="mb-10">
            <h2 className="font-display text-lg font-medium text-[#111] mb-1">{cms?.anythingElseTitle || (sv ? "Något mer?" : "Anything else?")}</h2>
            <p className="text-[13px] text-[#888] mb-6">{cms?.anythingElseSubtitle || (sv ? "Berätta allt vi bör veta för att göra ert event perfekt." : "Tell us everything we should know to make your event perfect.")}</p>
            <textarea rows={5} placeholder={sv ? "Särskilda önskemål, tema, inspiration, tidigare erfarenheter — allt hjälper..." : "Special requests, theme ideas, inspiration, past experiences — anything helps..."} className={`${inputClass} resize-none`} value={form.message} onChange={set('message')} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={loading || submitted}
              className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-[15px] font-semibold rounded-2xl transition-all duration-500 disabled:opacity-60 overflow-hidden group text-white bg-[#111] hover:bg-[#222]"
            >
              <span className="relative z-10 flex items-center gap-3">
                {submitted ? (
                  <><CheckCircle className="w-5 h-5" />{cms?.successMessage || (sv ? "Tack! Vi återkommer inom 24h." : "Thank you! We'll get back to you within 24h.")}</>
                ) : loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {sv ? "Skickar..." : "Sending..."}</>
                ) : (
                  <>{cms?.submitButton || (sv ? "Skicka detaljerad förfrågan" : "Send detailed inquiry")}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" /></>
                )}
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </span>
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#888]">
              {cms?.disclaimer || (sv ? "Inga förpliktelser • Svar inom 24h • Helt kostnadsfritt" : "No obligations • Response within 24h • Completely free")}
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
