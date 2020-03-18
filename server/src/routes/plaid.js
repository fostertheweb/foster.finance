module.exports = function(app, _options, next) {
  app.post("/exchange", async ({ body: { public_token } }) => {
    try {
      app.log.info("POST /plaid/exchange");
      return await app.plaid().exchangePublicToken(public_token);
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  app.post("/accounts", async ({ body: { items } }) => {
    try {
      app.log.info("POST /plaid/accounts");
      const requests = items.map(async ({ item_id, access_token }) => {
        app.log.info(`PLAID getAccounts for Item ${item_id}`);
        return await app.plaid().getAccounts(access_token);
      });
      const responses = await Promise.all(requests);
      const accounts = responses.reduce((accounts, response) => {
        return [...accounts, ...response.accounts];
      }, []);
      return accounts;
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  app.post("/transactions", async ({ body: { items, start_date, end_date } }) => {
    try {
      app.log.info("POST /plaid/transactions");
      const requests = items.map(async ({ item_id, access_token }) => {
        app.log.info(`PLAID getTransactions for Accounts under Item ${item_id}`);
        return await app.plaid().getTransactions(access_token, start_date, end_date);
      });
      const responses = await Promise.all(requests);
      const transactions = responses.reduce((transactions, response) => {
        return [...transactions, ...response.transactions];
      }, []);
      return transactions;
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  app.post("/expenses", async ({ body: { items, start_date, end_date } }) => {
    try {
      app.log.info("POST /plaid/transactions");
      const requests = items.map(async ({ item_id, access_token }) => {
        app.log.info(`PLAID getTransactions for Accounts under Item ${item_id}`);
        return await app.plaid().getTransactions(access_token, start_date, end_date);
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
          selected: true,
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
