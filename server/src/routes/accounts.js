const expenseAccountTypes = ["checking", "credit card"];

module.exports = function (app, _options, next) {
	app.post("/exchange", async ({ body: { public_token } }) => {
		try {
			return await app.plaid().exchangePublicToken(public_token);
		} catch (err) {
			app.log.error(err);
			throw err;
		}
	});

	app.get("/link", async (_, reply) => {
		try {
			const link = await app.plaid().createLinkToken({
				user: {
					client_user_id: "user01",
				},
				client_name: "foster finance",
				country_codes: ["US"],
				language: "en",
				products: ["auth", "transactions"],
			});

			return reply.send(link);
		} catch (err) {
			console.log({ user: "user01" });
			console.error(err);
		}
	});

	app.post("/link", async ({ body: { public_token } }) => {
		try {
			const exchangeResponse = await app.plaid().exchangePublicToken(public_token);
			console.log({ exchangeResponse });
			const { item_id, access_token } = exchangeResponse;
			const {
				item: { institution_id },
			} = await app.plaid().getItem(access_token);
			const { accounts } = await app.plaid().getAccounts(access_token);
			const { institution } = await app.plaid().getInstitutionById(institution_id, { include_optional_metadata: true });
			return {
				institution: {
					institution_id: institution.institution_id,
					name: institution.name,
					primary_color: institution.primary_color,
					logo: institution.logo,
				},
				accounts: accounts.map((a) => (expenseAccountTypes.includes(a.subtype) ? { ...a, selected: true } : a)),
				public_token,
				item_id,
				access_token,
			};
		} catch (err) {
			throw err;
		}
	});

	app.post("/", async ({ body: { accounts = [] } }, reply) => {
		try {
			if (accounts.length < 1) {
				throw reply.badRequest("You must select at least one account.");
			}

			return await app.mongo.db.collection("accounts").insertOne({ user_id: "user01", accounts });
		} catch (err) {
			throw err;
		}
	});

	next();
};
