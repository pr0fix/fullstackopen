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
        style={{ display: "flex" }}
        id="commentBlogForm"
        onSubmit={handleCommentSubmit}
      >
        <div>
          <input
            type="text"
            name="content"
            id="content"
            data-testid="content"
            placeholder="write comment here"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">add comment</button>
        </div>
      </form>
    </>
  );
};

export default CommentBlog;
