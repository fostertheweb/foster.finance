import { objectType, enumType, scalarType } from "nexus";

const ACH = objectType({
  name: "ACH",
  definition(t) {
    t.string("account", { nullable: true });
    t.string("account_id", { nullable: true });
    t.string("routing", { nullable: true });
    t.string("wire_routing", { nullable: true });
  },
});

export const Account = objectType({
  name: "Account",
  definition(t) {
    t.string("account_id", { nullable: true });
    t.field("balances", {
      type: Balances,
      nullable: true,
    });
    t.string("mask", { nullable: true });
    t.string("name", { nullable: true });
    t.field("numbers", {
      type: AccountNumbers,
      nullable: true,
    });
    t.string("official_name", { nullable: true });
    t.field("subtype", {
      type: AccountSubType,
      nullable: true,
    });
    t.field("type", {
      type: AccountType,
      nullable: true,
    });
  },
});

const AccountNumbers = objectType({
  name: "AccountNumbers",
  definition(t) {
    t.field("ach", {
      type: ACH,
      list: [false],
      nullable: true,
    });
    t.field("eft", {
      type: EFT,
      list: [false],
      nullable: true,
    });
  },
});

const AccountsResponse = objectType({
  name: "AccountsResponse",
  definition(t) {
    t.field("accounts", {
      type: Account,
      list: [false],
      nullable: true,
    });
  },
});
const Balances = objectType({
  name: "Balances",
  definition(t) {
    t.float("available", { nullable: true });
    t.float("current", { nullable: true });
    t.float("limit", { nullable: true });
    t.field("iso_currency_code", {
      type: ISOCurrencyCode,
      nullable: true,
    });
    t.string("unofficial_currency_code", { nullable: true });
  },
});

const EFT = objectType({
  name: "EFT",
  definition(t) {
    t.string("account", { nullable: true });
    t.string("account_id", { nullable: true });
    t.string("institution", { nullable: true });
    t.string("branch", { nullable: true });
  },
});

const AccountSubType = enumType({
  name: "AccountSubType",
  members: [
    "RETIREMENT",
    "STUDENT",
    "CHECKING",
    "CASH_DIRECTORY",
    "SAVINGS",
    "CREDIT_CARD",
    "MONEY_MARKET",
    "IRA",
  ],
});

const AccountType = enumType({
  name: "AccountType",
  members: ["BROKERAGE", "CREDIT", "DEPOSITORY", "INVESTMENT", "LOAN", "MORTGAGE", "OTHER"],
});

const ISOCurrencyCode = enumType({
  name: "ISOCurrencyCode",
  members: ["USD", "CAD"],
});
