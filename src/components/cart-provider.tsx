"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  listingId: string;
  title: string;
  priceNgn: number;
  photoUrl: string;
  size: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  totalNgn: number;
  addItem: (item: CartItem) => void;
  removeItem: (listingId: string, size: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "jara-cart-v1";

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CartItem =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as CartItem).listingId === "string" &&
        typeof (entry as CartItem).title === "string" &&
        typeof (entry as CartItem).priceNgn === "number" &&
        typeof (entry as CartItem).size === "string",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : load(),
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or unavailable. Cart still works for the session.
    }
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      if (current.some((entry) => entry.listingId === item.listingId && entry.size === item.size)) {
        return current;
      }
      return [...current, item];
    });
  }, []);

  const removeItem = useCallback((listingId: string, size: string) => {
    setItems((current) => current.filter((entry) => !(entry.listingId === listingId && entry.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      count: items.length,
      totalNgn: items.reduce((sum, entry) => sum + entry.priceNgn, 0),
      addItem,
      removeItem,
      clear,
    };
  }, [items, addItem, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const cart = useContext(CartContext);
  if (cart === null) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
