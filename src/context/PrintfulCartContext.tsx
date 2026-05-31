"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

// ─── Types ──────────────────────────────────────────────────────

export interface CartSizeEntry {
  variantId: number;
  size: string;
  quantity: number;
  price: number;
}

export interface PrintfulCartItem {
  /** Unique ID for this cart entry */
  id: string;
  /** Printful catalog product ID */
  productId: number;
  productName: string;
  productImage: string;
  /** Selected color for this item group */
  color: string;
  colorHex: string;
  /** Quantities per size — this is the core of the bulk model */
  sizes: CartSizeEntry[];
  /** Price per unit (all sizes same price for this product) */
  unitPrice: number;
  currency: string;
  /** Design template ID from Printful (set after upload) */
  templateId?: number;
  /** Preview URL of the customer's uploaded design */
  designPreviewUrl?: string;
}

interface PrintfulCartContextType {
  items: PrintfulCartItem[];
  isOpen: boolean;
  totalQuantity: number;
  totalPrice: number;
  openCart: () => void;
  closeCart: () => void;
  addBulkItem: (item: Omit<PrintfulCartItem, "id">) => void;
  removeItem: (itemId: string) => void;
  updateSizeQuantity: (
    itemId: string,
    variantId: number,
    quantity: number
  ) => void;
  clearCart: () => void;
}

const PrintfulCartContext = createContext<PrintfulCartContextType | undefined>(
  undefined
);

// ─── Storage key ────────────────────────────────────────────────
const STORAGE_KEY = "ep-printful-cart";

function loadCart(): PrintfulCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: PrintfulCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ─── Provider ───────────────────────────────────────────────────

export function PrintfulCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PrintfulCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const hasLoaded = useRef(false);

  // Load from localStorage on mount (client only — avoids SSR hydration mismatch)
  useEffect(() => {
    setItems(loadCart());
    hasLoaded.current = true;
  }, []);

  // Persist on change (only after initial load to avoid wiping localStorage)
  useEffect(() => {
    if (hasLoaded.current) {
      saveCart(items);
    }
  }, [items]);

  // Computed totals
  const totalQuantity = items.reduce(
    (sum, item) =>
      sum + item.sizes.reduce((s, size) => s + size.quantity, 0),
    0
  );

  const totalPrice = items.reduce(
    (sum, item) =>
      sum +
      item.sizes.reduce((s, size) => s + size.quantity * size.price, 0),
    0
  );

  // Add a bulk item (product + color + sizes[])
  const addBulkItem = useCallback(
    (newItem: Omit<PrintfulCartItem, "id">) => {
      const id = `pf-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setItems((prev) => [...prev, { ...newItem, id }]);
      setIsOpen(true);
    },
    []
  );

  // Remove an entire item
  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Update quantity for a specific size within an item
  const updateSizeQuantity = useCallback(
    (itemId: string, variantId: number, quantity: number) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            sizes: item.sizes.map((s) =>
              s.variantId === variantId
                ? { ...s, quantity: Math.max(0, quantity) }
                : s
            ),
          };
        })
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  return (
    <PrintfulCartContext.Provider
      value={{
        items,
        isOpen,
        totalQuantity,
        totalPrice,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addBulkItem,
        removeItem,
        updateSizeQuantity,
        clearCart,
      }}
    >
      {children}
    </PrintfulCartContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────

export function usePrintfulCart() {
  const context = useContext(PrintfulCartContext);
  if (!context) {
    throw new Error("usePrintfulCart must be used within a PrintfulCartProvider");
  }
  return context;
}

// ─── Helpers ────────────────────────────────────────────────────

/** Flatten cart items into order_items array for Printful API */
export function cartToOrderItems(
  items: PrintfulCartItem[]
): { catalog_variant_id: number; quantity: number; product_template_id?: number }[] {
  const orderItems: { catalog_variant_id: number; quantity: number; product_template_id?: number }[] = [];

  for (const item of items) {
    for (const size of item.sizes) {
      if (size.quantity > 0) {
        orderItems.push({
          catalog_variant_id: size.variantId,
          quantity: size.quantity,
          ...(item.templateId ? { product_template_id: item.templateId } : {}),
        });
      }
    }
  }

  return orderItems;
}
