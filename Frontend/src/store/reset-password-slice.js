import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const resetpasswordSlice = createSlice({
  name: "resetpasswordSlice",
  initialState: { loading: false, success: false, error: "" },
  reducers: {
    resetPasswordLoading: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    resetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordReset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
    },
  },
});
export const {
  resetPasswordLoading,
  resetPasswordSuccess,
  resetPasswordFail,
  resetPasswordReset,
} = resetpasswordSlice.actions;
export const submitResetpassword = (passwordChangeObject, token) => {
  return async (dispatch) => {
    try {
      dispatch(resetPasswordLoading());
      //send the email to backend
      const { data } = await axios.patch(
        `/api/users/resetPassword/${token}`,
        passwordChangeObject
      );

      if (data.status === "success") {
        dispatch(resetPasswordSuccess());
      }
    } catch (error) {
      if (error.response.data) {
        dispatch(resetPasswordFail(error.response.data.message));
      } else {
        dispatch(resetPasswordFail(error.message));
      }
    }
  };
};
export default resetpasswordSlice.reducer;
