const { objectType, inputObjectType, enumType, nonNull } = require("nexus");
const { Account } = require("./account");

const Category = objectType({
	name: "Category",
	definition(t) {
		t.int("category_id");
		t.string("group");
		t.string("hierarchy", {});
	},
});

const Location = objectType({
	name: "Location",
	definition(t) {
		t.string("address");
		t.string("city");
		t.string("state");
		t.float("latitude");
		t.float("longitude");
	},
});

const PaymentMeta = objectType({
	name: "PaymentMeta",
	definition(t) {
		t.int("reference_number");
		t.int("ppdId");
		t.string("payeeName");
	},
});

const Transaction = objectType({
	name: "Transaction",
	definition(t) {
		t.string("transaction_id");
		t.string("account_id");
		t.string("category", {});
		t.string("category_id");
		t.field("transaction_type", {
			type: TransactionType,
		});
		t.string("name");
		t.float("amount");
		t.string("date");
		t.boolean("pending");
		t.string("pending_transaction_id");
		t.string("account_owner");
		t.field("location", {
			type: Location,
		});
		t.field("payment_meta", {
			type: PaymentMeta,
		});
	},
});
const TransactionsResponse = objectType({
	name: "TransactionsResponse",
	definition(t) {
		t.field("accounts", {
			type: Account,
		});
		t.field("transactions", {
			type: Transaction,
		});
		t.int("total_transactions");
	},
});

const TransactionsRequest = inputObjectType({
	name: "TransactionsRequest",
	definition(t) {
		t.nonNull.string("start_date");
		t.nonNull.string("end_date");
		t.field("options", { type: TransactionsRequestOptions });
	},
});

const TransactionsRequestOptions = inputObjectType({
	name: "TransactionsRequestOptions",
	definition(t) {
		t.nonNull.string("account_ids");
		t.int("count");
		t.int("offset");
	},
});

const TransactionType = enumType({
	name: "TransactionType",
	members: {
		DIGITAL: "digital",
		PLACE: "place",
		SPECIAL: "special",
		UNRESOLVED: "unresolved",
	},
});

module.exports = { Transaction, TransactionsRequest, TransactionsResponse };
