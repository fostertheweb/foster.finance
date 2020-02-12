const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");
const database = require("./database");

function run(event, context, handler) {
  return new Promise((resolve, reject) => {
    function callback(error, body) {
      return error ? reject(error) : resolve(body);
    }

    handler(event, context, callback);
  });
}

const graphql = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await database;
  const server = new ApolloServer({
    schema,
    context() {
      return { db, plaid };
    },
  });
  const handler = server.createHandler({
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
    },
  });

  return await run(event, context, handler);
};

module.exports = { graphql };
