"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/utils/ThemeProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

export function VideoSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="about" className="relative w-full bg-[var(--bg-primary)] px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[1000px] mx-auto">
        {/* Intro text — blur entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="section-label mb-4">Om EventPartner</p>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
            Vi är er partner,
            <br />
            <span className="italic font-light text-[var(--text-muted)]">inte en förmedlare.</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Se hur vi hjälper de bästa företagen att hitta rätt venues och skapa minnesvärda event.
          </p>
        </motion.div>

        {/* Full-width video embed — scale + shadow entrance */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.93, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative w-full rounded-2xl overflow-hidden group cursor-pointer"
          style={{
            aspectRatio: "16 / 9",
            boxShadow: isDark
              ? "0 30px 80px -20px rgba(0,0,0,0.7)"
              : "0 30px 80px -20px rgba(0,0,0,0.12)",
          }}
        >
          {/* Thumbnail image */}
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920&auto=format&fit=crop"
            alt="EventPartner introduction video"
            fill
            className="object-cover grayscale brightness-[0.75] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700"
            sizes="100vw"
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Play button — centered */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              {/* Breathing pulse ring */}
              <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '2.5s' }} />
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#81D8D0]/25 group-hover:border-[#81D8D0]/40">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" fillOpacity={0.9} />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 z-10 flex justify-between items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1">
                EventPartner — Introduction
              </p>
              <p className="text-sm text-white/80 font-medium">
                Så fungerar det
              </p>
            </div>
            <p className="font-mono text-[11px] text-white/40">
              2:45
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
