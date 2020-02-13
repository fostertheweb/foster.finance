const massive = require("massive");

let database;

const connectionOptions = {
  conection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  options: {
    documentPkType: "uuid",
  },
};

module.exports = async function() {
  if (database) {
    return database;
  }

  try {
    const { connection, options } = connectionOptions;
    database = await massive(connection, options);
    return database;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
