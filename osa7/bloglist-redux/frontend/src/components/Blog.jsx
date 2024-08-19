import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentBlog from "./CommentBlog";

const Blog = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  if (!blog || !user) {
    return null;
  }

  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} {blog.author}{" "}
        </h2>
      </div>

      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>added by {blog.user?.name}</div>
        {blog.user.username === user.username && (
          <div>
            <button onClick={() => handleDelete(blog)}>delete</button>
          </div>
        )}
      </div>
      <div>
        <h3>comments</h3>
        <CommentBlog blog={blog} />
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
