"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Presentation, Lightbulb, Utensils, Mic2, PartyPopper, Users } from "lucide-react";

const SERVICES = [
  {
    icon: Presentation,
    title: "Konferens & möten",
    description: "Från intima styrelsemöten till storskaliga konferenser med hundratals deltagare. Vi matchar format, teknik och venue — oavsett storlek.",
    stat: "2,400+",
    statLabel: "venues",
    image: "/Images/interior-large-building-with-glass-ceiling.jpg",
  },
  {
    icon: Lightbulb,
    title: "Aktiviteter",
    description: "Teambuilding, workshops och upplevelser som skapar bestående minnen. Skräddarsytt efter era mål och gruppstorlek.",
    stat: "180+",
    statLabel: "partners",
    image: "/Images/colorful-seoul-floating-island.jpg",
  },
  {
    icon: Utensils,
    title: "Catering",
    description: "Från standing lunch till sju-rätters gala. Vi kopplar er med rätt cateringleverantör för varje tillfälle och budget.",
    stat: "340+",
    statLabel: "leverantörer",
    image: "/Images/decorated-hall-wedding-is-ready-celebration.jpg",
  },
  {
    icon: Mic2,
    title: "Talare & underhållning",
    description: "Keynote-speakers, moderatorer, artister och DJ:s. Vi bokar rätt profil för ert event och budget.",
    stat: "500+",
    statLabel: "profiler",
    image: "/Images/palace-culture-iasi-romania.jpg",
  },
  {
    icon: PartyPopper,
    title: "Middagar & galor",
    description: "Representationsmiddagar, jubileer och galor i venues som gör intryck. Helhetskoordinering från meny till platsplanering.",
    stat: "94%",
    statLabel: "nöjda kunder",
    image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.jpg",
  },
  {
    icon: Users,
    title: "Kick-off",
    description: "Starter som sätter tonen för hela året. Vi bygger upplevelser som inspirerar team och driver kultur framåt.",
    stat: "48h",
    statLabel: "svarstid",
    image: "/Images/hotel-lobby.jpg",
  },
];

export function ServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-visible">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
            <span className="text-[#81D8D0] text-xs">◆</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Fullservice-partner</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05] mx-auto">
            Allt ni behöver.
            <br />
            <span className="italic font-light text-[var(--text-muted)]">En förfrågan.</span>
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            Vi hanterar allt från venue till catering, talare och aktiviteter. Ni fokuserar på eventet.
          </p>
        </motion.div>

        {/* Main layout: Nav LEFT + Card RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center"
        >
          {/* LEFT: Navigation — large titles, vertically centered & evenly spaced */}
          <div className="lg:w-[300px] xl:w-[340px] shrink-0 flex flex-col lg:-ml-4 self-stretch">
            <div className="flex flex-col justify-evenly h-full py-[5%]">
              {SERVICES.map((service, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={service.title}
                    onClick={() => setActiveIndex(i)}
                    className={`text-left flex-1 flex flex-col justify-center border-b border-[var(--border-default)]/30 transition-all duration-300 group ${
                      i === 0 ? "border-t border-t-[var(--border-default)]/30" : ""
                    }`}
                  >
                    <span className={`font-display text-[1.55rem] md:text-[1.8rem] tracking-tight transition-all duration-300 leading-none ${
                      isActive
                        ? "text-[var(--text-primary)] font-medium"
                        : "text-[var(--text-dim)] font-normal group-hover:text-[var(--text-muted)]"
                    }`}>
                      {service.title}
                    </span>
                    {isActive && (
                      <span className="block mt-1.5 text-[11px] text-[#81D8D0] font-mono uppercase tracking-[0.12em]">
                        {service.stat} {service.statLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Large elevated card — image + content + CTA */}
          <div className="flex-1 min-w-0">
            <div className="p-[1px] rounded-[1.5rem] bg-gradient-to-b from-[var(--border-default)] via-[var(--border-default)]/20 to-transparent">
              <div className="bg-[var(--bg-card)] rounded-[1.4rem] p-5 md:p-6 shadow-[0_2.8px_2.2px_rgba(0,0,0,0.02),0_6.7px_5.3px_rgba(0,0,0,0.028),0_12.5px_10px_rgba(0,0,0,0.035),0_22.3px_17.9px_rgba(0,0,0,0.042),0_41.8px_33.4px_rgba(0,0,0,0.05),0_100px_80px_rgba(0,0,0,0.07)]">

                {/* Image */}
                <div className="p-[1px] bg-[var(--border-default)]/50 rounded-xl mb-6">
                  <div className="aspect-[16/9] w-full bg-[var(--bg-primary)] rounded-[11px] overflow-hidden relative">
                    <Image
                      key={active.image}
                      src={active.image}
                      alt={active.title}
                      fill
                      className="object-cover transition-all duration-700 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 65vw"
                    />

                    {/* Floating overlay */}
                    <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 p-[1px] rounded-xl bg-gradient-to-b from-white/60 to-white/10 backdrop-blur-md">
                      <div className="bg-white/90 p-3 rounded-[11px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06)] flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#81D8D0]/10 border border-[#81D8D0]/20 flex items-center justify-center shrink-0">
                          {(() => { const I = active.icon; return <I className="w-3.5 h-3.5 text-[#81D8D0]" />; })()}
                        </div>
                        <div>
                          <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#94A3B8]">Kategori</div>
                          <div className="text-[13px] font-medium text-[#111] tracking-tight">{active.title}</div>
                        </div>
                        <div className="ml-3 w-2 h-2 rounded-full bg-[#81D8D0] relative">
                          <div className="absolute inset-0 rounded-full bg-[#81D8D0] animate-ping opacity-30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content inside card */}
                <div className="px-1">
                  <h3 className="font-display text-xl md:text-2xl font-medium text-[var(--text-primary)] tracking-tight mb-2">
                    {active.title}
                  </h3>
                  <p className="text-[14px] text-[var(--text-muted)] leading-relaxed max-w-lg mb-5">
                    {active.description}
                  </p>

                  {/* Stats + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="font-display text-xl font-medium text-[var(--text-primary)] block leading-none">{active.stat}</span>
                        <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[var(--text-dim)]">{active.statLabel}</span>
                      </div>
                      <div className="w-px h-8 bg-[var(--border-default)]" />
                      <div>
                        <span className="font-display text-xl font-medium text-[var(--text-primary)] block leading-none">24h</span>
                        <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[var(--text-dim)]">svarstid</span>
                      </div>
                      <div className="w-px h-8 bg-[var(--border-default)]" />
                      <div>
                        <span className="font-display text-xl font-medium text-[var(--text-primary)] block leading-none">0 kr</span>
                        <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[var(--text-dim)]">kostnad</span>
                      </div>
                    </div>

                    <a
                      href="#request"
                      className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111] text-white text-sm font-medium hover:bg-[#81D8D0] hover:text-[#0a0a0a] transition-all duration-300"
                    >
                      Boka nu →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
