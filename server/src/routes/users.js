module.exports = function(app, _options, next) {
  app.get("/:id", async request => {
    app.log.info(`GET /users/${request.params.id}`);
    try {
      app.log.info("Query for user");
      return await app.mongo.db.collection("users").findOne({ user_id: request.params.id });
    } catch (err) {
      app.log.error(err);
      return err;
    }
  });

  app.post("/", async ({ body }) => {
    app.log.info("POST /users");
    app.log.info(body);
    return await app.mongo.db.collection("users").insertOne(body);
  });

  next();
};
