import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const myOrderSlice = createSlice({
  name: "my-order",
  initialState: { orders: [], loading: false, success: false },
  reducers: {
    myorderRequest(state, action) {
      state.loading = true;
    },
    myorderSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.orders = action.payload;
    },

    myorderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const { myorderFail, myorderRequest, myorderSuccess } = myOrderSlice.actions;
export const listMyOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(myorderRequest);
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.get(
        "/api/orders/myorders",

        config
      );

      dispatch(myorderSuccess(data.orders));
    } catch (error) {
      dispatch(
        myorderFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
//get all the orders
export const allOrderSlice = createSlice({
  name: "all-order",
  initialState: { orders: [], loading: false, success: false },
  reducers: {
    allorderRequest(state, action) {
      state.loading = true;
    },
    allorderSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.orders = action.payload;
    },

    allorderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const { allorderFail, allorderRequest, allorderSuccess } =
  allOrderSlice.actions;
export const fetchAllOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(allorderRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.get(
        "/api/orders",

        config
      );

      dispatch(allorderSuccess(data.orders));
    } catch (error) {
      dispatch(
        allorderFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default myOrderSlice.reducer;
