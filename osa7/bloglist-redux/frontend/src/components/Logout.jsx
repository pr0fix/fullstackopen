import React from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

export default function Logout({ setUser }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
    blogService.setToken(null);
    dispatch(setNotification("Successfully logged out", "success", 5000));
    // siirrä logout omaan reduceriin jolloin dispatchia ei tarvitse importata
  };
  return <button onClick={handleLogout}>logout</button>;
}
