import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let cartItemsLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const cartSlice = createSlice({
  name: "cart",
  initialState: { cartLists: cartItemsLocalStorage, totalQuantity: null },
  reducers: {
    addToCart(state, action) {
      //check if the item exists or not
      const existingItem = state.cartLists.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.qty = action.payload.qty;
      } else {
        state.cartLists.push(action.payload);
        state.totalQuantity = state.totalQuantity + 1;
      }
    },
    removeFromCart(state, action) {
      state.cartLists = state.cartLists.filter(
        (item) => item.id !== action.payload.id
      );
      state.totalQuantity = state.totalQuantity - 1;
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartRequest = (productId, qty) => {
  return async (dispatch, getState) => {
    try {
      const cartLists = getState().cart.cartLists;
      const checkProductAvailable = cartLists.find(
        (item) => item.id === productId
      );

      if (checkProductAvailable) {
        dispatch(addToCart({ ...checkProductAvailable, qty: qty }));
      }
      const { data } = await axios.get(
        `http://localhost:4000/products/${productId}`
      );
      console.log(data);

      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          imageUri: data.imageUri,
          price: data.price,
          qty: qty,
        })
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartLists)
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteItem = (id) => {
  return (dispatch, getState) => {
    dispatch(removeFromCart({ id }));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartLists)
    );
  };
};
export default cartSlice.reducer;