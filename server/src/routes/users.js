module.exports = function(fastify, _opts, done) {
  fastify.get("/:id", async () => {
    return {
      email: "jxf9099@rit.edu",
      name: "Jonny",
      user_id: "c8fbf3f0-009d-400d-980e-07e4c0ccde83",
      created: null,
      emoji: ":face_with_symbols_on_mouth:",
    };
    // fastify.log.info("in the route");
    // try {
    //   fastify.log.info("fetching user");
    //   const doc = await fastify
    //     .db()
    //     .collection("users")
    //     .doc(request.params.id)
    //     .get();
    //   fastify.log.info(doc);
    //   const user = doc.data();
    //   fastify.log.info(user);
    //   return user;
    // } catch (err) {
    //   fastify.log.error(err);
    //   return err;
    // }
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
