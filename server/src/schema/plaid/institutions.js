const { objectType, list } = require("nexus");

const Institution = objectType({
	name: "Institution",
	definition(t) {
		t.string("institution_id");
		t.field("country_codes", {
			type: list("String"),
		});
		t.field("products", {
			type: list("String"),
		});
		t.field("routing_numbers", {
			type: list("String"),
		});
		t.string("name");
		t.string("primary_color");
		t.string("url");
		t.string("logo");
		t.boolean("oauth");
	},
});

const InstitutionResponse = objectType({
	name: "InstitutionResponse",
	definition(t) {
		t.field("institution", {
			type: Institution,
		});
	},
});

module.exports = { Institution, InstitutionResponse };
