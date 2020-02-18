const fp = require("fastify-plugin");
const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

let db;

module.exports = fp(function(fastify, _opts, next) {
  fastify.decorate("db", () => (db ? db : (db = admin.firestore())));
  next();
});
