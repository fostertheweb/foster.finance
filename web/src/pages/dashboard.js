import React from "react";

import SetupAccounts from "components/accounts";
import SetupExpenses from "components/expenses";
import { Panel } from "components/common/panel";

export default function () {
	return (
		<div className="ff-pt-header">
			<div className="p-4">
				<div className="flex gap-4">
					<div className="w-1/3">
						<DashboardHeading>Accounts</DashboardHeading>
						<div className="">
							<SetupAccounts />
						</div>
					</div>
					<div className="w-1/3">
						<DashboardHeading>Income</DashboardHeading>
						<div className="pb-2">
							<div className="p-8 bg-gray-200"></div>
						</div>
						<DashboardHeading>Expenses</DashboardHeading>
						<div>
							<SetupExpenses />
						</div>
					</div>
					<div className="w-1/3">
						<div className="p-8 bg-gray-200"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

function DashboardHeading({ children }) {
	return <h2 className="pb-4 text-lg font-medium tracking-wide text-gray-600">{children}</h2>;
}
