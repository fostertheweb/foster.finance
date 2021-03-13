const { objectType } = require("nexus");

const ExchangePublicTokenResponse = objectType({
	name: "ExchangePublicTokenResponse",
	definition(t) {
		t.string("access_token", { nullable: true });
		t.string("item_id", { nullable: true });
		t.string("request_id", { nullable: true });
		t.int("status_code", { nullable: true });
	},
});

module.exports = { ExchangePublicTokenResponse };
