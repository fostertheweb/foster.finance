import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import plaid from "plaid";

import * as types from "./schema";

const { PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, PLAID_ENV } = process.env;

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
);

const resolvers = {
  Query: {
    async getTransactions(_parent, { startDate, endDate }, { plaid, accessToken }) {
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
    async exchangePublicToken(_parent, { token }, { plaid }) {
      try {
        return await plaid.exchangePublicToken(token);
      } catch (err) {
        return err;
      }
    },
  },
};

const schema = makeSchema({
  types,
});

function context({ req }) {
  return {
    plaid: client,
    authz: req.headers.Authorization,
  };
}

const server = new ApolloServer({
  schema,
  context,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
