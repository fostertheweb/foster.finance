import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTasks } from "@fortawesome/pro-duotone-svg-icons";
import Loading from "components/common/loading";
import Button from "components/common/button";
import ExpenseList from "components/setup/expenses/list";
import { Well } from "components/common/alert";
import { useDiscoverExpenses, useSaveExpenses } from "hooks/use-expenses";

export default function () {
	const navigate = useNavigate();
	const { data: expenses, status: discoverStatus } = useDiscoverExpenses();
	const [saveExpenses, { status: saveStatus }] = useSaveExpenses();

	useEffect(() => {
		if (saveStatus === "success") {
			navigate("/dashboard");
		}
		// eslint-disable-next-line
	}, [saveStatus]);

	if (discoverStatus === "loading") return <Loading />;

	function handleSubmit(event) {
		event.preventDefault();
		saveExpenses(expenses.filter((e) => e.selected));
	}

	return (
		<>
			<div className="p-2 w-2/3">
				{expenses ? (
					<div className="p-4 bg-white rounded shadow">
						<div className="text-gray-700">
							<h1 className="text-xl font-bold tracking-wide">
								<FontAwesomeIcon icon={faTasks} size="lg" className="fill-current mr-2" /> Setup Bills &amp; Income
							</h1>
							<p className="mt-4 leading-normal">You are doing a great job! We just need one last thing from you.</p>

							<p className="mt-4 leading-normal">
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
			<div className="w-1/3 sticky ff-top-0 p-2 pl-1">
				<Well
					message={
						<div>
							After setup you can add more bills or income in <b>Settings</b> by selecting from recent transactions or
							adding them manually.
						</div>
					}
				/>
				<Button
					onClick={handleSubmit}
					className="whitespace-no-wrap w-full mt-2"
					text="Save Recurring Expenses"
					icon={faSave}
					loading={saveStatus === "loading"}
					disabled={!expenses || discoverStatus === "loading"}
				/>
			</div>
		</>
	);
}
