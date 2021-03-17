const { objectType, stringArg, nonNull } = require("nexus");
const { CreateLinkTokenResponse } = require("./plaid");

const Query = objectType({
	name: "Query",
	definition(t) {
		t.field("getLink", {
			type: CreateLinkTokenResponse,
			args: {
				uid: nonNull(stringArg()),
			},
			async resolve(_root, { client_user_id }, { plaid }) {
				return await plaid().createLinkToken({
					user: {
						client_user_id,
					},
					client_name: "foster finance",
					country_codes: ["US"],
					language: "en",
					products: ["auth", "transactions"],
				});
			},
		});
	},
});

module.exports = { Query };
