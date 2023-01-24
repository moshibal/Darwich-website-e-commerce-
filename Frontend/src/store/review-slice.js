import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState: {},
  reducers: {
    reviewLoading: (state) => {
      state.loading = true;
    },
    reviewSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    reviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    reviewReset: (state, action) => {
      state = {};
    },
  },
});
export const { reviewFail, reviewLoading, reviewReset, reviewSuccess } =
  reviewSlice.actions;
export const postReview = (productId, reviewObject) => {
  return async (dispatch, getState) => {
    try {
      dispatch(reviewLoading());
      //userInfo for sending making sure authenticated user are only reviewing.
      const { userInfo } = getState().user;
      //configure the headers to send the data

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      await axios.post(
        `/api/products/${productId}/review`,
        reviewObject,
        config
      );
      dispatch(reviewSuccess());
    } catch (error) {
      dispatch(
        reviewFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
export default reviewSlice.reducer;
