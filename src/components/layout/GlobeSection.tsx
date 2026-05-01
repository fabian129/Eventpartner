"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";

const MARKERS: { location: [number, number]; size: number; id?: string }[] = [
  // Labeled cities
  { location: [59.33, 18.07], size: 0.06, id: "stockholm" },
  { location: [51.51, -0.13], size: 0.06, id: "london" },
  { location: [48.86, 2.35], size: 0.06, id: "paris" },
  { location: [25.20, 55.27], size: 0.06, id: "dubai" },
  { location: [35.68, 139.69], size: 0.06, id: "tokyo" },
  { location: [40.71, -74.01], size: 0.06, id: "newyork" },
  { location: [-33.87, 151.21], size: 0.06, id: "sydney" },
  { location: [1.35, 103.82], size: 0.06, id: "singapore" },
  // Unlabeled venue markers — spread globally
  { location: [59.91, 10.75], size: 0.015 }, { location: [55.68, 12.57], size: 0.015 },
  { location: [60.17, 24.94], size: 0.015 }, { location: [63.43, 10.39], size: 0.015 },
  { location: [52.52, 13.41], size: 0.015 }, { location: [52.37, 4.90], size: 0.015 },
  { location: [50.85, 4.35], size: 0.015 }, { location: [47.37, 8.54], size: 0.015 },
  { location: [48.21, 16.37], size: 0.015 }, { location: [46.95, 7.45], size: 0.015 },
  { location: [41.90, 12.50], size: 0.015 }, { location: [40.42, -3.70], size: 0.015 },
  { location: [38.72, -9.14], size: 0.015 }, { location: [37.98, 23.73], size: 0.015 },
  { location: [41.01, 28.98], size: 0.015 }, { location: [45.44, 12.32], size: 0.015 },
  { location: [43.30, 5.37], size: 0.015 }, { location: [39.47, -0.38], size: 0.015 },
  { location: [50.08, 14.44], size: 0.015 }, { location: [47.50, 19.04], size: 0.015 },
  { location: [44.43, 26.10], size: 0.015 }, { location: [52.23, 21.01], size: 0.015 },
  { location: [45.81, 15.98], size: 0.015 },
  { location: [34.05, -118.24], size: 0.015 }, { location: [41.88, -87.63], size: 0.015 },
  { location: [25.76, -80.19], size: 0.015 }, { location: [49.28, -123.12], size: 0.015 },
  { location: [45.50, -73.57], size: 0.015 }, { location: [37.77, -122.42], size: 0.015 },
  { location: [33.45, -112.07], size: 0.015 }, { location: [29.76, -95.37], size: 0.015 },
  { location: [38.91, -77.04], size: 0.015 }, { location: [42.36, -71.06], size: 0.015 },
  { location: [-23.55, -46.64], size: 0.015 }, { location: [-34.60, -58.38], size: 0.015 },
  { location: [4.71, -74.07], size: 0.015 }, { location: [-12.05, -77.04], size: 0.015 },
  { location: [-33.45, -70.67], size: 0.015 }, { location: [-22.91, -43.17], size: 0.015 },
  { location: [37.57, 126.98], size: 0.015 }, { location: [31.23, 121.47], size: 0.015 },
  { location: [22.32, 114.17], size: 0.015 }, { location: [13.76, 100.52], size: 0.015 },
  { location: [28.61, 77.21], size: 0.015 }, { location: [39.90, 116.40], size: 0.015 },
  { location: [14.60, 120.98], size: 0.015 }, { location: [24.47, 54.37], size: 0.015 },
  { location: [26.23, 50.59], size: 0.015 }, { location: [32.07, 34.78], size: 0.015 },
  { location: [30.04, 31.24], size: 0.015 }, { location: [-33.92, 18.42], size: 0.015 },
  { location: [-1.29, 36.82], size: 0.015 }, { location: [6.52, 3.38], size: 0.015 },
  { location: [33.59, -7.62], size: 0.015 }, { location: [36.81, 10.18], size: 0.015 },
  { location: [-37.81, 144.96], size: 0.015 }, { location: [-36.85, 174.76], size: 0.015 },
];

