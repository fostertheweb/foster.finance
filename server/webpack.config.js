const NodemonPlugin = require("nodemon-webpack-plugin");
const nodemonConfig = require("./nodemon.json");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  plugins: [new NodemonPlugin(nodemonConfig)],
  stats: {
    warnings: false,
  },
  target: "node",
};
