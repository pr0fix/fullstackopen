const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;

  for (let i = 0; i < blogs.length; i++) {
    sum += blogs[i].likes;
  }
  return sum;
};

const favoriteBlog = (blogs) => {
  const mostLiked = Math.max(...blogs.map((blog) => blog.likes), 0);
  const favoriteBlog = blogs.find((blog) => blog.likes === mostLiked);
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorCounter = _.countBy(blogs, "author");
  const mostBlogs = _.maxBy(
    _.keys(authorCounter),
    (author) => authorCounter[author]
  );

  return {
    author: mostBlogs,
    blogs: authorCounter[mostBlogs],
  };
};

const mostLikes = (blogs) => {
  const authorLikes = _.groupBy(blogs, "author");
  const totalLikes = _.mapValues(authorLikes, (blogs) =>
    _.sumBy(blogs, "likes")
  );
  const mostLiked = _.maxBy(_.keys(totalLikes), (author) => totalLikes[author]);

  return {
    author: mostLiked,
    likes: totalLikes[mostLiked],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
