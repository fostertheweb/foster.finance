const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");

const server = new ApolloServer({
  schema,
  context: () => ({ plaid }),
});

function run(event, context, handler) {
  return new Promise((resolve, reject) => {
    function callback(error, body) {
      return error ? reject(error) : resolve(body);
    }
    
    handler(event, context, callback);
  });
}

export async function graphql(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const handler = server.createHandler({
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
    },
  });

  return await run(event, context, handler);
}
