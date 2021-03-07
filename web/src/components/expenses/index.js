import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTasks } from "@fortawesome/pro-duotone-svg-icons";
import Loading from "components/common/loading";
import Button from "components/common/button";
import ExpenseList from "components/expenses/list";
import { Well } from "components/common/alert";
import { useDiscoverExpenses, useExpensesLocal } from "hooks/use-expenses";
import { useAccountsLocal } from "hooks/use-accounts";

export default function () {
	const { data: accounts } = useAccountsLocal();
	const { mutate: discoverExpenses, data: expenses, status: discoverStatus } = useDiscoverExpenses();
	const { mutate: saveExpenses } = useExpensesLocal();

	function handleSubmit(event) {
		event.preventDefault();
		saveExpenses(expenses.filter((e) => e.selected));
	}

	useEffect(() => {
		discoverExpenses(accounts);
	}, [accounts]);

	if (discoverStatus === "loading") return <Loading />;

	return (
		<>
			<Well
				message={
					<div>
						After setup you can add more bills or income in <b>Settings</b> by selecting from recent transactions or
						adding them manually.
					</div>
				}
			/>
			<div className="pt-2">
				{expenses ? (
					<div className="p-4 bg-white rounded shadow">
						<div className="text-gray-700">
							<p className="leading-normal">
								We looked at your transactions over the last 3 months from the accounts you selected previously and
								found what we think are your monthly expenses.
							</p>

							<p className="mt-4 leading-normal">
								Confirm your bills and income by selecting them below and hit save to finish setup!
							</p>
						</div>
						<ExpenseList data={expenses} loading={discoverStatus === "loading"} />
					</div>
				) : null}
			</div>

			<Button
				onClick={handleSubmit}
				className="w-full mt-2 whitespace-no-wrap"
				text="Save Recurring Expenses"
				icon={faSave}
				disabled={!expenses || discoverStatus === "loading"}
			/>
		</>
	);
}
