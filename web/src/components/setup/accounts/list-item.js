import React, { useState } from "react";

export default function({ account, onSelect }) {
  const [isSelected, setSelected] = useState(account.selected);

  function handleSelection(event) {
    setSelected(event.target.checked);
    onSelect(account.account_id);
  }

  return (
    <div
      className="flex items-center p-1 hover:bg-gray-200 border-t border-gray-300 cursor-pointer"
      onClick={() => setSelected(!isSelected)}>
      <div className="text-center p-2 mr-2">
        <input name="accounts" type="checkbox" checked={isSelected} onChange={handleSelection} />
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
