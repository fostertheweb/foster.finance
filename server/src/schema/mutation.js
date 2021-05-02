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
				try {
					console.log({ PUBLIC_TOKEN: public_token });
					return await plaid.exchangePublicToken(public_token);
				} catch (err) {
					console.error(err);
				}
			},
		});
	},
});

module.exports = { Mutation };
