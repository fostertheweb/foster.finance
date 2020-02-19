const lambda = require("aws-lambda-fastify");
const { MongoClient } = require("mongodb");
const app = require("./app");

let client;

const options = {
  callbackWaitsForEmptyEventLoop: false,
};

async function handler(event, contect) {
  if (client) {
    app.register(require("fastify-mongodb"), { client });
    return lambda(app, options);
  } else {
    client = await MongoClient.connect(process.env.DB_URL);
    app.register(require("fastify-mongodb"), { client });
    return lambda(app, options);
  }
}

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  throw new Error(reason);
});

module.exports = { handler };
