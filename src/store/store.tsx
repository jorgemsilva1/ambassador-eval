import { CartItem } from "@/types/cart";
import { ProductInventory } from "@/types/productInventory";
import {  UserProfile } from "@/types/userProfile";
import { create } from "zustand";

export interface StoreState {
  cart: CartItem[];
  userProfile: UserProfile;
  inventory: ProductInventory[];
  addToInventory: (productInventory: ProductInventory) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  updateUser: (user: UserProfile) => void;
}

const useStore = create<StoreState>((set) => ({
  cart: [],
  userProfile: {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St",
  },
  inventory: [],
  addToInventory(product) {
    set((state) => {
      const existingProductIndex = state.inventory.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedInventory = [...state.inventory];
        updatedInventory[existingProductIndex] = {
          ...updatedInventory[existingProductIndex],
          quantity:
            updatedInventory[existingProductIndex].quantity + product.quantity,
        };
        return { inventory: updatedInventory };
      } else {
        return { inventory: [...state.inventory, product] };
      }
    });
  },
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      ),
    })),
  clearCart: () => set({ cart: [] }),
  updateUser: (updatedUser) =>
    set((state) => ({ userProfile: { ...state.userProfile, ...updatedUser } })),
}));

export default useStore;
