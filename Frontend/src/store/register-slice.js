import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess } from "./login-slice";

const registerSlice = createSlice({
  name: "registerInfo",
  initialState: {
    userInfo: {},
    loading: false,
    message: "",
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.userData;
    },
    registerFail(state, action) {
      state.loading = false;
      state.message = action.payload.message;
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
        "http://localhost:4000/users/signup",
        registerObject,
        config
      );
      console.log(data);
      dispatch(registerSuccess({ userData: data }));
      dispatch(loginSuccess({ userData: data }));
      localStorage.setItem(
        "userInformation",
        JSON.stringify(getState().user.userInfo)
      );
    } catch (error) {
      dispatch(registerFail({ message: "user register failed" }));
    }
  };
};

export default registerSlice.reducer;
