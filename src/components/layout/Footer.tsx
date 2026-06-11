"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import { Instagram, Linkedin, Facebook, Globe, ArrowRight, Mail, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { REGIONS } from "@/data/regions";
import { COUNTRIES } from "@/data/countries";

const FOOTER_LINKS = {
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { label: "VIP", href: "/vip" },
      { label: "Webshop", href: "/shop" },
      { label: "AI Assistant", href: "/ai-assistant" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Help center", href: "/help" },
      { label: "Security & Privacy", href: "/security" },
    ],
  },
};

const FOOTER_LINKS_SV: typeof FOOTER_LINKS = {
  company: {
    title: "Företaget",
    links: [
      { label: "Om oss", href: "/about" },
      { label: "Ledning", href: "/leadership" },
      { label: "Karriär", href: "/careers" },
    ],
  },
  services: {
    title: "Tjänster",
    links: [
      { label: "VIP", href: "/vip" },
      { label: "Webshop", href: "/shop" },
      { label: "AI-assistent", href: "/ai-assistant" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Hjälpcenter", href: "/help" },
      { label: "Säkerhet & integritet", href: "/security" },
    ],
  },
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
];

// Curated inspiration images for the newsletter visual strip
const INSPO_IMAGES = [
  "/Images/hotel-lobby.webp",
  "/Images/decorated-hall-wedding-is-ready-celebration.webp",
  "/Images/palace-culture-iasi-romania.webp",
  "/Images/illuminated-footbridge-amidst-cherry-trees-night.webp",
];

// Group regions into macro-groups for display
const MACRO_REGIONS = [
  {
    label: "Europe",
    regionSlugs: ["nordics", "nordic-extended", "western-europe", "central-europe", "central-europe-extended", "southern-europe", "balkans-southeast", "balkans-extended"],
  },
  {
    label: "Middle East",
    regionSlugs: ["middle-east"],
  },
  {
    label: "Africa",
    regionSlugs: ["africa"],
  },
  {
    label: "Asia Pacific",
    regionSlugs: ["asia-pacific"],
  },
  {
    label: "North America",
    regionSlugs: ["north-america"],
  },
  {
    label: "South America",
    regionSlugs: ["south-america"],
  },
];

interface FooterCMS {
  brandDesc?: string;
  socialLabel?: string;
  newsletterDesc?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
}

function RegionAccordion({ label, regionSlugs }: { label: string; regionSlugs: string[] }) {
  const [open, setOpen] = useState(false);

  // Collect all unique country slugs for these regions
  const regions = regionSlugs
    .map(slug => REGIONS.find(r => r.slug === slug))
    .filter(Boolean) as typeof REGIONS;

  const allCountrySlugs = [...new Set(regions.flatMap(r => r.countrySlugs))];

  // Resolve to full country objects
  const countries = allCountrySlugs
    .map(slug => COUNTRIES.find(c => c.slug === slug))
    .filter(Boolean)
    .sort((a, b) => a!.name.localeCompare(b!.name));

  const totalVenues = regions.reduce((sum, r) => {
    const num = parseInt(r.totalVenues.replace(/[^\d]/g, "")) || 0;
    return sum + num;
  }, 0);

  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Globe className="w-3.5 h-3.5 text-tiffany/60" />
          <span className="text-[13px] text-white/60 group-hover:text-white/80 transition-colors font-medium">
            {label}
          </span>
          <span className="text-[10px] font-mono text-white/20 tracking-wide">
            {countries.length} countries · {totalVenues.toLocaleString()}+ venues
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-white/25 group-hover:text-white/40 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-6.5 flex flex-wrap gap-x-1 gap-y-0.5">
              {countries.map((country, i) => (
                <span key={country!.slug} className="inline">
                  <Link
                    href={`/land/${country!.slug}`}
                    className="text-[11px] text-white/30 hover:text-tiffany transition-colors duration-200"
                  >
                    {country!.name}
                  </Link>
                  {i < countries.length - 1 && (
                    <span className="text-[11px] text-white/10 mx-0.5">·</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer({ cms }: { cms?: FooterCMS }) {
  const t = useTranslations('footer');
  const tVpp = useTranslations('vpp');
  const footerLinks = useLocale() === 'sv' ? FOOTER_LINKS_SV : FOOTER_LINKS;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {} finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="relative w-full bg-[#0A0A0A] border-t border-white/[0.06]">

      {/* Newsletter Section */}
      <div className="px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto">

          {/* Inspiration image strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 rounded-2xl overflow-hidden">
            {INSPO_IMAGES.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={src}
                  alt="Event inspiration"
                  fill
                  className="object-cover grayscale brightness-[0.5] hover:grayscale-0 hover:brightness-[0.7] transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="text-center max-w-lg mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="relative h-40 w-40 opacity-90">
                <Image 
                  src="/Images/logos/ep-icon-chrome.png" 
                  alt="EventPartner Symbol" 
                  fill 
                  className="object-contain object-center" 
                />
              </div>
            </div>
            <p className="text-sm text-white/40 mb-6 leading-relaxed">
              {cms?.newsletterDesc || "Sign up for our free newsletter — and get access to exclusive offers and discounts."}
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-tiffany/10 border border-tiffany/20"
              >
                <span className="text-tiffany text-sm font-medium">✓ {t('newsletter.success')}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.placeholder')}
                    required
                    className="w-full py-3 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-tiffany/40 focus:ring-1 focus:ring-tiffany/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-tiffany transition-all duration-300 shrink-0"
                >
                  {t('newsletter.button')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 md:mx-10 border-t border-white/[0.06]" />

      {/* Main Footer Links */}
      <div className="px-6 md:px-10 pt-12 md:pt-16 pb-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-3">
              <Link href="/" className="inline-block mb-2 group">
                <div className="relative h-24 w-24 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <Image 
                    src="/Images/logos/ep-icon-chrome.png" 
                    alt="EventPartner" 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </Link>
              <p className="text-[13px] text-white/35 leading-relaxed max-w-xs mb-6">
                {cms?.brandDesc || t('tagline')}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/25 mr-1">{cms?.socialLabel || "Follow us:"}</span>
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-tiffany hover:border-tiffany/30 hover:bg-tiffany/5 hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.values(footerLinks).map((section) => (
              <div key={section.title} className="md:col-span-2 md:first:col-start-5">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany mb-5">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/40 hover:text-tiffany transition-colors duration-300 inline-flex items-center gap-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Compliance — security/GDPR badges the client wants to show */}
            <div className="md:col-span-2">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany mb-5">
                Compliance
              </h4>
              <ul className="space-y-3">
                {[
                  tVpp('securityTicker.gdpr.title'),
                  tVpp('securityTicker.iso.title'),
                  tVpp('securityTicker.soc.title'),
                  tVpp('securityTicker.enterprise.title'),
                ].map((title) => (
                  <li key={title} className="flex items-center gap-2 text-[13px] text-white/40">
                    <svg className="w-3.5 h-3.5 text-tiffany/70 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {title}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Global Presence — Regions & Countries */}
      <div className="mx-6 md:mx-10 border-t border-white/[0.06]" />
      <div className="px-6 md:px-10 py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 mb-5">
            <MapPin className="w-3.5 h-3.5 text-tiffany/50" />
            <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany">
              Global Presence
            </h4>
            <span className="font-mono text-[10px] text-white/15 tracking-wide">
              — 340,000+ venues across 175 countries
            </span>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {MACRO_REGIONS.map((macro) => (
              <RegionAccordion
                key={macro.label}
                label={macro.label}
                regionSlugs={macro.regionSlugs}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mx-6 md:mx-10 mb-8">
        <div className="max-w-[1200px] mx-auto">
          <a
            href="/#request"
            className="group flex items-center justify-between p-5 md:p-6 rounded-2xl bg-gradient-to-r from-tiffany/10 to-[#6B3FA0]/10 border border-white/[0.06] hover:border-tiffany/20 transition-all duration-300"
          >
            <div>
              <p className="text-white text-sm md:text-base font-medium mb-1">{cms?.ctaTitle || "Send your inquiry today"}</p>
              <p className="text-white/35 text-xs md:text-sm">{cms?.ctaDesc || "Always a response within 24h with at least 3 proposals matching your needs."}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-tiffany group-hover:border-tiffany group-hover:text-black text-white/40 transition-all duration-300 shrink-0 ml-4">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-5 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Legal links */}
            <div className="flex gap-6">
              <Link href="/security" className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20 hover:text-white/40 transition-colors">{t('bottomLinks.privacy')}</Link>
              <Link href="/security" className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20 hover:text-white/40 transition-colors">{t('bottomLinks.terms')}</Link>
              <Link href="/security" className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20 hover:text-white/40 transition-colors">{t('bottomLinks.cookies')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

