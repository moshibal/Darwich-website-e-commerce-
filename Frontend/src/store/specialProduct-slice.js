import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const specialProductSlice = createSlice({
  name: "specialProductSlice",
  initialState: { loading: false, message: null, products: [] },
  reducers: {
    specialProductLoading(state) {
      state.loading = true;
    },
    specialProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    specialProductFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
  },
});
const { specialProductFail, specialProductLoading, specialProductSuccess } =
  specialProductSlice.actions;
export const fetchSpecialproduct = () => {
  return async (dispatch) => {
    try {
      dispatch(specialProductLoading());
      const response = await axios.get("/api/products/special");

      if (response.status === 200 && Array.isArray(response.data)) {
        dispatch(specialProductSuccess(response.data));
      }
    } catch (error) {
      dispatch(
        specialProductFail(
          error.response?.data.message
            ? error.response?.data.message
            : error.message
        )
      );
    }
  };
};
export default specialProductSlice.reducer;
