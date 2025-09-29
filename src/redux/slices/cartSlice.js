import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: storedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          // ✅ Force price to Number (fallback 0 if invalid)
          price: Number(action.payload.price) || 0,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        // ✅ also make sure price is number
        item.price = Number(item.price) || 0;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        // ✅ ensure price is number
        item.price = Number(item.price) || 0;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
