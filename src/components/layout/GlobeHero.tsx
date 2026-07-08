"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations, useLocale } from 'next-intl';
import createGlobe from "cobe";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/animation";
import Image from "next/image";
import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { COUNTRY_COORDS, projectToScreen } from "@/data/countryCoords";
import { REGIONS, Region } from "@/data/regions";
import { ArrowRight, ChevronLeft, Globe2, Lock, MousePointerClick, Landmark, Compass, Sun, TreePalm } from "lucide-react";
import { Country } from "@/data/countries";

/* ── Background slideshow images ── */
const HERO_IMAGES = [
  "/Images/hero/tall-centrepiece-made-pink-flowers-crystal-chains-stands-dinner-table.jpg",
  "/Images/hero/friends-gathered-rooftop-terrace-meal-with-city-skyline-background.jpg",
  "/Images/hero/happy-audience-conference-laughing-business-people-seminar-workshop-training-diversity-men-women-crowd-presentation-learning-knowledge-funny-corporate-discussion.jpg",
  "/Images/hero/food-festive-restaurant-party-unity-concept.jpg",
  "/Images/hero/big-dinner-party-with-small-crowd-multiethnic-diverse-friends-celebrating-restaurant-beautiful-happy-hosts-propose-toast-raise-wine-glasses-while-sitting-table-evening.jpg",
];

/* ── Global city dots ── */
const GLOBAL_COORDS: [number, number][] = [
  [25.28,55.30],[24.47,54.37],[26.07,50.55],[21.42,39.83],
  [30.04,31.24],[-33.92,18.42],[-1.29,36.82],[6.52,3.38],
  [35.68,139.69],[1.35,103.82],[22.32,114.17],[37.57,126.98],
  [-33.87,151.21],[13.76,100.50],[28.61,77.21],[19.08,72.88],
  [40.71,-74.01],[34.05,-118.24],[41.88,-87.63],[25.76,-80.19],
  [43.65,-79.38],[-23.55,-46.63],[19.43,-99.13],[-34.60,-58.38],
];

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

const THETA = 0.25, PHI_START = 0.3, SPEED = 0.0004;
function lngToBasePhi(lng: number) { return -(lng * Math.PI) / 180 + (3 * Math.PI) / 2; }

interface GlobeHeroCMS {
  badge?: string; headline?: string; headlineAccent?: string;
  subheadline?: string; cta1?: string; cta2?: string;
}

/* ══════════════════════════════════════════════════════════════
   GLOBE HERO — renders TWO <section> elements:
   1. Intro (100vh) — headline + background images
   2. Explorer (100vh) — globe + region strip
   Both have their own opaque dark background.
   No pinning. Normal scroll flow.
   ══════════════════════════════════════════════════════════════ */
