const { objectType } = require("nexus");

const Bank = objectType({
  name: "Bank",
  definition(t) {
    t.string("institution_id");
    t.list.string("account_ids");
    t.string("access_token");
    t.string("display_label", { nullable: true });
  },
});

module.exports = { Bank };
