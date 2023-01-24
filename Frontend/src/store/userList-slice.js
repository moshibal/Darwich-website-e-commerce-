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
        "/api/users",

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

//deleting the user
export const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {},
  reducers: {
    userDeleteRequest(state) {
      state.loading = true;
    },
    userDeleteSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },
    userDeleteFail(state, action) {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
const { userDeleteFail, userDeleteRequest, userDeleteSuccess } =
  userDeleteSlice.actions;
export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userDeleteRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/users/${id}`,

        config
      );

      dispatch(userDeleteSuccess(data));

      dispatch(fetchUsersList());
    } catch (error) {
      dispatch(
        userDeleteFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
//updating the user
export const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: { loading: false, success: false, error: "" },
  reducers: {
    userUpdateRequest(state) {
      state.loading = true;
    },
    userUpdateSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    userUpdateFail(state, action) {
      state.loading = false;
      state.error = action.payload.message;
    },
    userUpdateReset(state) {
      state.success = false;
    },
  },
});
export const {
  userUpdateFail,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateReset,
} = userUpdateSlice.actions;
export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userUpdateRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/users/${user._id}`,
        user,
        config
      );
      if (data) {
        dispatch(userUpdateSuccess());

        dispatch(fetchUsersList());
      }
    } catch (error) {
      dispatch(
        userUpdateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

//fetching the user by ID
export const getUserByIDSlice = createSlice({
  name: "userById",
  initialState: { loading: false, user: {}, success: false, error: "" },
  reducers: {
    userByIDRequest(state) {
      state.loading = true;
    },
    userByIDSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    userByIDFail(state, action) {
      state.loading = false;
      state.error = action.payload.message;
    },
    userByIDReset(state) {
      state.success = false;
    },
  },
});
export const { userByIDFail, userByIDRequest, userByIDSuccess, userByIDReset } =
  getUserByIDSlice.actions;
export const getUserById = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userByIDRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/users/${id}`,

        config
      );
      if (data) {
        dispatch(userByIDSuccess(data));
      }
    } catch (error) {
      dispatch(
        userByIDFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userListSlice.reducer;
