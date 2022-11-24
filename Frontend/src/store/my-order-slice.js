import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const myOrderSlice = createSlice({
  name: "my-order",
  initialState: { orders: [], loading: true, success: false },
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
        "http://localhost:4000/orders/myorders",

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

export default myOrderSlice.reducer;
