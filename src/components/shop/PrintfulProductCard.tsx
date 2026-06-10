"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Paintbrush } from "lucide-react";
import { PrintfulDesignMaker } from "./PrintfulDesignMaker";

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
  /** For store (sync) products: the underlying catalog product id the EDM designer needs. */
  catalog_product_id?: number | null;
  variants: PrintfulProductVariant[];
  availableColors?: { name: string; hex: string }[];
  colors?: { name: string; value: string }[];
  availableSizes?: string[];
  sizes?: string[];
}

// ─── Component ──────────────────────────────────────────────────

export function PrintfulProductCard({
  product,
}: {
  product: PrintfulProductData;
}) {
  const t = useTranslations('shop');
  const [designerOpen, setDesignerOpen] = useState(false);

  const colors = product.availableColors || product.colors || [];
  const defaultColor = colors[0] as { name: string; hex?: string; value?: string } | undefined;
  const defaultColorHex = defaultColor?.hex || defaultColor?.value || "#000000";

  const sizes = product.availableSizes || product.sizes || [];

  // Build size options for all variants of the default color
  const defaultColorVariants = useMemo(
    () => product.variants?.filter((v) => v.color === defaultColor?.name) || [],
    [product.variants, defaultColor?.name]
  );

  const sizeOptions = useMemo(
    () =>
      defaultColorVariants.map((v) => ({
        variantId: v.id,
        size: v.size,
        available: v.in_stock !== false,
      })),
    [defaultColorVariants]
  );

  const unitPrice = defaultColorVariants[0]
    ? parseFloat(defaultColorVariants[0].price)
    : 0;
  const currency = defaultColorVariants[0]?.currency || "USD";

  // Get product display image
  const displayImage = useMemo(() => {
    const colorVariant = defaultColorVariants.find((v) => v.image);
    return colorVariant?.image || product.image;
  }, [defaultColorVariants, product.image]);

  // Clean product name (remove manufacturer prefix for display)
  const displayName = product.name.split("|")[0]?.trim() || product.name;

  return (
    <>
      <div className="group bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-tiffany/30 hover:shadow-[0_0_40px_rgba(106,216,210,0.06)] cursor-pointer"
        onClick={() => setDesignerOpen(true)}
      >
        {/* Product Image */}
        <div className="relative aspect-[4/5] bg-[var(--bg-primary)] overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Paintbrush className="w-12 h-12 text-[var(--text-secondary)] opacity-20" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm shadow-lg">
              <Paintbrush className="w-4 h-4" />
              {t('productCard.customize')}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="text-sm font-display font-semibold text-[var(--text-primary)] mb-1 line-clamp-1">
            {displayName}
          </h3>
          <p className="text-xs text-[var(--text-dim)]">
            {colors.length} {t('productCard.colors')} · {sizes.length} {t('productCard.sizes')}
          </p>
        </div>
      </div>

      {/* Design Maker Modal — full flow: design → sizes → cart */}
      <PrintfulDesignMaker
        productId={product.catalog_product_id ?? product.id}
        productName={displayName}
        productImage={displayImage}
        colorName={defaultColor?.name}
        colorHex={defaultColorHex}
        sizeOptions={sizeOptions}
        unitPrice={unitPrice}
        currency={currency}
        isOpen={designerOpen}
        onClose={() => setDesignerOpen(false)}
        onDesignSaved={() => {}}
      />
    </>
  );
}
