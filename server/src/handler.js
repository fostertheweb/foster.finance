const lambda = require("aws-lambda-fastify");
const app = require("./app");
const proxy = lambda(app);

exports.handler = async (event, context) => proxy(event, context);
