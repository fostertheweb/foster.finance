const lambda = require("aws-lambda-fastify");
const app = require("./app");
const proxy = lambda(app);

module.exports.handler = async (event, context) => await proxy(event, context);
