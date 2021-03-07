import React, { useState, useEffect } from "react";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import LinkButton from "components/link-button";
import Button from "components/common/button";
import { Well } from "components/common/alert";
import { useCreateLink, useGetLinkToken, useAccountsLocal } from "hooks/use-accounts";
import Modal from "components/common/modal";
import AccountList from "components/accounts/list";

export default function () {
	const { data: link, status: getLinkTokenStatus } = useGetLinkToken();
	const { mutate: createLink, data: item, status: createLinkStatus, error } = useCreateLink();
	const { mutate: saveAccounts } = useAccountsLocal();
	const [accounts, setAccounts] = useState([]);
	const [isOpen, setOpen] = useState(false);

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

	useEffect(() => {
		if (createLinkStatus === "success") {
			setOpen(true);
		}
	}, [createLinkStatus]);

	if (!link || getLinkTokenStatus === "loading") {
		return "Loading...";
	}

	return (
		<>
			<Modal isOpen={isOpen} title="Select Accounts">
				<p className="leading-normal">
					We have automatically selected your Checking and Credit Card accounts. Modify the selection, if needed, to
					include every account that you pay bills from and where you deposit your paycheck.
				</p>
				<AccountList data={item} error={error} onChange={setAccounts} />
				<Button
					onClick={handleSubmit}
					className="w-full mt-2 whitespace-no-wrap"
					text="Save Account Selection"
					icon={faSave}
					disabled={createLinkStatus !== "success"}
				/>
			</Modal>
			<Well
				message={
					<>
						If you have more accounts to link you can add them later in <b>Settings</b> after setup.
					</>
				}
			/>
			<div className="pt-2">
				<div className="p-4 text-gray-700 bg-white rounded shadow">
					<div>
						<p className="leading-normal text-gray-700">
							Thank you for trusting us! That is a great start to our relationship. Let's get things rolling by linking
							your bank account.
						</p>

						<LinkButton
							token={link.link_token}
							onLinkSuccess={handleLinkSuccess}
							loading={createLinkStatus === "loading"}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
