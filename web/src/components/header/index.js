import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../hooks/use-auth";
import Logo from "../common/logo";
import UserMenu from "./user-menu";
import HeaderLink from "./link";

export default function () {
	const { user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const isDuringSetup = location.pathname.includes("setup");

	function isSetupComplete({ accounts, expenses }) {
		if (!accounts || accounts.length < 1) {
			navigate("/app/setup/accounts");
		} else if (!expenses || expenses.length < 1) {
			navigate("/app/setup/expenses");
		}

		return true;
	}

	return (
		<div className={`fixed w-full z-30 px-2 border-b-2 font-medium bg-gray-800 text-white border-gray-900`}>
			<div className="ff-container ff-h-header flex items-center justify-between">
				<div className="flex items-center">
					{isDuringSetup ? (
						<div className="hover:no-underline mr-4">
							<Logo dark={true} />
						</div>
					) : (
						<Link to="/app" className="hover:no-underline mr-4">
							<Logo dark={true} />
						</Link>
					)}
					{!isDuringSetup ? (
						<>
							<HeaderLink path="transactions" icon={faCalendarAlt}>
								Transactions
							</HeaderLink>
							<HeaderLink path="balances" icon={faCoins}>
								Balances
							</HeaderLink>
						</>
					) : null}
				</div>
				<div className="flex items-center">
					{state.matches("loading") ? (
						<FontAwesomeIcon icon={faSpinnerThird} spin className="fill-current" />
					) : (
						<UserMenu
							disabled={isDuringSetup}
							emoji={profile.emoji || "hatching_chick"}
							name={profile.name || user.attributes.email}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
