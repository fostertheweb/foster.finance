module.exports = function (app, _options, next) {
	app.post("/token", async ({ body: { public_token } }) => {
		try {
			return await app.plaid().exchangePublicToken(public_token);
		} catch (err) {
			app.log.error(err);
		}
	});

	app.post("/link", async ({ body: { client_user_id } }) => {
		try {
			return await app.plaid().createLinkToken({
				user: {
					client_user_id,
				},
				client_name: "foster finance",
				country_codes: ["US"],
				language: "en",
				products: ["auth", "transactions"],
			});
		} catch (err) {
			app.log.error(err);
		}
	});

	app.post("/item", async ({ body: { access_token } }) => {
		try {
			return await app.plaid().getItem(access_token);
		} catch (err) {
			app.log.error(err);
		}
	});

	next();
};
