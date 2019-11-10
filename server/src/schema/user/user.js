const { objectType, inputObjectType } = require("nexus");
const { Bank } = require("./bank");
const { RecurringExpense } = require("./expense");

const User = objectType({
  name: "User",
  definition(t) {
    t.string("user_id");
    t.field("banks", {
      type: Bank,
      list: [false],
      nullable: true,
    });
    t.field("recurring_expenses", {
      type: RecurringExpense,
      list: [false],
      nullable: true,
    });
    t.string("first_name", { nullable: true });
    t.string("last_name", { nullable: true });
    t.string("email", { nullable: true });
    t.string("emoji", { nullable: true });
  },
});

const CreateUserRequest = inputObjectType({
  name: "CreateUserRequest",
  definition(t) {
    t.string("user_id", { required: true });
    t.string("first_name");
    t.string("last_name");
    t.string("email");
    t.string("emoji");
  },
});

module.exports = { User, CreateUserRequest };
