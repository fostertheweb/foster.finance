const { arg, objectType, stringArg } = require("nexus");
const { User, CreateUserRequest } = require("./user");
const { ExchangePublicTokenResponse } = require("./plaid");
const admin = require("firebase-admin");

const timestamp = admin.firestore.FieldValue.serverTimestamp;

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
        try {
          const uid = input.user_id;
          await db
            .collection("users")
            .doc(uid)
            .set({ ...input, created: timestamp() });
          const doc = await db
            .collection("users")
            .doc(uid)
            .get();
          return doc.data();
        } catch (err) {
          console.log(err);
        }
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
