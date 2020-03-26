import React, { useState } from "react";

export default function({ account }) {
  const [isSelected, setSelected] = useState(false);

  function handleSelection(event) {
    setSelected(event.target.checked);
  }

  return (
    <div
      key={account.account_id}
      className="flex items-center p-1 hover:bg-gray-200 border-t border-gray-300 cursor-pointer"
      onClick={() => handleSelection(account.account_id)}>
      <div className="text-center p-2 mr-2">
        <input
          name="accounts"
          type="checkbox"
          checked={isSelected}
          onChange={handleSelection}
          value={account.account_id}
        />
      </div>
      <div className="flex-grow">
        <span className="mr-2">{account.official_name || account.name}</span>
        <div
          className={`text-gray-500 ${account.subtype.length <= 3 ? "uppercase" : "capitalize"}`}>
          {account.subtype}
        </div>
      </div>
      <div className="text-md text-right">
        <div>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(account.balances.current)}
        </div>
        <div className="ff-font-mono text-gray-500" style={{ fontfamily: "Courier" }}>
          <span className="text-gray-300">XXXX</span>
          {account.mask}
        </div>
      </div>
    </div>
  );
}
