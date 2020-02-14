const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foster-finance-7c81a.firebaseio.com"
});

module.exports = async function () {
  const data = {
    message: "Hello, world!",
    timestamp: new Date()
  };

  db.collection('lambda-docs').add(data).then((ref) => {
    // On a successful write, return an object
    // containing the new doc id.
    callback(null, {
      id: ref.id
    });
  }).catch((err) => {
    // Forward errors if the write fails
    callback(err);
  });
}
