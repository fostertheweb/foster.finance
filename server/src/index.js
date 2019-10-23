import { ApolloServer, makeExecutableSchema } from "apollo-server";
import plaid from "plaid";
import * as typeDefs from "./schema.graphql";

const {
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  PLAID_ENV,
} = process.env;
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
);

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
  Query: {
    async getTransactions(
      _parent,
      { startDate, endDate },
      { plaid, accessToken },
    ) {
      try {
        return await plaid.getTransactions(accessToken, startDate, endDate);
      } catch (err) {
        console.error(err);
        return err;
      }
    },
    async getAccounts(_parent, _args, { plaid, accessToken }) {
      try {
        return await plaid.getAccounts(accessToken);
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
  Mutation: {
    async exchangePublicToken(_parent, { publicToken }, { plaid }) {
      try {
        return await plaid.exchangePublicToken(publicToken);
      } catch (err) {
        return err;
      }
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({
  schema,
  context({ req }) {
    return { plaid: client, accessToken: req.headers.plaid };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
