import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: true,
    success: false,
    orderDetails: {},
    error: null,
  },
  reducers: {
    orderRequest(state, action) {
      state.loading = true;
    },

    orderDetailSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.error = null;
      state.orderDetails = action.payload;
    },
    orderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const { orderRequest, orderDetailSuccess, orderFail } =
  orderDetailsSlice.actions;
//action for fetching the specific order
export const fetchOrder = (orderId) => {
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
      const { data } = await axios.get(
        `http://localhost:4000/orders/${orderId}`,

        config
      );

      dispatch(orderDetailSuccess(data));
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

export default orderDetailsSlice.reducer;
