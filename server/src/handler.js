const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");
const database = require("./database");

const createHandler = async () => {
  const db = await database;
  const server = new ApolloServer({
    schema,
    context: { db, plaid },
  });

  return server.createHandler({
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
    },
  });
};

const graphql = (event, context, callback) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  createHandler().then(handler => handler(event, context, callback));
};

module.exports = { graphql };
