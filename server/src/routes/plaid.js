module.exports = function(app, _options, next) {
  app.post("/exchange", async ({ body }) => {
    try {
      app.log.info("POST /plaid/exchange");
      return await app.plaid().exchangePublicToken(body.public_token);
    } catch (err) {
      app.log.error(err);
      return err;
    }
  });

  next();
};
