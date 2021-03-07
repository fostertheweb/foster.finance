import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank, faMoneyCheckAlt, faReceipt } from "@fortawesome/pro-duotone-svg-icons";
import SetupAccounts from "components/accounts";
import SetupExpenses from "components/expenses";
import { Panel } from "components/common/panel";

export default function () {
	return (
		<div className="ff-pt-header">
			<div className="p-4">
				<div className="grid grid-cols-3 gap-4">
					<div className="">
						<DashboardHeading icon={faPiggyBank}>Accounts</DashboardHeading>
						<div className="">
							<SetupAccounts />
						</div>
					</div>
					<div className="">
						<DashboardHeading icon={faMoneyCheckAlt}>Income</DashboardHeading>
						<div className="pb-2">
							<div className="p-8 bg-gray-200"></div>
						</div>
						<DashboardHeading icon={faReceipt}>Expenses</DashboardHeading>
						<div>
							<SetupExpenses />
						</div>
					</div>
					<div className="">
						<div className="p-8 bg-gray-200"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

function DashboardHeading({ children, icon }) {
	return (
		<div className="pb-2 text-gray-600 flex items-center">
			<FontAwesomeIcon icon={icon} className="mr-2" size="lg" />
			<h2 className="text-lg font-medium tracking-wide">{children}</h2>
		</div>
	);
}
