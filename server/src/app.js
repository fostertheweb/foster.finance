const path = require("path");
const { makeSchema } = require("nexus");
const Plaid = require("plaid");
const types = require("./schema");

const plaid = new Plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  Plaid.environments[process.env.PLAID_ENV],
);

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, "schema.graphql"),
  },
});

function buildContext(db) {
  return function() {
    return { plaid, db };
  };
}

module.exports = { schema, buildContext };
