const { ApolloServer } = require("apollo-server-lambda");
const { schema, buildContext } = require("./app");
const database = require("./database");

async function graphql(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event);
  const db = await database;
  console.log(db);
  const server = new ApolloServer({
    schema,
    context: buildContext(db),
  });
  const handler = server.createHandler({
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
    },
  });

  return handler(event, context, callback);
}

module.exports = { graphql };
