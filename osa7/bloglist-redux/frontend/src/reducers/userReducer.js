import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const getUser = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      dispatch(setUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification(`Logged in as ${user.name}`, "success", 5000));
    } catch (e) {
      dispatch(setNotification("Wrong username or password", "error", 5000));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(clearUser());
    dispatch(setNotification("Successfully logged out", "success", 5000));
  };
};

export default userSlice.reducer;
