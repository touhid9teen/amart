"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

type CartContextType = {
  cartCount: number;
  setCartCount: (count: number) => void;
  cartItems: { [key: string]: unknown };
  setCartItems: (items: { [key: string]: unknown }) => void;
  totalAmount: number;
  updateCart: (updatedItems: { [key: string]: unknown }) => void;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
  cartItems: {},
  setCartItems: () => {},
  totalAmount: 0,
  updateCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<{ [key: string]: unknown }>({});
  const [totalAmount, setTotalAmount] = useState(0);

  // Load from localStorage initially
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items") || "{}");

    let count = 0;
    let total = 0;

    for (const id in storedItems) {
      const item = storedItems[id];
      count += item.quantity;
      total += item.quantity * item.sellingPice;
    }
    count = Math.floor(count);
    total = Math.floor(total);

    setCartItems(storedItems);
    setCartCount(count);
    setTotalAmount(total);
  }, []);

  const saveItem = (item: CartItem) => ({
    id: item.id,
    name: item.name,
    sellingPice: item.sellingPice,
    quantity: item.quantity,
    image: item.image || undefined,
    // weight: item?.ItemQuantityType,

  });

  const updateCart = (updatedItems: { [key: string]: CartItem }) => {
    let count = 0;
    let total = 0;

    const saveItems: { [key: string]: CartItem } = {};

    for (const id in updatedItems) {
      const item = updatedItems[id];

      const clean = saveItem(item);
      saveItems[id] = clean;

      count += clean.quantity;
      total += clean.quantity * clean.sellingPice;
    }

    setCartItems(saveItems);
    setCartCount(count);
    setTotalAmount(total);

    localStorage.setItem("items", JSON.stringify(saveItems));
    localStorage.setItem("count", String(count));
    localStorage.setItem("total", String(total));
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        totalAmount,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
