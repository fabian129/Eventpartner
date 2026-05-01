"use client";

import Link from "next/link";
import { Instagram, Linkedin, Facebook, Globe, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

interface FooterCMS {
  brandDesc?: string;
  socialLabel?: string;
  newsletterDesc?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
}

export function Footer({ cms }: { cms?: FooterCMS }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full bg-[#0A0A0A] border-t border-white/[0.06]">

      {/* Newsletter Section */}
      <div className="px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto">

          {/* Inspiration image strip */}
          <div className="grid grid-cols-4 gap-2 mb-10 rounded-2xl overflow-hidden">
            {INSPO_IMAGES.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={src}
                  alt="Event inspiration"
                  fill
                  className="object-cover grayscale brightness-[0.5] hover:grayscale-0 hover:brightness-[0.7] transition-all duration-700"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="text-center max-w-lg mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="relative h-24 w-24 opacity-90">
                <Image 
                  src="/Images/logos/EVENT PARTNER 3.png" 
                  alt="EventPartner Symbol" 
                  fill 
                  className="object-contain object-center invert brightness-0" 
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
                <span className="text-tiffany text-sm font-medium">✓ Thank you! You're registered.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full py-3 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-tiffany/40 focus:ring-1 focus:ring-tiffany/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-tiffany transition-all duration-300 shrink-0"
                >
                  Sign Up
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
              <Link href="/" className="inline-block mb-4 group">
                <div className="relative h-8 w-32 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <Image 
                    src="/Images/logos/Primary logo EP.png" 
                    alt="EventPartner" 
                    fill 
                    className="object-contain object-left scale-[1.7] origin-left invert brightness-0" 
                  />
                </div>
              </Link>
              <p className="text-[13px] text-white/35 leading-relaxed max-w-xs mb-6">
                {cms?.brandDesc || "Your complete partner for corporate events across Europe. 360,000+ venues, one platform."}
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
            {Object.values(FOOTER_LINKS).map((section) => (
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

          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mx-6 md:mx-10 mb-8">
        <div className="max-w-[1200px] mx-auto">
          <a
            href="#request"
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
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20">
            © 2026 EventPartner AB. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20 hover:text-white/40 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20 hover:text-white/40 transition-colors">Terms</Link>
            <Link href="/security" className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/20 hover:text-white/40 transition-colors">GDPR</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
