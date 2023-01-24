import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderPaySlice = createSlice({
  name: "order-payment",
  initialState: {},
  reducers: {
    orderPayRequest(state, action) {
      state.loading = true;
    },
    orderPaySuccess(state, action) {
      state.success = true;
      state.loading = false;
    },

    orderPayFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderPayReset(state) {
      state.success = false;
      state.loading = false;
    },
  },
});
export const { orderPayFail, orderPayRequest, orderPaySuccess, orderPayReset } =
  orderPaySlice.actions;
//action for paying the order
export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderPayRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      if (data) {
        dispatch(orderPaySuccess());
      }
    } catch (error) {
      dispatch(
        orderPayFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
//order deliver slice
export const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: {
    orderDeliverRequest(state, action) {
      state.loading = true;
    },
    orderDeliverSuccess(state, action) {
      state.success = true;
      state.loading = false;
    },

    orderDeliverFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderDeliverReset(state) {
      state.success = false;
      state.loading = false;
    },
  },
});
export const {
  orderDeliverFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverReset,
} = orderDeliverSlice.actions;
//action for paying the order
export const deliverOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderDeliverRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/deliver`,

        config
      );
      if (data) {
        dispatch(orderDeliverSuccess());
      }
    } catch (error) {
      dispatch(
        orderDeliverFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
export default orderPaySlice.reducer;
