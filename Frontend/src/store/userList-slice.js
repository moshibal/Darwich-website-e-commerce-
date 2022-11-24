import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userListSlice = createSlice({
  name: "userListInfo",
  initialState: { users: [] },
  reducers: {
    userListRequest(state) {
      state.loading = true;
    },
    userListSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    userListFail(state, action) {
      state.loading = false;

      state.error = action.payload.message;
    },
  },
});

export const { userListFail, userListRequest, userListSuccess } =
  userListSlice.actions;
export const fetchUsersList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(userListRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:4000/users",

        config
      );

      dispatch(userListSuccess(data));
    } catch (error) {
      dispatch(
        userListFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userListSlice.reducer;
