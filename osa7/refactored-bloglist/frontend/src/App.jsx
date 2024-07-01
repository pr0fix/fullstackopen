import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ShowNotification from "./components/ShowNotification";
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  const showNotification = (text, status, timeout) => {
    setMessage({ text, status, timeout });
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      const newBlog = {
        ...createdBlog,
        user: { username: user.username, name: user.name, id: user.id },
      };
      setBlogs(blogs.concat(newBlog));
      showNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        "success",
        3000
      );
      blogFormRef.current.toggleVisibility();
    } catch (err) {
      showNotification("error in adding a new blog", "error", 3000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === blogObject.id);

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };

      await blogService.updateBlog(blogObject.id, updatedBlog);
      setBlogs(
        blogs.map((blog) => (blog.id === blogObject.id ? updatedBlog : blog))
      );
    } catch (err) {
      showNotification("error in updating blog", "error", 3000);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogObject.title} by ${blogObject.author}`
        )
      ) {
        await blogService.deleteBlog(blogObject.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        showNotification("blog deleted successfully", "success", 3000);
      }
    } catch (err) {
      showNotification("error in deleting blog", "error", 3000);
      console.error(err);
    }
  };

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
      showNotification(`logged in as ${user.name}`, "success", 3000);
    } catch (err) {
      showNotification("wrong username or password", "error", 3000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
    blogService.setToken(null);
    showNotification("successfully logged out", "success", 3000);
  };

  return (
    <>
      <ShowNotification message={message} setMessage={setMessage} />

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
            <AddBlog createBlog={addBlog} />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={() => updateBlog(blog)}
                deleteBlog={() => deleteBlog(blog)}
                user={user}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default App;
