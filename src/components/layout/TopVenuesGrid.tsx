"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Venue } from "@/data/countries";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Venue images — human-centric event photography */
const VENUE_IMAGES = [
  "/Images/round-table-discussion-business-conference-meeting-event-audience-conference-hall-business.jpg",
  "/Images/close-up-wineglasses-table.jpg",
  "/Images/diverse-business-people-dinner-party.jpg",
  "/Images/group-people-restaurant.jpg",
  "/Images/speaker-giving-talk-conference-hall-business-event-rear-view-unrecognizable-people.jpg",
  "/Images/lunch-with-friends.jpg",
  "/Images/group-people-music-concert.jpg",
  "/Images/conference-evening.jpg",
  "/Images/hotel-lobby.jpg",
  "/Images/venue-dark-modern.jpg",
];

export function TopVenuesGrid({ venues, countryName }: { venues: Venue[]; countryName: string }) {
  const displayVenues = venues.slice(0, 5);

  return (
    <section className="w-full pb-16 md:pb-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8"
        >
          <p className="section-label mb-2">Popular venues</p>
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
            Top {venues.length} in {countryName}
          </h2>
        </motion.div>
      </div>

      {/* Expandable panels — hover to expand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="flex gap-[3px] mx-6 md:mx-10 h-[420px] md:h-[480px] rounded-xl overflow-hidden"
      >
        {displayVenues.map((venue, i) => (
          <div
            key={venue.name}
            className="venue-panel flex-1 overflow-hidden cursor-pointer relative group"
            style={{ transition: "flex 0.5s ease" }}
          >
            <Image
              src={VENUE_IMAGES[i % VENUE_IMAGES.length]}
              alt={venue.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            {/* Overlay — visible on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/50 mb-2">
                #{i + 1}
              </span>
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight mb-1">
                {venue.name}
              </h3>
              <div className="flex items-center gap-3 text-[13px] text-white/60">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {venue.city}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {venue.capacity}
                </span>
              </div>
              <p className="text-[12px] text-white/40 mt-1.5">{venue.type}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <style jsx>{`
        .venue-panel:hover {
          flex: 4;
        }
      `}</style>
    </section>
  );
}
