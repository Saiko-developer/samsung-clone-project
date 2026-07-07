import { create } from "zustand";

const useVoucherStore = create((set) => ({
  items: [],
  addItem: (newItem) =>
    set((state) => {
      const data = newItem.product || newItem.item || newItem;
      const storage =
        newItem.selectedStorage !== undefined
          ? newItem.selectedStorage
          : Array.isArray(data.storage) && data.storage.length > 0
            ? data.storage[0]
            : null;
      const color =
        newItem.selectedColor !== undefined
          ? newItem.selectedColor
          : Array.isArray(data.colors) && data.colors.length > 0
            ? data.colors[0]
            : null;

      // Check if same product with same storage & color already exists
      const existingIndex = state.items.findIndex(
        (item) =>
          (item.product?.id === data.id || item.item?.id === data.id || item.id === data.id) &&
          item.selectedStorage === storage &&
          item.selectedColor === color
      );

      if (existingIndex >= 0) {
        // Same item exists — increment quantity
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (newItem.quantity ?? 1),
        };
        return { items: updated };
      }

      // Different item — add new entry
      return {
        items: [
          ...state.items,
          {
            ...newItem,
            quantity: newItem.quantity ?? 1,
            selectedStorage: storage,
            selectedColor: color,
          },
        ],
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),
  updateStorage: (id, storage) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, selectedStorage: storage } : item
      ),
    })),
  updateColor: (id, color) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, selectedColor: color } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
export default useVoucherStore;