module.exports = function (app, _options, next) {
	// await plaid.getAccounts(access_token, options);

	app.post("/institution", async ({ body: { institution_id } }) => {
		try {
			return await app.plaid().getInstitutionById(institution_id, { include_optional_metadata: true });
		} catch (err) {
			app.log.error(err);
		}
	});

	next();
};
