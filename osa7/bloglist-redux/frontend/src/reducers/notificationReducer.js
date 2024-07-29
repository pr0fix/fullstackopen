import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: "", status: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState
    }
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (text, status, timeout) => {
  return (dispatch) => {
    dispatch(showNotification({ text, status }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

export default notificationSlice.reducer;
