import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog.jsx";
import AddBlog from "./AddBlog.jsx";
import Logout from "./Logout.jsx";
import Togglable from "./Togglable.jsx";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer.js";
import PropTypes from "prop-types";

const Blogs = ({ user, setUser }) => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef();

  
  return (
    <>
      <div>
        <h1>Blogs</h1>
        <p>
          {user.name} logged in <Logout setUser={setUser}/>
        </p>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <AddBlog blogFormRef={blogFormRef} />
        </Togglable>
          {blogs
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
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
