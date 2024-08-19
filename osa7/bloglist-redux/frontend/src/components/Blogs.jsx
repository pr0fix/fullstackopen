import { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog.jsx";
import AddBlog from "./AddBlog.jsx";

import Togglable from "./Togglable.jsx";
import PropTypes from "prop-types";
import Navigation from "./Navigation.jsx";
import { Route, Routes } from "react-router-dom";
import Users from "./Users.jsx";
import User from "./User.jsx";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();
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
                  <Blog key={blog.id} blog={blog} />
                ))}
              </>
            }
          />
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
