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
  return function({ event, context }) {
    if (context) {
      context.callbackWaitsForEmptyEventLoop = false;
    }

    if (event) {
      console.log(event);
    }

    return { plaid, db };
  };
}

module.exports = { schema, buildContext };
