import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";

import Logo from "../common/logo";
import UserMenu from "./user-menu";
import HeaderLink from "./link";

export default function () {
	return (
		<div className={`fixed w-full z-30 px-2 border-b-2 font-medium bg-gray-800 text-white border-gray-900`}>
			<div className="ff-container ff-h-header flex items-center justify-between">
				<div className="flex items-center">
					<div className="hover:no-underline mr-4">
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
					<FontAwesomeIcon icon={faSpinnerThird} spin className="fill-current" />
					<UserMenu disabled={false} emoji={"hatching_chick"} name={"jfost784@gmail.com"} />
				</div>
			</div>
		</div>
	);
}
