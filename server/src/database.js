const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foster-finance-7c81a.firebaseio.com",
});

module.exports = () => admin.firestore();
