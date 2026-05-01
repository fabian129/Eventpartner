"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const DEFAULT_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Customize", href: "/#request" },
  { label: "Become VIP", href: "/vip" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

interface NavLink {
  label: string;
  href: string;
  disabled?: boolean;
}

interface NavCMS {
  links?: NavLink[];
  cta?: string;
}

export function Navbar({ cms }: { cms?: NavCMS }) {
  const NAV_LINKS = DEFAULT_LINKS;
  const ctaText = cms?.cta || "Book Event →";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 bg-white/95 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"}`}>
        {/* Bottom animated gradient line (only visible on scroll for a cleaner top look) */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple via-tiffany to-purple animate-gradient-x transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
        
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Left: Logo */}
          <div className="flex shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className={`relative h-10 w-40 hover:opacity-100 transition-all duration-500 ${scrolled ? "opacity-70" : "opacity-100"}`}>
                {/* When scrolled: black (brightness-0) + parent opacity for dark grey. 
                    When top: white (invert brightness-0) */}
                <Image 
                  src="/Images/logos/Primary logo EP.png" 
                  alt="EventPartner" 
                  fill 
                  className={`object-contain object-left scale-[1.7] origin-left transition-all duration-500 ${scrolled ? "brightness-0" : "invert brightness-0"}`} 
                  priority 
                />
              </div>
            </Link>
          </div>

          {/* Right: Links & CTA */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative text-[13px] px-4 py-2 transition-all duration-300 font-medium group ${scrolled ? "text-[#555]" : "text-white/80"}`}
                >
                  <span className={`relative z-10 transition-all duration-300 ${scrolled ? "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple group-hover:to-tiffany" : "group-hover:text-white"}`}>
                    {link.label}
                  </span>
                  {/* Subtle underline that expands from center */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple to-tiffany transition-all duration-300 group-hover:w-[40%] rounded-full opacity-0 group-hover:opacity-100" />
                </a>
              ))}
            </nav>

            <a
              href="#request"
              className="relative text-[12px] font-medium text-white rounded-full px-5 py-2 transition-all duration-300 hover:scale-105 overflow-hidden group shadow-[0_2px_10px_rgba(120,81,169,0.2)] hover:shadow-[0_0_20px_rgba(106,216,210,0.6)] bg-gradient-to-r from-purple via-tiffany to-purple animate-gradient-x hover:brightness-110"
            >
              <span className="relative z-10">{ctaText}</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center shrink-0 ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 hover:bg-black/5 rounded-full transition-colors ${scrolled ? "text-[#111]" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="font-display text-2xl text-[var(--text-secondary)] hover:text-tiffany transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#request"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-4 text-[13px] font-medium text-white bg-[#111] rounded-full px-6 py-3"
            >
              {ctaText}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
