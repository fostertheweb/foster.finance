import React from "react";

export default function({ data }) {
  return (
    <div>
      <h2>Accounts</h2>
      {data.map(account => (
        <div
          key={account.account_id}
          className="flex justify-between items-center mt-2 p-4 bg-white hover:border-blue-500 rounded border-2 border-gray-300 cursor-pointer">
          <div>
            <span>{account.official_name}</span>
            <span className="text-gray-500">*{account.mask}</span>
            <div className="text-gray-500 capitalize">{account.subtype}</div>
          </div>
          <div className="text-xl">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
              account.balances.current,
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
