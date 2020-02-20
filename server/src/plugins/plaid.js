const fp = require("fastify-plugin");
const Plaid = require("plaid");

const plaid = new Plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  Plaid.environments[process.env.PLAID_ENV],
);

module.exports = fp(function(fastify, _options, next) {
  fastify.decorate("plaid", () => plaid);
  next();
});
