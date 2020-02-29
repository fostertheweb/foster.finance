import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import classNames from "classnames";

const button = classNames(
  "block",
  "py-3",
  "px-5",
  "cursor-pointer",
  "rounded",
  "font-medium",
  "text-white",
  "bg-blue-400",
  "border",
  "border-blue-500",
  "hover:bg-blue-500",
);

export default function(props) {
  return (
    <button
      {...props}
      loading={props.loading ? "true" : undefined}
      type={props.type || "button"}
      className={button}>
      {props.loading ? (
        <FontAwesomeIcon icon={faSpinnerThird} spin />
      ) : (
        <div className="flex items-center">
          {props.icon ? <FontAwesomeIcon icon={props.icon} className="mr-2" /> : null}
          {props.text}
        </div>
      )}
    </button>
  );
}
