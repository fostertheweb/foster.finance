const { objectType, inputObjectType, enumType } = require("nexus");
const { Account } = require("./account");

const Category = objectType({
	name: "Category",
	definition(t) {
		t.int("category_id", { nullable: true });
		t.string("group", { nullable: true });
		t.string("hierarchy", {
			list: [false],
			nullable: true,
		});
	},
});

const Location = objectType({
	name: "Location",
	definition(t) {
		t.string("address", { nullable: true });
		t.string("city", { nullable: true });
		t.string("state", { nullable: true });
		t.float("latitude", { nullable: true });
		t.float("longitude", { nullable: true });
	},
});

const PaymentMeta = objectType({
	name: "PaymentMeta",
	definition(t) {
		t.int("reference_number", { nullable: true });
		t.int("ppdId", { nullable: true });
		t.string("payeeName", { nullable: true });
	},
});

const Transaction = objectType({
	name: "Transaction",
	definition(t) {
		t.string("transaction_id", { nullable: true });
		t.string("account_id", { nullable: true });
		t.string("category", {
			list: [false],
			nullable: true,
		});
		t.string("category_id", { nullable: true });
		t.field("transaction_type", {
			type: TransactionType,
			nullable: true,
		});
		t.string("name", { nullable: true });
		t.float("amount", { nullable: true });
		t.string("date", { nullable: true });
		t.boolean("pending", { nullable: true });
		t.string("pending_transaction_id", { nullable: true });
		t.string("account_owner", { nullable: true });
		t.field("location", {
			type: Location,
			nullable: true,
		});
		t.field("payment_meta", {
			type: PaymentMeta,
			nullable: true,
		});
	},
});
const TransactionsResponse = objectType({
	name: "TransactionsResponse",
	definition(t) {
		t.field("accounts", {
			type: Account,
			list: [false],
			nullable: true,
		});
		t.field("transactions", {
			type: Transaction,
			list: [false],
			nullable: true,
		});
		t.int("total_transactions", { nullable: true });
	},
});

const TransactionsRequest = inputObjectType({
	name: "TransactionsRequest",
	definition(t) {
		t.string("start_date", { required: true });
		t.string("end_date", { required: true });
		t.field("options", { type: TransactionsRequestOptions });
	},
});

const TransactionsRequestOptions = inputObjectType({
	name: "TransactionsRequestOptions",
	definition(t) {
		t.string("account_ids", { list: [false] });
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
