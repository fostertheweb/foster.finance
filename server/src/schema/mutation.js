const { arg, objectType } = require("nexus");
const { User, CreateUserRequest } = require("./user");

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
      async resolve(root, { input }, { db }) {
        console.log("================================ db =======================", db);
        return await db.saveDoc("users", input);
      },
    });
  },
});

module.exports = { Mutation };
