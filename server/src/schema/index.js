const { objectType } = require("nexus");

const RecurringTransaction = {
	definition(t) {
		t.string("name");
		t.string("date");
		t.string("amount");
		t.int("interval");
	},
};

const Expense = objectType({
	name: "Expense",
	...RecurringTransaction,
});

const Income = objectType({
	name: "Income",
	...RecurringTransaction,
});

module.exports = {
	Expense,
	Income,
	...require("./query"),
	...require("./mutation"),
	...require("./plaid"),
};
