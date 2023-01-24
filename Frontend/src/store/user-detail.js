import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./login-slice";
const initialState = {
  userDetails: {},
  loading: false,
  success: false,
  profileUpdateSuccess: false,
};
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
      state.error = action.payload.error;
    },
    userProfileUpdate(state, action) {
      state.loading = false;
      state.userDetails = action.payload.userdetails;
      state.profileUpdateSuccess = true;
    },
  },
});
const { userRequest, userSuccess, userFail, userProfileUpdate } =
  userDetailSlice.actions;
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
      const { data } = await axios.get("/api/users/me", config);

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
          "/api/users/updateMe",
          updatingdata,
          config
        );
        const userdetails = data;
        dispatch(userProfileUpdate({ userdetails }));
        dispatch(login(updatingdata.email, updatingdata.password));
      }

      if (updatePassword) {
        const { data } = await axios.patch(
          "/api/users/updatePassword",
          updatePassword,
          config
        );
        const userdetails = data;
        dispatch(userProfileUpdate({ userdetails }));
      }
    } catch (error) {
      if (error.response.data) {
        dispatch(userFail({ error: error.response.data.message }));
      } else {
        dispatch(userFail({ error: error.message }));
      }
    }
  };
};

export default userDetailSlice.reducer;
