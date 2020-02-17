const app = require("fastify")({ logger: true });

app.get("/ping", (_, reply) => reply.send("PONG"));

app.register(require("fastify-cors"), {
  origin: "https://foster.finance",
  methods: ["GET", "POST", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAage: 300,
});

app.register(require("./plugins/database"));
app.register(require("./plugins/plaid"));

app.register(require("./routes/users"), { prefix: "/users" });
app.register(require("./routes/plaid"), { prefix: "/plaid" });

module.exports = app;
