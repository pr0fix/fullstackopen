import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return <button onClick={handleLogout}>logout</button>;
}
