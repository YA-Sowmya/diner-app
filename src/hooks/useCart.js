import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useCart(user) {
  const storageKey = user?.id ? `cart-${user.id}` : "cart-guest";
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse localStorage cart:", e);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  useEffect(() => {
    const syncToSupabase = async () => {
      if (!user) return;

      const { error } = await supabase
        .from("orders")
        .upsert({ user_id: user.id, cart: items }, { onConflict: ["user_id"] });

      if (error) {
        console.error("Supabase cart sync error:", error.message);
      }
    };

    syncToSupabase();
  }, [user, items]);

  const addToCart = (dish) => {
    if (!dish.id) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (id, removeAll = false) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: removeAll ? 0 : item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
  };
}
