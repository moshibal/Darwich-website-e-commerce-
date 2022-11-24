import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productSlice = createSlice({
  name: "productlists",
  initialState: { products: [], loading: false, message: null },
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.products = [];
    },
    productSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
    },
    productFail(state, action) {
      state.loading = false;
      state.products = [];
      state.message = action.payload.message;
    },
  },
});

export const { productFail, productSuccess, productRequest } =
  productSlice.actions;
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productRequest());
      const { data } = await axios.get("http://localhost:4000/products");

      const products = data;
      dispatch(productSuccess({ products }));
    } catch (error) {
      dispatch(productFail({ message: "failed to fetch the products" }));
    }
  };
};
export default productSlice.reducer;
