import { createSlice } from "@reduxjs/toolkit";
const getShippingLocal = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const shippingSlice = createSlice({
  name: "shipping Slice",
  initialState: { shippingAddress: getShippingLocal },
  reducers: {
    changeShipping(state, action) {
      state.shippingAddress = { ...action.payload };
    },
  },
});
export const { changeShipping } = shippingSlice.actions;
export const shippingObject = (shipObj) => {
  return async (dispatch, getState) => {
    dispatch(changeShipping(shipObj));
    // set the shipping address to the local storage
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(getState().shipping.shippingAddress)
    );
  };
};
export default shippingSlice.reducer;
