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
 * Get the best-quality image for a venue.
 * Uses pre-ranked venue-best-N.jpg files (sorted by file size / resolution).
 */
function getVenueImage(countrySlug: string, venueIndex: number, imageCount: number): string {
  if (imageCount >= 5) {
    return `/Images/venues/${countrySlug}/venue-best-${venueIndex + 1}.jpg`;
  }
  // Fallback
  return FALLBACK_IMAGES[venueIndex % FALLBACK_IMAGES.length];
}

const IMAGE_COUNTS: Record<string, number> = {
  'afghanistan': 15, 'albania': 15, 'algeria': 15, 'andorra': 12, 'angola': 14,
  'antigua-and-barbuda': 14, 'argentina': 15, 'armenia': 15, 'aruba': 15, 'australia': 14,
  'austria': 15, 'azerbaijan': 15, 'bahamas': 12, 'bahrain': 15, 'bangladesh': 15,
  'barbados': 15, 'belgium': 5, 'belize': 13, 'benin': 12, 'bermuda': 13,
  'bhutan': 13, 'bolivia': 14, 'bosnia-herzegovina': 15, 'botswana': 15, 'brazil': 15,
  'brunei': 15, 'bulgaria': 15, 'burkina-faso': 15, 'cambodia': 14, 'cameroon': 14,
  'canada': 15, 'cape-verde': 15, 'cayman-islands': 14, 'central-african-republic': 15,
  'chad': 13, 'chile': 15, 'china': 15, 'colombia': 15, 'congo': 15,
  'costa-rica': 15, 'croatia': 15, 'czech-republic': 15, 'denmark': 15, 'djibouti': 13,
  'dominica': 15, 'dominican-republic': 14, 'ecuador': 14, 'egypt': 15,
  'el-salvador': 15, 'equatorial-guinea': 15, 'eritrea': 14, 'estonia': 15,
  'eswatini': 12, 'ethiopia': 15, 'fiji': 13, 'finland': 15, 'france': 15,
  'gambia': 15, 'georgia': 14, 'germany': 15, 'ghana': 15, 'gibraltar': 15,
  'greece': 15, 'grenada': 14, 'guatemala': 15, 'guinea': 15, 'guinea-bissau': 11,
  'honduras': 15, 'hong-kong': 15, 'hungary': 15, 'iceland': 15, 'india': 15,
  'indonesia': 15, 'ireland': 15, 'israel': 15, 'italy': 15, 'jamaica': 14,
  'japan': 15, 'jordan': 14, 'kazakhstan': 15, 'kenya': 15, 'kiribati': 14,
  'kuwait': 15, 'kyrgyzstan': 14, 'laos': 15, 'latvia': 15, 'lebanon': 15,
  'lesotho': 14, 'liberia': 14, 'lithuania': 15, 'luxembourg': 15, 'macau': 14,
  'madagascar': 14, 'malawi': 15, 'malaysia': 15, 'maldives': 15, 'mali': 15,
  'malta': 15, 'marshall-islands': 15, 'mauritania': 15, 'mauritius': 15,
  'mexico': 15, 'micronesia': 15, 'moldova': 15, 'monaco': 15, 'mongolia': 15,
  'montenegro': 15, 'morocco': 15, 'mozambique': 15, 'myanmar': 14, 'namibia': 15,
  'nauru': 12, 'nepal': 14, 'netherlands': 15, 'new-zealand': 15, 'nicaragua': 14,
  'niger': 14, 'nigeria': 15, 'north-macedonia': 15, 'norway': 15, 'oman': 14,
  'pakistan': 15, 'palau': 14, 'panama': 13, 'paraguay': 15, 'peru': 15,
  'philippines': 14, 'poland': 5, 'portugal': 15, 'puerto-rico': 15, 'qatar': 15,
  'romania': 15, 'rwanda': 14, 'saint-kitts-and-nevis': 13, 'saint-lucia': 14,
  'saint-vincent-and-the-grenadines': 12, 'samoa': 12, 'sao-tome-and-principe': 13,
  'saudi-arabia': 14, 'senegal': 15, 'serbia': 15, 'seychelles': 15,
  'sierra-leone': 14, 'singapore': 15, 'slovakia': 15, 'slovenia': 15, 'somalia': 14,
  'south-africa': 15, 'south-korea': 15, 'south-sudan': 11, 'spain': 15,
  'sri-lanka': 15, 'sudan': 14, 'sweden': 15, 'switzerland': 15, 'tanzania': 15,
  'thailand': 15, 'togo': 14, 'tonga': 15, 'tunisia': 15, 'turkey': 15,
  'tuvalu': 14, 'uganda': 15, 'uk': 15, 'united-states': 15, 'ukraine': 14, 'uruguay': 14,
  'uzbekistan': 14, 'vanuatu': 15, 'vietnam': 15, 'zambia': 15, 'zimbabwe': 15,
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
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
              unoptimized
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
