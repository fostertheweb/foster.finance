import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import Logo from "components/common/logo";
import UserMenu from "components/header/user-menu";
import HeaderLink from "components/header/link";

export default function () {
	return (
		<div className="fixed z-30 w-full px-2 font-medium text-white bg-gray-800 border-b-2 border-gray-900">
			<div className="flex items-center justify-between ff-container ff-h-header">
				<div className="flex items-center">
					<div className="mr-4 hover:no-underline">
						<Logo dark={true} />
					</div>
					<HeaderLink path="transactions" icon={faCalendarAlt}>
						Transactions
					</HeaderLink>
					<HeaderLink path="balances" icon={faCoins}>
						Balances
					</HeaderLink>
				</div>
				<div className="flex items-center">
					<UserMenu disabled={false} emoji={"hatching_chick"} name={"jfost784@gmail.com"} />
				</div>
			</div>
		</div>
	);
}
