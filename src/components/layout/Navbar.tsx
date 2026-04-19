"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";

const NAV_LINKS = [
  { label: "Tjänster", href: "#services" },
  { label: "Skräddarsy ditt event", href: "/skraddarsy" },
  { label: "Om oss", href: "#about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
                  href={link.href}
                  className="text-[13px] text-[var(--text-secondary)] px-3 py-2 rounded-full transition-all duration-300 hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
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

          {/* Right: theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)]/80 backdrop-blur-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[#6AD8D2] hover:border-[#6AD8D2]/30 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#request"
              className="relative text-[13px] font-medium text-white bg-[#111] rounded-full px-5 py-2.5 transition-all duration-300 hover:bg-[#222] hover:shadow-lg hover:shadow-black/10 overflow-hidden group"
            >
              <span className="relative z-10">Boka Event →</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#6AD8D2] to-[#5EC4BA] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-muted)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
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
              Boka Event →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
