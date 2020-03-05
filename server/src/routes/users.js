module.exports = function(app, _options, next) {
  app.get("/:id", async (request, reply) => {
    app.log.info(`GET /users/${request.params.id}`);
    try {
      app.log.info("Query for user");
      const user = await app.mongo.db.collection("users").findOne({ user_id: request.params.id });
      return user ? user : reply.notFound();
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

  app.put("/", async ({ body }) => {
    app.log.info("PUT /users");
    app.log.info(body);
    return await app.mongo.db
      .collection("users")
      .findOneAndUpdate({ user_id: body.user_id }, { $set: body });
  });

  next();
};
