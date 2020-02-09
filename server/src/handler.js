const { ApolloServer } = require("apollo-server-lambda");
const { schema, buildContext } = require("./app");
const database = require("./database");

async function graphql(event, context) {
  console.log(event);
  const db = await database;
  console.log(db);
  const server = new ApolloServer({
    cors: true,
    schema,
    context: buildContext(db),
  });

  return server.createHandler();
}

module.exports = { graphql };
