const luxon = require("luxon");
const got = require("got");
const RITEKIT_CLIENT_ID = process.env.RITEKIT_CLIENT_ID;

module.exports = function (app, _options, next) {
	app.post("/discover", async ({ body: { accounts } }) => {
		try {
			const today = luxon.DateTime.local();
			const end_date = today.toFormat("yyyy-MM-dd");
			const start_date = today.minus({ months: 3 }).toFormat("yyyy-MM-dd");
			const requests = accounts.map(async ({ account_ids, access_token }) => {
				return await app.plaid().getTransactions(access_token, start_date, end_date, { account_ids });
			});
			const responses = await Promise.all(requests);
			const transactions = responses.reduce((transactions, response) => {
				return [...transactions, ...response.transactions];
			}, []);

			const expenses = transactions.reduce((expenses, transaction) => {
				const expense = {
					day: transaction.date.slice(-2),
					amount: transaction.amount,
					name: transaction.name,
					account_id: transaction.account_id,
				};

				const count = transactions.filter((t) => compareTransaction(t, expense)).length;

				if (expenses.find((e) => compareTransaction(e, expense))) {
					console.log("In here.");
					return expenses;
				}

				if (count >= 2) {
					return [...expenses, expense];
				}

				return expenses;
			}, []);

			const getVendorLogos = expenses.map(async (e) => {
				const company = await getCompanyInfo(e.name);
				return { ...e, logo: company };
			});
			const expensesWithLogos = await Promise.all(getVendorLogos);

			return expensesWithLogos;
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

async function getCompanyInfo(name) {
	let _domain = undefined;

	try {
		const clearbit = await got(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`);
		if (clearbit.body && clearbit.body.length > 0) {
			const company = JSON.parse(clearbit.body)[0];
			_domain = company.domain;
			await got(`https://logo.clearbit.com/${company.domain}`);
			return company.logo;
		} else {
			return null;
		}
	} catch (err) {
		if (_domain) {
			await got(`https://api.ritekit.com/v1/images/logo?client_id=${RITEKIT_CLIENT_ID}&domain=${_domain}`);
			return `https://api.ritekit.com/v1/images/logo?client_id=${RITEKIT_CLIENT_ID}&domain=${_domain}`;
		}

		return null;
	}
}
