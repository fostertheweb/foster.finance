const path = require("path");
const { makeSchema } = require("nexus");
const plaid = require("plaid");
const types = require("./schema");
const database = require("./database");

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments[process.env.PLAID_ENV],
);

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, "schema.graphql"),
  },
});

async function context() {
  return {
    plaid: client,
    db: await database,
  };
}

module.exports = { schema, context };
