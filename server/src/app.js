const app = require("fastify")({ logger: true });

// health check
app.get("/ping", () => "PONG");

// installed plugins
app.register(require("fastify-sensible"));
app.register(require("fastify-jwt"), { secret: "chipwheel" });
app.register(require("fastify-mongodb"), { url: process.env.DB_URL });
app.register(require("fastify-cors"), {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH"],
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

// local plugins
app.register(require("./plugins/plaid"));
app.register(require("./plugins/session"));

// routes
app.register(require("./routes/accounts"), { prefix: "/accounts" });
app.register(require("./routes/expenses"), { prefix: "/expenses" });
app.register(require("./routes/profile"), { prefix: "/profile" });
app.register(require("./routes/transactions"), { prefix: "/transactions" });

module.exports = app;
