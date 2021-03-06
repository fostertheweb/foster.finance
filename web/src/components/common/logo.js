import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCow, faHandHoldingUsd, faTurtle } from "@fortawesome/pro-duotone-svg-icons";

const LIGHT_THEME = "border-white hover:border-gray-500 text-gray-700 hover:text-gray-700";
const DARK_THEME = "border-gray-800 text-gray-50 hover:text-white";

export default function ({ dark, color }) {
	return (
		<div className="inline-flex items-center">
			<FontAwesomeIcon icon={faCoins} size="lg" color={color || (dark ? "white" : "#094067")} />
			<div className={`brand tracking-wide ml-2 border-b-2 ${dark ? DARK_THEME : LIGHT_THEME}`}>foster</div>
		</div>
	);
}
