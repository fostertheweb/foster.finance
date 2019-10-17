import { ApolloServer, makeExecutableSchema } from "apollo-server";
import plaid from "plaid";
import * as typeDefs from "./schema.graphql";

const { PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, PLAID_ENV } = process.env;
const client = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, plaid.environments[PLAID_ENV]);

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
