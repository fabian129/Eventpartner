"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePrintfulCart } from "@/context/PrintfulCartContext";
import { COUNTRIES } from "@/data/countries";
import { Trash2, ShoppingBag, Send, CheckCircle, Loader2, ArrowLeft } from "lucide-react";

type DrawerView = "cart" | "quote" | "success";

export function PrintfulCartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    totalQuantity,
    totalPrice,
    removeItem,
    updateSizeQuantity,
    clearCart,
  } = usePrintfulCart();

  const [view, setView] = useState<DrawerView>("cart");

  // Reset view when cart opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset so closing animation plays with current view
      const t = setTimeout(() => setView("cart"), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currency = items[0]?.currency || "USD";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-[var(--bg-primary)] border-l border-[var(--border-default)] z-[999] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {view === "cart" && (
          <CartView
            items={items}
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            currency={currency}
            closeCart={closeCart}
            removeItem={removeItem}
            updateSizeQuantity={updateSizeQuantity}
            onRequestQuote={() => setView("quote")}
          />
        )}
        {view === "quote" && (
          <QuoteFormView
            items={items}
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            currency={currency}
            onBack={() => setView("cart")}
            onSuccess={() => {
              setView("success");
              clearCart();
            }}
          />
        )}
        {view === "success" && (
          <SuccessView onClose={closeCart} />
        )}
      </div>
    </>
  );
}

// ─── Cart View ───────────────────────────────────────────────────

function CartView({
  items,
  totalQuantity,
  totalPrice,
  currency,
  closeCart,
  removeItem,
  updateSizeQuantity,
  onRequestQuote,
}: {
  items: import("@/context/PrintfulCartContext").PrintfulCartItem[];
  totalQuantity: number;
  totalPrice: number;
  currency: string;
  closeCart: () => void;
  removeItem: (id: string) => void;
  updateSizeQuantity: (itemId: string, variantId: number, qty: number) => void;
  onRequestQuote: () => void;
}) {
  const t = useTranslations('cart');
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-default)]">
        <h2 className="text-lg font-display font-semibold text-[var(--text-primary)]">
          {t('title')}
          {totalQuantity > 0 && (
            <span className="ml-2 text-sm font-normal text-[var(--text-secondary)]">
              ({totalQuantity} {totalQuantity === 1 ? t('item') : t('items')})
            </span>
          )}
        </h2>
        <button
          onClick={closeCart}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-card)] transition-colors"
          aria-label={t('close')}
        >
          <svg
            className="w-5 h-5 text-[var(--text-secondary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Cart Items */}
      <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-[var(--text-secondary)] opacity-40" />
            </div>
            <p className="text-[var(--text-secondary)] text-lg mb-2">
              {t('empty.title')}
            </p>
            <p className="text-[var(--text-secondary)] text-sm opacity-70">
              {t('empty.description')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={removeItem}
                onUpdateSize={updateSizeQuantity}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-[var(--border-default)] px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)]">{totalQuantity} {totalQuantity === 1 ? t('item') : t('items')} {t('selected')}</span>
            <span className="text-sm font-medium text-tiffany/80">{t('priceIncluded')}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] opacity-70">
            {t('bulkDiscountNote')}
          </p>
          <button
            onClick={onRequestQuote}
            className="w-full bg-tiffany text-black text-center font-semibold rounded-xl py-4 hover:bg-tiffany/90 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {t('requestQuote')}
          </button>
        </div>
      )}
    </>
  );
}

// ─── Quote Form View ─────────────────────────────────────────────

