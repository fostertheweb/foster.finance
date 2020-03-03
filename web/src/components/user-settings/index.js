import React, { useState } from "react";
import Profile from "./profile";
import BankAccounts from "./bank-accounts";
import Recurring from "./recurring";

const Tab = props => {
  return (
    <button
      className={`${
        props.active ? "bg-gray-200 " : ""
      }px-4 py-2 w-full text-left block text-gray-700`}
      onClick={() => props.onClick(props.label)}>
      {props.label}
    </button>
  );
};

export default function() {
  const tabs = [
    { label: "Profile", component: <Profile editing={true} /> },
    { label: "Connected Bank Accounts", component: <BankAccounts /> },
    { label: "Recurring Expenses", component: <Recurring /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="flex items-stretch">
      <div className="border-r border-gray-400 w-1/5 flex-grow-0">
        <h2 className="p-2">Settings</h2>
        <div className="mt-2">
          {tabs.map(tab => {
            return (
              <Tab
                label={tab.label}
                active={tab.label === activeTab}
                onClick={setActiveTab}
                key={tab.label}
              />
            );
          })}
        </div>
      </div>
      <div className="p-4 w-2/5">{tabs.find(tab => tab.label === activeTab).component}</div>
    </div>
  );
}
