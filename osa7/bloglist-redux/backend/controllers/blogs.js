const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  });

  if (!blog.title || !blog.url) {
    return response
      .status(400)
      .json({ error: "Title and/or url are required" });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === request.user.id) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({ error: "unauthorized request to delete blog" });
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const content = request.body.content;

  if (!content) {
    return response.status(404).json({ error: "comment content is required" });
  }

  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }
    blog.comments.push(content);
    const updatedBlog = await blog.save();
    response.status(201).json(updatedBlog);
  } catch (e) {
    response.status(500).json({ error: "error in commenting blog" });
  }
});

module.exports = blogsRouter;