function QuoteFormView({
  items,
  totalQuantity,
  totalPrice,
  currency,
  onBack,
  onSuccess,
}: {
  items: import("@/context/PrintfulCartContext").PrintfulCartItem[];
  totalQuantity: number;
  totalPrice: number;
  currency: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const t = useTranslations('cart');
  const locale = useLocale();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    stateCode: "",
    countryCode: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Country options for the shipping address (ISO alpha-2, uppercase for Printful)
  const countryOptions = useMemo(
    () =>
      [...COUNTRIES]
        .map((c) => ({ code: c.code.toUpperCase(), name: c.name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setError(t('quoteForm.nameEmailRequired'));
      return;
    }

    if (!form.address1.trim() || !form.city.trim() || !form.zip.trim() || !form.countryCode) {
      setError(t('quoteForm.addressRequired'));
      return;
    }

    if (!agreedToTerms) {
      setError(t('quoteForm.termsRequired'));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "merch-quote",
          locale,
          ...form,
          items: items.map((item) => ({
            productName: item.productName,
            productId: item.productId,
            color: item.color,
            templateId: item.templateId,
            currency: item.currency,
            sizes: item.sizes.filter((s) => s.quantity > 0),
          })),
          totalQuantity,
          totalPrice,
          currency,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send quote");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-tiffany/50 transition-colors";

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border-default)]">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-card)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" />
        </button>
        <div>
          <h2 className="text-lg font-display font-semibold text-[var(--text-primary)]">
            {t('quoteForm.title')}
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {totalQuantity} {totalQuantity === 1 ? t('item') : t('items')}
          </p>
        </div>
      </div>

      {/* Form */}
      <form data-lenis-prevent onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
              {t('quoteForm.fields.name.label')}
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={t('quoteForm.fields.name.placeholder')}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
              {t('quoteForm.fields.email.label')}
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder={t('quoteForm.fields.email.placeholder')}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
              {t('quoteForm.fields.company.label')}
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              placeholder={t('quoteForm.fields.company.placeholder')}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
              {t('quoteForm.fields.phone.label')}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder={t('quoteForm.fields.phone.placeholder')}
              className={inputClass}
            />
          </div>

          {/* Shipping address — used to create the Printful draft order */}
          <div className="pt-2">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
              {t('quoteForm.shippingHeading')}
            </p>
            <p className="text-[11px] text-[var(--text-dim)] leading-relaxed">
              {t('quoteForm.shippingNote')}
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
              {t('quoteForm.fields.address1.label')}
            </label>
            <input
              type="text"
              required
              value={form.address1}
              onChange={(e) => setForm((f) => ({ ...f, address1: e.target.value }))}
              placeholder={t('quoteForm.fields.address1.placeholder')}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
              {t('quoteForm.fields.address2.label')}
            </label>
            <input
              type="text"
              value={form.address2}
              onChange={(e) => setForm((f) => ({ ...f, address2: e.target.value }))}
              placeholder={t('quoteForm.fields.address2.placeholder')}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
                {t('quoteForm.fields.city.label')}
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder={t('quoteForm.fields.city.placeholder')}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
                {t('quoteForm.fields.zip.label')}
              </label>
              <input
                type="text"
                required
                value={form.zip}
                onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                placeholder={t('quoteForm.fields.zip.placeholder')}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
                {t('quoteForm.fields.country.label')}
              </label>
              <select
                required
                value={form.countryCode}
                onChange={(e) => setForm((f) => ({ ...f, countryCode: e.target.value }))}
                className={inputClass}
              >
                <option value="">{t('quoteForm.fields.country.placeholder')}</option>
                {countryOptions.map((c, i) => (
                  <option key={`${c.code}-${i}`} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
                {t('quoteForm.fields.state.label')}
              </label>
              <input
                type="text"
                value={form.stateCode}
                onChange={(e) => setForm((f) => ({ ...f, stateCode: e.target.value }))}
                placeholder={t('quoteForm.fields.state.placeholder')}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2">
              {t('quoteForm.fields.message.label')}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder={t('quoteForm.fields.message.placeholder')}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Terms & agreement */}
        <label className="mt-5 flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 shrink-0 accent-tiffany cursor-pointer"
          />
          <span className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
            {t('quoteForm.terms.text')}{" "}
            <a href="/security" target="_blank" rel="noopener noreferrer" className="text-tiffany hover:underline">
              {t('quoteForm.terms.link')}
            </a>
            .
          </span>
        </label>

        {/* Submit inside form for native validation */}
        <div className="mt-5 pt-5 border-t border-[var(--border-default)]">
          <button
            type="submit"
            disabled={submitting || !agreedToTerms}
            className="w-full bg-tiffany text-black font-semibold rounded-xl py-4 hover:bg-tiffany/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('quoteForm.sending')}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t('quoteForm.submit')}
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

// ─── Success View ────────────────────────────────────────────────

function SuccessView({ onClose }: { onClose: () => void }) {
  const t = useTranslations('cart');
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-tiffany/10 border border-tiffany/20 flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-tiffany" />
      </div>
      <h2 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-2">
        {t('success.title')}
      </h2>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 max-w-xs">
        {t('success.description')}
      </p>
      <button
        onClick={onClose}
        className="px-8 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] font-medium text-sm hover:border-tiffany/30 transition-colors"
      >
        {t('success.close')}
      </button>
    </div>
  );
}

// ─── Cart Item Card ──────────────────────────────────────────────

function CartItemCard({
  item,
  onRemove,
  onUpdateSize,
}: {
  item: import("@/context/PrintfulCartContext").PrintfulCartItem;
  onRemove: (id: string) => void;
  onUpdateSize: (itemId: string, variantId: number, qty: number) => void;
}) {
  const t = useTranslations('cart');
  const itemTotal = item.sizes.reduce(
    (sum, s) => sum + s.quantity * s.price,
    0
  );
  const itemQty = item.sizes.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 flex-shrink-0 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl overflow-hidden">
          {item.productImage ? (
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-[var(--text-secondary)] opacity-30" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">
                {item.productName}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="w-3 h-3 rounded-full border border-[var(--border-default)]"
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="text-xs text-[var(--text-secondary)]">
                  {item.color}
                </span>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              aria-label={t('removeItem')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Size breakdown */}
      <div className="mt-3 flex flex-wrap gap-2">
        {item.sizes
          .filter((s) => s.quantity > 0)
          .map((s) => (
            <div
              key={s.variantId}
              className="flex items-center gap-1.5 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-lg px-2.5 py-1.5"
            >
              <span className="text-[10px] font-mono uppercase text-[var(--text-dim)]">
                {s.size}
              </span>
              <div className="flex items-center border border-[var(--border-default)] rounded overflow-hidden">
                <button
                  onClick={() =>
                    onUpdateSize(item.id, s.variantId, s.quantity - 1)
                  }
                  className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-card)] text-xs"
                >
                  −
                </button>
                <span className="w-6 h-6 flex items-center justify-center text-xs text-[var(--text-primary)]">
                  {s.quantity}
                </span>
                <button
                  onClick={() =>
                    onUpdateSize(item.id, s.variantId, s.quantity + 1)
                  }
                  className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-card)] text-xs"
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Item total */}
      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-xs text-[var(--text-dim)]">
          {itemQty} {itemQty === 1 ? t('item') : t('items')}
        </span>
        <span className="text-sm font-semibold text-[var(--text-primary)]" title={t('priceOnRequest')}>
          {new Intl.NumberFormat("sv-SE", {
            style: "currency",
            currency: item.currency,
            minimumFractionDigits: 0,
          }).format(itemTotal)}
        </span>
      </div>
    </div>
  );
}
