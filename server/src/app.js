const path = require("path");
const { makeSchema } = require("nexus");
const plaid = require("plaid");
const types = require("./schema");

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

function context({ req }) {
  return {
    plaid: client,
    authz: req.headers.Authorization,
  };
}

module.exports = { schema, context };