const LABELS: { id: string; name: string; venues: string }[] = [
  { id: "stockholm", name: "STOCKHOLM", venues: "420+" },
  { id: "london", name: "LONDON", venues: "1,200+" },
  { id: "paris", name: "PARIS", venues: "890+" },
  { id: "dubai", name: "DUBAI", venues: "310+" },
  { id: "tokyo", name: "TOKYO", venues: "540+" },
  { id: "newyork", name: "NEW YORK", venues: "950+" },
  { id: "sydney", name: "SYDNEY", venues: "280+" },
  { id: "singapore", name: "SINGAPORE", venues: "190+" },
];

export function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0.3);
  const rotationOffsetRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = canvasRef.current.offsetWidth;
    let animFrame: number;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0.3,
      theta: 0.15,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 36000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.506, 0.847, 0.816],
      glowColor: [0.92, 0.92, 0.92],
      markers: MARKERS,
      opacity: 0.85,
    });

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.0008;
      }

      globe.update({
        phi: phiRef.current + rotationOffsetRef.current,
        width: width * 2,
        height: width * 2,
      });

      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 400);

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrame);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative w-full py-32 overflow-hidden bg-white">
      <div className="relative z-30 w-full max-w-4xl mx-auto px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/8 bg-white mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6AD8D2]" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black/40">
            Global Presence
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-[#111]"
        >
          360,000+ Venues
          <br />
          <span className="italic font-light text-[#6AD8D2]">in 36 Countries</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-black/50 text-[15px] max-w-lg mx-auto leading-relaxed"
        >
          Our global network ensures you always find the perfect spot, no matter where your next event takes place.
        </motion.p>
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <div className="relative globe-container" style={{ width: "min(650px, 90vw)", height: "min(650px, 90vw)" }}>
          {LABELS.map((label) => (
            <div
              key={label.id}
              className="cobe-label"
              style={{
                positionAnchor: `--cobe-${label.id}`,
                opacity: `var(--cobe-visible-${label.id}, 0)`,
              } as React.CSSProperties}
            >
              <div className="cobe-label-badge">
                {label.name}
              </div>
            </div>
          ))}

          <div
            className="absolute inset-0 z-15 pointer-events-none hidden md:flex items-center justify-center"
            style={{ perspective: "800px" }}
          >
            <svg
              viewBox="0 0 500 500"
              className="w-[102%] h-[102%] absolute"
              style={{
                transform: "rotateX(12deg)",
                animation: "orbit-spin 60s linear infinite",
              }}
            >
              <defs>
                <path
                  id="orbit-path"
                  d="M 250, 250 m -230, 0 a 230,230 0 1,1 460,0 a 230,230 0 1,1 -460,0"
                  fill="none"
                />
              </defs>
              <circle cx="250" cy="250" r="230" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border-default)]" opacity="0.4" />
              <text className="fill-[var(--text-dim)]" style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                <textPath href="#orbit-path" startOffset="0%">
                  EVENTPARTNER • 360,000+ VENUES • 36 COUNTRIES • EVENTPARTNER • 360,000+ VENUES • 36 COUNTRIES • EVENTPARTNER • 360,000+ VENUES • 36 COUNTRIES • EVENTPARTNER • 360,000+ VENUES •
                </textPath>
              </text>
            </svg>
          </div>

          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                rotationOffsetRef.current = delta / 200;
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                rotationOffsetRef.current = delta / 100;
              }
            }}
            className="w-full h-full opacity-0 transition-opacity duration-[1500ms] cursor-grab"
          />
        </div>
      </div>
      
      {/* Soft fade out at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none" style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }} />
    </section>
  );
}
