"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "@/lib/animation";
import { COUNTRIES } from "@/data/countries";
import { REGIONS, getRegionForCountry } from "@/data/regions";
import { Search, CalendarDays, Users, MapPin, ChevronDown } from "lucide-react";

interface HeroCMS {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  subheadline?: string;
  cta1?: string;
  cta2?: string;
}

const IMAGES = [
  "/Images/hero/tall-centrepiece-made-pink-flowers-crystal-chains-stands-dinner-table.jpg",
  "/Images/hero/friends-gathered-rooftop-terrace-meal-with-city-skyline-background.jpg",
  "/Images/hero/happy-audience-conference-laughing-business-people-seminar-workshop-training-diversity-men-women-crowd-presentation-learning-knowledge-funny-corporate-discussion.jpg",
  "/Images/hero/food-festive-restaurant-party-unity-concept.jpg",
  "/Images/hero/big-dinner-party-with-small-crowd-multiethnic-diverse-friends-celebrating-restaurant-beautiful-happy-hosts-propose-toast-raise-wine-glasses-while-sitting-table-evening.jpg",
];

const EVENT_TYPES = [
  "Conference",
  "Gala Dinner",
  "Team Building",
  "Workshop",
  "Product Launch",
  "Awards Ceremony",
  "Networking Event",
  "Corporate Retreat",
  "Exhibition",
  "Cocktail Reception",
];

const GUEST_RANGES = [
  "10–50",
  "50–100",
  "100–250",
  "250–500",
  "500–1,000",
  "1,000+",
];

