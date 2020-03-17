import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import classNames from "classnames";

export const buttonStyle = [
  "block",
  "cursor-pointer",
  "rounded",
  "font-medium",
  "border",
  "border-transparent",
  "leading",
  "shadow",
  "focus:outline-none",
  "focus:shadow-outline",
  "transition",
  "duration-150",
  "ease-in-out",
];

export const primary = classNames("bg-gray-700", "hover:bg-gray-600", "text-white");
export const seconday = classNames("bg-white", "hover:bg-gray-100", "text-gray-800");

export default function(props) {
  const size = props.large ? "py-3 px-6 text-base" : "py-2 px-4";
  return (
    <button
      {...props}
      large={props.large ? "true" : undefined}
      loading={props.loading ? "true" : undefined}
      type={props.type || "button"}
      className={classNames(
        buttonStyle,
        size,
        props.className ? props.className.split(" ") : "",
        props.secondary ? seconday : primary,
      )}>
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
