"use client";

import { useCart } from "@/context/CartContext";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useState } from "react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isLoading } = useCart();
  const [adding, setAdding] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const variant = product.variants[selectedVariantIndex];
  const imageUrl = variant?.image?.url || product.featuredImage?.url;
  const hasMultipleVariants = product.variants.length > 1;
  const isAvailable = product.availableForSale && variant?.availableForSale;

  const handleAdd = async () => {
    if (!variant || !isAvailable) return;
    setAdding(true);
    await addItem(variant.id);
    setAdding(false);
  };

  return (
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

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={!isAvailable || adding || isLoading}
          className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
            isAvailable
              ? "bg-[#111] border border-[#333] text-white hover:bg-[#222] hover:border-[#444]"
              : "bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-secondary)] cursor-not-allowed"
          }`}
        >
          {adding ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </span>
          ) : !isAvailable ? (
            "Sold Out"
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
