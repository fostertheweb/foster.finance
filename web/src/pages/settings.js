import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank, faListOl, faCogs, faAddressCard } from "@fortawesome/pro-duotone-svg-icons";
import { Routes, Route } from "react-router-dom";
import Accounts from "components/setup/accounts";
import Profile from "components/settings/profile";
import Expenses from "components/settings/expenses";

const linkStyle = [
	"block",
	"box-border",
	"py-2",
	"px-4",
	"mt-1",
	"w-full",
	"rounded",
	"text-left",
	"text-gray-700",
	"font-normal",
	"hover:text-gray-700",
	"hover:no-underline",
	"hover:bg-gray-300",
	"transition",
	"duration-150",
	"ease-in-out",
];

function Settings() {
	return (
		<div className="ff-container ff-pt-header flex items-start">
			<div className="sticky top-0 whitespace-no-wrap p-2">
				<h2 className="text-gray-600 text-lg smallcaps tracking-wide px-4 py-2">
					<FontAwesomeIcon icon={faCogs} className="mr-2 fill-current" />
					Settings
				</h2>
				<div className="mt-2">
					<NavLink to="profile" activeClassName="font-medium bg-gray-300" className={classNames(linkStyle)}>
						<div className="w-4 inline-block text-center">
							<FontAwesomeIcon icon={faAddressCard} className="text-indigo-500 fill-current" />
						</div>
						<span className="ml-2">Edit Profile</span>
					</NavLink>
					<NavLink to="accounts" activeClassName="font-medium bg-gray-300" className={classNames(linkStyle)}>
						<div className="w-4 inline-block text-center">
							<FontAwesomeIcon icon={faPiggyBank} className="text-pink-500 fill-current" transform="flip-h" />
						</div>
						<span className="ml-2">Bank Accounts</span>
					</NavLink>
					<NavLink to="expenses" activeClassName="font-medium bg-gray-300" className={classNames(linkStyle)}>
						<div className="w-4 inline-block text-center">
							<FontAwesomeIcon icon={faListOl} className="text-red-500 fill-current" />
						</div>
						<span className="ml-2">Expenses</span>
					</NavLink>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

export default function () {
	return (
		<Routes>
			<Route path="/" element={<Settings />}>
				<Route path="profile" element={<Profile />} />
				<Route path="accounts" element={<Accounts />} />
				<Route path="expenses" element={<Expenses />} />
			</Route>
		</Routes>
	);
}