export function GlobeHero({ cms }: { cms?: GlobeHeroCMS }) {
  const t = useTranslations('hero');
  const svHero = useLocale() === 'sv';
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setCurrentImage(p => (p + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!headlineRef.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const words = headlineRef.current.querySelectorAll(".hero-word");
    if (!words.length) return;
    gsap.set(words, { opacity: 0, y: 40, rotateX: -15 });
    gsap.to(words, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.3 });
  }, []);

  const h1 = cms?.headline || t('headline');
  const h2: string = cms?.headline ? "" : "";
  const accent = cms?.headlineAccent || t('headlineAccent');

  return (
    <>
      {/* ════ SECTION 1: Hero Intro ════ */}
      <section className="relative w-full h-[100vh] min-h-[700px] flex flex-col justify-center" style={{ background: "#111" }} suppressHydrationWarning>
        {/* Background slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
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
                src={HERO_IMAGES[currentImage]} alt="Premium Event" fill
                priority={currentImage === 0}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Darkening overlay instead of CSS filters on the image — filters on a
              full-screen image are a major mobile GPU cost. */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,transparent_60%)]" />
          {/* Scrim — darkens the left where the copy block sits */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Hero copy — one left-aligned stack, anchored lower-left (reference layout) */}
        <div className="absolute z-10 bottom-[18%] md:bottom-[20%] inset-x-0 px-6 md:px-10 lg:pl-[13%] lg:pr-14">
          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-6xl md:text-[4.5rem] lg:text-[5.75rem] font-light leading-[0.95] tracking-[-0.02em] text-white drop-shadow-xl max-w-3xl"
            style={{ perspective: "600px" }}
            suppressHydrationWarning
          >
            {h1.split(" ").map((w, i) => <span key={`a${i}`} className="hero-word inline-block mr-[0.25em]">{w}</span>)}
            <br />
            {h2 && h2.split(" ").map((w, i) => <span key={`b${i}`} className="hero-word inline-block mr-[0.25em]">{w}</span>)}
            <span className="font-light text-white block mt-2">
              {accent.split(" ").filter((w) => w !== "—" && w !== "-").map((w, i) => <span key={`c${i}`} className={`hero-word inline-block mr-[0.25em] ${/EventPartner/i.test(w) ? "text-tiffany italic" : ""}`}>{w}</span>)}
            </span>
          </h1>
          <p className="mt-7 max-w-[520px] text-white/80 text-base md:text-lg font-light leading-relaxed drop-shadow-lg">
            {cms?.subheadline || t('subtitle')}
          </p>
        </div>

        {/* CTA — scrolls to globe */}
        <button
          onClick={() => document.getElementById('globe-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 group cursor-pointer"
        >
          <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-md hover:bg-tiffany/15 hover:border-tiffany/30 transition-all duration-400 group-hover:shadow-[0_0_30px_rgba(74,222,210,0.12)]">
            <span className="font-display text-[15px] font-medium text-white/80 group-hover:text-white transition-colors tracking-wide">
              {svHero ? "Utforska lokaler" : "Explore Venues"}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-tiffany"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" className="text-white/15"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
          </motion.div>
        </button>
      </section>

      {/* ════ SECTION 2: Globe Explorer ════ */}
      <GlobeExplorer />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   GLOBE EXPLORER — Right panel: region→country drill-down
   Left panel: 2 large venue images on country hover
   ══════════════════════════════════════════════════════════════ */
function GlobeExplorer() {
  const geLocale = useLocale();
  const geSv = geLocale === 'sv';
  const hostRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(PHI_START);
  const offsetRef = useRef(0);
  const ptrDown = useRef<number | null>(null);
  const hoveredRegionRef = useRef<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // UI state
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const activeRegions = REGIONS.filter(r => r.status === "active");

  // Data for selected/hovered region
  const selectedRegionData = selectedRegion ? REGIONS.find(r => r.slug === selectedRegion) : null;
  const hoveredRegionData = hoveredRegion ? REGIONS.find(r => r.slug === hoveredRegion) : null;
  const regionCountries = selectedRegionData
    ? selectedRegionData.countrySlugs.map(s => COUNTRIES.find(c => c.slug === s)).filter(Boolean) as Country[]
    : [];
  const hoveredCountryData = hoveredCountry ? COUNTRIES.find(c => c.slug === hoveredCountry) : null;

  // Get countries of a region for preview images (all of them)
  const previewRegionForImages = hoveredRegionData || selectedRegionData;
  const previewCountrySlugs = previewRegionForImages
    ? previewRegionForImages.countrySlugs
    : [];

  const onSelectRegion = useCallback((slug: string) => {
    const region = REGIONS.find(r => r.slug === slug);
    if (!region || region.status === "coming-soon") return;
    setSelectedRegion(slug);
    setHoveredCountry(null);
    hoveredRegionRef.current = slug;
  }, []);

  const onBack = useCallback(() => {
    setSelectedRegion(null);
    setHoveredCountry(null);
    hoveredRegionRef.current = null;
  }, []);

  const onHoverRegion = useCallback((slug: string | null) => {
    hoveredRegionRef.current = slug;
    setHoveredRegion(slug);
  }, []);

  const onHoverCountry = useCallback((slug: string | null) => {
    setHoveredCountry(slug);
  }, []);

  const onDown = useCallback((e: React.PointerEvent) => {
    ptrDown.current = e.clientX;
    if (overlayRef.current) overlayRef.current.style.cursor = "grabbing";
  }, []);
  const onUp = useCallback(() => {
    ptrDown.current = null;
    phiRef.current += offsetRef.current;
    offsetRef.current = 0;
    if (overlayRef.current) overlayRef.current.style.cursor = "grab";
  }, []);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (ptrDown.current !== null) offsetRef.current = (e.clientX - ptrDown.current) / 200;
  }, []);

  /* ── Scroll-linked entrance ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    gsap.fromTo(el, { opacity: 0.3 }, {
      opacity: 1,
      scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 0.6 },
    });
    return () => { gsap.killTweensOf(el); };
  }, []);

  /* ── COBE globe ── */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // The globe panel is display:none below lg — but CSS-hiding does NOT stop
    // WebGL + rAF work. Never initialize the globe on mobile (it tanks phones).
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.className = "w-full h-full opacity-0 transition-opacity duration-[1200ms]";
    host.appendChild(canvas);
    let w = host.offsetWidth;
    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 1.5),
      width: w * 2, height: w * 2, phi: PHI_START, theta: THETA,
      dark: 1, diffuse: 1.4, mapSamples: 20000, mapBrightness: 5,
      baseColor: [0.75, 0.78, 0.82], markerColor: [0.42, 0.85, 0.82],
      glowColor: [0.12, 0.12, 0.15], markers: [], opacity: 0.88,
    });
    const ov = overlayRef.current;
    if (ov) { ov.width = w * 2; ov.height = w * 2; }

    let raf: number;
    const loop = () => {
      let tgt: number | null = null;
      const hr = hoveredRegionRef.current;
      if (hr) {
        const r = REGIONS.find(r => r.slug === hr);
        if (r) tgt = lngToBasePhi(r.center[1]);
      }
      if (ptrDown.current !== null) { /* drag */ }
      else if (tgt !== null) {
        const TAU = Math.PI * 2;
        const nc = ((phiRef.current % TAU) + TAU) % TAU;
        const nt = ((tgt % TAU) + TAU) % TAU;
        let d = nt - nc; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU;
        if (Math.abs(d) > 0.001) phiRef.current += d * 0.06;
      } else { phiRef.current += SPEED; }

      const phi = phiRef.current + offsetRef.current;
      globe.update({ phi, width: w * 2, height: w * 2 });

      if (ov) {
        const ctx = ov.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, ov.width, ov.height);
          const scale = w / 600;
          const hovReg = hoveredRegionRef.current;
          const hovRegion = hovReg ? REGIONS.find(r => r.slug === hovReg) : null;
          const drawDot = (lat: number, lng: number, size: number, hl: boolean, dim: boolean) => {
            const { x, y, z } = projectToScreen(lat, lng, phi, THETA);
            if (z <= 0) return;
            const px = (x + 1) / 2 * ov.width, py = (y + 1) / 2 * ov.height;
            const bo = Math.min(1, z * 3), op = dim ? bo * 0.1 : bo;
            const r = (dim ? 5 : size) * scale;
            if (hl) { ctx.beginPath(); ctx.arc(px, py, 20 * scale, 0, Math.PI * 2); ctx.fillStyle = `rgba(106,216,210,${op * 0.15})`; ctx.fill(); }
            ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fillStyle = `rgba(106,216,210,${op * (hl ? 0.95 : 0.7)})`; ctx.fill();
            ctx.beginPath(); ctx.arc(px, py, r * 0.3, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${op * (hl ? 0.9 : 0.55)})`; ctx.fill();
          };
          COUNTRIES.forEach(c => { const co = COUNTRY_COORDS[c.slug]; if (!co) return; const isHL = hovRegion ? hovRegion.countrySlugs.includes(c.slug) : false; drawDot(co[0], co[1], isHL ? 12 : 10, isHL, hovRegion ? !isHL : false); });
          GLOBAL_COORDS.forEach(([lat, lng]) => drawDot(lat, lng, 7, false, !!hovRegion));
        }
      }
      if (running) raf = requestAnimationFrame(loop);
    };
    // Pause rendering when the globe is offscreen or the tab is hidden —
    // a free-running WebGL loop wastes battery/GPU for no visible benefit.
    let running = false;
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    start();
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    }, { threshold: 0 });
    io.observe(host);
    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);
    setTimeout(() => { canvas.style.opacity = "1"; }, 300);
    const onResize = () => { w = host.offsetWidth; if (ov) { ov.width = w * 2; ov.height = w * 2; } };
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      try { if (canvas.parentNode === host) host.removeChild(canvas); } catch { /* React cleanup */ }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="globe-section"
      className="relative w-full lg:min-h-screen flex flex-col lg:flex-row lg:items-center overflow-visible lg:overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#111] to-transparent z-0" />

      {/* ── Mobile Venue Explorer (< lg) ── */}
      <MobileVenueExplorer />

      {/* ── Desktop Globe Layout (≥ lg) ── */}
      <div className="relative z-10 w-full hidden lg:flex items-center px-6 md:px-12 lg:px-16 py-12">

        {/* LEFT: Images only — venue previews on hover */}
        <div className="hidden lg:flex flex-col justify-center w-[300px] xl:w-[360px] shrink-0 ml-10">
          <AnimatePresence mode="wait">
            {hoveredCountryData ? (() => {
              /* ── Country hover: 2 large venue images ── */
              const imgCount = IMAGE_COUNTS[hoveredCountryData.slug] || 0;
              const hasImages = imgCount >= 5;
              return (
                <motion.div
                  key={`country-${hoveredCountryData.slug}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Image src={`https://flagcdn.com/w40/${hoveredCountryData.code}.png`} alt="" width={24} height={16} className="rounded-[2px]" unoptimized />
                    <span className="font-display text-xl font-medium text-white">{hoveredCountryData.name}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 block mb-3">{hoveredCountryData.venues} venues</span>
                  <div className="flex flex-col gap-2.5">
                    {[1, 2].map(i => (
                      <div key={i} className="relative h-[130px] xl:h-[150px] rounded-xl overflow-hidden border border-white/[0.06]">
                        <Image
                          src={hasImages ? `/Images/venues/${hoveredCountryData.slug}/venue-${i}.jpg` : '/Images/round-table-discussion-business-conference-meeting-event-audience-conference-hall-business.webp'}
                          alt={`${hoveredCountryData.name} venue ${i}`}
                          fill className="object-cover" unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })() : previewRegionForImages ? (
              /* ── Region hover: top 4 country venue previews ── */
              <motion.div
                key={`region-${previewRegionForImages.slug}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany/50 block mb-1">
                  {previewRegionForImages.countrySlugs.length} {geSv ? "länder" : "countries"} · {previewRegionForImages.totalVenues}
                </span>
                <h2 className="font-display text-xl xl:text-2xl font-medium text-white leading-tight mb-2.5">{previewRegionForImages.name}</h2>
                <div className="grid grid-cols-2 gap-1.5">
                  {previewCountrySlugs.slice(0, 4).map(slug => {
                    const country = COUNTRIES.find(c => c.slug === slug);
                    if (!country) return null;
                    const hasImg = (IMAGE_COUNTS[country.slug] || 0) >= 5;
                    return (
                      <div key={country.slug} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/[0.06]">
                        <Image
                          src={hasImg ? `/Images/venues/${country.slug}/venue-1.jpg` : '/Images/round-table-discussion-business-conference-meeting-event-audience-conference-hall-business.webp'}
                          alt={country.name} fill className="object-cover" unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
                          <Image src={`https://flagcdn.com/w40/${country.code}.png`} alt="" width={14} height={10} className="rounded-[1px]" unoptimized />
                          <span className="font-display text-[10px] font-medium text-white drop-shadow-md">{geSv ? (country.nameSv || country.name) : country.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {previewCountrySlugs.length > 4 && (
                  <span className="font-mono text-[10px] text-white/20 block text-center mt-2">
                    {geSv ? `+${previewCountrySlugs.length - 4} länder till` : `+${previewCountrySlugs.length - 4} more countries`}
                  </span>
                )}
              </motion.div>
            ) : (
              /* ── Idle: EventPartner explainer ── */
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-tiffany/10 border border-tiffany/20 flex items-center justify-center">
                    <Globe2 className="w-4 h-4 text-tiffany" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany/60">{geSv ? "Interaktiv lokal-utforskare" : "Interactive Venue Explorer"}</span>
                </div>
                <h2 className="font-display text-2xl xl:text-3xl font-medium text-white leading-[1.2] mb-3">
                  {geSv ? "Hitta er perfekta" : "Find your perfect"}<br />
                  <span className="text-tiffany">{geSv ? "eventlokal" : "event venue"}</span>
                </h2>
                <p className="text-[13px] text-white/35 leading-relaxed mb-5">
                  {geSv ? "Utforska 340 000+ venues i 175 länder. Välj en region för att bläddra bland länder och hitta lokaler som passar ert event." : "Explore 340,000+ venues across 175 countries. Select a region to browse countries and discover venues tailored to your event."}
                </p>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-white/40 font-mono">1</span>
                    </div>
                    <span className="text-[12px] text-white/30">{geSv ? "Välj en region i listan" : "Select a region from the list"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-white/40 font-mono">2</span>
                    </div>
                    <span className="text-[12px] text-white/30">{geSv ? "Bläddra bland länder & se lokaler" : "Browse countries & preview venues"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-white/40 font-mono">3</span>
                    </div>
                    <span className="text-[12px] text-white/30">{geSv ? "Klicka på ett land för att börja boka" : "Click a country to start booking"}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Globe */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative" style={{ width: "min(78vh, 70vw, 820px)", aspectRatio: "1/1" }}>
            <div ref={hostRef} className="absolute inset-0 z-0" />
            <canvas ref={overlayRef} onPointerDown={onDown} onPointerUp={onUp} onPointerOut={onUp} onPointerMove={onPointerMove} className="absolute inset-0 z-10 cursor-grab" style={{ width: "100%", height: "100%" }} />
            <div className="absolute inset-0 z-5 pointer-events-none hidden md:flex items-center justify-center" style={{ perspective: "800px" }}>
              <svg viewBox="0 0 500 500" className="w-[104%] h-[104%] absolute" style={{ transform: "rotateX(12deg)", animation: "orbit-spin 60s linear infinite" }}>
                <defs><path id="orb-hero" d="M 250,250 m -235,0 a 235,235 0 1,1 470,0 a 235,235 0 1,1 -470,0" fill="none" /></defs>
                <circle cx="250" cy="250" r="235" fill="none" stroke="white" strokeWidth="0.3" opacity="0.08" />
                <text fill="white" opacity="0.15" style={{ fontSize: "9px", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  <textPath href="#orb-hero" startOffset="0%">{geSv ? "EVENTPARTNER • 340 000+ VENUES • 175 LÄNDER • EVENTPARTNER • 340 000+ VENUES • 175 LÄNDER •" : "EVENTPARTNER • 340,000+ VENUES • 175 COUNTRIES • EVENTPARTNER • 340,000+ VENUES • 175 COUNTRIES •"}</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT: All interaction — region → country drill-down */}
        <div className="hidden lg:flex flex-col w-[300px] xl:w-[340px] shrink-0">
          <AnimatePresence mode="wait">
            {selectedRegion && selectedRegionData ? (
              /* ── Country list view ── */
              <motion.div
                key="countries"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Back button + region name */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <button onClick={onBack} className="flex items-center gap-1.5 text-white/40 hover:text-tiffany transition-colors group">
                    <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em]">{geSv ? "Alla regioner" : "All Regions"}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tiffany animate-pulse" />
                    <span className="font-display text-[14px] font-medium text-white/90">{selectedRegionData.name}</span>
                  </div>
                </div>

                {/* Country list — scrollable */}
                <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto overscroll-contain pr-1" data-lenis-prevent>
                  {regionCountries.map(country => (
                    <Link href={`/${geLocale}/land/${country.slug}`} key={country.slug}>
                      <div
                        className={`group flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                          hoveredCountry === country.slug
                            ? "bg-tiffany/[0.08] border-tiffany/15"
                            : "border-transparent hover:bg-white/[0.04]"
                        }`}
                        onMouseEnter={() => onHoverCountry(country.slug)}
                        onMouseLeave={() => onHoverCountry(null)}
                      >
                        <div className="w-10 h-7 rounded-sm overflow-hidden border border-white/10 shrink-0">
                          <Image src={`https://flagcdn.com/w80/${country.code}.png`} alt={country.name} width={80} height={56} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`font-display text-[14px] font-medium block truncate transition-colors ${
                            hoveredCountry === country.slug ? "text-tiffany" : "text-white/80"
                          }`}>{geSv ? (country.nameSv || country.name) : country.name}</span>
                          <span className="font-mono text-[10px] text-white/30">{country.venues}</span>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
                          hoveredCountry === country.slug ? "text-tiffany translate-x-0.5" : "text-white/15"
                        }`} />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ── Region list view — Two-level: Continents → Sub-regions ── */
              <RegionExplorer
                activeRegions={activeRegions}
                onSelectRegion={onSelectRegion}
                onHoverRegion={onHoverRegion}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom gradient — desktop globe fade only. On mobile it sat on top of the
          last two continent cards (North/South America) and faded them out. */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#111] z-20 pointer-events-none" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTINENT GROUPING
   ══════════════════════════════════════════════════════════════ */
const CONTINENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'europe': Landmark,
  'middle-east': Compass,
  'africa': Sun,
  'asia-pacific': Globe2,
  'north-america': TreePalm,
  'south-america': TreePalm,
};

const CONTINENT_GROUPS = [
  { id: 'europe',       label: 'Europe',        labelSv: 'Europa',                    regionSlugs: ['nordics','western-europe','central-europe','southern-europe','balkans-southeast','baltics','central-europe-extended','balkans-extended'] },
  { id: 'middle-east',  label: 'Middle East',   labelSv: 'Mellanöstern',              regionSlugs: ['middle-east'] },
  { id: 'africa',       label: 'Africa',        labelSv: 'Afrika',                    regionSlugs: ['africa'] },
  { id: 'asia-pacific', label: 'Asia',  labelSv: 'Asien', regionSlugs: ['asia-pacific'] },
  { id: 'north-america', label: 'North America', labelSv: 'Nordamerika',              regionSlugs: ['north-america'] },
  { id: 'south-america', label: 'South America', labelSv: 'Sydamerika',               regionSlugs: ['south-america'] },
];

/* ══════════════════════════════════════════════════════════════
   MOBILE VENUE EXPLORER — touch-friendly replacement for globe
   ══════════════════════════════════════════════════════════════ */
function MobileVenueExplorer() {
  const mvLocale = useLocale();
  const mvSv = mvLocale === 'sv';
  const [level, setLevel] = useState<'continents' | 'regions' | 'countries'>('continents');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const activeRegions = REGIONS.filter(r => r.status === 'active');

  const selectedGroup = CONTINENT_GROUPS.find(c => c.id === selectedContinent);
  const subRegions = selectedGroup
    ? selectedGroup.regionSlugs.map(s => activeRegions.find(r => r.slug === s)).filter(Boolean) as Region[]
    : [];
  const selectedRegionData = selectedRegion ? REGIONS.find(r => r.slug === selectedRegion) : null;
  const regionCountries = selectedRegionData
    ? selectedRegionData.countrySlugs.map(s => COUNTRIES.find(c => c.slug === s)).filter(Boolean) as Country[]
    : [];

  const handleContinentTap = (group: typeof CONTINENT_GROUPS[0]) => {
    if (group.regionSlugs.length === 1) {
      setSelectedContinent(group.id);
      setSelectedRegion(group.regionSlugs[0]);
      setLevel('countries');
    } else {
      setSelectedContinent(group.id);
      setLevel('regions');
    }
  };

  const handleRegionTap = (slug: string) => {
    setSelectedRegion(slug);
    setLevel('countries');
  };

  const goBack = () => {
    if (level === 'countries' && subRegions.length > 1) {
      setSelectedRegion(null);
      setLevel('regions');
    } else {
      setSelectedContinent(null);
      setSelectedRegion(null);
      setLevel('continents');
    }
  };

  return (
    <div className="relative z-10 w-full px-5 py-10 lg:hidden">
      {/* Stats header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tiffany/[0.08] border border-tiffany/[0.15] mb-5">
          <Globe2 className="w-4 h-4 text-tiffany" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">{mvSv ? "Utforska lokaler" : "Venue Explorer"}</span>
        </div>
        <h2 className="font-display text-3xl font-medium text-white tracking-tight mb-3">
          {mvSv ? "Hitta er perfekta" : "Find your perfect"}<br />
          <span className="text-tiffany">{mvSv ? "eventlokal" : "event venue"}</span>
        </h2>
        <div className="flex justify-center gap-6 mt-4">
          {(mvSv ? [
            { value: '340 000+', label: 'Venues' },
            { value: '175', label: 'Länder' },
            { value: '23h', label: mvSv ? 'Snitt-svarstid' : 'Avg. Response' },
          ] : [
            { value: '340,000+', label: 'Venues' },
            { value: '175', label: 'Countries' },
            { value: '23h', label: 'Avg. Response' },
          ]).map(s => (
            <div key={s.label} className="text-center">
              <span className="font-display text-xl font-medium text-white block">{s.value}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <AnimatePresence mode="wait">
        {level === 'continents' ? (
          /* ── Continent Grid ── */
          <motion.div
            key="m-continents"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid grid-cols-2 gap-2.5">
              {CONTINENT_GROUPS.map((group, i) => {
                const regions = group.regionSlugs.map(s => activeRegions.find(r => r.slug === s)).filter(Boolean) as Region[];
                const totalCountries = regions.reduce((s, r) => s + r.countrySlugs.length, 0);
                const flags = regions.flatMap(r => r.previewFlags).slice(0, 3);
                const Icon = CONTINENT_ICONS[group.id] || Globe2;

                return (
                  <motion.button
                    key={group.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => handleContinentTap(group)}
                    className="relative flex flex-col items-start p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.08] transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-tiffany/[0.08] border border-tiffany/[0.12] flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-tiffany/70" />
                    </div>
                    <span className="font-display text-[15px] font-medium text-white/80 mb-1">{mvSv ? group.labelSv : group.label}</span>
                    <div className="flex items-center gap-1.5 mb-2">
                      {flags.map(code => (
                        <div key={code} className="w-5 h-[14px] rounded-[2px] overflow-hidden border border-white/[0.1]">
                          <Image src={`https://flagcdn.com/w40/${code}.png`} alt="" width={40} height={28} className="w-full h-full object-cover" unoptimized />
                        </div>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-white/25">{totalCountries} {mvSv ? "länder" : "countries"}</span>
                    <ArrowRight className="absolute top-4 right-4 w-3.5 h-3.5 text-white/15" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

        ) : level === 'regions' ? (
          /* ── Sub-regions ── */
          <motion.div
            key="m-regions"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-white/40 mb-4 active:text-tiffany transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.1em]">{mvSv ? "Alla regioner" : "All Regions"}</span>
            </button>

            <div className="flex items-center gap-2 mb-4">
              {(() => { const Icon = CONTINENT_ICONS[selectedGroup?.id || ''] || Globe2; return (
                <div className="w-8 h-8 rounded-lg bg-tiffany/[0.08] border border-tiffany/[0.12] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-tiffany/70" />
                </div>
              ); })()}
              <h3 className="font-display text-xl font-medium text-white">{mvSv ? selectedGroup?.labelSv : selectedGroup?.label}</h3>
            </div>

            <div className="flex flex-col gap-2">
              {subRegions.map(region => (
                <button
                  key={region.slug}
                  onClick={() => handleRegionTap(region.slug)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] active:bg-white/[0.08] transition-all text-left"
                >
                  <div className="flex gap-1 shrink-0">
                    {region.previewFlags.slice(0, 3).map(code => (
                      <div key={code} className="w-7 h-5 rounded-[2px] overflow-hidden border border-white/10">
                        <Image src={`https://flagcdn.com/w40/${code}.png`} alt="" width={40} height={28} className="w-full h-full object-cover" unoptimized />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-display text-[14px] font-medium text-white/75 block">{region.name}</span>
                    <span className="font-mono text-[10px] text-white/25">{region.countrySlugs.length} {mvSv ? "länder" : "countries"} · {region.totalVenues}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white/15" />
                </button>
              ))}
            </div>
          </motion.div>

        ) : (
          /* ── Country List ── */
          <motion.div
            key="m-countries"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-white/40 mb-4 active:text-tiffany transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.1em]">
                {subRegions.length > 1 ? selectedRegionData?.name || (mvSv ? 'Tillbaka' : 'Back') : (mvSv ? 'Alla regioner' : 'All Regions')}
              </span>
            </button>

            {selectedRegionData && (
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-medium text-white">{selectedRegionData.name}</h3>
                  <span className="font-mono text-[10px] text-tiffany/50">
                    {selectedRegionData.countrySlugs.length} {mvSv ? "länder" : "countries"} · {selectedRegionData.totalVenues}
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-tiffany animate-pulse" />
              </div>
            )}

            <div className="flex flex-col gap-1.5 max-h-[55vh] overflow-y-auto overscroll-contain" data-lenis-prevent>
              {regionCountries.map(country => (
                <Link href={`/${mvLocale}/land/${country.slug}`} key={country.slug}>
                  <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-transparent active:bg-tiffany/[0.08] active:border-tiffany/15 transition-all">
                    <div className="w-10 h-7 rounded-sm overflow-hidden border border-white/10 shrink-0">
                      <Image src={`https://flagcdn.com/w80/${country.code}.png`} alt={country.name} width={80} height={56} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-display text-[14px] font-medium text-white/80 block truncate">{mvSv ? (country.nameSv || country.name) : country.name}</span>
                      <span className="font-mono text-[10px] text-white/30">{country.venues}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white/15" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   REGION EXPLORER — Two-level: Continents → Sub-regions
   ══════════════════════════════════════════════════════════════ */
function RegionExplorer({ activeRegions, onSelectRegion, onHoverRegion }: {
  activeRegions: Region[];
  onSelectRegion: (slug: string) => void;
  onHoverRegion: (slug: string | null) => void;
}) {
  const svLocale = useLocale() === 'sv';
  const [drillContinent, setDrillContinent] = useState<string | null>(null);

  const selectedGroup = CONTINENT_GROUPS.find(c => c.id === drillContinent);
  const subRegions = selectedGroup
    ? selectedGroup.regionSlugs.map(s => activeRegions.find(r => r.slug === s)).filter(Boolean) as Region[]
    : [];

  const handleContinentClick = (group: typeof CONTINENT_GROUPS[0]) => {
    if (group.regionSlugs.length === 1) {
      // Single region → skip to country list
      onSelectRegion(group.regionSlugs[0]);
    } else {
      setDrillContinent(group.id);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!drillContinent ? (
        /* ── Level 1: Continent buttons ── */
        <motion.div
          key="continents"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="px-1 pb-3 border-b border-white/[0.08] mb-4">
            <h3 className="font-display text-[20px] font-semibold text-white/90 mb-1">{svLocale ? "Utforska per region" : "Explore by Region"}</h3>
            <p className="text-[13px] text-white/30 leading-snug">{svLocale ? "Välj en kontinent och upptäck lokaler världen över" : "Select a continent to discover venues worldwide"}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {CONTINENT_GROUPS.map((group, i) => {
              const regions = group.regionSlugs.map(s => activeRegions.find(r => r.slug === s)).filter(Boolean) as Region[];
              const totalCountries = regions.reduce((s, r) => s + r.countrySlugs.length, 0);
              const totalVenues = regions.reduce((s, r) => s + parseInt(r.totalVenues.replace(/[^\d]/g, '') || '0'), 0);
              const flags = regions.flatMap(r => r.previewFlags).slice(0, 4);

              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  onClick={() => handleContinentClick(group)}
                  onMouseEnter={() => { if (regions[0]) onHoverRegion(regions[0].slug); }}
                  onMouseLeave={() => onHoverRegion(null)}
                  className="group flex items-center gap-3.5 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
                >
                  {(() => { const Icon = CONTINENT_ICONS[group.id] || Globe2; return (
                    <div className="w-9 h-9 rounded-lg bg-tiffany/[0.08] border border-tiffany/[0.12] flex items-center justify-center shrink-0 group-hover:bg-tiffany/[0.14] group-hover:border-tiffany/[0.22] transition-all">
                      <Icon className="w-4 h-4 text-tiffany/70 group-hover:text-tiffany transition-colors" />
                    </div>
                  ); })()}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display text-[15px] font-medium text-white/75 group-hover:text-white transition-colors">
                        {svLocale ? group.labelSv : group.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1 shrink-0">
                        {flags.map(code => (
                          <div key={code} className="w-6 h-[16px] rounded-[2px] overflow-hidden border border-white/[0.08]">
                            <Image src={`https://flagcdn.com/w40/${code}.png`} alt="" width={40} height={28} className="w-full h-full object-cover" unoptimized />
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-white/25">{totalCountries} {svLocale ? "länder" : "countries"}</span>
                      <span className="font-mono text-[10px] text-tiffany/40">{totalVenues.toLocaleString(svLocale ? "sv-SE" : "en-US")}+</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        /* ── Level 2: Sub-regions within continent ── */
        <motion.div
          key="sub-regions"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
            <button
              onClick={() => { setDrillContinent(null); onHoverRegion(null); }}
              className="flex items-center gap-1.5 text-white/40 hover:text-tiffany transition-colors group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-mono text-[11px] uppercase tracking-[0.1em]">All Regions</span>
            </button>
            <div className="flex items-center gap-2">
              {(() => { const Icon = CONTINENT_ICONS[selectedGroup?.id || ''] || Globe2; return (
                <div className="w-7 h-7 rounded-md bg-tiffany/[0.08] border border-tiffany/[0.12] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-tiffany/70" />
                </div>
              ); })()}
              <span className="font-display text-[14px] font-medium text-white/90">{svLocale ? selectedGroup?.labelSv : selectedGroup?.label}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {subRegions.map(region => (
              <div
                key={region.slug}
                onClick={() => onSelectRegion(region.slug)}
                onMouseEnter={() => onHoverRegion(region.slug)}
                onMouseLeave={() => onHoverRegion(null)}
                className="group flex items-center gap-3.5 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
              >
                <div className="flex gap-1 shrink-0">
                  {region.previewFlags.slice(0, 3).map(code => (
                    <div key={code} className="w-8 h-5.5 rounded-[3px] overflow-hidden border border-white/10">
                      <Image src={`https://flagcdn.com/w40/${code}.png`} alt="" width={40} height={28} className="w-full h-full object-cover" unoptimized />
                    </div>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-display text-[15px] font-medium block text-white/70 group-hover:text-white transition-colors">{region.name}</span>
                  <span className="font-mono text-[10px] text-white/25">{region.countrySlugs.length} countries · {region.totalVenues}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
