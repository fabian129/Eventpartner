"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Star, Heart, Lock } from "lucide-react";

/**
 * WebshopTeaser — Locked product preview
 *
 * Shows a curated grid of event-related products, then overlays
 * a glassmorphic "coming soon" CTA when the user scrolls in.
 * Creates FOMO — you can SEE the products but can't buy yet.
 */

const PRODUCTS = [
  {
    name: "Premium Namnbrickor",
    category: "Identifiering",
    price: "89 kr",
    priceNote: "/ 10-pack",
    image: "/Images/products/floating-minimalist-white-credit-card-on-black-4k.jpg",
    badge: "Bästsäljare",
    rating: 4.9,
    reviews: 127,
  },
  {
    name: "Konferens Welcome Kit",
    category: "Kit & Paket",
    price: "349 kr",
    priceNote: "/ st",
    image: "/Images/products/glossy-black-minimalist-ring-on-dark-backdrop-4k.webp",
    badge: null,
    rating: 4.8,
    reviews: 84,
  },
  {
    name: "Branded Vattenflaskor",
    category: "Merchandise",
    price: "129 kr",
    priceNote: "/ st",
    image: "/Images/products/minimal-floating-ui-glass-panel-mockup-4k.webp",
    badge: "Nyhet",
    rating: 4.7,
    reviews: 53,
  },
  {
    name: "Event Dekor Baspaket",
    category: "Dekor",
    price: "1 490 kr",
    priceNote: "/ paket",
    image: "/Images/products/minimalist-black-credit-card-on-dark-background-4k.jpg",
    badge: null,
    rating: 4.9,
    reviews: 215,
  },
  {
    name: "Programfoldrar – Premium",
    category: "Print",
    price: "59 kr",
    priceNote: "/ 25-pack",
    image: "/Images/products/minimalist-digital-wallet-mockup-4k.webp",
    badge: null,
    rating: 4.6,
    reviews: 68,
  },
  {
    name: "Tygkassar med Eget Tryck",
    category: "Merchandise",
    price: "79 kr",
    priceNote: "/ st (min 50)",
    image: "/Images/products/stacked-transparent-glass-panels-on-black-4k.jpg",
    badge: "Populär",
    rating: 4.8,
    reviews: 143,
  },
];

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-black/[0.05] overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-[#F8F8FA]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-semibold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full backdrop-blur-md border ${
              product.badge === "Bästsäljare"
                ? "bg-[#6AD8D2]/90 text-white border-[#6AD8D2]"
                : product.badge === "Nyhet"
                ? "bg-[#6B3FA0]/90 text-white border-[#6B3FA0]"
                : "bg-white/90 text-[#111] border-black/10"
            }`}>
              {product.badge}
            </span>
          </div>
        )}
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-black/[0.06] flex items-center justify-center shadow-sm">
          <Heart className="w-4 h-4 text-[#999]" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6AD8D2] mb-1 block">
          {product.category}
        </span>
        <h4 className="font-display text-[15px] font-medium text-[#111] tracking-tight mb-2">
          {product.name}
        </h4>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-[#999]">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-lg font-semibold text-[#111]">{product.price}</span>
          <span className="text-[11px] text-[#999]">{product.priceNote}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function WebshopTeaser() {
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      {/* Dot grid — right edge, behind cards */}
      <div className="absolute top-[10%] right-0 w-[30%] h-[80%] dot-grid dot-grid-fade-from-right pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
            <ShoppingBag className="w-3 h-3 text-[#6AD8D2]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Webbshop</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05] mx-auto">
            Allt för ert event.
            <br />
            <span className="italic font-light text-[var(--text-muted)]">Beställ online.</span>
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            Namnbrickor, konferenskit, dekor och branded merchandise — allt kurerat för professionella event.
          </p>
        </motion.div>

        {/* Product grid with overlay trigger */}
        <div className="relative">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.name} product={product} index={i} />
            ))}
          </div>

          {/* Glassmorphic lock overlay — appears after browsing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 2 }}
            onAnimationComplete={() => setOverlayVisible(true)}
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{ pointerEvents: overlayVisible ? "auto" : "none" }}
          >
            {/* Frost gradient — stronger at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/50 rounded-2xl" />

            {/* CTA card — premium glassmorphic with brand color */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.3 }}
              className="relative z-10 text-center max-w-lg px-10 py-12 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#6AD8D2]/20 shadow-[0_8px_60px_rgba(129,216,208,0.12)]"
            >
              {/* Animated glow ring around lock */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6AD8D2] to-[#6BC5BD] animate-pulse opacity-20" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#6AD8D2] to-[#6BC5BD] flex items-center justify-center shadow-[0_4px_20px_rgba(129,216,208,0.3)]">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-medium text-[#111] tracking-tight mb-3">
                Kommer snart.
              </h3>
              <p className="text-[15px] text-[#666] leading-relaxed mb-8 max-w-sm mx-auto">
                Vår webbshop för eventprodukter lanseras inom kort.<br />
                Kontakta oss så fixar vi din beställning redan idag.
              </p>

              <a
                href="#request"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#6AD8D2] text-white text-sm font-semibold hover:bg-[#6BC5BD] hover:shadow-[0_4px_24px_rgba(129,216,208,0.3)] transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                Kontakta oss
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="mt-5 text-[11px] text-[#bbb] tracking-[0.2em]">
                EVENTPARTNER
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
