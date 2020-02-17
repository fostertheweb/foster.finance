const lambda = require("aws-lambda-fastify");
const app = require("./app");
const proxy = lambda(app);

module.exports.handler = async (event, context) => {
  // you can do other things here
  const result = await proxy(event, context);
  // and here
  return result;
};
