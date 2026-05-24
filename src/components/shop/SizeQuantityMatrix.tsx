"use client";

import { useState, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────

interface SizeOption {
  variantId: number;
  size: string;
  available: boolean;
}

interface SizeQuantity {
  variantId: number;
  size: string;
  quantity: number;
}

interface SizeQuantityMatrixProps {
  sizes: SizeOption[];
  onChange: (sizes: SizeQuantity[]) => void;
  unitPrice?: number;
  currency?: string;
}

// ─── Component ──────────────────────────────────────────────────

export function SizeQuantityMatrix({
  sizes,
  onChange,
  unitPrice,
  currency = "USD",
}: SizeQuantityMatrixProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    sizes.forEach((s) => (initial[s.variantId] = 0));
    return initial;
  });

  const handleChange = useCallback(
    (variantId: number, value: number) => {
      const qty = Math.max(0, Math.floor(value) || 0);
      const updated = { ...quantities, [variantId]: qty };
      setQuantities(updated);

      onChange(
        sizes.map((s) => ({
          variantId: s.variantId,
          size: s.size,
          quantity: updated[s.variantId] || 0,
        }))
      );
    },
    [quantities, sizes, onChange]
  );

  const totalQty = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = unitPrice ? totalQty * unitPrice : null;

  return (
    <div>
      {/* Size grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {sizes.map((s) => (
          <div key={s.variantId} className="flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-1.5">
              {s.size}
            </span>
            <input
              type="number"
              min={0}
              value={quantities[s.variantId] || ""}
              placeholder="0"
              disabled={!s.available}
              onChange={(e) =>
                handleChange(s.variantId, parseInt(e.target.value, 10))
              }
              className={`w-full text-center rounded-xl border py-2.5 text-sm font-medium transition-all focus:outline-none ${
                !s.available
                  ? "bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-dim)] cursor-not-allowed opacity-40"
                  : quantities[s.variantId] > 0
                  ? "bg-tiffany/5 border-tiffany/30 text-[var(--text-primary)]"
                  : "bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--text-secondary)] focus:border-tiffany/40"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      {totalQty > 0 && (
        <div className="mt-4 flex items-center justify-between px-1">
          <span className="text-sm text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">
              {totalQty}
            </span>{" "}
            {totalQty === 1 ? "item" : "items"}
          </span>
          {totalPrice !== null && (
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {new Intl.NumberFormat("sv-SE", {
                style: "currency",
                currency,
                minimumFractionDigits: 0,
              }).format(totalPrice)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
