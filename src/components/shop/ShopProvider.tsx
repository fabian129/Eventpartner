"use client";

import { CartProvider } from "@/context/CartContext";
import { PrintfulCartProvider } from "@/context/PrintfulCartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { PrintfulCartDrawer } from "@/components/shop/PrintfulCartDrawer";
import type { ReactNode } from "react";

/**
 * Client-side wrapper for shop functionality.
 * Provides both Shopify (legacy) and Printful cart contexts.
 */
export function ShopProvider({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <PrintfulCartProvider>
        {children}
        <CartDrawer />
        <PrintfulCartDrawer />
      </PrintfulCartProvider>
    </CartProvider>
  );
}
