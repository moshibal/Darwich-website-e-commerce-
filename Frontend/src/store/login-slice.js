import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let userInfoLocalStorage = localStorage.getItem("userInformation")
  ? JSON.parse(localStorage.getItem("userInformation"))
  : {};
const userSlice = createSlice({
  name: "userInfo",
  initialState: { userInfo: userInfoLocalStorage, loading: false, message: "" },
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.userData;
    },
    loginFail(state, action) {
      state.loading = false;

      state.message = action.payload.message;
    },
    deleteUser(state) {
      state.userInfo = {};
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, deleteUser } =
  userSlice.actions;
export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loginRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      dispatch(loginSuccess({ userData: data }));
      localStorage.setItem(
        "userInformation",
        JSON.stringify(getState().user.userInfo)
      );
    } catch (error) {
      dispatch(loginFail({ message: "user login failed" }));
    }
  };
};
export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.status === 200) {
        dispatch(deleteUser());
        localStorage.setItem(
          "userInformation",
          JSON.stringify(getState().user.userInfo)
        );
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
export default userSlice.reducer;
