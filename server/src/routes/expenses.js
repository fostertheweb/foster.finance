const luxon = require("luxon");

module.exports = function(app, _options, next) {
  app.get("/discover", async ({ user_id }) => {
    try {
      const today = luxon.DateTime.local();
      const end_date = today.toFormat("yyyy-MM-dd");
      const start_date = today.minus({ months: 3 }).toFormat("yyyy-MM-dd");
      const user = await app.mongo.db.collection("users").findOne({ user_id });
      const requests = user.accounts.map(async ({ account_ids, access_token }) => {
        return await app
          .plaid()
          .getTransactions(access_token, start_date, end_date, { account_ids });
      });
      const responses = await Promise.all(requests);
      const transactions = responses.reduce((transactions, response) => {
        return [...transactions, ...response.transactions];
      }, []);
      return transactions.reduce((expenses, transaction) => {
        const expense = {
          day: transaction.date.slice(-2),
          amount: transaction.amount,
          name: transaction.name,
          account_id: transaction.account_id,
        };
        const count = transactions.filter(t => compareTransaction(t, expense)).length;

        if (expenses.find(e => compareTransaction(e, expense))) {
          return expenses;
        }

        if (count >= 2) {
          return [...expenses, expense];
        }

        return expenses;
      }, []);
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  app.post("/", async ({ user_id, body: { expenses = [] } }, reply) => {
    try {
      return await app.mongo.db
        .collection("users")
        .findOneAndUpdate({ user_id }, { $set: { expenses } });
    } catch (err) {
      throw err;
    }
  });

  next();
};

function compareTransaction(transaction, expense) {
  const sameDay = transaction.day || transaction.date.slice(-2) === expense.day;
  const sameAmount = transaction.amount === expense.amount;
  const sameName = transaction.name === expense.name;

  if (sameDay && sameAmount && sameName) {
    return true;
  }

  return false;
}
