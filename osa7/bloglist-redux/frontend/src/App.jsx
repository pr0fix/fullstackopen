import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ShowNotification from "./components/ShowNotification";
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import "./index.css";
import { initializeBlogs } from "./reducers/blogReducer";
import Blogs from "./components/Blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);


  // const updateBlog = async (blogObject) => {
  //   try {
  //     const blogToUpdate = blogs.find((blog) => blog.id === blogObject.id);

  //     const updatedBlog = {
  //       ...blogToUpdate,
  //       likes: blogToUpdate.likes + 1,
  //     };

  //     await blogService.updateBlog(blogObject.id, updatedBlog);
  //     setBlogs(
  //       blogs.map((blog) => (blog.id === blogObject.id ? updatedBlog : blog))
  //     );
  //   } catch (err) {
  //     dispatch(setNotification("error in updating blog", "error", 5000));
  //   }
  // };

  // const deleteBlog = async (blogObject) => {
  //   try {
  //     if (
  //       window.confirm(
  //         `Remove blog ${blogObject.title} by ${blogObject.author}`
  //       )
  //     ) {
  //       await blogService.deleteBlog(blogObject.id);
  //       setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
  //       dispatch(setNotification("blog deleted successfully", "success", 5000));
  //     }
  //   } catch (err) {
  //     dispatch(setNotification("error in deleting blog", "error", 5000));
  //     console.error(err);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(setNotification(`logged in as ${user.name}`, "success", 5000));
    } catch (err) {
      dispatch(setNotification("wrong username or password", "error", 5000));
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
    blogService.setToken(null);
    dispatch(setNotification("successfully logged out", "success", 5000));
  };

  return (
    <>
      <ShowNotification />

      {!user && (
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}

      {user && (
        <div>
          <h1>blogs</h1>
          <p>
            {user.name} logged in {<Logout handleLogout={handleLogout} />}
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <AddBlog blogFormRef={blogFormRef}/>
          </Togglable>

          <Blogs/>
        </div>
      )}
    </>
  );
};

export default App;
