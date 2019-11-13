const massive = require("massive");

let database;

module.exports = (async function() {
  if (database) {
    return database;
  }

  try {
    database = await massive(
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
      {
        documentPkType: "uuid",
      },
    );
  } catch (err) {
    console.log(err);
  }

  return database;
})();
