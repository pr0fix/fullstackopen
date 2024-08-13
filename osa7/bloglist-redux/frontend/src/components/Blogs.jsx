import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog.jsx";
import AddBlog from "./AddBlog.jsx";
import Logout from "./Logout.jsx";
import Togglable from "./Togglable.jsx";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";
import PropTypes from "prop-types";

const Blogs = ({ user, setUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
    blogService.setToken(null);
    dispatch(setNotification("Successfully logged out", "success", 5000));
  };

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
      dispatch(initializeBlogs());
    } catch (e) {
      dispatch(setNotification("Error in liking blog", "error", 5000));
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id);
        dispatch(initializeBlogs());
        dispatch(setNotification("Blog deleted successfully", "success", 5000));
      }
    } catch (e) {
      dispatch(setNotification("Error in deleting blog", "error", 5000));
    }
  };

  return (
    <>
      <div>
        <h1>Blogs</h1>
        <p>
          {user.name} logged in <Logout handleLogout={handleLogout} />
        </p>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <AddBlog blogFormRef={blogFormRef} />
        </Togglable>
          {blogs
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
    </>
  );
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Blogs;
