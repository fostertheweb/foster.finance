import React, { useState } from "react";

export default function({ data }) {
  return Object.entries(groupByDay(data))
    .sort(([a], [b]) => a - b)
    .map(([day, expenses]) => (
      <div key={day} className="flex items-start mt-2 border-t border-gray-400">
        <div className="text-lg p-2 w-12 text-center text-gray-600 font-medium">
          {parseInt(day)}
          <span className="text-xs align-top font-normal smallcaps">{nth(parseInt(day))}</span>
        </div>
        <div className="flex-grow">
          {expenses.map(expense => (
            <Row key={expense.name} expense={expense} />
          ))}
        </div>
      </div>
    ));
}

function Row({ expense }) {
  const [selected, setSelected] = useState(expense.selected);
  return (
    <div
      className="flex items-center w-full p-1 justify-between rounded m-1 hover:bg-gray-200 cursor-pointer"
      onClick={() => setSelected(!selected)}>
      <input
        type="checkbox"
        id=""
        name=""
        checked={selected}
        onClick={() => setSelected(!selected)}
        className="mr-4"
      />
      <div className="flex-grow text-gray-700 text-left">{expense.name}</div>
      <div className="text-gray-700">
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
          expense.amount,
        )}
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
