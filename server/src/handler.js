const lambda = require("aws-lambda-fastify");
const app = require("./app");
const handler = lambda(app);

module.exports = { handler };
