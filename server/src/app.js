const app = require("fastify")({ logger: true });

app.get("/ping", (_, reply) => reply.send("PONG"));

app.register(require("fastify-cors"), {
  origin: ["https://foster.finance", "http://localhost:3000"],
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

app.register(require("./plugins/database"));
app.register(require("./plugins/plaid"));

app.register(require("./routes/users"), { prefix: "/users" });
app.register(require("./routes/plaid"), { prefix: "/plaid" });

module.exports = app;
