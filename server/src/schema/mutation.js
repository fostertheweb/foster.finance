const { arg, objectType, stringArg } = require("nexus");
const { User, CreateUserRequest } = require("./user");
const { ExchangePublicTokenResponse } = require("./plaid");
const database = require("../database");

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
      async resolve(_root, { input }) {
        console.log({ mutation: "createUser", input });
        const db = await database;
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
