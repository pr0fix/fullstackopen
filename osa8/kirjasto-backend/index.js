const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const config = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const Genre = require("./models/genre");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [Genre!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Genre {
    name: String!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: Genre!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [Genre!]!
    me: User
    }

    type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ) : Book
      editAuthor(
        name: String!
        born: Int!
      ) : Author
      createUser(
        username: String!
        favoriteGenre: String!
      ) : User
      login(
        username: String!
        password: String!
      ) : Token

    }
    `;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      let filter = {};

      if (author) {
        const authorObj = await Author.findOne({ name: author });
        if (authorObj) {
          filter.author = authorObj._id;
        }
      }

      if (genre) {
        const genreObj = await Genre.findOne({ name: genre });
        if (genreObj) {
          filter.genres = { $in: [genreObj._id] };
        }
      }

      return await Book.find(filter)
        .populate("author")
        .populate({ path: "genres" });
    },
    allAuthors: async () => await Author.find({}),
    allGenres: async () => await Genre.find({}),
    me: (root, args, context) => {
      return context.currentUser.populate("favoriteGenre");
    },
  },
  Author: {
    bookCount: async (author) => {
      return await Book.countDocuments({ author: author._id });
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

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        try {
          author = new Author({ name: args.author });
          await author.save();
        } catch (error) {
          if ((error.name = "ValidationError")) {
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
        title: args.title,
        published: args.published,
        author: author._id,
        genres: genres,
      });

      try {
        await book.save();
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

      return book.populate("author");
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return startStandaloneServer(server, {
      listen: { port: config.PORT },
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    });
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((error) => {
    console.log("Error in connecting to MongoDB", error.message);
  });
