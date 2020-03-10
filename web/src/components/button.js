import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import classNames from "classnames";

const button = classNames(
  "block",
  "cursor-pointer",
  "rounded",
  "font-medium",
  "border",
  "border-transparent",
  "leading",
  "bg-gray-700",
  "hover:bg-gray-600",
  "text-white",
  "shadow",
  "focus:outline-none",
  "focus:shadow-outline",
  "transition",
  "duration-150",
  "ease-in-out",
);

export default function(props) {
  const size = props.large ? "py-3 px-6 text-base" : "py-2 px-4";
  return (
    <button
      {...props}
      loading={props.loading ? "true" : undefined}
      type={props.type || "button"}
      className={classNames(button, size, props.className ? props.className.split(" ") : "")}>
      {props.icon || props.loading ? (
        <FontAwesomeIcon
          icon={props.loading ? faSpinnerThird : props.icon}
          spin={props.loading ? true : false}
          className="mr-2"
        />
      ) : null}
      {props.text}
    </button>
  );
}
