const { objectType, stringArg, nonNull } = require("nexus");
const { ExchangePublicTokenResponse } = require("./plaid");

const Mutation = objectType({
	name: "Mutation",
	definition(t) {
		t.field("exchangePublicToken", {
			type: ExchangePublicTokenResponse,
			args: {
				public_token: nonNull(stringArg()),
			},
			async reolve(_root, { public_token }, { plaid }) {
				console.log({ public_token });
				const response = await plaid.exchangePublicToken(public_token);
				console.log({ response });
				return response;
			},
		});
	},
});

module.exports = { Mutation };
