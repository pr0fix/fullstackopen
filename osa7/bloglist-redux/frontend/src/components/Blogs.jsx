import { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog.jsx";
import AddBlog from "./AddBlog.jsx";
import Togglable from "./Togglable.jsx";
import PropTypes from "prop-types";
import Navigation from "./Navigation.jsx";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./Users.jsx";
import User from "./User.jsx";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  return (
    <>
      <Navigation />
      
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="mb-8">
                  <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
                    <AddBlog blogFormRef={blogFormRef} />
                  </Togglable>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      <Link to={`/blogs/${blog.id}`}>
                        <p className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                          {blog.title}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route path="/blogs/:blogId" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
        </Routes>
      </div>
    </>
  );
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Blogs;
