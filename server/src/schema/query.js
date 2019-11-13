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
        const users = await db.users.findDoc({
          user_id: uid,
        });
        // findDoc returns array
        return users[0];
      },
    });
  },
});

module.exports = { Query };
