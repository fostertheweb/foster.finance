import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="flex items-stretch">
      <div className="border-r border-gray-400 w-1/5 flex-grow-0">
        <h2 className="p-2">Settings</h2>
        <div className="mt-2">
          <Link
            to="profile"
            className={`px-4 py-2 w-full text-left block text-gray-700 hover:bg-gray-300`}>
            Edit Profile
          </Link>
          <Link
            to="accounts"
            className={`px-4 py-2 w-full text-left block text-gray-700 hover:bg-gray-300`}>
            Linked Bank Accounts
          </Link>
          <Link
            to="expenses"
            className={`px-4 py-2 w-full text-left block text-gray-700 hover:bg-gray-300`}>
            Expenses
          </Link>
        </div>
      </div>
      <div className="p-4 w-2/5">
        <Outlet />
      </div>
    </div>
  );
}
