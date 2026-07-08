"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Tv, Mail, Package, FolderOpen, CreditCard, BookOpen,
  ArrowRight, ArrowLeft, X, Send, CheckCircle,
  ChevronLeft, ChevronRight, Monitor, Layers, Palette, Calendar,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { BOOKING_LINKS } from "@/lib/bookingLinks";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Product Data ─── */
interface VPPProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  images: string[];
  icon: React.ReactNode;
  screenSizes: string[];
  features: string[];
  useCases: string[];
}

function useVPPProducts(): VPPProduct[] {
  const t = useTranslations('vpp');
  return [
    {
      id: "brochure",
      name: t('products.brochure.name'),
      tagline: t('products.brochure.tagline'),
      description: t('products.brochure.description'),
      images: ["/Images/vpp/vpp_brochure.png"],
      icon: <Tv className="w-5 h-5" />,
      screenSizes: ["4.3″", "5″", "7″", "10″"],
      features: ["HD IPS LCD", "Built-in speaker", "USB-C rechargeable", "Navigation buttons", "Preloaded video"],
      useCases: ["Sales & Marketing", "Product Launches", "Event Invitations", "Corporate Gifts"],
    },
    {
      id: "mailer",
      name: t('products.mailer.name'),
      tagline: t('products.mailer.tagline'),
      description: t('products.mailer.description'),
      images: ["/Images/vpp/vpp_mailer.png", "/Images/vpp/vpp_mailer_closed.png", "/Images/vpp/vpp_mailer_open.png"],
      icon: <Mail className="w-5 h-5" />,
      screenSizes: ["4.3″", "5″", "7″"],
      features: ["Custom mailer box", "Auto-play on open", "Rechargeable battery", "Multiple video slots"],
      useCases: ["Direct Mail Campaigns", "B2B Outreach", "Fundraising", "Product Samples"],
    },
    {
      id: "box",
      name: t('products.box.name'),
      tagline: t('products.box.tagline'),
      description: t('products.box.description'),
      images: ["/Images/vpp/vpp_box.png"],
      icon: <Package className="w-5 h-5" />,
      screenSizes: ["5″", "7″", "10″"],
      features: ["Luxury packaging", "Product compartment", "Magnetic closure", "Foam insert option"],
      useCases: ["Luxury Gifting", "Product Launches", "VIP Experiences", "Award Ceremonies"],
    },
    {
      id: "folder",
      name: t('products.folder.name'),
      tagline: t('products.folder.tagline'),
      description: t('products.folder.description'),
      images: ["/Images/vpp/vpp_folder.png", "/Images/vpp/vpp_folder_closed.png", "/Images/vpp/vpp_folder_open.png"],
      icon: <FolderOpen className="w-5 h-5" />,
      screenSizes: ["5″", "7″", "10″"],
      features: ["Document pockets", "Business card slot", "Landscape/portrait", "Multi-page option"],
      useCases: ["Sales Presentations", "Real Estate", "Corporate Reports", "Training Materials"],
    },
    {
      id: "business-card",
      name: t('products.businessCard.name'),
      tagline: t('products.businessCard.tagline'),
      description: t('products.businessCard.description'),
      images: ["/Images/vpp/sothebys_cards_on_slate_1783434005267.png"],
      icon: <CreditCard className="w-5 h-5" />,
      screenSizes: ["2.4″"],
      features: ["Pocket-sized", "2.4″ screen", "Built-in speaker", "USB-C charging"],
      useCases: ["Networking Events", "Trade Shows", "Executive Introductions", "Personal Branding"],
    },
    {
      id: "book",
      name: t('products.book.name'),
      tagline: t('products.book.tagline'),
      description: t('products.book.description'),
      images: ["/Images/vpp/vpp_book.png"],
      icon: <BookOpen className="w-5 h-5" />,
      screenSizes: ["5″", "7″", "10″"],
      features: ["Multi-page layout", "Hardcover binding", "Multiple screens possible", "Premium paper stock"],
      useCases: ["Brand Stories", "Annual Reports", "Wedding Albums", "Commemorative Editions"],
    },
  ];
}