export function Hero({ cms }: { cms?: HeroCMS }) {
  const [currentImage, setCurrentImage] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Search state
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [destination, setDestination] = useState("");
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [destFilter, setDestFilter] = useState("");

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // GSAP staggered word reveal on mount
  useEffect(() => {
    if (!headlineRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const words = headlineRef.current.querySelectorAll(".hero-word");
    if (words.length === 0) return;

    gsap.set(words, { opacity: 0, y: 40, rotateX: -15 });
    
    gsap.to(words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.3,
    });

    // Animate search bar in after headline
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
      );
    }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setShowEventDropdown(false);
        setShowGuestDropdown(false);
        setShowDestDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Filtered countries for destination search
  const filteredCountries = destFilter
    ? COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(destFilter.toLowerCase())
      )
    : COUNTRIES;

  // Handle search — scroll to globe and trigger region
  const handleSearch = () => {
    // Find the matching country/region
    if (destination) {
      const country = COUNTRIES.find(
        (c) => c.name.toLowerCase() === destination.toLowerCase()
      );
      if (country) {
        const region = getRegionForCountry(country.slug);
        // Scroll to globe section
        const globeEl = document.getElementById("globe-section");
        if (globeEl) {
          globeEl.scrollIntoView({ behavior: "smooth" });
          // Dispatch custom event so globe can react
          setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent("hero-search", {
                detail: {
                  country: country.slug,
                  region: region?.slug,
                  eventType,
                  guests,
                },
              })
            );
          }, 800);
        }
        return;
      }
    }
    // Fallback — just scroll to globe
    const globeEl = document.getElementById("globe-section");
    if (globeEl) {
      globeEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split text into word spans for GSAP stagger
  const headline1 = cms?.headline || "The World's";
  const headline2 = cms?.headline ? "" : "Largest Selection";
  const accent = cms?.headlineAccent || "of Venues";

  return (
    <section className="relative w-full h-[100vh] min-h-[700px] flex flex-col justify-center bg-black">
      
      {/* Background Slideshow — Framer AnimatePresence (correct use case) */}
      <div className="absolute top-0 left-0 right-0 h-[115vh] z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={IMAGES[currentImage]} 
              alt="Premium Event" 
              fill 
              priority={currentImage === 0}
              className="object-cover brightness-[0.45] contrast-[1.15] saturate-[0.85]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Vignette + gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col justify-center">
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-medium leading-[0.9] tracking-[-0.03em] text-white drop-shadow-xl max-w-4xl"
          style={{ perspective: "600px" }}
        >
          {headline1.split(" ").map((word, i) => (
            <span key={`h1-${i}`} className="hero-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
          <br />
          {headline2 && headline2.split(" ").map((word, i) => (
            <span key={`h2-${i}`} className="hero-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
          <span className="italic font-light text-tiffany block mt-2">
            {accent.split(" ").map((word, i) => (
              <span key={`a-${i}`} className="hero-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className="mt-10 max-w-3xl opacity-0"
        >
          <div
            className="flex flex-col sm:flex-row items-stretch rounded-2xl border overflow-visible"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Event Type */}
            <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-white/[0.08]" data-dropdown>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEventDropdown(!showEventDropdown);
                  setShowGuestDropdown(false);
                  setShowDestDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-4 text-left group"
              >
                <CalendarDays className="w-4 h-4 text-tiffany/60 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30 mb-0.5">Event Type</div>
                  <div className={`text-[14px] font-medium truncate ${eventType ? "text-white" : "text-white/30"}`}>
                    {eventType || "What are you planning?"}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/20 transition-transform ${showEventDropdown ? "rotate-180" : ""}`} />
              </button>
              
              {showEventDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border overflow-hidden z-50"
                  style={{ background: "rgba(20,20,20,0.95)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
                >
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => { setEventType(type); setShowEventDropdown(false); }}
                      className={`w-full text-left px-5 py-3 text-[13px] transition-colors ${
                        eventType === type
                          ? "text-tiffany bg-tiffany/[0.08]"
                          : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-white/[0.08]" data-dropdown>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGuestDropdown(!showGuestDropdown);
                  setShowEventDropdown(false);
                  setShowDestDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-4 text-left group"
              >
                <Users className="w-4 h-4 text-tiffany/60 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30 mb-0.5">Guests</div>
                  <div className={`text-[14px] font-medium truncate ${guests ? "text-white" : "text-white/30"}`}>
                    {guests || "Number of guests"}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/20 transition-transform ${showGuestDropdown ? "rotate-180" : ""}`} />
              </button>

              {showGuestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border overflow-hidden z-50"
                  style={{ background: "rgba(20,20,20,0.95)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
                >
                  {GUEST_RANGES.map((range) => (
                    <button
                      key={range}
                      onClick={() => { setGuests(range); setShowGuestDropdown(false); }}
                      className={`w-full text-left px-5 py-3 text-[13px] transition-colors ${
                        guests === range
                          ? "text-tiffany bg-tiffany/[0.08]"
                          : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {range} guests
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Destination */}
            <div className="relative flex-1" data-dropdown>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDestDropdown(!showDestDropdown);
                  setShowEventDropdown(false);
                  setShowGuestDropdown(false);
                  setDestFilter("");
                }}
                className="w-full flex items-center gap-3 px-5 py-4 text-left group"
              >
                <MapPin className="w-4 h-4 text-tiffany/60 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30 mb-0.5">Destination</div>
                  <div className={`text-[14px] font-medium truncate ${destination ? "text-white" : "text-white/30"}`}>
                    {destination || "Where in Europe?"}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/20 transition-transform ${showDestDropdown ? "rotate-180" : ""}`} />
              </button>

              {showDestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border overflow-hidden z-50"
                  style={{ background: "rgba(20,20,20,0.95)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
                >
                  {/* Search input */}
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <input
                      type="text"
                      value={destFilter}
                      onChange={(e) => setDestFilter(e.target.value)}
                      placeholder="Search countries..."
                      className="w-full bg-transparent text-[13px] text-white placeholder:text-white/25 outline-none"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-[240px] overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <button
                        key={country.slug}
                        onClick={() => {
                          setDestination(country.name);
                          setShowDestDropdown(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-[13px] flex items-center gap-3 transition-colors ${
                          destination === country.name
                            ? "text-tiffany bg-tiffany/[0.08]"
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <Image
                          src={`https://flagcdn.com/w40/${country.code}.png`}
                          alt="" width={20} height={14}
                          className="rounded-[2px] shrink-0" unoptimized
                        />
                        {country.name}
                        <span className="ml-auto text-[10px] text-white/20">{country.venues}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-7 py-4 bg-tiffany hover:bg-tiffany/90 transition-colors text-black font-display font-medium text-[14px] sm:rounded-r-2xl sm:rounded-l-none rounded-b-2xl sm:rounded-b-none"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* Inline stats */}
          <div className="flex items-center gap-4 mt-4 ml-1">
            <span className="text-white/25 text-[13px]">
              <span className="text-white/40 font-medium">360,000+</span> venues
            </span>
            <span className="text-white/10">·</span>
            <span className="text-white/25 text-[13px]">
              <span className="text-white/40 font-medium">36</span> countries
            </span>
            <span className="text-white/10">·</span>
            <span className="text-white/25 text-[13px]">
              <span className="text-white/40 font-medium">24h</span> response
            </span>
          </div>
        </div>
      </div>
      
    </section>
  );
}
