const lambda = require("aws-lambda-fastify");
const app = require("./app");
const proxy = lambda(app);

module.exports.handler = async (event, context) => {
  try {
    const result = await proxy(event, context);
    return result;
  } catch (err) {
    console.log(err);
  }
};
