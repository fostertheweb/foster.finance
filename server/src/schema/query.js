const { objectType, stringArg } = require("nexus");
const { User } = require("./user");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("getUser", {
      type: User,
      args: {
        uid: stringArg({
          required: true,
        }),
      },
      async resolve(_root, { uid }, { db }) {
        return await db
          .collection("users")
          .doc(uid)
          .get();
      },
    });
  },
});

module.exports = { Query };
