const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const config = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
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
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
        filter.genres = { $in: [genre] };
      }

      return await Book.find(filter).populate("author");
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (author) => {
      return await Book.countDocuments({ author: author._id });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
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

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

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
    });
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((error) => {
    console.log("Error in connecting to MongoDB", error.message);
  });
