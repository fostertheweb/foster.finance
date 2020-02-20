// const lambda = require("aws-lambda-fastify");
// const init = require("./app");
// const database = require("./database");

// async function handler(event, context) {
//   context.callbackWaitsForEmptyEventLoop = false;
//   try {
//     const client = await database();
//     const app = init(client);
//     const proxy = lambda(app);
//     return proxy(event, context);
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL, {
  useNewUrlParser: true,
});

const createConnection = async () => {
  await client.connect();
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    if (client.isConnected()) {
      console.log("connected");
    } else {
      console.log("not connected");
      await createConnection();
      console.log("connected");
    }
  } catch (err) {
    console.log(err);
  }
};

// module.exports = { handler };
