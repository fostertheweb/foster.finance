const app = require("fastify")({ logger: true });

// health check
app.get("/ping", () => "PONG");

// installed plugins
app.register(require("fastify-cors"), {
	origin: true,
});
app.register(require("fastify-sensible"));

// local plugins
app.register(require("./plugins/plaid"));

// routes
app.register(require("./routes/accounts"), { prefix: "/accounts" });

module.exports = app;
