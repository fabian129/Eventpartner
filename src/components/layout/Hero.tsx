"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HeroCMS {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  subheadline?: string;
  cta1?: string;
  cta2?: string;
}

const IMAGES = [
  "/Images/conference-evening.jpg",
  "/Images/elegant-wedding-reception-room-with-sea-view-through-windows.jpg",
  "/Images/group-people-restaurant.jpg",
];

export function Hero({ cms }: { cms?: HeroCMS }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Simple slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100vh] min-h-[700px] flex flex-col justify-center bg-black">
      
      {/* Background Slideshow - Covers 115vh to bleed down behind the video section */}
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
              // The Cinematic Grade: Moody, high contrast, slightly desaturated
              className="object-cover brightness-[0.55] contrast-[1.15] saturate-[0.85]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft radial vignette behind the text to ensure legibility without flat boxes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,transparent_60%)]" />
        
        {/* Top gradient strictly for Navbar legibility */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom gradient to blend into the next section smoothly */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111] to-transparent" />
      </div>

      {/* Typography Content - Perfectly Centered in 100vh */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-medium leading-[0.9] tracking-[-0.03em] text-white drop-shadow-xl max-w-4xl"
        >
          {cms?.headline || "The World's"}
          <br />
          {cms?.headline ? null : "Largest Selection "}
          <span className="italic font-light text-[#6AD8D2] block mt-2">
            {cms?.headlineAccent || "of Venues"}
          </span>
        </motion.h1>
      </div>
      
    </section>
  );
}
