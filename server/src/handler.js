const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");
const database = require("./database");

const server = new ApolloServer({
  schema,
  context({ event }) {
    return { plaid, db: database(), headers: event.headers };
  },
});

const graphql = server.createHandler();

module.exports = { graphql };
