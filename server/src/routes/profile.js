module.exports = function(app, _options, next) {
  app.get("/", async ({ user_id }, reply) => {
    try {
      const user = await app.mongo.db.collection("users").findOne({ user_id });

      if (user) {
        return user;
      }

      throw reply.notFound();
    } catch (err) {
      app.log.error(err);
      return err;
    }
  });

  app.post("/", async ({ body }) => {
    return await app.mongo.db.collection("users").insertOne(body);
  });

  app.patch("/", async ({ user_id, body }) => {
    return await app.mongo.db.collection("users").findOneAndUpdate({ user_id }, { $set: body });
  });

  next();
};
