"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Upload, Paintbrush, Check } from "lucide-react";
import { SizeQuantityMatrix } from "./SizeQuantityMatrix";
import { PrintfulDesignMaker } from "./PrintfulDesignMaker";
import { usePrintfulCart, type CartSizeEntry } from "@/context/PrintfulCartContext";

// ─── Types (from API response) ──────────────────────────────────

export interface PrintfulProductVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  image: string;
  price: string;
  currency: string;
  in_stock: boolean;
}

export interface PrintfulProductData {
  id: number;
  name: string;
  image: string;
  description: string;
  variants: PrintfulProductVariant[];
  availableColors: { name: string; hex: string }[];
  availableSizes: string[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Component ──────────────────────────────────────────────────

export function PrintfulProductCard({
  product,
}: {
  product: PrintfulProductData;
}) {
  const { addBulkItem } = usePrintfulCart();
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0]?.name || ""
  );
  const [sizeQuantities, setSizeQuantities] = useState<
    { variantId: number; size: string; quantity: number }[]
  >([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [designerOpen, setDesignerOpen] = useState(false);
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);

  // Filter variants by selected color
  const colorVariants = useMemo(
    () => product.variants.filter((v) => v.color === selectedColor),
    [product.variants, selectedColor]
  );

  // Build size options for matrix
  const sizeOptions = useMemo(
    () =>
      colorVariants.map((v) => ({
        variantId: v.id,
        size: v.size,
        available: v.in_stock,
      })),
    [colorVariants]
  );

  // Get the unit price (first variant's price as reference)
  const unitPrice = colorVariants[0]
    ? parseFloat(colorVariants[0].price)
    : 0;
  const currency = colorVariants[0]?.currency || "USD";

  // Get product image (first variant with image, or product default)
  const displayImage = useMemo(() => {
    const colorVariant = colorVariants.find((v) => v.image);
    return colorVariant?.image || product.image;
  }, [colorVariants, product.image]);

  const totalQty = sizeQuantities.reduce((sum, s) => sum + s.quantity, 0);

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

    const colorData = product.availableColors.find(
      (c) => c.name === selectedColor
    );

    addBulkItem({
      productId: product.id,
      productName: product.name,
      productImage: displayImage,
      color: selectedColor,
      colorHex: colorData?.hex || "#000",
      sizes,
      unitPrice,
      currency,
    });

    // Reset quantities
    setSizeQuantities([]);
    setIsExpanded(false);
  }, [
    totalQty,
    sizeQuantities,
    unitPrice,
    product,
    selectedColor,
    displayImage,
    currency,
    addBulkItem,
  ]);

  return (
    <motion.div
      layout
      className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-tiffany/20 hover:shadow-[0_0_30px_rgba(106,216,210,0.04)]"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-[var(--bg-primary)] overflow-hidden">
        {displayImage ? (
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-[var(--text-secondary)] opacity-20" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-base font-display font-semibold text-[var(--text-primary)] mb-1 truncate">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-display font-semibold text-[var(--text-primary)]">
            {new Intl.NumberFormat("sv-SE", {
              style: "currency",
              currency,
              minimumFractionDigits: 0,
            }).format(unitPrice)}
          </span>
          <span className="text-xs text-[var(--text-dim)] font-mono">
            / st
          </span>
        </div>

        {/* Color Selector */}
        {product.availableColors.length > 1 && (
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2 block">
              Färg — {selectedColor}
            </span>
            <div className="flex flex-wrap gap-2">
              {product.availableColors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedColor(c.name);
                    setSizeQuantities([]);
                  }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    selectedColor === c.name
                      ? "border-tiffany scale-110 shadow-[0_0_8px_rgba(106,216,210,0.3)]"
                      : "border-[var(--border-default)] hover:border-[var(--text-secondary)]"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Expand to show size matrix */}
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111] border border-[#333] text-white font-medium text-sm hover:bg-[#222] hover:border-[#444] transition-all"
          >
            <Upload className="w-4 h-4" />
            Select Sizes & Order
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Customize button */}
            <button
              onClick={() => setDesignerOpen(true)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all mb-3 ${
                templateId
                  ? "bg-tiffany/10 border-tiffany/30 text-tiffany"
                  : "bg-purple/10 border-purple/30 text-purple hover:bg-purple/20"
              }`}
            >
              {templateId ? (
                <><Check className="w-4 h-4" /> Design saved</>
              ) : (
                <><Paintbrush className="w-4 h-4" /> Customize Design</>
              )}
            </button>

            {/* Size Quantity Matrix */}
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-3 block">
                Antal per storlek
              </span>
              <SizeQuantityMatrix
                sizes={sizeOptions}
                onChange={setSizeQuantities}
                unitPrice={unitPrice}
                currency={currency}
              />
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={totalQty === 0}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all ${
                totalQty > 0
                  ? "bg-tiffany text-black hover:bg-tiffany/90"
                  : "bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-dim)] cursor-not-allowed"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalQty > 0
                ? `Add ${totalQty} items to cart`
                : "Enter quantities above"}
            </button>
          </motion.div>
        )}
      </div>

      {/* Printful Design Maker Modal */}
      <PrintfulDesignMaker
        productId={product.id}
        productName={product.name}
        isOpen={designerOpen}
        onClose={() => setDesignerOpen(false)}
        onDesignSaved={(result) => {
          setTemplateId(result.templateId);
          if (result.previewUrl) setDesignPreview(result.previewUrl);
          setDesignerOpen(false);
        }}
      />
    </motion.div>
  );
}
