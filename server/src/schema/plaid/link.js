const { objectType } = require("nexus");

const CreateLinkTokenResponse = objectType({
	name: "CreateLinkTokenResponse",
	definition(t) {
		t.string("link_token");
		t.string("expiration");
		t.string("request_id");
	},
});

module.exports = { CreateLinkTokenResponse };
