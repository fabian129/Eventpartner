"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tv, Mail, Package, FolderOpen, ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── VPP Product Cards ─── */
interface VPPProduct {
  id: string;
  name: string;
  tagline: string;
  image: string;
  icon: React.ReactNode;
  screenSizes: string;
}

const VPP_PRODUCTS: VPPProduct[] = [
  {
    id: "brochure",
    name: "Video Brochure",
    tagline: "Print meets motion",
    image: "/Images/vpp/video-brochure.webp",
    icon: <Tv className="w-5 h-5" />,
    screenSizes: "4.3″ – 10″",
  },
  {
    id: "mailer",
    name: "Video Mailer",
    tagline: "Direct mail, redefined",
    image: "/Images/vpp/video-mailer.webp",
    icon: <Mail className="w-5 h-5" />,
    screenSizes: "2.4″ – 7″",
  },
  {
    id: "box",
    name: "Video Box",
    tagline: "Unboxing as experience",
    image: "/Images/vpp/video-box.webp",
    icon: <Package className="w-5 h-5" />,
    screenSizes: "5″ – 10″",
  },
  {
    id: "folder",
    name: "Video Folder",
    tagline: "Presentations that speak",
    image: "/Images/vpp/video-folder.webp",
    icon: <FolderOpen className="w-5 h-5" />,
    screenSizes: "5″ – 10″",
  },
];

/* ─── Individual VPP Card (matches ProductCard style) ─── */
function VPPProductCard({ product, index }: { product: VPPProduct; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE }}
    >
      <div className="group bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden hover:border-tiffany/20 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden">
          {!imgError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-tiffany/40 mb-3 group-hover:border-tiffany/15 transition-colors">
                {product.icon}
              </div>
              <span className="text-[11px] text-white/15 font-medium">{product.name}</span>
            </div>
          )}

          {/* Screen size badge */}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
            <span className="text-[9px] font-mono uppercase tracking-wider text-white/60">{product.screenSizes}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-display text-[15px] font-semibold text-[var(--text-primary)] leading-tight">{product.name}</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mt-1">{product.tagline}</p>

          {/* CTA — links to quote form */}
          <a
            href="#vpp-quote"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] text-[13px] font-medium rounded-xl py-3 hover:border-tiffany/30 hover:text-tiffany transition-all duration-300"
          >
            Request Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Trusted By Logo Strip ─── */
const TRUSTED_LOGOS = [
  "Google", "Microsoft", "BMW", "Disney", "Porsche",
  "YouTube", "Volkswagen", "Samsung", "Jaguar", "Shell",
  "Volvo", "Unilever", "PwC", "LEGO", "BBC",
];

function TrustedByStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      className="mt-10 pt-8 border-t border-[var(--border-default)]"
    >
      <div className="text-center mb-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
          Trusted by 500+ global brands
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-10 gap-y-3">
        {TRUSTED_LOGOS.map((name) => (
          <span
            key={name}
            className="text-[13px] md:text-[14px] font-semibold text-[var(--text-dim)] tracking-wide opacity-20 hover:opacity-50 transition-opacity duration-300 cursor-default select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Export: VPP Section ─── */
export function VPPShowcase() {
  return (
    <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
      {/* Section Header — same style as merchandise section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-center gap-4 mb-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">Video Plus Print</span>
        <div className="h-px flex-1 bg-[var(--border-default)]" />
      </motion.div>

      {/* Product Grid — same 4-column as merch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {VPP_PRODUCTS.map((product, i) => (
          <VPPProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* Trusted By Strip */}
      <TrustedByStrip />
    </section>
  );
}
