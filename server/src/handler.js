const { ApolloServer } = require("apollo-server-lambda");
const { schema, buildContext } = require("./app");
const database = require("./database");

function run(event, context, handler) {
  return new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body));
    handler(event, context, callback);
  });
}

async function graphql(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event);
  const db = await database;
  console.log(db);
  const server = new ApolloServer({
    schema,
    context: buildContext(db),
  });
  const handler = server.createHandler();
  const response = await run(event, context, handler);

  return response;
}

module.exports = { graphql };
