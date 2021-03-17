const { objectType } = require("nexus");

const ExchangePublicTokenResponse = objectType({
	name: "ExchangePublicTokenResponse",
	definition(t) {
		t.string("access_token");
		t.string("item_id");
		t.string("request_id");
		t.int("status_code");
	},
});

module.exports = { ExchangePublicTokenResponse };
