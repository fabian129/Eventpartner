"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ServiceCardsPersonal — Clean bento. 5 cards.
 *
 * All cards have fullbleed images.
 * Each card has ONE unique micro-detail (not more).
 * Square-ish proportions. Sharp corners.
 * Fullservice = wide hero at bottom.
 */

const SERVICES = [
  {
    title: "Conferences & Meetings",
    desc: "From boardroom meetings to large-scale conferences.",
    image: "/Images/speaker-giving-talk-conference-hall-business-event-rear-view-unrecognizable-people.jpg",
    label: "01",
    icon: "mic" as const,
  },
  {
    title: "Kick-offs & Team Building",
    desc: "Experiences that set the tone for the entire year.",
    image: "/Images/man-walking-street-night-time.jpg",
    label: "02",
    icon: "users" as const,
  },
  {
    title: "Dinners & Galas",
    desc: "Representational dinners at venues that make an impression.",
    image: "/Images/decorated-hall-wedding-is-ready-celebration.jpg",
    label: "03",
    icon: "glass" as const,
  },
  {
    title: "Venue Sourcing",
    desc: "360,000+ venues in 36 countries. Always 3 proposals within 24h.",
    image: "/Images/group-people-restaurant.jpg",
    label: "04",
    icon: "globe" as const,
  },
];

/* ————————————————————————————————————————
   ICON — small, subtle, top-right
   ———————————————————————————————————————— */
function CardIcon({ type }: { type: "mic" | "users" | "glass" | "globe" }) {
  const cls = "text-white/25 group-hover:text-white/45 transition-colors duration-500";
  switch (type) {
    case "mic":
      return (
        <svg className={cls} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      );
    case "users":
      return (
        <svg className={cls} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "glass":
      return (
        <svg className={cls} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8" />
          <path d="M12 11v11" />
          <path d="m20 7-8 4-8-4" />
          <path d="M20 7v-.5A2.5 2.5 0 0 0 17.5 4h-11A2.5 2.5 0 0 0 4 6.5V7" />
        </svg>
      );
    case "globe":
      return (
        <svg className={cls} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
  }
}

/* ————————————————————————————————————————
   SERVICE CARD — fullbleed image, title, one detail
   ———————————————————————————————————————— */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      className="relative group cursor-pointer overflow-hidden h-full rounded-xl"
    >
      <div className="relative w-full h-full">
        {/* Fullbleed muted image → color on hover */}
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-[1s] ease-out
                     saturate-[0.3] brightness-[0.65]
                     group-hover:saturate-100 group-hover:brightness-[0.8] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Gradient — just enough for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Number label — top left, visible */}
        <span className="absolute top-4 left-5 z-10 font-mono text-[11px] tracking-[0.12em] text-white/40 font-medium">
          {service.label}
        </span>

        {/* Icon — top right */}
        <div className="absolute top-4 right-5 z-10">
          <CardIcon type={service.icon} />
        </div>

        {/* Title + description — moved up from bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pb-6 z-10">
          <h3 className="font-display text-[24px] md:text-[28px] font-medium text-white tracking-tight leading-[1.1] mb-1.5
                         [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
            {service.title}
          </h3>
          <p className="text-[11px] md:text-[12px] text-white/35 leading-relaxed">
            {service.desc}
          </p>
        </div>

        {/* Subtle border */}
        <div className="absolute inset-0 border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500 pointer-events-none z-20" />
      </div>
    </motion.div>
  );
}

/* ————————————————————————————————————————
   MAIN SECTION
   ———————————————————————————————————————— */
interface ServicesCMS {
  label?: string;
  labelRight?: string;
  headline?: string;
  description?: string;
  stats?: { value: string; label: string }[];
  cards?: { title: string; desc: string; icon: string }[];
  fullserviceTitle?: string;
  fullserviceDesc?: string;
}

export function ServiceCardsPersonal({ cms }: { cms?: ServicesCMS }) {
  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.label || "EventPartner — Services"}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)] text-right">
              {cms?.labelRight || "Full-service delivery\n36 countries"}
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">
            {cms?.headline || "What we do."}
          </h2>

          <p className="font-display text-[clamp(1.1rem,2.2vw,1.5rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-2xl mb-10">
            {cms?.description || "From venue scouting to full-scale delivery. We create events that build your brand."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--border-default)] pt-5">
            {(cms?.stats || [
              { label: "Venues", value: "360,000+" },
              { label: "Countries", value: "36" },
              { label: "Response time", value: "24h" },
              { label: "Partners", value: "2,400+" },
            ]).map((s) => (
              <div key={s.label}>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] block mb-1">{s.label}</span>
                <span className="font-display text-[17px] font-medium text-[var(--text-primary)]">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* BENTO — on a dark plate with rounded corners */}
        <div className="bg-[#111111] rounded-2xl p-2 md:p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Top 4 cards — square-ish */}
          {SERVICES.map((service, i) => {
            const cmsCard = cms?.cards?.[i];
            const merged = cmsCard ? {
              ...service,
              title: cmsCard.title || service.title,
              desc: cmsCard.desc || service.desc,
            } : service;
            return (
              <div key={service.title} className="aspect-[4/3] md:aspect-[3/2]">
                <ServiceCard service={merged} index={i} />
              </div>
            );
          })}

          {/* Fullservice CTA — wide */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
            className="md:col-span-2 aspect-[16/6] md:aspect-[16/5] relative group cursor-pointer overflow-hidden rounded-xl"
          >
            <div className="relative w-full h-full">
              <Image
                src="/Images/black-white-shot-beautiful-building-with-sculptures-chess-floor.jpg"
                alt="Full-service event delivery"
                fill
                className="object-cover transition-all duration-[1s] ease-out
                           saturate-[0.2] brightness-[0.45]
                           group-hover:saturate-[0.5] group-hover:brightness-[0.55] group-hover:scale-[1.02]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 rounded-xl border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500 pointer-events-none z-20" />

              {/* Ghost label */}
              <span className="absolute top-4 left-5 z-10 font-mono text-[9px] tracking-[0.15em] uppercase text-white/20">
                05
              </span>

              {/* Detail: two expanding lines */}
              <div className="absolute top-4 right-5 z-10 flex flex-col gap-[3px] opacity-30 group-hover:opacity-60 transition-all duration-700">
                <div className="w-5 h-[1px] bg-[#6AD8D2]/60 group-hover:w-8 transition-all duration-500" />
                <div className="w-5 h-[1px] bg-[#6AD8D2]/60 group-hover:w-4 transition-all duration-500 delay-75" />
                <div className="w-5 h-[1px] bg-[#6AD8D2]/60 group-hover:w-6 transition-all duration-500 delay-150" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 flex items-end p-6 md:p-8">
                <div>
                  <h3 className="font-display text-[28px] md:text-[38px] font-medium text-white tracking-tight leading-[1.05] mb-2
                                 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                    {cms?.fullserviceTitle || "Full-Service Delivery"}
                  </h3>
                  <p className="text-[12px] md:text-[13px] text-white/35 leading-relaxed max-w-md">
                    {cms?.fullserviceDesc || "Venues, technology, catering, and accommodation — one contact, zero hassle."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}
