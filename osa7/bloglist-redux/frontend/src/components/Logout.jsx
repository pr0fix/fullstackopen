import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

export default function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return <button onClick={handleLogout}>logout</button>;
}
