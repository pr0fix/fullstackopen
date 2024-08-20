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

  return (
    <button
      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
