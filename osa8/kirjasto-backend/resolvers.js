const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const Genre = require("./models/genre");
const { GraphQLError, subscribe } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let books = Book.find({});

      if (args.author) {
        const authorObj = await Author.findOne({ name: args.author });
        books = books.find({ author: authorObj });
      }

      if (args.genre) {
        const genreObj = await Genre.findOne({ name: args.genre });
        books = books.find({ genres: { $in: genreObj } });
      }

      return books.populate(["author", "genres"]);
    },
    allAuthors: async () => await Author.find({}),
    allGenres: async () => await Genre.find({}),
    me: (root, args, context) => {
      return context.currentUser.populate("favoriteGenre");
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let foundAuthor = await Author.findOne({ name: args.author });

      if (!foundAuthor) {
        const newAuthor = new Author({
          name: args.author,
          books: [],
        });

        try {
          foundAuthor = await newAuthor.save();
        } catch (error) {
          if (error.name === "ValidationError") {
            throw new GraphQLError("Saving author failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          }
        }
      }

      const genres = await Promise.all(
        args.genres.map(async (genreName) => {
          let genre = await Genre.findOne({ name: genreName });
          if (!genre) {
            genre = new Genre({ name: genreName });
            await genre.save();
          }
          return genre._id;
        })
      );

      const book = new Book({
        ...args,
        genres,
        author: foundAuthor._id,
      });

      try {
        const savedBook = await book.save();
        foundAuthor.books = foundAuthor.books.concat(savedBook._id);
        await foundAuthor.save();
        const populatedBook = await savedBook.populate(["author", "genres"]);
        pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
        return populatedBook;
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("Adding a new book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
      }
    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!author) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      author.born = args.born;

      try {
        await author.save();
      } catch (error) {
        if (error.name === "ValidationError")
          throw new GraphQLError("Editing author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
            },
          });
      }
      return author;
    },

    createUser: async (root, args) => {
      let genre = await Genre.findOne({ name: args.favoriteGenre });

      if (!genre) {
        genre = new Genre({ name: args.favoriteGenre });
        await genre.save();
      }

      const user = new User({
        username: args.username,
        favoriteGenre: genre._id,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },

  Author: {
    bookCount: async (root) => {
      return root.books.length;
    },
  },
};

module.exports = resolvers;
