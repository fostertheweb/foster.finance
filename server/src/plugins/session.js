const fp = require("fastify-plugin");

module.exports = fp(function(fastify, _options, next) {
  fastify.decorateRequest("user_id", "");
  fastify.addHook("onRequest", async (req, reply) => {
    try {
      const { sub } = fastify.jwt.decode(req.headers.authorization);
      req.user_id = sub;
    } catch (err) {
      throw reply.forbidden();
    }
  });

  next();
});
