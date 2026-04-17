"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Venue } from "@/data/countries";

/**
 * VenueGallery — Hover-expandable image panels
 * 
 * 5 vertical panels side by side. Default: equal width (flex: 1).
 * On hover: panel expands to flex: 4 with smooth transition.
 * Each panel shows fullbleed venue imagery + overlay info.
 * 
 * Inspired by: hover-expandable-image-gallery-cards.html
 */

// Curated venue images (architectural / premium)
const VENUE_IMAGES = [
  "/Images/interior-large-building-with-glass-ceiling.jpg",
  "/Images/palace-culture-iasi-romania.jpg",
  "/Images/hotel-lobby.jpg",
  "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.jpg",
  "/Images/decorated-hall-wedding-is-ready-celebration.jpg",
  "/Images/interior-modern-high-building-high-quality-photo.jpg",
  "/Images/black-white-shot-beautiful-building-with-sculptures-chess-floor.jpg",
  "/Images/person-walking-along-beautiful-architecture.jpg",
  "/Images/stairways-corridors-black-white.jpg",
  "/Images/hotel.jpg",
  "/Images/colorful-seoul-floating-island.jpg",
  "/Images/black-white-photo-modern-building.jpg",
  "/Images/high-angle-view-wedding-celebration-sunset-copy-space.jpg",
  "/Images/vintage-landscape-photo.jpg",
  "/Images/vega-baja-del-segura-puerto-de-torrevieja.jpg",
];

export function VenueGallery({ venues, countryName }: { venues: Venue[]; countryName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Show max 5 panels at a time (first 5 venues with best images)
  const displayVenues = venues.slice(0, 5);

  return (
    <section className="w-full px-6 md:px-10 pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="section-label mb-3">Populära venues</p>
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[var(--text-primary)] leading-tight">
            Topp venues i {countryName}
          </h2>
        </motion.div>

        {/* Expandable gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex gap-1.5 rounded-2xl overflow-hidden bg-[#111] p-1.5"
          style={{ height: "480px" }}
        >
          {displayVenues.map((venue, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={venue.name}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ flex: isActive ? 4 : 1 }}
              >
                {/* Fullbleed image */}
                <Image
                  src={VENUE_IMAGES[i % VENUE_IMAGES.length]}
                  alt={venue.name}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isActive ? "grayscale-0 brightness-[0.55] scale-105" : "grayscale brightness-[0.35]"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Tag — always visible */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#81D8D0] bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/[0.06]">
                    {venue.type}
                  </span>
                </div>

                {/* Content — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className={`font-display font-medium text-white tracking-tight leading-tight mb-1 transition-all duration-500 ${
                    isActive ? "text-lg opacity-100" : "text-sm opacity-60"
                  }`}>
                    {isActive ? venue.name : venue.name.split(" ")[0]}
                  </h3>
                  
                  {/* Details — only visible on active */}
                  <div className={`transition-all duration-400 overflow-hidden ${
                    isActive ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}>
                    <div className="flex items-center gap-4 text-[12px] text-white/50">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {venue.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {venue.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Remaining venues as compact list */}
        {venues.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {venues.slice(5).map((venue, i) => (
              <div
                key={venue.name}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[#81D8D0]/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[var(--text-primary)] truncate group-hover:text-[#81D8D0] transition-colors">
                    {venue.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">{venue.city} · {venue.capacity}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
