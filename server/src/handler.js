const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");
const database = require("./database");

const server = new ApolloServer({
  schema,
  context: () => ({ plaid }),
});

const graphql = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
  },
});

module.exports = { graphql };
