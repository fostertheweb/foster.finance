const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");
const database = require("./database");

const createHandler = async () => {
  const db = await database;
  const server = new ApolloServer({
    schema,
    context: () => ({ db, plaid }),
  });

  console.log(db);

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
  console.log({ event, context });
  return createHandler().then(handler => handler(event, context, callback));
};

module.exports = { graphql };
