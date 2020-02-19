module.exports = function(app, _options, next) {
  app.get("/:id", async (request, reply) => {
    return {
      _id: "5e4b75e425da5d857653f064",
      user_id: "096334ae-00e9-4091-9713-00c1d5c4c299",
      email: "jfost784@gmail.com",
      name: "Jonathan",
      emoji: ":man-shrugging::skin-tone-3:",
    };
    // app.log.info(`GET /users/${request.params.id}`);
    // try {
    //   app.log.info("Query for user");
    //   const user = await app.mongo.db.collection("users").findOne({ user_id: request.params.id });
    //   return user ? user : reply.notFound();
    // } catch (err) {
    //   app.log.error(err);
    //   return err;
    // }
  });

  app.post("/", async ({ body }) => {
    app.log.info("POST /users");
    app.log.info(body);
    return await app.mongo.db.collection("users").insertOne(body);
  });

  next();
};
