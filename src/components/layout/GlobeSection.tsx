"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animation";
import Image from "next/image";
import Link from "next/link";
import { COUNTRIES, Country } from "@/data/countries";
import { COUNTRY_COORDS, projectToScreen } from "@/data/countryCoords";
import { REGIONS, Region, getRegionForCountry } from "@/data/regions";
import { ArrowRight, MapPin, ChevronLeft, Globe2, Lock } from "lucide-react";

/* ── COBE markers: EP countries + global coming-soon cities for "venues everywhere" feel ── */
const GLOBAL_COORDS: [number, number][] = [
  // Middle East & Africa
  [25.28, 55.30],   // Dubai
  [24.47, 54.37],   // Abu Dhabi
  [26.07, 50.55],   // Bahrain
  [21.42, 39.83],   // Jeddah
  [30.04, 31.24],   // Cairo
  [-33.92, 18.42],  // Cape Town
  [-1.29, 36.82],   // Nairobi
  [6.52, 3.38],     // Lagos
  [33.89, 35.50],   // Beirut
  // Asia Pacific
  [35.68, 139.69],  // Tokyo
  [1.35, 103.82],   // Singapore
  [22.32, 114.17],  // Hong Kong
  [37.57, 126.98],  // Seoul
  [-33.87, 151.21], // Sydney
  [13.76, 100.50],  // Bangkok
  [28.61, 77.21],   // Delhi
  [19.08, 72.88],   // Mumbai
  [31.23, 121.47],  // Shanghai
  // Americas
  [40.71, -74.01],  // New York
  [34.05, -118.24], // Los Angeles
  [41.88, -87.63],  // Chicago
  [25.76, -80.19],  // Miami
  [43.65, -79.38],  // Toronto
  [-23.55, -46.63], // São Paulo
  [19.43, -99.13],  // Mexico City
  [-34.60, -58.38], // Buenos Aires
];

/* COBE markers disabled — all dots rendered via overlay canvas for crisp edges */
const MARKERS: { location: [number, number]; size: number }[] = [];

/* ── Globe tuning ── */
const THETA = 0.25;
const PHI_START = 0.3;
const SPEED = 0.0004;

/**
 * Convert longitude to the COBE phi that puts that longitude facing the camera.
 * COBE rendering: phi controls azimuthal rotation.
 * Derived from COBE source: for a point at longitude `lng` to face the camera,
 * phi = PI/2 - (lng * PI/180 - PI) = 3PI/2 - lng*PI/180.
 * Simplified: -(lng * PI/180) + 3PI/2 ≈ -(lng * PI/180) + 4.712
 */
function lngToBasePhi(lng: number): number {
  return -(lng * Math.PI) / 180 + 3 * Math.PI / 2;
}

/* ── Venue preview images — Image counts per country — matches TopVenuesGrid */
const IMAGE_COUNTS: Record<string, number> = {
  'belgium': 5, 'bosnia-herzegovina': 15, 'croatia': 15, 'czech-republic': 15,
  'estonia': 15, 'france': 15, 'greece': 15, 'hungary': 15, 'iceland': 15,
  'ireland': 15, 'italy': 15, 'latvia': 15, 'lithuania': 15, 'luxembourg': 15,
  'malta': 15, 'montenegro': 15, 'netherlands': 15, 'north-macedonia': 15,
  'norway': 15, 'poland': 5, 'portugal': 15, 'romania': 15, 'serbia': 15,
  'slovakia': 15, 'slovenia': 15, 'spain': 15, 'sweden': 15, 'switzerland': 15,
  'uk': 15,
};

/** Get the primary venue image for a country — same source as TopVenuesGrid */
function getVenuePreviewImage(countrySlug: string): string {
  const count = IMAGE_COUNTS[countrySlug] || 0;
  if (count >= 15) return `/Images/venues/${countrySlug}/venue-1.jpg`;
  if (count >= 5) return `/Images/venues/${countrySlug}/venue-1.jpg`;
  // Fallback for countries without venue photos
  return '/Images/round-table-discussion-business-conference-meeting-event-audience-conference-hall-business.webp';
}

