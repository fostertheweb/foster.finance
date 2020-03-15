import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Emoji } from "emoji-mart";
import { useAuth } from "../../hooks/use-auth";
import classNames from "classnames";

const menuItem = [
  "block",
  "px-4",
  "py-2",
  "w-full",
  "text-left",
  "text-gray-800",
  "hover:bg-gray-200",
  "hover:text-gray-900",
  "hover:no-underline",
  "font-normal",
  "transition",
  "duration-150",
  "ease-in-out",
];

export default function({ emoji, name, disabled }) {
  const { signOut } = useAuth();

  return (
    <div className="group relative">
      <Link
        to="/app/home"
        className={`block ml-4 hover:no-underline p-2 rounded inline-flex items-center transition duration-150 ease-in-out text-gray-300 group-hover:text-white hover:text-white group-hover:bg-gray-700 hover:bg-gray-700`}>
        <Emoji emoji={emoji} size={18} />
        <span className="ml-2">{name}</span>
      </Link>
      <div
        className={`hidden group-hover:block absolute right-0 w-40 z-50 bg-white rounded py-2 shadow-md`}>
        <Link
          className={`${classNames(menuItem)}${
            disabled ? " pointer-events-none text-gray-500" : ""
          }`}
          to="/app/settings">
          Settings
        </Link>
        <button className={classNames(menuItem)} onClick={() => signOut()}>
          <FontAwesomeIcon icon={faSignOut} />
          <span className="ml-2">Sign out</span>
        </button>
      </div>
    </div>
  );
}
