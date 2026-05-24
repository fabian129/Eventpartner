"use client";

import { useEffect } from "react";
import { usePrintfulCart } from "@/context/PrintfulCartContext";
import { Trash2, ShoppingBag } from "lucide-react";

export function PrintfulCartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    totalQuantity,
    totalPrice,
    removeItem,
    updateSizeQuantity,
  } = usePrintfulCart();

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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-default)]">
          <h2 className="text-lg font-display font-semibold text-[var(--text-primary)]">
            Your Order
            {totalQuantity > 0 && (
              <span className="ml-2 text-sm font-normal text-[var(--text-secondary)]">
                ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-card)] transition-colors"
            aria-label="Close cart"
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
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-[var(--text-secondary)] opacity-40" />
              </div>
              <p className="text-[var(--text-secondary)] text-lg mb-2">
                Your cart is empty
              </p>
              <p className="text-[var(--text-secondary)] text-sm opacity-70">
                Select products and choose quantities per size.
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

        {/* Footer — Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[var(--border-default)] px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="text-lg font-display font-semibold text-[var(--text-primary)]">
                {new Intl.NumberFormat("sv-SE", {
                  style: "currency",
                  currency,
                  minimumFractionDigits: 0,
                }).format(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] opacity-70">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href="/checkout"
              className="block w-full bg-tiffany text-black text-center font-semibold rounded-xl py-4 hover:bg-tiffany/90 transition-all"
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Cart Item Card ─────────────────────────────────────────────

function CartItemCard({
  item,
  onRemove,
  onUpdateSize,
}: {
  item: import("@/context/PrintfulCartContext").PrintfulCartItem;
  onRemove: (id: string) => void;
  onUpdateSize: (itemId: string, variantId: number, qty: number) => void;
}) {
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
              aria-label="Remove item"
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
          {itemQty} items
        </span>
        <span className="text-sm font-semibold text-[var(--text-primary)]">
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
