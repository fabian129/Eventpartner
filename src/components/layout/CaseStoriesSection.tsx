"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Users, Calendar } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CaseStoriesSection — Fullbleed horizontal scroll case studies.
 *
 * Each "story" is a full-width card with venue image background,
 * event name, client, stats, and a "read more" CTA on hover.
 * Horizontal snap-scroll lets users discover more stories.
 */

const STORIES = [
  {
    client: "Ericsson",
    event: "European Leadership Summit 2024",
    description: "Tre dagars konferens för 400 ledare från 12 länder. Fullservice från venue-sourcing i Stockholm till AV-teknik och galakväll.",
    image: "/Images/interior-large-building-with-glass-ceiling.jpg",
    stats: { guests: "400", location: "Stockholm", duration: "3 dagar" },
    color: "#6AD8D2",
  },
  {
    client: "Spotify",
    event: "Global Kick-off 2024",
    description: "Årlig kick-off för 600+ medarbetare. TeamBuilding, keynotes och afterparty i unik venue utanför Barcelona.",
    image: "/Images/colorful-seoul-floating-island.jpg",
    stats: { guests: "600+", location: "Barcelona", duration: "2 dagar" },
    color: "#7851A9",
  },
  {
    client: "H&M",
    event: "Sustainability Gala",
    description: "Representationsmiddag och konferens med fokus på hållbarhet. 250 inbjudna gäster i en historisk venue i Köpenhamn.",
    image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.jpg",
    stats: { guests: "250", location: "Köpenhamn", duration: "1 kväll" },
    color: "#6AD8D2",
  },
  {
    client: "Sandvik",
    event: "International Sales Conference",
    description: "Säljkonferens för 300 personer i Milano. Hotellkoordinering, transferservice, konferensprogram och middagar.",
    image: "/Images/palace-culture-iasi-romania.jpg",
    stats: { guests: "300", location: "Milano", duration: "4 dagar" },
    color: "#7851A9",
  },
  {
    client: "Klarna",
    event: "Product Launch & Press Event",
    description: "Exklusiv produktlansering för press och partners i central London-venue. Detaljplanerad upplevelse från A till Ö.",
    image: "/Images/hotel-lobby.jpg",
    stats: { guests: "150", location: "London", duration: "1 dag" },
    color: "#6AD8D2",
  },
];

function StoryCard({ story, index }: { story: typeof STORIES[0]; index: number }) {
  return (
    <div
      className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] h-[500px] md:h-[580px] relative rounded-2xl overflow-hidden group cursor-pointer snap-center"
    >
      {/* Fullbleed image */}
      <Image
        src={story.image}
        alt={story.event}
        fill
        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.04]"
        sizes="70vw"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/70 transition-all duration-500" />

      {/* Client badge — top left */}
      <div className="absolute top-6 left-6 z-10">
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-xl border border-white/10"
          style={{ background: `${story.color}15` }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: story.color }}
          >
            {story.client[0]}
          </div>
          <span className="text-[13px] font-medium text-white/90">{story.client}</span>
        </div>
      </div>

      {/* Stats — top right */}
      <div className="absolute top-6 right-6 z-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        {[
          { icon: Users, value: story.stats.guests, label: "Gäster" },
          { icon: MapPin, value: story.stats.location },
          { icon: Calendar, value: story.stats.duration },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/[0.06]">
            <stat.icon className="w-3 h-3 text-white/40" />
            <span className="text-[11px] text-white/70 font-medium">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 z-10">
        <h3 className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight mb-3 group-hover:translate-y-[-2px] transition-transform duration-500">
          {story.event}
        </h3>
        <p className="text-[14px] text-white/50 leading-relaxed max-w-[500px] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-out mb-0 group-hover:mb-4">
          {story.description}
        </p>

        {/* CTA on hover */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-100 translate-y-3 group-hover:translate-y-0">
          <span className="text-[13px] font-medium" style={{ color: story.color }}>Läs berättelsen</span>
          <ArrowRight className="w-3.5 h-3.5" style={{ color: story.color }} />
        </div>
      </div>

      {/* Hover shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
    </div>
  );
}

export function CaseStoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.nextElementSibling?.getBoundingClientRect().width ?? 600;
    const gap = 20;
    const scrollAmount = cardWidth + gap;
    el.scrollBy({ left: direction === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  const handleWheel = (e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    // Only hijack vertical scroll when there's horizontal overflow
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 5 && e.deltaY > 0;
      if (!atStart && !atEnd) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.nextElementSibling?.getBoundingClientRect().width ?? 600;
    const idx = Math.round(el.scrollLeft / (cardWidth + 20));
    setActiveIndex(Math.min(idx, STORIES.length - 1));
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      {/* Header — inside container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
              <span className="text-[#6AD8D2] text-xs">◆</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Case Stories</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05]">
              Eventleverans i
              <br />
              <span className="italic font-light text-[var(--text-muted)]">världsklass.</span>
            </h2>
          </div>

          <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-sm md:text-right">
            Ledande företag använder EventPartner för att leverera konferenser, kickoffs och galor.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll area */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="relative"
        onWheel={handleWheel}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pb-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Left spacer */}
          <div className="flex-shrink-0 w-[calc((100vw-1200px)/2)] hidden xl:block" />

          {STORIES.map((story, i) => (
            <StoryCard key={story.client} story={story} index={i} />
          ))}

          {/* Right spacer */}
          <div className="flex-shrink-0 w-6 md:w-10" />
        </div>

        {/* Fade hints on edges */}
        <div className="absolute top-0 right-0 bottom-6 w-20 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 left-0 bottom-6 w-10 md:w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* Active dot indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="max-w-[1200px] mx-auto px-6 md:px-10 mt-8"
      >
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("prev")}
            className="w-12 h-12 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[#6AD8D2]/30 hover:bg-[#6AD8D2]/5 flex items-center justify-center transition-all duration-300"
            aria-label="Föregående"
          >
            <ArrowRight className="w-5 h-5 text-[var(--text-muted)] rotate-180" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {STORIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (!el) return;
                    const card = el.children[1] as HTMLElement;
                    if (!card) return;
                    const cardWidth = card.getBoundingClientRect().width + 20;
                    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                  }}
                  className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? "w-8 bg-[#6AD8D2]/60" : "w-3 bg-[var(--border-default)] hover:bg-[var(--text-muted)]"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-[0.12em]">
              {activeIndex + 1} / {STORIES.length}
            </span>
          </div>

          <button
            onClick={() => scrollTo("next")}
            className="w-12 h-12 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[#6AD8D2]/30 hover:bg-[#6AD8D2]/5 flex items-center justify-center transition-all duration-300"
            aria-label="Nästa"
          >
            <ArrowRight className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
