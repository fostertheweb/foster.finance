import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faReceipt } from "@fortawesome/pro-duotone-svg-icons";

export default function({ data, onChange }) {
  const [selected, setSelected] = useState(data);

  function handleSelect(expense) {
    const index = selected.findIndex(e => e.name === expense.name);
    setSelected([...selected.slice(0, index), expense, ...selected.slice(index + 1)]);
  }

  useEffect(() => {
    onChange(selected);
    //eslint-disable-next-line
  }, [selected]);

  return (
    <div className="mt-4">
      <h2 className="my-2 font-medium text-base">Here's what we found:</h2>
      <span className="smallcaps text-gray-500 text-xs p-1">Due Every</span>
      {Object.entries(groupByDay(data))
        .sort(([a], [b]) => a - b)
        .map(([day, expenses], index, arr) => (
          <div
            key={day}
            className="flex items-start border-t border-gray-300 first:border-transparent">
            <div className="text-lg p-2 w-12 text-center text-gray-600 font-medium">
              {parseInt(day)}
              <span className="text-xs align-top font-normal smallcaps">{nth(parseInt(day))}</span>
            </div>
            <div
              className={`flex-grow p-2 -mx-1 flex flex-wrap items-center ${
                index === arr.length - 1 ? "pb-0" : ""
              }`}>
              {expenses.map(expense => (
                <Expense key={expense.name} expense={expense} onSelect={handleSelect} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

function Expense({ expense, onSelect }) {
  const [isSelected, setSelected] = useState(expense.selected);

  function handleChange(event) {
    setSelected(event.target.checked);
    onSelect({ ...expense, selected: event.target.checked });
  }

  function handleClick(selected) {
    setSelected(!selected);
    onSelect({ ...expense, selected: !selected });
  }

  return (
    <div className="flex-shrink w-1/3 px-1">
      <div
        className={`relative py-1 px-2 rounded bg-white border ${
          isSelected ? "border-blue-500" : "border-gray-400"
        } hover:border-blue-500 cursor-pointer`}
        onClick={() => handleClick(isSelected)}>
        {isSelected ? (
          <div className="absolute top-0 left-0 -ml-2 -mt-2">
            <FontAwesomeIcon icon={faCheckCircle} className="ff-fa-theme-primary" size="lg" />
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <input
            type="checkbox"
            name="expenses"
            checked={isSelected}
            onChange={handleChange}
            className="hidden"
          />
          <div className="h-8 w-8 mr-4 flex items-center justify-center">
            {expense.logo ? (
              <img src={expense.logo} alt={`${expense.name} logo`} />
            ) : (
              <FontAwesomeIcon icon={faReceipt} size="lg" className="text-gray-500 fill-current" />
            )}
          </div>
          <div className="text-gray-600 text-lg">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
              expense.amount,
            )}
          </div>
        </div>
        <div className="text-gray-500 text-xs mt-1 truncate">{expense.name}</div>
      </div>
    </div>
  );
}

function nth(n) {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

function groupByDay(expenses) {
  return expenses.reduce((groups, expense) => {
    if (groups[expense.day]) {
      return { ...groups, [expense.day]: [...groups[expense.day], expense] };
    }
    return { ...groups, [expense.day]: [expense] };
  }, {});
}
