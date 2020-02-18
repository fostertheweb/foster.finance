const app = require("fastify")({ logger: true });

app.get("/ping", (_, reply) => reply.send("PONG"));

app.register(require("./plugins/plaid"));
app.register(require("fastify-mongodb"), {
  url: process.env.DB_URL,
});
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

app.register(require("./routes/users"), { prefix: "/users" });
app.register(require("./routes/plaid"), { prefix: "/plaid" });

module.exports = app;
