module.exports = function(fastify, _opts, next) {
  fastify.get("/:id", async function(request) {
    fastify.log.info(`GET /users/${request.params.id}`);
    try {
      fastify.log.info("Fetching user");
      console.log(this.mongo);
      return await this.mongo.db.collection("users").findOne({ user_id: request.params.id });
    } catch (err) {
      fastify.log.error(err);
      return err;
    }
  });

  fastify.post("/", async function({ body }) {
    return await this.mongo.db.collection("users").insertOne(body);
  });

  next();
};
