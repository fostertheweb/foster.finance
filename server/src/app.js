const app = require("fastify")({ logger: true });

app.get("/ping", (_, reply) => reply.send("PONG"));

// installed plugins
app.register(require("fastify-cors"), {
  origin: true,
  methods: ["GET", "POST", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Amz-User-Agent",
    "X-Amz-Security-Token",
    "X-Amz-Date",
  ],
  credentials: true,
  maxAage: 300,
});
app.register(require("fastify-sensible"));

// local plugins
app.register(require("./plugins/plaid"));

// routes
app.register(require("./routes/users"), { prefix: "/users" });
app.register(require("./routes/plaid"), { prefix: "/plaid" });

module.exports = app;
