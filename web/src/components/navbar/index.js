import React from "react";
import NavbarLink from "components/navbar/link";
import { faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";

export default function Navbar() {
	return (
		<div className="fixed bottom-0 left-0 flex items-center w-full gap-1 p-1 bg-white shadow">
			<NavbarLink path="transactions" icon={faCalendarAlt}>
				Transactions
			</NavbarLink>
			<NavbarLink path="balances" icon={faCoins}>
				Balances
			</NavbarLink>
		</div>
	);
}
