const { ApolloServer } = require("apollo-server-lambda");
const { schema, context } = require("./app");

const server = new ApolloServer({
  schema,
  context,
});

const graphql = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  }
});

module.exports = { graphql };
