import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="p-4 flex items-start">
      <div className="">
        <h2>Settings</h2>
        <Link to="profile" className="block mt-1">
          Profile
        </Link>
        <Link to="accounts" className="block mt-1">
          Banks & Accounts
        </Link>
        <Link to="recurring" className="block mt-1">
          Recurring Expenses
        </Link>
      </div>
      <div className="ml-4">
        <Outlet />
      </div>
    </div>
  );
}
