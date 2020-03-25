module.exports = function(app, _options, next) {
  app.post("/exchange", async ({ body: { public_token } }) => {
    try {
      return await app.plaid().exchangePublicToken(public_token);
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  app.post("/link", async ({ body: { public_token } }) => {
    try {
      const { access_token, item_id } = await app.plaid().exchangePublicToken(public_token);
      const {
        item: { institution_id },
      } = await app.plaid().getItem(access_token);
      const { accounts } = await app.plaid().getAccounts(access_token);
      const { institution } = await app
        .plaid()
        .getInstitutionById(institution_id, { include_optional_metadata: true });
      return {
        institution: {
          institution_id: institution.institution_id,
          name: institution.name,
          primary_color: institution.primary_color,
          logo: institution.logo,
        },
        accounts,
        public_token,
        item_id,
        access_token,
      };
    } catch (err) {
      throw err;
    }
  });

  app.post("/", async ({ user_id, body: { accounts = [] } }, reply) => {
    try {
      if (accounts.length < 1) {
        throw reply.badRequest("You must select at least one account.");
      }

      return await app.mongo.db
        .collection("users")
        .findOneAndUpdate({ user_id }, { $set: { accounts } });
    } catch (err) {
      throw err;
    }
  });

  next();
};
