import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Emoji } from "emoji-mart";
import { useAuth } from "../../hooks/use-auth";
import classNames from "classnames";

const menuItem = classNames(
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
);

export default function({ emoji, name, loading, dark }) {
  const { signOut } = useAuth();

  const theme = dark
    ? "text-gray-300 group-hover:text-white hover:text-white group-hover:bg-gray-700 hover:bg-gray-700"
    : "text-gray-700 hover:text-gray-700 group-hover:bg-gray-200 hover:bg-gray-200";

  return (
    <div className="group relative">
      <Link
        to="/app/home"
        className={`block ml-4 hover:no-underline p-2 rounded inline-flex items-center transition duration-150 ease-in-out ${theme}`}>
        {loading ? (
          <FontAwesomeIcon icon={faSpinnerThird} spin className="fill-current" />
        ) : (
          <Emoji emoji={emoji} size={18} />
        )}
        <span className="ml-2">{loading ? "" : name}</span>
      </Link>
      <div
        className={`hidden ${
          loading ? "" : "group-hover:block"
        } absolute right-0 w-40 z-50 bg-white rounded py-2 shadow-md`}>
        <Link className={menuItem} to="/app/settings">
          Settings
        </Link>
        <button className={menuItem} onClick={() => signOut()}>
          <FontAwesomeIcon icon={faSignOut} />
          <span className="ml-2">Sign out</span>
        </button>
      </div>
    </div>
  );
}
