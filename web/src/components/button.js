import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import classNames from "classnames";

const button = classNames(
  "block",
  "py-3",
  "px-4",
  "cursor-pointer",
  "rounded-sm",
  "font-medium",
  "border",
  "bg-blue-100",
  "hover:bg-blue-100",
  "border-blue-300",
  "hover:border-blue-400",
  "text-blue-700",
);

const xd =
  "bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center";

export default function(props) {
  return (
    <button
      {...props}
      loading={props.loading ? "true" : undefined}
      type={props.type || "button"}
      className={xd}>
      <div className="flex items-center">
        {props.icon || props.loading ? (
          <FontAwesomeIcon
            icon={props.loading ? faSpinnerThird : props.icon}
            spin={props.loading ? true : false}
            size="lg"
            className="mr-2"
          />
        ) : null}
        {props.text}
      </div>
    </button>
  );
}
