"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  createCart,
  addToCart,
  updateCartLine,
  removeFromCart,
  type ShopifyCart,
  type ShopifyCartLine,
} from "@/lib/shopify";

// ─── Types ──────────────────────────────────────────────────────
interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number, attributes?: { key: string; value: string }[]) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────────
const CART_ID_KEY = "ep-shopify-cart-id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart from localStorage or create new
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (!savedCartId) return;

    // We'll create a fresh cart on first add if needed
    // For now just store the ID reference
  }, []);

  const ensureCart = useCallback(async (): Promise<ShopifyCart> => {
    if (cart) return cart;

    setIsLoading(true);
    try {
      const newCart = await createCart();
      setCart(newCart);
      localStorage.setItem(CART_ID_KEY, newCart.id);
      return newCart;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1, attributes?: { key: string; value: string }[]) => {
      setIsLoading(true);
      try {
        const currentCart = await ensureCart();
        const updatedCart = await addToCart(currentCart.id, variantId, quantity, attributes);
        setCart(updatedCart);
        localStorage.setItem(CART_ID_KEY, updatedCart.id);
        setIsOpen(true); // Open cart drawer when item added
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [ensureCart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updatedCart = await updateCartLine(cart.id, lineId, quantity);
        setCart(updatedCart);
      } catch (error) {
        console.error("Failed to update cart item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updatedCart = await removeFromCart(cart.id, lineId);
        setCart(updatedCart);
      } catch (error) {
        console.error("Failed to remove cart item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        totalQuantity: cart?.totalQuantity ?? 0,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
