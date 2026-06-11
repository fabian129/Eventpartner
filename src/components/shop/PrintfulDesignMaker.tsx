"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Loader2, AlertCircle, Save, Check, ShoppingBag, Plus, ArrowRight } from "lucide-react";
import { SizeQuantityMatrix } from "./SizeQuantityMatrix";
import { usePrintfulCart, type CartSizeEntry } from "@/context/PrintfulCartContext";

/* ─── Types ──────────────────────────────────────────────────── */

interface DesignResult {
  templateId: number;
  productId: number;
}

interface SizeOption {
  variantId: number;
  size: string;
  available: boolean;
}

interface PrintfulDesignMakerProps {
  productId: number;
  productName: string;
  productImage?: string;
  colorName?: string;
  colorHex?: string;
  sizeOptions: SizeOption[];
  unitPrice: number;
  currency: string;
  onDesignSaved: (result: DesignResult) => void;
  onClose: () => void;
  isOpen: boolean;
}

/* ─── PFDesignMaker instance type ───── */
interface PFDesignMakerInstance {
  removeEventListeners: () => void;
  sendMessage: (msg: Record<string, unknown>) => void;
  showHideLoading: (force?: boolean) => void;
}

declare global {
  interface Window {
    PFDesignMaker?: new (config: Record<string, unknown>) => PFDesignMakerInstance;
  }
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SCRIPT_SRC = "https://files.cdn.printful.com/embed/embed.js";

type Phase = "design" | "sizes" | "added";

/* ─── Component ──────────────────────────────────────────────── */

export function PrintfulDesignMaker({
  productId,
  productName,
  productImage,
  colorName,
  colorHex,
  sizeOptions,
  unitPrice,
  currency,
  onDesignSaved,
  onClose,
  isOpen,
}: PrintfulDesignMakerProps) {
  const t = useTranslations('designer');
  const designMakerRef = useRef<PFDesignMakerInstance | null>(null);
  const { addBulkItem, openCart } = usePrintfulCart();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("design");
  const [templateId, setTemplateId] = useState<number | null>(null);
  const elemId = `pf-designer-${productId}`;
  const externalProductId = useRef(`ep-${productId}-${Date.now()}`);

  // Size selection state
  const [sizeQuantities, setSizeQuantities] = useState<{ variantId: number; size: string; quantity: number }[]>([]);
  const totalQty = sizeQuantities.reduce((sum, s) => sum + s.quantity, 0);

  // Stable ref for the onDesignSaved callback
  const onDesignSavedRef = useRef(onDesignSaved);
  onDesignSavedRef.current = onDesignSaved;

  // Reset phase when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setPhase("design");
        setTemplateId(null);
        setSizeQuantities([]);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* ── Load Printful embed script ── */
  const loadScript = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.PFDesignMaker) { resolve(); return; }
      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed to load embed script")));
        return;
      }
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load embed script"));
      document.head.appendChild(script);
    });
  }, []);

  /* ── Initialize EDM when modal opens ── */
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    async function init() {
      setStatus("loading");
      setErrorMsg("");
      try {
        await loadScript();
        if (cancelled) return;

        const nonceRes = await fetch("/api/printful/nonce", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ externalProductId: externalProductId.current }),
        });
        if (!nonceRes.ok) {
          const err = await nonceRes.json();
          throw new Error(err.error || `Nonce failed: ${nonceRes.status}`);
        }
        const { nonce } = await nonceRes.json();
        if (cancelled || !window.PFDesignMaker) throw new Error("PFDesignMaker not available");

        await new Promise((r) => setTimeout(r, 200));
        if (cancelled) return;

        const maker = new window.PFDesignMaker({
          elemId,
          nonce,
          externalProductId: externalProductId.current,
          initProduct: { productId },
          onIframeLoaded: () => { if (!cancelled) setStatus("ready"); },
          onTemplateSaved: (tid: number) => {
            setSaving(false);
            setTemplateId(tid);
            setPhase("sizes");
            onDesignSavedRef.current({ templateId: tid, productId });
          },
          onProductChanged: (newProductId: number) => {
            // product changed
          },
          onError: (data: unknown) => {
            console.warn("EDM error:", data);
            setSaving(false);
            const msg = typeof data === "string"
              ? data
              : (data as any)?.message || (data as any)?.data?.response?.message || "";
            if (msg.toLowerCase().includes("add a design") || msg.toLowerCase().includes("please add")) {
              setWarning("Please upload a design before saving.");
              return;
            }
            if (msg) setWarning(msg);
          },
        });
        designMakerRef.current = maker;
      } catch (err) {
        if (!cancelled) {
          console.error("EDM init error:", err);
          setStatus("error");
          setErrorMsg(err instanceof Error ? err.message : "Failed to initialize designer");
        }
      }
    }

    init();
    return () => {
      cancelled = true;
      if (designMakerRef.current) {
        try { designMakerRef.current.removeEventListeners(); } catch { /* ignore */ }
        designMakerRef.current = null;
      }
      const container = document.getElementById(elemId);
      if (container) container.innerHTML = "";
    };
  }, [isOpen, productId, elemId, loadScript]);

  /* ── Prevent body scroll ── */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Add to cart handler ── */
  const handleAddToCart = useCallback(() => {
    if (totalQty === 0) return;

    const sizes: CartSizeEntry[] = sizeQuantities
      .filter((s) => s.quantity > 0)
      .map((s) => ({
        variantId: s.variantId,
        size: s.size,
        quantity: s.quantity,
        price: unitPrice,
      }));

    addBulkItem({
      productId,
      productName,
      productImage: productImage || "",
      color: colorName || "Default",
      colorHex: colorHex || "#000",
      sizes,
      unitPrice,
      currency,
      templateId: templateId ?? undefined,
    });

    setPhase("added");
  }, [totalQty, sizeQuantities, unitPrice, productId, productName, productImage, colorName, colorHex, currency, templateId, addBulkItem]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={phase === "added" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[101] flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* ═══ PHASE: DESIGN ═══ */}
            {phase === "design" && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-gray-900">
                      {t('title')}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{productName}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* EDM Container */}
                <div className="flex-1 relative overflow-hidden">
                  {status === "loading" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                      <Loader2 className="w-8 h-8 text-tiffany animate-spin mb-4" />
                      <p className="text-sm text-gray-500 font-medium">{t('loadingTitle')}</p>
                      <p className="text-xs text-gray-400 mt-1">{t('loadingSub')}</p>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">{t('errorTitle')}</p>
                      <p className="text-xs text-gray-400 max-w-sm text-center">{errorMsg}</p>
                      <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">{t('close')}</button>
                    </div>
                  )}
                  <div id={elemId} className="w-full h-full" style={{ minHeight: "500px" }} />
                  <style>{`
                    #${elemId} { position: relative; width: 100%; height: 100%; }
                    #${elemId} iframe { width: 100% !important; height: 100% !important; border: none; }
                    #${elemId} .overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.8); z-index: 5; }
                    #${elemId} .overlay .spinner { width: 32px; height: 32px; border: 3px solid #e5e5e5; border-top-color: #6AD8D2; border-radius: 50%; animation: pf-spin 0.8s linear infinite; }
                    @keyframes pf-spin { to { transform: rotate(360deg); } }
                  `}</style>
                </div>

                {/* Footer — Save & Continue */}
                {status === "ready" && (
                  <div className="shrink-0 border-t border-gray-200 bg-gray-50">
                    {warning && (
                      <div className="px-6 py-3 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
                        <p className="text-sm text-amber-700">{warning}</p>
                        <button onClick={() => setWarning(null)} className="text-amber-400 hover:text-amber-600 text-xs font-medium">{t('dismiss')}</button>
                      </div>
                    )}
                    <div className="px-6 py-4 flex items-center justify-between">
                      <p className="text-xs text-gray-400">{t('uploadHint')}</p>
                      <button
                        onClick={() => {
                          if (designMakerRef.current) {
                            setWarning(null);
                            setSaving(true);
                            designMakerRef.current.sendMessage({ event: "saveDesign" });
                          }
                        }}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-tiffany text-black font-semibold text-sm hover:bg-tiffany/90 transition-all disabled:opacity-50"
                      >
                        {saving ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> {t('saving')}</>
                        ) : (
                          <><Save className="w-4 h-4" /> {t('saveAndContinue')}</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ═══ PHASE: SIZES (select quantities → add to cart) ═══ */}
            {phase === "sizes" && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-gray-900">
                      {t('sizesTitle')}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-tiffany" />
                      <span className="text-sm text-tiffany font-medium">{t('designSaved')}</span>
                      <span className="text-sm text-gray-400">· {productName}</span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto flex items-start justify-center">
                  <div className="max-w-md w-full px-6 py-10">
                    {/* Product summary */}
                    {productImage && (
                      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <img src={productImage} alt={productName} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{productName}</p>
                          {colorName && (
                            <div className="flex items-center gap-2 mt-1">
                              {colorHex && <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: colorHex }} />}
                              <span className="text-xs text-gray-500">{colorName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Size matrix */}
                    <div className="bg-white rounded-2xl">
                      <p className="text-sm font-medium text-gray-700 mb-4">{t('sizePrompt')}</p>
                      <SizeQuantityMatrix
                        sizes={sizeOptions}
                        onChange={setSizeQuantities}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer — Add to Cart */}
                <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="max-w-md mx-auto flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {totalQty > 0 ? `${totalQty} ${totalQty === 1 ? t('item') : t('items')}` : t('selectSizesAbove')}
                      </p>
                      <p className="text-xs text-gray-400">Price on request</p>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={totalQty === 0}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-tiffany text-black font-semibold text-sm hover:bg-tiffany/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {t('addToCart')}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ═══ PHASE: ADDED (success — continue or checkout) ═══ */}
            {phase === "added" && (
              <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="w-20 h-20 rounded-full bg-tiffany/10 border border-tiffany/20 flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-tiffany" />
                  </div>
                </motion.div>
                <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  {t('addedTitle')}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
                  <strong>{productName}</strong> · {colorName} · {totalQty} {totalQty === 1 ? t('item') : t('items')}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <button
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    {t('addMoreProducts')}
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      // Small delay to let modal close animation finish
                      setTimeout(() => openCart(), 300);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-tiffany text-black font-semibold text-sm hover:bg-tiffany/90 transition-all"
                  >
                    {t('requestQuote')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
