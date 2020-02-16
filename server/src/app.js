const app = require("fastify")({ logger: true });

app.register(require("./plugins/database"));
app.register(require("./plugins/plaid"));

app.register(require("./routes/users"), { prefix: "/users" });
app.register(require("./routes/plaid"), { prefix: "/plaid" });

module.exports = app;
