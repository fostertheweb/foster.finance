import React from "react";
import { } from "@fortawesome/pro-duotone-svg-icons";
import Button from "components/common/button";
import { useAccountsLocal } from "hooks/use-accounts";

export default function() {
	const { data: accounts } = useAccountsLocal();

	return (
		<div>
			<div>
				{accounts.map(accounts => <Account data={account} />)}
			</div>
		</div>
	);
}

function Account({ data: {} }) {
	return <div>

	</div>;
}
