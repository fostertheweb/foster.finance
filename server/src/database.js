const { MongoClient } = require("mongodb");

let cachedClient = null;

module.exports = async () => {
  if (cachedClient) {
    return Promise.resolve(cachedClient);
  }

  cachedClient = await MongoClient.connect(process.env.DB_URL);

  return cachedClient;
};
