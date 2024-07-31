import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div>{blog.title}</div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
        </div>
      ))}
    </>
  );
};

export default Blogs;
