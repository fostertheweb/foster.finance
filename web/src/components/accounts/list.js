import React from "react";

export default function({ data }) {
  return (
    <div className="p-4">
      <h2>Accounts</h2>
      {data.map(account => (
        <div key={account.account_id} class="flex justify-between items-center mt-2 p-4 bg-white hover:border-blue-500 rounded border-2 border-gray-300 cursor-pointer">
          <div>
            <span>{account.official_name}</span>
            <span class="text-gray-500">*{account.mask}</span>
            <div class="text-gray-500 capitalize">{account.subtype}</div>
          </div>
          <div class="text-xl">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(account.balances.current)}
          </div>
        </div>
      )}
    </div>
  );
}
