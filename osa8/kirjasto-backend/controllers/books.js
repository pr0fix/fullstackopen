const booksRouter = require("express").Router();
const Book = require("../models/book");

booksRouter.get("/", async (request, response) => {
  const books = await Book.find({}).populate("author");
  response.json(books);
});

module.exports = booksRouter;
