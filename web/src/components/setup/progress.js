import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faPiggyBank, faListOl } from "@fortawesome/pro-duotone-svg-icons";
import { useLocation } from "react-router";

export default function() {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const step = parts[parts.length - 1];

  return (
    <div className="p-2">
      <div className="py-2 flex items-center justify-around">
        <Step
          active={step === "profile"}
          label="Your Profile"
          icon={
            <FontAwesomeIcon
              icon={faAddressCard}
              size="2x"
              className={`${step === "profile" ? "text-indigo-500" : "text-gray-500"} fill-current`}
            />
          }
        />
        <Line active={step === "accounts"} />
        <Step
          active={step === "accounts"}
          label="Link Bank Account"
          icon={
            <FontAwesomeIcon
              icon={faPiggyBank}
              size="2x"
              transform="flip-h"
              className={`${step === "accounts" ? "text-pink-500" : "text-gray-500"} fill-current`}
            />
          }
        />
        <Line active={step === "expenses"} />
        <Step
          active={step === "expenses"}
          label="Bills & Income"
          icon={
            <FontAwesomeIcon
              icon={faListOl}
              size="2x"
              className={`${step === "expenses" ? "text-red-500" : "text-gray-500"} fill-current`}
            />
          }
        />
      </div>
    </div>
  );
}

function Step(props) {
  return (
    <div className="py-2 px-4 text-center">
      <div
        className={`${
          props.active ? "bg-gray-100 border-blue-500" : "bg-gray-200 border-transparent"
        } border-2 w-16 h-16 p-4 rounded-full inline-block`}>
        {props.icon}
      </div>
      <div
        className={`mt-2 text-center whitespace-no-wrap ${
          props.active ? "text-blue-500 font-medium" : "text-gray-500"
        }`}>
        {props.label}
      </div>
    </div>
  );
}

function Line({ active }) {
  return (
    <div className={`${active ? "ff-bg-gray-200-to-blue-500" : "bg-gray-200"} h-px w-full -mt-4`}>
      &nbsp;
    </div>
  );
}
