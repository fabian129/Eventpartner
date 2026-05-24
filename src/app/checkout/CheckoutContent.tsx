"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { usePrintfulCart, cartToOrderItems } from "@/context/PrintfulCartContext";
import { ArrowLeft, Truck, CreditCard, CheckCircle, Loader2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Types ──────────────────────────────────────────────────────

interface ShippingRate {
  id: string;
  name: string;
  rate: string;
  currency: string;
  min_delivery_days: number;
  max_delivery_days: number;
}

type Step = "details" | "shipping" | "review" | "confirmed";

// ─── Component ──────────────────────────────────────────────────

export function CheckoutContent() {
  const { items, totalQuantity, totalPrice, clearCart } = usePrintfulCart();

  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    address1: "", address2: "", city: "",
    stateCode: "", zip: "", countryCode: "SE",
  });

  // Shipping
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);

  // Order result
  const [orderId, setOrderId] = useState<number | null>(null);

  const selectedRate = shippingRates.find((r) => r.id === selectedShipping);
  const shippingCost = selectedRate ? parseFloat(selectedRate.rate) : 0;
  const grandTotal = totalPrice + shippingCost;

  // Redirect if cart empty
  const isEmpty = items.length === 0 && step !== "confirmed";

  const updateField = useCallback(
    (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  // ─── Fetch shipping rates ────────────────────────────────────

  const fetchShipping = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderItems = cartToOrderItems(items);
      const res = await fetch("/api/printful/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: {
            country_code: form.countryCode,
            state_code: form.stateCode || undefined,
            city: form.city,
            zip: form.zip,
          },
          items: orderItems,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch shipping rates");
      }
      const json = await res.json();
      setShippingRates(json.data || []);
      if (json.data?.length > 0) {
        setSelectedShipping(json.data[0].id);
      }
      setStep("shipping");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch shipping");
    } finally {
      setLoading(false);
    }
  };

  // ─── Place order ─────────────────────────────────────────────

  const placeOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderItems = cartToOrderItems(items);
      const res = await fetch("/api/printful/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: {
            name: form.name,
            company: form.company || undefined,
            address1: form.address1,
            address2: form.address2 || undefined,
            city: form.city,
            state_code: form.stateCode || undefined,
            country_code: form.countryCode,
            zip: form.zip,
            phone: form.phone || undefined,
            email: form.email,
          },
          items: orderItems,
          shipping: selectedShipping,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create order");
      }
      const json = await res.json();
      setOrderId(json.data?.id || json.id);
      setStep("confirmed");
      clearCart();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ──────────────────────────────────────────────────

  if (isEmpty) {
    return (
      <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-[var(--text-secondary)] opacity-40" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4">Your cart is empty</h1>
          <p className="text-[var(--text-secondary)] mb-8">Add some products to your cart before checking out.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-[#111] border border-[#333] text-white font-medium rounded-xl px-6 py-3 hover:bg-[#222] transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex items-center justify-between mb-10">
          <Link href="/shop" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">Checkout</span>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }} className="flex items-center gap-3 mb-12">
          {[
            { key: "details", label: "Details", icon: CreditCard },
            { key: "shipping", label: "Shipping", icon: Truck },
            { key: "review", label: "Review", icon: Package },
          ].map((s, i) => {
            const steps: Step[] = ["details", "shipping", "review"];
            const currentIdx = steps.indexOf(step === "confirmed" ? "review" : step);
            const isActive = steps.indexOf(s.key as Step) <= currentIdx;
            return (
              <div key={s.key} className="flex items-center gap-3">
                {i > 0 && <div className={`w-12 h-px ${isActive ? "bg-tiffany" : "bg-[var(--border-default)]"} transition-colors`} />}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? "bg-tiffany/10 text-tiffany border border-tiffany/20" : "text-[var(--text-muted)] border border-[var(--border-default)]"}`}>
                  <s.icon className="w-3.5 h-3.5" />
                  {s.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — Form */}
          <div className="lg:col-span-7">
            {step === "confirmed" ? (
              <ConfirmationView orderId={orderId} />
            ) : step === "details" ? (
              <DetailsForm form={form} updateField={updateField} loading={loading} onSubmit={fetchShipping} />
            ) : step === "shipping" ? (
              <ShippingStep
                rates={shippingRates}
                selected={selectedShipping}
                onSelect={setSelectedShipping}
                onBack={() => setStep("details")}
                onNext={() => setStep("review")}
              />
            ) : (
              <ReviewStep
                form={form}
                selectedRate={selectedRate}
                onBack={() => setStep("shipping")}
                onConfirm={placeOrder}
                loading={loading}
              />
            )}
          </div>

          {/* Right — Order Summary */}
          {step !== "confirmed" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="lg:col-span-5">
              <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-6 sticky top-32">
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">Order Summary</h3>
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                  {items.map((item) => {
                    const qty = item.sizes.reduce((s, sz) => s + sz.quantity, 0);
                    const itemTotal = item.sizes.reduce((s, sz) => s + sz.quantity * sz.price, 0);
                    return (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-[var(--bg-primary)] shrink-0">
                          {item.productImage && (
                            <Image src={item.productImage} alt={item.productName} width={56} height={56} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.productName}</p>
                          <p className="text-xs text-[var(--text-muted)]">
                            {item.color} · {qty} pcs · {item.sizes.filter((s) => s.quantity > 0).map((s) => `${s.size}×${s.quantity}`).join(", ")}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-[var(--text-primary)] shrink-0">${itemTotal.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[var(--border-default)] pt-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Subtotal ({totalQuantity} items)</span><span className="text-[var(--text-primary)]">${totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Shipping</span><span className="text-[var(--text-primary)]">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : step === "details" ? "Calculated next" : "Free"}</span></div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-[var(--border-default)]"><span className="text-[var(--text-primary)]">Total</span><span className="text-tiffany">${grandTotal.toFixed(2)}</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

const inputClass = "w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-sm focus:outline-none focus:border-tiffany transition-colors";
const labelClass = "block text-sm font-medium text-[var(--text-secondary)] mb-1.5";

function DetailsForm({ form, updateField, loading, onSubmit }: {
  form: Record<string, string>;
  updateField: (field: string, value: string) => void;
  loading: boolean;
  onSubmit: () => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }} className="space-y-6">
      <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Delivery Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Full Name *</label><input required value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputClass} placeholder="Anna Svensson" /></div>
        <div><label className={labelClass}>Company</label><input value={form.company} onChange={(e) => updateField("company", e.target.value)} className={inputClass} placeholder="ACME Events AB" /></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Email *</label><input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass} placeholder="anna@company.com" /></div>
        <div><label className={labelClass}>Phone</label><input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClass} placeholder="+46 70 123 4567" /></div>
      </div>

      <div><label className={labelClass}>Address *</label><input required value={form.address1} onChange={(e) => updateField("address1", e.target.value)} className={inputClass} placeholder="Street address" /></div>
      <div><label className={labelClass}>Address line 2</label><input value={form.address2} onChange={(e) => updateField("address2", e.target.value)} className={inputClass} placeholder="Suite, floor, etc." /></div>

      <div className="grid grid-cols-3 gap-4">
        <div><label className={labelClass}>City *</label><input required value={form.city} onChange={(e) => updateField("city", e.target.value)} className={inputClass} placeholder="Stockholm" /></div>
        <div><label className={labelClass}>Postal Code *</label><input required value={form.zip} onChange={(e) => updateField("zip", e.target.value)} className={inputClass} placeholder="111 22" /></div>
        <div>
          <label className={labelClass}>Country *</label>
          <select required value={form.countryCode} onChange={(e) => updateField("countryCode", e.target.value)} className={inputClass}>
            <option value="SE">Sweden</option>
            <option value="NO">Norway</option>
            <option value="DK">Denmark</option>
            <option value="FI">Finland</option>
            <option value="DE">Germany</option>
            <option value="GB">United Kingdom</option>
            <option value="NL">Netherlands</option>
            <option value="US">United States</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
        {loading ? "Calculating shipping..." : "Continue to Shipping"}
      </button>
    </motion.form>
  );
}

function ShippingStep({ rates, selected, onSelect, onBack, onNext }: {
  rates: ShippingRate[];
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }} className="space-y-6">
      <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Shipping Method</h2>

      <div className="space-y-3">
        {rates.map((rate) => (
          <button key={rate.id} onClick={() => onSelect(rate.id)} className={`w-full text-left p-4 rounded-xl border transition-all ${selected === rate.id ? "border-tiffany/50 bg-tiffany/5" : "border-[var(--border-default)] bg-[var(--bg-card)] hover:border-tiffany/20"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{rate.name}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{rate.min_delivery_days}–{rate.max_delivery_days} business days</p>
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{parseFloat(rate.rate) === 0 ? "Free" : `$${parseFloat(rate.rate).toFixed(2)}`}</span>
            </div>
          </button>
        ))}
      </div>

      {rates.length === 0 && (
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl text-center">
          <p className="text-[var(--text-secondary)]">No shipping options available for this address.</p>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 border border-[var(--border-default)] text-[var(--text-secondary)] font-medium rounded-xl py-3.5 hover:border-tiffany/20 transition-all flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} disabled={!selected} className="flex-1 bg-[#111] border border-[#333] text-white font-medium rounded-xl py-3.5 hover:bg-[#222] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          <Package className="w-4 h-4" /> Review Order
        </button>
      </div>
    </motion.div>
  );
}

function ReviewStep({ form, selectedRate, onBack, onConfirm, loading }: {
  form: Record<string, string>;
  selectedRate?: ShippingRate;
  onBack: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }} className="space-y-6">
      <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Review & Confirm</h2>

      <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl p-5 space-y-3">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany mb-2">Delivery Address</h4>
        <p className="text-sm text-[var(--text-primary)]">{form.name}{form.company && ` — ${form.company}`}</p>
        <p className="text-sm text-[var(--text-secondary)]">{form.address1}{form.address2 && `, ${form.address2}`}</p>
        <p className="text-sm text-[var(--text-secondary)]">{form.zip} {form.city}, {form.countryCode}</p>
        {form.email && <p className="text-sm text-[var(--text-muted)]">{form.email}</p>}
      </div>

      {selectedRate && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl p-5">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-tiffany mb-2">Shipping</h4>
          <p className="text-sm text-[var(--text-primary)]">{selectedRate.name} — {selectedRate.min_delivery_days}–{selectedRate.max_delivery_days} days</p>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 border border-[var(--border-default)] text-[var(--text-secondary)] font-medium rounded-xl py-3.5 hover:border-tiffany/20 transition-all flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onConfirm} disabled={loading} className="flex-1 bg-tiffany text-black font-semibold rounded-xl py-3.5 hover:bg-tiffany/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </div>

      <p className="text-xs text-[var(--text-muted)] text-center">
        This creates a draft order. Payment integration coming soon.
      </p>
    </motion.div>
  );
}

function ConfirmationView({ orderId }: { orderId: number | null }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }} className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-10 text-center">
      <div className="w-20 h-20 bg-tiffany/10 border border-tiffany/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-tiffany" />
      </div>
      <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">Order Placed!</h2>
      {orderId && <p className="font-mono text-sm text-tiffany mb-4">Order #{orderId}</p>}
      <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
        Your merchandise order has been submitted. You&#39;ll receive a confirmation email with tracking details once production begins.
      </p>
      <Link href="/shop" className="inline-flex items-center gap-2 bg-[#111] border border-[#333] text-white font-medium rounded-xl px-6 py-3 hover:bg-[#222] transition-all">
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </Link>
    </motion.div>
  );
}
