import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const subscribtionSlice = createSlice({
  name: "subscribe",
  initialState: {
    loading: false,
    success: false,
    successmessage: "",
    errormessage: "",
  },
  reducers: {
    subRequest(state) {
      state.loading = true;
    },
    subSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.successmessage = action.payload;
      state.errormessage = "";
    },
    subFail(state, action) {
      state.loading = false;
      state.successmessage = "";

      state.errormessage = action.payload;
    },
  },
});

export const { subRequest, subSuccess, subFail } = subscribtionSlice.actions;
export const subscribe = (email) => {
  return async (dispatch) => {
    try {
      dispatch(subRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "/api/subscribtion",
        {
          email,
        },
        config
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch(subSuccess(res.data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(subFail(error.response?.data?.message || error.message));
    }
  };
};

export default subscribtionSlice.reducer;
