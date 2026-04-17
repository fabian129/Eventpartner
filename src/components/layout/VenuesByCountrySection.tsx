"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const VENUE_DATA = [
  { name: "Münchenbryggeriet", location: "Stockholm, Sweden", type: "Event Hall", capacity: "1,200", flag: "🇸🇪", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop", wide: true },
  { name: "The Savoy", location: "London, UK", type: "Luxury Hotel", capacity: "600", flag: "🇬🇧", image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop", wide: false },
  { name: "BMW Welt", location: "Munich, Germany", type: "Corporate Venue", capacity: "2,000", flag: "🇩🇪", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop", wide: false },
  { name: "Moderna Museet", location: "Stockholm, Sweden", type: "Unique Venue", capacity: "400", flag: "🇸🇪", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop", wide: false },
  { name: "ExCeL London", location: "London, UK", type: "Exhibition Center", capacity: "5,000", flag: "🇬🇧", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop", wide: false },
  { name: "Clarion Hotel Sign", location: "Stockholm, Sweden", type: "Conference Center", capacity: "800", flag: "🇸🇪", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop", wide: true },
];

export function VenuesByCountrySection() {
  return (
    <section id="venues" className="relative w-full bg-[var(--bg-primary)] px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="section-label mb-3">Venues</p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.1]">
              Utvalda venues<br /><span className="italic font-light text-[var(--text-muted)]">per land.</span>
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
            Handplockade locations i hela Europa. Filtrerade efter era krav, levererade med trygghet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VENUE_DATA.map((venue, i) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden border border-[var(--border-default)] group cursor-pointer ${venue.wide ? "md:col-span-2 h-[350px] md:h-[450px]" : "h-[350px] md:h-[400px]"}`}
            >
              <Image src={venue.image} alt={venue.name} fill className="object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.8] transition-all duration-700 group-hover:scale-105" sizes={venue.wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)" }} />

              <div className="absolute top-0 left-0 right-0 p-5 md:p-6 z-10 flex justify-between items-start">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">{venue.flag} {venue.location}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">Cap. {venue.capacity}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#81D8D0] mb-1.5">{venue.type}</p>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-white tracking-tight leading-[1.1]">{venue.name}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-8 text-center">
          <a href="#request" className="inline-flex items-center gap-2 px-6 py-2.5 text-[13px] text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-default)] rounded-full transition-all duration-300 hover:border-[#81D8D0]/30 hover:text-[#81D8D0]">
            Kan inte hitta rätt venue? Berätta vad ni söker →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
