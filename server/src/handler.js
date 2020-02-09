const { ApolloServer } = require("apollo-server-lambda");
const { schema, context } = require("./app");

const server = new ApolloServer({
  schema,
  context,
});

function run(event, context, handler) {
  return new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body));
    handler(event, context, callback);
  });
}

async function graphql(event, context) {
  const handler = server.createHandler({
    cors: {
      origin: true,
      credentials: true,
    },
  });
  const response = await run(event, context, handler);

  return response;
}

module.exports = { graphql };
