const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");

const server = new ApolloServer({
  schema,
  context: () => ({ plaid }),
});

function graphql(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  
  const handler = server.createHandler({
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
    },
  });

  return handler(event, context);
}

module.exports = { graphql };
