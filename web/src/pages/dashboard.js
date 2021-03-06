import React from "react";

import SetupAccounts from "components/setup/accounts";
import SetupExpenses from "components/setup/expenses";

export default function () {
	return (
		<div className="ff-pt-header">
			<div className="p-4">
				<div className="flex">
					<div>
						<h2>Accounts</h2>
						<div className="">
							<SetupAccounts />
						</div>
					</div>
					<div>
						<h2>Income</h2>
						<div></div>
						<h2>Expenses</h2>
						<div>
							<SetupExpenses />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
