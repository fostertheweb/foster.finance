import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/pro-duotone-svg-icons";

const linkStyle = [
  "block",
  "box-border",
  "py-2",
  "px-3",
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

export default function() {
  return (
    <div className="ff-container ff-pt-header flex items-stretch relative">
      <div className="sticky top-0 whitespace-no-wrap p-2">
        <h2 className="text-gray-600 text-lg smallcaps tracking-wide">
          <FontAwesomeIcon icon={faUserCog} className="mr-2 fill-current" />
          Settings
        </h2>
        <div className="mt-2">
          <NavLink
            to="profile"
            activeClassName="font-medium bg-gray-300"
            className={classNames(linkStyle)}>
            Edit Profile
          </NavLink>
          <NavLink
            to="accounts"
            activeClassName="font-medium bg-gray-300"
            className={classNames(linkStyle)}>
            Linked Bank Accounts
          </NavLink>
          <NavLink
            to="expenses"
            activeClassName="font-medium bg-gray-300"
            className={classNames(linkStyle)}>
            Expenses
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
