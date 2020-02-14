const { ApolloServer } = require("apollo-server");
const { schema, plaid } = require("./app");
const database = require("./database");

const server = new ApolloServer({
  schema,
  context({ req }) {
    return { plaid, db: database, headers: req.headers };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
