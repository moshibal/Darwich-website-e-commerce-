import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const forgetPasswordSlice = createSlice({
  name: "forgetPasswordSlice",
  initialState: { loading: false, success: false, error: "" },
  reducers: {
    forgetpasswordLoading: (state) => {
      state.loading = true;
    },
    forgetpasswordSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    forgetpasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgetpasswordReset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
    },
  },
});
export const {
  forgetpasswordLoading,
  forgetpasswordSuccess,
  forgetpasswordFail,
  forgetpasswordReset,
} = forgetPasswordSlice.actions;
export const submitForgetpassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(forgetpasswordLoading());
      //send the email to backend
      const { data } = await axios.post("/api/users/forgotPassword", email);
      if (data.status === "success") {
        dispatch(forgetpasswordSuccess());
      }
    } catch (error) {
      if (error.response.data) {
        dispatch(forgetpasswordFail(error.response.data.message));
      } else {
        dispatch(forgetpasswordFail(error.message));
      }
    }
  };
};
export default forgetPasswordSlice.reducer;
