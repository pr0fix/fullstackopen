import React, { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Logged in as ${user.name}`, "success", 5000));
    } catch (e) {
      dispatch(setNotification("Wrong username or password", "error", 5000));
    }
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
