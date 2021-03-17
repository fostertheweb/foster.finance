const { arg, objectType, stringArg, nonNull } = require("nexus");
const { ExchangePublicTokenResponse } = require("./plaid");

const Mutation = objectType({
	name: "Mutation",
	definition(t) {
		t.field("exchangePublicToken", {
			type: ExchangePublicTokenResponse,
			args: {
				token: nonNull(stringArg()),
			},
			async reolve(_root, { token }, { plaid }) {
				return await plaid.exchangePublicToken(token);
			},
		});
	},
});

module.exports = { Mutation };
