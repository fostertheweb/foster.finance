const app = require("fastify")({ logger: true });
const { makeSchema } = require("nexus");
const mercurius = require("mercurius");
const Plaid = require("plaid");
const path = require("path");
const types = require("./schema");

const plaid = new Plaid.Client({
	clientID: process.env.PLAID_CLIENT_ID,
	secret: process.env.PLAID_SECRET,
	env: Plaid.environments[process.env.PLAID_ENV],
	options: { version: "2019-05-29" },
});

const schema = makeSchema({
	types,
	outputs: {
		schema: path.join(__dirname, "schema.graphql"),
	},
});

// health check
app.get("/ping", () => "PONG");

// installed plugins
app.register(require("fastify-cors"), {
	origin: true,
});
app.register(require("fastify-sensible"));
app.register(mercurius, {
	schema,
	context() {
		return { plaid };
	},
	graphiql: "playground",
});

module.exports = app;
