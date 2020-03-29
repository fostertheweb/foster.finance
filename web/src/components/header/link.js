import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function({ path, icon, children }) {
  return (
    <NavLink
      to={`/app/${path}`}
      activeClassName="bg-gray-900"
      className={`ml-4 hover:no-underline p-2 rounded tracking-wide transition duration-150 ease-in-out text-gray-300 hover:text-white hover:bg-gray-700 focus:bg-gray-700`}>
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </NavLink>
  );
}
