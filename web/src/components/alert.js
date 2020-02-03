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
    <div className={`flex items-center flex-grow text-${color}-700`}>
      <FontAwesomeIcon size="2x" icon={icon} />
      <div className={`ml-2 mb-0 text-${color}-800`}>{message}</div>
    </div>
  );
}
