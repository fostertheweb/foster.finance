const app = require("./app");

app.register(require("fastify-mongodb"), {
  url: process.env.DB_URL,
});

app.listen(4000, function(err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`API server listening on ${address}`);
});