/* ─── Product Card ─── */
function VPPProductCard({
  product, index, onSelect,
}: { product: VPPProduct; index: number; onSelect: () => void }) {
  const [imgError, setImgError] = useState(false);
  const t = useTranslations('vpp');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE }}
    >
      <div
        onClick={onSelect}
        className="group bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden hover:border-tiffany/20 transition-all duration-300 cursor-pointer"
      >
        <div className="relative aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
          {!imgError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-tiffany/40 mb-3">
                {product.icon}
              </div>
              <span className="text-[11px] text-white/15 font-medium">{product.name}</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/65 border border-white/10 rounded-full px-2.5 py-1">
            <span className="text-[9px] font-mono uppercase tracking-wider text-white/60">
              {product.screenSizes.join(" · ")}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-display text-[15px] font-semibold text-[var(--text-primary)] leading-tight">
            {product.name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mt-1">
            {product.tagline}
          </p>
          <button className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] text-[13px] font-medium rounded-xl py-3 hover:border-tiffany/30 hover:text-tiffany transition-all duration-300">
            {t('viewDetails')} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Product Detail Modal ─── */
function ProductDetailModal({
  product, onClose, onQuote,
}: { product: VPPProduct; onClose: () => void; onQuote: (productName: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const hasMultipleImages = product.images.length > 1;
  const t = useTranslations('vpp');

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl"
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>

        {/* Image Carousel */}
        <div className="relative bg-[#0a0a0a] overflow-hidden rounded-t-2xl">
          {/* Main Image */}
          <div className="relative aspect-video">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute inset-0"
              >
                {!failedImages.has(activeIndex) ? (
                  <Image
                    src={product.images[activeIndex]}
                    alt={`${product.name} - Image ${activeIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="800px"
                    onError={() => handleImageError(activeIndex)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-tiffany/40">
                      {product.icon}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/65 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/65 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Indicator Dots */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-5 h-1.5 bg-tiffany"
                        : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {hasMultipleImages && (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#060606] border-t border-white/[0.04]">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                    i === activeIndex
                      ? "border-tiffany/60 ring-1 ring-tiffany/20"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  {!failedImages.has(i) ? (
                    <Image
                      src={src}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                      onError={() => handleImageError(i)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
                      <div className="w-4 h-4 text-white/20">{product.icon}</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">{product.name}</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">{product.tagline}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-full px-3 py-1.5">
              <Monitor className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">{product.screenSizes.join(" · ")}</span>
            </div>
          </div>

          <p className="text-[var(--text-secondary)] text-[15px] leading-[1.7] mb-2">{product.description}</p>
          <p className="font-mono text-[11px] text-tiffany mb-6">{t('priceHint')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Features */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-3.5 h-3.5 text-tiffany" />
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">{t('features')}</span>
              </div>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                    <span className="w-1 h-1 rounded-full bg-tiffany/50 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Use Cases */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-3.5 h-3.5 text-tiffany" />
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">{t('idealFor')}</span>
              </div>
              <ul className="space-y-2">
                {product.useCases.map((u) => (
                  <li key={u} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                    <span className="w-1 h-1 rounded-full bg-tiffany/50 shrink-0" /> {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => { onQuote(product.name); onClose(); }}
            className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> {t('requestQuoteFor', { productName: product.name })}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Trusted By ─── */
const TRUSTED_LOGOS = [
  { name: "Google", font: "'Product Sans', sans-serif", weight: "400", size: "22", spacing: "0" },
  { name: "Microsoft", font: "'Segoe UI', sans-serif", weight: "600", size: "20", spacing: "1" },
  { name: "BMW", font: "'Arial Black', sans-serif", weight: "900", size: "24", spacing: "3" },
  { name: "Disney", font: "'Georgia', serif", weight: "400", size: "24", spacing: "1", italic: true },
  { name: "Porsche", font: "'Helvetica Neue', sans-serif", weight: "700", size: "20", spacing: "4" },
  { name: "Volkswagen", font: "'Helvetica Neue', sans-serif", weight: "700", size: "18", spacing: "2" },
  { name: "Samsung", font: "'Helvetica Neue', sans-serif", weight: "700", size: "20", spacing: "4" },
  { name: "Volvo", font: "'Arial Black', sans-serif", weight: "900", size: "22", spacing: "4" },
  { name: "Unilever", font: "'Helvetica Neue', sans-serif", weight: "600", size: "20", spacing: "1" },
  { name: "PwC", font: "'Georgia', serif", weight: "700", size: "24", spacing: "1" },
  { name: "LEGO", font: "'Arial Black', sans-serif", weight: "900", size: "22", spacing: "3" },
  { name: "BBC", font: "'Arial', sans-serif", weight: "900", size: "24", spacing: "3" },
];

function TrustedByStrip() {
  const t = useTranslations('vpp');
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }} className="mt-10 pt-8 border-t border-[var(--border-default)]">
      <div className="text-center mb-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)]">{t('trustedBy')}</span>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-[var(--bg-card)] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-[var(--bg-card)] to-transparent" />
        <div className="flex animate-[marquee_30s_linear_infinite]">
          {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="flex items-center justify-center shrink-0 px-6 md:px-8">
              <svg viewBox={`0 0 ${Math.max(logo.name.length * 14, 80)} 36`} className="h-5 md:h-6 w-auto opacity-20 hover:opacity-50 transition-opacity duration-300" fill="currentColor">
                <text
                  x="50%" y="26" textAnchor="middle"
                  fontFamily={logo.font} fontWeight={logo.weight}
                  fontSize={logo.size} letterSpacing={logo.spacing}
                  fontStyle={logo.italic ? "italic" : "normal"}
                >{logo.name.toUpperCase()}</text>
              </svg>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}

/* ─── Quote Form ─── */
const SCREEN_SIZES = ["2.4″", "4.3″", "5″", "7″", "10″"];
const FINISH_OPTIONS = ["Matte", "Glossy"];

function VPPQuoteForm({ preselectedProduct, productTypes }: { preselectedProduct: string; productTypes: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = useTranslations('vpp');
  const locale = useLocale();
  const sv = locale === 'sv';

  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    product: preselectedProduct, size: '', quantity: '',
    finish: '', message: '', address: '', country: '',
  });

  // Update product when preselected changes
  useState(() => { setForm(prev => ({ ...prev, product: preselectedProduct })); });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'vpp-quote', locale, ...form }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-[14px] focus:outline-none focus:border-tiffany/50 transition-colors placeholder:text-[var(--text-muted)]";
  const labelClass = "block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] mb-2";

  if (submitted) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-8 lg:p-10">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-tiffany/10 text-tiffany rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">{t('quoteSuccess.title')}</h3>
          <p className="text-[var(--text-secondary)] max-w-md">{t('quoteSuccess.description')}</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', product: '', size: '', quantity: '', finish: '', message: '', address: '', country: '' }); }} className="mt-6 text-tiffany text-sm font-medium hover:underline">{t('quoteSuccess.submitAnother')}</button>
        </div>
      </div>
    );
  }

  const quotePoints = t.raw('quotePoints') as Record<string, { label: string; desc: string }>;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-8 lg:p-10">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div><label className={labelClass}>{t('quoteForm.fullName')}</label><input type="text" required placeholder="Your full name" className={inputClass} value={form.name} onChange={set('name')} /></div>
          <div><label className={labelClass}>{t('quoteForm.company')}</label><input type="text" required placeholder="Company name" className={inputClass} value={form.company} onChange={set('company')} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div><label className={labelClass}>{t('quoteForm.email')}</label><input type="email" required placeholder="you@company.com" className={inputClass} value={form.email} onChange={set('email')} /></div>
          <div><label className={labelClass}>{t('quoteForm.phone')}</label><input type="tel" placeholder="+1 234 567 890" className={inputClass} value={form.phone} onChange={set('phone')} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div><label className={labelClass}>{sv ? "Adress" : "Address"}</label><input type="text" placeholder={sv ? "Gatuadress" : "Street address"} className={inputClass} value={form.address} onChange={set('address')} /></div>
          <div><label className={labelClass}>{sv ? "Land" : "Country"}</label><input type="text" placeholder={sv ? "Land" : "Country"} className={inputClass} value={form.country} onChange={set('country')} /></div>
        </div>

        <div className="h-px bg-[var(--border-default)]" />

        {/* Product specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{t('quoteForm.productType')}</label>
            <select required value={form.product} onChange={set('product')} className={inputClass}>
              <option value="">{t('quoteForm.selectProduct')}</option>
              {productTypes.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t('quoteForm.screenSize')}</label>
            <select required className={inputClass} value={form.size} onChange={set('size')}>
              <option value="">{t('quoteForm.selectSize')}</option>
              {SCREEN_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{t('quoteForm.quantity')}</label>
            <input
              type="number"
              min={50}
              step={1}
              placeholder="200"
              required
              className={inputClass}
              value={form.quantity}
              onChange={set('quantity')}
            />
          </div>
          <div>
            <label className={labelClass}>{t('quoteForm.finish')}</label>
            <select className={inputClass} value={form.finish} onChange={set('finish')}>
              <option value="">{t('quoteForm.selectFinish')}</option>
              {FINISH_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="h-px bg-[var(--border-default)]" />

        {/* Message */}
        <div>
          <label className={labelClass}>{t('quoteForm.additionalDetails')}</label>
          <textarea rows={3} placeholder={t('quoteForm.detailsPlaceholder')} className={`${inputClass} resize-none`} value={form.message} onChange={set('message')} />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t('quoteForm.sending')}</>
          ) : (
            <><Send className="w-4 h-4" /> {t('quoteForm.submit')}</>
          )}
        </button>

        <p className="text-center font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
          {t('quoteForm.disclaimer')}
        </p>
      </form>

      {/* Book Meeting — same pattern as events form */}
      <div className="mt-6 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-[var(--border-default)]">
            <Image
              src="/Images/Team/pontus.webp"
              alt="Pontus — EventPartner"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany mb-1">{t('meetingSection.label')}</p>
            <h3 className="font-display text-lg md:text-xl font-medium text-[var(--text-primary)]">{t('meetingSection.headline')}</h3>
            <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
              {t('meetingSection.description')}
            </p>
          </div>
        </div>
        <a
          href={BOOKING_LINKS.vpp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto shrink-0 whitespace-nowrap inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-medium transition-colors bg-black/5 hover:bg-black/10 text-[#111] border border-black/5"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          {t('meetingSection.cta')}
        </a>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function VPPShowcase() {
  const VPP_PRODUCTS = useVPPProducts();
  const PRODUCT_TYPES = VPP_PRODUCTS.map((p) => p.name);
  const [selectedProduct, setSelectedProduct] = useState<VPPProduct | null>(null);
  const [preselectedQuoteProduct, setPreselectedQuoteProduct] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('vpp');

  const handleQuoteFromModal = (productName: string) => {
    setPreselectedQuoteProduct(productName);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const quotePoints = t.raw('quotePoints') as Record<string, { label: string; desc: string }>;

  return (
    <>
      {/* Product Grid */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany">{t('sectionLabel')}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/30 bg-black/[0.04] px-2.5 py-1 rounded-full">{t('sectionBadge')}</span>
            <div className="h-px flex-1 bg-[var(--border-default)]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VPP_PRODUCTS.map((product, i) => (
            <VPPProductCard key={product.id} product={product} index={i} onSelect={() => setSelectedProduct(product)} />
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section id="vpp-quote" ref={formRef} className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-tiffany block mb-6">{t('quoteLabel')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]" dangerouslySetInnerHTML={{ __html: t('quoteHeadline').replace(/\n/g, '<br />') }} />
            <p className="font-mono text-[11px] text-tiffany mt-3">{t('priceHint')}</p>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.8] mt-6">
              {t('quoteDescription')}
            </p>
            <div className="mt-8 space-y-4">
              {Object.values(quotePoints).map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-tiffany mt-2 shrink-0" />
                  <div>
                    <span className="text-[13px] font-semibold text-[var(--text-primary)] block">{item.label}</span>
                    <span className="text-[12px] text-[var(--text-muted)]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <VPPQuoteForm preselectedProduct={preselectedQuoteProduct} productTypes={PRODUCT_TYPES} />
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onQuote={handleQuoteFromModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
