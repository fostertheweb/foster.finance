import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faExclamationCircle } from "@fortawesome/pro-duotone-svg-icons";

const style = {
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
    <div
      className={`flex block w-full align-items rounded p-3 bg-${color}-200 text-${color}-700 border border-${color}-500 absolute -mt-16 shadow`}>
      <FontAwesomeIcon size="2x" icon={icon} />
      <p className={`ml-2 p-1 text-${color}-800`}>{message}</p>
    </div>
  );
}
