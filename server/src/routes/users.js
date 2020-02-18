module.exports = function(fastify, _opts, done) {
  fastify.get("/:id", async (request, reply) => {
    fastify.log.info("in the route");
    try {
      fastify.log.info("fetching user");
      const doc = await fastify
        .db()
        .collection("users")
        .doc(request.params.id)
        .get();
      const user = doc.data();
      fastify.log.info(user);
      return reply.send(user);
    } catch (err) {
      fastify.log.error(err);
      return reply.send(err);
    }
  });

  fastify.post("/", async ({ body }, reply) => {
    try {
      const uid = body.user_id;
      await fastify
        .db()
        .collection("users")
        .doc(uid)
        .set({ ...body, created: Date.UTC() });
      const doc = await fastify
        .db()
        .collection("users")
        .doc(uid)
        .get();
      const user = doc.data();
      return reply.send(user);
    } catch (err) {
      fastify.log.error(err);
      return reply.send(err);
    }
  });

  done();
};
