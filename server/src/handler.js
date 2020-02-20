const lambda = require("aws-lambda-fastify");
const init = require("./app");
const database = require("./database");

async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const client = await database();
    const app = init(client);
    const proxy = lambda(app);
    return proxy(event, context);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { handler };
