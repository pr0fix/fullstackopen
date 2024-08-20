import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { useState } from "react";

export default function AddBlog({ blogFormRef }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const addBlog = (e) => {
    e.preventDefault();
    dispatch(createBlog(title, author, url, blogFormRef));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={addBlog} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            data-testid="title"
            placeholder="Write blog title here"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-lg font-medium">
            Author:
          </label>
          <input
            type="text"
            name="author"
            id="author"
            data-testid="author"
            placeholder="Write blog author here"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-lg font-medium">
            URL:
          </label>
          <input
            type="text"
            name="url"
            id="url"
            data-testid="url"
            placeholder="Write blog URL here"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className=" bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

AddBlog.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
};
