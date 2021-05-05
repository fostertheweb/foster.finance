// async resolve(_root, { accounts, start_date, end_date }, { plaid }) {
// 	const requests = accounts.map(async ({ account_ids, access_token }) => {
// 		return await plaid.getTransactions(access_token, start_date, end_date, { account_ids });
// 	});
// 	const responses = await Promise.all(requests);
// 	return responses.reduce((transactions, response) => {
// 		return [...transactions, ...response.transactions];
// 	}, []);
// },

module.exports = function (app, _options, next) {
	// await plaid.getAccounts(access_token, options);

	//  await plaid.getInstitutionById(institution_id, { include_optional_metadata: true });

	app.get("/", async (request, reply) => {
		return reply.send({});
	});

	next();
};
