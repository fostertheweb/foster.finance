const luxon = require("luxon");

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
      const expenses = transactions.reduce((expenses, transaction) => {
        const dayOfMonth = transaction.date.slice(-2);
        return {
          ...expenses,
          [dayOfMonth]: expenses[dayOfMonth]
            ? [...expenses[dayOfMonth], transaction]
            : [transaction],
        };
      }, {});
      return expenses;
    } catch (err) {
      app.log.error(err);
      throw err;
    }
  });

  next();
};
