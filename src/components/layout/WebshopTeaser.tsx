"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ExternalLink } from "lucide-react";
import { getProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";

/**
 * WebshopTeaser — Live Shopify product preview on homepage
 *
 * Fetches real products from Shopify Storefront API and displays
 * them in a premium grid. Links through to /shop for full experience.
 */

interface WebshopCMS {
  label?: string; labelRight?: string;
  headline?: string; headlineAccent?: string;
  description?: string;
  comingSoonTitle?: string; comingSoonDesc?: string;
  ctaText?: string;
}

export function WebshopTeaser({ cms }: { cms?: WebshopCMS }) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN) {
        setLoading(false);
        return;
      }
      try {
        const shopifyProducts = await getProducts(6);
        setProducts(shopifyProducts);
      } catch (err) {
        console.error("Failed to fetch Shopify products:", err);
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
              {cms?.label || "EventPartner \u2014 Shop"}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
              {cms?.labelRight || "Event Merchandise"}
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] mb-6">
            {cms?.headline || "Everything for your event."}
            <br />
            <span className="italic font-light text-[var(--text-muted)]">{cms?.headlineAccent || "Order online."}</span>
          </h2>
          <p className="font-display text-[clamp(1rem,2vw,1.2rem)] font-normal tracking-tight text-[var(--text-secondary)] leading-[1.45] max-w-lg">
            {cms?.description || "Name badges, conference kits, d\u00e9cor and branded merchandise \u2014 all curated for professional events."}
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
            /* Real Shopify products */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {products.slice(0, 6).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link
                    href={`/shop`}
                    className="group block bg-white rounded-2xl border border-black/[0.05] overflow-hidden hover:shadow-lg hover:border-tiffany/20 transition-all duration-300"
                  >
                    {/* Product image */}
                    <div className="aspect-square relative overflow-hidden bg-[#F8F8FA]">
                      {product.featuredImage ? (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-[#ccc]" />
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <ExternalLink className="w-4 h-4 text-[#111]" />
                        </div>
                      </div>
                      {product.tags?.includes("bestseller") && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full bg-tiffany/90 text-white border border-tiffany">
                            Bestseller
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="p-4 md:p-5">
                      {product.productType && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-tiffany mb-1 block">
                          {product.productType}
                        </span>
                      )}
                      <h4 className="font-display text-[15px] font-medium text-[#111] tracking-tight mb-2 line-clamp-2">
                        {product.title}
                      </h4>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-lg font-semibold text-[#111]">
                          {formatPrice(product.priceRange.minVariantPrice)}
                        </span>
                        {product.priceRange.maxVariantPrice.amount !== product.priceRange.minVariantPrice.amount && (
                          <span className="text-[11px] text-[#999]">
                            – {formatPrice(product.priceRange.maxVariantPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
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
                {cms?.comingSoonTitle || "Coming soon."}
              </h3>
              <p className="text-[15px] text-[#666] leading-relaxed max-w-md mx-auto">
                {cms?.comingSoonDesc || "Our webshop for event products launches soon. Contact us and we'll handle your order today."}
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
              {cms?.ctaText || "Visit the shop"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
