import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess } from "./login-slice";

const registerSlice = createSlice({
  name: "registerInfo",
  initialState: {
    userInfo: {},
    loading: false,
    success: false,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload.userData;
    },
    registerFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload;
    },
  },
});

export const { registerRequest, registerFail, registerSuccess } =
  registerSlice.actions;
export const register = (registerObject) => {
  return async (dispatch, getState) => {
    try {
      dispatch(registerRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/signup",
        registerObject,
        config
      );

      dispatch(registerSuccess({ userData: data }));
      dispatch(loginSuccess({ userData: data }));
      localStorage.setItem(
        "userInformation",
        JSON.stringify(getState().user.userInfo)
      );
    } catch (error) {
      if (error.response.data) {
        dispatch(registerFail(error.response.data.message));
      } else {
        dispatch(registerFail(error.message));
      }
    }
  };
};

export default registerSlice.reducer;
