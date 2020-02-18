module.exports = function(fastify, _opts, done) {
  fastify.post("/exchange", async (request, reply) => {
    try {
      const response = await fastify.plaid().exchangePublicToken(request.body.public_token);
      return response;
    } catch (err) {
      fastify.log.error(err);
      return err;
    }
  });

  done();
};
