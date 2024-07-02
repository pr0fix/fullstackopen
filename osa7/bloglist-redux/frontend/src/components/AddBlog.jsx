import React, { useState } from "react";
import PropTypes from "prop-types";

export default function AddBlog({ createBlog }) {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const addBlog = (e) => {
    e.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>create new</h2>
      <form id="addBlogForm" onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            id="title"
            data-testid="title"
            placeholder="write blog title here"
            value={newBlog.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            name="author"
            id="author"
            data-testid="author"
            placeholder="write blog author here"
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            name="url"
            id="url"
            data-testid="url"
            placeholder="write blog url here"
            value={newBlog.url}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
}

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
