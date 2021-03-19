const { objectType, enumType, list } = require("nexus");
const { Item } = require("./item");

const ACH = objectType({
	name: "ACH",
	definition(t) {
		t.string("account");
		t.string("account_id");
		t.string("routing");
		t.string("wire_routing");
	},
});

const Account = objectType({
	name: "Account",
	definition(t) {
		t.string("account_id");
		t.field("balances", {
			type: Balances,
		});
		t.string("mask");
		t.string("name");
		t.field("numbers", {
			type: AccountNumbers,
		});
		t.string("official_name");
		t.field("subtype", {
			type: AccountSubType,
		});
		t.field("type", {
			type: AccountType,
		});
	},
});

const AccountNumbers = objectType({
	name: "AccountNumbers",
	definition(t) {
		t.field("ach", {
			type: ACH,
		});
		t.field("eft", {
			type: EFT,
		});
	},
});

const AccountsResponse = objectType({
	name: "AccountsResponse",
	definition(t) {
		t.field("accounts", {
			type: list(Account),
		});
		t.field("item", {
			type: Item,
		});
	},
});

const Balances = objectType({
	name: "Balances",
	definition(t) {
		t.float("available");
		t.float("current");
		t.float("limit");
		t.field("iso_currency_code", {
			type: ISOCurrencyCode,
		});
		t.string("unofficial_currency_code");
	},
});

const EFT = objectType({
	name: "EFT",
	definition(t) {
		t.string("account");
		t.string("account_id");
		t.string("institution");
		t.string("branch");
	},
});

const AccountSubType = enumType({
	name: "AccountSubType",
	members: {
		RETIREMENT: "401k",
		STUDENT: "student",
		CHECKING: "checking",
		SAVINGS: "savings",
		CASH_DIRECTORY: "cd",
		CREDIT_CARD: "credit card",
		MONEY_MARKET: "money market",
		IRA: "ira",
	},
});

const AccountType = enumType({
	name: "AccountType",
	members: {
		BROKERAGE: "brokerage",
		CREDIT: "credit",
		DEPOSITORY: "depository",
		INVESTMENT: "investment",
		LOAN: "loan",
		MORTGAGE: "mortgage",
		OTHER: "other",
	},
});

const ISOCurrencyCode = enumType({
	name: "ISOCurrencyCode",
	members: ["USD", "CAD"],
});

module.exports = { Account, AccountsResponse, Balances };
