"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const DEFAULT_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Customize", href: "#request", disabled: true },
  { label: "Become VIP", href: "#", disabled: true },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
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
  const NAV_LINKS = cms?.links?.length ? cms.links : DEFAULT_LINKS;
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Left: Logo + Links */}
          <div className={`hidden md:flex items-center gap-0 rounded-full transition-all duration-500 ${scrolled ? "bg-[var(--bg-primary)]/90 backdrop-blur-xl border border-[var(--border-default)] shadow-lg shadow-black/[0.03]" : "bg-transparent border border-transparent"}`}>
            <Link href="/" className="px-4 py-2.5 flex items-center gap-2">
              <span className="font-display text-[14px] font-semibold tracking-[0.05em] text-[var(--text-primary)]">
                EVENTPARTNER
              </span>
              <span className="text-[#6AD8D2] text-[10px]">◆</span>
            </Link>

            <div className="w-px h-5 bg-[var(--border-default)]" />

            <nav className="flex items-center gap-1 px-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.disabled ? undefined : link.href}
                  onClick={link.disabled ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                  className={`text-[13px] px-3 py-2 rounded-full transition-all duration-300 ${
                    link.disabled
                      ? "text-[var(--text-dim)] cursor-not-allowed opacity-50"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile logo */}
          <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-[14px] font-semibold tracking-[0.05em] text-[var(--text-primary)]">
                EVENTPARTNER
              </span>
              <span className="text-[#6AD8D2] text-[10px]">◆</span>
            </Link>
          </div>

          {/* Right: CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#request"
              className="relative text-[13px] font-medium text-white bg-[#111] rounded-full px-5 py-2.5 transition-all duration-300 hover:bg-[#222] hover:shadow-lg hover:shadow-black/10 overflow-hidden group"
            >
              <span className="relative z-10">{ctaText}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#6AD8D2] to-[#5EC4BA] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>

          {/* Mobile: hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--text-secondary)] p-2"
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
                className="font-display text-2xl text-[var(--text-secondary)] hover:text-[#6AD8D2] transition-colors"
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
