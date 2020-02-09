const path = require("path");
const { makeSchema } = require("nexus");
const Plaid = require("plaid");
const types = require("./schema");
const database = require("./database");

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

async function context({ event, context }) {
  if (context) {
    context.callbackWaitsForEmptyEventLoop = false;
  }

  if (event) {
    console.log(event);
  }

  const db = await database;

  return { plaid, db };
}

module.exports = { schema, context };
