const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "title",
    author: "author",
    url: "url",
    likes: "1",
    userId: "66438e39e805218e029d019f",
  },
  {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: "400",
    userId: "66438e39e805218e029d019f",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "willremovethissoon",
    url: "willremovethissoon",
    likes: "1",
    userId: "66438fedd55740145bf572f3",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash("testUser", 10);

  const user = new User({
    username: "testUser",
    passwordHash,
  });

  await user.save();
  return user;
};

const createTestToken = async (user) => {
    const payload = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET);
    return token;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  usersInDB,
  createTestToken,
  createTestUser,
};
