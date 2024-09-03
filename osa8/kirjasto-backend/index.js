const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const config = require("./utils/config");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

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
