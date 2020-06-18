import React from "react";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../../../hooks/use-auth";
import AccountList from "./list";
import LinkButton from "../../link-button";
import Button from "../../common/button";
import { Well } from "../../common/alert";

export default function () {
	const { userId } = useAuth();

	function handleLinkSuccess(public_token) {
		console.log({ public_token });
	}

	function handleSubmit(event) {
		event.preventDefault();
		const { item_id, access_token, public_token } = {};
		const selected = accounts.filter((a) => a.selected).map(({ account_id }) => account_id);
		localStorage.setItem(userId, public_token);
		sendPostAccounts({
			type: "FETCH",
			accounts: [
				{
					item_id,
					access_token,
					account_ids: selected,
				},
			],
		});
	}

	return (
		<>
			<div className="p-2 w-2/3">
				<div className="bg-white p-4 rounded shadow text-gray-700">
					<h1 className="text-xl font-bold tracking-wide">Setup Bank Accounts</h1>
					{fetchLinkState.matches("resolved") ? (
						<>
							<p className="mt-4 leading-normal">
								We have automatically selected your Checking and Credit Card accounts. Modify the selection, if needed,
								to include every account that you pay bills from and where you deposit your paycheck.
							</p>
							<AccountList
								data={fetchLinkState.context.data}
								error={fetchLinkState.context.error}
								onChange={setAccounts}
							/>
						</>
					) : (
						<div>
							<p className="mt-4 leading-normal text-gray-700">
								Thank you for trusting us! That is a great start to our relationship. Let's get things rolling by
								linking your bank account.
							</p>
							<div className="flex items-baseline justify-between mt-6">
								<LinkButton onLinkSuccess={handleLinkSuccess} loading={fetchLinkState.matches("loading")} />
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
					loading={postAccountsState.matches("loading")}
					disabled={!fetchLinkState.matches("resolved")}
				/>
			</div>
		</>
	);
}
