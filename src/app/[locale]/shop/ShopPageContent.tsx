"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PrintfulProductCard, type PrintfulProductData } from "@/components/shop/PrintfulProductCard";
import { usePrintfulCart } from "@/context/PrintfulCartContext";
import { VPPShowcase } from "@/components/shop/VPPShowcase";
import { LogoTicker } from "@/components/layout/LogoTicker";
import { ShoppingBag, ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Shop catalog is driven by EventPartner's published Printful store products
// (?source=store): Malin publishes a product in Printful → it appears here, no
// code change. Falls back to a curated catalog server-side if none are
// published yet, so the grid is never empty.

interface ShopCMS {
  heroLabel?: string; heroLabelRight?: string;
  headline?: string; headlineAccent?: string; description?: string;
  merchLabel?: string;
  comingSoonTitle?: string; comingSoonDesc?: string;
  quoteTitle?: string; quoteButton?: string;
  vppHeadline?: string; vppHeadlineAccent?: string; vppDescription?: string;
  successTitle?: string; successDescription?: string;
  ctaHeadline?: string; ctaDescription?: string;
  infoCard1Title?: string; infoCard1Label?: string;
  infoCard2Title?: string; infoCard2Label?: string;
  infoCard3Title?: string; infoCard3Label?: string;
}

export function ShopPageContent({ cms }: { cms?: ShopCMS }) {
  const t = useTranslations('shop');
  const tVpp = useTranslations('vpp');

  const [products, setProducts] = useState<PrintfulProductData[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);
  const { totalQuantity, openCart } = usePrintfulCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        const res = await fetch(`/api/printful/products?source=store`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        setProducts(json.data || []);
        setProductError(null);
      } catch (err: unknown) {
        console.error("Failed to fetch Printful products:", err);
        setProductError("Unable to load products. Please try again later.");
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);



  const headline = cms?.headline || t('headline');
  const headlineAccent = cms?.headlineAccent || t('headlineAccent');
  const description = cms?.description || t('description');
  const heroLabel = cms?.heroLabel || t('heroLabel');
  const heroLabelRight = cms?.heroLabelRight || t('heroLabelRight');
  const merchLabel = cms?.merchLabel || t('merchLabel');
  const comingSoonTitle = cms?.comingSoonTitle || t('comingSoonTitle');
  const comingSoonDesc = cms?.comingSoonDesc || t('comingSoonDesc');
  const ctaHeadline = cms?.ctaHeadline || t('ctaHeadline');
  const ctaDesc = cms?.ctaDescription || t('ctaDescription');

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{heroLabel}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{heroLabelRight}</span>
        </motion.div>

        <div className="flex items-start justify-between gap-8">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
              {headline}<br /><span className="text-tiffany">{headlineAccent}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
              {description}
            </motion.p>
          </div>

          {/* Cart Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            onClick={openCart}
            className="relative flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl px-5 py-3 hover:border-tiffany/30 transition-all mt-2 shrink-0"
          >
            <ShoppingBag className="w-5 h-5 text-[var(--text-primary)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">{t('cart')}</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-tiffany text-black text-xs font-bold rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </motion.button>
        </div>
      </section>

      {/* Brand Logos */}
      <LogoTicker cms={{ label: tVpp('trustedBy') }} />

      {/* ─── VPP Product Showcase + Quote Form ─── */}
      <VPPShowcase />

      {/* How It Works */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">{t('howItWorks.label')}</span>
            <div className="h-px flex-1 bg-[var(--border-default)]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[0, 1, 2, 3].map((idx) => {
              const item = {
                step: t(`howItWorks.steps.${idx}.step`),
                title: t(`howItWorks.steps.${idx}.title`),
                desc: t(`howItWorks.steps.${idx}.desc`),
              };
              return item;
            }).map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                className="relative p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tiffany/10 border border-tiffany/20 text-tiffany font-bold text-sm mb-3">
                  {item.step}
                </span>
                <h3 className="font-display text-sm font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                <p className="font-mono text-[10px] text-[var(--text-dim)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Merchandise Products (Printful) ─── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">{merchLabel}</span>
          <div className="h-px flex-1 bg-[var(--border-default)]" />
        </motion.div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-[var(--bg-primary)]" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-[var(--bg-primary)] rounded w-3/4" />
                  <div className="h-4 bg-[var(--bg-primary)] rounded w-1/4" />
                  <div className="h-10 bg-[var(--bg-primary)] rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : productError ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-[var(--text-secondary)]">{productError}</p>
          </motion.div>
        ) : products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-[var(--text-secondary)] opacity-40" />
            </div>
            <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-2">{comingSoonTitle}</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">{comingSoonDesc}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}>
                <PrintfulProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/#request" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">{ctaHeadline}</p>
            <p className="text-[var(--text-secondary)] text-sm">{ctaDesc}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center group-hover:bg-tiffany group-hover:text-black text-tiffany transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
