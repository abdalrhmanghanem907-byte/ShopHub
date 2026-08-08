import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart store with localStorage persistence
const useCartStore = create(
  persist(
    (set, get) => ({
      // items: [{ id, name, price, image, quantity }]
      items: [],

      // Add a product to the cart (or increase quantity if it already exists)
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.id === String(product.id)
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === String(product.id)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: String(product.id),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
              },
            ],
          };
        }),

      // Remove an item from the cart
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== String(productId)
          ),
        })),

      // Set a specific quantity for an item
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === String(productId)
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      // Increase quantity by 1
      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === String(productId)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // Decrease quantity by 1 (never below 1)
      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === String(productId)
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        })),

      // Clear the entire cart
      clearCart: () => set({ items: [] }),

      // Total number of items (sum of all quantities)
      getCartItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      // Subtotal (sum of price × quantity)
      getSubtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "shophub_cart",
    }
  )
);

export default useCartStore;
