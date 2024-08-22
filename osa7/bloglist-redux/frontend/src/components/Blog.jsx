import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommentBlog from "./CommentBlog";

const Blog = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate("/");
    }
  };

  if (!blog || !user) {
    return null;
  }

  return (
    <div className="flex flex-col text-xl gap-10">
      <div>
        <h2 className="font-bold">
          {blog.title} {blog.author}{" "}
        </h2>
        <div>
          <a
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            href={blog.url}
          >
            {blog.url}
          </a>
        </div>
        <div>
          <span className="font-medium">Likes: {blog.likes} </span>
          <button
            className="bg-blue-500 text-white rounded-md p-1 border shadow hover:shadow-lg transition-shadow"
            onClick={() => handleLike(blog)}
          >
            Like
          </button>
        </div>
        <div className="font-medium">Added by {blog.user?.name}</div>
        <div>
          {blog.user.username === user.username && (
            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleDelete(blog)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Comments</h3>
        <CommentBlog blog={blog} />
        {blog.comments && blog.comments.length > 0 && (
          <ul className="border border-gray-300 rounded-md p-4 bg-gray-100 w-fit max-w-full">
            {blog.comments?.map((comment, index) => (
              <li key={index} className="mb-2">
                {comment}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Blog;
