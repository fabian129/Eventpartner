"use client";


import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useState } from "react";
import { Palette } from "lucide-react";
import { ProductDesignerModal } from "./ProductDesignerModal";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [designerOpen, setDesignerOpen] = useState(false);

  const variant = product.variants[selectedVariantIndex];
  const imageUrl = variant?.image?.url || product.featuredImage?.url;
  const hasMultipleVariants = product.variants.length > 1;
  const isAvailable = product.availableForSale && variant?.availableForSale;

  return (
    <>
      <div className="group bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-tiffany/30 hover:shadow-[0_0_30px_rgba(106,216,210,0.05)]">
        {/* Product Image */}
        <div className="relative aspect-square bg-[var(--bg-primary)] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-[var(--text-secondary)] opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Out of stock badge */}
          {!isAvailable && (
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Sold Out
            </div>
          )}

          {/* Compare at price badge */}
          {variant?.compareAtPrice && parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount) && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Sale
            </div>
          )}

          {/* Customize overlay on hover */}
          {isAvailable && (
            <button
              onClick={() => setDesignerOpen(true)}
              className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm text-black px-5 py-2.5 rounded-full text-sm font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Palette className="w-4 h-4" />
                Customize with Logo
              </div>
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="text-base font-display font-semibold text-[var(--text-primary)] mb-1 truncate">
            {product.title}
          </h3>

          {product.productType && (
            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              {product.productType}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-display font-semibold text-[var(--text-primary)]">
              {variant ? formatPrice(variant.price) : formatPrice(product.priceRange.minVariantPrice)}
            </span>
            {variant?.compareAtPrice && parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount) && (
              <span className="text-sm text-[var(--text-secondary)] line-through">
                {formatPrice(variant.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Variant Selector */}
          {hasMultipleVariants && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(i)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      i === selectedVariantIndex
                        ? "border-tiffany text-tiffany bg-tiffany/10"
                        : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]"
                    } ${!v.availableForSale ? "opacity-40 line-through" : ""}`}
                    disabled={!v.availableForSale}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => isAvailable && setDesignerOpen(true)}
            disabled={!isAvailable}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
              isAvailable
                ? "bg-[#111] border border-[#333] text-white hover:bg-[#222] hover:border-[#444]"
                : "bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-secondary)] cursor-not-allowed"
            }`}
          >
            {!isAvailable ? (
              "Sold Out"
            ) : (
              <>
                <Palette className="w-4 h-4" />
                Customize & Order
              </>
            )}
          </button>
        </div>
      </div>

      {/* Designer Modal */}
      {variant && (
        <ProductDesignerModal
          product={product}
          variantId={variant.id}
          isOpen={designerOpen}
          onClose={() => setDesignerOpen(false)}
        />
      )}
    </>
  );
}
