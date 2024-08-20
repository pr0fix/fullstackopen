import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className="w-96 p-6 shadow-lg bg-white rounded">
          <h2 className="text-3xl block text-center font-semibold">
            Log in to application
          </h2>
          <hr className="mt-3" />
          <form onSubmit={handleLogin}>
            <div className="mt-3">
              <label htmlFor="username" className="block text-base mb-2">
                Username
              </label>
              <input
                type="text"
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Username..."
                value={username}
                name="Username"
                data-testid="username"
                onChange={({ target }) => setUsername(target.value)}
              ></input>
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <input
                type="password"
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Password..."
                value={password}
                name="Password"
                data-testid="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className="mt-5">
              <button type="submit" className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">Login</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}
