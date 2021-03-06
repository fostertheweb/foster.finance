import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/pro-duotone-svg-icons";

export default function ({ account, onSelect }) {
	const [isSelected, setSelected] = useState(account.selected);

	function handleSelection(event) {
		setSelected(event.target.checked);
		onSelect(account.account_id);
	}

	return (
		<div
			className={`relative flex items-center p-2 mt-2 rounded border ${
				isSelected ? "border-blue-500" : "border-gray-300"
			} hover:border-blue-500 cursor-pointer text-gray-700`}
			onClick={() => setSelected(!isSelected)}>
			{isSelected ? (
				<FontAwesomeIcon icon={faCheckCircle} className="ff-fa-theme-primary" size="lg" />
			) : (
				<FontAwesomeIcon icon={faCircle} className="text-gray-200" size="lg" />
			)}
			<div className="hidden">
				<input name="accounts" type="checkbox" checked={isSelected} onChange={handleSelection} />
			</div>
			<div className="flex-grow ml-4">
				<span className="mr-2">{account.official_name || account.name}</span>
				<div className={`text-gray-500 ${account.subtype.length <= 3 ? "uppercase" : "capitalize"}`}>
					{account.subtype}
				</div>
			</div>
			<div className="text-right text-md">
				<div className="font-medium text-gray-600">
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(account.balances.current)}
				</div>
				<div className="text-gray-500 ff-font-mono" style={{ fontfamily: "Courier" }}>
					<span className="text-gray-300">XXXX</span>
					{account.mask}
				</div>
			</div>
		</div>
	);
}
