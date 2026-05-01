"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client } from "@/../sanity/lib/client";
import { WEBSHOP_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight, Send, Package, Truck, Shield } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const INFO_CARDS = [
  { icon: Package, value: "Print on Demand", label: "No minimum order" },
  { icon: Truck, value: "EU Shipping", label: "Fast delivery across Europe" },
  { icon: Shield, value: "Quality", label: "Premium branded products" },
];

export function ShopPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [cms, setCms] = useState<any>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);
  const { totalQuantity, openCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(WEBSHOP_PAGE_QUERY);
        setCms(data);
      } catch (err) {
        console.error("Failed to fetch webshop page data:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      // Skip API call if credentials are missing or placeholder
      if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN) {
        setLoadingProducts(false);
        return;
      }
      
      try {
        setLoadingProducts(true);
        const shopifyProducts = await getProducts(20);
        setProducts(shopifyProducts);
        setProductError(null);
      } catch (err: any) {
        // 401 = token invalid/expired — show empty store, not error
        if (err?.message?.includes("401") || err?.message?.includes("UNAUTHORIZED")) {
          console.warn("Shopify Storefront token invalid — showing empty store state. Re-create token in Shopify Admin > Settings > Apps > Headless.");
          setProducts([]);
        } else {
          console.error("Failed to fetch Shopify products:", err);
          setProductError("Unable to load products. Please try again later.");
        }
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(cms?.headline) || "Merchandise & Video Brochures";
  const description = t(cms?.description) || "Explore our curated selection of event merchandise and request a quote for our premium Video Plus Print brochures.";
  const quoteTitle = t(cms?.quoteTitle) || "Video Plus Print Quote";
  const quoteButton = t(cms?.quoteButton) || "Request Quote";

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">Shop</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">EventPartner Store</span>
        </motion.div>

        <div className="flex items-start justify-between gap-8">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
              Event<br /><span className="text-tiffany">merchandise.</span>
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
            <span className="text-sm font-medium text-[var(--text-primary)]">Cart</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-tiffany text-black text-xs font-bold rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </motion.button>
        </div>
      </section>

      {/* Info Cards */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INFO_CARDS.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
              <card.icon className="w-4 h-4 text-tiffany mb-4 opacity-60" />
              <span className="font-display text-lg font-semibold text-[var(--text-primary)] block leading-tight">{card.value}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mt-1 block">{card.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Merchandise Products (Shopify / Printify) ─── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">Event Merchandise</span>
          <div className="h-px flex-1 bg-[var(--border-default)]" />
        </motion.div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
            <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-2">Coming Soon</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              Our event merchandise catalog is being prepared. Check back soon for branded products and conference essentials.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ─── VPP Quote Form ─── */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{quoteTitle}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">Premium video<br />brochures.</h2>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.8] mt-6">Stand out at your next event with our custom Video Plus Print brochures — a tangible, high-impact marketing tool that combines print with embedded video.</p>
          </motion.div>

          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-tiffany/10 text-tiffany rounded-full flex items-center justify-center mb-6 text-2xl">✓</div>
                  <h3 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">Quote Request Sent</h3>
                  <p className="text-[var(--text-secondary)]">We will get back to you with a custom Video Plus Print quote within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">First Name</label><input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" /></div>
                    <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Last Name</label><input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label><input type="email" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" /></div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Company</label><input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors" /></div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Estimated Quantity</label>
                    <select required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors">
                      <option value="">Select quantity...</option>
                      <option value="50-100">50 - 100 units</option>
                      <option value="100-500">100 - 500 units</option>
                      <option value="500-1000">500 - 1000 units</option>
                      <option value="1000+">1000+ units</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Additional Details</label><textarea rows={3} className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors resize-none" placeholder="Tell us about your event and requirements..." /></div>
                  <button type="submit" className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all flex items-center justify-center gap-2"><Send className="w-4 h-4" />{quoteButton}</button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/#request" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">Need a custom solution?</p>
            <p className="text-[var(--text-secondary)] text-sm">Contact us for bulk orders, custom branding, or tailored merchandise packages.</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tiffany/10 border border-tiffany/20 flex items-center justify-center group-hover:bg-tiffany group-hover:text-black text-tiffany transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
