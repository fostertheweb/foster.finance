const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foster-finance-7c81a.firebaseio.com",
});

module.exports = admin.firestore();

// Example Usage
/*
  const data = {
    message: "Hello, world!",
    timestamp: new Date()
  };

  db.collection('users').add(data).then((ref) => {
    // On a successful write, return an object
    // containing the new doc id.
    return ref;
  }).catch((err) => {
    // Forward errors if the write fails
    callback(err);
  });
*/
