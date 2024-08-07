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
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    removeBlog(state, action) {
      const deletedBlog = action.payload;
      return state.filter((blog) => blog.id !== deletedBlog.id);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title, author, url, blogFormRef) => {
  return async (dispatch) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = {
        title,
        author,
        url,
      };
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          "success",
          3000
        )
      );
    } catch (err) {
      dispatch(setNotification("error in adding a new blog", "error", 5000));
    }
  };
};

export const likeBlog = (blog, likes) => {
  return async (dispatch) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: likes,
        user: blog.user.id,
      };
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };

      await blogService.updateBlog(blogToUpdate.id, updatedBlog);
      dispatch(updateBlog(updatedBlog));
    } catch (e) {
      dispatch(setNotification("error in liking blog", "error", 5000));
    }
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogToDelete);
      dispatch(removeBlog(blogToDelete));
      dispatch(
        setNotification(
          `Blog ${blogToDelete.title} by ${blogToDelete.author} removed successfully`,
          "success",
          5000
        )
      );
    } catch (e) {
      dispatch(setNotification(`Error in deleting blog`, "error", 5000));
    }
  };
};

export default blogSlice.reducer;
