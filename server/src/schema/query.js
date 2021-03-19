const { objectType, stringArg, nonNull } = require("nexus");
const {
	CreateLinkTokenResponse,
	AccountsResponse,
	RequestOptionsInput,
	InstitutionResponse,
	ItemResponse,
} = require("./plaid");

const Query = objectType({
	name: "Query",
	definition(t) {
		t.field("getLink", {
			type: CreateLinkTokenResponse,
			args: {
				client_user_id: nonNull(stringArg()),
			},
			async resolve(_root, { client_user_id }, { plaid }) {
				return await plaid.createLinkToken({
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

		t.field("getItem", {
			type: ItemResponse,
			args: { access_token: nonNull(stringArg()) },
			async resolve(_root, { access_token }, { plaid }) {
				return await plaid.getItem(access_token);
			},
		});

		t.field("getAccounts", {
			type: AccountsResponse,
			args: {
				access_token: nonNull(stringArg()),
				options: RequestOptionsInput,
			},
			async resolve(_root, { access_token, options }, { plaid }) {
				return await plaid.getAccounts(access_token, options);
			},
		});

		t.field("getInstitutionById", {
			type: InstitutionResponse,
			args: {
				institution_id: nonNull(stringArg()),
			},
			async resolve(_root, { institution_id }, { plaid }) {
				return await plaid.getInstitutionById(institution_id, { include_optional_metadata: true });
			},
		});
	},
});

module.exports = { Query };
