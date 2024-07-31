import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title, author, url, blogFormRef) => {
  return async (dispatch) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = {
        title, author, url
      }
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`,
          "success",
          3000))

    } catch(err) {
      dispatch(setNotification("error in adding a new blog", "error", 5000));
    }
  };
};

export default blogSlice.reducer;
