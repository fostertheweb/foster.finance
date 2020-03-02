import React from "react";

export default function({ data }) {
  return (
    <div className="lg:w-1/2">
      <h2>Accounts</h2>
      {data.map(account => (
        <div
          key={account.account_id}
          className="flex justify-between items-center mt-2 p-2 bg-white hover:border-blue-500 rounded-sm border border-gray-300 cursor-pointer">
          <div>
            <span className="mr-2">{account.official_name || account.name}</span>
            <span className="text-gray-500">*{account.mask}</span>
            <div className="mt-1 text-gray-500 capitalize">{account.subtype}</div>
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
