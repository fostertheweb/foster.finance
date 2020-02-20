module.exports = client => {
  const app = require("fastify")({ logger: true });

  // health check
  app.get("/ping", (_, reply) => reply.send("PONG"));

  // installed plugins
  const url = process.env.DB_URL;
  app.register(require("fastify-mongodb"), client ? { client } : { url });
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

  return app;
};
