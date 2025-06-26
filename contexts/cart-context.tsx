"use client";

import { getEndpoint } from "@/lib/endpoint";
import { handleError, handleSuccess } from "@/lib/request";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartContextType = {
  cartCount: number;
  setCartCount: (count: number) => void;
  cartItems: { [key: string]: AnyType };
  setCartItems: (items: { [key: string]: AnyType }) => void;
  totalAmount: number;
  updateCart: (updatedItems: { [key: string]: AnyType }) => void;
  removeAllItemsFromCart: (authToken: AuthToken) => Promise<unknown>;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
  cartItems: {},
  setCartItems: () => {},
  totalAmount: 0,
  updateCart: () => {},
  removeAllItemsFromCart: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<{ [key: string]: AnyType }>({});
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

  const saveItem = (item: AnyType) => ({
    id: item.id,
    name: item.name,
    sellingPice: item.sellingPice,
    quantity: item.quantity,
    image: item.image || null,
  });

  const updateCart = (updatedItems: { [key: string]: AnyType }) => {
    let count = 0;
    let total = 0;

    const saveItems: { [key: string]: AnyType } = {};

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

  const removeAllItemsFromCart = async (authToken: AuthToken) => {
    try {
      const endpoint = await getEndpoint("removeAllCartItems");

      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setCartItems({});
      setCartCount(0);
      setTotalAmount(0);
      localStorage.removeItem("items");
      localStorage.removeItem("count");
      localStorage.removeItem("total");

      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
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
        removeAllItemsFromCart,
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
