"use client";

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import type { ReactNode } from "react";

/**
 * Client-side wrapper for Shopify cart functionality.
 * Provides cart context and renders the cart drawer globally.
 */
export function ShopProvider({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
