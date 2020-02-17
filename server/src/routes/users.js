module.exports = function(fastify, _opts, done) {
  fastify.get("/:id", async (request, reply) => {
    try {
      const doc = await fastify
        .db()
        .collection("users")
        .doc(request.params.id)
        .get();
      const user = doc.data();
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
