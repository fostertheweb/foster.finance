module.exports = function(fastify, _opts, done) {
  fastify.post("/exchange", async (request, reply) => {
    try {
      const response = await fastify.plaid().exchangePublicToken(request.body.token);
      return reply.send(response);
    } catch (err) {
      fastify.log.error(err);
      return reply.send(err);
    }
  });

  done();
};
