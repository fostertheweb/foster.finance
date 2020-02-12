const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");

const server = new ApolloServer({
  schema,
  context({ event, context }) {
    context.callbackWaitsForEmptyEventLoop = false;
    
    return { plaid, headers: event.headers };
  },
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