/* ── CMS types ── */
interface GlobeCMS {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  description?: string;
  metrics?: Array<{ value?: number; stringValue?: string; suffix?: string; label?: string }>;
}

export function GlobeSection({ cms }: { cms?: GlobeCMS }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(PHI_START);
  const offsetRef = useRef(0);
  const ptrDown = useRef<number | null>(null);
  const ptrMove = useRef(0);
  const hovRef = useRef<string | null>(null);
  const activeRegionRef = useRef<string | null>(null);
  const hoveredRegionRef = useRef<string | null>(null);

  /* ScrollTrigger refs */
  const sectionRef = useRef<HTMLElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  /* ── ScrollTrigger: dark entrance + pin ── */
  useEffect(() => {
    if (!sectionRef.current || !darkOverlayRef.current) return;

    const overlay = darkOverlayRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top top",
        scrub: 0.6,
      },
    });

    // Dark overlay fades in
    tl.fromTo(darkOverlayRef.current,
      { opacity: 0 },
      { opacity: 1, ease: "none" },
      0
    );

    // Headline staggers in
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".headline-word");
      tl.fromTo(words,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, ease: "power3.out" },
        0.3
      );
    }

    // Dashboard slides in
    if (dashboardRef.current) {
      tl.fromTo(dashboardRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, ease: "power3.out" },
        0.4
      );
    }

    // Exit: fade overlay back out when scrolling PAST the section
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: 0.6,
      },
    });
    exitTl.to(overlay, { opacity: 0, ease: "none" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      exitTl.scrollTrigger?.kill();
      exitTl.kill();
    };
  }, []);

  /* Target phi is now computed directly in the animation loop using refs.
     No React lifecycle = no stale closures. */

  const onSelectRegion = useCallback((slug: string) => {
    const region = REGIONS.find((r) => r.slug === slug);
    if (!region || region.status === "coming-soon") return;
    setSelectedRegion(slug);
    setHoveredCountry(null);
    hovRef.current = null;
    activeRegionRef.current = slug;
  }, []);

  const onBack = useCallback(() => {
    setSelectedRegion(null);
    setHoveredCountry(null);
    hovRef.current = null;
    activeRegionRef.current = null;
  }, []);

  const onHoverRegion = useCallback((slug: string | null) => {
    hoveredRegionRef.current = slug;
  }, []);

  const onHoverCountry = useCallback((slug: string | null) => {
    setHoveredCountry(slug);
    hovRef.current = slug;
  }, []);

  /* ── Pointer handlers (globe drag) ── */
   const onDown = useCallback((e: React.PointerEvent) => {
    ptrDown.current = e.clientX;
    if (overlayRef.current) overlayRef.current.style.cursor = "grabbing";
  }, []);
  const onUp = useCallback(() => {
    ptrDown.current = null;
    // Merge accumulated drag offset INTO phi — no separate tracking during targeting
    phiRef.current += offsetRef.current;
    offsetRef.current = 0;
    ptrMove.current = 0;
    if (overlayRef.current) overlayRef.current.style.cursor = "grab";
  }, []);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (ptrDown.current !== null) {
      const d = e.clientX - ptrDown.current;
      offsetRef.current = d / 200;
    }
  }, []);

  /* ── COBE lifecycle ── */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.className = "w-full h-full opacity-0 transition-opacity duration-[1200ms]";
    host.appendChild(canvas);

    let w = host.offsetWidth;
    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 1.5),
      width: w * 2, height: w * 2,
      phi: PHI_START, theta: THETA,
      dark: 1, diffuse: 1.4, mapSamples: 16000, mapBrightness: 3.5,
      baseColor: [0.75, 0.78, 0.82],
      markerColor: [0.42, 0.85, 0.82],
      glowColor: [0.12, 0.12, 0.15],
      markers: MARKERS, opacity: 0.85,
    });

    const ov = overlayRef.current;
    if (ov) { ov.width = w * 2; ov.height = w * 2; }

    let raf: number;
    const loop = () => {
      /* Compute target EVERY FRAME from mutable refs — no stale closures */
      let tgt: number | null = null;
      if (hovRef.current) {
        // Country hovered (inside region detail)
        const c = COUNTRY_COORDS[hovRef.current];
        if (c) tgt = lngToBasePhi(c[1]);
      } else if (activeRegionRef.current) {
        // Region selected
        const r = REGIONS.find((r) => r.slug === activeRegionRef.current);
        if (r) tgt = lngToBasePhi(r.center[1]);
      } else if (hoveredRegionRef.current) {
        // Region card hovered (in default grid view)
        const r = REGIONS.find((r) => r.slug === hoveredRegionRef.current);
        if (r) tgt = lngToBasePhi(r.center[1]);
      }

      if (ptrDown.current !== null) {
        // drag — user controls, phi stays, offset moves
      } else if (tgt !== null) {
        // Shortest-path rotation: normalize target and current into [0, TAU)
        const TAU = Math.PI * 2;
        // Normalize both to [0, TAU)
        const normCur = ((phiRef.current % TAU) + TAU) % TAU;
        const normTgt = ((tgt % TAU) + TAU) % TAU;
        // Delta in [-PI, PI)
        let delta = normTgt - normCur;
        if (delta > Math.PI) delta -= TAU;
        if (delta < -Math.PI) delta += TAU;
        // Dead-zone: stop lerping when close enough (prevents micro-oscillation)
        if (Math.abs(delta) > 0.001) {
          phiRef.current += delta * 0.06;
        }
      } else {
        phiRef.current += SPEED;
      }

      // Final phi = base + any active drag offset
      const phi = phiRef.current + offsetRef.current;
      globe.update({ phi, width: w * 2, height: w * 2 });

      // Overlay canvas — dots with region-aware dimming
      if (ov) {
        const ctx = ov.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, ov.width, ov.height);
          const scale = w / 600;
          const activeReg = activeRegionRef.current;
          const activeRegion = activeReg ? REGIONS.find((r) => r.slug === activeReg) : null;

          if (activeRegion) {
            // ── REGION SELECTED: show only that region's country dots ──
            activeRegion.countrySlugs.forEach((slug) => {
              const coords = COUNTRY_COORDS[slug];
              if (!coords) return;
              const { x, y, z } = projectToScreen(coords[0], coords[1], phi, THETA);
              if (z <= 0) return;

              const px = (x + 1) / 2 * ov.width;
              const py = (y + 1) / 2 * ov.height;
              const baseOp = Math.min(1, z * 3);
              const isH = hovRef.current === slug;
              const r = (isH ? 14 : 9) * scale;

              // Hover glow ring
              if (isH) {
                ctx.beginPath(); ctx.arc(px, py, 28 * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(106,216,210,${baseOp * 0.18})`;
                ctx.fill();
              }
              // Main dot
              ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
              ctx.fillStyle = isH
                ? `rgba(106,216,210,${baseOp})`
                : `rgba(106,216,210,${baseOp * 0.65})`;
              ctx.fill();
              // Center highlight
              ctx.beginPath(); ctx.arc(px, py, r * 0.3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255,255,255,${baseOp * 0.85})`;
              ctx.fill();
            });
          } else {
            // ── DEFAULT: all dots via overlay canvas (crisp edges) ──
            const hovReg = hoveredRegionRef.current;
            const hovRegion = hovReg ? REGIONS.find((r) => r.slug === hovReg) : null;

            // Helper: draw a single dot
            const drawDot = (lat: number, lng: number, size: number, highlighted: boolean, dimmed: boolean) => {
              const { x, y, z } = projectToScreen(lat, lng, phi, THETA);
              if (z <= 0) return;
              const px = (x + 1) / 2 * ov.width;
              const py = (y + 1) / 2 * ov.height;
              const baseOp = Math.min(1, z * 3);
              const op = dimmed ? baseOp * 0.1 : baseOp;
              const r = (dimmed ? 5 : size) * scale;

              if (highlighted) {
                // Glow ring
                ctx.beginPath(); ctx.arc(px, py, 20 * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(106,216,210,${op * 0.15})`;
                ctx.fill();
              }
              // Main dot
              ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(106,216,210,${op * (highlighted ? 0.95 : 0.7)})`;
              ctx.fill();
              // White center
              ctx.beginPath(); ctx.arc(px, py, r * 0.3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255,255,255,${op * (highlighted ? 0.9 : 0.55)})`;
              ctx.fill();
            };

            // Draw all 29 EP country dots
            COUNTRIES.forEach((c) => {
              const coords = COUNTRY_COORDS[c.slug];
              if (!coords) return;
              const isHL = hovRegion ? hovRegion.countrySlugs.includes(c.slug) : false;
              const isDim = hovRegion ? !isHL : false;
              drawDot(coords[0], coords[1], isHL ? 10 : 10, isHL, isDim);
            });

            // Draw global coming-soon city dots (always smaller, dim on hover)
            GLOBAL_COORDS.forEach(([lat, lng]) => {
              drawDot(lat, lng, 7, false, !!hovRegion);
            });
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    setTimeout(() => { canvas.style.opacity = "1"; }, 300);

    const onResize = () => {
      w = host.offsetWidth;
      if (ov) { ov.width = w * 2; ov.height = w * 2; }
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      while (host.firstChild) host.removeChild(host.firstChild);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="globe-section"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center"
      style={{ background: "#0B0B0B" }}
    >
      {/* Dark overlay — covers navbar + sections above/below, NOT this section */}
      <div
        ref={darkOverlayRef}
        className="fixed inset-0 pointer-events-none z-[55]"
        style={{ background: "#0B0B0B", opacity: 0 }}
      />

      {/* ── Content wrapper — z-60 sits ABOVE both overlay and navbar ── */}
      <div className="relative z-[60] w-full px-6 md:px-12 lg:px-16 py-12">

        {/* Headline — compact CTA with inline stats */}
        <div ref={headlineRef} className="mb-6">
          <h2
            className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium tracking-tight text-white leading-[1] mb-3"
          >
            <span className="headline-word inline-block mr-2">Find</span>
            <span className="headline-word inline-block mr-2">your</span>
            <span className="headline-word inline-block mr-2">venue.</span>
            <span className="headline-word inline-block italic font-light text-tiffany">Anywhere in Europe.</span>
          </h2>
          <p className="headline-word text-white/35 text-[14px] font-sans max-w-2xl leading-relaxed">
            <span className="text-white/50 font-medium">300,000+ venues</span> · <span className="text-white/50 font-medium">175 countries</span> · <span className="text-white/50 font-medium">24h response</span> · <span className="text-white/50 font-medium">3+ proposals</span> per inquiry. Select a region and browse venues to get started.
          </p>
        </div>

        {/* Globe + Dashboard */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch" style={{ minHeight: "clamp(450px, 60vh, 700px)" }}>

          {/* LEFT: Globe */}
          <div className="w-full lg:w-[60%] relative flex-shrink-0 z-0">
            <div className="relative w-full" style={{ maxWidth: "710px", aspectRatio: "1/1", margin: "0 auto" }}>
              {/* COBE host */}
              <div ref={hostRef} className="absolute inset-0 z-0" />
              {/* Overlay canvas */}
              <canvas
                ref={overlayRef}
                onPointerDown={onDown}
                onPointerUp={onUp}
                onPointerOut={onUp}
                onPointerMove={onPointerMove}
                className="absolute inset-0 z-10 cursor-grab"
                style={{ width: "100%", height: "100%" }}
              />
              {/* Orbit text */}
              <div className="absolute inset-0 z-5 pointer-events-none hidden md:flex items-center justify-center" style={{ perspective: "800px" }}>
                <svg viewBox="0 0 500 500" className="w-[102%] h-[102%] absolute" style={{ transform: "rotateX(12deg)", animation: "orbit-spin 60s linear infinite" }}>
                  <defs>
                    <path id="orb" d="M 250,250 m -230,0 a 230,230 0 1,1 460,0 a 230,230 0 1,1 -460,0" fill="none" />
                  </defs>
                  <circle cx="250" cy="250" r="230" fill="none" stroke="white" strokeWidth="0.4" opacity="0.12" />
                  <text fill="white" opacity="0.25" style={{ fontSize: "10px", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    <textPath href="#orb" startOffset="0%">
                      EVENTPARTNER • 300,000+ VENUES • 175 COUNTRIES • EVENTPARTNER • 300,000+ VENUES • 175 COUNTRIES •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT: Dashboard panel */}
          <div ref={dashboardRef} className="w-full lg:w-[42%] lg:-ml-8 relative z-20 mt-6 lg:mt-0 lg:self-center">
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <AnimatePresence mode="wait">
                {selectedRegion ? (
                  <RegionDetail
                    key="detail"
                    regionSlug={selectedRegion}
                    hoveredCountry={hoveredCountry}
                    onHoverCountry={onHoverCountry}
                    onBack={onBack}
                  />
                ) : (
                  <RegionGrid
                    key="grid"
                    onSelectRegion={onSelectRegion}
                    onHoverRegion={onHoverRegion}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTINENT GROUPING — maps region slugs to continents
   ══════════════════════════════════════════════════════════════ */
type Continent = {
  id: string;
  label: string;
  emoji: string;
  regionSlugs: string[];
};

const CONTINENTS: Continent[] = [
  {
    id: 'europe',
    label: 'Europe',
    emoji: '🌍',
    regionSlugs: ['nordics', 'western-europe', 'central-europe', 'southern-europe', 'balkans-southeast', 'nordic-extended', 'central-europe-extended', 'balkans-extended'],
  },
  {
    id: 'middle-east',
    label: 'Middle East',
    emoji: '🕌',
    regionSlugs: ['middle-east'],
  },
  {
    id: 'africa',
    label: 'Africa',
    emoji: '🌍',
    regionSlugs: ['africa'],
  },
  {
    id: 'asia-pacific',
    label: 'Asia Pacific',
    emoji: '🌏',
    regionSlugs: ['asia-pacific'],
  },
  {
    id: 'north-america',
    label: 'North America',
    emoji: '🌎',
    regionSlugs: ['north-america'],
  },
  {
    id: 'south-america',
    label: 'South America',
    emoji: '🌎',
    regionSlugs: ['south-america'],
  },
];

/* ══════════════════════════════════════════════════════════════
   REGION GRID — Two-level: Continents → Sub-regions
   ══════════════════════════════════════════════════════════════ */
function RegionGrid({ onSelectRegion, onHoverRegion }: { onSelectRegion: (slug: string) => void; onHoverRegion: (slug: string | null) => void }) {
  const [activeContinent, setActiveContinent] = useState<string | null>(null);

  const selectedContinent = CONTINENTS.find(c => c.id === activeContinent);
  const subRegions = selectedContinent
    ? selectedContinent.regionSlugs.map(s => REGIONS.find(r => r.slug === s)).filter(Boolean) as Region[]
    : [];

  // For single-region continents, skip sub-region step and go directly to region detail
  const handleContinentClick = (continent: Continent) => {
    if (continent.regionSlugs.length === 1) {
      // Single region → go directly to country list
      onSelectRegion(continent.regionSlugs[0]);
    } else {
      // Multiple sub-regions → show sub-region picker
      setActiveContinent(continent.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5">
          {activeContinent ? (
            <button
              onClick={() => { setActiveContinent(null); onHoverRegion(null); }}
              className="flex items-center gap-1.5 text-white/40 hover:text-tiffany transition-colors group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em]">Back</span>
            </button>
          ) : (
            <>
              <Globe2 className="w-4 h-4 text-tiffany/70" />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
                Explore by Region
              </span>
            </>
          )}
        </div>
        <span className="font-mono text-[10px] text-white/20">
          {activeContinent && selectedContinent
            ? `${subRegions.reduce((s, r) => s + r.countrySlugs.length, 0)} countries`
            : `${REGIONS.filter(r => r.status === 'active').reduce((sum, r) => sum + r.countrySlugs.length, 0)} countries`
          }
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!activeContinent ? (
          /* ── Level 1: Continent buttons ── */
          <motion.div
            key="continents"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="p-4 flex flex-col gap-2"
          >
            {CONTINENTS.map((continent, i) => {
              const regions = continent.regionSlugs.map(s => REGIONS.find(r => r.slug === s)).filter(Boolean) as Region[];
              const totalCountries = regions.reduce((s, r) => s + r.countrySlugs.length, 0);
              const totalVenues = regions.reduce((s, r) => s + parseInt(r.totalVenues.replace(/[^\d]/g, '') || '0'), 0);
              const allFlags = regions.flatMap(r => r.previewFlags).slice(0, 5);

              return (
                <motion.button
                  key={continent.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  onClick={() => handleContinentClick(continent)}
                  onMouseEnter={() => {
                    // Hover highlights first region in continent
                    if (regions[0]) onHoverRegion(regions[0].slug);
                  }}
                  onMouseLeave={() => onHoverRegion(null)}
                  className="group flex items-center gap-4 px-4 py-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-tiffany/20 hover:bg-tiffany/[0.04] active:scale-[0.98] transition-all duration-200 cursor-pointer text-left"
                >
                  {/* Emoji */}
                  <span className="text-lg shrink-0">{continent.emoji}</span>

                  {/* Label + stats */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-display text-[15px] font-medium tracking-tight text-white/80 group-hover:text-tiffany transition-colors">
                        {continent.label}
                      </span>
                      <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-tiffany/60 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Mini flags */}
                      <div className="flex items-center gap-1">
                        {allFlags.map((code) => (
                          <div key={code} className="w-6 h-4 rounded-[2px] overflow-hidden border border-white/[0.08]">
                            <Image
                              src={`https://flagcdn.com/w40/${code}.png`}
                              alt="" width={40} height={28}
                              className="w-full h-full object-cover" unoptimized
                            />
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-white/25">
                        {totalCountries} countries
                      </span>
                      <span className="font-mono text-[10px] text-tiffany/40">
                        {totalVenues.toLocaleString()}+ venues
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          /* ── Level 2: Sub-regions within selected continent ── */
          <motion.div
            key="subregions"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Continent title */}
            <div className="px-6 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <span className="text-base">{selectedContinent?.emoji}</span>
              <span className="font-display text-[15px] font-medium text-white/90">{selectedContinent?.label}</span>
            </div>

            {/* Sub-region cards */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {subRegions.map((region, i) => (
                <RegionCard
                  key={region.slug}
                  region={region}
                  index={i}
                  onClick={() => onSelectRegion(region.slug)}
                  onHover={onHoverRegion}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Single region card (used inside sub-region view) ── */
function RegionCard({ region, index, onClick, onHover }: { region: Region; index: number; onClick: () => void; onHover: (slug: string | null) => void }) {
  const isComingSoon = region.status === "coming-soon";

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      onMouseEnter={() => !isComingSoon && onHover(region.slug)}
      onMouseLeave={() => onHover(null)}
      disabled={isComingSoon}
      className={`group relative text-left p-4 rounded-xl border transition-all duration-200 ${
        isComingSoon
          ? "opacity-40 cursor-not-allowed border-white/[0.04] bg-white/[0.01]"
          : "cursor-pointer border-white/[0.05] bg-white/[0.02] hover:border-tiffany/20 hover:bg-tiffany/[0.04] active:scale-[0.98]"
      }`}
    >
      {/* Region name */}
      <div className="flex items-center justify-between mb-2.5">
        <span className={`font-display text-[14px] font-medium tracking-tight ${
          isComingSoon ? "text-white/30" : "text-white/80 group-hover:text-tiffany"
        } transition-colors`}>
          {region.name}
        </span>
        {isComingSoon ? (
          <Lock className="w-3 h-3 text-white/15" />
        ) : (
          <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-tiffany/60 group-hover:translate-x-0.5 transition-all" />
        )}
      </div>

      {/* Mini flags preview */}
      <div className="flex items-center gap-1.5 mb-2">
        {isComingSoon ? (
          <span className="font-mono text-[9px] text-white/20 italic">Coming soon</span>
        ) : (
          region.previewFlags.map((code) => (
            <div key={code} className="w-7 h-5 rounded-[2px] overflow-hidden border border-white/[0.08]">
              <Image
                src={`https://flagcdn.com/w40/${code}.png`}
                alt="" width={40} height={28}
                className="w-full h-full object-cover" unoptimized
              />
            </div>
          ))
        )}
      </div>

      {/* Country count + venues */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/30">
          {isComingSoon ? "—" : `${region.countrySlugs.length} countries`}
        </span>
        {!isComingSoon && (
          <span className="font-mono text-[9px] text-tiffany/50">
            {region.totalVenues}
          </span>
        )}
      </div>
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════════════════
   REGION DETAIL — Country list for selected region
   ══════════════════════════════════════════════════════════════ */
function RegionDetail({
  regionSlug,
  hoveredCountry,
  onHoverCountry,
  onBack,
}: {
  regionSlug: string;
  hoveredCountry: string | null;
  onHoverCountry: (slug: string | null) => void;
  onBack: () => void;
}) {
  const region = REGIONS.find((r) => r.slug === regionSlug);
  if (!region) return null;

  const countries = region.countrySlugs
    .map((s) => COUNTRIES.find((c) => c.slug === s))
    .filter(Boolean) as Country[];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Panel header with back button */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/40 hover:text-tiffany transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-mono text-[12px] uppercase tracking-[0.1em]">All Regions</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tiffany animate-pulse" />
          <span className="font-display text-[15px] font-medium text-white/90">{region.name}</span>
        </div>
      </div>

      {/* Region summary */}
      <div className="px-6 py-3.5 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <span className="font-mono text-[11px] text-white/35">
          {countries.length} countries
        </span>
        <span className="font-mono text-[11px] text-tiffany/50">
          {region.totalVenues} venues
        </span>
      </div>

      {/* Country grid — 2 columns */}
      <div className="p-4 grid grid-cols-2 gap-2">
        {countries.map((country) => (
          <Link href={`/land/${country.slug}`} key={country.slug}>
            <div
              className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer border ${
                hoveredCountry === country.slug
                  ? "bg-tiffany/[0.08] border-tiffany/10"
                  : "border-transparent hover:bg-white/[0.03]"
              }`}
              onMouseEnter={() => onHoverCountry(country.slug)}
              onMouseLeave={() => onHoverCountry(null)}
            >
              {/* Flag */}
              <div className="w-10 h-7 rounded-sm overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={`https://flagcdn.com/w80/${country.code}.png`}
                  alt={country.name} width={80} height={56}
                  className="w-full h-full object-cover" unoptimized
                />
              </div>
              {/* Name + venues */}
              <div className="flex-1 min-w-0">
                <span className={`font-display text-[14px] font-medium block truncate transition-colors ${
                  hoveredCountry === country.slug ? "text-tiffany" : "text-white/80"
                }`}>
                  {country.name}
                </span>
                <span className="font-mono text-[10px] text-white/30">{country.venues}</span>
              </div>
              <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
                hoveredCountry === country.slug ? "text-tiffany translate-x-0.5" : "text-white/15"
              }`} />
            </div>
          </Link>
        ))}
      </div>

      {/* Venue image preview — shows up to 3 venue images on hover */}
      <div className="px-4 pb-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-white/[0.02]">
          <AnimatePresence mode="wait">
            {hoveredCountry ? (() => {
              const country = COUNTRIES.find(c => c.slug === hoveredCountry);
              const imgCount = IMAGE_COUNTS[hoveredCountry] || 0;
              const venueCount = Math.min(imgCount >= 15 ? 3 : imgCount >= 5 ? 2 : 0, 3);
              
              if (venueCount === 0) {
                return (
                  <motion.div
                    key={`${hoveredCountry}-fallback`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/Images/round-table-discussion-business-conference-meeting-event-audience-conference-hall-business.webp"
                      alt="Venue" fill className="object-cover" unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-tiffany" />
                        <span className="font-display text-[13px] font-medium text-white">{country?.name}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={hoveredCountry}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex gap-1.5"
                >
                  {Array.from({ length: venueCount }, (_, i) => (
                    <div key={i} className="relative flex-1 overflow-hidden rounded-lg">
                      <Image
                        src={`/Images/venues/${hoveredCountry}/venue-${i + 1}.jpg`}
                        alt={country?.topVenues[i]?.name || "Venue"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {country?.topVenues[i] && (
                        <div className="absolute bottom-2 left-2.5 right-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-tiffany" />
                            <span className="font-display text-[11px] font-medium text-white truncate">
                              {country.topVenues[i].name}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.08em]">
                            {country.topVenues[i].city}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              );
            })() : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 text-white/15">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                    Hover a country to preview venues
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </motion.div>
  );
}

/* ── Country row — fixed height, no inline expand ── */
function CountryRow({ country, isHovered, onHover }: {
  country: Country; isHovered: boolean; onHover: (s: string | null) => void;
}) {
  return (
    <Link href={`/land/${country.slug}`}>
      <div
        className={`group px-6 py-4 transition-all duration-200 cursor-pointer border-b ${
          isHovered
            ? "bg-tiffany/[0.08] border-tiffany/10"
            : "border-white/[0.03] hover:bg-white/[0.02]"
        }`}
        onMouseEnter={() => onHover(country.slug)}
        onMouseLeave={() => onHover(null)}
      >
        <div className="flex items-center gap-4">
          {/* Flag */}
          <div className="w-12 h-8 rounded-md overflow-hidden border border-white/10 shrink-0">
            <Image
              src={`https://flagcdn.com/w80/${country.code}.png`}
              alt={country.name} width={80} height={56}
              className="w-full h-full object-cover" unoptimized
            />
          </div>
          {/* Name */}
          <span className={`font-display text-[16px] font-medium flex-1 transition-colors ${
            isHovered ? "text-tiffany" : "text-white/80"
          }`}>
            {country.name}
          </span>
          {/* Venue count */}
          <span className="font-mono text-[13px] text-tiffany/70 tracking-wide shrink-0">
            {country.venues}
          </span>
          {/* Arrow */}
          <ArrowRight className={`w-4 h-4 shrink-0 transition-all duration-200 ${
            isHovered ? "text-tiffany translate-x-0.5" : "text-white/20 group-hover:text-white/40"
          }`} />
        </div>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════
   STATS BAR
   ══════════════════════════════════════════════════════════════ */
function StatsBar({ metrics }: { metrics?: GlobeCMS["metrics"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative z-10 flex flex-wrap items-center justify-center gap-10 md:gap-20 py-14 md:py-20 px-8"
    >
      {metrics && metrics.length > 0 ? (
        metrics.map((m, i) => {
          if (m.value != null) return <Counter key={i} value={m.value} suffix={m.suffix || ""} label={m.label || ""} go={inView} delay={i * 0.15} />;
          return (
            <div key={i} className="text-center">
              <span className="font-display text-2xl md:text-3xl font-medium text-white block">{m.stringValue}{m.suffix}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">{m.label}</span>
            </div>
          );
        })
      ) : (
        <>
          <Counter value={29} suffix="" label="Countries" go={inView} />
          <Counter value={300} suffix="K+" label="Venues" go={inView} delay={0.15} />
          <div className="text-center">
            <span className="font-display text-2xl md:text-3xl font-medium text-white block">100%</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">Europe</span>
          </div>
          <div className="text-center">
            <span className="font-display text-2xl md:text-3xl font-medium text-white block">24/7</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">Support</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

function Counter({ value, suffix, label, go, delay = 0 }: { value: number; suffix: string; label: string; go: boolean; delay?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    const t = setTimeout(() => {
      const dur = 2000, s = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - s) / dur, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [go, value, delay]);

  return (
    <div className="text-center">
      <span className="font-display text-2xl md:text-3xl font-medium text-white block tabular-nums">{n}{suffix}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">{label}</span>
    </div>
  );
}
