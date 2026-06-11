"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { PrintfulProductCard, type PrintfulProductData } from "@/components/shop/PrintfulProductCard";

/**
 * WebshopTeaser — Live Printful B2B event merchandise preview on homepage
 *
 * Fetches products from the local Printful API and displays
 * them in a premium grid. Clicking them opens the designer directly.
 */

// Mirrors the same published Printful store products as /shop (?source=store
// with curated-catalog fallback server-side) — one source of truth.

interface WebshopCMS {
  label?: string; labelRight?: string;
  headline?: string; headlineAccent?: string;
  description?: string;
  comingSoonTitle?: string; comingSoonDesc?: string;
  ctaText?: string;
}

export function WebshopTeaser({ cms }: { cms?: WebshopCMS }) {
  const t = useTranslations('webshopTeaser');
  const [products, setProducts] = useState<PrintfulProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`/api/printful/products?source=store`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        setProducts(json.data || []);
      } catch (err) {
        console.error("Failed to fetch Printful products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section id="shop" className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      {/* Gray dot-grid — left edge */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: 0, bottom: 0, left: 0, right: 0,
          backgroundImage: "radial-gradient(circle, rgba(160,160,160,0.65) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: "radial-gradient(ellipse 25% 65% at 3% 50%, black 0%, rgba(0,0,0,0.3) 50%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 25% 65% at 3% 50%, black 0%, rgba(0,0,0,0.3) 50%, transparent 80%)",
        }}
      />
      {/* Gray dot-grid — right edge */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: 0, bottom: 0, left: 0, right: 0,
          backgroundImage: "radial-gradient(circle, rgba(160,160,160,0.65) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: "radial-gradient(ellipse 25% 65% at 97% 50%, black 0%, rgba(0,0,0,0.3) 50%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 25% 65% at 97% 50%, black 0%, rgba(0,0,0,0.3) 50%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.label || t('label')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.labelRight || t('labelRight')}
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">
            {cms?.headline || t('headline')}
            <br />
            <span className="italic font-light text-[var(--text-muted)]">{cms?.headlineAccent || t('headlineAccent')}</span>
          </h2>
          <p className="font-display text-[clamp(1rem,2vw,1.2rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-lg">
            {cms?.description || t('description')}
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="relative">
          {loading ? (
            /* Skeleton loaders */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-black/[0.05] overflow-hidden animate-pulse">
                  <div className="aspect-square bg-[#F0F0F2]" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#F0F0F2] rounded w-2/3" />
                    <div className="h-5 bg-[#F0F0F2] rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            /* Real Printful B2B products */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {products.slice(0, 6).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <PrintfulProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            /* Fallback — no products */
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-black/[0.05] p-16 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-tiffany/10 to-tiffany/5 border border-tiffany/20 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-tiffany" />
              </div>
              <h3 className="font-display text-2xl font-medium text-[#111] mb-3">
                {cms?.comingSoonTitle || t('comingSoonTitle')}
              </h3>
              <p className="text-[15px] text-[#666] leading-relaxed max-w-md mx-auto">
                {cms?.comingSoonDesc || t('comingSoonDesc')}
              </p>
            </div>
          )}
        </div>

        {/* Visit Shop CTA */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111] text-white text-sm font-semibold hover:bg-[#222] hover:shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              {cms?.ctaText || t('ctaText')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
