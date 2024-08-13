import { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog.jsx";
import AddBlog from "./AddBlog.jsx";
import Logout from "./Logout.jsx";
import Togglable from "./Togglable.jsx";
import PropTypes from "prop-types";
import Users from "./Users.jsx";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();
  return (
    <>
      <div>
        <h1>Blogs</h1>
        <p>
          {user.name} logged in <Logout />
        </p>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <AddBlog blogFormRef={blogFormRef} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Blogs;
