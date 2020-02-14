const admin = require("firebase-admin");
const serviceAccount = require("../../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

module.exports = () => admin.firestore();
