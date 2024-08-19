import { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog.jsx";
import AddBlog from "./AddBlog.jsx";
import Togglable from "./Togglable.jsx";
import PropTypes from "prop-types";
import Navigation from "./Navigation.jsx";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Users from "./Users.jsx";
import User from "./User.jsx";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();
const blogStyle = {
  border: "solid",
  borderWidth: 1,
};
  return (
    <>
      <Navigation />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <AddBlog blogFormRef={blogFormRef} />
                </Togglable>
                  {blogs.map((blog) => (
                <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>
                      <p>{blog.title}</p>
                    </Link>
                </div>
                  ))}
              </>
            }
          />
          <Route path="/blogs/:blogId" element={<Blog />}></Route>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />}></Route>
        </Routes>
      </div>
    </>
  );
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Blogs;
