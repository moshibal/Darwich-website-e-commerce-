import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: true,
    success: false,
    orderidObject: {},
    error: null,
  },
  reducers: {
    orderRequest(state, action) {
      state.loading = true;
    },
    orderCreateSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.error = null;
      state.orderidObject = action.payload;
    },

    orderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const { orderRequest, orderCreateSuccess, orderFail } = orderSlice.actions;
//action for creating the order in the database.
export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderRequest);
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.post("/api/orders", order, config);

      dispatch(orderCreateSuccess(data));
    } catch (error) {
      dispatch(
        orderFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default orderSlice.reducer;
