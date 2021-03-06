import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faLandmark } from "@fortawesome/pro-duotone-svg-icons";
import Alert from "components/common/alert";
import ListItem from "components/accounts/list-item";

export default function ({ loading, error, data, onChange }) {
	const [accounts, setAccounts] = useState(data.accounts);

	function handleSelect(account_id) {
		const index = accounts.findIndex((a) => a.account_id === account_id);
		const selectedAccount = accounts.splice(index, 1);
		setAccounts([...accounts, { ...selectedAccount, selected: !Boolean(selectedAccount.selected) }]);
	}

	useEffect(() => {
		onChange(accounts);
		//eslint-disable-next-line
	}, [accounts]);

	return (
		<div className="flex-grow">
			{loading ? (
				<div className="flex items-center justify-center w-full p-4 mt-2 bg-white border border-gray-300 rounded">
					<FontAwesomeIcon icon={faSpinnerThird} spin className="text-gray-400 fill-current" size="lg" />
				</div>
			) : (
				<>
					<div className="flex items-center p-2 mt-4 text-lg font-medium text-gray-700">
						{data.institution.logo ? (
							<img
								src={`data:image/png;base64,${data.institution.logo}`}
								alt="bank logo"
								className="inline-block w-8 h-8 mr-2"
							/>
						) : (
							<FontAwesomeIcon icon={faLandmark} size="lg" className="mr-3" color={data.institution.primary_color} />
						)}
						{data.institution.name}
					</div>
					{error ? (
						<Alert error={error.message || error} />
					) : (
						<>
							<div className="mt-2">
								{data.accounts.map((account) => (
									<ListItem account={account} key={account.account_id} onSelect={handleSelect} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
