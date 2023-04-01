// import { create } from "zustand";

// const useCartStore = create((set) => ({
//   products: [],
//   cart: [],
//   isLoading: false,
//   hasErrors: false,
//   addProductToCart: (id) => set((state) => ({ cart: [...state.cart, id] })),
//   clearCart: () => set({ cart: [] }),
//   fetchProducts: async (url) => {
//     set(() => ({ isLoading: true }));
//     try {
//       const response = await fetch(url);
//       const json = await response.json();
//       set((state) => ({ products: (state.products = json), isLoading: false }));
//       console.log(json);
//     } catch (error) {
//       set(() => ({ hasErrors: true, isLoading: false }));
//     }
//   },
// }));

// function useCart() {
//   const addProductToCart = useCartStore((state) => state.addProductToCart);
//   const products = useCartStore((state) => state.products);
//   const fetchProducts = useCartStore((state) => state.fetchProducts);
//   const isLoading = useCartStore((state) => state.isLoading);
//   const hasErrors = useCartStore((state) => state.hasErrors);
//   const cart = useCartStore((state) => state.cart);
//   const clearCart = useCartStore((state) => state.clearCart);

//   function addToCart(id) {
//     console.log("Added " + id);
//     addProductToCart(id);
//     console.log(cart);
//   }
//   function removeFromCart() {
//     console.log("Remove from cart");
//   }
//   return {
//     products,
//     cart,
//     isLoading,
//     hasErrors,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     fetchProducts,
//   };
// }

// export { useCart };

import { create } from "zustand";

const useCartStore = create((set) => ({
  products: [],
  cart: [],
  isLoading: false,
  hasErrors: false,
  addProductToCart: (id) => set((state) => ({ cart: [...state.cart, id] })),
  removeProductFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((productId) => productId !== id),
    })),
  clearCart: () => set({ cart: [] }),
  fetchProducts: async (url) => {
    set(() => ({ loading: true }));
    try {
      const response = await fetch(url);
      const json = await response.json();
      set((state) => ({ products: (state.products = json), isLoading: false }));
    } catch (error) {
      set(() => ({ hasErrors: true, isLoading: false }));
    }
  },
}));

function useCart() {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const products = useCartStore((state) => state.products);
  const fetchProducts = useCartStore((state) => state.fetchProducts);
  const isLoading = useCartStore((state) => state.isLoading);
  const hasErrors = useCartStore((state) => state.hasErrors);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  function addToCart(id) {
    addProductToCart(id);
  }
  function removeFromCart(id) {
    removeProductFromCart(id);
  }

  return {
    products,
    cart,
    isLoading,
    hasErrors,
    addToCart,
    removeFromCart,
    clearCart,
    fetchProducts,
  };
}

export { useCart };
