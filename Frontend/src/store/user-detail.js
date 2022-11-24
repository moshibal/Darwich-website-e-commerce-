import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { userDetails: {}, loading: false, success: false };
const userDetailSlice = createSlice({
  name: "userDetailSlice",
  initialState: initialState,
  reducers: {
    userRequest(state) {
      state.loading = true;
    },
    userSuccess(state, action) {
      state.loading = false;
      state.userDetails = action.payload.userdetails;
      state.success = true;
    },
    userFail(state, action) {
      state.loading = false;
      state.userDetails = {};
      state.message = action.payload.message;
    },
  },
});
const { userRequest, userSuccess, userFail } = userDetailSlice.actions;
export const getUserDetails = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(userRequest());
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:4000/users/me",
        config
      );

      const userdetails = data;

      dispatch(userSuccess({ userdetails }));
    } catch (error) {
      dispatch(userFail({ message: "failed to fetch the products" }));
    }
  };
};
export const updateProfile = (updatingdata = null, updatePassword = null) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userRequest());
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      if (updatingdata) {
        const { data } = await axios.patch(
          "http://localhost:4000/users/updateMe",
          updatingdata,
          config
        );
        const userdetails = data;
        dispatch(userSuccess({ userdetails }));
      }

      if (updatePassword) {
        const { data } = await axios.patch(
          "http://localhost:4000/users/updatePassword",
          updatePassword,
          config
        );
        const userdetails = data;
        dispatch(userSuccess({ userdetails }));
      }
    } catch (error) {
      dispatch(userFail({ message: "failed to fetch the products" }));
    }
  };
};

export default userDetailSlice.reducer;
