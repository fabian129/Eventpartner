"use client";

import { PrintfulCartProvider } from "@/context/PrintfulCartContext";
import { PrintfulCartDrawer } from "@/components/shop/PrintfulCartDrawer";
import type { ReactNode } from "react";

/**
 * Client-side wrapper for shop functionality.
 * Provides the Printful cart context + drawer.
 */
export function ShopProvider({ children }: { children: ReactNode }) {
  return (
    <PrintfulCartProvider>
      {children}
      <PrintfulCartDrawer />
    </PrintfulCartProvider>
  );
}
