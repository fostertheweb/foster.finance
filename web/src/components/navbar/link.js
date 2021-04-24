import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function ({ path, icon, children }) {
	return (
		<NavLink
			to={path}
			activeClassName="bg-indigo-50 text-indigo-700"
			className={`flex flex-col gap-1 items-center w-20 p-1 text-center rounded bg-transparent text-gray-500`}>
			<FontAwesomeIcon icon={icon} size="2x" className="fill-current" />
			<div className="text-xs">{children}</div>
		</NavLink>
	);
}
