import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";

const CommentBlog = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog, comment));
    setComment("");
  };
  return (
    <>
      <form
        className="flex "
        id="commentBlogForm"
        onSubmit={handleCommentSubmit}
      >
        <div>
          <input
            type="text"
            name="content"
            id="content"
            data-testid="content"
            placeholder="Write comment here..."
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></input>
        
          <button
            className="bg-blue-500 text-white rounded-md p-1 border shadow hover:shadow-lg transition-shadow"
            type="submit"
            >
            Submit
          </button>
            </div>
        
      </form>
    </>
  );
};

export default CommentBlog;
