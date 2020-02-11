const { ApolloServer } = require("apollo-server-lambda");
const { schema, context } = require("./app");

async function graphql(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  const server = new ApolloServer({
    schema,
    context,
  });
  const handler = server.createHandler({
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
    },
  });

  const response = handler(event, context, callback);
  console.log(response);
  return response;
}

module.exports = { graphql: handler };
