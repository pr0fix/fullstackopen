import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import ShowNotification from "./components/ShowNotification";
import blogService from "./services/blogs";
import { initializeBlogs } from "./reducers/blogReducer";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, user]);

  return (
    <>
      <ShowNotification/>
      {!user ? <Login setUser={setUser}/> : <Blogs user={user} setUser={setUser}/>}
    </>
  );
};

export default App;
