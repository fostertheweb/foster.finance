module.exports = function(app, _options, next) {
  app.get("/:id", async (request, reply) => {
    app.log.info(`GET /users/${request.params.id}`);
    try {
      app.log.info("Query for user");
      const user = await app.mongo.db.collection("users").findOne({ user_id: request.params.id });
      if (user) {
        console.log(user);
        return user;
      }
      throw reply.notFound();
    } catch (err) {
      app.log.error(err);
      return err;
    }
  });

  app.post("/", async ({ body }) => {
    app.log.info("POST /users");
    app.log.info({ body });
    return await app.mongo.db.collection("users").insertOne(body);
  });

  app.put("/", async ({ body }) => {
    app.log.info("PUT /users");
    app.log.info({ body });
    return await app.mongo.db
      .collection("users")
      .findOneAndUpdate({ user_id: body.user_id }, { $set: body });
  });

  app.patch("/:id", async ({ params, body }) => {
    app.log.info("PUT /users");
    app.log.info({ body });
    return await app.mongo.db
      .collection("users")
      .findOneAndUpdate({ user_id: params.id }, { $set: body });
  });

  app.post("/:id/accounts/link", async ({ body: { public_token } }) => {
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
        access_token,
        item_id,
      };
    } catch (err) {
      throw err;
    }
  });

  app.post("/:id/accounts", async ({ body: { access_token } }) => {
    try {
      const { accounts } = await app.plaid().getAccounts(access_token);
      const { institutions } = await app
        .plaid()
        .getInstitutions(1, 1, { include_optional_metadata: true });

      const link = accounts.map(
        ({ account_id, institution_id, item_id, access_token, public_token }) => ({
          institution_id,
          item_id,
          access_token,
          public_token,
        }),
      );
      const update = await app.mongo.db.collection("users").findOneAndUpdateaccounts();

      return {
        institution: {
          institution_id: institutions[0].institution_id,
          name: institutions[0].name,
          primary_color: institutions[0].primary_color,
          logo: institutions[0].logo,
        },
        accounts,
      };
    } catch (err) {
      throw err;
    }
  });

  next();
};
