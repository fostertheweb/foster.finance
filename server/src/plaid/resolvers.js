const resolvers = {
  AccountType: {
    BROKERAGE: "brokerage",
    CREDIT: "credit",
    DEPOSITORY: "depository",
    INVESTMENT: "investment",
    LOAN: "loan",
    MORTGAGE: "mortgage",
    OTHER: "other",
  },
  AccountSubType: {
    RETIREMENT: "401k",
    STUDENT: "student",
    CHECKING: "checking",
    SAVINGS: "savings",
    CASH_DIRECTORY: "cd",
    CREDIT_CARD: "credit card",
    MONEY_MARKET: "money market",
    IRA: "ira",
  },
  TransactionType: {
    DIGITAL: "digital",
    PLACE: "place",
    SPECIAL: "special",
    UNRESOLVED: "unresolved",
  },
};

export default resolvers;
