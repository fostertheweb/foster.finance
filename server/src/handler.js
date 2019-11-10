const { ApolloServer } = require("apollo-server-lambda");
const { schema, context } = require("./app");

const server = new ApolloServer({
  schema,
  context,
});

const handler = server.createHandler();

module.exports = { handler };
