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
  "border",
  "border-transparent",
  "leading",
  "bg-blue-600",
  "hover:bg-blue-500",
  "text-white",
  "shadow",
  "focus:outline-none",
  "focus:shadow-outline",
  "transition",
  "duration-150",
  "ease-in-out",
);

export default function(props) {
  return (
    <button
      {...props}
      loading={props.loading ? "true" : undefined}
      type={props.type || "button"}
      className={classNames(button)}>
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
