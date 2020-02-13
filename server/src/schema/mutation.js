const { arg, objectType, stringArg } = require("nexus");
const { User, CreateUserRequest } = require("./user");
const { ExchangePublicTokenResponse } = require("./plaid");

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: User,
      args: {
        input: arg({
          type: CreateUserRequest,
          required: true,
        }),
      },
      async resolve(_root, { input }, { db }) {
        console.log({ mutation: "createUser", input });
        return await db.saveDoc("users", input);
      },
    });
    t.field("exchangePublicToken", {
      type: ExchangePublicTokenResponse,
      args: {
        token: stringArg({ required: true }),
      },
      async reolve(_root, { token }, { plaid }) {
        return await plaid.exchangePublicToken(token);
      },
    });
  },
});

module.exports = { Mutation };
