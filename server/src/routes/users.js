module.exports = function(fastify, _opts, done) {
  fastify.get("/:id", async function(request) {
    return await this.mongo.db.collection("users").findOne({ user_id: request.params.id });
  });

  fastify.post("/", async function({ body }) {
    return await this.mongo.db.collection("users").insertOne(body);
  });

  done();
};
