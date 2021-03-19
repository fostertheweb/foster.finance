const { objectType, inputObjectType, list } = require("nexus");

const Item = objectType({
	name: "Item",
	definition(t) {
		t.field("available_products", {
			type: list("String"),
		});
		t.field("billed_products", {
			type: list("String"),
		});
		t.string("item_id");
		t.string("institution_id");
		t.string("webook");
	},
});

const ItemResponse = objectType({
	name: "ItemResponse",
	definition(t) {
		t.field("item", {
			type: Item,
		});
		t.string("request_id");
	},
});

const ExchangePublicTokenResponse = objectType({
	name: "ExchangePublicTokenResponse",
	definition(t) {
		t.string("access_token");
		t.string("item_id");
		t.string("request_id");
		t.int("status_code");
	},
});

const RequestOptionsInput = inputObjectType({
	name: "RequestOptionsInput",
	definition(t) {
		t.field("account_ids", {
			type: list("String"),
		});
	},
});

module.exports = { ExchangePublicTokenResponse, RequestOptionsInput, Item, ItemResponse };
