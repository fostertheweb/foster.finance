import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="ff-container ff-pt-header flex items-stretch relative">
      <div className="sticky top-0 border-r border-gray-400 whitespace-no-wrap">
        <h2 className="py-2 px-4 text-gray-600 text-lg smallcaps tracking-wide">Settings</h2>
        <div className="mt-2">
          <NavLink
            to="profile"
            activeClassName="font-bold"
            className={`px-4 py-2 w-full hover:text-gray-800 hover:no-underline text-left block text-gray-700 hover:bg-gray-300`}>
            Edit Profile
          </NavLink>
          <NavLink
            to="accounts"
            activeClassName="font-bold"
            className={`px-4 py-2 w-full hover:text-gray-800 hover:no-underline text-left block text-gray-700 hover:bg-gray-300`}>
            Linked Bank Accounts
          </NavLink>
          <NavLink
            to="expenses"
            activeClassName="font-bold"
            className={`px-4 py-2 w-full hover:text-gray-800 hover:no-underline text-left block text-gray-700 hover:bg-gray-300`}>
            Expenses
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
