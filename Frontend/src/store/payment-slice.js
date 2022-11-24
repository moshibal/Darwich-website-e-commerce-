import { createSlice } from "@reduxjs/toolkit";
const localPayment = localStorage.getItem("paymentmethod")
  ? JSON.parse(localStorage.getItem("paymentmethod"))
  : "";
const paymentSlice = createSlice({
  name: "payment",
  initialState: { paymentmethod: localPayment },
  reducers: {
    togglepayment(state, action) {
      state.paymentmethod = action.payload;
    },
  },
});
export const { togglepayment } = paymentSlice.actions;
export const paymentAction = (payment) => {
  return async (dispatch, getState) => {
    //add the state
    dispatch(togglepayment(payment));
    //save in local storage

    localStorage.setItem("paymentmethod", JSON.stringify(payment));
  };
};
export default paymentSlice.reducer;
