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

const connectionOptions = {
  conection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  options: {
    documentPkType: "uuid",
  },
};

async function graphql(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { connection, options } = connectionOptions;
    console.log(connectionOptions);
    database = await (database ? database : massive(connection, options));
    const server = new ApolloServer({
      schema,
      context() {
        return { plaid, db: database, headers: event.headers };
      },
    });

    return server.createHandler(handlerOptions);
  } catch (err) {
    console.log(err);
    return {
      isBase64Encoded: false,
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "application/json" },
      body: {
        error: err,
      },
    };
  }
}

module.exports = { graphql };
