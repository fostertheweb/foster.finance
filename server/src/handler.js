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

let db;

const createConnection = async () => {
  await client.connect();
  db = client.db("test");
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    if (db) {
      return await db.collection("users").find({});
    } else {
      await createConnection();
      return await db.collection("users").find({});
    }
  } catch (err) {
    console.log(err);
  }
};

// module.exports = { handler };
