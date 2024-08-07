import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <div>
            {blog.title} {blog.author}
          </div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>likes {blog.likes}</div>
        </div>
      ))}
    </>
  );
};

export default Blogs;
