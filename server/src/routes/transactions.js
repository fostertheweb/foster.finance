module.exports = function (app, _options, next) {
	app.get("/", async ({ user_id, query: { start_date, end_date } }) => {
		try {
			const user = await app.mongo.db.collection("accounts").findOne({ user_id });
			const requests = user.accounts.map(async ({ account_ids, access_token }) => {
				return await app.plaid().getTransactions(access_token, start_date, end_date, { account_ids });
			});
			const responses = await Promise.all(requests);
			return responses.reduce((transactions, response) => {
				return [...transactions, ...response.transactions];
			}, []);
		} catch (err) {
			app.log.error(err);
			throw err;
		}
	});

	next();
};
