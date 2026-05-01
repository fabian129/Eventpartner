"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "@/lib/animation";

interface HeroCMS {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  subheadline?: string;
  cta1?: string;
  cta2?: string;
}

const IMAGES = [
  "/Images/conference-evening.webp",
  "/Images/elegant-wedding-reception-room-with-sea-view-through-windows.webp",
  "/Images/group-people-restaurant.webp",
];

export function Hero({ cms }: { cms?: HeroCMS }) {
  const [currentImage, setCurrentImage] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

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
  }, []);

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
              className="object-cover brightness-[0.55] contrast-[1.15] saturate-[0.85]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Vignette + gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111] to-transparent" />
      </div>

      {/* Typography — GSAP staggered word reveal (outer wrapper for GSAP, no Framer here) */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col justify-center">
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
      </div>
      
    </section>
  );
}
