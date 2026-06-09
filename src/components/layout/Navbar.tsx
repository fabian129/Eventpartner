"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSmoothScroll } from "@/components/utils/SmoothScroll";

/* ── Service submenu items ── */
const SERVICE_ITEMS = [
  { label: "Conferences", href: "/#services", desc: "Large-scale events & summits" },
  { label: "Corporate Events", href: "/#services", desc: "Team building & company gatherings" },
  { label: "Gala Dinners", href: "/#services", desc: "Premium dining experiences" },
  { label: "Incentive Travel", href: "/#services", desc: "Reward & motivation trips" },
  { label: "Exhibitions", href: "/#services", desc: "Trade shows & product launches" },
];

interface NavLink {
  label: string;
  href: string;
  disabled?: boolean;
  hasDropdown?: boolean;
}

interface NavCMS {
  links?: NavLink[];
  cta?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "VIP", href: "/vip" },
  { label: "Customize", href: "/customize" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

export function Navbar({ cms }: { cms?: NavCMS }) {
  const NAV_LINKS = DEFAULT_LINKS;
  const ctaText = cms?.cta || "Book Event →";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true); // start dark (hero)
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useSmoothScroll();

  // "Book Event" → the homepage request form. Smooth-scroll if it's on the
  // current page (Lenis-aware), otherwise let href="/#request" navigate home.
  const scrollToRequest = useCallback((e: React.MouseEvent) => {
    const el = document.getElementById("request");
    if (el) {
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -16 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  }, [lenis]);

  const switchLocale = useCallback(() => {
    const next = locale === "en" ? "sv" : "en";
    router.replace(pathname, { locale: next });
  }, [locale, router, pathname]);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Background context detection ── */
  /* Detect if the navbar is over a dark or light section */
  useEffect(() => {
    const checkBg = () => {
      // page-root bg is the single source of truth —
      // DarkZone & HeroLightUpZone set it via inline style
      const root = document.getElementById("page-root");
      if (!root) return;

      const bg = root.style.backgroundColor || getComputedStyle(root).backgroundColor;
      const match = bg.match(/\d+/g);
      if (match) {
        const [r, g, b] = match.map(Number);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        setIsDarkBg(luminance < 0.45);
      }
    };

    // Check on scroll
    const throttled = () => requestAnimationFrame(checkBg);
    window.addEventListener("scroll", throttled, { passive: true });
    checkBg(); // initial check
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  /* ── Dropdown hover logic with delay ── */
  const openDropdown = useCallback(() => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  }, []);

  /* ── Computed styles based on context ── */
  const pillBg = isDarkBg
    ? scrolled
      ? "bg-white/[0.07] backdrop-blur-2xl border-white/[0.09] shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
      : "bg-white/[0.04] backdrop-blur-xl border-white/[0.06]"
    : scrolled
      ? "bg-white/80 backdrop-blur-2xl border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
      : "bg-white/60 backdrop-blur-xl border-black/[0.05] shadow-[0_1px_12px_rgba(0,0,0,0.03)]";

  const textColor = isDarkBg ? "text-white/70" : "text-[#555]";
  const textHover = isDarkBg ? "hover:text-white hover:bg-white/[0.08]" : "hover:text-[#111] hover:bg-black/[0.05]";
  const dividerColor = isDarkBg ? "bg-white/[0.12]" : "bg-black/[0.10]";
  const logoFilter = isDarkBg ? "invert brightness-0" : "brightness-0";

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-6 md:px-10">

          {/* ════════════════════════════════════════════ */}
          {/* LEFT: Logo + Nav Links inside pill container */}
          {/* ════════════════════════════════════════════ */}
          <div
            className={`hidden md:flex items-center gap-0 rounded-full transition-all duration-500 border ${pillBg}`}
          >
            {/* Logo */}
            <Link href="/" className="pl-2 pr-2 py-1.5 flex items-center gap-1 shrink-0">
              <div className="relative h-[75px] w-[75px]">
                <Image
                  src="/Images/logos/ep-icon-chrome.png"
                  alt="EventPartner"
                  fill
                  className="object-contain transition-all duration-500"
                  priority
                />
              </div>
              <span className={`text-[12px] font-semibold tracking-tight transition-colors duration-500 ${isDarkBg ? 'text-white/90' : 'text-[#111]'}`}>EventPartner</span>
            </Link>

            {/* Divider */}
            <div className={`w-px h-5 mx-1 transition-colors duration-500 ${dividerColor}`} />

            {/* Nav links */}
            <nav className="flex items-center gap-0.5 px-1.5 pr-2">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={link.hasDropdown ? openDropdown : undefined}
                  onMouseLeave={link.hasDropdown ? closeDropdown : undefined}
                >
                  <a
                    href={link.href}
                    className={`
                      relative text-[13px] font-medium px-3.5 py-2 rounded-full
                      transition-all duration-300 flex items-center gap-1.5
                      ${textColor} ${textHover}
                    `}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>

                  {/* Services dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`absolute top-full left-0 mt-3 w-[280px] rounded-2xl
                            backdrop-blur-2xl border shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-2 z-[60]
                            ${isDarkBg
                              ? "bg-[#1a1a1a]/90 border-white/[0.08]"
                              : "bg-white/90 border-black/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                            }`}
                          onMouseEnter={openDropdown}
                          onMouseLeave={closeDropdown}
                        >
                          {SERVICE_ITEMS.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              className={`flex flex-col px-3.5 py-2.5 rounded-xl
                                transition-all duration-200 group
                                ${isDarkBg
                                  ? "hover:bg-white/[0.06]"
                                  : "hover:bg-black/[0.03]"
                                }`}
                            >
                              <span className={`text-[13px] font-medium ${
                                isDarkBg ? "text-white/90 group-hover:text-white" : "text-[#222] group-hover:text-[#111]"
                              }`}>
                                {item.label}
                              </span>
                              <span className={`text-[11px] mt-0.5 ${
                                isDarkBg ? "text-white/40 group-hover:text-white/50" : "text-[#999] group-hover:text-[#666]"
                              }`}>
                                {item.desc}
                              </span>
                            </a>
                          ))}
                          {/* View all link */}
                          <div className={`mt-1 pt-2 border-t px-3.5 pb-1 ${
                            isDarkBg ? "border-white/[0.06]" : "border-black/[0.06]"
                          }`}>
                            <a
                              href="/#services"
                              className="text-[12px] font-medium text-tiffany hover:text-tiffany-light transition-colors"
                            >
                              View all services →
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile logo */}
          <div className="md:hidden shrink-0">
            <Link href="/" className="flex items-center gap-1">
              <div className="relative h-[75px] w-[75px]">
                <Image
                  src="/Images/logos/ep-icon-chrome.png"
                  alt="EventPartner"
                  fill
                  className="object-contain transition-all duration-500"
                  priority
                />
              </div>
              <span className={`text-[12px] font-semibold tracking-tight transition-colors duration-500 ${isDarkBg ? 'text-white/90' : 'text-[#111]'}`}>EventPartner</span>
            </Link>
          </div>

          {/* ════════════════════════════ */}
          {/* RIGHT: CTA button (desktop) */}
          {/* ════════════════════════════ */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={switchLocale}
              className={`
                flex items-center gap-1.5 text-[11px] font-medium rounded-full px-3 py-2
                transition-all duration-300
                ${isDarkBg
                  ? "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
                  : "text-[#888] hover:text-[#333] hover:bg-black/[0.04]"
                }
              `}
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === "en" ? "SV" : "EN"}
            </button>

            <a
              href="/#request"
              onClick={scrollToRequest}
              className={`
                relative text-[12.5px] font-semibold rounded-full px-5 py-2.5
                transition-all duration-500 overflow-hidden group
                hover:scale-[1.03]
                ${isDarkBg
                  ? "bg-white text-[#111] hover:shadow-[0_0_24px_rgba(106,216,210,0.25)]"
                  : "bg-[#111] text-white hover:shadow-[0_0_24px_rgba(0,0,0,0.15)]"
                }
              `}
            >
              <span className="relative z-10">{ctaText}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-tiffany/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center shrink-0 ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${
                isDarkBg ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-[#111]"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ═════════════════════ */}
      {/* Mobile overlay menu  */}
      {/* ═════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-1"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Logo in mobile menu */}
            <div className="absolute top-5 left-6 flex items-center gap-1">
              <div className="relative h-[75px] w-[75px]">
                <Image
                  src="/Images/logos/ep-icon-chrome.png"
                  alt="EventPartner"
                  fill
                  className="object-contain invert brightness-0"
                />
              </div>
              <span className="text-[11px] font-semibold tracking-tight text-white/90">EventPartner</span>
            </div>

            {/* Mobile nav links */}
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="font-display text-2xl text-white/60 hover:text-white transition-colors py-2"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Mobile service sub-items */}
            <div className="mt-2 mb-4 flex flex-wrap justify-center gap-2 px-8 max-w-sm">
              {SERVICE_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] text-white/30 px-3 py-1.5 rounded-full border border-white/[0.06]
                    hover:text-white/60 hover:border-white/[0.12] transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile CTA */}
            <motion.a
              href="/#request"
              onClick={(e) => { setIsOpen(false); scrollToRequest(e); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-2 text-[13px] font-semibold text-[#111] bg-white rounded-full px-7 py-3
                hover:shadow-[0_0_24px_rgba(106,216,210,0.3)] transition-all"
            >
              {ctaText}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
