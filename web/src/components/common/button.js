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
  "shadow",
  "focus:outline-none",
  "focus:shadow-outline",
  "transition",
  "duration-150",
  "ease-in-out",
];

export const primary = ["bg-gray-700", "hover:bg-gray-600", "text-white"];
export const secondary = ["bg-gray-100", "hover:bg-gray-200", "text-gray-800"];
export const disabled = ["bg-gray-400", "hover:bg-gray-400", "shadow-none", "cursor-not-allowed"];

export default function(props) {
  const size = props.large ? "py-3 px-6 text-base" : "py-2 px-4";
  return (
    <button
      {...props}
      secondary={props.secondary ? "true" : undefined}
      large={props.large ? "true" : undefined}
      loading={props.loading ? "true" : undefined}
      type={props.type || "button"}
      className={classNames(
        buttonStyle,
        size,
        props.className ? props.className.split(" ") : "",
        props.secondary ? secondary : primary,
        props.disabled ? disabled : "",
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
