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

module.exports = typeDefs;
