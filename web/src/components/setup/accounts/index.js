import React, { useState } from "react";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import AccountList from "components/setup/accounts/list";
import LinkButton from "components/link-button";
import Button from "components/common/button";
import { Well } from "components/common/alert";
import { useSaveAccounts, useCreateLink, useGetLinkToken } from "hooks/use-accounts";

export default function () {
	const { data: link, status: getLinkTokenStatus } = useGetLinkToken();
	const [createLink, { data: item, status: createLinkStatus, error }] = useCreateLink();
	const [saveAccounts, { saveStatus }] = useSaveAccounts();
	const [accounts, setAccounts] = useState([]);

	function handleLinkSuccess(public_token) {
		createLink(public_token);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const { item_id, access_token } = item;
		const selected = accounts.filter((a) => a.selected).map(({ account_id }) => account_id);
		saveAccounts([
			{
				item_id,
				access_token,
				account_ids: selected,
			},
		]);
	}

	if (!link || getLinkTokenStatus === "loading") {
		return "Loading...";
	}

	return (
		<>
			<div className="p-2 w-2/3">
				<div className="bg-white p-4 rounded shadow text-gray-700">
					<h1 className="text-xl font-bold tracking-wide">Setup Bank Accounts</h1>
					{item ? (
						<>
							<p className="mt-4 leading-normal">
								We have automatically selected your Checking and Credit Card accounts. Modify the selection, if needed,
								to include every account that you pay bills from and where you deposit your paycheck.
							</p>
							<AccountList data={item} error={error} onChange={setAccounts} />
						</>
					) : (
						<div>
							<p className="mt-4 leading-normal text-gray-700">
								Thank you for trusting us! That is a great start to our relationship. Let's get things rolling by
								linking your bank account.
							</p>
							<div className="flex items-baseline justify-between mt-6">
								<LinkButton
									token={link.link_token}
									onLinkSuccess={handleLinkSuccess}
									loading={createLinkStatus === "loading"}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="w-1/3 sticky ff-top-0 p-2 pl-1">
				<div className="">
					<Well
						message={
							<div>
								If you have more accounts to link you can add them later in <b>Settings</b> after setup.
							</div>
						}
					/>
				</div>
				<Button
					onClick={handleSubmit}
					className="w-full whitespace-no-wrap mt-2"
					text="Save Account Selection"
					icon={faSave}
					loading={saveStatus === "loading"}
					disabled={saveStatus === "loading" || createLinkStatus !== "success"}
				/>
			</div>
		</>
	);
}
