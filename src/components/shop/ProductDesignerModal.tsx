"use client";

import { useEffect, useState, useCallback } from "react";
import { FabricImage } from "fabric";
import { useCanvas } from "@/hooks/useCanvas";
import { useCart } from "@/context/CartContext";
import { Upload, RotateCcw, ShoppingBag, X, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ShopifyProduct } from "@/lib/shopify";

const CANVAS_SIZE = 800;

interface Props {
  product: ShopifyProduct;
  variantId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDesignerModal({ product, variantId, isOpen, onClose }: Props) {
  const { canvasRef, canvas, exportPNG } = useCanvas({ width: CANVAS_SIZE, height: CANVAS_SIZE });
  const { addItem, isLoading } = useCart();
  const [hasLogo, setHasLogo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [instructions, setInstructions] = useState("");

  // Use local product image — prefer -2 (blank/back view) for clean canvas
  const localMockup = `/Images/products/${product.handle}-2.png`;
  const fallbackMockup = `/Images/products/${product.handle}-1.png`;

  /* ── Load product image as background ── */
  const loadBg = useCallback((src: string) => {
    if (!canvas) return;
    const imgEl = new window.Image();
    imgEl.onload = () => {
      const fabricImg = new FabricImage(imgEl);
      // Scale to fill canvas (cover, not contain)
      const scale = Math.max(CANVAS_SIZE / (imgEl.width || 1), CANVAS_SIZE / (imgEl.height || 1));
      fabricImg.scale(scale);
      fabricImg.set({
        left: CANVAS_SIZE / 2,
        top: CANVAS_SIZE / 2,
        originX: "center",
        originY: "center",
      });
      fabricImg.selectable = false;
      fabricImg.evented = false;
      canvas.backgroundImage = fabricImg;
      canvas.renderAll();
    };
    imgEl.src = src;
  }, [canvas]);

  useEffect(() => {
    if (!canvas || !isOpen) return;
    canvas.clear();
    canvas.backgroundColor = "#f5f5f5";
    canvas.renderAll();
    setHasLogo(false);

    const imgEl = new window.Image();
    imgEl.onload = () => loadBg(localMockup);
    imgEl.onerror = () => loadBg(fallbackMockup);
    imgEl.src = localMockup;
  }, [canvas, isOpen, localMockup, fallbackMockup, loadBg]);

  /* ── Add logo (no clipPath — free positioning) ── */
  const addLogo = useCallback(async (dataURL: string) => {
    if (!canvas) return;
    canvas.getObjects().forEach((obj) => canvas.remove(obj));

    const logo = await FabricImage.fromURL(dataURL);

    // Scale logo to ~30% of canvas (comfortable size for placement)
    const maxDim = CANVAS_SIZE * 0.3;
    const scaleFactor = Math.min(
      maxDim / (logo.width ?? 1),
      maxDim / (logo.height ?? 1)
    );
    logo.scale(scaleFactor);
    logo.set({
      left: CANVAS_SIZE / 2,
      top: CANVAS_SIZE * 0.4, // slightly above center (chest area)
      originX: "center",
      originY: "center",
    });

    canvas.add(logo);
    canvas.setActiveObject(logo);
    canvas.renderAll();
    setHasLogo(true);
  }, [canvas]);

  /* ── File handler ── */
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) addLogo(e.target.result as string);
    };
    reader.readAsDataURL(file);
  }, [addLogo]);

  /* ── Add to cart with design ── */
  const handleAddToCart = useCallback(async () => {
    if (!canvas) return;
    setUploading(true);

    try {
      const dataURL = exportPNG();
      
      // Upload design to server
      const res = await fetch("/api/upload-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataURL }),
      });

      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();

      // Build full URL for Shopify attribute
      const designUrl = `${window.location.origin}${url}`;

      // Add to cart with custom design attribute
      const attributes = [
        { key: "Custom Design", value: designUrl },
        { key: "_design_preview", value: designUrl },
      ];
      if (instructions.trim()) {
        attributes.push({ key: "Print Instructions", value: instructions.trim() });
      }
      await addItem(variantId, 1, attributes);

      onClose();
    } catch (error) {
      console.error("Failed to add custom product:", error);
    } finally {
      setUploading(false);
    }
  }, [canvas, exportPNG, addItem, variantId, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-[var(--bg-primary)] rounded-3xl z-[1001] flex flex-col overflow-hidden border border-[var(--border-default)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[var(--border-default)]">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-tiffany" />
                <div>
                  <h2 className="text-lg font-display font-semibold text-[var(--text-primary)]">
                    Customize — {product.title}
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Upload your logo and position it on the product
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-card)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Canvas */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[var(--bg-card)]">
                <div
                  className={`relative rounded-2xl overflow-hidden border-2 transition-colors duration-200 max-w-full ${
                    dragOver ? "border-tiffany" : "border-transparent"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleFile(file);
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto"
                    style={{ maxHeight: "calc(100vh - 240px)" }}
                  />

                  {/* Upload overlay */}
                  <AnimatePresence>
                    {!hasLogo && (
                      <motion.label
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/30 backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                          <Upload className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-white font-medium text-sm">Drop your logo here</span>
                        <span className="text-white/60 text-xs mt-1">PNG, JPG, SVG, or WebP</span>
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,.svg,.webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFile(file);
                            e.target.value = "";
                          }}
                          className="hidden"
                        />
                      </motion.label>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[var(--border-default)] p-6 flex flex-col gap-4">
                <div>
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mb-1">
                    {product.title}
                  </h3>
                  {product.productType && (
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                      {product.productType}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-tiffany/10 text-tiffany text-[10px] font-bold flex items-center justify-center">1</span>
                    Upload your logo
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-tiffany/10 text-tiffany text-[10px] font-bold flex items-center justify-center">2</span>
                    Drag, scale & rotate
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-tiffany/10 text-tiffany text-[10px] font-bold flex items-center justify-center">3</span>
                    Add to cart & checkout
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Special Instructions</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={2}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-tiffany transition-colors resize-none placeholder:text-[var(--text-muted)]"
                    placeholder="E.g. Also print on back, left chest only..."
                  />
                </div>

                <div className="flex-1" />

                {/* Actions */}
                {hasLogo && (
                  <label className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-colors cursor-pointer text-sm font-medium text-[var(--text-secondary)]">
                    <RotateCcw className="w-4 h-4" />
                    Change Logo
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                  </label>
                )}

                <button
                  onClick={hasLogo ? handleAddToCart : undefined}
                  disabled={!hasLogo || uploading || isLoading}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-sm transition-all ${
                    hasLogo
                      ? "bg-[#111] border border-[#333] text-white hover:bg-[#222] hover:border-[#444]"
                      : "bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-secondary)] cursor-not-allowed"
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      {hasLogo ? "Add Custom Design to Cart" : "Upload logo first"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
