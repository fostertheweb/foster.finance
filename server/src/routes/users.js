module.exports = function(fastify, _opts, done) {
  fastify.get("/:id", async request => {
    fastify.log.info("in the route");
    try {
      fastify.log.info("fetching user");
      const doc = await fastify
        .db()
        .collection("users")
        .doc(request.params.id)
        .get();
      fastify.log.info(doc);
      const user = doc.data();
      fastify.log.info(user);
      return user;
    } catch (err) {
      fastify.log.error(err);
      return err;
    }
  });

  fastify.post("/", async ({ body }) => {
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
      return user;
    } catch (err) {
      fastify.log.error(err);
      return err;
    }
  });

  done();
};
