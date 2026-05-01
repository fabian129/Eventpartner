"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import { useEffect } from "react";

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading, updateItem, removeItem } = useCart();

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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[440px] bg-[var(--bg-primary)] border-l border-[var(--border-default)] z-[999] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-default)]">
          <h2 className="text-lg font-display font-semibold text-[var(--text-primary)]">
            Your Cart
            {cart && cart.totalQuantity > 0 && (
              <span className="ml-2 text-sm font-normal text-[var(--text-secondary)]">
                ({cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-card)] transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-[var(--text-secondary)] text-lg mb-2">Your cart is empty</p>
              <p className="text-[var(--text-secondary)] text-sm opacity-70">Browse our products and add items to your cart.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.lines.map((line) => (
                <CartLineItem
                  key={line.id}
                  line={line}
                  onUpdate={updateItem}
                  onRemove={removeItem}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer — Checkout */}
        {cart && cart.lines.length > 0 && (
          <div className="border-t border-[var(--border-default)] px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="text-lg font-display font-semibold text-[var(--text-primary)]">
                {formatPrice(cart.cost.subtotalAmount)}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] opacity-70">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              className="block w-full bg-[#111] border border-[#333] text-white text-center font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all"
            >
              {isLoading ? "Updating..." : "Proceed to Checkout"}
            </a>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Cart Line Item ─────────────────────────────────────────────
function CartLineItem({
  line,
  onUpdate,
  onRemove,
  isLoading,
}: {
  line: import("@/lib/shopify").ShopifyCartLine;
  onUpdate: (lineId: string, quantity: number) => Promise<void>;
  onRemove: (lineId: string) => Promise<void>;
  isLoading: boolean;
}) {
  const imageUrl = line.merchandise.product.featuredImage?.url;
  const productTitle = line.merchandise.product.title;
  const variantTitle = line.merchandise.title !== "Default Title" ? line.merchandise.title : null;
  const price = formatPrice(line.merchandise.price);

  return (
    <div className="flex gap-4 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-4">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={productTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--text-secondary)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">{productTitle}</h4>
        {variantTitle && (
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{variantTitle}</p>
        )}
        <p className="text-sm font-medium text-[var(--text-primary)] mt-1">{price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-[var(--border-default)] rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdate(line.id, Math.max(0, line.quantity - 1))}
              disabled={isLoading}
              className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] transition-colors disabled:opacity-50"
            >
              −
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-sm text-[var(--text-primary)]">
              {line.quantity}
            </span>
            <button
              onClick={() => onUpdate(line.id, line.quantity + 1)}
              disabled={isLoading}
              className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] transition-colors disabled:opacity-50"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(line.id)}
            disabled={isLoading}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
            aria-label="Remove item"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
