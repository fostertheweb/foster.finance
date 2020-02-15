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
    t.string("name", { nullable: true });
    t.string("email", { nullable: false });
    t.string("emoji", { nullable: true });
    t.string("created", { nullable: true });
    t.string("updated", { nullable: true });
  },
});

const CreateUserRequest = inputObjectType({
  name: "CreateUserRequest",
  definition(t) {
    t.string("user_id", { required: true });
    t.string("name");
    t.string("email", { required: true });
    t.string("emoji");
  },
});

module.exports = { User, CreateUserRequest };
