const { objectType } = require("nexus");

const RecurringExpense = objectType({
  name: "RecurringExpense",
  definition(t) {
    t.string("date");
    t.float("amount");
    t.string("vendor");
    t.string("display_label", { nullable: true });
    t.string("transaction_ids", {
      list: [false],
      nullable: true,
    });
  },
});

module.exports = { RecurringExpense };
