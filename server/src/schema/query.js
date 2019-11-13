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
      async resolve(root, { input }, { db }) {
        return await db.saveDoc("users", input);
      },
    });
  },
});

module.exports = { Query };
