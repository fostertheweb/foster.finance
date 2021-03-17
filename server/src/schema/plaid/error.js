const { objectType, enumType } = require("nexus");

const PlaidError = objectType({
	name: "PlaidError",
	definition(t) {
		t.field("error_type", { type: PlaidErrorType });
		t.int("http_code");
		t.string("error_code");
		t.string("error_message");
		t.string("display_message");
		t.string("request_id");
	},
});

const PlaidErrorType = enumType({
	name: "PlaidErrorType",
	members: [
		"INVALID_REQUEST",
		"INVALID_INPUT",
		"INSTITUTION_ERROR",
		"RATE_LIMIT_EXCEEDED",
		"API_ERROR",
		"ITEM_ERROR",
		"ASSET_REPORT_ERROR",
	],
});

module.exports = { PlaidError };
