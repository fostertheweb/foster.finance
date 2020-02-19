const lambda = require("aws-lambda-fastify");
const { MongoClient } = require("mongodb");
const app = require("./app");

let client;

const options = {
  callbackWaitsForEmptyEventLoop: false,
};

async function handler(event, context) {
  if (client) {
    app.register(require("fastify-mongodb"), { client });
    return lambda(app, options)(event, context);
  } else {
    client = await MongoClient.connect(process.env.DB_URL);
    app.register(require("fastify-mongodb"), { client });
    return lambda(app, options)(event, context);
  }
}

module.exports = { handler };
