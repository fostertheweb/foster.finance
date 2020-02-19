const lambda = require("aws-lambda-fastify");
const app = require("./app");
const proxy = lambda(app);

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  throw new Error(reason);
});

module.exports.handler = async (event, context) => proxy(event, context);
