const fp = require("fastify-plugin");
const Plaid = require("plaid");

const plaid = new Plaid.Client({
	clientID: process.env.PLAID_CLIENT_ID,
	secret: process.env.PLAID_SECRET,
	env: Plaid.environments[process.env.PLAID_ENV],
	options: { version: "2019-05-29" },
});

module.exports = fp(function (fastify, _options, next) {
	fastify.decorate("plaid", () => plaid);
	next();
});
