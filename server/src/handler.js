const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");
const database = require("./database");

const server = new ApolloServer({
  schema,
  context({ event }) {
    return { plaid, db: database, headers: event.headers };
  },
});

const options = {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
  },
};

const graphql = server.createHandler(options);

module.exports = { graphql };
