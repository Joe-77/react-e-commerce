import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);

      if (product) {
        product.quantity += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });

        toast.success("Item Added Successfully");
      }
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      toast.success("Item Deleted Successfully");
    },
    payNow: (state) => {
      state.cart = [];
      toast.success("Payment Successfully");
    },
  },
});

export const selectCart = (state) => state.cart.cart;
export const { addToCart, deleteItem, payNow } = cartSlice.actions;
export default cartSlice.reducer;
