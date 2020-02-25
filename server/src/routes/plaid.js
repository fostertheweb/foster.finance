module.exports = function(app, _options, next) {
  app.post("/exchange", async ({ body: { public_token } }) => {
    try {
      app.log.info("POST /plaid/exchange");
      return await app.plaid().exchangePublicToken(public_token);
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  app.post("/accounts", async ({ body: { items } }) => {
    try {
      app.log.info("POST /plaid/accounts");
      const requests = items.map(async ({ item_id, access_token }) => {
        app.log.info(`PLAID getAccounts for ${item_id}`);
        return await app.plaid().getAccounts(access_token);
      });
      const responses = await Promise.all(requests);
      const accounts = responses.reduce((accounts, response) => {
        return [...accounts, ...response.accounts];
      }, []);
      return accounts;
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  next();
};
