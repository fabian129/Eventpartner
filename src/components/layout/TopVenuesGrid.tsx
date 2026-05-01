"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Venue } from "@/data/countries";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Fallback images if no venue-specific image exists */
const FALLBACK_IMAGES = [
  "/Images/round-table-discussion-business-conference-meeting-event-audience-conference-hall-business.webp",
  "/Images/close-up-wineglasses-table.webp",
  "/Images/diverse-business-people-dinner-party.webp",
  "/Images/group-people-restaurant.webp",
  "/Images/speaker-giving-talk-conference-hall-business-event-rear-view-unrecognizable-people.webp",
];

/**
 * Get the primary image for a venue based on country slug and index.
 * Countries with 15 images: 3 per venue (1,4,7,10,13)
 * Countries with 5 images: 1 per venue (1,2,3,4,5)
 */
function getVenueImage(countrySlug: string, venueIndex: number, imageCount: number): string {
  if (imageCount >= 15) {
    // 3 images per venue: first image of each set
    const imgNum = venueIndex * 3 + 1;
    return `/Images/venues/${countrySlug}/venue-${imgNum}.jpg`;
  } else if (imageCount >= 5) {
    // 1 image per venue
    return `/Images/venues/${countrySlug}/venue-${venueIndex + 1}.jpg`;
  }
  // Fallback
  return FALLBACK_IMAGES[venueIndex % FALLBACK_IMAGES.length];
}

// Image counts per country (from extraction)
const IMAGE_COUNTS: Record<string, number> = {
  'belgium': 5, 'bosnia-herzegovina': 15, 'croatia': 15, 'czech-republic': 15,
  'estonia': 15, 'france': 15, 'greece': 15, 'hungary': 15, 'iceland': 15,
  'ireland': 15, 'italy': 15, 'latvia': 15, 'lithuania': 15, 'luxembourg': 15,
  'malta': 15, 'montenegro': 15, 'netherlands': 15, 'north-macedonia': 15,
  'norway': 15, 'poland': 5, 'portugal': 15, 'romania': 15, 'serbia': 15,
  'slovakia': 15, 'slovenia': 15, 'spain': 15, 'sweden': 15, 'switzerland': 15,
  'uk': 15,
};

export function TopVenuesGrid({ 
  venues, 
  countryName,
  countrySlug 
}: { 
  venues: Venue[]; 
  countryName: string;
  countrySlug: string;
}) {
  const displayVenues = venues.slice(0, 5);
  const imageCount = IMAGE_COUNTS[countrySlug] || 0;

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
              src={getVenueImage(countrySlug, i, imageCount)}
              alt={venue.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
              loading="lazy"
              quality={75}
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
