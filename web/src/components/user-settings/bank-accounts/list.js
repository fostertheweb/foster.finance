import React from "react";
import LinkButton from "./link-button";

export default function({ data }) {
  return (
    <div className="w-1/2">
      <div className="flex items-center justify-between">
        <h2>Accounts</h2>
        <LinkButton />
      </div>
      {data.map(account => (
        <div
          key={account.account_id}
          className="flex justify-between items-center mt-2 p-2 bg-white hover:border-blue-500 rounded-sm border border-gray-300 cursor-pointer">
          <div>
            <span className="mr-2">{account.official_name || account.name}</span>
            <span className="text-gray-500">*{account.mask}</span>
            <div
              className={`mt-1 text-gray-500 ${
                account.subtype.length <= 3 ? "uppercase" : "capitalize"
              }`}>
              {account.subtype}
            </div>
          </div>
          <div className="text-md">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
              account.balances.current,
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
