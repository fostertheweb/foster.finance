import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/pro-duotone-svg-icons";

const style = {
  default: {
    icon: faInfoCircle,
    color: "gray",
  },
  info: {
    icon: faInfoCircle,
    color: "blue",
  },
  success: {},
  warn: {
    icon: faExclamationTriangle,
    color: "yellow",
  },
  error: {
    icon: faExclamationCircle,
    color: "red",
  },
};

export default function({ intent, message }) {
  const color = style[intent].color;
  const icon = style[intent].icon;

  if (!message) {
    return null;
  }

  return (
    <div className={`flex items-center flex-grow text-${color}-700`}>
      <FontAwesomeIcon size="2x" icon={icon} />
      <div className={`ml-2 mb-0 text-${color}-800`}>{message}</div>
    </div>
  );
}

export function Well({ intent, message }) {
  const theme = intent ? style[intent] : style["default"];
  const color = theme.color;
  const icon = theme.icon;

  return (
    <div
      className={`p-3 rounded bg-${color}-${color === "gray" ? "200" : "100"} flex items-center`}>
      <FontAwesomeIcon icon={icon} className={`text-${color}-500 fill-current mr-4`} size="2x" />
      <p className={`text-${color}-${color === "gray" ? "600" : "700"}`}>{message}</p>
    </div>
  );
}
