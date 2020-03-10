import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="flex items-stretch ff-pt-header">
      <div className="border-r border-gray-400 w-1/5 flex-grow-0">
        <h2 className="p-4 text-lg">Settings</h2>
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
      <div className="p-4 w-2/5">
        <Outlet />
      </div>
    </div>
  );
}
