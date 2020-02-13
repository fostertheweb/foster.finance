const { ApolloServer } = require("apollo-server-lambda");
const { schema, plaid } = require("./app");
const massive = require("massive");

let database;

const handlerOptions = {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
  },
};

function createServer(db) {
  return new ApolloServer({
    schema,
    context() {
      return { plaid, db };
    },
  });
}

const func = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (database) {
    const server = createServer(database);
    return server.createHandler(handlerOptions);
  } else {
    return massive(
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
      {
        documentPkType: "uuid",
      },
    )
      .then(instance => {
        database = instance;
        const server = createServer(instance);
        return server.createHandler(handlerOptions);
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }
};

module.exports = { graphql: func };
